const   mongoose = require('mongoose'),
        bcrypt = require('bcrypt'),
        Promise = require('bluebird'),
        
        config = require('../../config')(),
        roles = require('../../roles'),
        util = require('../../util'),
        findModelUtil = require('./find-model.util'),

        Subscription = require('../../models/subscription.model'),
        User = require('../../models/user.model'),
        Team = require('../../models/team.model'),
        Purchase = require('../../models/purchase.model'),
        Invite = require('../../models/invite.model'),
        HistoryModel = require('../../models/history.model');

module.exports = {

    /**
     * POST: /api/user is used to accept an invitation and create a new user
     */
    create: (req, res) => {
        
        let email = req.body.email,
            password = req.body.password,
            inviteId = req.body.invite,
            userName = req.body.name;

        if (!email || !password || !inviteId || !userName) {
            return res.status(500).json({error: 'Please enter all of the information.'})
        }

        return Invite.findOne({})
            .where('_id').equals(inviteId)
            .exec()
            .then(invite => {
                if (!invite) {
                    return res.status(500).json({error: 'unknown invite'});
                } else if (invite.accepted) {
                    return res.status(500).json({error: 'invite taken'});
                } else {

                    if (invite.email != email) {
                        // we will require the email as a sort of validation
                        return res.status(500).json({error: 'wrong email'});
                    } else {

                        let inviteTeam = util.getObjectIdAsString(invite.team),
                            role = invite.role,
                            firstName = '',
                            lastName = '';

                        if (userName) {
                            firstName = userName.substr(0, (userName+' ').indexOf(' ')).trim();
                            lastName = userName.substr((userName+' ').indexOf(' '), userName.length).trim();
                        }

                        invite.accepted = true;
                        invite.dateAccepted = Date.now();

                        invite.save();

                        bcrypt.hash(password, config.saltRounds).then(hash => {
                            return User.create({
                                email: email,
                                password: hash,
                                firstName: firstName,
                                lastName: lastName
                            });
                        })
                        .then(user => {

                            HistoryModel.create({
                                user: user._id,
                                action: 'invite_accept',
                                reference: invite._id.toString()
                            });

                            if (inviteTeam) {
                                Team.findOne({}).where('_id').equals(inviteTeam).exec()
                                    .then(team => {
                                        team.members = util.addToObjectIdArray(team.members, user._id);
                                        return team.save();
                                    })
                                    .then(team => {
                                        user.memberOfTeams = util.addToObjectIdArray(user.memberOfTeams, team._id);
                                        return user.save();
                                    })
                                    .then(user => {
                                        return Subscription.findOne({})
                                            .where('team').equals(inviteTeam)
                                            .exec()
                                    })
                                    .then(subscription => {
                                        // create a subscription for the new user
                                        return subscription.createChildSubscription(user)
                                    })
                                    .then(subscription => {
                                        if (!subscription) {
                                            // if the promise returns false, there were no available subs left
                                            // TODO: adding a user to a team without using a subscription

                                        } else {
                                            // remove the invite from team's subscription, so it won't count against anything anymore
                                            subscription.invites = util.removeFromObjectIdArray(subscription.invites, invite);
                                            return subscription.save();
                                        }
                                    })
                                    .then(subscription => {
                                        // we should be done, but we want to return the new user
                                        return User.findOne({}).where('_id').equals(user._id.toString()).exec()
                                    })
                                    .then(newUser => {
                                        res.json(module.exports.prepUserObject(newUser));
                                    })
                            } else {
                                // this user was invited as a regular user
                                // TODO: this
                            }

                        }, error => {
                            console.error(error);
                            res.status(500).json({error: 'There was an error creating your account.'});
                        });

                    }

                }
            })

    },

    getAll: (req, res) => {
        User.find({}).exec()
            .then((users) => {
                res.json(users);
            });
    },

    get: (req, res) => {
        return findModelUtil.findUser(req.params.id)
            .catch(err => {
                util.handleError(req, res, err);
            })
            .then(user => {
                res.json(module.exports.prepUserObject(user));
            });
    },

    update: (req, res) => {
        let formData = req.body,
            password = req.body.password,
            promise,
            oldUser;

        if (password) {
            promise = bcrypt.hash(password, config.saltRounds);
        } else {
            promise = Promise.resolve();
        }
        
        promise.then(hash => {
             return findModelUtil.findUser(req.params.id, null, null)
                .then(user => {
                    oldUser = user.toObject();
                    delete oldUser.password;

                    user = util.smartUpdate(user, formData, findModelUtil.USER_WHITELIST);

                    if (hash) {
                        user.password = hash;
                    }

                    user.dateModified = Date.now();

                    return user.save((err, saved) => {
                        if (err) {
                            util.handleError(req, res, err);
                        } else {
                            let changes = util.findChanges(oldUser, saved);

                            if (hash) {
                                changes.push({
                                    property: 'password'
                                });
                            }

                            HistoryModel.create({
                                user: saved,
                                action: 'account_edit',
                                changes: changes
                            });

                            saved = module.exports.prepUserObject(saved);

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

    prepUserObject: (user) => {
        if (user.toObject) {
            user = user.toObject();
        }

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

        return user;
    },

    validateUser: (email, password, callback) => {
        return findModelUtil.findUser(email, 'password')
            .then(user => {
                if (user) {
                    user = module.exports.prepUserObject(user);
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
            userData = util.smartUpdate({}, data, findModelUtil.USER_WHITELIST);

        return bcrypt.hash(password, config.saltRounds)
            .then(hash => {
                userData.password = hash;
                return User.create(userData);
            });
    },

    /**
     * Get all of a user's purchases
     */
    purchases: (req, res) => {
        // let populate = {
        //     path: 'purchases',
        //     populate: {
        //         path: 'packages.package materials.materialItem'
        //     },
        //     options: {
        //         sort: 'date'
        //     }
        // };

        return Purchase.find({})
            .where('user').equals(req.user._id)
            .populate('team packages.package materials.material')
            .exec()
            .then(p => {
                res.json(p);
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
        let userId = req.params.id,
            query = User.findOne({}).where('_id').equals(userId);

        return module.exports.collectMaterials(query, req, res);
    },

    collectMaterials: (query, req, res) => {
        return query.select('purchases')
            .populate({
                path: 'purchases',
                populate: {
                    path: 'materials.materialItem packages.package',
                    populate: {
                        path: 'materials packages',
                        populate: {
                            path: 'materials'
                            // lets only allow packages to include packages one level deep, because this is getting silly
                            // so a package that includes packages can't be included in a package
                        }
                    }
                }
            })
            .exec()
            .then(u => {
                let userData = u.toObject(),
                    packages = [],
                    materials = [],

                    // TODO: some day - instead of selecting it all at once to begin with, we can do this with a recursive function that selects a thing and then selects all of the materials / packages inside the thing?

                    addItems = array => {
                        if (array && array.length) {
                            array.forEach(arrayItem => {
                                let item = arrayItem.package || arrayItem;
                                if (item.name) {
                                    // if it has a name, it's a package
                                    // just add the data without adding the actual package because we don't want to cause any crazy recursiveness
                                    let packageData = {
                                        _id: item._id.toString(),
                                        slug: item.slug,
                                        name: item.name,
                                        color: item.color,
                                        price: item.price,
                                        dateAdded: item.dateAdded,
                                        dateModified: item.dateModified,
                                        description: item.description,
                                        materials: item.materials,
                                        packages: []
                                    };

                                    item.packages.forEach(p => {
                                        packageData.packages.push(p._id.toString());
                                    });

                                    packages = util.addToObjectIdArray(packages, packageData);
                                }
                                if (item.materials && item.materials.length) {
                                    item.materials.forEach(m => {
                                        materials = util.addToObjectIdArray(materials, m);
                                    });
                                }
                                addItems(item.packages);
                            });
                        }
                    };

                addItems(userData.purchases);

                packages = packages.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });

                materials = materials.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                })

                let data = {
                    packages: packages,
                    materials: materials
                }

                if (res) {
                    res.json(data);
                } else {
                    return Promise.resolve(data);
                }
            })
    },

    // fetchMaterials: (userId) => {
    //     return User.findOne({}).where('_id').equals(userId)
    //         .select('purchases')
    //         .populate({
    //             path: 'purchases',
    //             populate: {
    //                 path: 'materials packages'
    //             }
    //         })
    //         .exec()
    // },

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

                if (user.subscription) {
                    user.subscription.roleName = roles.findRoleById(user.subscription.role).name;
                }

                res.json(user);
            })
    },

    leaveTeam: (req, res) => {
        if (req.method != 'PUT') {
            return res.status(404);
        }

        let userId = req.user._id,
            teamId = req.params.toId;

        module.exports.removeUserFromTeam(userId, teamId).then(user => {
            res.json(module.exports.prepUserObject(u));
        });

    },

    removeUserFromTeam: (userId, teamId, returnTeam) => {

        return findModelUtil.findUser(userId)
            .then(user => {

                if (util.indexOfObjectId(user.adminOfTeams, teamId) == -1 && util.indexOfObjectId(user.memberOfTeams, teamId) == -1) {
                    // how can a user leave a team they aren't in?
                    return res.status(404);
                }

                return findModelUtil.findTeam(teamId)
                    .then(team => {

                        if (team && user.subscription.parent && user.subscription.parent.toString() == team.subscription.toString()) {
                            // the user inherited their subscription from the team, which means we have to revoke their subscription
                            return Subscription.findOne({}).where('_id').equals(user.subscription.parent).exec()
                                .then(parentSubscription => {
                                    parentSubscription.children = util.removeFromObjectIdArray(parentSubscription.children, user.subscription._id);
                                    return parentSubscription.save();
                                })
                                .then(() => {
                                    return Subscription.findOne({}).where('_id').equals(user.subscription._id).exec();
                                })
                                .then(userSubscription => {
                                    userSubscription.remove();

                                    user.subscription = null;
                                    return user.save();
                                })
                                .then(() => {
                                    return Promise.resolve(team);
                                });
                        } else {
                            return Promise.resolve(team);
                        }

                    })
                    .then(team => {

                        // remove the user from team
                        if (team) {
                            team.members = util.removeFromObjectIdArray(team.members, userId);
                            team.admins = util.removeFromObjectIdArray(team.admins, userId);

                            return team.save();
                        } else {
                            return Promise.resolve(team);
                        }

                    })
                    .then(team => {

                        // remove the team from the user
                        if (team) {
                            user.memberOfTeams = util.removeFromObjectIdArray(user.memberOfTeams, teamId);
                            user.adminOfTeams = util.removeFromObjectIdArray(user.adminOfTeams, teamId);

                            // store a history of this having happened
                            HistoryModel.create({
                                user: user,
                                action: 'team_leave',
                                reference: team._id
                            });
                        }

                        if (returnTeam) {
                            return user.save().then(() => {
                                return Promise.resolve(team);
                            });
                        } else {
                            return user.save();
                        }

                    })
            })
    },

    /**
     * PUT: /api/user/userId/acceptInvitation/inviteId will accept an invitation for an existing user
     */
    acceptInvite: (req, res) => {
        if (req.method != 'PUT') {
            res.status(404);
            return;
        }

        let userId = req.params.id,
            inviteId = req.params.toId,

            user;

        return findModelUtil.findUser(userId)
            .then(u => {
                user = u;
                return Invite.findOne({}).where('_id').equals(inviteId).exec();
            })
            .then(invite => {
                if (!invite || !user) {
                    res.status(404);
                    return Promise.reject('no user or invite found');
                } else if (invite.email != user.email) {
                    util.unauthorized(req, res);
                    return Promise.reject('incorrect user or invite');
                } else {
                    invite.accepted = true;
                    invite.dateAccepted = Date.now();

                    return invite.save();
                }
            })
            .then(invite => {
                if (invite && invite.team) {
                    return findModelUtil.findTeam(invite.team.toString());
                }
            })
            .then(team => {
                if (team) {
                    team.members = util.addToObjectIdArray(team.members, user._id);
                    return team.save();
                }
            })
            .then(team => {
                if (team) {
                    user.memberOfTeams = util.addToObjectIdArray(user.memberOfTeams, team._id);
                    user.invites = util.removeFromObjectIdArray(user.invites, inviteId);

                    HistoryModel.create({
                        user: userId,
                        action: 'team_join',
                        reference: team._id
                    });

                    if (!user.subscription) {
                        return Subscription.findOne({})
                            .where('_id').equals(util.getObjectIdAsString(team.subscription))
                            .exec()
                            .then(teamSubscription => {
                                return teamSubscription.createChildSubscription(user);
                            })
                            .then(() => {
                                return findModelUtil.findUser(user._id);
                            });
                    } else {
                        return user.save();
                    }
                }
            })
            .then(u => {
                if (u) {
                    res.json(module.exports.prepUserObject(u));
                }
            });

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
                return findModelUtil.findUser(userId);
            }).then(user => {
                res.json(module.exports.prepUserObject(user));
            });

    },

    doesUserOwn: (user, materialId, packageId) => {
        let itemKey = materialId ? 'materials' : 'packages',
            searchId = materialId ? materialId : packageId;

        return module.exports.collectMaterials(User.findOne({}).where('_id').equals(user._id.toString()))
            .then(usersStuff => {
                if (util.indexOfObjectId(usersStuff[itemKey], searchId) > -1) {
                    // the user owns this item directly - woohoo!
                    return Promise.resolve(true);
                } else {
                    let teamIds = util.unionArrays(user.memberOfTeams, user.adminOfTeams),
                        checkTeamStuff = index => {
                            return module.exports.collectMaterials(Team.findOne({}).where('_id').equals(teamIds[index].toString()))
                                .then(stuff => {
                                    if (util.indexOfObjectId(stuff[itemKey], searchId) > -1) {
                                        // this team owns the item! hooray!
                                        return Promise.resolve(true);
                                    } else {
                                        // move on to the next one
                                        index++;
                                        if (teamIds[index]) {
                                            return checkTeamStuff(index);
                                        } else {
                                            return Promise.resolve(false);
                                        }
                                    }
                                })
                        }

                    return checkTeamStuff(0);
                }
            });
    }

}