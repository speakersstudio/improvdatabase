const mongoose = require('mongoose'),
    Promise = require('bluebird'),
    bcrypt = require('bcrypt'),
    fs = require('fs'),
    path = require('path');

var config = require('./config')();

const charge = require('./routes/charge'),
    roles = require('./roles');

const Contact = require('./models/contact.model.js');
const InviteModel = require('./models/invite.model');
const Subscription = require('./models/subscription.model');
const Purchase = require('./models/purchase.model');
const User = require('./models/user.model');
const Team = require('./models/team.model');
const MaterialItem = require('./models/material-item.model');
const Package = require('./models/package.model');
const Preference = require('./models/preference.model');
const PackageConfig = require('./models/packageconfig.model');

const   databases = {
            'Invite': 1493838843811,
            'MaterialItem': 1493847396156,
            'PackageConfig': 1493838843811,
            'Package': 1493838843811,
            'Preference': 1493838843811,
            'Purchase': 1493838843811,
            'Subscription': 1493846462338,
            'Team': 1493838843811,
            'User': 1493838843811
        }

mongoose.Promise = Promise;
mongoose.connect(config.mongodb.uri);

// functions to delete all of the things
deleteMethods = {

    Invite: () => {
        console.log('deleting invites')
        return InviteModel.find({}).remove().exec();
    },

    MaterialItem: () =>{
        console.log('deleting material items');
        return MaterialItem.find({}).remove().exec();
    },

    PackageConfig: () =>{
        console.log('deleting package config');
        return PackageConfig.find({}).remove().exec();
    },

    Package: () =>{
        console.log('deleting packages');
        return Package.find({}).remove().exec();
    },

    Preference: () =>{
        console.log('deleting preferences');
        return Preference.find({}).remove().exec();
    },

    Purchase: () =>{
        console.log('deleting purchases');
        return Purchase.find({}).remove().exec();
    },

    Subscription: () =>{
        console.log('deleting subscriptions');
        return Subscription.find({}).remove().exec();
    },

    Team: () =>{
        console.log('deleting teams');
        return Team.find({}).remove().exec();
    },

    User: () =>{
        console.log('deleting users');
        return User.find({}).remove().exec();
    }

}


// functions to seed everything
function doSeed(key, Model, dataProcess, afterCreate, cancelCreate) {
    let seedData;
    
    try {
        seedData = require('./models/seeds/' + key + '.seed.json');
    } catch (e) {
        seedData = [];
    }

    if (typeof(dataProcess) == 'function') {
        seedData = dataProcess(seedData);
    }

    if (seedData.length && !cancelCreate) {
        return Model.create(seedData)
            .then(models => {
                if (typeof(afterCreate) == 'function') {
                     return afterCreate(models);
                } else {
                    return Promise.resolve();
                }
            }).then(() => {
                console.log(key + ' seeded');
                console.log(' -- ');
            });
    }
}

seedMethods = {

    Invite: () =>{
        return doSeed('invite', InviteModel);
    },

    MaterialItem: () =>{
        return doSeed('material-item', MaterialItem);
    },

    PackageConfig: () =>{
        return doSeed('package-config', PackageConfig);
    },

    Package: () =>{
        return doSeed('package', Package, null, (packages) => {
            // let ids = [],
            //     ultimate;
            // packages.forEach(p => {
            //     if (p.slug != 'ultimate') {
            //         ids.push(p._id);
            //     } else {
            //         ultimate = p;
            //     }
            // });

            // ultimate.packages = ids;
            // return ultimate.save();
        })
    },

    Preference: () =>{
        return doSeed('preference', Preference);
    },

    Purchase: () =>{
        return doSeed('purchase', Purchase);
    },

    Subscription: () =>{
        return doSeed('subscription', Subscription);
    },

    Team: () =>{
        return doSeed('team', Team);
    },

    User: () =>{
        return doSeed('user', User, (users) => {
            users.forEach(user => {
                // hash the password if it isn't already
                if (user.password.substr(0,2) !== '$2') {
                    let salt = bcrypt.genSaltSync(config.saltRounds),
                        password = user.password;
                    user.password = bcrypt.hashSync(password, salt);
                }
            });
            return users;
        });
    }

}



function resetAllTimes() {
    return DBInfo.find({}).remove();
}


const DBInfo = require('./models/dbinfo.model');

module.exports = {

    clear: function() {
        return deleteMethods.Invite()
            .then(deleteMethods.MaterialItem)
            .then(deleteMethods.PackageConfig)
            .then(deleteMethods.Package)
            .then(deleteMethods.Preference)
            .then(deleteMethods.Purchase)
            .then(deleteMethods.Subscription)
            .then(deleteMethods.Team)
            .then(deleteMethods.User)
            .then(resetAllTimes)
            .then(() => {
                process.exit(0);
            });
    },

    checkForSeed: function() {

        let keys = Object.keys(databases);

        let checkDatabase = function(index) {
            let key = keys[index];
            return DBInfo.findOne({})
                .where('key').equals(key).exec()
                .then(info => {
                    if (!info) {
                        return DBInfo.create({
                            key: key,
                            latest: 0
                        });
                    } else {
                        return Promise.resolve(info);
                    }
                })
                .then(info => {
                    if (!deleteMethods[key]) {
                        console.log(' ALERT ALERT NO DELETE METHOD SPECIFIED FOR ' + key);
                        return Promise.resolve(false);
                    }
                    if (!seedMethods[key]) {
                        console.log(' ALERT ALERT NO SEED METHOD SPECIFIED FOR ' + key);
                        return Promise.resolve(false);
                    }
                    if (info.latest < databases[key]) {
                        console.log(key + ' backup is more recent than database!');
                        return deleteMethods[key]().then(seedMethods[key])
                            .then(() => {
                                info.latest = Date.now();
                                return info.save();
                            });
                    } else {
                        console.log('No need to reset ' + key + ' database');
                        return Promise.resolve(true);
                    }
                })
                .then(() => {
                    index++;
                    if (keys[index]) {
                        return checkDatabase(index);
                    }
                })
        }


        return DBInfo.count({}).exec()
            .then(count => {
                if (count == 1) {
                    return resetAllTimes();
                }
            })
            .then(() => {
                return checkDatabase(0);
            })
            .then(() => {
                process.exit(0);
            })
    }

}