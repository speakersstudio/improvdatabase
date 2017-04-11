const   mongoose = require('mongoose'),
        bcrypt = require('bcrypt'),
        Promise = require('bluebird'),
        
        config = require('../../config')(),
        roles = require('../../roles'),
        util = require('../../util'),

        Subscription = require('../../models/subscription.model'),
        User = require('../../models/user.model'),
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

        let promise = Team.findOne({}).where('name').equals(email);

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
    }

}