const mongoose = require('mongoose'),

    Subscription = require('./subscription.model');

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
    title: String,
    company: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    improvExp: Number,
    facilitationExp: Number,
    trainingInterest: Boolean,
    url: String,
    dateAdded: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
    locked: { type: Boolean, default: false },
    description: String,
    permissions: String, // in case we want to grant or revoke specific permissions
    superAdmin: { type: Boolean, default: false },
    stripeCustomerId: String,

    purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Purchase' }],
    materials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MaterialItem' }],
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' }
});

UserSchema.methods.addSubscription = function(role, expires) {
    if (!expires) {
        expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);
    }
    let expiration = Date.now();
    if (typeof(expires) == 'object' && expires.getTime) {
        expiration = expires.getTime();
    }
    return Subscription.create({
        user: this._id,
        role: role,
        expiration: expiration
    }).then(sub => {
        this.subscription = sub;

        return this.save();
    });
}

// TODO: create a renewSubscription method?

UserSchema.methods.addMaterial = function(materials) {
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

UserSchema.virtual('fullName')
    .get(function() {
        return this.firstName + ' ' + this.lastName;
    })
    .set(function(v) {
        this.firstName = v.substr(0, v.indexOf(' '));
        this.lastName = v.substr(v.indexOf(' ') + 1);
    });

const User = mongoose.model('User', UserSchema);

module.exports = User;