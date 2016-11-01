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

@Component({
    moduleId: module.id,
    selector: '.page.ng-game-details',
    templateUrl: '../template/game-details.component.html',
    animations: [
        trigger('flyInOut', [
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
    @Output() onClose = new EventEmitter();

    dialog: boolean = false;

    playerCount: PlayerCount;
    duration: Duration;
    tags: Tag[] = [];

    scrollpos: number = 0;

    namesOpen: boolean = false;

    constructor(
        private gameDatabaseService: GameDatabaseService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location
    ) {

    }

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
                .then((tag) => this.tags.push(tag));
        });
    }

    closePage(): void {
        if (!this.dialog) {
            this.router.navigate(['/games']);
        } else {
            this.onClose.emit(true);
        }
    }

    onScroll($event): void {
        this.scrollpos = $event.target.scrollTop;
    }

    toggleNames(): void {
        this.namesOpen = !this.namesOpen;
    }

}