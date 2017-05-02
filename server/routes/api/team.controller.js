const   mongoose = require('mongoose'),
        bcrypt = require('bcrypt'),
        Promise = require('bluebird'),

        auth = require('../../auth'),
        
        config = require('../../config')(),
        roles = require('../../roles'),
        util = require('../../util'),
        emailUtil = require('../../email'),

        userController = require('./user.controller'),

        Subscription = require('../../models/subscription.model'),
        Team = require('../../models/team.model'),
        Invite = require('../../models/invite.model'),
        Purchase = require('../../models/purchase.model'),

        WHITELIST = [
            'email',
            'name',
            'company',
            'phone',
            'address',
            'city',
            'state',
            'zip',
            'country',
            'url',
            'description'
        ];

module.exports = {

    get: (req, res) => {
        let id = req.params.id;
        return Team.findOne({}).where('_id').equals(id)
            .populate({
                path: 'admins members',
                select: '-password',
                populate: {
                    path: 'subscription',
                    select: '-stripeCustomerId'
                }
            })
            .populate({
                path: 'subscription',
                select:'-stripeCustomerId',
                populate: {
                    path: 'invites',
                    match: { accepted: false }
                }
            })
            .exec()
            .then(t => {
                res.json(t);
            });
    },

    update: (req, res) => {
        let id = req.params.id;

        if (util.indexOfObjectId(req.user.adminOfTeams, id) == -1) {
            auth.unauthorized(req, res);
            return;
        } else {

            return Team.findOne({}).where('_id').equals(id).exec()
                .then(team => {
                    team = util.smartUpdate(team, req.body, WHITELIST);
                    return team.save();
                })
                .then(team => {
                    res.json(team);
                });

        }
    },

    createTeam: (name) => {
        return Team.create({
            name: name
        });
    },

    backup: (req, res) => {
        Team.find({}).exec().then(t => {
            res.json(t);
        });
    },

    validate: (req, res) => {
        let name = req.body.name,
            teamId = req.body.teamId;

        let promise = Team.findOne({}).where('name').equals(name);

        if (teamId) {
            promise.where('_id').ne(teamId);
        }
        
        return promise.exec()
            .then(t => {
                if (t) {
                    res.json({
                        conflict: 'name'
                    });
                } else {
                    res.json({});
                }
            });
    },

    materials: (req, res) => {
        // first, make sure the user is a member of this team
        if (!req.user.superAdmin) {
            if (util.indexOfObjectId(req.user.memberOfTeams, req.params.id) == -1 &&
                util.indexOfObjectId(req.user.adminOfTeams, req.params.id) == -1) {
                    auth.unauthorized(req, res);
                    return;
                }
        }

        let query = Team.findOne({}).where('_id').equals(req.params.id);

        return userController.collectMaterials(query, req, res);
    },

    purchases: (req, res) => {
        // only team admins can do this
        if (req.user.adminOfTeams.indexOf(req.params.id) == -1) {
            return auth.unauthorized(req, res);
        }

        return Purchase.find({})
            .where('team').equals(req.params.id)
            .populate('user packages.package materials.material')
            .exec()
            .then(p => {
                res.json(p);
            })
    },

    invite: (req, res) => {

        let user = req.user,
            teamId = req.params.id,
            email = req.body.email;

        // first, see that the user requesting this is an admin of the team
        if (util.indexOfObjectId(user.adminOfTeams, teamId) > -1) {
            return Subscription.findOne({})
                .where('team').equals(teamId)
                .populate('team')
                .exec()
                .then(subscription => {

                    // TODO: check to see if the user has already been invited

                    // check if the email address entered is already a user
                    User.findOne({}).where('email').equals(email).exec()
                        .then(addUser => {
                            if (addUser) {
                                // the user does exist! 

                                // . . . what happens now??
                                res.json({msg: 'exists'});
                            } else {
                                // Make sure the team has any available subscriptions to use


                                // if they aren't a user, create a new invite object
                                return Invite.create({
                                        user: req.user._id,
                                        email: email,
                                        role: subscription.role,
                                        team: subscription.team._id
                                    })
                                    .then(invite => {
                                        // send an email to the user using the new invite's _id
                                        let inviteId = invite._id.toString(),
                                            name = user.firstName + ' ' + user.lastName,
                                            nameText = name ? 'Your colleague, ' + name + ', ' : 'Your colleague';

                                        emailUtil.send({
                                            to: email,
                                            subject: 'You have been invited to join ImprovPlus',
                                            content: {
                                                type: 'text',
                                                greeting: 'ImprovPlus Awaits!',
                                                body: `
                                                    <p>${nameText} has invited you to join ${subscription.team.name} on ImprovPlus.</p>

                                                    <p>ImprovPlus is an online community for the world of Improv, helping Facilitators and Improvisers connect, share, and develop themselves and their techniques. By joining ImprovPlus, you will be on your way to making your world more Awesome.</p>

                                                    <p>You will be able to use the subscription already set up for ${subscription.team.name}, which means you will gain full access to the app and all of your team's resources right away.</p>
                                                `,
                                                action: 'https://improvpl.us/invite/' + inviteId,
                                                actionText: 'Join Now',
                                                afterAction: `
                                                    <p>If that button doesn't work for you (or your email account messed up the contents of this message and you don't see any button), you can accept this invite by visiting https://improvpl.us/invite/${inviteId} in your browser.</p>

                                                    <p>Be excellent to each other, and party on.</p>

                                                    <p>Sincerely,</p>

                                                    <p>The Proprietors of <span class="light">improv</span><strong>plus</strong>.</p>
                                                `
                                            }
                                        }, (error, response) => {

                                            subscription.invites.push(invite);

                                            subscription.save().then(subscription => {
                                                res.json({msg: 'sent', subscription: subscription});
                                            });

                                        })
                                    })
                            }
                        })

                })

        } else {
            auth.unauthorized(req, res);
        }

    }

}