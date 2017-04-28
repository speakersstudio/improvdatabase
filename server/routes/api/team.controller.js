const   mongoose = require('mongoose'),
        bcrypt = require('bcrypt'),
        Promise = require('bluebird'),

        auth = require('../../auth'),
        
        config = require('../../config')(),
        roles = require('../../roles'),
        util = require('../../util'),

        userController = require('./user.controller'),

        Subscription = require('../../models/subscription.model'),
        Team = require('../../models/team.model'),

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
            .populate(util.populations.team)
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
    }

}