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
            },
            gameModel;
        
        updateGame(Game.create(gameData), data, userId)
            .then(game => {
                res.json(gameModel);
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
        getGames()
            .catch(err => {
                util.handleError(req, res, err);
            }).then(games => {
                res.json(games);
            });

    },

    get: (req, res) => {
        getGames(req.params.id)
            .catch(err => {
                util.handleError(req, res, err);
            }).then(games => {
                res.json(games[0]);
            });
    },

    addTag: (req, res) => {
        let gameId = req.params.id,
            tagId = req.params.toId;

        return getGames(gameId).then(games => {
            let game = games[0];
            return game.addTag(null, tagId, req.user._id);
        }).then(game => {
            res.json(game);
        });
    },

    removeTag: (req, res) => {
        let gameId = req.params.id,
            tagId = req.params.toId;

        return getGames(gameId).then(games => {
            let game = games[0];
            return game.removeTag(tagId, req.user._id);
        }).then(game => {
            res.json(game);
        })
    },

    createTag: (req, res) => {
        let gameId = req.params.id,
            tag = req.body.name;
        
        return getGames(gameId).then(games => {
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

function getGames(id) {
    let query = Game.find({})
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
            path: 'playerCount',
            select: 'name description',
        })
        .populate({
            path: 'duration',
            select: 'name description'
        })
        .populate({
            path: 'tags.tag',
            select: 'name description'
        })
        .populate({
            path: 'addedUser',
            select: 'firstName lastName'
        })
        .populate({
            path: 'modifiedUser',
            select: 'firstName lastName'
        })

    if (id) {
        query.where('_id').equals(id);
    }

    return query.exec();
}