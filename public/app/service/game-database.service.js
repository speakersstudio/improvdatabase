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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var GameDatabaseService = (function () {
    function GameDatabaseService(http) {
        this.http = http;
        this.gamesUrl = '/api/game';
        this.namesUrl = '/api/name';
        this.playerCountUrl = '/api/playerCount';
        this.durationUrl = '/api/duration';
        this.tagUrl = '/api/tag';
        this.tagGameUrl = '/api/tagGame';
        this.noteUrl = '/api/note';
        // cache all the things
        this.games = [];
        this.names = [];
        this.playercounts = [];
        this.durations = [];
        this.tags = [];
        this.tagGames = [];
        this.notes = [];
    }
    // TODO: update the API to expand names and tagGames on game queries
    GameDatabaseService.prototype.getGames = function (sortProperty) {
        var _this = this;
        if (sortProperty === void 0) { sortProperty = 'name'; }
        console.log('getting games, sorting by ', sortProperty);
        return Promise.all([this._getGames(), this.getNames(), this.getTagGames()])
            .then(function () {
            // set it and forget it
            _this.games.forEach(function (game) { return _this._setupGame(game); });
            _this.games = _this._sortGames(sortProperty);
            return _this.games;
        });
    };
    GameDatabaseService.prototype._setupGame = function (game) {
        game.Names = this.getNamesByGameID(game.GameID);
        game.TagGames = this.getTagGamesByGameID(game.GameID);
        return game;
    };
    GameDatabaseService.prototype.getGame = function (id) {
        var _this = this;
        return Promise.all([this._getGame(id), this.getNames(), this.getTagGames()])
            .then(function (vals) {
            var game = vals[0];
            return _this._setupGame(game);
        });
    };
    GameDatabaseService.prototype._getGames = function () {
        var _this = this;
        if (!this._gamePromise) {
            this._gamePromise = this.http.get(this.gamesUrl)
                .toPromise()
                .then(function (response) {
                _this.games = response.json();
                return _this.games;
            })
                .catch(this.handleError);
        }
        return this._gamePromise;
    };
    GameDatabaseService.prototype._getGame = function (id) {
        if (this.games.length > 0) {
            this.games.forEach(function (game) {
                if (game.GameID === id) {
                    return Promise.resolve(game);
                }
            });
        }
        // either no games are loaded or we couldn't find the specified one
        return this.http.get(this.gamesUrl + '/' + id)
            .toPromise()
            .then(function (response) {
            return response.json()[0];
        })
            .catch(this.handleError);
    };
    GameDatabaseService.prototype._sortGames = function (property) {
        if (property === 'name') {
            this.games.sort(function (g1, g2) {
                if (g1.Names[0].Name > g2.Names[0].Name) {
                    return 1;
                }
                if (g1.Names[0].Name < g2.Names[0].Name) {
                    return -1;
                }
                return 0;
            });
        }
        return this.games;
    };
    GameDatabaseService.prototype.getNames = function () {
        var _this = this;
        if (!this._namePromise) {
            this._namePromise = this.http.get(this.namesUrl)
                .toPromise()
                .then(function (response) {
                _this.names = response.json();
                return _this.names;
            })
                .catch(this.handleError);
        }
        return this._namePromise;
    };
    GameDatabaseService.prototype._getItemsByGameID = function (items, id) {
        var returnItems = [];
        items.forEach(function (item) {
            if (item.GameID && item.GameID == id) {
                returnItems.push(item);
            }
        });
        return returnItems;
    };
    GameDatabaseService.prototype.getNamesByGameID = function (id) {
        var names = this._getItemsByGameID(this.names, id);
        names.sort(function (n1, n2) {
            var comp = n2.Weight - n1.Weight;
            if (comp === 0) {
                return n1.DateModified > n2.DateModified ? -1 : 1;
            }
            else {
                return comp;
            }
        });
        return names;
    };
    GameDatabaseService.prototype.getTagGames = function () {
        var _this = this;
        if (!this._tagGamePromise) {
            this._tagGamePromise = this.http.get(this.tagGameUrl)
                .toPromise()
                .then(function (response) {
                _this.tagGames = response.json();
                return _this.tagGames;
            })
                .catch(this.handleError);
        }
        return this._tagGamePromise;
    };
    GameDatabaseService.prototype.getTagGamesByGameID = function (id) {
        var tagGames = this._getItemsByGameID(this.tagGames, id);
        return tagGames;
    };
    GameDatabaseService.prototype.getPlayerCounts = function () {
        var _this = this;
        if (!this._playerCountPromise) {
            this._playerCountPromise = this.http.get(this.playerCountUrl)
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
                    if (playercount.PlayerCountID == id) {
                        resolve(playercount);
                    }
                });
            });
        });
    };
    GameDatabaseService.prototype.getDurations = function () {
        var _this = this;
        if (!this._durationPromise) {
            this._durationPromise = this.http.get(this.durationUrl)
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
                    if (duration.DurationID == id) {
                        resolve(duration);
                    }
                });
            });
        });
    };
    GameDatabaseService.prototype.getTags = function () {
        var _this = this;
        if (!this._tagPromise) {
            this._tagPromise = this.http.get(this.tagUrl)
                .toPromise()
                .then(function (response) {
                _this.tags = response.json();
                return _this.tags;
            })
                .catch(this.handleError);
        }
        return this._tagPromise;
    };
    GameDatabaseService.prototype.getTagById = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getTags().then(function (tags) {
                tags.forEach(function (tag) {
                    if (tag.TagID == id) {
                        resolve(tag);
                    }
                });
            });
        });
    };
    GameDatabaseService.prototype.gameHasTag = function (game, tagIDs) {
        var foundTagGame = false;
        game.TagGames.forEach(function (taggame) {
            if (tagIDs.indexOf(taggame.TagID) > -1) {
                foundTagGame = true;
                return false;
            }
        });
        return foundTagGame;
    };
    GameDatabaseService.prototype.getNotes = function () {
        var _this = this;
        if (!this._notePromise) {
            this._notePromise = this.http.get(this.noteUrl)
                .toPromise()
                .then(function (response) {
                _this.notes = response.json();
                return _this.notes;
            })
                .catch(this.handleError);
        }
        return this._notePromise;
    };
    GameDatabaseService.prototype.getNotesForGame = function (game) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getNotes().then(function (notes) {
                var notesForGame = [];
                notes.forEach(function (note) {
                    if (note.GameID == game.GameID
                        || note.PlayerCountID == game.PlayerCountID
                        || note.DurationID == game.DurationID
                        || (note.TagID && _this.gameHasTag(game, [note.TagID]))) {
                        notesForGame.push(note);
                    }
                });
                resolve(notesForGame);
            });
        });
    };
    GameDatabaseService.prototype.handleError = function (error) {
        console.error('An error has occurred', error);
        return Promise.reject(error.message || error);
    };
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
                        .concat(_this._searchArray(items[0], 'name', 'GameID', term))
                        .concat(_this._searchArray(items[1], 'tag', 'TagID', term))
                        .concat(_this._searchArray(items[2], 'duration', 'DurationID', term))
                        .concat(_this._searchArray(items[3], 'playercount', 'PlayerCountID', term));
                    // TODO: include player count and durations by actual values if the term is a number?
                    searchResults = _this._sortSearchResults(searchResults);
                    resolve(searchResults);
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
                        if (tag.Name.toLowerCase().indexOf(term) > -1) {
                            tagResults.push(tag.TagID);
                        }
                    });
                    // search the durations
                    var durationResults = [];
                    items[2].forEach(function (duration) {
                        if (duration.Name.toLowerCase().indexOf(term) > -1) {
                            durationResults.push(duration.DurationID);
                        }
                    });
                    // search the player counts
                    var playerCountResults = [];
                    items[3].forEach(function (playercount) {
                        if (playercount.Name.toLowerCase().indexOf(term) > -1) {
                            playerCountResults.push(playercount.PlayerCountID);
                        }
                    });
                    // loop through the games
                    items[0].forEach(function (game) {
                        // add it if a tag matches or if the playercount or duration matches
                        if (_this.gameHasTag(game, tagResults) ||
                            durationResults.indexOf(game.DurationID) > -1 ||
                            playerCountResults.indexOf(game.PlayerCountID) > -1) {
                            gameResults.push(game);
                        }
                        else {
                            // add it if a name matches
                            game.Names.forEach(function (name) {
                                if (name.Name.toLowerCase().indexOf(term) > -1 &&
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
    GameDatabaseService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], GameDatabaseService);
    return GameDatabaseService;
}());
exports.GameDatabaseService = GameDatabaseService;

//# sourceMappingURL=game-database.service.js.map
