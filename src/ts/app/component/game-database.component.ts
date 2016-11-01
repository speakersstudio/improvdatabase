import {
    Component,
    OnInit,
    OnDestroy,
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/core';
import { PathLocationStrategy } from '@angular/common';

import { Router } from '@angular/router';
import 'rxjs/Subscription';
import { Subscription } from 'rxjs/Subscription';

import {
    AppComponent,
    Tool,
    ToolService } from './app.component';
import { GameDatabaseService } from '../service/game-database.service';

import { Game } from '../model/game';
import { Name } from '../model/name';

@Component({
    moduleId: module.id,
    selector: "game-database",
    templateUrl: '../template/game-database.component.html',
    animations: [
        trigger('flyInOut', [
            state('in',   style({
                opacity: 1
            })),
            transition('void => *', [
                style({opacity: 0}),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({opacity: 0}))
            ])
        ])
    ]
})
export class GameDatabaseComponent implements OnInit, OnDestroy {
    games: Game[] = [];
    names: Name[] = [];
    selectedGame: Game;

    private _titleBase: string = "Games ";

    constructor(
        private _app: AppComponent,
        private router: Router,
        private toolService: ToolService,
        private gameDatabaseService: GameDatabaseService,
        private pathLocationStrategy: PathLocationStrategy
    ) { }

    private _tools: Tool[] = [
        {
            icon: "fa-random",
            name: "randomGame",
            text: "Select Random Game",
            active: false
        },
        {
            icon: "fa-hashtag",
            name: "showTags",
            text: "Show Tags",
            active: false
        },
        {
            icon: "fa-filter",
            name: "filter",
            text: "Filter Games",
            active: false
        },
        {
            icon: 'fa-sort-amount-asc',
            name: 'sortGames',
            text: 'Sort Games',
            active: false
        }
    ]
    toolSubscription: Subscription;

    ngOnInit(): void {
        this._app.setTitle(this._titleBase);
        this._app.setTools(this._tools);

        this.toolSubscription = this.toolService.tool$.subscribe(this.onToolClicked);

        this._app.showLoader();
        this.getGames();

        this.pathLocationStrategy.onPopState(() => {
            this.selectedGame = null;
        });

        // TODO: make the toolbar elevate as the user scrolls
    }

    getGames(): void {
        this.gameDatabaseService.getGames('name').then(games => {
            setTimeout(() => {
                this._app.hideLoader();
                this.games = games
            }, 1);
        });
    }

    trackByGames(index: number, game: Game) {
        return game.GameID;
    }

    onSelect(game: Game): void {
        if (!game || this.selectedGame == game) {
            this.selectedGame = null;
        } else {
            this.selectedGame = game;
        }
    
        this.pathLocationStrategy.pushState({}, "", "/game/" + this.selectedGame.GameID, "");
    }

    closeDetails(): void {
        this.selectedGame = null;
        this.pathLocationStrategy.back();
    }

    onToolClicked(tool: Tool): void {
        switch (tool.name) {
            case "showTags":
                tool.active = !tool.active;
                break;
            case "filter":
                console.log('FILTER');
                break;
            case "randomGame":
                console.log('random game');
                break;
            case "searchGames":
                console.log('search game');
                break;
        }
    }

    ngOnDestroy(): void {
        this.toolSubscription.unsubscribe();
    }
}
