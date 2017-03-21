const   mongoose = require('mongoose'),
        bcrypt = require('bcrypt-nodejs'),
        
        roles = require('../../roles'),
        util = require('../../util'),

        User = require('../../models/user.model'),

        WHITELIST = [
            'email',
            'firstName',
            'lastName',
            'title',
            'company',
            'phone',
            'address',
            'city',
            'state',
            'zip',
            'country',
            'improvExp',
            'facilitationExp',
            'trainingInterest',
            'url',
            'description'
        ];

module.exports = {

    create: (req, res) => {
        // TODO
    },

    getAll: (req, res) => {
        User.find({}).exec()
            .then((users) => {
                res.json(users);
            });
    },

    get: (req, res) => {
        findUser(req.params.id, null, function(err, user) {
            if (err) {
                util.handleError(req, res, err);
            } else {
                res.json(user);
            }
        })
    },

    update: (req, res) => {
        let formData = req.body,
            password = req.body.password;
        
        callback = (err, hash) => {
            if (err) {
                util.handleError(req, res, err);
            } else {

                User.find({}).where('_id').equals(req.params.id)
                    .then(user => {
                        user = util.smartUpdate(user, formData, WHITELIST);

                        if (hash) {
                            user.password = hash;
                        }

                        user.save((err, saved) => {
                            if (err) {
                                util.handleError(req, res, err);
                            } else {
                                saved = saved.toObject();
                                delete saved.password;
                                saved.actions = roles.getActionsForRole(saved.role);

                                res.json(saved);
                            }
                        })
                    });

            }

        }

        if (password) {
            bcrypt.hash(password, null, null, callback);
        } else {
            callback(null, null);
        }
    },

    delete: (req, res) => {
        User.find({})
            .where('_id').equals(req.params.id)
            .remove((err) => {
                if (err) {
                    util.handleError(req, res, err);
                } else {
                    res.send("User Deleted");
                }
            });
    },

    findUser: (id, email, callback) => {
        if (!id && !email) {
            callback('no id or email', null);
            return;
        }

        let query = User.findOne({})
            .select(WHITELIST.join(' ') + ' role dateAdded dateModified');

        if (id) {
            query.where('_id').equals(id);
        } else if (email) {
            // if we're using email, we should get the password to validate with
            query.select('password');
            query.where('email').equals(email);
        }

        query.exec()
            .then(user => {

                if (user) {
                    user = user.toObject();
                    let roleId = user.role;
                    user.actions = roles.getActionsForRole(roleId);

                    delete user.role;
                }

                callback(null, user);
            })
    },

    
    validateUser: (email, password, callback) => {
        module.exports.findUser(null, email, (err, user) => {
            if (err) {
                callback(err, null);
            } else {
                if (user) {
                    bcrypt.compare(password, user.password, (crypterr, valid) => {
                        if (err) {
                            callback(crypterr, null);
                        } else if (valid) {
                            delete user.password;
                            callback(null, user);
                        } else {
                            callback(null, false);
                        }
                    })
                } else {
                    callback(null, false);
                }
            }
        })
    }

}