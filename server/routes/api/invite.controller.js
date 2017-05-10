const mongoose = require('mongoose');
        
const   util = require('../../util'),
        auth = require('../../auth'),
        InviteModel = require('../../models/invite.model'),
        HistoryModel = require('../../models/history.model'),
        User = require('../../models/user.model');

module.exports = {

    getAll: (req, res) => {
        res.status(404); // important - don't let users look up invites
    },

    delete: (req, res) => {

        InviteModel.findOne({})
            .where('_id').equals(req.params.id)
            .populate({
                path: 'team'
            })
            .exec()
            .then(invite => {
                if ((invite.team && util.indexOfObjectId(invite.team.admins, req.user._id) > -1) ||
                    invite.user.toString() == req.user._id.toString() ||
                    req.user.superAdmin) {

                    invite.dateDeleted = Date.now();
                    invite.deletedUser = req.user._id;
                    return invite.save()
                        .then(invite => {
                            return User.findOne({}).where('email').equals(invite.email).exec();
                        })
                        .then(user => {
                            if (user) {
                                user.invites = util.removeFromObjectIdArray(user.invites, invite._id);
                                return user.save();
                            } else {
                                return Promise.resolve(user);
                            }
                        })
                        .then(() => {
                            res.send('success');
                        })
                    
                } else {
                    auth.unauthorized(req, res);
                }
            })

    },

    backup: (req, res) => {
        InviteModel.find({}).exec()
            .then(i => {
                res.json(i);
            })
    }

}