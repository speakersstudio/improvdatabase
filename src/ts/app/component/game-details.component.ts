import { 
    Component,
    OnInit,
    OnDestroy,
    Input,
    Output,
    EventEmitter,
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Location }   from '@angular/common';

import { AppComponent } from "./app.component";

import { GameDatabaseService } from '../service/game-database.service';

import { Game } from '../model/game';
import { Name } from '../model/name';
import { PlayerCount } from '../model/player-count';
import { Duration } from '../model/duration';
import { Tag } from '../model/tag';
import { TagGame } from '../model/tag-game';
import { Note } from '../model/note';

import { Tool } from '../view/toolbar.view';

import { UserService } from "../service/user.service";

@Component({
    moduleId: module.id,
    selector: '.page.ng-game-details',
    templateUrl: '../template/game-details.component.html',
    animations: [
        trigger('expand', [
            state('in', style({height: '*'})),
            transition('void => *', [
                style({height: 0}),
                animate(100)
            ]),
            transition('* => void', [
                style({height: '*'}),
                animate(100, style({height: 0}))
            ])
        ])
    ]
})
export class GameDetailsComponent implements OnInit, OnDestroy {

    @Input() game: Game;
    @Output() onClose: EventEmitter<Tool> = new EventEmitter();

    dialog: boolean = false;

    playerCount: PlayerCount;
    duration: Duration;
    tags: Tag[] = [];
    tagMap: Object = {};
    notes: Note[] = [];

    scrollpos: number = 0;

    namesOpen: boolean = false;

    showToolbarScrollPosition: number = window.innerWidth * 0.15;

    editNameShown: boolean;
    addNameShown: boolean;

    editName: string;

    allPlayerCounts: PlayerCount[] = [];
    editPlayerCountShown: boolean;

    allDurations: Duration[] = [];
    editDurationShown: boolean;

    addTagShown: boolean;
    newTagText: string;
    tagHints: Tag[];

    editDescriptionShown: boolean;
    newDescriptionText: string;

    createMetadataType: string;

    private tools: Tool[] = [
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

    constructor(
        private _app: AppComponent,
        private gameDatabaseService: GameDatabaseService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        if (!this.game) {
            this.route.params.forEach((params: Params) => {
                let id = +params['id'];
                this.gameDatabaseService.getGame(id)
                    .then(game => this.setGame(game));
            });
        } else {
            this.dialog = true;
            this.setGame(this.game);
        }

        //console.log(this.userService.loggedInUser.Permissions);
    }

    ngOnDestroy(): void {

    }

    can(permission: string): boolean {
        return this.userService.can(permission);
    }

    private _focusInput(): void {
        // TODO: figure out how to focus the new input element - probably stupid complicated with Angular
        // http://stackoverflow.com/questions/34522306/angular-2-focus-on-newly-added-input-element
        let i = <HTMLInputElement>document.querySelector('[name="editName"]');
        if (i) {
            i.focus();
        }
    }

    showEditName(): void {
        if (!this.game.Names.length) {
            this.showAddName();
        } else {
            this.editName = this.game.Names[0].Name;
            this.editNameShown = true;
            this._focusInput();
        }
    }

    showAddName(): void {
        this.editName = "";
        this.addNameShown = true;
        this._focusInput();
    }

    saveEditName(): void {
        if (this.editName) {
            if (this.editNameShown) {
                // update the existing name if it is different
                if (this.editName != this.game.Names[0].Name) {
                    this.game.Names[0].Name = this.editName;
                    this.gameDatabaseService.saveName(this.game.Names[0]);
                }
            } else if (this.addNameShown) {
                // create a new name
                this.gameDatabaseService.createName(this.game.GameID, this.editName)
                    .then(name => {
                        this.game.Names.unshift(name);
                    });
            }
        }

        this.editName = "";
        this._closeAllEdits();
    }

    private _closeAllEdits(): void {
        this.editNameShown = false;
        this.addNameShown = false;
        this.editPlayerCountShown = false;
        this.editDurationShown = false;
        this.addTagShown = false;
        this.editDescriptionShown = false;
    }

    private _saveGame(): void {
        this._closeAllEdits();
        this.setGame(this.game);

        this.gameDatabaseService.saveGame(this.game)
            .then((game) => {
                //this.setGame(game); not really necessary, because we already set it
            })
            .catch(() => {
                // TODO: revert?
            })
    }

    showEditPlayerCount(): void {
        this._closeAllEdits();
        if (this.can('game_edit')) {
            if (!this.allPlayerCounts.length) {
                this.gameDatabaseService.getPlayerCounts().then((playerCounts) => {
                    this.allPlayerCounts = playerCounts;
                });
            }
            this.editPlayerCountShown = !this.editPlayerCountShown;
        }
    }
    savePlayerCount(): void {
        if (this.can('game_edit')) {
            if (this.game.PlayerCountID > -1) {
                this._saveGame();
            } else {
                // show the create player count dialog
                this.showCreateMetadataDialog("Player Count");
            }
        }
    }

    showEditDuration(): void {
        this._closeAllEdits();
        if (this.can('game_edit')) {
            if (!this.allDurations.length) {
                this.gameDatabaseService.getDurations().then((durations) => {
                    this.allDurations = durations
                });
            }
            this.editDurationShown = !this.editDurationShown;
        }
    }
    saveDuration(): void {
        if (this.can('game_edit')) {
            if (this.game.DurationID > -1) {
                this._saveGame();
            } else {
                this.showCreateMetadataDialog("Duration");
            }
        }
    }

    showCreateMetadataDialog(type: string): void {
        this.createMetadataType = type;
    }
    onCreateMetadataDone(metadata: any): void {
        this.createMetadataType = "";

        console.log(metadata, metadata instanceof PlayerCount);

        if (metadata.PlayerCountID) {
            this.playerCount = metadata as PlayerCount;
            this.allPlayerCounts.push(metadata);
            this.game.PlayerCountID = metadata.PlayerCountID;
        } else if (metadata.DurationID) {
            this.duration = metadata as Duration;
            this.allDurations.push(metadata);
            this.game.DurationID = metadata.DurationID;
        }

        this._closeAllEdits();
        this.gameDatabaseService.saveGame(this.game);
    }

    showAddTag(): void {
        this.addTagShown = true;
    }

    _tagTypeDebounce;
    newTagKeyDown(event): void {
        if (event.keyCode == 13) {
            this.addTagByName();
        } else if (event.keyCode == 27) {
            this._closeAllEdits();
        } else {

            clearTimeout(this._tagTypeDebounce);
            this._tagTypeDebounce = setTimeout(() => {
                this.tagHints = [];
                if (this.newTagText) {
                    this.gameDatabaseService.searchForTags(this.newTagText)
                        .then(tags => {
                            let max = tags.length > 8 ? 8 : tags.length;
                            for(let cnt = 0; cnt < max; cnt++) {
                                let tag = tags[cnt];
                                // only hint tags that aren't already added to this game,
                                // and only show the first 8 hints, why not
                                if (this.tags.indexOf(tag) == -1) {
                                    this.tagHints.push(tag);
                                }
                            }
                        });
                }
            }, 100);

        }
    }

    removeTag(tag: Tag): void {
        if (!this.can('game_edit')) {
            return;
        }
        let index = this.tags.indexOf(tag);
        if (index > -1) {
            this.tags.splice(index, 1);
        }
        let taggame: TagGame;
        this.game.TagGames.forEach(tg => {
            if (tg.TagID == tag.TagID) {
                taggame = tg;
            }
        });
        this.game.TagGames.splice(this.game.TagGames.indexOf(taggame), 1);
        this.gameDatabaseService.deleteTagGame(taggame);
    }

    addTagByName(): void {
        let tag: Tag;
        // see if any of the hints match the input exactly
        this.tagHints.forEach(hint => {
            if (hint.Name.toLocaleLowerCase() == this.newTagText.toLocaleLowerCase()) {
                tag = hint;
            }
        });
        if (tag) {
            this.addTag(tag);
        } else {
            // if there were no matches, we'll create a new tag
            this.gameDatabaseService.createTag(this.newTagText, this.game)
                .then(tag => {
                    this.tags.push(tag);
                });
        }

        this.newTagText = "";
        this.tagHints = [];
    }

    addTag(tag: Tag): void {
        this.tags.push(tag);
        this.gameDatabaseService.saveTagToGame(this.game, tag)
            .then(taggame => {});
        
        this.newTagText = "";
        this.tagHints = [];
    }

    showEditDescription(): void {
        this.newDescriptionText = this.game.Description;
        this.editDescriptionShown = true;
    }

    saveDescription(): void {
        this.game.Description = this.newDescriptionText;
        this.gameDatabaseService.saveGame(this.game);
        this._closeAllEdits();
    }

    setGame(game: Game): void {
        this.game = game;

        this.gameDatabaseService.getPlayerCountById(this.game.PlayerCountID)
            .then((playercount) => this.playerCount = playercount);

        this.gameDatabaseService.getDurationById(this.game.DurationID)
            .then((duration) => this.duration = duration);

        this.tagMap = {};
        this.tags = [];
        this.game.TagGames.forEach((tagGame) => {
            this.gameDatabaseService.getTagById(tagGame.TagID)
                .then((tag) => {
                    this.tagMap[tag.TagID] = tag.Name;
                    this.tags.push(tag)
                });
        });

        this.gameDatabaseService.getNotesForGame(this.game)
            .then((notes) => this.notes = notes);
    }

    closePage(): void {
        if (this.dialog) {
            this.onClose.emit();
        } else {
            this.router.navigate(['/games']);
        }
    }

    onScroll($event): void {
        this.scrollpos = $event.target.scrollTop;
    }

    toggleNames(): void {
        this.namesOpen = !this.namesOpen;
    }

    onToolClicked(tool: Tool): void {
        switch (tool.name) {
            case "randomGame":
                if (this.dialog) {
                    this.onClose.emit(tool);
                } else {
                    this.router.navigate(['/games', {random: 'random'}]);
                }
                break;
            case "deleteGame":
                this._app.dialog("Delete Game?",
                    "Are you sure you want to delete this game. There is no turning back from this.",
                    "Delete",
                    () => {
                        this.gameDatabaseService.deleteGame(this.game)
                            .then(() => {
                                this.closePage();
                            })
                    });
                break;
        }
    }



}