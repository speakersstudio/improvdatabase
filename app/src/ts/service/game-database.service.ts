import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { AppHttp } from '../data/app-http';

import { Name } from '../model/name';
import { Game, TagGame } from '../model/game';
import { GameMetadata } from '../model/game-metadata';
import { Tag } from '../model/tag';
import { Note } from '../model/note';

import { SearchResult } from '../app/view/toolbar.view';

import { UserService } from './user.service';

@Injectable()
export class GameDatabaseService {
    private gamesUrl = '/api/game';
    private namesUrl = '/api/name';

    private metadataUrl = '/api/metadata';
    private playerCountUrl = '/api/metadata/playerCount';
    private durationUrl = '/api/metadata/duration';

    private tagUrl = '/api/tag';

    private noteUrl = '/api/note';

    // cache all the things
    private games: Game[] = [];
    private names: Name[] = [];
    private playercounts: GameMetadata[] = [];
    private durations: GameMetadata[] = [];
    private tags: Tag[] = [];
    private notes: Note[] = [];

    private sortProperty: string;

    constructor(
        private http: AppHttp,
        private userService: UserService
        ) { }

    private _gamePromise: Promise<Game[]>;
    getGames(): Promise<Game[]> {
        if (!this._gamePromise) {
            this._gamePromise = this.http.get(this.gamesUrl)
                .toPromise()
                .then(response => {
                    this.games = response.json() as Game[];
                    this._sortGames();
                    return this.games;
                })
                .catch(this.handleError);
        } 
        return this._gamePromise;
    }

    getGame(id: String): Promise<Game> {
        let gameToReturn: Game;
        if (this.games.length > 0) {
            this.games.forEach((game) => {
                if (game._id === id) {
                    gameToReturn = game;
                }
            })
        }

        if (gameToReturn) {
            return Promise.resolve(gameToReturn);
        } else {
            // either no games are loaded or we couldn't find the specified one
            return this.http.get(this.gamesUrl + '/' + id)
                .toPromise()
                .then(response => {
                    return response.json() as Game;
                })
                .catch(this.handleError);
        }
    }

    private _sortGames(): Game[] {
        this.games.sort((g1, g2) => {
            if (!g1.names.length) {
                return -1;
            }
            if (!g2.names.length) {
                return 1;
            }

            return g1.names[0].name.localeCompare(g2.names[0].name);
        });
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

    /**
     * A convenience method to search any array of items for any that are linked to a given game id
     */
    private _getItemsByGameID(items: any[], id: number): any[] {
        let returnItems = [];
        items.forEach(item => {
            if (item.game && item.game == id) {
                returnItems.push(item);
            } else if (item.games && item.games.indexOf(id) > -1) {
                returnItems.push(item);
            }
        });
        return returnItems;
    }

    /**
     * This method isn't necessary anymore because names are delivered with games now
     */
    // getNamesByGameID(id: number): Name[] {
    //     let names: Name[] = this._getItemsByGameID(this.names, id);
    //     names.sort((n1, n2) => {
    //         let comp = n2.Weight - n1.Weight;
    //         if (comp === 0) {
    //             return n1.DateModified > n2.DateModified ? -1 : 1;
    //         } else {
    //             return comp;
    //         }
    //     });
    //     return names;
    // }

    /**
     * Creates a new name for the given gameID, making a post to /api/name
     */
    createName(gameID: string, name: string): Promise<Name> {
        return this.http.post(this.namesUrl, {
            game: gameID,
            name: name
        })
            .toPromise()
            .then(response => {
                let name = response.json() as Name;
                this.names.push(name);
                return name;
            })
            .catch(this.handleError);
    }

    /**
     * Updates a name on the server, making a PUT call to /api/name/:_id
     */
    saveName(name: Name): Promise<Name> {
        return this.http.put(this.namesUrl + '/' + name._id, name)
            .toPromise()
            .then(response => {
                let newName = response.json() as Name;
                let index = this.names.indexOf(name);
                if (index > -1) {
                    this.names.splice(index, 1, newName);
                } else {
                    this.names.push(newName);
                }
                this._sortGames();
                return newName; 
            })
    }

    private _playerCountPromise: Promise<GameMetadata[]>;
    getPlayerCounts(): Promise<GameMetadata[]> {
        if (!this._playerCountPromise) {
            this._playerCountPromise = this.http.get(this.playerCountUrl)
                .toPromise()
                .then(response => {
                    this.playercounts = response.json() as GameMetadata[];
                    return this.playercounts;
                })
                .catch(this.handleError);
        }
        return this._playerCountPromise;
    }

    getPlayerCountById(id: String): Promise<GameMetadata> {
        return new Promise<GameMetadata>((resolve, reject) => {
            this.getPlayerCounts().then((playercounts) => {
                playercounts.forEach((playercount) => {
                    if (playercount._id == id) {
                        resolve(playercount);
                    }
                });
            })
        });
    }

    createPlayerCount(name: string, min: number, max: number, description: string): Promise<GameMetadata> {
        return this.http.post(this.metadataUrl,
            {
                name: name,
                min: min,
                max: max,
                type: 'playerCount',
                description: description
            })
            .toPromise()
            .then((response) => {
                let playercount = response.json() as GameMetadata;
                this.playercounts.push(playercount);
                return playercount;
            });
    }

    private _durationPromise: Promise<GameMetadata[]>;
    getDurations(): Promise<GameMetadata[]> {
        if (!this._durationPromise) {
            this._durationPromise = this.http.get(this.durationUrl)
                .toPromise()
                .then(response => {
                    this.durations = response.json() as GameMetadata[];
                    return this.durations;
                })
                .catch(this.handleError);
        }
        return this._durationPromise;
    }

    getDurationById(id: String): Promise<GameMetadata> {
        return new Promise<GameMetadata>((resolve, reject) => {
            this.getDurations().then((durations) => {
                durations.forEach((duration) => {
                    if (duration._id == id) {
                        resolve(duration);
                    }
                });
            })
        });
    }

    createDuration(name: string, min: number, max: number, description: string): Promise<GameMetadata> {
        return this.http.post(this.metadataUrl,
            {
                Name: name,
                Min: min,
                Max: max,
                type: 'duration',
                Description: description
            })
            .toPromise()
            .then((response) => {
                let duration = response.json() as GameMetadata;
                this.durations.push(duration);
                return duration;
            });
    }

    private _tagPromise: Promise<Tag[]>;
    getTags(): Promise<Tag[]> {
        if (!this._tagPromise) {
            if (this.userService.can('tag_view')) {
                this._tagPromise = this.http.get(this.tagUrl)
                    .toPromise()
                    .then(response => {
                        this.tags = response.json() as Tag[];
                        return this.tags;
                    })
                    .catch(this.handleError);
            } else {
                this._tagPromise = new Promise<Tag[]>((resolve, reject) => {
                    resolve([]);
                });
            }
        }
        return this._tagPromise;
    }

    getTagById(id: String): Promise<Tag> {
        return new Promise<Tag>((resolve, reject) => {
            this.getTags().then((tags) => {
                tags.forEach((tag) => {
                    if (tag._id == id) {
                        resolve(tag);
                    }
                });
            });
        });
    }

    gameHasTag(game: Game, tagIDs: String[]): boolean {
        let foundTagGame: boolean = false;
        game.tags.forEach((taggame) => {
            if (tagIDs.includes(taggame.tag._id)) {
                foundTagGame = true;
                return false;
            }
        });
        return foundTagGame;
    }

    private _notePromise: Promise<Note[]>;
    getNotes(): Promise<Note[]> {
        if (!this._notePromise) {
            if (this.userService.can('note_public_view')) {
                this._notePromise = this.http.get(this.noteUrl)
                    .toPromise()
                    .then(response => {
                        this.notes = response.json() as Note[];
                        return this.notes;
                    })
                    .catch(this.handleError);
            } else {
                this._notePromise = new Promise<Note[]>((resolve, reject) => {
                    resolve([]);
                })
            }
        }
        return this._notePromise;
    }

    getNotesForGame(game: Game): Promise<Note[]> {
        return new Promise<Note[]>((resolve, reject) => {
            this.getNotes().then((notes) => {
                // TODO: make this logic server-side
                let notesForGame: Note[] = [];
                notes.forEach((note) => {
                    if (
                        note.game == game._id
                        || (game.playerCount && note.metadata && 
                            note.metadata._id == game.playerCount._id)
                        || (game.duration && note.metadata &&
                            note.metadata._id == game.duration._id)
                        || (note.tag && this.gameHasTag(game, [note.tag._id]))
                    ) {
                        notesForGame.push(note);
                    }
                });
                resolve(notesForGame);
            });
        });
    }

    deleteGame(game: Game): Promise<boolean> {
        return this.http.delete(this.gamesUrl + '/' + game._id)
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

    private _handleNewGame(game: Game, response): Game {
        let index = this._removeGameFromArray(game);
        let newGame = response.json() as Game;
        if (index > -1) {
            this.games.splice(index, 0, newGame);
        } else {
            this.games.push(newGame);
        }
        return newGame;
    }

    saveGame(game: Game): Promise<Game> {
        return this.http.put(this.gamesUrl + '/' + game._id, game)
            .toPromise()
            .then((response) => {
                return this._handleNewGame(game, response);
            })
            .catch(this.handleError);
    }

    createGame(): Promise<Game> {
        return this.http.post(this.gamesUrl, {})
            .toPromise()
            .then((response) => {
                let game = response.json() as Game;
                this.games.push(game);
                this._sortGames();
                return game;
            })
            .catch(this.handleError);
    }

    private _handleNewTagGame(game: Game, response, tag: Tag|string): TagGame {
        let newGame = this._handleNewGame(game, response),
            taggame: TagGame;

        newGame.tags.forEach(tg => {
            if ((typeof(tag) == 'object' && tg.tag._id == tag._id) ||
                (typeof(tag) == 'string' && tg.tag.name == tag)) {
                taggame = tg;
                return false;
            }
        });

        return taggame;
    }

    saveTagToGame(game: Game, tag: Tag): Promise<TagGame> {
        return this.http.post(this.gamesUrl + '/' + game._id + '/addTag/' + tag._id, {})
            .toPromise()
            .then(response => {
                return this._handleNewTagGame(game, response, tag);
            })
    }

    deleteTagGame(game: Game, taggame: TagGame): Promise<Game> {
        return this.http.delete(this.gamesUrl + '/' + game._id + '/removeTag/' + taggame.tag._id)
            .toPromise()
            .then(response => {
                return this._handleNewGame(game, response);
            })
    }

    createTag(name: string, game: Game): Promise<TagGame> {
        return this.http.post(this.gamesUrl + '/' + game._id + '/createTag/' + name, { name: name })
            .toPromise()
            .then(response => {
                return this._handleNewTagGame(game, response, name);
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
            let str = item.name;

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
                            .concat(this._searchArray(items[0], 'name', 'game', term))
                            .concat(this._searchArray(items[1], 'tag', '_id', term))
                            .concat(this._searchArray(items[2], 'duration', '_id', term))
                            .concat(this._searchArray(items[3], 'playercount', '_id', term));

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
                        if (tag.name.toLocaleLowerCase().indexOf(term) > -1) {
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
                        let tagResults: String[] = [];
                        items[1].forEach((tag) => {
                            if (tag.name.toLowerCase().indexOf(term) > -1) {
                                tagResults.push(tag._id);
                            }
                        });

                        // search the durations
                        let durationResults: String[] = [];
                        items[2].forEach((duration) => {
                            if (duration.name.toLowerCase().indexOf(term) > -1) {
                                durationResults.push(duration._id);
                            }
                        });

                        // search the player counts
                        let playerCountResults: String[] = [];
                        items[3].forEach((playercount) => {
                            if (playercount.name.toLowerCase().indexOf(term) > -1) {
                                playerCountResults.push(playercount._id);
                            }
                        });

                        // loop through the games
                        items[0].forEach((game) => {
                            // add it if a tag matches or if the playercount or duration matches
                            if (this.gameHasTag(game, tagResults) ||
                                    durationResults.includes(game.duration._id) ||
                                    playerCountResults.includes(game.playerCount._id) ) {
                                gameResults.push(game);
                            } else {
                                // add it if a name matches
                                game.names.forEach((name) => {
                                    if (name.name.toLowerCase().indexOf(term) > -1 &&
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
