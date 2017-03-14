const mongoose = require('mongoose');

const Note = require('./note.model');
const Name = require('./name.model');

const GameSchema = new mongoose.Schema({
    legacyID: Number,
    names: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Name' }],
    description: String,
    duration: { type: mongoose.Schema.Types.ObjectId, ref: 'GameMetadata' },
    playerCount: { type: mongoose.Schema.Types.ObjectId, ref: 'GameMetadata' },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
    tags: [{
        tag: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag' },
        addedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        dateAdded: { type: Date, default: Date.now }
    }],
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
    addedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    modifiedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dateAdded: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now }
});

GameSchema.methods.addNote = function(note) {
    const game = this;

    note.game = game._id;
    return Note.create(note).then(n => {
        game.notes.push(n._id);
        return game.save();
    });
};

GameSchema.methods.addName = function(name) {
    const game = this;

    name.game = game._id;
    return Name.create(name).then(n => {
        game.names.push(n._id);
        return game.save();
    });
}

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;