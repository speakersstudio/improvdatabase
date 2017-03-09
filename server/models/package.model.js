const mongoose = require('mongoose');
const MaterialItem = require('./material-item.model.js');
const Subscription = require('./subscription.model');

const PackageSchema = new mongoose.Schema({
    slug: String,
    name: String,
    description: String,
    color: String,
    price: Number, // decimal
    dateAdded: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
    materials: [
        {
            materialItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MaterialItem' },
            addon: { type: Boolean, default: false }
        }
    ]
});

PackageSchema.query.byName = function(name) {
    return this.find({ name: new RegExp(name, 'i') });
};

PackageSchema.methods.addMaterial = function(items) {
    const package = this,
        materialItems = [];
    var readyCount = 0;

    items = [].concat(items);

    items.forEach(item => {

        MaterialItem.findOne({ name: item.name }).exec((err, materialItem) => {
            materialItems.push({
                materialItem: materialItem._id,
                addon: item.addon
            });
            readyCount++;
            if (readyCount == items.length) {
                package.materials = package.materials.concat(materialItems);
                package.save();
            }
        });

    });
};

const Package = mongoose.model('Package', PackageSchema);

module.exports = Package;