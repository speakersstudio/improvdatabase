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
const userController = require('./user.controller');

const subCtrl = require('./subscription.controller');
const auth = require('../../auth');

const util = require('../../util');

const materialFolderName = '../../../materials';

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

            let materialItem;

            MaterialItem.findOne({})
                .where("_id").equals(materialId)
                .exec()
                .then(m => {
                    materialItem = m;
                    if (!materialItem) {
                        res.status(404).end();
                        return;
                    }
                    // we have to load up the user's materials, to make sure they own this one
                    return userController.fetchMaterials(req.user._id);
                }).then(user => {

                    let access = false;

                    access = util.indexOfObjectId(user.materials, materialItem._id) > -1;

                    if (!access) {
                        let teams = [];
                        // a neat trick to concatenate object arrays
                        teams.push.apply(teams, user.adminOfTeams);
                        teams.push.apply(teams, user.memberOfTeams);

                        teams.forEach(team => {
                            if (team && team.materials) {
                                access = util.indexOfObjectId(team.materials, materialItem._id) > -1;
                            }
                        });
                    }

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
        if (req.method == 'POST') {
            let busboy = new Busboy({ headers: req.headers }),
                fileData,
                ver,
                description,
                tempLocation,
                fileExtension,
                materialId = req.params.id;

            busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
                fileExtension = filename.substr(filename.lastIndexOf('.'), filename.length);
                tempLocation = path.join(__dirname, materialFolderName, materialId + fileExtension);

                if (!fs.existsSync(path.join(__dirname, materialFolderName))) {
                    fs.mkdirSync(path.join(__dirname, materialFolderName));
                }

                file.pipe(fs.createWriteStream(tempLocation));
            });
            busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
                if (fieldname == 'ver' && val != 'undefined') {
                    ver = val;
                } else if (fieldname == 'description' && val != 'undefined') {
                    description = val;
                }
            });
            busboy.on('finish', () => {
                MaterialItem.findOne({}).where('_id').equals(materialId).exec()
                    .then(item => {

                        if (!ver || ver == 'undefined') {
                            ver = 0;
                            item.versions.forEach(v => {
                                if (v.ver >= ver) {
                                    ver = v.ver;
                                }
                            });
                            ver++;
                        }

                        fs.rename(tempLocation, tempLocation.replace(fileExtension, '.' + ver + fileExtension));

                        item.versions.push({
                            ver: ver,
                            extension: fileExtension.replace('.', ''),
                            description: description
                        });

                        return item.save();
                    })
                    .then(item => {
                        res.json(item);
                    })
            });
            req.pipe(busboy);

        } else if (req.method == 'DELETE') {

            let materialId = req.params.id,
                versionId = req.params.toId;

            MaterialItem.findOne({}).where('_id').equals(materialId).exec()
                .then(item => {
                    let version = item.versions[util.indexOfObjectId(item.versions, versionId)];

                    fs.unlink(path.join(__dirname, materialFolderName, materialId + '.' + version.ver + '.' + version.extension));

                    item.versions = util.removeFromObjectIdArray(item.versions, versionId);
                    return item.save();
                })
                .then(item => {
                    res.json(item);
                });

        }
    },

    download: (req, res, next) => {
        let token = req.params.token,
            decoded = jwt.decode(token, config.token),
            id = decoded.iss;

        console.log(decoded.exp, Date.now());

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
    },

    backup: (req, res) => {
        return MeterialItem.find({})
            .select('-versions') // we don't want to back up the actual files
            .exec()
            .then(i => {
                res.json(i);
            })
    }

}