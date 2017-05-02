const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    action: String, // a key referencing what happened (sticking to the actions in the roles list if possible?)
    reference: String, // the _id of the item affected, if applicable
    changes: [{
        property: String,
        old: Object,
        new: Object
    }],
    date: { type: Date, default: Date.now } // when it happened
});

const HistoryModel = mongoose.model('History', HistorySchema);

module.exports = HistoryModel;