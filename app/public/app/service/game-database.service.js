"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var user_service_1 = require("./user.service");
var GameDatabaseService = (function () {
    function GameDatabaseService(http, userService) {
        this.http = http;
        this.userService = userService;
        this.gamesUrl = '/api/game';
        this.namesUrl = '/api/name';
        this.metadataUrl = '/api/metadata';
        this.playerCountUrl = '/api/metadata/playerCount';
        this.durationUrl = '/api/metadata/duration';
        this.tagUrl = '/api/tag';
        this.noteUrl = '/api/note';
        // cache all the things
        this.games = [];
        this.names = [];
        this.playercounts = [];
        this.durations = [];
        this.tags = [];
        this.notes = [];
    }
    GameDatabaseService.prototype.getGames = function () {
        var _this = this;
        if (!this._gamePromise) {
            this._gamePromise = this.http.get(this.gamesUrl, this.userService.getAuthorizationHeader())
                .toPromise()
                .then(function (response) {
                _this.games = response.json();
                _this._sortGames();
                return _this.games;
            })
                .catch(this.handleError);
        }
        return this._gamePromise;
    };
    GameDatabaseService.prototype.getGame = function (id) {
        var gameToReturn;
        if (this.games.length > 0) {
            this.games.forEach(function (game) {
                if (game._id === id) {
                    gameToReturn = game;
                }
            });
        }
        if (gameToReturn) {
            return Promise.resolve(gameToReturn);
        }
        else {
            // either no games are loaded or we couldn't find the specified one
            return this.http.get(this.gamesUrl + '/' + id, this.userService.getAuthorizationHeader())
                .toPromise()
                .then(function (response) {
                return response.json();
            })
                .catch(this.handleError);
        }
    };
    GameDatabaseService.prototype._sortGames = function () {
        this.games.sort(function (g1, g2) {
            if (!g1.names.length) {
                return -1;
            }
            if (!g2.names.length) {
                return 1;
            }
            return g1.names[0].name.localeCompare(g2.names[0].name);
        });
        return this.games;
    };
    GameDatabaseService.prototype.getNames = function () {
        var _this = this;
        if (!this._namePromise) {
            this._namePromise = this.http.get(this.namesUrl, this.userService.getAuthorizationHeader())
                .toPromise()
                .then(function (response) {
                _this.names = response.json();
                return _this.names;
            })
                .catch(this.handleError);
        }
        return this._namePromise;
    };
    /**
     * A convenience method to search any array of items for any that are linked to a given game id
     */
    GameDatabaseService.prototype._getItemsByGameID = function (items, id) {
        var returnItems = [];
        items.forEach(function (item) {
            if (item.game && item.game == id) {
                returnItems.push(item);
            }
            else if (item.games && item.games.indexOf(id) > -1) {
                returnItems.push(item);
            }
        });
        return returnItems;
    };
    /**
     * This method isn't necessary anymore because names are delivered with games now
     */
    // getNamesByGameID(id: number): Name[] {
    //     let names: Name[] = this._getItemsByGameID(this.names, id);
    //     names.sort((n1, n2) => {
    //         let comp = n2.Weight - n1.Weight;
    //         if (comp === 0) {
    //             return n1.DateModified > n2.DateModified ? -1 : 1;
    //         } else {
    //             return comp;
    //         }
    //     });
    //     return names;
    // }
    /**
     * Creates a new name for the given gameID, making a post to /api/name
     */
    GameDatabaseService.prototype.createName = function (gameID, name) {
        var _this = this;
        return this.http.post(this.namesUrl, {
            game: gameID,
            name: name
        }, this.userService.getAuthorizationHeader())
            .toPromise()
            .then(function (response) {
            var name = response.json();
            _this.names.push(name);
            return name;
        })
            .catch(this.handleError);
    };
    /**
     * Updates a name on the server, making a PUT call to /api/name/:_id
     */
    GameDatabaseService.prototype.saveName = function (name) {
        var _this = this;
        return this.http.put(this.namesUrl + '/' + name._id, name, this.userService.getAuthorizationHeader())
            .toPromise()
            .then(function (response) {
            var newName = response.json();
            var index = _this.names.indexOf(name);
            if (index > -1) {
                _this.names.splice(index, 1, newName);
            }
            else {
                _this.names.push(newName);
            }
            _this._sortGames();
            return newName;
        });
    };
    GameDatabaseService.prototype.getPlayerCounts = function () {
        var _this = this;
        if (!this._playerCountPromise) {
            this._playerCountPromise = this.http.get(this.playerCountUrl, this.userService.getAuthorizationHeader())
                .toPromise()
                .then(function (response) {
                _this.playercounts = response.json();
                return _this.playercounts;
            })
                .catch(this.handleError);
        }
        return this._playerCountPromise;
    };
    GameDatabaseService.prototype.getPlayerCountById = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getPlayerCounts().then(function (playercounts) {
                playercounts.forEach(function (playercount) {
                    if (playercount._id == id) {
                        resolve(playercount);
                    }
                });
            });
        });
    };
    GameDatabaseService.prototype.createPlayerCount = function (name, min, max, description) {
        var _this = this;
        return this.http.post(this.metadataUrl, {
            name: name,
            min: min,
            max: max,
            type: 'playerCount',
            description: description
        }, this.userService.getAuthorizationHeader())
            .toPromise()
            .then(function (response) {
            var playercount = response.json();
            _this.playercounts.push(playercount);
            return playercount;
        });
    };
    GameDatabaseService.prototype.getDurations = function () {
        var _this = this;
        if (!this._durationPromise) {
            this._durationPromise = this.http.get(this.durationUrl, this.userService.getAuthorizationHeader())
                .toPromise()
                .then(function (response) {
                _this.durations = response.json();
                return _this.durations;
            })
                .catch(this.handleError);
        }
        return this._durationPromise;
    };
    GameDatabaseService.prototype.getDurationById = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getDurations().then(function (durations) {
                durations.forEach(function (duration) {
                    if (duration._id == id) {
                        resolve(duration);
                    }
                });
            });
        });
    };
    GameDatabaseService.prototype.createDuration = function (name, min, max, description) {
        var _this = this;
        return this.http.post(this.metadataUrl, {
            Name: name,
            Min: min,
            Max: max,
            type: 'duration',
            Description: description
        }, this.userService.getAuthorizationHeader())
            .toPromise()
            .then(function (response) {
            var duration = response.json();
            _this.durations.push(duration);
            return duration;
        });
    };
    GameDatabaseService.prototype.getTags = function () {
        var _this = this;
        if (!this._tagPromise) {
            if (this.userService.can('tag_view')) {
                this._tagPromise = this.http.get(this.tagUrl, this.userService.getAuthorizationHeader())
                    .toPromise()
                    .then(function (response) {
                    _this.tags = response.json();
                    return _this.tags;
                })
                    .catch(this.handleError);
            }
            else {
                this._tagPromise = new Promise(function (resolve, reject) {
                    resolve([]);
                });
            }
        }
        return this._tagPromise;
    };
    GameDatabaseService.prototype.getTagById = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getTags().then(function (tags) {
                tags.forEach(function (tag) {
                    if (tag._id == id) {
                        resolve(tag);
                    }
                });
            });
        });
    };
    GameDatabaseService.prototype.gameHasTag = function (game, tagIDs) {
        var foundTagGame = false;
        game.tags.forEach(function (taggame) {
            if (tagIDs.includes(taggame.tag._id)) {
                foundTagGame = true;
                return false;
            }
        });
        return foundTagGame;
    };
    GameDatabaseService.prototype.getNotes = function () {
        var _this = this;
        if (!this._notePromise) {
            if (this.userService.can('note_public_view')) {
                this._notePromise = this.http.get(this.noteUrl, this.userService.getAuthorizationHeader())
                    .toPromise()
                    .then(function (response) {
                    _this.notes = response.json();
                    return _this.notes;
                })
                    .catch(this.handleError);
            }
            else {
                this._notePromise = new Promise(function (resolve, reject) {
                    resolve([]);
                });
            }
        }
        return this._notePromise;
    };
    GameDatabaseService.prototype.getNotesForGame = function (game) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getNotes().then(function (notes) {
                // TODO: make this logic server-side
                var notesForGame = [];
                notes.forEach(function (note) {
                    if (note.game == game._id
                        || (game.playerCount._id && note.metadata &&
                            note.metadata._id == game.playerCount._id)
                        || (game.duration._id && note.metadata &&
                            note.metadata._id == game.duration._id)
                        || (note.tag && _this.gameHasTag(game, [note.tag._id]))) {
                        notesForGame.push(note);
                    }
                });
                resolve(notesForGame);
            });
        });
    };
    GameDatabaseService.prototype.deleteGame = function (game) {
        var _this = this;
        return this.http.delete(this.gamesUrl + '/' + game._id, this.userService.getAuthorizationHeader())
            .toPromise()
            .then(function (response) {
            _this._removeGameFromArray(game);
            return true;
        });
    };
    GameDatabaseService.prototype._removeGameFromArray = function (game) {
        var index = this.games.indexOf(game);
        if (index > -1) {
            this.games.splice(index, 1);
        }
        return index;
    };
    GameDatabaseService.prototype._handleNewGame = function (game, response) {
        var index = this._removeGameFromArray(game);
        var newGame = response.json();
        if (index > -1) {
            this.games.splice(index, 0, newGame);
        }
        else {
            this.games.push(newGame);
        }
        return newGame;
    };
    GameDatabaseService.prototype.saveGame = function (game) {
        var _this = this;
        return this.http.put(this.gamesUrl + '/' + game._id, game, this.userService.getAuthorizationHeader())
            .toPromise()
            .then(function (response) {
            return _this._handleNewGame(game, response);
        })
            .catch(this.handleError);
    };
    GameDatabaseService.prototype.createGame = function () {
        var _this = this;
        return this.http.post(this.gamesUrl, {}, this.userService.getAuthorizationHeader())
            .toPromise()
            .then(function (response) {
            var game = response.json();
            _this.games.push(game);
            _this._sortGames();
            return game;
        })
            .catch(this.handleError);
    };
    GameDatabaseService.prototype._handleNewTagGame = function (game, response, tag) {
        var newGame = this._handleNewGame(game, response), taggame;
        newGame.tags.forEach(function (tg) {
            if ((typeof (tag) != 'string' && tg.tag._id == tag._id) ||
                (typeof (tag) == 'string' && tg.tag.name == tag)) {
                taggame = tg;
                return false;
            }
        });
        return taggame;
    };
    GameDatabaseService.prototype.saveTagToGame = function (game, tag) {
        var _this = this;
        return this.http.post(this.gamesUrl + '/' + game._id + '/addTag/' + tag._id, {}, this.userService.getAuthorizationHeader())
            .toPromise()
            .then(function (response) {
            return _this._handleNewTagGame(game, response, tag);
        });
    };
    GameDatabaseService.prototype.deleteTagGame = function (game, taggame) {
        var _this = this;
        return this.http.delete(this.gamesUrl + '/' + game._id + '/removeTag/' + taggame.tag._id, this.userService.getAuthorizationHeader())
            .toPromise()
            .then(function (response) {
            return _this._handleNewGame(game, response);
        });
    };
    GameDatabaseService.prototype.createTag = function (name, game) {
        var _this = this;
        return this.http.post(this.gamesUrl + '/' + game._id + '/createTag/' + name, { name: name }, this.userService.getAuthorizationHeader())
            .toPromise()
            .then(function (response) {
            return _this._handleNewTagGame(game, response, name);
        });
    };
    GameDatabaseService.prototype.handleError = function (error) {
        console.error('An error has occurred', error);
        return Promise.reject(error.message || error);
    };
    // TODO: search stuff can be in a separate service
    GameDatabaseService.prototype._searchArray = function (arr, type, idProperty, term) {
        var results = [];
        arr.forEach(function (item) {
            var str = item.Name;
            if (str.toLowerCase().indexOf(term) > -1) {
                var regex = new RegExp('(' + term + ')', 'gi');
                str = str.replace(regex, '<strong>$1</strong>');
                var result = {
                    text: str,
                    id: item[idProperty],
                    type: type
                };
                results.push(result);
            }
        });
        return results;
    };
    GameDatabaseService.prototype._sortSearchResults = function (results) {
        results.sort(function (r1, r2) {
            var val1 = r1.text;
            var val2 = r2.text;
            if (val1 > val2) {
                return 1;
            }
            if (val1 < val2) {
                return -1;
            }
            return 0;
        });
        return results;
    };
    GameDatabaseService.prototype.searchForResults = function (term) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            term = term.toLowerCase();
            var searchResults = [];
            if (term) {
                Promise.all([
                    _this.getNames(),
                    _this.getTags(),
                    _this.getDurations(),
                    _this.getPlayerCounts()
                ])
                    .then(function (items) {
                    searchResults = []
                        .concat(_this._searchArray(items[0], 'name', 'game', term))
                        .concat(_this._searchArray(items[1], 'tag', '_id', term))
                        .concat(_this._searchArray(items[2], 'duration', '_id', term))
                        .concat(_this._searchArray(items[3], 'playercount', '_id', term));
                    // TODO: include player count and durations by actual values if the term is a number?
                    searchResults = _this._sortSearchResults(searchResults);
                    resolve(searchResults);
                });
            }
        });
    };
    GameDatabaseService.prototype.searchForTags = function (term) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            term = term.toLocaleLowerCase();
            var matchingTags = [];
            if (term) {
                _this.getTags().then(function (tags) {
                    tags.forEach(function (tag) {
                        if (tag.name.toLocaleLowerCase().indexOf(term) > -1) {
                            matchingTags.push(tag);
                        }
                    });
                    resolve(matchingTags);
                });
            }
        });
    };
    GameDatabaseService.prototype.searchForGames = function (term) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            term = term.toLowerCase();
            var gameResults = [];
            if (term) {
                Promise.all([
                    _this.getGames(),
                    _this.getTags(),
                    _this.getDurations(),
                    _this.getPlayerCounts()
                ])
                    .then(function (items) {
                    // search the tags
                    var tagResults = [];
                    items[1].forEach(function (tag) {
                        if (tag.name.toLowerCase().indexOf(term) > -1) {
                            tagResults.push(tag._id);
                        }
                    });
                    // search the durations
                    var durationResults = [];
                    items[2].forEach(function (duration) {
                        if (duration.name.toLowerCase().indexOf(term) > -1) {
                            durationResults.push(duration._id);
                        }
                    });
                    // search the player counts
                    var playerCountResults = [];
                    items[3].forEach(function (playercount) {
                        if (playercount.name.toLowerCase().indexOf(term) > -1) {
                            playerCountResults.push(playercount._id);
                        }
                    });
                    // loop through the games
                    items[0].forEach(function (game) {
                        // add it if a tag matches or if the playercount or duration matches
                        if (_this.gameHasTag(game, tagResults) ||
                            durationResults.includes(game.duration._id) ||
                            playerCountResults.includes(game.playerCount._id)) {
                            gameResults.push(game);
                        }
                        else {
                            // add it if a name matches
                            game.names.forEach(function (name) {
                                if (name.name.toLowerCase().indexOf(term) > -1 &&
                                    gameResults.indexOf(game) == -1) {
                                    gameResults.push(game);
                                }
                            });
                        }
                    });
                    resolve(gameResults);
                });
            }
        });
    };
    return GameDatabaseService;
}());
GameDatabaseService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        user_service_1.UserService])
], GameDatabaseService);
exports.GameDatabaseService = GameDatabaseService;

//# sourceMappingURL=game-database.service.js.map
