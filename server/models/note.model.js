const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
    tag: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag' },
    metadata: { type: mongoose.Schema.Types.ObjectId, ref: 'GameMetadata' },
    description: String,
    public: { type: Boolean, default: false },
    addedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    modifiedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dateAdded: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now }
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;