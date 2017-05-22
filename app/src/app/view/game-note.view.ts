import { 
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef
} from '@angular/core';

import { TimeUtil } from '../../util/time.util';

import { UserService } from '../../service/user.service';

import { Game } from '../../model/game';
import { Note } from '../../model/note';
import { Tag } from '../../model/tag';
import { GameMetadata } from '../../model/game-metadata';

import { DropdownOption } from '../view/editable-metadata.view';

import { GameNoteService } from '../service/game-note.service';

import { ShrinkAnim } from '../../util/anim.util';

import { Util } from '../../util/util';

@Component({
    moduleId: module.id,
    selector: '.improvplus-game-note',
    templateUrl: '../template/view/game-note.view.html',
    animations: [ShrinkAnim.height]
})
export class GameNoteView implements OnInit {

    @Input() note: Note;
    @Input() game: Game;

    @Output() create: EventEmitter<Note> = new EventEmitter();
    @Output() remove: EventEmitter<Note> = new EventEmitter();

    @ViewChild('description') descriptionElement: ElementRef;
    @ViewChild('noteinput') inputElement: ElementRef;

    showEdit: boolean;
    editable: boolean;
    showText: boolean;

    showUserName: boolean = true;

    isPosting: boolean;

    noteInput: string;
    noteContext: string;
    noteContextOptions: DropdownOption[];
    notePublic: boolean;
    noteTeam: boolean;

    constructor(
        private userService: UserService,
        private noteService: GameNoteService
    ) { }
    
    ngOnInit() {
        if (!this.note) {
            this.setupNoteEdit();
        } else {
            let user = this.userService.getLoggedInUser();

            this.note.teams.forEach(team => {
                if (Util.indexOfId(user.adminOfTeams, team) > -1) {
                    this.editable = true;
                }
            });

            if (this.note.addedUser._id == user._id) {
                this.editable = true;
                this.showUserName = false;
            }
            this.showText = true;
        }
    }

    setupNoteEdit(): void {
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

        this.game.tags.forEach(taggame => {
            let tag = <Tag> taggame.tag;
            this.noteContextOptions.push({
                name: tag.name,
                _id: 'tag_' + tag._id,
                icon: 'hashtag',
                description: 'This note will apply to any game tagged \'' + tag.name + '\'.'
            })
        });

        this.noteContext = '';

        if (this.note) {
            this.noteInput = this.note.description;
            if (this.note.teams && this.note.teams.length) {
                this.noteTeam = true;
            } else {
                this.noteTeam = false;
            }
            if (this.note.game) {
                this.noteContext = 'game';
            } else if (this.note.metadata) {
                this.noteContext = 'metadata_' + (<GameMetadata> this.note.metadata)._id;
            } else if (this.note.tag) {
                this.noteContext = 'tag_' + (<Tag> this.note.tag)._id;
            }

            let height = (<HTMLElement> this.descriptionElement.nativeElement).offsetHeight;

            setTimeout(() => {
                (<HTMLElement> this.inputElement.nativeElement).style.height = (height + 32) + 'px';
            }, 10);
        } else {
            setTimeout(() => {
                (<HTMLElement> this.inputElement.nativeElement).style.height = '';
            }, 10);
        }

        this.showEdit = true;

    }

    cancelEdit(): void {
        this.showEdit = false;
        this.showText = false;

        this.showText = true;
    }

    setNoteContext(context: DropdownOption): void {
        this.noteContext = context._id;
    }

    saveNote(): void {
        if (!this.noteContext) {
            this.noteContext = this.noteContextOptions[0]._id;
        }

        let note = this.note || new Note();

        note.description = this.noteInput;
        
        if (this.noteContext == 'game') {
            note.game = this.game._id;
        } else if (this.noteContext.indexOf('tag_') > -1) {
            note.tag = this.noteContext.replace('tag_', '');
        } else if (this.noteContext.indexOf('metadata_') > -1) {
            note.metadata = this.noteContext.replace('metadata_', '');
        }

        note.public = this.notePublic;

        if (this.noteTeam) {
            note.teams = [].concat(this.userService.getTeams(), this.userService.getAdminTeams());
        } else {
            note.teams = [];
        }

        this.isPosting = true;

        if (this.note) {

            this.noteService.updateNote(note).then(note => {
                this.isPosting = false;
                this.cancelEdit();
            });

        } else {

            this.noteService.createNote(note).then(note => {
                this.isPosting = false;
                this.noteInput = '';
                this.create.emit(note);
            });

        }

    }

}