const mongoose = require('mongoose');
const MaterialItem = require('../../models/material-item.model');
const Package = require('../../models/package.model');
const Subscription = require('../../models/subscription.model');

const subsCtrl = require('./subscription.controller');

module.exports = {

    getAll: (req, res) => {

        subsCtrl.getSubs(req.user.UserID, false)
            // .catch(err => {
            //     res.status(500).json(err);
            // })
            // .then(subs => {
            //     res.json(subs);
            // })
            .then(subs => {
                let materialIds = [];
                subs.forEach(sub => {
                    sub.package.materials.forEach(material => {
                        materialIds.push(material.materialItem);
                    });
                });

                return MaterialItem
                    .find()
                    .where('_id').in(materialIds)
                    .exec();
            })
            .then(items => {
                res.json(items);
            });

    },

    get: (req, res) => {

    }

}