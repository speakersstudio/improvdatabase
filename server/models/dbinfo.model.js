const mongoose = require('mongoose');

const DBInfoSchema = new mongoose.Schema({
    created: {type: Date, default: Date.now},
    user: Date,
    package: Date,
    materials: Date,
    game: Date,
    note: Date,
    config: Date,
    packageConfig: Date
});

const DBInfo = mongoose.model('DBInfo', DBInfoSchema);

module.exports = DBInfo;