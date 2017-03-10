const mongoose = require('mongoose');

var config = require('./config')();

const User = require('./models/user.model');
const MaterialItem = require('./models/material-item.model');
const Subscription = require('./models/subscription.model');
const Package = require('./models/package.model');

mongoose.connect(config.mongodb.uri);

function deleteUsers(callback) {
    console.log('deleting users');
    User.find({}).remove(() => {
        if (typeof callback == 'function') {
            callback();
        }
    });
}

function seedUsers(callback) {
    const users = require('./models/seeds/user.seed.json');
    User.create(users)
        .then(() => {
            console.log('users seeded');
            console.log(' -- ');
            if (typeof callback == 'function') {
                callback();
            }
        });
}

function deleteItems(callback) {
    console.log('deleting material items');
    MaterialItem.find({}).remove(() => {
        if (typeof callback == 'function') {
            callback();
        }
    });
}

function seedItems(callback) {
    const materialItems = require('./models/seeds/material-item.seed.json');
    MaterialItem.create(materialItems)
        .then(() => {
            console.log('items seeded');
            console.log(' -- ');

            if (typeof callback == 'function') {
                callback();
            }
        });
}

function deletePackages(callback) {
    console.log('deleting packages');
    Package.find({}).remove((err) => {
        if (err) {
            throw err;
        }

        if (typeof callback == 'function') {
            callback();
        }
    });
}

function seedPackages(callback) {

    Package.create({
        "slug": "leadership",
        "name": "Improv+Leadership",
        "description": "Our most powerful Improv program.",
        "color": "orange",
        "price": 225
    }).then(improvLeadership => {
        console.log('Created Improv+Leadership');
        improvLeadership.addMaterial([
            { name: "Improv+Leadership Facilitator's Guide", addon: false },
            { name: "Improv+Leadership Handouts", addon: false },
            { name: "Facilitation Tips", addon: true },
            { name: "Your Improv+Leadership ROI", addon: true }
        ]);
    });

    Package.create({
        "slug": "networking",
        "name": "Improv+Networking",
        "description": "Run a program to help your team network better.",
        "color": "red",
        "price": 125
    })
    .then((improvNetworking) => {
        console.log('Created Improv+Networking');
        improvNetworking.addMaterial([
            { name: "Improv+Networking Facilitator's Guide", addon: false },
            { name: "Improv+Networking Handouts", addon: false },
            { name: "Facilitation Tips", addon: true },
            { name: "Handshake Academy", addon: true }
        ]);
    });

    Package.create({
        "slug": "basics",
        "name": "Basics",
        "description": "Gain access to our selection of facilitation tips.",
        "price": 45
    })
    .then((basics) => {
        console.log('Created Basics package');
        console.log(' -- ');

        basics.addMaterial([
            { name: "Facilitation Tips", addon: true }
        ]);

        if (typeof callback === 'function') {
            callback();
        }
    });

}

function deleteSubscriptions(callback) {
    console.log('deleting subscriptions');
    Subscription.find({}).remove((err) => {
        if (err) {
            throw err;
        }

        if (typeof callback === 'function') {
            callback();
        }
    });
}

function seedSubscriptions(callback) {
    // const shauvonId = "c83dfaf0-ceb1-46cf-9c8f-6a2fe771c9f4";
    // const kateId = "3a36cfff-d4d9-4e79-855d-652f3b0cbb6d";

    const expires = "2018-03-08T14:26:29.214Z";
    const expired = "2016-03-08T14:26:29.214Z";

    Package.find({})
        .where('slug').in(['leadership', 'networking', 'basics'])
        .exec((err, packages) => {
            User.find({})
                .where('email').in(['smcgill@denyconformity.com', 'kate@katebringardner.com'])
                .exec((err, users) => {
                    let total = packages.length * users.length,
                        count = 0;
                    
                    users.forEach((user) => {

                        packages.forEach((package) => {

                            Subscription.create({
                                user: user._id,
                                package: package._id,
                                expires: package.name == 'Basics' &&
                                         user.email == 'smcgill@denyconformity.com' ? expired : expires
                            }).then(() => {
                                count++;
                                console.log(count + ' subscriptions');
                                if (count >= total) {
                                    console.log('ah ah ah');
                                    console.log(' -- ');

                                    if (typeof callback === 'function') {
                                        callback();
                                    }
                                }
                            });

                        });

                    });

            });
        });
}

module.exports = {
    
    resetAll: function () {
        console.log('Re-seeding everything');
        deleteUsers(() => {
            seedUsers(() => {
                deleteItems(() => {
                    seedItems(() => {
                        deletePackages(() => {
                            seedPackages(() => {
                                deleteSubscriptions(() => {
                                    seedSubscriptions(() => {
                                        process.exit(0);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    },

    clear: function() {
        deleteUsers(() => {
            deleteItems(() => {
                deletePackages(() => {
                    deleteSubscriptions(() => {
                        process.exit(0);
                    })
                })
            })
        });
    },

    checkForSeed: function() {
        MaterialItem.count({}, (err, count) => {
            if (err) {
                throw err;
            }

            if (count > 0) {
                console.log('Material Items already seeded, no need to re-seed them.');
                process.exit(0);
                return;
            }

            console.log('seeding the Material Item database!');
            this.resetAll();
        });
    }

}