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
var user_service_1 = require("../../service/user.service");
var game_1 = require("../../model/game");
var note_1 = require("../../model/note");
var game_note_service_1 = require("../service/game-note.service");
var anim_util_1 = require("../../util/anim.util");
var util_1 = require("../../util/util");
var GameNoteView = (function () {
    function GameNoteView(userService, noteService) {
        this.userService = userService;
        this.noteService = noteService;
        this.create = new core_1.EventEmitter();
        this.remove = new core_1.EventEmitter();
        this.showUserName = true;
    }
    GameNoteView.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.note) {
            this.setupNoteEdit();
        }
        else {
            var user_1 = this.userService.getLoggedInUser();
            this.note.teams.forEach(function (team) {
                if (util_1.Util.indexOfId(user_1.adminOfTeams, team) > -1) {
                    _this.editable = true;
                }
            });
            if (this.note.addedUser._id == user_1._id) {
                this.editable = true;
                this.showUserName = false;
            }
            this.showText = true;
        }
    };
    GameNoteView.prototype.setupNoteEdit = function () {
        var _this = this;
        if (this.note && !this.editable) {
            return;
        }
        this.showEdit = false;
        this.showText = false;
        this.noteContextOptions = [
            {
                name: 'This game: ' + this.game.names[0].name,
                _id: 'game',
                icon: 'rocket',
                description: 'This note will only apply to this game.'
            },
            {
                name: this.game.playerCount.name + ' Players',
                _id: 'metadata_' + this.game.playerCount._id,
                icon: 'users',
                description: 'This note will apply to any game involving \'' + this.game.playerCount.name + '\' player count.'
            },
            {
                name: this.game.duration.name,
                _id: 'metadata_' + this.game.duration._id,
                icon: 'users',
                description: 'This note will apply to any game involving \'' + this.game.duration.name + '\' duration.'
            }
        ];
        this.game.tags.forEach(function (taggame) {
            var tag = taggame.tag;
            _this.noteContextOptions.push({
                name: tag.name,
                _id: 'tag_' + tag._id,
                icon: 'hashtag',
                description: 'This note will apply to any game tagged \'' + tag.name + '\'.'
            });
        });
        this.noteContext = '';
        if (this.note) {
            this.noteInput = this.note.description;
            if (this.note.teams && this.note.teams.length) {
                this.noteTeam = true;
            }
            else {
                this.noteTeam = false;
            }
            if (this.note.game) {
                this.noteContext = 'game';
            }
            else if (this.note.metadata) {
                this.noteContext = 'metadata_' + this.note.metadata._id;
            }
            else if (this.note.tag) {
                this.noteContext = 'tag_' + this.note.tag._id;
            }
            var height_1 = this.descriptionElement.nativeElement.offsetHeight;
            setTimeout(function () {
                _this.inputElement.nativeElement.style.height = (height_1 + 32) + 'px';
            }, 10);
        }
        else {
            setTimeout(function () {
                _this.inputElement.nativeElement.style.height = '';
            }, 10);
        }
        this.showEdit = true;
    };
    GameNoteView.prototype.cancelEdit = function () {
        this.showEdit = false;
        this.showText = false;
        this.showText = true;
    };
    GameNoteView.prototype.setNoteContext = function (context) {
        this.noteContext = context._id;
    };
    GameNoteView.prototype.saveNote = function () {
        var _this = this;
        if (!this.noteContext) {
            this.noteContext = this.noteContextOptions[0]._id;
        }
        var note = this.note || new note_1.Note();
        note.description = this.noteInput;
        if (this.noteContext == 'game') {
            note.game = this.game._id;
        }
        else if (this.noteContext.indexOf('tag_') > -1) {
            note.tag = this.noteContext.replace('tag_', '');
        }
        else if (this.noteContext.indexOf('metadata_') > -1) {
            note.metadata = this.noteContext.replace('metadata_', '');
        }
        note.public = this.notePublic;
        if (this.noteTeam) {
            note.teams = [].concat(this.userService.getTeams(), this.userService.getAdminTeams());
        }
        else {
            note.teams = [];
        }
        this.isPosting = true;
        if (this.note) {
            this.noteService.updateNote(note).then(function (note) {
                _this.isPosting = false;
                _this.cancelEdit();
            });
        }
        else {
            this.noteService.createNote(note).then(function (note) {
                _this.isPosting = false;
                _this.noteInput = '';
                _this.create.emit(note);
            });
        }
    };
    return GameNoteView;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", note_1.Note)
], GameNoteView.prototype, "note", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", game_1.Game)
], GameNoteView.prototype, "game", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], GameNoteView.prototype, "create", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], GameNoteView.prototype, "remove", void 0);
__decorate([
    core_1.ViewChild('description'),
    __metadata("design:type", core_1.ElementRef)
], GameNoteView.prototype, "descriptionElement", void 0);
__decorate([
    core_1.ViewChild('noteinput'),
    __metadata("design:type", core_1.ElementRef)
], GameNoteView.prototype, "inputElement", void 0);
GameNoteView = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: '.improvplus-game-note',
        templateUrl: '../template/view/game-note.view.html',
        animations: [anim_util_1.ShrinkAnim.height]
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        game_note_service_1.GameNoteService])
], GameNoteView);
exports.GameNoteView = GameNoteView;

//# sourceMappingURL=game-note.view.js.map
