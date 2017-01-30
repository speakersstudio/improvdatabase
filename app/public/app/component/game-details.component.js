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
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var app_component_1 = require("./app.component");
var game_database_service_1 = require("../service/game-database.service");
var game_1 = require("../model/game");
var player_count_1 = require("../model/player-count");
var user_service_1 = require("../service/user.service");
var GameDetailsComponent = (function () {
    function GameDetailsComponent(_app, gameDatabaseService, router, route, location, userService) {
        this._app = _app;
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
        this.namesOpen = false;
        this.allPlayerCounts = [];
        this.allDurations = [];
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
        //console.log(this.userService.loggedInUser.Permissions);
    };
    GameDetailsComponent.prototype.ngOnDestroy = function () {
    };
    GameDetailsComponent.prototype.can = function (permission) {
        return this.userService.can(permission);
    };
    GameDetailsComponent.prototype._focusInput = function () {
        // TODO: figure out how to focus the new input element - probably stupid complicated with Angular
        // http://stackoverflow.com/questions/34522306/angular-2-focus-on-newly-added-input-element
        var i = document.querySelector('[name="editName"]');
        if (i) {
            i.focus();
        }
    };
    GameDetailsComponent.prototype.showEditName = function () {
        if (!this.game.Names.length) {
            this.showAddName();
        }
        else {
            this.editName = this.game.Names[0].Name;
            this.editNameShown = true;
            this._focusInput();
        }
    };
    GameDetailsComponent.prototype.showAddName = function () {
        this.editName = "";
        this.addNameShown = true;
        this._focusInput();
    };
    GameDetailsComponent.prototype.saveEditName = function () {
        var _this = this;
        if (this.editName) {
            if (this.editNameShown) {
                // update the existing name if it is different
                if (this.editName != this.game.Names[0].Name) {
                    this.game.Names[0].Name = this.editName;
                    this.gameDatabaseService.saveName(this.game.Names[0]);
                }
            }
            else if (this.addNameShown) {
                // create a new name
                this.gameDatabaseService.createName(this.game.GameID, this.editName)
                    .then(function (name) {
                    _this.game.Names.unshift(name);
                });
            }
        }
        this.editName = "";
        this._closeAllEdits();
    };
    GameDetailsComponent.prototype._closeAllEdits = function () {
        this.editNameShown = false;
        this.addNameShown = false;
        this.editPlayerCountShown = false;
        this.editDurationShown = false;
        this.addTagShown = false;
        this.editDescriptionShown = false;
    };
    GameDetailsComponent.prototype._saveGame = function () {
        this._closeAllEdits();
        this.setGame(this.game);
        this.gameDatabaseService.saveGame(this.game)
            .then(function (game) {
            //this.setGame(game); not really necessary, because we already set it
        })
            .catch(function () {
            // TODO: revert?
        });
    };
    GameDetailsComponent.prototype.showEditPlayerCount = function () {
        var _this = this;
        this._closeAllEdits();
        if (this.can('game_edit')) {
            if (!this.allPlayerCounts.length) {
                this.gameDatabaseService.getPlayerCounts().then(function (playerCounts) {
                    _this.allPlayerCounts = playerCounts;
                });
            }
            this.editPlayerCountShown = !this.editPlayerCountShown;
        }
    };
    GameDetailsComponent.prototype.savePlayerCount = function () {
        if (this.can('game_edit')) {
            if (this.game.PlayerCountID > -1) {
                this._saveGame();
            }
            else {
                // show the create player count dialog
                this.showCreateMetadataDialog("Player Count");
            }
        }
    };
    GameDetailsComponent.prototype.showEditDuration = function () {
        var _this = this;
        this._closeAllEdits();
        if (this.can('game_edit')) {
            if (!this.allDurations.length) {
                this.gameDatabaseService.getDurations().then(function (durations) {
                    _this.allDurations = durations;
                });
            }
            this.editDurationShown = !this.editDurationShown;
        }
    };
    GameDetailsComponent.prototype.saveDuration = function () {
        if (this.can('game_edit')) {
            if (this.game.DurationID > -1) {
                this._saveGame();
            }
            else {
                this.showCreateMetadataDialog("Duration");
            }
        }
    };
    GameDetailsComponent.prototype.showCreateMetadataDialog = function (type) {
        this.createMetadataType = type;
    };
    GameDetailsComponent.prototype.onCreateMetadataDone = function (metadata) {
        this.createMetadataType = "";
        console.log(metadata, metadata instanceof player_count_1.PlayerCount);
        if (metadata.PlayerCountID) {
            this.playerCount = metadata;
            this.allPlayerCounts.push(metadata);
            this.game.PlayerCountID = metadata.PlayerCountID;
        }
        else if (metadata.DurationID) {
            this.duration = metadata;
            this.allDurations.push(metadata);
            this.game.DurationID = metadata.DurationID;
        }
        this._closeAllEdits();
        this.gameDatabaseService.saveGame(this.game);
    };
    GameDetailsComponent.prototype.showAddTag = function () {
        this.addTagShown = true;
    };
    GameDetailsComponent.prototype.newTagKeyDown = function (event) {
        var _this = this;
        if (event.keyCode == 13) {
            this.addTagByName();
        }
        else if (event.keyCode == 27) {
            this._closeAllEdits();
        }
        else {
            clearTimeout(this._tagTypeDebounce);
            this._tagTypeDebounce = setTimeout(function () {
                _this.tagHints = [];
                if (_this.newTagText) {
                    _this.gameDatabaseService.searchForTags(_this.newTagText)
                        .then(function (tags) {
                        var max = tags.length > 8 ? 8 : tags.length;
                        for (var cnt = 0; cnt < max; cnt++) {
                            var tag = tags[cnt];
                            // only hint tags that aren't already added to this game,
                            // and only show the first 8 hints, why not
                            if (_this.tags.indexOf(tag) == -1) {
                                _this.tagHints.push(tag);
                            }
                        }
                    });
                }
            }, 100);
        }
    };
    GameDetailsComponent.prototype.removeTag = function (tag) {
        if (!this.can('game_edit')) {
            return;
        }
        var index = this.tags.indexOf(tag);
        if (index > -1) {
            this.tags.splice(index, 1);
        }
        var taggame;
        this.game.TagGames.forEach(function (tg) {
            if (tg.TagID == tag.TagID) {
                taggame = tg;
            }
        });
        this.game.TagGames.splice(this.game.TagGames.indexOf(taggame), 1);
        this.gameDatabaseService.deleteTagGame(taggame);
    };
    GameDetailsComponent.prototype.addTagByName = function () {
        var _this = this;
        var tag;
        // see if any of the hints match the input exactly
        this.tagHints.forEach(function (hint) {
            if (hint.Name.toLocaleLowerCase() == _this.newTagText.toLocaleLowerCase()) {
                tag = hint;
            }
        });
        if (tag) {
            this.addTag(tag);
        }
        else {
            // if there were no matches, we'll create a new tag
            this.gameDatabaseService.createTag(this.newTagText, this.game)
                .then(function (tag) {
                _this.tags.push(tag);
            });
        }
        this.newTagText = "";
        this.tagHints = [];
    };
    GameDetailsComponent.prototype.addTag = function (tag) {
        this.tags.push(tag);
        this.gameDatabaseService.saveTagToGame(this.game, tag)
            .then(function (taggame) { });
        this.newTagText = "";
        this.tagHints = [];
    };
    GameDetailsComponent.prototype.showEditDescription = function () {
        this.newDescriptionText = this.game.Description;
        this.editDescriptionShown = true;
    };
    GameDetailsComponent.prototype.saveDescription = function () {
        this.game.Description = this.newDescriptionText;
        this.gameDatabaseService.saveGame(this.game);
        this._closeAllEdits();
    };
    GameDetailsComponent.prototype.setGame = function (game) {
        var _this = this;
        this.game = game;
        this.gameDatabaseService.getPlayerCountById(this.game.PlayerCountID)
            .then(function (playercount) { return _this.playerCount = playercount; });
        this.gameDatabaseService.getDurationById(this.game.DurationID)
            .then(function (duration) { return _this.duration = duration; });
        this.tagMap = {};
        this.tags = [];
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
    GameDetailsComponent.prototype.toggleNames = function () {
        this.namesOpen = !this.namesOpen;
    };
    GameDetailsComponent.prototype.onToolClicked = function (tool) {
        var _this = this;
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
                this._app.dialog("Delete Game?", "Are you sure you want to delete this game. There is no turning back from this.", "Delete", function () {
                    _this.gameDatabaseService.deleteGame(_this.game)
                        .then(function () {
                        _this.closePage();
                    });
                });
                break;
        }
    };
    return GameDetailsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", game_1.Game)
], GameDetailsComponent.prototype, "game", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], GameDetailsComponent.prototype, "onClose", void 0);
GameDetailsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'game-details',
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
    __metadata("design:paramtypes", [app_component_1.AppComponent,
        game_database_service_1.GameDatabaseService,
        router_1.Router,
        router_1.ActivatedRoute,
        common_1.Location,
        user_service_1.UserService])
], GameDetailsComponent);
exports.GameDetailsComponent = GameDetailsComponent;

//# sourceMappingURL=game-details.component.js.map
