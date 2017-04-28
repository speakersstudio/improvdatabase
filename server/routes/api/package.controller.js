const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const aws = require('aws-sdk');
const path = require('path');
const fs = require('fs');

const config  = require('../../config')();
const auth = require('../../auth');

const MaterialItem = require('../../models/material-item.model');
const Package = require('../../models/package.model');
const Subscription = require('../../models/subscription.model');

const userController = require('./user.controller');

const util = require('../../util');

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
    },

    get: (req, res) => {

        let userId = req.user._id,
            packageId = req.params.id,
            superAdmin = req.user.superAdmin,
            access = false;

        if (packageId == 'all') {

            // special for super admins - show all items (even hidden ones)

            if (!superAdmin) {
                return auth.unauthorized(req, res);
            }

            Package.find({}).sort('name').exec()
                .then(p => {
                    res.json(p);
                });

        } else {

            let pkg;

            Package.findOne({})
                .where("_id").equals(packageId)
                .exec()
                .then(p => {
                    pkg = p;
                    if (!pkg) {
                        res.status(404).end();
                        return;
                    }
                    
                    return userController.doesUserOwn(req.user, null, packageId);
                }).then(access => {
                    
                    if (access && pkg) {

                        var dateObj = new Date();
                        dateObj.setMinutes(dateObj.getMinutes() + 1); // you have one minute

                        let token = jwt.encode({
                            exp: dateObj.getTime(),
                            iss: pkg.id
                        }, config.token);

                        res.json({
                            url: '/downloadPackage/' + token
                        });

                    } else {
                        // the user either doesn't have access, or the file doesn't exist
                        auth.unauthorized(req, res);
                    }

                });

        }

    },

    download: (req, res, next) => {
        const s3 = new aws.S3();
        const PDFMerge = require('pdf-merge');

        let token = req.params.token,
            decoded = jwt.decode(token, config.token),
            id = decoded.iss;

        if (decoded.exp > Date.now()) {
            Package.findOne({})
                .where("_id").equals(id)
                .populate({
                    path: 'materials packages',
                    populate: {
                        path: 'materials'
                    }
                })
                .exec()
                .catch(err => {
                    res.status(500).json(err);
                })
                .then(pkg => {
                    // get all of the materials
                    let materialArray = pkg.materials;

                    pkg.packages.forEach(p => {
                        materialArray = util.unionArrays(materialArray, p.materials);
                    });

                    let filenames = [],
                        directory = path.join(__dirname, '../../temp'),
                        count = 0;

                    util.checkDirectory(directory, err => {

                        if (err) {
                            res.status(500).send({error: err});
                        } else {

                            materialArray.forEach(m => {
                                let name = path.join(directory, m.filename()),
                                    file = fs.createWriteStream(name);

                                let stream = s3.getObject({
                                    Bucket: config.s3_buckets.materials,
                                    Key: m.filename()
                                }).createReadStream().pipe(file);

                                filenames.push(name);

                                stream.on('finish', () => {
                                    count++;
                                    if (count >= materialArray.length) {
                                        
                                        // let pdfMerge = new PDFMerge(filenames, config.pdftkPath);

                                        // pdfMerge.asReadStream().merge((error, finishedStream) => {
                                        //     if (error) {
                                        //         res.status(500).json(error);
                                        //     } else {
                                        //         finishedStream.pipe(res);

                                        //         finishedStream.on('finish', () => {
                                        //             filenames.forEach(name => {
                                        //                 fs.unlink(name);
                                        //             });
                                        //         });
                                        //     }
                                        // });
                                        res.json(filenames);

                                    }
                                })
                            });

                        }

                    });
                });
        } else {
            auth.unauthorized(req,res);
        }
    }

}