const mongoose = require('mongoose');

var config = require('../config')();

const MaterialItem = require('./material-item.model');
const Subscription = require('./subscription.model');
const Package = require('./package.model');

mongoose.connect(`mongodb://${config.mongodb.host}/${config.mongodb.dbName}`);

function resetItems(callback) {
    console.log('resetting material items');
    MaterialItem.find({}).remove(() => {
        const materialItems = require('./seeds/material-item.seed.json');
        MaterialItem.create(materialItems)
            .then(() => {
                console.log('items fully reset');

                if (typeof callback == 'function') {
                    callback();
                }
            });
    });
}

function resetPackages(callback) {

    Package.find({}).remove(() => {

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
            basics.addMaterial([
                { name: "Facilitation Tips", addon: true }
            ]);

            if (typeof callback === 'function') {
                callback();
            }
        });

    });

}

function resetSubscriptions(callback) {
    // reset the subscription database too
    Subscription.find({}).remove((err) => {

        const shauvonId = "c83dfaf0-ceb1-46cf-9c8f-6a2fe771c9f4";
        const kateId = "3a36cfff-d4d9-4e79-855d-652f3b0cbb6d";

        const expires = "2018-03-08T14:26:29.214Z";
        const expired = "2016-03-08T14:26:29.214Z";

        console.log('subs reset');
        Package.find({})
            .where('slug').in(['leadership', 'networking', 'basics'])
            .exec((err, packages) => {
                let total = packages.length,
                    count = 0;
                packages.forEach((package) => {

                    Subscription.create({
                        userId: shauvonId,
                        package: package._id,
                        expires: package.name == 'Basics' ? expired : expires
                    }).then(() => {
                        return Subscription.create({
                            userId: kateId,
                            package: package._id,
                            expires: expires
                        });
                    }).then(() => {
                        count++;
                        console.log(count, 'subscriptions created');
                        if (count >= total) {
                            console.log('ah ah ah');
                            if (typeof callback === 'function') {
                                callback();
                            }
                        }
                    });

                });
            });

    });
}

module.exports = function () {

    console.log('resetting everything');
    resetItems(() => {
        resetPackages(() => {
            resetSubscriptions(() => {
                process.exit(0);
            });
        })
    });

}