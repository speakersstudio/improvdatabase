import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Name } from '../model/name';
import { Game } from '../model/game';
import { PlayerCount } from '../model/player-count';
import { Duration } from '../model/duration';
import { Tag } from '../model/tag';
import { TagGame } from '../model/tag-game';
import { Note } from '../model/note';

@Injectable()
export class GameDatabaseService {
    private gamesUrl = '/api/game';
    private namesUrl = '/api/name';
    private playerCountUrl = '/api/playerCount';
    private durationUrl = '/api/duration';

    private tagUrl = '/api/tag';
    private tagGameUrl = '/api/tagGame';

    private noteUrl = '/api/note';

    // cache all the things
    private games: Game[] = [];
    private names: Name[] = [];
    private playercounts: PlayerCount[] = [];
    private durations: Duration[] = [];
    private tags: Tag[] = [];
    private tagGames: TagGame[] = [];
    private notes: Note[] = [];

    constructor(private http: Http) { }

// TODO: update the API to expand names and tagGames on game queries
    getGames(sortProperty = 'name'): Promise<Game[]> {
        console.log('getting games, sorting by ', sortProperty);
        return Promise.all([this._getGames(), this.getNames(), this.getTagGames()])
            .then(() => {
                // set it and forget it
                this.games.forEach(game => this._setupGame(game));
                this.games = this._sortGames(sortProperty);
                return this.games;
            });
    }

    private _setupGame(game: Game): Game {
        game.Names = this.getNamesByGameID(game.GameID);
        game.TagGames = this.getTagGamesByGameID(game.GameID);

        return game;
    }

    getGame(id: number): Promise<Game> {
        return Promise.all([ this._getGame(id), this.getNames(), this.getTagGames() ])
            .then((vals) => {
                let game = vals[0];
                return this._setupGame(game);
            });
    }

    private _gamePromise: Promise<Game[]>;
    private _getGames(): Promise<Game[]> {
        if (!this._gamePromise) {
            this._gamePromise = this.http.get(this.gamesUrl)
                .toPromise()
                .then(response => {
                    this.games = response.json() as Game[];
                    return this.games;
                })
                .catch(this.handleError);
        } 
        return this._gamePromise;
    }

    private _getGame(id: number): Promise<Game> {
        if (this.games.length > 0) {
            this.games.forEach((game) => {
                if (game.GameID === id) {
                    return Promise.resolve(game);
                }
            })
        }
        // either no games are loaded or we couldn't find the specified one
        return this.http.get(this.gamesUrl + '/' + id)
            .toPromise()
            .then(response => {
                return response.json()[0] as Game;
            })
            .catch(this.handleError);
    }

    private _sortGames(property: string): Game[] {
        if (property === 'name') {
            this.games.sort((g1, g2) => {
                if (g1.Names[0].Name > g2.Names[0].Name) {
                    return 1;
                }
                if (g1.Names[0].Name < g2.Names[0].Name) {
                    return -1;
                }
                return 0;
            });
        }
        return this.games;
    }

    private _namePromise: Promise<Name[]>;
    getNames(): Promise<Name[]> {
        if (!this._namePromise) {
            this._namePromise = this.http.get(this.namesUrl)
                .toPromise()
                .then(response => {
                    this.names = response.json() as Name[];
                    return this.names;
                })
                .catch(this.handleError);
        }
        return this._namePromise;
    }

    private _getItemsByGameID(items: any[], id: number): any[] {
        let returnItems = [];
        items.forEach(item => {
            if (item.GameID && item.GameID == id) {
                returnItems.push(item);
            }
        });
        return returnItems;
    }

    getNamesByGameID(id: number): Name[] {
        let names: Name[] = this._getItemsByGameID(this.names, id);
        names.sort((n1, n2) => {
            let comp = n2.Weight - n1.Weight;
            if (comp === 0) {
                return n1.DateModified > n2.DateModified ? -1 : 1;
            } else {
                return comp;
            }
        });
        return names;
    }

    private _tagGamePromise: Promise<TagGame[]>;
    private getTagGames(): Promise<TagGame[]> {
        if (!this._tagGamePromise) {
            this._tagGamePromise = this.http.get(this.tagGameUrl)
                .toPromise()
                .then(response => {
                    this.tagGames = response.json() as TagGame[];
                    return this.tagGames;
                })
                .catch(this.handleError);
        }
        return this._tagGamePromise;
    }

    getTagGamesByGameID(id: number): TagGame[] {
        let tagGames: TagGame[] = this._getItemsByGameID(this.tagGames, id);
        return tagGames;
    }

    private _playerCountPromise: Promise<PlayerCount[]>;
    getPlayerCounts(): Promise<PlayerCount[]> {
        if (!this._playerCountPromise) {
            this._playerCountPromise = this.http.get(this.playerCountUrl)
                .toPromise()
                .then(response => {
                    this.playercounts = response.json() as PlayerCount[];
                    return this.playercounts;
                })
                .catch(this.handleError);
        }
        return this._playerCountPromise;
    }

    getPlayerCountById(id: number): Promise<PlayerCount> {
        return new Promise<PlayerCount>((resolve, reject) => {
            this.getPlayerCounts().then((playercounts) => {
                playercounts.forEach((playercount) => {
                    if (playercount.PlayerCountID == id) {
                        resolve(playercount);
                    }
                });
            })
        });
    }

    private _durationPromise: Promise<Duration[]>;
    getDurations(): Promise<Duration[]> {
        if (!this._durationPromise) {
            this._durationPromise = this.http.get(this.durationUrl)
                .toPromise()
                .then(response => {
                    this.durations = response.json() as Duration[];
                    return this.durations;
                })
                .catch(this.handleError);
        }
        return this._durationPromise;
    }

    getDurationById(id: number): Promise<Duration> {
        return new Promise<Duration>((resolve, reject) => {
            this.getDurations().then((durations) => {
                durations.forEach((duration) => {
                    if (duration.DurationID == id) {
                        resolve(duration);
                    }
                });
            })
        });
    }

    private _tagPromise: Promise<Tag[]>;
    getTags(): Promise<Tag[]> {
        if (!this._tagPromise) {
            this._tagPromise = this.http.get(this.tagUrl)
                .toPromise()
                .then(response => {
                    this.tags = response.json() as Tag[];
                    return this.tags;
                })
                .catch(this.handleError);
        }
        return this._tagPromise;
    }

    getTagById(id: number): Promise<Tag> {
        return new Promise<Tag>((resolve, reject) => {
            this.getTags().then((tags) => {
                tags.forEach((tag) => {
                    if (tag.TagID == id) {
                        resolve(tag);
                    }
                });
            });
        });
    }
    
    gameHasTag(game: Game, tagID: number): boolean {
        game.TagGames.forEach((taggame) => {
            console.log(taggame.TagID, tagID);
            if (taggame.TagID == tagID) {
                return true;
            }
        })
        return false;
    }

    private _notePromise: Promise<Note[]>;
    getNotes(): Promise<Note[]> {
        if (!this._notePromise) {
            this._notePromise = this.http.get(this.noteUrl)
                .toPromise()
                .then(response => {
                    this.notes = response.json() as Note[];
                    return this.notes;
                })
                .catch(this.handleError);
        }
        return this._notePromise;
    }

    getNotesForGame(game: Game): Promise<Note[]> {
        return new Promise<Note[]>((resolve, reject) => {
            this.getNotes().then((notes) => {
                let notesForGame: Note[] = [];
                notes.forEach((note) => {
                    if (
                        note.GameID == game.GameID
                        || note.PlayerCountID == game.PlayerCountID
                        || note.DurationID == game.DurationID
                        || (note.TagID && this.gameHasTag(game, note.TagID))
                    ) {
                        notesForGame.push(note);
                    }
                });
                console.log(notesForGame);
                resolve(notesForGame);
            });
        });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error has occurred', error);
        return Promise.reject(error.message || error);
    }
}
