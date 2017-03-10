const mongoose = require('mongoose');

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
    role: Number,
    description: String,
    permissions: String
});

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