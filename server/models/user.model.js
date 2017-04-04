const mongoose = require('mongoose'),

    Subscription = require('./subscription.model'),
    Preference   = require('./preference.model');

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
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
    preferences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Preference' }]
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

UserSchema.methods.setPreference = function(key, value) {
    return Preference.findOne({})
        .where('key').equals(key)
        .where('user').equals(this._id)
        .exec()
        .then(pref => {
            if (pref) {
                if (value) {
                    pref.value = value;
                    pref.date = Date.now();
                    return pref.save();
                } else {
                    // remove it from the array
                    this.preferences.remove(pref._id);
                    return pref.remove();
                }
            } else {
                return Preference.create({
                    key: key,
                    value: value,
                    user: this._id
                });
            }
        }).then(pref => {
            if (pref) {
                // update it if it already exists, and add it if it doesn't
                let found = false;
                this.preferences.forEach(p => {
                    if (p == pref._id.toString()) {
                        found = true;
                        p = pref;
                    }
                });
                if (!found) {
                    this.preferences.push(pref);
                }
            }

            return this.save();
        })
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