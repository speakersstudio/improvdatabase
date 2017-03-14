const mongoose = require('mongoose');
        
const   util = require('../util');

const Game = require('../../models/game.model');
const Name = require('../../models/name.model');

module.exports = {

    create: (req, res) => {

        let gameId = req.body.game,
            userId = req.user._id;

        Game.find({}).where('_id').equals(gameId).exec()
            .then(game => {
                return game.addName(req.body.name, userId);
            })
            .then(game => {
                res.json(game);
            })

    },

    getAll: (req, res) => {
        Name.find({})
            .exec()
            .then(names => {
                res.json(names);
            })
    },

    get: (req, res) => {
        Name.findOne({})
            .where('_id').equals(req.params.id)
            .exec()
            .then(name => {
                res.json(name);
            });
    },

    // update: (req, res) => {
    //     // TODO
    // }

    // delete: (req, res) => {
    //     // TODO
    // },

    // vote: (req, res) => {
    //     // TODO
    // }

}