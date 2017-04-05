const fs = require('fs');
const path = require('path');
const mime = require('mime');
const jwt = require('jwt-simple');
const Busboy = require('busboy');

const config  = require('../../config')();

const mongoose = require('mongoose');
const MaterialItem = require('../../models/material-item.model');
const Package = require('../../models/package.model');
const Subscription = require('../../models/subscription.model');

const subCtrl = require('./subscription.controller');
const auth = require('../../auth');

const util = require('../../util');

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
            superAdmin = req.user.superAdmin,
            access = false;

        if (materialId == 'all') {

            // special for super admins - show all items (even hidden ones)

            if (!superAdmin) {
                return auth.unauthorized(req, res);
            }

            MaterialItem.find({}).sort('name').exec()
                .then(m => {
                    res.json(m);
                });

        } else {

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

        }

    },

    update: (req, res) => {
        let materialItem = req.body;

        MaterialItem.findOne({})
            .where("_id").equals(req.params.id)
            .exec()
            .then(m => {
                util.smartUpdate(m, materialItem, [
                    'name', 'description', 'price', 'color', 'fileslug', 'extension', 'tags', 'visible'
                ]);
                return m.save();
            })
            .then(m => {
                res.json(m);
            })
    },

    version: (req, res) => {
        let busboy = new Busboy({ headers: req.headers }),
            file;
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            file.on('data', function(data) {
                file += data;
            });
            file.on('end', function() {
                console.log('file', file);
            })
        });
        busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
            console.log('field', fieldname, val);
        });
        busboy.on('finish', () => {
            console.log('done parsing form');
            res.json({});
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