const mongoose = require('mongoose');

const DBInfoSchema = new mongoose.Schema({
    created: {type: Date, default: Date.now},
    user: Date,
    package: Date,
    game: Date,
    note: Date
});

const DBInfo = mongoose.model('DBInfo', DBInfoSchema);

module.exports = DBInfo;