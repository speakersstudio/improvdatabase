const mongoose = require('mongoose'),
    Promise = require('bluebird'),
    bcrypt = require('bcrypt'),
    fs = require('fs'),
    path = require('path');

var config = require('./config')();

const charge = require('./routes/charge'),
    roles = require('./roles'),
    util = require('./util');

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

const Game = require('./models/game.model'),
    GameMetadata = require('./models/game-metadata.model'),
    NameVote = require('./models/name-vote.model'),
    Name = require('./models/name.model'),
    Note = require('./models/note.model'),
    Tag = require('./models/tag.model');

const   databases = {
            'Invite': 1493838843811,
            'MaterialItem': 1493847396156,
            'PackageConfig': 1493838843811,
            'Package': 1493838843811,
            'Preference': 1493838843811,
            'Purchase': 1493838843811,
            'Subscription': 1493846462338,
            'Team': 1493838843811,
            'User': 1494103814520,

            'GameMetadata': 1494103814520,
            'Game': 1494103814520,
            'Name': 1494103814520,
            'NameVote': 1494103814520,
            'Note': 1494103814520,
            'Tag': 1494103814520
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
    },

    GameMetadata: () =>{
        console.log('deleting Game Metadata');
        return GameMetadata.find({}).remove().exec();
    },

    Game: () =>{
        console.log('deleting Games');
        return Game.find({}).remove().exec();
    },

    Name: () =>{
        console.log('deleting Names');
        return Name.find({}).remove().exec();
    },

    NameVote: () =>{
        console.log('deleting Name Votes');
        return NameVote.find({}).remove().exec();
    },

    Note: () =>{
        console.log('deleting Notes');
        return Note.find({}).remove().exec();
    },

    Tag: () =>{
        console.log('deleting Tags');
        return Tag.find({}).remove().exec();
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
    } else if (!cancelCreate) {
        console.log(key + ' has no seed file');
        console.log(' -- ');
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
    },

    GameMetadata: () => {
        return doSeed('game-metadata', GameMetadata);
    },

    Game: () => {
        return doSeed('game', Game);
    },

    Name: () => {
        return doSeed('name', Name);
    },

    NameVote: () => {
        return doSeed('name-vote', NameVote);
    },

    Note: () => {
        return doSeed('note', Note);
    },

    Tag: () => {
        return doSeed('tag', Tag);
    }

}

function resetAllTimes() {
    return DBInfo.find({}).remove();
}

const DBInfo = require('./models/dbinfo.model');

module.exports = {

    databases: databases,

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

            .then(deleteMethods.GameMetadata)
            .then(deleteMethods.Game)
            .then(deleteMethods.Name)
            .then(deleteMethods.NameVote)
            .then(deleteMethods.Note)
            .then(deleteMethods.Tag)

            .then(resetAllTimes)
            .then(() => {
                process.exit(0);
            });
    },

    reset: function() {
        module.exports.checkForSeed(true);
    },

    checkForSeed: function(force) {

        let keys = Object.keys(databases);

        return DBInfo.count({}).exec()
            .then(count => {
                if (count == 1) {
                    return resetAllTimes();
                }
            })
            .then(() => {
                return util.iterate(keys, (key) => {
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
                            if (info.latest < databases[key] || force) {
                                if (!force) {
                                    console.log(key + ' backup is more recent than database!');
                                }
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
                })
            })
            .then(() => {
                process.exit(0);
            })
    }

}