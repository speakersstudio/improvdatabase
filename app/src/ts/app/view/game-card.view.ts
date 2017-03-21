import { 
    Component,
    OnInit,
    OnDestroy,
    Input
} from '@angular/core';

import 'rxjs/Subscription';
import { Subscription } from 'rxjs/Subscription';

import { GameDatabaseService } from '../../service/game-database.service';

import { Game } from '../../model/game';
import { Name } from '../../model/name';
import { GameMetadata } from '../../model/game-metadata';
import { Tag } from '../../model/tag';

@Component({
    moduleId: module.id,
    selector: '.ng-game-card',
    templateUrl: '../template/view/game-card.view.html'
})
export class GameCardView implements OnInit, OnDestroy {
    @Input() game: Game;
    playerCount: GameMetadata;
    duration: GameMetadata;

    iconClass:string = "rocket";
    iconDescription: string;
    descriptionText: string;

    //@Input() showTags: boolean = false;
    tags: Tag[] = [];

    constructor(
        private gameDatabaseService: GameDatabaseService
    ) { }

    ngOnInit(): void {
        // this will create a description string without any HTML tags in it
        let div = document.createElement("div");
        div.innerHTML = this.game.description;
        this.descriptionText = div.textContent || div.innerText || this.game.description;

        // this.gameDatabaseService.getPlayerCountById(this.game.PlayerCountID)
        //     .then((playercount) => this.playerCount = playercount);

        // this.gameDatabaseService.getDurationById(this.game.DurationID)
        //     .then((duration) => this.duration = duration);

        this.game.tags.forEach(taggame => {
            switch(taggame.tag.name.toLowerCase()) {
                case 'show':
                    this.iconClass = 'ticket';
                    this.iconDescription = taggame.tag.description;
                    break;
                case 'exercise':
                    this.iconClass = 'lightbulb-o';
                    this.iconDescription = taggame.tag.description;
                    break;
                case 'warmup':
                    this.iconClass = 'fire';
                    this.iconDescription = taggame.tag.description;
                    break;
            }
        })
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
