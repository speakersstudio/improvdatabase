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
    let ShauvonID = "58c6e5bcd036281f4ce07dff";
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
    
const gameseed = fixUsers(require('./models/seeds/game.seed.json')),
    nameseed = fixUsers(require('./models/seeds/name.seed.json')),
    tagGameseed = fixUsers(require('./models/seeds/tag-game.seed.json')),
    gameNoteseed = fixUsers(require('./models/seeds/note.seed.json'));

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
    return Tag.find({}).remove()
        .then(() => {
            return Note.find({})
                .$where('this.game === "" && this.metadata === ""')
                .remove();
        });
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

function deleteGames() {
    console.log('Deleting games');
    return Game.find({}).remove()
        .then(() => {
            return Name.find({}).remove();
        })
        .then(() => {
            return Note.find({})
                .$where('this.tag === "" && this.metadata === ""')
                .remove();
        });
}

function seedGames() {
    return seedGame(0);
}

function seedGame(gameIndex) {
    let rawGame = gameseed[gameIndex];
    let gameData = {
            dateAdded: rawGame.dateAdded,
            legacyID: rawGame.legacyID,
            description: rawGame.description,
            addedUser: rawGame.addedUser,
            modifiedUser: rawGame.modifiedUser
        };

    return Game.create(gameData)
        .then(game => {
            // console.log('Created game ' + gameIndex);

            return GameMetadata.findOne({})
                .where('type').equals('duration')
                .where('legacyID').equals(rawGame.DurationID)
                .exec()
                .then(dur => {
                    dur.games.push(game._id);
                    game.duration = dur._id;

                    return dur.save()
                        .then(() => {
                            // console.log(' -- Added duration');
                            return GameMetadata.findOne({})
                                .where('type').equals('playerCount')
                                .where('legacyID').equals(rawGame.PlayerCountID)
                                .exec();
                        });
                })
                .then(pc => {

                    pc.games.push(game._id);
                    game.playerCount = pc._id;
                    return pc.save()
                        .then(() => {
                            // console.log(' -- Added Player Count');

                            let tagData = [];
                    
                            // find all of the legacy tagGame objects for this game
                            tagGameseed.forEach(tg => {
                                if (tg.GameID == game.legacyID) {
                                    tagData.push({
                                        TagID: tg.TagID,
                                        DateAdded: tg.DateAdded
                                    });
                                }
                            });

                            let findTag = (tagIndex) => {
                                return Tag.findOne({})
                                    .where('legacyID').equals(tagData[tagIndex].TagID)
                                    .exec()
                                    .then(t => {
                                        game.tags.push({
                                            tag: t._id,
                                            dateAdded: tagData[tagIndex].DateAdded,
                                            addedUser: ShauvonID
                                        });
                                        tagIndex++;
                                        if (tagData[tagIndex]) {
                                            return findTag(tagIndex);
                                        } else {
                                            // console.log(' -- Added ' + tagIndex + ' tags');
                                        }
                                    });
                            }

                            return findTag(0);
                        });
                    
                })
                .then(() => {
                    // find all the notes for this game
                    let notes = [];
                    gameNoteseed.forEach(n => {
                        if (n.GameID == game.legacyID) {
                            notes.push(n);
                        }
                    });

                    let addNote = (noteIndex) => {
                        let n = notes[noteIndex];
                        return game.addNote({
                            "description": n.description,
                            "public": n.public,
                            "dateAdded": n.dateAdded,
                            "addedUser": ShauvonID,
                            "modifiedUser": ShauvonID
                        }).then(() => {
                            noteIndex++;
                            if (notes[noteIndex]) {
                                return addNote(noteIndex);
                            } else {
                                // console.log(' -- Added ' + noteIndex + ' note(s)');
                            }
                        });
                    }

                    if (notes.length > 0) {
                        return addNote(0);
                    }
                })
                .then(() => {
                    // find all the names for this game
                    let names = [];
                    nameseed.forEach(n => {
                        if (n.GameID == game.legacyID) {
                            names.push(n);
                        }
                    });

                    let addName = (nameIndex) => {
                        let n = names[nameIndex];

                        return Name.create({
                            name: n.name,
                            addedUser: ShauvonID,
                            modifiedUser: ShauvonID,
                            dateAdded: n.dateAdded,
                            game: game._id
                        })
                            .then(nameModel => {
                                let weight = n.Weight;

                                if (weight > 1) {
                                    return nameModel.addVote(ShauvonID)
                                        .then(() => {
                                            // console.log (' ---- Added Name Vote to ' + nameModel.name);
                                            game.names.push(nameModel._id);
                                            return game.save();
                                        });
                                } else {
                                    game.names.push(nameModel._id);
                                    return game.save();
                                }
                            })
                            .then(() => {
                                nameIndex++;
                                if (names[nameIndex]) {
                                    return addName(nameIndex);
                                } else {
                                    // console.log(' -- Added ' + nameIndex + ' name(s)');
                                }
                            });
                    }
                    return addName(0);
                })
                .then(() => {
                    return game.save();
                })
                .then(() => {
                    gameIndex++;
                    if (gameseed[gameIndex]) {
                        return seedGame(gameIndex);
                    } else {
                        console.log(gameIndex + ' games seeded to the database! Phew!');
                        console.log(' -- ');
                    }
                });
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
            .then(deleteGames)
            .then(seedGames)
            .then(() => {
                process.exit(0);
            });
    },

    clear: function() {
        deleteMetadata()
            .then(deleteTags)
            .then(deleteGames)
            .then(() => {
                process.exit(0);
            });
    },

    checkForSeed: function() {
        Game.count({}, (err, count) => {
            if (err) {
                throw err;
            }

            if (count > 0) {
                console.log('Game database already seeded, no need to re-seed them.');
                process.exit(0);
                return;
            }

            console.log('seeding the Game database!');
            this.resetGames();
        });
    }
}