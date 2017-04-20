const mongoose = require('mongoose'),
    Promise = require('bluebird');

mongoose.Promise = Promise;

let config = require('../config')();

let util = require('../util'),
    emailUtil = require('../email');

let userController = require('./api/user.controller'),
    teamController = require('./api/team.controller'),
    auth = require('../auth'),
    roles = require('../roles');

let User = require('../models/user.model'),
    Team = require('../models/team.model'),
    Purchase = require('../models/purchase.model'),
    Subscription = require('../models/subscription.model');

module.exports = {

    signup: (req, res) => {
        let stripe = require('stripe')(config.stripe.secret),
            
            tokenVal = req.body.stripeToken,
            cart = req.body.cart,
            email = req.body.email,
            password = req.body.password,
            userName = req.body.userName,
            teamName = req.body.teamName,

            /**
             * Payload: {
             *  stripeToken: Stripe token (either string or object with id property)
             *  cart: Purchase[]
             *  email: string (new user's email)
             *  password: string (new user's password)
             *  teamName: string (name of the team, optional)
             * }
             */

            token,
            stripeCustomerId,
            error;

        // make sure stripe token is the actual string
        if (typeof tokenVal == 'object' && tokenVal.id) {
            token = tokenVal.id;
        }

        if (!email) {
            error = 'email';
        } else if (!password) {
            error = 'password';
        } else if (!token) {
            error = 'token';
        } else if (!cart || !cart.length) {
            error = 'cart';
        }

        if (error) {
            console.log('No ' + error + ' supplied to signup route!');
            res.status(500).json({error: "No " + error});
            return;
        }

        // step 1: verify that the email address is available for a user account
        User.findOne({}).where('email').equals(email).exec()
            .then(user => {
                if (user) {
                    res.status(401).json({
                        error: 'email already exists'
                    });
                    return Promise.reject('email already exists');
                }
            })
            .then(() => {
                // step 2: charge the credit card
                // first create a stripe customer ID
                return stripe.customers.create({
                    email: email,
                    source: token
                });
            })
            .then(stripeCustomer => {
                // remember the customerId for later
                stripeCustomerId = stripeCustomer.id;

                let total = 0,
                    desc = "New purchase - ";

                cart.forEach((cartItem, i) => {
                    total += cartItem.total;
                    if (cartItem.package) {
                        desc += ' - ' + cartItem.package.name;
                    }
                });

                // stripe expects the price in cents
                total *= 100;

                return stripe.charges.create({
                    amount: total,
                    currency: "usd",
                    description: desc,
                    customer: stripeCustomerId
                });
            })
            .then(charge => {
                // I don't think we need to keep track of the charge object, because that will be stored on Stripe already

                // step 3: are we creating a team or just a user?
                if (teamName) {
                    // step 4: create a new team
                    return teamController.createTeam(teamName);
                } else {
                    return Promise.resolve(false);
                }
            })
            .then(team => {
                let firstName = '',
                    lastName = '';
                if (userName) {
                    firstName = userName.substr(0, (userName+' ').indexOf(' ')).trim();
                    lastName = userName.substr((userName+' ').indexOf(' '), userName.length).trim();
                }

                // step 5: create a new user
                let userData = {
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName
                };
                return userController.createUser(userData)
                    .then(user => {
                        if (team) {
                            user.adminOfTeams = util.addToObjectIdArray(user.adminOfTeams, team);
                            return user.save();
                        } else {
                            return Promise.resolve(user);
                        }
                    })
                    .then(user => {
                        if (team) {
                            team.admins = util.addToObjectIdArray(team.admins, user);
                            return team.save();
                        } else {
                            return Promise.resolve(user);
                        }
                    });
            })
            .then(owner => {
                // owner will be a team (if we created one) or a user

                // step 6: create the purchase model (and the subscription)
                return module.exports.createPurchase(owner, cart, stripeCustomerId);
            })
            .then(owner => {
                // step 7: if we created a team, give the new user a child subscription
                if (!owner.isThisAUser) {
                    let team = owner,
                        teamSubscriptionId = util.getObjectIdAsString(team.subscription),
                        userId = util.getObjectIdAsString(team.admins[0]);

                    return Subscription.findOne({}).where('_id').equals(teamSubscriptionId).exec()
                        .then(sub => {
                            return sub.createChildSubscription(userId);
                        })
                        .then(sub => {
                            return userController.findUser(userId);
                        });
                } else {
                    return Promise.resolve(owner);
                }
            })
            .then(user => {
                let body = `
                    <p>Congratulations on making your first step to a more awesome you!</p>
                    <p>Your subscription is now active. You can log into the ImprovPlus app and browse all of our fabulous features. </p>

                `;

                if (teamName) {
                    body += `
                        <p>Your team, ${teamName}, is ready to go, and you can share your additional subscriptions with members of your Team through the app. See your Team details by visiting the "Your Team" link in the app menu.</p>
                    `
                }
                
                // TODO: insert a purchase summary / receipt sort of thing here
                
                if (cart[0].materialItem || (cart[0].package.materials && cart[0].package.materials.length)) {
                    body += `
                        <p>Visit the Materials Library to download your new Materials - they're officially yours to keep!</p>
                    `
                }

                emailUtil.send({
                    to: user.email,
                    toName: user.firstName + ' ' + user.lastName,
                    subject: 'Welcome to ImprovPlus',
                    content: {
                        type: 'text',
                        greeting: 'Welcome to ImprovPlus!',
                        body: body,
                        action: 'https://improvpl.us/app',
                        actionText: 'Log In Now',
                        afterAction: `
                            <p>If you have any questions about how to use the ImprovPlus app, do not hesitate to reach out to us. You can use the "Request a feature" or "Report a Bug" options in the App Menu to send your feedback directly to us, or you can respond directly to this email.</p>

                            <p>Be excellent to each other, and party on.</p>

                            <p>Sincerely,</p>

                            <p>The Proprietors of <span class="light">improv</span><strong>plus</strong>.</p>
                        `
                    }
                }, (error, response) => {

                    res.json(user);

                })
            })
    },

    doCharge: (req, res) => {

        let stripe = require('stripe')(config.stripe.secret);

        let token = req.body.stripeToken, // stripe charge token
            cart = req.body.cart, // array of Purchase objects (see the Purchase model)
            user = req.user && req.user._id ? req.user : req.body.user, // the user who made this charge (if no user is logged in, hopefully we're creating one)
            isUserNew = !user._id;

        if (!user || !user.email) {
            console.log('No user!')
            res.status(500).json({error: "No user"});
            return;
        }
        if (!token) {
            console.log('no stripe token!');
            res.status(500).json({error: "No stripe token"});
            return;
        }
        if (!cart || !cart.length) {
            console.log('no cart!');
            res.status(500).json({error: 'No cart array'});
        }

        if (typeof token == 'object') {
            token = token.id;
        }

        let userCheck;
        if (isUserNew) {
            // make sure we don't already have a user with the new email address
            userCheck = User.findOne({})
                .where('email').equals(user.email)
                .exec();
        } else {
            userCheck = Promise.resolve(false);
        }

        return userCheck.then(conflictUser => {
            if (conflictUser) {
                res.status(401).json({
                    error: 'email already exists'
                });
                return Promise.reject(false);
            }

            if (!user.stripeCustomerId) {
                stripePromise = stripe.customers.create({
                    email: user.email,
                    source: token
                });
            } else {
                stripePromise = Promise.resolve(false);
            }

            return stripePromise;
        })
            .then(customer => {
                if (customer) {
                    user.stripeCustomerId = customer.id;
                }

                let total = 0,
                    desc = isUserNew ? "New purchase - " : "Purchase - ";

                cart.forEach((cartItem, i) => {
                    total += cartItem.total;
                    if (cartItem.package) {
                        desc += ' - ' + cartItem.package.name;
                    }
                });

                // stripe expects the price in cents
                total *= 100;

                return stripe.charges.create({
                    amount: total,
                    currency: "usd",
                    description: desc,
                    customer: user.stripeCustomerId
                });
            })
            .then(charge => {
                // if we have a newUser object, create that new user
                // otherwise just pass along the logged in user
                if (isUserNew) {
                    return userController.createUser(user);
                } else {
                    return Promise.resolve(user);
                }
            })
            .then(u => {
                if (isUserNew && user.stripeCustomerId) {
                    u.stripeCustomerId = user.stripeCustomerId;
                    return u.save();
                }
            })
            .then(u => {
                // save the purchase item in the database
                return module.exports.createPurchase(u, cart);
            })
            .then(u => {
                res.json(u);
            })

    },

    createPurchase: (owner, items, stripeCustomerId) => {
        items = [].concat(items);

        let doCreate = (index) => {
            let item = items[index],
                purchase = {
                    type: item.type,
                    total: item.total,

                    materialItem: item.materialItem, // these should just be the ids
                    package: item.package
                },
                purchaseModel;

            if (owner.isThisAUser) {
                purchase.user = owner._id;
            } else {
                purchase.team = owner._id;
            }

            return Purchase.create(purchase)
                // if this purchase is a package, add the items and subscription to the owner
                .then(purch => {
                    purchaseModel = purch;
                    if (purch.type == 'package') {
                        return purch.getPackage('materials')
                            .then(package => {
                                if (package) {
                                    // add all the materials
                                    return owner.addMaterial(package.materials)
                                        .then(() => {
                                            // add a subscription, if this package includes one
                                            if (package.subscriptions) {
                                                let roleId = package.role;

                                                if (owner.superAdmin) {
                                                    roleId = roles.ROLE_SUPER_ADMIN;
                                                }

                                                if (owner.isThisAUser) {
                                                    return owner.addSubscription(roleId, stripeCustomerId);
                                                } else {
                                                    return owner.addSubscription(roleId, stripeCustomerId, package.subscriptions);
                                                }
                                            }
                                        });
                                }
                            });
                    } else if (purch.type == 'materialItem') {
                        // if this purchase is an item, add it
                        return owner.addMaterial(purch.materialItem);

                    }
                })
                .then(() => {
                    owner.purchases.push(purchaseModel);
                    index++;
                    if (items.length > index) {
                        return doCreate(index);
                    } else {
                        return owner.save();
                    }
                })
        }

        return doCreate(0);
    }

}