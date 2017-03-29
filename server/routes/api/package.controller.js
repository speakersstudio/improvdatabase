const mongoose = require('mongoose');
const MaterialItem = require('../../models/material-item.model');
const Package = require('../../models/package.model');
const Subscription = require('../../models/subscription.model');

module.exports = {

    getAll: (req, res) => {

        Package.find({})
            // .populate('materials.materialItem')
            // .select('name description price dateModified dateAdded')
            .exec((err, packages) => {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                }

                res.json(packages);
            });

    },

    backup: (req, res) => {
        Package.find({}).exec()
            .then(p => {
                res.json(p);
            });
    }

}