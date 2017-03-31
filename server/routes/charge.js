let Promise = require('bluebird');

let config = require('../config')();

let userController = require('./api/user.controller'),
    auth = require('../auth');
    roles = require('../roles');

let User = require('../models/user.model'),
    Purchase = require('../models/purchase.model'),
    Subscription = require('../models/subscription.model');

module.exports = {

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

    createPurchase: (user, items) => {
        items = [].concat(items);

        let doCreate = (index) => {
            let item = items[index],
                purchase = {
                    user: user._id,
                    type: item.type,
                    total: item.total,

                    materialItem: item.materialItem, // these should just be the ids
                    package: item.package
                },
                purchaseModel;

            return Purchase.create(purchase)
                // if this purchase is a package, add the items and subscription to the user
                .then(purch => {
                    purchaseModel = purch;
                    if (purch.type == 'package') {
                        return purch.getPackage('materials')
                            .then(package => {
                                if (package) {
                                    // add all the materials
                                    return user.addMaterial(package.materials)
                                        .then(() => {
                                            // add a subscription, if this package includes one
                                            if (package.includeSubscription) {
                                                let roleId = roles.ROLE_SUBSCRIBER;

                                                if (user.superAdmin) {
                                                    roleId = roles.ROLE_SUPER_ADMIN;
                                                } else if (package.slug == 'ultimate') {
                                                    roleId = roles.ROLE_ULTIMATE;
                                                }

                                                return user.addSubscription(roleId);
                                            }
                                        });
                                }
                            });
                    } else if (purch.type == 'materialItem') {
                        // if this purchase is an item, add it to the user
                        return user.addMaterial(purch.materialItem);
                    } else if (purch.type == 'subscription') {
                        // if this purchase is a subscription, add it to the user
                        return user.addSubscription();
                    }
                })
                .then(() => {
                    user.purchases.push(purchaseModel);
                    index++;
                    if (items.length > index) {
                        return doCreate(index);
                    } else {
                        return user.save();
                    }
                })
        }

        return doCreate(0);
    }

}