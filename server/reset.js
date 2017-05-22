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
const HistoryModel = require('./models/history.model');

const Game = require('./models/game.model'),
    GameMetadata = require('./models/game-metadata.model'),
    NameVote = require('./models/name-vote.model'),
    Name = require('./models/name.model'),
    Note = require('./models/note.model'),
    Tag = require('./models/tag.model');

const backuptime = 1494449014692;
const   databases = {
            'Invite': backuptime,
            'MaterialItem': 1495120689280,
            'PackageConfig': backuptime,
            'Package': 1495120689280,
            'Preference': backuptime,
            'Purchase': backuptime,
            'Subscription': backuptime,
            'Team': backuptime,
            'User': backuptime,
            'History': backuptime,

            'GameMetadata': backuptime,
            'Game': backuptime,
            'Name': backuptime,
            'NameVote': backuptime,
            'Note': backuptime,
            'Tag': backuptime
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

    History: () => {
        console.log('deleting history');
        return HistoryModel.find({}).remove().exec();
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
        seedData = require('./models/seeds/' + key + '_' + databases[key] + '.json');
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
        return doSeed('Invite', InviteModel);
    },

    MaterialItem: () =>{
        return doSeed('MaterialItem', MaterialItem);
    },

    PackageConfig: () =>{
        return doSeed('PackageConfig', PackageConfig);
    },

    Package: () =>{
        return doSeed('Package', Package, null, (packages) => {
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
        return doSeed('Preference', Preference);
    },

    Purchase: () =>{
        return doSeed('Purchase', Purchase);
    },

    Subscription: () =>{
        return doSeed('Subscription', Subscription);
    },

    Team: () =>{
        return doSeed('Team', Team);
    },

    User: () =>{
        return doSeed('User', User, (users) => {
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

    History: () => {
        return doSeed('History', HistoryModel);
    },

    GameMetadata: () => {
        return doSeed('GameMetadata', GameMetadata);
    },

    Game: () => {
        return doSeed('Game', Game);
    },

    Name: () => {
        return doSeed('Name', Name);
    },

    NameVote: () => {
        return doSeed('NameVote', NameVote);
    },

    Note: () => {
        return doSeed('Note', Note);
    },

    Tag: () => {
        return doSeed('Tag', Tag);
    }

}

function resetAllTimes() {
    return DBInfo.find({}).remove();
}

function cleanup() {
    // remove names that don't go with a game
    // let namesToRemove = [];
    return Name.find({}).exec().then(names => {
        return util.iterate(names, (name) => {
            let gameId = name.game;
            return Game.find({}).where('_id').equals(gameId).exec()
                .then(games => {
                    if (!games || !games.length) {
                        // namesToRemove.push(name);
                        console.log('Removing name ' + name.name);
                        return name.remove();
                    } else {
                        return Promise.resolve();
                    }
                })
            })
        });
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
            .then(deleteMethods.History)

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

    cleanup: function() {
        cleanup().then(() => {
            process.exit(0);
        })
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