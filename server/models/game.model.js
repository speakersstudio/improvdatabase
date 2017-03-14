const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    names: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Name' }],
    description: String,
    duration: { type: mongoose.Schema.Types.ObjectId, ref: 'GameMetadata' },
    playerCount: { type: mongoose.Schema.Types.ObjectId, ref: 'GameMetadata' },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
    addedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    modifiedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dateAdded: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now }
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;