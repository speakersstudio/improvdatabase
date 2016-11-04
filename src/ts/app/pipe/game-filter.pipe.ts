import {
    Pipe,
    PipeTransform
} from '@angular/core';

import { Game } from '../model/game';

export class GameFilter {
    property: string;
    value: number;
}

@Pipe({
    name: 'gameFilter'
})
export class GameFilterPipe implements PipeTransform {

    transform (value: Game[], args: GameFilter): Game[] {
        if (args) {
            return value.filter((game) => {
                if (args.property == 'TagID') {
                    for (var tagIDIndex = 0; tagIDIndex < game.TagGames.length; tagIDIndex++) {
                        if (game.TagGames[tagIDIndex].TagID == args.value) {
                            return true;
                        }
                    }
                    return false;
                } else {
                    return game[args.property] == args.value;
                }
            });
        } else {
            return value;
        }
    }

}