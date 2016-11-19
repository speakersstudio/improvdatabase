import {
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/core';

const DIALOG_STYLE_IN = {
        transform: 'scale(1)',
        opacity: 1
    };
const DIALOG_STYLE_OUT = {
        transform: 'scale(0.1)',
        opacity: 0
    };
const DIALOG_ANIM_DURATION = 200;

// bouncing
const EASE_IN_BACK = 'cubic-bezier(0.600, -0.280, 0.735, 0.045)';
const EASE_OUT_BACK = 'cubic-bezier(0.175, 0.885, 0.320, 1.275)';

export default class AnimUtils {

    static dialog = trigger('dialog', [
            state('in', style(DIALOG_STYLE_IN)),
            transition('void => *', [
                style(DIALOG_STYLE_OUT),
                animate(DIALOG_ANIM_DURATION + 'ms ' + EASE_OUT_BACK)
            ]),
            transition('* => void', [
                animate(DIALOG_ANIM_DURATION + 'ms ' + EASE_IN_BACK, style(DIALOG_STYLE_OUT))
            ])
        ]);

}