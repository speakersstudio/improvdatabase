const mongoose = require('mongoose');

// track a user's account status in the app
const SubscriptionSchema = new mongoose.Schema({
    start: { type: Date, default: Date.now },
    role: Number,
    expiration: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = Subscription;