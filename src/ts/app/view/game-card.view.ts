import { 
    Component,
    OnInit,
    OnDestroy,
    Input
} from '@angular/core';

import 'rxjs/Subscription';
import { Subscription } from 'rxjs/Subscription';

import { GameDatabaseService } from '../service/game-database.service';

import { Game } from '../model/game';
import { Name } from '../model/name';
import { PlayerCount } from '../model/player-count';
import { Duration } from '../model/duration';
import { Tag } from '../model/tag';

@Component({
    moduleId: module.id,
    selector: '.ng-game-card',
    templateUrl: '../template/view/game-card.view.html'
})
export class GameCardView implements OnInit, OnDestroy {
    @Input() game: Game;
    playerCount: PlayerCount;
    duration: Duration;

    @Input() showTags: boolean = false;
    tags: Tag[] = [];

    constructor(
        private gameDatabaseService: GameDatabaseService
    ) { }

    ngOnInit(): void {
        this.gameDatabaseService.getPlayerCountById(this.game.PlayerCountID)
            .then((playercount) => this.playerCount = playercount);

        this.gameDatabaseService.getDurationById(this.game.DurationID)
            .then((duration) => this.duration = duration);

        this.loadTags();
    }

    loadTags(): void {
        this.game.TagGames.forEach((tagGame) => {
            this.gameDatabaseService.getTagById(tagGame.TagID)
                .then((tag) => this.tags.push(tag));
        });
    }

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

    ngOnDestroy(): void {
        
    }
}
