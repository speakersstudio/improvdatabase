const mongoose = require('mongoose');
        
const   util = require('../util');

const Game = require('../../models/game.model');

module.exports = {

    create: (req, res) => {

        let data = req.body,
            userId = req.user._id,
            gameData = {
                addedUser: userId,
                description: data.description
            },
            gameModel;
        
        updateGame(Game.create(gameData), data)
            .then(game => {
                res.json(gameModel);
            });

    },

    update: (req, res) => {

        let data = req.body,
            userId = req.user._id,
            gameId = req.params.id || data._id;
        
        updateGame(Game.find({}).where('_id').equals(gameid).exec(), data)
            .then(game => {
                if (body.description) {
                    game.description = body.description;
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

        getGames().then(games => {
            res.json(games);
        });

    },

    get: (req, res) => {

        getGames(req.params.id).then(games => {
            res.json(games[0]);
        })

    }


}

function updateGame(gamePromise, data) {
    return gamePromise
        .catch(err => { util.handleError(req,res,err) })
        .then(game => {
            if (data.duration && data.duration != game.duration) {
                return game.addMetadata(data.duration);
            }
        })
        .then(game => {
            if (data.playerCount && data.playerCount != game.playerCount) {
                return game.addMetadata(data.playerCount);
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
        .then(game => {
            if (data.names && data.names.length) {
                let handleName = (nameIndex) => {
                    return game.addName(data.names[nameIndex].name, userId)
                        .then(game => {
                            nameIndex++;
                            if (data.names[nameIndex]) {
                                return handleName(nameIndex);
                            }
                        })
                }
                return handleName(0);
            }
        });
}

function getGames(id) {
    let query = Game.find({})
        .populate({
            path: 'names',
            select: 'name votes'
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

    if (id) {
        query.where('_id').equals(id);
    }

    return query.exec()
        .catch(err => {
            util.handleError(req, res, err);
        })
}