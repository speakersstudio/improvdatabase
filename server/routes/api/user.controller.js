const   mongoose = require('mongoose'),
        bcrypt = require('bcrypt'),
        Promise = require('bluebird'),
        
        config = require('../../config')(),
        roles = require('../../roles'),
        util = require('../../util'),

        Subscription = require('../../models/subscription.model'),
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
        
    },

    getAll: (req, res) => {
        User.find({}).exec()
            .then((users) => {
                res.json(users);
            });
    },

    get: (req, res) => {
        return findUser(req.params.id)
            .catch(err => {
                util.handleError(req, res, err);
            })
            .then(user => {
                res.json(user);
            });
    },

    update: (req, res) => {
        let formData = req.body,
            password = req.body.password,
            promise;

        if (password) {
            promise = bcrypt.hash(password, config.saltRounds);
        } else {
            promise = Promise.resolve();
        }
        
        promise.then(hash => {
             return User.findOne({}).where('_id').equals(req.params.id).exec()
                .then(user => {
                    user = util.smartUpdate(user, formData, WHITELIST);

                    if (hash) {
                        user.password = hash;
                    }

                    return user.save((err, saved) => {
                        if (err) {
                            util.handleError(req, res, err);
                        } else {
                            saved = saved.toObject();
                            delete saved.password;
                            saved.actions = roles.getActionsForRole(saved.role);

                            if (res) {
                                res.json(saved);
                            }
                        }
                    });
                });
        });
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

    findUser: (key, select, populate) => {
        if (!key) {
            return Promise.reject('no id or email');
        }

        let query = User.findOne({})
            .select(WHITELIST.join(' ') + ' purchases materials subscription role dateAdded dateModified superAdmin ' + select);

        if (key.indexOf('@') > -1) {
            query.where('email').equals(key);
        } else {
            query.where('_id').equals(key);
        }

        query.populate('subscription purchases')
            .populate({
                path: 'materials',
                options: {
                    sort: 'name'
                }
            });

        if (populate) {
            query.populate(populate);
        }

        return query.exec()
            .then(user => {
                if (user) {
                    user = user.toObject();

                    if (!user.superAdmin) {
                        delete user.superAdmin;
                    }
                    
                    // make sure the user has an active subscription
                    if (user.subscription &&
                         typeof(user.subscription) == 'object' &&
                            (
                                // user.subscription.role == roles.ROLE_SUPER_ADMIN ||
                                user.subscription.expiration > Date.now()
                            )) {

                        user.actions = roles.getActionsForRole(user.subscription.role);
                    } else {
                        user.actions = roles.getActionsForRole(roles.ROLE_EXPIRED);
                    }
                }

                return Promise.resolve(user);
            });
    },

    validateUser: (email, password, callback) => {
        return module.exports.findUser(email, 'password')
            .then(user => {
                if (user) {
                    return bcrypt.compare(password, user.password)
                        .then(res => {
                            if (res) {
                                return Promise.resolve(user);
                            } else {
                                return Promise.resolve(false);
                            }
                        });
                } else {
                    return Promise.reject('no user found');
                }
            });
    },

    createUser: (data) => {
        let password = data.password,
            userData = util.smartUpdate({}, data, WHITELIST);

        return bcrypt.hash(password, config.saltRounds)
            .then(hash => {
                userData.password = hash;
                return User.create(userData);
            });
    },

    // fetched with a GET call to /api/user/:_id/materials
    materials: (req, res) => {
        if (req.user && req.user.materials && req.user.materials.length) {
            res.json(req.user.materials);
        } else {
            res.json([]);
        }
    },

    backup: (req, res) => {
        User.find({}).exec().then(u => {
            res.json(u);
        });
    },

    validate: (req, res) => {
        let email = req.body.email,
            loggedInUser = req.user._id;

        let promise = User.findOne({}).where('email').equals(email);

        if (loggedInUser) {
            promise.where('_id').ne(loggedInUser);
        }
        
        return promise.exec()
            .then(u => {
                if (u) {
                    res.json({
                        conflict: 'email'
                    });
                } else {
                    res.json({});
                }
            });
    }

}