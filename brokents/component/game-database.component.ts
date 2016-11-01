import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Game } from '../model/game';
import { Name } from '../model/name';

import { GameDatabaseService } from '../service/game-database.service';

@Component({
    moduleId: module.id,
    selector: 'game-database',
    templateUrl: 'game-database.component.html'
})
export class GameDatabaseComponent implements OnInit {
    games: Game[];
    names: Name[];

    constructor(
        private router: Router,
        private gameDatabaseService: GameDatabaseService) { }

    ngOnInit(): void {
        console.log('INIT');
        //this.getGames();
    }

    onSelect(game: Game): void {
        console.log(game);
    }

    getGames(): void {
        this.gameDatabaseService.getDatabase().then(games => {
            console.log("GAMES!!!", games);
            this.games = games;
        });
    }
}
