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

import { SearchResult } from '../view/toolbar.view';

import { UserService } from './user.service';

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

    constructor(
        private http: Http,
        private userService: UserService
        ) { }

    // TODO: there's probably way too much in this file now

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

    createName(gameID: number, name: string): Promise<Name> {
        return this.http.post(this.namesUrl, {
            GameID: gameID,
            Name: name
        }, this.userService.getAuthorizationHeader())
            .toPromise()
            .then(response => {
                let name = response.json() as Name;
                this.names.push(name);
                return name;
            })
            .catch(this.handleError);
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

    gameHasTag(game: Game, tagIDs: number[]): boolean {
        let foundTagGame: boolean = false;
        game.TagGames.forEach((taggame) => {
            if (tagIDs.indexOf(taggame.TagID) > -1) {
                foundTagGame = true;
                return false;
            }
        });
        return foundTagGame;
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
                        || (note.TagID && this.gameHasTag(game, [note.TagID]))
                    ) {
                        notesForGame.push(note);
                    }
                });
                resolve(notesForGame);
            });
        });
    }

    deleteGame(game: Game): Promise<boolean> {
        return this.http.delete(this.gamesUrl + '/' + game.GameID,
            this.userService.getAuthorizationHeader())
            .toPromise()
            .then((response) => {
                this._removeGameFromArray(game);
                return true;
            })
    }

    private _removeGameFromArray(game: Game): number {
        let index = this.games.indexOf(game);
        if (index > -1) {
            this.games.splice(index, 1);
        }
        return index;
    }

    saveGame(game: Game): Promise<Game> {
        return this.http.put(this.gamesUrl + '/' + game.GameID,
            game,
            this.userService.getAuthorizationHeader())
            .toPromise()
            .then((response) => {
                let index = this._removeGameFromArray(game);
                let newGame = this._setupGame(response.json() as Game);
                if (index > -1) {
                    this.games.splice(index, 0, newGame);
                } else {
                    this.games.push(newGame);
                }
                return newGame;
            })
            .catch(this.handleError);
    }

    createGame(): Promise<Game> {
        return this.http.post(this.gamesUrl,
            {}, this.userService.getAuthorizationHeader())
            .toPromise()
            .then((response) => {
                let game = response.json() as Game;
                this.games.push(this._setupGame(game));
                return game;
            })
    }

    private _addTagToGame(game: Game, taggame: TagGame): void {
        this.tagGames.push(taggame);
        game.TagGames.push(taggame);
    }

    saveTagToGame(game: Game, tag: Tag): Promise<TagGame> {
        return this.http.post(this.tagGameUrl,
            {
                TagID: tag.TagID,
                GameID: game.GameID
            },
            this.userService.getAuthorizationHeader())
            .toPromise()
            .then(response => {
                let taggame = response.json() as TagGame;
                this._addTagToGame(game, taggame);

                return taggame;
            })
    }

    deleteTagGame(taggame: TagGame): Promise<boolean> {
        return this.http.delete(this.tagGameUrl + '/' + taggame.TagGameID,
            this.userService.getAuthorizationHeader())
            .toPromise()
            .then(() => {
                let index = this.tagGames.indexOf(taggame);
                if (index > -1) {
                    this.tagGames.splice(index, 1);
                }
                this.getGame(taggame.GameID)
                    .then(game => this._setupGame(game));
                return true;
            })
    }

    createTag(name: string, game: Game): Promise<Tag> {
        let postObj = {
            Name: name,
            GameID: game.GameID
        }

        return this.http.post(this.tagUrl,
            postObj, this.userService.getAuthorizationHeader())
            .toPromise()
            .then(response => {
                console.log(response.json());

                let resObj = response.json();
                let tag = resObj['Tag'] as Tag;
                this.tags.push(tag);

                let taggame = resObj['TagGame'] as TagGame;
                this._addTagToGame(game, taggame);

                return tag;
            });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error has occurred', error);
        return Promise.reject(error.message || error);
    }

    // TODO: search stuff can be in a separate service

    private _searchArray(arr: any[], type: string, idProperty: string, term: string): SearchResult[] {
        let results: SearchResult[] = [];
        arr.forEach((item) => {
            let str = item.Name;

            if (str.toLowerCase().indexOf(term) > -1) {
                var regex = new RegExp('(' + term + ')', 'gi');
                str = str.replace(regex, '<strong>$1</strong>');

                let result: SearchResult = {
                    text: str,
                    id: item[idProperty],
                    type: type
                }
                results.push(result);
            }
        });
        return results;
    }
    private _sortSearchResults(results: SearchResult[]): SearchResult[] {
        results.sort((r1, r2) => {
            let val1 = r1.text;
            let val2 = r2.text;
            if (val1 > val2) {
                return 1;
            }
            if (val1 < val2) {
                return -1;
            }
            return 0;
        });
        return results;
    }

    searchForResults(term: string): Promise<SearchResult[]> {
        return new Promise<SearchResult[]>((resolve, reject) => {
            term = term.toLowerCase();
            let searchResults: SearchResult[] = [];
            if (term) {
                Promise.all([
                    this.getNames(),
                    this.getTags(),
                    this.getDurations(),
                    this.getPlayerCounts()
                ])
                    .then((items) => {
                        searchResults = []
                            .concat(this._searchArray(items[0], 'name', 'GameID', term))
                            .concat(this._searchArray(items[1], 'tag', 'TagID', term))
                            .concat(this._searchArray(items[2], 'duration', 'DurationID', term))
                            .concat(this._searchArray(items[3], 'playercount', 'PlayerCountID', term));

                        // TODO: include player count and durations by actual values if the term is a number?

                        searchResults = this._sortSearchResults(searchResults);

                        resolve(searchResults);
                    });
            }
        });
    }

    searchForTags(term: string): Promise<Tag[]> {
        return new Promise<Tag[]>((resolve, reject) => {
            term = term.toLocaleLowerCase();
            let matchingTags: Tag[] = [];
            if (term) {
                this.getTags().then(tags => {
                    tags.forEach(tag => {
                        if (tag.Name.toLocaleLowerCase().indexOf(term) > -1) {
                            matchingTags.push(tag);
                        }
                    });
                    resolve(matchingTags);
                });
            }
        })
    }

    searchForGames(term: string): Promise<Game[]> {
        return new Promise<Game[]>((resolve, reject) => {
            term = term.toLowerCase();
            let gameResults: Game[] = [];
            if (term) {
                Promise.all([
                    this.getGames(),
                    this.getTags(),
                    this.getDurations(),
                    this.getPlayerCounts()
                ])
                    .then((items) => {
                        
                        // search the tags
                        let tagResults: number[] = [];
                        items[1].forEach((tag) => {
                            if (tag.Name.toLowerCase().indexOf(term) > -1) {
                                tagResults.push(tag.TagID);
                            }
                        });

                        // search the durations
                        let durationResults: number[] = [];
                        items[2].forEach((duration) => {
                            if (duration.Name.toLowerCase().indexOf(term) > -1) {
                                durationResults.push(duration.DurationID);
                            }
                        });

                        // search the player counts
                        let playerCountResults: number[] = [];
                        items[3].forEach((playercount) => {
                            if (playercount.Name.toLowerCase().indexOf(term) > -1) {
                                playerCountResults.push(playercount.PlayerCountID);
                            }
                        });

                        // loop through the games
                        items[0].forEach((game) => {
                            // add it if a tag matches or if the playercount or duration matches
                            if (this.gameHasTag(game, tagResults) ||
                                    durationResults.indexOf(game.DurationID) > -1 ||
                                    playerCountResults.indexOf(game.PlayerCountID) > -1) {
                                gameResults.push(game);
                            } else {
                                // add it if a name matches
                                game.Names.forEach((name) => {
                                    if (name.Name.toLowerCase().indexOf(term) > -1 &&
                                            gameResults.indexOf(game) == -1) {
                                        gameResults.push(game);
                                    }
                                });
                            }
                        });

                        resolve(gameResults);
                    });
            }
        });
    }
}
