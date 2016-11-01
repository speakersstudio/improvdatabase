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
    function GameDatabaseComponent(_app, router, toolService, gameDatabaseService, pathLocationStrategy) {
        this._app = _app;
        this.router = router;
        this.toolService = toolService;
        this.gameDatabaseService = gameDatabaseService;
        this.pathLocationStrategy = pathLocationStrategy;
        this.games = [];
        this.names = [];
        this._titleBase = "Games ";
        this._tools = [
            {
                icon: "fa-random",
                name: "randomGame",
                text: "Select Random Game",
                active: false
            },
            {
                icon: "fa-hashtag",
                name: "showTags",
                text: "Show Tags",
                active: false
            },
            {
                icon: "fa-filter",
                name: "filter",
                text: "Filter Games",
                active: false
            },
            {
                icon: 'fa-sort-amount-asc',
                name: 'sortGames',
                text: 'Sort Games',
                active: false
            }
        ];
    }
    GameDatabaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._app.setTitle(this._titleBase);
        this._app.setTools(this._tools);
        this.toolSubscription = this.toolService.tool$.subscribe(this.onToolClicked);
        this._app.showLoader();
        this.getGames();
        this.pathLocationStrategy.onPopState(function () {
            _this.selectedGame = null;
        });
        // TODO: make the toolbar elevate as the user scrolls
    };
    GameDatabaseComponent.prototype.getGames = function () {
        var _this = this;
        this.gameDatabaseService.getGames('name').then(function (games) {
            setTimeout(function () {
                _this._app.hideLoader();
                _this.games = games;
            }, 1);
        });
    };
    GameDatabaseComponent.prototype.trackByGames = function (index, game) {
        return game.GameID;
    };
    GameDatabaseComponent.prototype.onSelect = function (game) {
        if (!game || this.selectedGame == game) {
            this.selectedGame = null;
        }
        else {
            this.selectedGame = game;
        }
        this.pathLocationStrategy.pushState({}, "", "/game/" + this.selectedGame.GameID, "");
    };
    GameDatabaseComponent.prototype.closeDetails = function () {
        this.selectedGame = null;
        this.pathLocationStrategy.back();
    };
    GameDatabaseComponent.prototype.onToolClicked = function (tool) {
        switch (tool.name) {
            case "showTags":
                tool.active = !tool.active;
                break;
            case "filter":
                console.log('FILTER');
                break;
            case "randomGame":
                console.log('random game');
                break;
            case "searchGames":
                console.log('search game');
                break;
        }
    };
    GameDatabaseComponent.prototype.ngOnDestroy = function () {
        this.toolSubscription.unsubscribe();
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
        __metadata('design:paramtypes', [app_component_1.AppComponent, router_1.Router, app_component_1.ToolService, game_database_service_1.GameDatabaseService, common_1.PathLocationStrategy])
    ], GameDatabaseComponent);
    return GameDatabaseComponent;
}());
exports.GameDatabaseComponent = GameDatabaseComponent;

//# sourceMappingURL=game-database.component.js.map
