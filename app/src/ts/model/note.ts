import { GameMetadata } from './game-metadata';
import { Tag } from './tag';
import { User } from './user';

export class Note {
    _id: string;
    game: string;
    tag: Tag;
    metadata: GameMetadata;
    description: string;
    public: boolean;
    addedUser: User;
    modifiedUser: User;
    dateAdded: Date;
    dateModified: Date;
}