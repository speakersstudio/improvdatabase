const mongoose = require('mongoose');
        
const   util = require('../../util');

const Game = require('../../models/game.model');
const Name = require('../../models/name.model');

module.exports = {

    create: (req, res) => {

        let gameId = req.body.game,
            userId = req.user._id;

        Game.findOne({})
            .where('_id').equals(gameId)
            .populate('names')
            .exec()
            .catch(err => {
                util.catchError(req, res, err);
            })
            .then(game => {
                return game.addName(req.body.name, userId);
            })
            .then(game => {
                let name = {};
                game.names.forEach(n => {
                    if (n.name && n.name == req.body.name) {
                        name = n;
                        return false;
                    }
                });
                res.json(name);
            })

    },

    getAll: (req, res) => {
        Name.find({})
            .populate('votes')
            // .sort('-weight -dateAdded')
            .exec()
            .then(names => {
                res.json(names);
            });
    },

    get: (req, res) => {
        Name.findOne({})
            .where('_id').equals(req.params.id)
            .exec()
            .then(name => {
                res.json(name);
            });
    },

    update: (req, res) => {
        let data = req.body,
            nameID = req.params.id || req.body._id,
            userId = req.user._id;

        Name.findOne({}).where('_id').equals(nameID).exec()
            .then(name => {
                name.name = data.name;
                name.modifiedUser = userId;
                name.dateModified = Date.now();

                return name.save();
            })
            .then(name => {
                res.json(name);
            });
    },

    backup: (req, res) => {
        Name.find({}).then(n => {
            res.json(n);
        });
    }

    // delete: (req, res) => {
    //     // TODO
    // },

    // vote: (req, res) => {
    //     // TODO
    // }

}