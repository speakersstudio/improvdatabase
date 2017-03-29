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
    materials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MaterialItem' }],
    includeSubscription: { type: Boolean, default: true }, // this might not be necessary, but just in case!

    coachingSessions: Number, // I'm not sure how these will work!
    supportCalls: Number // I'm not sure how these will work!
});

PackageSchema.query.byName = function(name) {
    return this.find({ name: new RegExp(name, 'i') });
};

PackageSchema.methods.addMaterial = function(items) {
    const package = this,
        materialItems = [];
    var readyCount = 0;

    items = [].concat(items);

    let addItem = (itemIndex) => {
        let item = items[itemIndex],
            query = MaterialItem.findOne({});
        
        if (item.name) {
            query.where('name').equals(item.name);
        } else if (item._id) {
            query.where('_id').equals(item._id);
        }

        return query.exec()
            .then(i => {
                package.materials.push(i);
                itemIndex++;
                if (items.length > itemIndex) {
                    return addItem(itemIndex);
                } else {
                    return package.save();
                }
            })
    }
    return addItem(0);
};

const Package = mongoose.model('Package', PackageSchema);

module.exports = Package;