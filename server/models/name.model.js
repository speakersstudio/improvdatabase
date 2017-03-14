const mongoose = require('mongoose');

const NameSchema = new mongoose.Schema({
    name: String,
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NameVote' }],
    addedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    modifiedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dateAdded: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' }
});

const Name = mongoose.model('Name', NameSchema);

module.exports = Name;