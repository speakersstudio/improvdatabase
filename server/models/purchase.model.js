const mongoose = require('mongoose');

const Package = require('./package.model')
    MaterialItem = require('./material-item.model');

// used to track both a customer's purchase history as well as items in their cart
const PurchaseSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    type: String,
    materialItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MaterialItem' },
    package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
    total: Number,
    refunded: { type: Boolean, default: false }
});

PurchaseSchema.methods.getPackage = function(populate) {
    if (this.package) {
        return Package.findOne({})
            .where('_id').equals(this.package)
            .populate(populate).exec();
    } else {
        return Promise.resolve(false);
    }
}

PurchaseSchema.methods.getMaterial = function() {
    if (this.materialItem) {
        return MaterialItem.findOne({})
            .where('_id').equals(this.materialItem).exec();
    } else {
        return Promise.resolve(false);
    }
}

const Purchase = mongoose.model('Purchase', PurchaseSchema);

module.exports = Purchase;