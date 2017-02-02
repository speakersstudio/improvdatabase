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
var core_1 = require("@angular/core");
require("rxjs/Subscription");
var game_database_service_1 = require("../service/game-database.service");
var game_1 = require("../model/game");
var GameCardView = (function () {
    function GameCardView(gameDatabaseService) {
        this.gameDatabaseService = gameDatabaseService;
        this.iconClass = "rocket";
        //@Input() showTags: boolean = false;
        this.tags = [];
    }
    GameCardView.prototype.ngOnInit = function () {
        var _this = this;
        var div = document.createElement("div");
        div.innerHTML = this.game.Description;
        this.descriptionText = div.textContent || div.innerText || this.game.Description;
        this.gameDatabaseService.getPlayerCountById(this.game.PlayerCountID)
            .then(function (playercount) { return _this.playerCount = playercount; });
        this.gameDatabaseService.getDurationById(this.game.DurationID)
            .then(function (duration) { return _this.duration = duration; });
        this.loadTags();
    };
    GameCardView.prototype.loadTags = function () {
        var _this = this;
        this.game.TagGames.forEach(function (tagGame) {
            _this.gameDatabaseService.getTagById(tagGame.TagID)
                .then(function (tag) {
                _this.tags.push(tag);
                switch (tag.Name.toLowerCase()) {
                    case 'show':
                        _this.iconClass = 'ticket';
                        break;
                    case 'exercise':
                        _this.iconClass = 'lightbulb-o';
                        break;
                    case 'warmup':
                        _this.iconClass = 'fire';
                }
            });
        });
    };
    /*
    onToolClicked(tool: Tool): void {
        switch (tool.name) {
            case "showTags":
                this.showTags = tool.active;
                if (tool.active && this.tags.length === 0) {
                    this.loadTags();
                }
                break;
        }
    }
    */
    GameCardView.prototype.ngOnDestroy = function () {
    };
    return GameCardView;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", game_1.Game)
], GameCardView.prototype, "game", void 0);
GameCardView = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: '.ng-game-card',
        templateUrl: '../template/view/game-card.view.html'
    }),
    __metadata("design:paramtypes", [game_database_service_1.GameDatabaseService])
], GameCardView);
exports.GameCardView = GameCardView;

//# sourceMappingURL=game-card.view.js.map
