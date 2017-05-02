const mongoose = require('mongoose');
        
const   util = require('../../util'),
        auth = require('../../auth'),
        InviteModel = require('../../models/invite.model'),
        HistoryModel = require('../../models/history.model');

module.exports = {

    getAll: (req, res) => {
        res.status(404); // important - don't let users look up invites
    },

    delete: (req, res) => {

        InviteModel.findOne({}).where('_id').equals(req.params.id).exec()
            .then(invite => {
                if (invite.user.toString() == req.user._id.toString() || req.user.superAdmin) {
                    return invite.remove()
                        .then(() => {
                            HistoryModel.create({
                                user: req.user._id,
                                action: 'invite_delete',
                                reference: invite.email
                            });

                            res.json({msg: 'done'});
                        })
                } else {
                    return auth.unauthorized(req, res);
                }
            });

    }

}