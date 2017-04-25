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
require("rxjs/Subscription");
var game_database_service_1 = require("../../service/game-database.service");
var game_1 = require("../../model/game");
var GameCardView = (function () {
    function GameCardView(gameDatabaseService) {
        this.gameDatabaseService = gameDatabaseService;
        this.iconClass = "rocket";
        //@Input() showTags: boolean = false;
        this.tags = [];
    }
    GameCardView.prototype.ngOnInit = function () {
        var _this = this;
        if (this.game.description) {
            // this will create a description string without any HTML tags in it
            var div = document.createElement("div");
            div.innerHTML = this.game.description;
            this.descriptionText = div.textContent || div.innerText || this.game.description;
        }
        this.game.tags.forEach(function (taggame) {
            // let's just make sure the tag actually exists
            if (taggame.tag) {
                switch (taggame.tag.name.toLowerCase()) {
                    case 'show':
                        _this.iconClass = 'ticket';
                        _this.iconDescription = taggame.tag.description;
                        break;
                    case 'exercise':
                        _this.iconClass = 'lightbulb-o';
                        _this.iconDescription = taggame.tag.description;
                        break;
                    case 'warmup':
                        _this.iconClass = 'fire';
                        _this.iconDescription = taggame.tag.description;
                        break;
                }
            }
        });
    };
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
