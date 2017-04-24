const mongoose = require('mongoose');
        
const   util = require('../../util');

const Game = require('../../models/game.model');
const Tag = require('../../models/tag.model');

module.exports = {

    create: (req, res) => {

        let data = req.body,
            userId = req.user._id,
            gameData = {
                addedUser: userId,
                description: data.description
            };
        
        updateGame(Game.create(gameData), data, userId)
            .then(game => {
                res.json(game);
            });

    },

    delete: (req, res) => {

        let gameId = req.params.id;

        Game.remove({ _id: gameId }).then(() => {
            res.send('Success');
        });

    },

    update: (req, res) => {

        let data = req.body,
            userId = req.user._id,
            gameId = req.params.id || data._id;
        
        return updateGame(Game.findOne({}).where('_id').equals(gameId).exec(), data, userId)
            .then(game => {
                if (data.description) {
                    game.description = data.description;
                }
                game.modifiedUser = userId;
                game.dateModified = Date.now();
                return game.save();
            })
            .then(game => {
                res.json(game);
            });

    },

    getAll: (req, res) => {
        getGames(req.user)
            .catch(err => {
                util.handleError(req, res, err);
            }).then(games => {
                res.json(games);
            });

    },

    get: (req, res) => {
        getGames(req.user, req.params.id)
            .catch(err => {
                util.handleError(req, res, err);
            }).then(games => {
                res.json(games[0]);
            });
    },

    addTag: (req, res) => {
        let gameId = req.params.id,
            tagId = req.params.toId;

        return getGames(req.user, gameId).then(games => {
            let game = games[0];
            return game.addTag(null, tagId, req.user._id);
        }).then(game => {
            res.json(game);
        });
    },

    removeTag: (req, res) => {
        let gameId = req.params.id,
            tagId = req.params.toId;

        return getGames(req.user, gameId).then(games => {
            let game = games[0];
            return game.removeTag(tagId, req.user._id);
        }).then(game => {
            res.json(game);
        })
    },

    createTag: (req, res) => {
        let gameId = req.params.id,
            tag = req.body.name;
        
        return getGames(req.user, gameId).then(games => {
            let game = games[0];
            return game.addTag(tag, null, req.user._id);
        }).then(game => {
            res.json(game);
        });
        
        // }).then(game => {
        //     return Tag.findOne({}).where('name').equals(tag).exec();
        // }).then(tag => {
        //     res.json(tag);        
        // });
    },

    backup: (req, res) => {
        return Game.find({})
            .then(games => {
                res.json(games);
            })
    }

}

function updateGame(gamePromise, data, userId) {
    return gamePromise
        .catch(err => { util.handleError(req,res,err) })
        .then(game => {
            if (data.duration && data.duration != game.duration) {
                return game.addMetadata(data.duration);
            } else {
                return game;
            }
        })
        .then(game => {
            if (data.playerCount && data.playerCount != game.playerCount) {
                return game.addMetadata(data.playerCount);
            } else {
                return game;
            }
        })
        // .then(game => {
        //     gameModel = game;
        //     if (data.tags && data.tags.length) {
        //         let handleTag = (tagIndex) => {
        //             return game.addTag(data.tags[tagIndex].tag.name, userId)
        //                 .then(() => {
        //                     tagIndex++;
        //                     if (data.tags[tagIndex]) {
        //                         return handleTag(tagIndex);
        //                     }
        //                 });
        //         }
        //         return handleTag(0);
        //     }
        // })
        // .then(game => {
        //     if (data.names && data.names.length != game.names.length) {
        //         let handleName = (nameIndex) => {
        //             let name = data.names[nameIndex],
        //                 newname = true;
        //             game.names.forEach(n => {
        //                 if (n.name == name) {
        //                     newname = false;
        //                     return false;
        //                 }
        //             });
        //             let promise;
        //             if (newname) {
        //                 promise = game.addName(data.names[nameIndex].name, userId);
        //             } else {
        //                 promise = game;
        //             }
        //             return promise
        //                     .then(game => {
        //                         nameIndex++;
        //                         if (data.names[nameIndex]) {
        //                             return handleName(nameIndex);
        //                         }
        //                     });
        //         }
        //         return handleName(0);
        //     } else {
        //         return game;
        //     }
        // });
}

function getGames(user, id) {
    
    let query = Game.find({})

    query.select('addedUser dateAdded dateModified description modifiedUser names');

    query
        .populate({
            path: 'names',
            select: 'name votes weight dateAdded dateModified',
            populate: {
                path: 'votes'
            },
            options: {
                sort: '-weight -dateAdded'
            }
        })
        .populate({
            path: 'addedUser',
            select: 'firstName lastName'
        })
        .populate({
            path: 'modifiedUser',
            select: 'firstName lastName'
        })

    if (user.actions.indexOf('metadata_view') > -1) {
        query.select('playerCount duration')
        .populate({
            path: 'playerCount',
            select: 'name description',
        })
        .populate({
            path: 'duration',
            select: 'name description'
        })
    }

    if (user.actions.indexOf('tag_view') > -1) {
        query.select('tags')
        .populate({
            path: 'tags.tag',
            select: 'name description'
        })
    }

    if (id) {
        query.where('_id').equals(id);
    }

    return query.exec();
}