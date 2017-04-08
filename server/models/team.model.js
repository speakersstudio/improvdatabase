const mongoose = require('mongoose'),

    util = require('../util'),

    Subscription = require('./subscription.model'),
    User = require('./user.model');

const TeamSchema = new mongoose.Schema({
    name: String,
    description: String,
    phone: String,
    email: String,
    company: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    url: String,

    dateAdded: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },

    lookingForMembers: Boolean,

    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
    materials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MaterialItem' }],
    purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Purchase' }]
});

TeamSchema.methods.addSubscription = function(role, stripeCustomerId, subCount, expires) {
    if (!expires) {
        expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);
    }
    let expiration = Date.now();
    if (typeof(expires) == 'object' && expires.getTime) {
        expiration = expires.getTime();
    }
    return Subscription.create({
        team: this._id,
        role: role,
        expiration: expiration,
        subscriptions: subCount,
        stripeCustomerId: stripeCustomerId
    }).then(sub => {
        this.subscription = sub;

        return this.save();
    })
}

TeamSchema.methods.addMaterial = function(materials) {
    if (!materials || !materials.length) {
        return Promise.resolve(this);
    }

    materials = [].concat(materials);
    materials.forEach(mat => {
        let id = typeof(mat) == 'object' ? mat._id : mat,
            exists = false;
        
        this.materials.forEach(thismat => {
            if (thismat == id || thismat._id == id) {
                exists = true;
                return false;
            }
        });

        if (!exists) {
            this.materials.push(mat);
        }
    });

    return this.save();
}

TeamSchema.methods.addUser = function(user) {
    this.members = util.addToObjectIdArray(this.members, user);
    return this.save();
}

TeamSchema.methods.removeUser = function(user) {
    this.members = util.removeFromObjectIdArray(this.members, user);
    return this.save();
}

TeamSchema.methods.addAdmin = function(user) {
    this.members = util.removeFromObjectIdArray(this.members, user);
    this.admins = util.addToObjectIdArray(this.admins, user);
    return this.save();
}

TeamSchema.methods.removeAdmin = function(user) {
    this.admins = util.removeFromObjectIdArray(this.admins, user);
    return this.save();
}

TeamSchema.virtual('isThisAUser').get(function() {
    return false;
});

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;