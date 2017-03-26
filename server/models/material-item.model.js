const mongoose = require('mongoose');

const MaterialItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    color: String,
    fileslug: String,
    extension: String,
    versions: [{
        ver: Number,
        dateAdded: { type: Date, default: Date.now },
        description: String
    }],
    visible: { type: Boolean, default: true }
});

MaterialItemSchema.query.byName = function(name) {
    return this.find({ name: new RegExp(name, 'i') });
};

MaterialItemSchema.methods.version = function(ver) {
    let versions = this.versions,
        version;
    if (ver) {
        versions.forEach(v => {
            if (v.ver === ver) {
                version = v;
            }
        })
    } else {
        versions.sort((a, b) => {
            return b.ver - a.ver;
        });
        version = versions[0];
    }
    return version;
};

MaterialItemSchema.methods.filename = function(ver) {
    let version = this.version(ver);
    return this.fileslug + '.' + version.ver + '.' + this.extension;
};

MaterialItemSchema.methods.dlfilename = function() {
    return this.name + '.' + this.extension;
};

const MaterialItem = mongoose.model('MaterialItem', MaterialItemSchema);

module.exports = MaterialItem;