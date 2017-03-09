const mongoose = require('mongoose');
const Package = require('./package.model');

const SubscriptionSchema = new mongoose.Schema({
    dateAdded: { type: Date, default: Date.now },
    package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
    expires: Date,
    userId: String
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = Subscription;