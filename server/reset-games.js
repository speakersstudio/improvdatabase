const mongoose = require('mongoose'),
    Promise = require('bluebird');

const config = require('./config')();

const Game = require('./models/game.model'),
    GameMetadata = require('./models/game-metadata.model'),
    NameVote = require('./models/name-vote.model'),
    Name = require('./models/name.model'),
    Note = require('./models/note.model'),
    Tag = require('./models/tag.model');

const ShauvonID = "58c6e5bcd036281f4ce07dff";

mongoose.Promise = Promise;
mongoose.connect(config.mongodb.uri);

function fixUsers(arr) {
    arr.forEach((item) => {
        if (item.addedUser) {
            item.addedUser = ShauvonID;
        }
        if (item.modifiedUser) {
            item.modifiedUser = ShauvonID;
        }
    });
    return arr;
}

function deleteMetadata() {
    console.log('Deleting metadata items');
    return GameMetadata.find({}).remove();
}

function seedMetadata() {
    const items = fixUsers(require('./models/seeds/game-metadata.seed.json'));
    return GameMetadata.create(items)
        .then(() => {
            console.log("Metadata fully seeded");
            console.log('--');
        });
}

function deleteTags() {
    console.log('Deleting tags');
    return Tag.find({}).remove();
}

function seedTags() {
    const tags = fixUsers(require('./models/seeds/tag.seed.json'));

    return Tag.create(tags)
        .then(() => {
            // create tag notes
            return Tag.findOne({}).where('name').equals('Freeze').exec()
        })
        .then(tag => {
            return tag.addNote({
                "description": "Feel free to \"walk on\" to a scene to support (if it needs support), turning a two-person scene into a three-, four-, five-, or whatever-person one. When you freeze a scene with more than two people, you can tag as many people as you want to get rid of to bring it back down. Get a feel for the pace, and keep it reasonable - there's no reason to have tons of people on stage for long.",
                "public": true,
                "dateAdded": "2014-12-03T18:31:42.209Z",
                "addedUser": ShauvonID
            })
        })
        .then((tag) => {
            return tag.addNote({
                "description": "Don't wait until you have a good idea for a scene, because that will never work out. Just wait for a high moment in a scene, or for somebody in the scene to have a crazy position - then freeze it. You'll come up with something once you get into position.",
                "public": true,
                "dateAdded": "2014-12-03T18:22:11.380Z",
                "addedUser": ShauvonID
            });
        })
        .then(() => {
            return Tag.findOne({})
                .where('name').equals('Stand and Deliver').exec();
        })
        .then(tag => {
            return tag.addNote({
                "description": "Don't be afraid! If nobody else is stepping forward, just do it - whether you have an idea or not. Just make something up! It's always better in these line-up games to have an awkward non-joke than an awkward silence.",
                "public": true,
                "dateAdded": "2014-12-03T18:06:41.325Z",
                "addedUser": ShauvonID
            });
        })
        .then(() => {
            console.log("Tags fully seeded");
            console.log('--');
        });
            
}

/**
 * 
 *  Create metadata items
 *      \/
 *      Link all metadata items to Shauvon
 *      Create metadata item notes
 * 
 *      Create tags
 *          \/
 *          Link all tags to Shauvon
 *          Create tag notes
 * 
 *          For each game:
 *              Create new Game (dateAdded, description)
 *                  \/
 *                  Link to duration
 *                  Link to playerCount
 *                  Link to tags
 *                  Link to added user
 *                  Link to modified user
 *                  Create notes
 *                  Create name(s)
 *                      \/
 *                      Create name votes
 *                          \/
 *                          Link name votes to Shauvon
 * 
 */

module.exports = {
    resetGames: function() {
        console.log('re-seeding all of the game database');
        deleteMetadata()
            .then(seedMetadata)
            .then(deleteTags)
            .then(seedTags)
            .then(() => {
                process.exit(0);
            });
    }
}