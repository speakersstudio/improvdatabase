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
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
require('rxjs/Subscription');
var app_component_1 = require('./app.component');
var game_database_service_1 = require('../service/game-database.service');
var GameDatabaseComponent = (function () {
    function GameDatabaseComponent(_app, route, router, gameDatabaseService, pathLocationStrategy) {
        this._app = _app;
        this.route = route;
        this.router = router;
        this.gameDatabaseService = gameDatabaseService;
        this.pathLocationStrategy = pathLocationStrategy;
        this.games = [];
        this.names = [];
        this.scrollpos = 0;
        this._titleBase = "Games ";
        this.searchResults = [];
        this.tools = [
            {
                icon: "fa-hashtag",
                name: "showTags",
                text: "Show Tags",
                active: false
            },
            {
                icon: "fa-random",
                name: "randomGame",
                text: "Select Random Game",
                active: false
            }
        ];
    }
    GameDatabaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.setTitle();
        //this.toolSubscription = this.toolService.tool$.subscribe(this.onToolClicked);
        this._app.showLoader();
        this.getGames();
        this.pathLocationStrategy.onPopState(function () {
            _this.selectedGame = null;
        });
    };
    GameDatabaseComponent.prototype.setTitle = function () {
        if (this.filter) {
            this.title = "Back";
        }
        else {
            this.title = this._titleBase;
        }
    };
    GameDatabaseComponent.prototype.getGames = function () {
        var _this = this;
        this.gameDatabaseService.getGames('name').then(function (games) {
            games = _this._filterGames(games);
            _this._loadGames(games);
        });
    };
    GameDatabaseComponent.prototype.getGamesSearch = function (term) {
        var _this = this;
        this.gameDatabaseService.searchForGames(term).then(function (games) { return _this._loadGames(games); });
    };
    GameDatabaseComponent.prototype._loadGames = function (games) {
        var _this = this;
        setTimeout(function () {
            _this._app.hideLoader();
            _this.games = games;
            _this.onGamesLoaded();
        }, 150);
    };
    GameDatabaseComponent.prototype._filterGames = function (games) {
        var _this = this;
        if (this.filter) {
            return games.filter(function (game) {
                if (_this.filter.property == 'TagID') {
                    for (var tagIDIndex = 0; tagIDIndex < game.TagGames.length; tagIDIndex++) {
                        if (game.TagGames[tagIDIndex].TagID == _this.filter.value) {
                            return true;
                        }
                    }
                    return false;
                }
                else {
                    return game[_this.filter.property] == _this.filter.value;
                }
            });
        }
        else {
            return games;
        }
    };
    GameDatabaseComponent.prototype.onGamesLoaded = function () {
        var _this = this;
        // navigate to games;random=random to load a random game
        this.route.params.forEach(function (params) {
            if (params['random']) {
                _this.pathLocationStrategy.replaceState({}, "", "/games", "");
                _this.selectRandomGame();
            }
        });
    };
    GameDatabaseComponent.prototype.trackByGames = function (index, game) {
        return game.GameID;
    };
    GameDatabaseComponent.prototype.onScroll = function ($event) {
        this.scrollpos = $event.target.scrollTop;
    };
    GameDatabaseComponent.prototype.onSelect = function (game) {
        if (!game) {
            this.selectedGame = null;
        }
        else {
            this.selectedGame = game;
        }
        var newPath = "/game/" + this.selectedGame.GameID;
        if (this.pathLocationStrategy.path().indexOf("/game/") > -1) {
            this.pathLocationStrategy.replaceState({}, "", newPath, "");
        }
        else {
            this.pathLocationStrategy.pushState({}, "", newPath, "");
        }
    };
    GameDatabaseComponent.prototype.selectRandomGame = function () {
        var i = Math.floor((Math.random() * this.games.length));
        this.onSelect(this.games[i]);
    };
    GameDatabaseComponent.prototype.closeDetails = function (tool) {
        if (tool && tool.name) {
            this.onToolClicked(tool);
        }
        else {
            this.pathLocationStrategy.back();
        }
    };
    GameDatabaseComponent.prototype.onToolClicked = function (tool) {
        switch (tool.name) {
            case "showTags":
                tool.active = !tool.active;
                break;
            case "randomGame":
                this.selectRandomGame();
                break;
        }
    };
    GameDatabaseComponent.prototype.ngOnDestroy = function () {
    };
    GameDatabaseComponent.prototype.onSearchResultClick = function (result) {
        var _this = this;
        switch (result.type) {
            case 'search':
                if (result.text) {
                    this.filter = {
                        "property": "search",
                        "value": 0
                    };
                    this.getGamesSearch(result.text);
                    this.setTitle();
                }
                else {
                    this.clearFilter();
                }
                return;
            case 'name':
                this.gameDatabaseService.getGame(result.id)
                    .then(function (game) { return _this.onSelect(game); });
                return;
            case 'tag':
                this.filter = {
                    "property": 'TagID',
                    "value": result.id
                };
                break;
            case 'duration':
                this.filter = {
                    "property": 'DurationID',
                    "value": result.id
                };
                break;
            case 'playercount':
                this.filter = {
                    "property": 'PlayerCountID',
                    "value": result.id
                };
                break;
        }
        this.getGames();
        this.setTitle();
    };
    GameDatabaseComponent.prototype.onSearch = function (term) {
        var _this = this;
        this.gameDatabaseService.searchForResults(term)
            .then(function (results) { return _this.searchResults = results; });
    };
    GameDatabaseComponent.prototype.clearFilter = function () {
        // TODO: back button should clear filters
        this.filter = null;
        this.getGames();
        this.setTitle();
    };
    GameDatabaseComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "game-database",
            templateUrl: '../template/game-database.component.html',
            animations: [
                core_1.trigger('flyInOut', [
                    core_1.state('in', core_1.style({
                        opacity: 1
                    })),
                    core_1.transition('void => *', [
                        core_1.style({ opacity: 0 }),
                        core_1.animate(100)
                    ]),
                    core_1.transition('* => void', [
                        core_1.animate(100, core_1.style({ opacity: 0 }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [app_component_1.AppComponent, router_1.ActivatedRoute, router_1.Router, game_database_service_1.GameDatabaseService, common_1.PathLocationStrategy])
    ], GameDatabaseComponent);
    return GameDatabaseComponent;
}());
exports.GameDatabaseComponent = GameDatabaseComponent;

//# sourceMappingURL=game-database.component.js.map
