const fs = require('fs');
const path = require('path');
const mime = require('mime');
const jwt = require('jwt-simple');
const config  = require('../../config')();

const mongoose = require('mongoose');
const MaterialItem = require('../../models/material-item.model');
const Package = require('../../models/package.model');
const Subscription = require('../../models/subscription.model');

const subCtrl = require('./subscription.controller');
const auth = require('../../auth');

module.exports = {

    getAll: (req, res) => {
        MaterialItem.find({})
            .where("visible").equals(true)
            .exec()
            .then(ms => {
                res.json(ms);
            });
    },

    get: (req, res) => {

        let userId = req.user._id,
            materialId = req.params.id,
            access = false;

        MaterialItem.findOne({})
            .where("_id").equals(materialId)
            .exec()
            .then(m => {
                if (!m) {
                    res.status(404).end();
                    return;
                }

                let materialItem = m,
                    access = false;

                req.user.materials.forEach(thismat => {
                    if (thismat._id.equals(materialItem._id)) {
                        access = true;
                    }
                });

                if (access && materialItem) {

                    var dateObj = new Date();
                    dateObj.setMinutes(dateObj.getMinutes() + 1); // you have one minute

                    let token = jwt.encode({
                        exp: dateObj.getTime(),
                        iss: materialItem.id
                    }, config.token);

                    res.json({
                        url: '/download/' + token
                    });

                } else {
                    // the user either doesn't have access, or the file doesn't exist
                    auth.unauthorized(req, res);
                }
            });

    },

    download: (req, res, next) => {
        let token = req.params.token,
            decoded = jwt.decode(token, config.token),
            id = decoded.iss;

        if (decoded.exp > Date.now()) {
            MaterialItem.findOne({})
                .where("_id").equals(id)
                .exec()
                .catch(err => {
                    res.status(500).json(err);
                })
                .then(m => {
                    // the user has access to the file!
                    let file = path.join(__dirname, '../../../materials/') + m.filename();
                    res.download(file, m.dlfilename());
                });
        } else {
            auth.unauthorized(req,res);
        }
    }

}