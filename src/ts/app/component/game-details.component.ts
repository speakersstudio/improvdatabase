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

import { GameDatabaseService } from '../service/game-database.service';

import { Game } from '../model/game';
import { Name } from '../model/name';
import { PlayerCount } from '../model/player-count';
import { Duration } from '../model/duration';
import { Tag } from '../model/tag';
import { Note } from '../model/note';

import { Tool } from './toolbar.component';

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

    private tools: Tool[] = [
        {
            icon: "fa-random",
            name: "randomGame",
            text: "Select Random Game",
            active: false
        }
    ];

    constructor(
        private gameDatabaseService: GameDatabaseService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location
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
    }

    ngOnDestroy(): void {

    }

    setGame(game: Game): void {
        this.game = game;

        this.gameDatabaseService.getPlayerCountById(this.game.PlayerCountID)
            .then((playercount) => this.playerCount = playercount);

        this.gameDatabaseService.getDurationById(this.game.DurationID)
            .then((duration) => this.duration = duration);

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
        }
    }

}