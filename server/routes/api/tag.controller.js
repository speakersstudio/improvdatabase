const mongoose = require('mongoose');
        
const   util = require('../../util');

const Game = require('../../models/game.model');
const Name = require('../../models/name.model');
const Tag = require('../../models/tag.model');

module.exports = {

    create: (req, res) => {

        res.status(404).send('Use /api/game/addTag instead!')

    },

    getAll: (req, res) => {
        Tag.find({})
            .exec()
            .then(tags => {
                res.json(tags);
            })
    },

    get: (req, res) => {
        Tag.findOne({})
            .where('_id').equals(req.params.id)
            .exec()
            .then(tag => {
                res.json(tag);
            }, error => {
                util.handleError(req, res, error);
            });
    },

    update: (req, res) => {
        let data = req.body,
            tagId = req.params.id || req.body._id,
            userId = req.user._id;

        Tag.find({}).where('_id').equals(tagId).exec()
            .then(tag => {
                tag.name = data.name;
                tag.description = data.description;
                tag.modifiedUser = userId;
                tag.dateModified = Date.now();

                return tag.save();
            }, error => {
                util.handleError(req, res, error);
            })
            .then(tag => {
                res.json(tag);
            });
    },

    delete: (req, res) => {
        let tagId = req.params.id;
        Tag.find({}).where('_id').equals(tagId).remove().exec()
            .then(() => {
                res.send('Success');
            });
    },

    backup: (req, res) => {
        Tag.find({}).exec().then(t => {
            res.json(t);
        });
    }

}