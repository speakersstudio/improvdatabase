let Promise = require('bluebird');

let userController = require('./api/user.controller'),
    roles = require('../roles');

let Purchase = require('../models/purchase.model'),
    Subscription = require('../models/subscription.model');

module.exports = {

    doCharge: (req, res) => {

        let cc = req.body.cc, // credit card info object
            cart = req.body.cart, // array of Purchase objects (see the Purchase model)
            requestUser = req.user, // logged in user (if adding something to their account)
            newUser = req.body.user; // user data (if we're creating a new user)

        // TODO: process the credit card, break on error
        return Promise.resolve()
            .then(() => {
                // if we have a newUser object, create that new user
                // otherwise just pass along the logged in user
                if (newUser) {
                    return userController.createUser(newUser);
                } else {
                    return Promise.resolve(requestUser);
                }
            })
            .then(user => {
                // we should have a user here, so if we don't we have a problem
                if (!user) {
                    res.status(500).send('No User Found!');
                    // TODO: do we have to refund the credit card here?
                    return false;
                }

                // save the purchase item in the database
                return this.createPurchase(u, cart);
            })
            .then(user => {
                // TODO: generate a token why not
                if (res) {
                    res.json(user);
                }
            });

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