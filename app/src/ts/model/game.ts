import { Name } from './name';
import { GameMetadata } from './game-metadata';
import { Note } from './note';
import { Tag } from './tag';

export class TagGame {
    _id: string;
    tag: Tag;
    addedUser: string;
    dateAdded: Date;
}

export class Game {
    _id: string;
    legacyID: number;
    names: Name[];
    description: string;
    duration: GameMetadata;
    playerCount: GameMetadata;
    notes: Note[];
    tags: TagGame[];
    parent: string;
    addedUser: string;
    modifiedUser: string;
    dateAdded: Date;
    dateModified: Date;
}
