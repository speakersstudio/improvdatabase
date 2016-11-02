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
        // cache all the things
        this.games = [];
        this.names = [];
        this.playercounts = [];
        this.durations = [];
        this.tags = [];
        this.tagGames = [];
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
    GameDatabaseService.prototype.handleError = function (error) {
        console.error('An error has occurred', error);
        return Promise.reject(error.message || error);
    };
    GameDatabaseService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], GameDatabaseService);
    return GameDatabaseService;
}());
exports.GameDatabaseService = GameDatabaseService;

//# sourceMappingURL=game-database.service.js.map