import { Name } from './name';
import { TagGame } from '../model/tag-game';

export class Game {
    GameID: number;
    DateModified: string;
    DateAdded: string;
    Description: string;
    DurationID: number;
    PlayerCountID: number;
    AddedUserID: number;
    ModifiedUserID: number;
    ParentGameID: number;
    AddedFirstName: string;
    AddedLastName: string;
    ModifiedFirstName: string;
    ModifiedLastName: string;

    Names: Name[];
    TagGames: TagGame[];

}
