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
        return module.exports.findUser(req.params.id)
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

    findUser: (key, select, populate, raw) => {
        if (!key) {
            return Promise.reject('no id or email');
        }

        let query = User.findOne({})
            .select(WHITELIST.join(' ') + 
            ' subscription preferences memberOfTeams adminOfTeams role dateAdded dateModified superAdmin locked ' + select);

        // catch a mongoose ObjectID, which looks like a string but isn't really
        if (typeof(key) == 'object' && key.toString) {
            key = key.toString();
        }

        if (key.indexOf && key.indexOf('@') > -1) {
            query.where('email').equals(key);
        } else {
            query.where('_id').equals(key);
        }

        query.populate('preferences')
            .populate({
                path: 'subscription',
                select: '-stripeCustomerId'
            })

        if (populate) {
            query.populate(populate);
        }

        return query.exec()
            .catch(error => {
                return Promise.resolve(null);
            })
            .then(user => {
                if (user && !raw) {
                    user = user.toObject();

                    if (!user.superAdmin) {
                        delete user.superAdmin;
                    }
                    
                    // make sure the user has an active subscription
                    if (user.locked) {
                        user.actions = roles.getActionsForRole(roles.ROLE_LOCKED);
                    } else if (user.subscription &&
                         typeof(user.subscription) == 'object' &&
                            (
                                // user.subscription.role == roles.ROLE_SUPER_ADMIN ||
                                user.subscription.expiration > Date.now()
                            )) {

                        user.actions = roles.getActionsForRole(user.subscription.role);
                    } else {
                        user.actions = roles.getActionsForRole(roles.ROLE_USER);
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
                    return Promise.resolve(false);
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

    /**
     * Get all of a user's purchases, including teams they are admin of
     */
    purchases: (req, res) => {
        return User.findOne({}).where('_id').equals(req.user._id)
            .select('purchases adminOfTeams')
            .populate({
                path: 'adminOfTeams',
                select: 'purchases name',
                populate: util.populations.purchases
            })
            .populate(util.populations.purchases)
            .then(u => {
                res.json(u);
            })
    },

    teams: (req, res) => {
        return User.findOne({}).where('_id').equals(req.user._id)
            .select('memberOfTeams adminOfTeams')
            .populate({
                path: 'adminOfTeams memberOfTeams',
                populate: util.populations.team
            })
            .then(u => {
                res.json(u);
            })
    },

    // fetched with a GET call to /api/user/:_id/materials
    materials: (req, res) => {
        return module.exports.fetchMaterials(req.user._id)
            .then(u => {
                if (res) {
                    res.json(u);
                }
            })
    },

    fetchMaterials: (userId) => {
        return User.findOne({}).where('_id').equals(userId)
            .select('materials memberOfTeams adminOfTeams')
            .populate({
                path: 'adminOfTeams memberOfTeams',
                populate: util.populations.materials
            })
            .populate(util.populations.materials)
            .exec();
    },

    subscription: (req, res) => {
        return User.findOne({}).where('_id').equals(req.user._id)
            .select('subscription')
            .populate({
                path: 'subscription',
                select: '-stripeCustomerId',
                populate: {
                    path: 'parent',
                    select: '-stripeCustomerId',
                    populate: {
                        path: 'team',
                        select: 'name'
                    }
                }
            })
            .then(u => {
                let user = u.toObject();
                user.subscription.roleName = roles.findRoleById(user.subscription.role).name;

                res.json(user);
            })
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
    },

    // POST: /api/user/:_id/preference
    preference: (req, res) => {
        let userId = req.user._id,
            prefKey = req.body.key,
            prefVal = req.body.val;

        return User.findOne({})
            .where('_id').equals(userId.toString())
            .exec()
            .then(user => {
                return user.setPreference(prefKey, prefVal);
            }).then(user => {
                return module.exports.findUser(userId);
            }).then(user => {
                res.json(user);
            });

    }

}