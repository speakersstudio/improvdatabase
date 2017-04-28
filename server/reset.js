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
const PackageConfig = require('./models/packageconfig.model');

const userBackupTime = 1493217409986,
    materialsBackupTime = 1493175922371,
    packageBackupTime = 1493217409986,
    purchaseBackupTime = 1493217409986,
    subscriptionBackupTime = 1493140912105,
    packageConfigBackupTime = 1493233082882;

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
        // only necessary if we don't have ids for everything
        // .then(ps => {
        //     let ids = [],
        //         ultimate;
        //     ps.forEach(p => {
        //         if (p.slug != 'ultimate') {
        //             ids.push(p._id);
        //         } else {
        //             ultimate = p;
        //         }
        //     });

        //     ultimate.packages = ids;
        //     return ultimate.save();
        // })
        .then(() => {
            console.log('packages seeded');
            console.log(' -- ');
        });
}

function deleteSubscriptions() {
    console.log('deleting subscriptions and purchases');
    return Subscription.find({}).remove().exec()
        .then(() => {
            return Purchase.find({}).remove().exec();
        });
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
        });
}

function deletePackageConfig() {
    console.log('deleting package Config data');
    return PackageConfig.find({}).remove().exec();
}

function seedPackageConfig() {
    const data = require('./models/seeds/packageconfig.seed.json');

    return PackageConfig.create(data)
        .then(() => {
            console.log('Package Config data seeded');
            console.log('--');
        })
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
            });
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

    resetPackageConfig: function (done) {
        console.log('Resetting package Config data');
        return deletePackageConfig()
            .then(seedPackageConfig)
            .then(() => {
                return DBInfo.findOne({}).exec();
            })
            .then(dbi => {
                dbi.packageConfig = Date.now();
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
        let dbUserTime,
            dbPackageTime,
            dbMaterialsTime,
            dbPackageConfigTime;

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

                dbUserTime = dbi.user ? dbi.user.getTime() : 0;
                dbPackageTime = dbi.package ? dbi.package.getTime() : 0;
                dbMaterialsTime = dbi.materials ? dbi.materials.getTime() : 0;
                dbPackageConfigTime = dbi.packageConfig ? dbi.packageConfig.getTime() : 0;

                if (!dbUserTime || 
                        dbUserTime < userBackupTime ||
                        dbUserTime < purchaseBackupTime ||
                        dbUserTime < subscriptionBackupTime) {
                    console.log("User backup is more recent than user database!", dbUserTime, userBackupTime);
                    return this.resetUsers(false);
                } else {
                    console.log('No need to reset user database...');
                    return Promise.resolve(true);
                }
            })
            .then(() => {
                if (!dbMaterialsTime || 
                    dbMaterialsTime < materialsBackupTime) {
                        console.log("Material Item backup is more recent than material item database!");
                        return this.resetMaterials(false);
                    } else {
                        console.log('No need to reset material item database...');
                        return Promise.resolve(true);
                    }
            })
            .then(() => {
                if (!dbPackageTime || 
                    dbPackageTime < packageBackupTime) {
                        console.log("Package backup is more recent than package database!");
                        return this.resetPackages(false);
                    } else {
                        console.log('No need to reset package database...');
                        return Promise.resolve(true);
                    }
            })
            .then(() => {
                if (!dbPackageConfigTime ||
                    dbPackageConfigTime < packageConfigBackupTime) {
                        console.log('PackageConfig backup is more recent than package config database!');
                        return this.resetPackageConfig(false);
                    } else {
                        console.log('No need to reset package config database...');
                        return Promise.resolve(true);
                    }
            })
            .then(() => {
                process.exit(0);
            })
    }

}