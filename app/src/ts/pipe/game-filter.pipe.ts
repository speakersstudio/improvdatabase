import {
    Pipe,
    PipeTransform
} from '@angular/core';

import { Game } from '../model/game';

export class GameFilter {
    property: string;
    value: string;
}

@Pipe({
    name: 'gameFilter'
})
export class GameFilterPipe implements PipeTransform {

    transform (value: Game[], args: GameFilter): Game[] {
        if (args) {
            return value.filter((game) => {
                if (args.property == 'tagId') {
                    // this isn't a foreach because that won't handle the return properly
                    for (var tagIDIndex = 0; tagIDIndex < game.tags.length; tagIDIndex++) {
                        if (game.tags[tagIDIndex].tag._id == args.value) {
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