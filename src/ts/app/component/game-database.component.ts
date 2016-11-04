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

import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/Subscription';
import { Subscription } from 'rxjs/Subscription';

import { AppComponent } from './app.component';
import { Tool, SearchResult, ToolbarComponent } from './toolbar.component';
import { GameDatabaseService } from '../service/game-database.service';

import { Game } from '../model/game';
import { Name } from '../model/name';

import { GameFilter } from '../pipe/game-filter.pipe';

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

    scrollpos: number = 0;

    private _titleBase: string = "Games ";
    title: string;

    searchResults: SearchResult[] = [];
    filter: GameFilter;

    constructor(
        private _app: AppComponent,
        private route: ActivatedRoute,
        private router: Router,
        private gameDatabaseService: GameDatabaseService,
        private pathLocationStrategy: PathLocationStrategy
    ) { }

    private tools: Tool[] = [
        {
            icon: "fa-hashtag",
            name: "showTags",
            text: "Show Tags",
            active: false
        },
        {
            icon: "fa-random",
            name: "randomGame",
            text: "Select Random Game",
            active: false
        }
    ];

    ngOnInit(): void {
        this.setTitle();

        //this.toolSubscription = this.toolService.tool$.subscribe(this.onToolClicked);

        this._app.showLoader();
        this.getGames();

        this.pathLocationStrategy.onPopState(() => {
            this.selectedGame = null;
        });
    }

    setTitle(): void {
        this.title = this._titleBase;

        if (this.filter && this.filter.property == 'search') {
            this.title = "Search Results";
        } else if (this.filter) {
            this.title += '<span>Filtered</span>';
        }
    }

    getGames(): void {
        this.gameDatabaseService.getGames('name').then(games => {
            games = this._filterGames(games);
            this._loadGames(games);
        });
    }

    getGamesSearch(term: string): void {
        this.gameDatabaseService.searchForGames(term).then(games => this._loadGames(games))
    }

    private _loadGames(games: Game[]): void {
        setTimeout(() => {
            this._app.hideLoader();
            this.games = games;
            this.onGamesLoaded();
        }, 1);
    }

    private _filterGames(games: Game[]): Game[] {
        if (this.filter) {
            return games.filter((game) => {
                if (this.filter.property == 'TagID') {
                    for (var tagIDIndex = 0; tagIDIndex < game.TagGames.length; tagIDIndex++) {
                        if (game.TagGames[tagIDIndex].TagID == this.filter.value) {
                            return true;
                        }
                    }
                    return false;
                } else {
                    return game[this.filter.property] == this.filter.value;
                }
            });
        } else {
            return games;
        }
    }

    onGamesLoaded(): void {
        // navigate to games;random=random to load a random game
        this.route.params.forEach((params: Params) => {
            if (params['random']) {
                this.pathLocationStrategy.replaceState({}, "", "/games", "");
                this.selectRandomGame();
            }
        })
    }

    trackByGames(index: number, game: Game) {
        return game.GameID;
    }

    onScroll($event): void {
        this.scrollpos = $event.target.scrollTop;
    }

    onSelect(game: Game): void {
        if (!game) {
            this.selectedGame = null;
        } else {
            this.selectedGame = game;
        }
    
        let newPath = "/game/" + this.selectedGame.GameID;
        if (this.pathLocationStrategy.path().indexOf("/game/") > -1) {
            this.pathLocationStrategy.replaceState({}, "", newPath, "");
        } else {
            this.pathLocationStrategy.pushState({}, "", newPath, "");
        }
    }

    selectRandomGame(): void {
        let i = Math.floor((Math.random() * this.games.length));
        this.onSelect(this.games[i]);
    }

    closeDetails(tool: Tool): void {
        if (tool && tool.name) {
            this.onToolClicked(tool);
        } else {
            this.pathLocationStrategy.back();
        }
    }

    onToolClicked(tool: Tool): void {
        switch (tool.name) {
            case "showTags":
                tool.active = !tool.active;
                break;
            case "randomGame":
                this.selectRandomGame();
                break;
        }
    }

    ngOnDestroy(): void {
    }

    onSearchResultClick(result: SearchResult): void {
        switch(result.type) {
            case 'search':
                this.filter = {
                    "property": "search",
                    "value" : 0
                }
                this.getGamesSearch(result.text);
                this.setTitle();
                return;
            case 'name':
                this.gameDatabaseService.getGame(result.id)
                    .then((game) => this.onSelect(game));
                return;
            case 'tag':
                this.filter = {
                    "property": 'TagID',
                    "value": result.id
                }
                break;
            case 'duration':
                this.filter = {
                    "property": 'DurationID',
                    "value": result.id
                }
                break;
            case 'playercount':
                this.filter = {
                    "property": 'PlayerCountID',
                    "value": result.id
                }
                break;
        }
        this.getGames();
        this.setTitle();
    }

    onSearch(term: string): void {
        this.gameDatabaseService.searchForResults(term)
            .then((results) => this.searchResults = results);
    }

    clearFilter(): void {
        // TODO: back button should clear filters
        this.filter = null;
        this.getGames();
        this.setTitle();
    }

}
