const mongoose = require('mongoose'),
    Promise = require('bluebird'),
    bcrypt = require('bcrypt'),
    fs = require('fs'),
    path = require('path');

var config = require('./config')();

const charge = require('./routes/charge'),
    roles = require('./roles');

const Subscription = require('./models/subscription.model');
const Purchase = require('./models/purchase.model');
const User = require('./models/user.model');
const MaterialItem = require('./models/material-item.model');
const Package = require('./models/package.model');
const Preference = require('./models/preference.model');

mongoose.Promise = Promise;
mongoose.connect(config.mongodb.uri);

function deleteUsers() {
    console.log('deleting users');
    return User.find({}).remove().exec()
        .then(() => {
            return Preference.find({}).remove().exec();
        });
}

function seedUsers() {
    const users = require('./models/seeds/user.seed.json');

    users.forEach(user => {
        if (user.password.substr(0,2) !== '$2') {
            let salt = bcrypt.genSaltSync(config.saltRounds),
                password = user.password;
            user.password = bcrypt.hashSync(password, salt);
        }
    });

    return User.create(users)
        .then(() => {
            console.log('users seeded');
            console.log(' -- ');
        });
}

function deleteItems() {
    console.log('deleting material items');
    return MaterialItem.find({}).remove().exec();
}

function seedItems() {
    const materialItems = require('./models/seeds/material-item.seed.json');
    return MaterialItem.create(materialItems)
        .then(() => {
            console.log('items seeded');
            console.log(' -- ');
        });
}

function deletePackages() {
    console.log('deleting packages');
    return Package.find({}).remove().exec();
}

function seedPackages() {
    const packages = require('./models/seeds/package.seed.json');

    return Package.create(packages)
        .then(() => {
            console.log('packages seeded');
            console.log(' -- ');
        });

    // // manually create packages
    // return Package.create({
    //     "slug": "ultimate",
    //     "name": "Improv+Ultimate",
    //     "description": "Gain access to all of our materials as well as our unbeatable hands-on support and coaching. The Ultimate package comes with your first year of access to the app for free.",
    //     "color": "red",
    //     "price": 1500
    // }).then((improvNetworking) => {
    //     console.log('Created Improv+Networking');
    //     return improvNetworking.addMaterial([
    //         { name: "Improv+Leadership Facilitator's Guide" },
    //         { name: "Improv+Leadership Handouts" },
    //         { name: "Improv+Networking Facilitator's Guide" },
    //         { name: "Improv+Networking Handouts" },
    //         { name: "Facilitation Tips" },
    //         { name: "Handshake Academy" },
    //         { name: "Your Improv+Leadership ROI" }
    //     ]);
    // }).then(() => {
    //     return Package.create({
    //         "slug": "subscription",
    //         "name": "App Subscription",
    //         "description": 'Gain access to the the app for one year',
    //         "price": 99
    //     });
    // }).then((sub) => {
    //     console.log('Created Subscription package');
    //     console.log(' -- ');
    // });
}

function deleteSubscriptions() {
    console.log('deleting subscriptions and purchases');
    return Subscription.find({}).remove().exec()
        .then(() => {
            return Purchase.find({}).remove().exec();
        });

    // console.log('deleting subscriptions and purchases');
    // return Subscription.find({}).remove().exec()
    //     .then(() => {
    //         return Purchase.find({}).remove().exec();
    //     }).then(() => {
    //         return User.find({}).exec();
    //     }).then(users => {
    //         let doUser = (userIndex) => {
    //             let u = users[userIndex];
    //             u.subscription = null;
    //             u.materials = [];
    //             u.purchases = [];
    //             return u.save()
    //                 .then(() => {
    //                     userIndex++;
    //                     if (userIndex < users.length) {
    //                         return doUser(userIndex);
    //                     } else {
    //                         console.log('user purchase data deleted');
    //                     }
    //                 })
    //         }
    //         return doUser(0);
    //     });
}

function seedPurchases(callback) {
    const purchases = require('./models/seeds/purchase.seed.json'),
        subscriptions = require('./models/seeds/subscription.seed.json');

    return Purchase.create(purchases)
        .then(() => {
            return Subscription.create(subscriptions);
        })
        .then(() => {
            console.log('Subscriptions and purchases seeded');
            console.log(' -- ');
        })

    // const expires = "2018-03-08T14:26:29.214Z";
    // const expired = "2016-03-08T14:26:29.214Z";

    // return Package.find({})
    //     .where('slug').equals('ultimate')
    //     .exec()
    //     .then(packages => {
    //         return User.find({})
    //             .where('email').in(['smcgill@denyconformity.com', 'kate@katebringardner.com'])
    //             .exec()
    //             .then(users => {
    //                 let purchaseArray = [];
    //                 packages.forEach((pack, i) => {
    //                     purchaseArray.push({
    //                         type: 'package',
    //                         total: 0,
    //                         package: packages[i]._id
    //                     });
    //                 });

    //                 let createSub = (userIndex) => {
    //                     return charge.createPurchase(users[userIndex], purchaseArray)
    //                         .then(() => {
    //                             userIndex++;
    //                             if (userIndex < users.length) {
    //                                 return createSub(userIndex);
    //                             } else {
    //                                 console.log('Purchases made for Shauvon and Kate');
    //                                 console.log(' -- ');
    //                             }
    //                         })
    //                 }

    //                 return createSub(0);

    //             });
    //     }).then(() => {
    //         // the expired user gets an expired subscription for testing!
    //         return User.findOne({})
    //             .where('email').equals('expireduser@improvpl.us')
    //             .exec();
    //     }).then(expiredUser => {
    //         let expiredDate = new Date();
    //         expiredDate.setFullYear(expiredDate.getFullYear() - 1);
    //         return expiredUser.addSubscription(roles.ROLE_SUBSCRIBER, expiredDate);
    //     });
}

const DBInfo = require('./models/dbinfo.model');

module.exports = {

    resetUsers: function (done) {
        console.log("Re-seeding users. Hopefully you know what you're doing!");
        return deleteUsers()
            .then(seedUsers)
            .then(() => {
                return DBInfo.findOne({}).exec();
            })
            .then(dbi => {
                dbi.user = Date.now();
                return dbi.save();
            })
            .then(() => {
                if (done) {
                    process.exit(0);
                }
            })
    },

    resetMaterials: function (done) {
        console.log('Re-seeding material items');
        return deleteItems()
            .then(seedItems)
            .then(() => {
                return DBInfo.findOne({}).exec();
            })
            .then(dbi => {
                dbi.materials = Date.now();
                return dbi.save();
            })
            .then(() => {
                if (done) {
                    process.exit(0);
                }
            });
    },
    
    resetPackages: function (done) {
        console.log('Re-seeding packages, subscriptions, and purchases');
        return deletePackages()
            .then(seedPackages)
            .then(deleteSubscriptions)
            .then(seedPurchases)
            .then(() => {
                return DBInfo.findOne({}).exec();
            })
            .then(dbi => {
                dbi.package = Date.now();
                return dbi.save();
            })
            .then(() => {
                if (done) {
                    process.exit(0);
                }
            });
    },

    clear: function() {
        return deleteItems()
            .then(deletePackages)
            .then(deleteSubscriptions)
            .then(() => {
                process.exit(0);
            });
    },

    checkForSeed: function() {
        let userBackupTime = new Date(fs.statSync(path.join(__dirname, './models/seeds/user.seed.json')).mtime),
            materialsBackupTime = new Date(fs.statSync(path.join(__dirname, './models/seeds/material-item.seed.json')).mtime),
            packageBackupTime = new Date(fs.statSync(path.join(__dirname, './models/seeds/package.seed.json')).mtime),
            purchaseBackupTime = new Date(fs.statSync(path.join(__dirname, './models/seeds/purchase.seed.json')).mtime),
            subscriptionBackupTime = new Date(fs.statSync(path.join(__dirname, './models/seeds/subscription.seed.json')).mtime),
            dbUserTime,
            dbPackageTime,
            dbMaterialsTime;

        return DBInfo.count({}).exec()
            .then(count => {
                if (count == 0) {
                    return DBInfo.create({});
                }
            })
            .then(() => {
                return DBInfo.findOne({}).exec()
            })
            .then(dbi => {

                dbUserTime = dbi.user.getTime();
                dbPackageTime = dbi.package.getTime();
                dbMaterialsTime = dbi.materials ? dbi.materials.getTime() : 0;

                if (!dbUserTime || 
                        dbUserTime < userBackupTime.getTime() ||
                        dbUserTime < purchaseBackupTime.getTime() ||
                        dbUserTime < subscriptionBackupTime.getTime()) {
                    console.log("User backup is more recent than user database!", dbUserTime, userBackupTime.getTime());
                    return this.resetUsers(false);
                } else {
                    console.log('No need to reset user database...');
                    return Promise.resolve(true);
                }
            })
            .then(() => {
                if (!dbMaterialsTime || 
                    dbMaterialsTime < materialsBackupTime.getTime()) {
                        console.log("Material Item backup is more recent than material item database!");
                        return this.resetMaterials(false);
                    } else {
                        console.log('No need to reset material item database...');
                        return Promise.resolve(true);
                    }
            })
            .then(() => {
                if (!dbPackageTime || 
                    dbPackageTime < packageBackupTime.getTime()) {
                        console.log("Package backup is more recent than package database!");
                        return this.resetPackages(false);
                    } else {
                        console.log('No need to reset package database...');
                        return Promise.resolve(true);
                    }
            })
            .then(() => {
                process.exit(0);
            })
    }

}