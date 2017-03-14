const mongoose = require('mongoose');

const NameVote = require('./name-vote.model');

const NameSchema = new mongoose.Schema({
    name: String,
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NameVote' }],
    addedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    modifiedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dateAdded: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' }
});

NameSchema.methods.addVote = function(userId) {
    const name = this;

    return NameVote.find({})
        .where('name').equals(name._id)
        .where('addedUser').equals(userId)
        .exec()
        .then((existingVotes) => {
            if (!existingVotes.length) {
                return NameVote.create({
                    name: name._id,
                    addedUser: userId
                }).then(nv => {
                    name.votes.push(nv._id);
                    return name.save();
                });
            }
        });
}

const Name = mongoose.model('Name', NameSchema);

module.exports = Name;