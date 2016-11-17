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
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var game_database_service_1 = require('../service/game-database.service');
var game_1 = require('../model/game');
var user_service_1 = require("../service/user.service");
var GameDetailsComponent = (function () {
    function GameDetailsComponent(gameDatabaseService, router, route, location, userService) {
        this.gameDatabaseService = gameDatabaseService;
        this.router = router;
        this.route = route;
        this.location = location;
        this.userService = userService;
        this.onClose = new core_1.EventEmitter();
        this.dialog = false;
        this.tags = [];
        this.tagMap = {};
        this.notes = [];
        this.scrollpos = 0;
        this.namesOpen = false;
        this.showToolbarScrollPosition = window.innerWidth * 0.15;
        this.permissions = {};
        this.tools = [
            {
                icon: "fa-trash",
                name: "deleteGame",
                text: "Delete Game",
                permission: "game_delete"
            },
            {
                icon: "fa-random",
                name: "randomGame",
                text: "Select Random Game",
                active: false
            }
        ];
    }
    GameDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.game) {
            this.route.params.forEach(function (params) {
                var id = +params['id'];
                _this.gameDatabaseService.getGame(id)
                    .then(function (game) { return _this.setGame(game); });
            });
        }
        else {
            this.dialog = true;
            this.setGame(this.game);
        }
        this.permissions = this.userService.getPermissions();
        console.log(this.permissions);
    };
    GameDetailsComponent.prototype.ngOnDestroy = function () {
    };
    GameDetailsComponent.prototype.setGame = function (game) {
        var _this = this;
        this.game = game;
        this.gameDatabaseService.getPlayerCountById(this.game.PlayerCountID)
            .then(function (playercount) { return _this.playerCount = playercount; });
        this.gameDatabaseService.getDurationById(this.game.DurationID)
            .then(function (duration) { return _this.duration = duration; });
        this.game.TagGames.forEach(function (tagGame) {
            _this.gameDatabaseService.getTagById(tagGame.TagID)
                .then(function (tag) {
                _this.tagMap[tag.TagID] = tag.Name;
                _this.tags.push(tag);
            });
        });
        this.gameDatabaseService.getNotesForGame(this.game)
            .then(function (notes) { return _this.notes = notes; });
    };
    GameDetailsComponent.prototype.closePage = function () {
        if (this.dialog) {
            this.onClose.emit();
        }
        else {
            this.router.navigate(['/games']);
        }
    };
    GameDetailsComponent.prototype.onScroll = function ($event) {
        this.scrollpos = $event.target.scrollTop;
    };
    GameDetailsComponent.prototype.toggleNames = function () {
        this.namesOpen = !this.namesOpen;
    };
    GameDetailsComponent.prototype.onToolClicked = function (tool) {
        switch (tool.name) {
            case "randomGame":
                if (this.dialog) {
                    this.onClose.emit(tool);
                }
                else {
                    this.router.navigate(['/games', { random: 'random' }]);
                }
                break;
            case "deleteGame":
                break;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', game_1.Game)
    ], GameDetailsComponent.prototype, "game", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], GameDetailsComponent.prototype, "onClose", void 0);
    GameDetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: '.page.ng-game-details',
            templateUrl: '../template/game-details.component.html',
            animations: [
                core_1.trigger('expand', [
                    core_1.state('in', core_1.style({ height: '*' })),
                    core_1.transition('void => *', [
                        core_1.style({ height: 0 }),
                        core_1.animate(100)
                    ]),
                    core_1.transition('* => void', [
                        core_1.style({ height: '*' }),
                        core_1.animate(100, core_1.style({ height: 0 }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [game_database_service_1.GameDatabaseService, router_1.Router, router_1.ActivatedRoute, common_1.Location, user_service_1.UserService])
    ], GameDetailsComponent);
    return GameDetailsComponent;
}());
exports.GameDetailsComponent = GameDetailsComponent;

//# sourceMappingURL=game-details.component.js.map
