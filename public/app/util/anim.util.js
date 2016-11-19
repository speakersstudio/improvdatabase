"use strict";
var core_1 = require('@angular/core');
var DIALOG_STYLE_IN = {
    transform: 'scale(1)',
    opacity: 1
};
var DIALOG_STYLE_OUT = {
    transform: 'scale(0.1)',
    opacity: 0
};
var DIALOG_ANIM_DURATION = 200;
// bouncing
var EASE_IN_BACK = 'cubic-bezier(0.600, -0.280, 0.735, 0.045)';
var EASE_OUT_BACK = 'cubic-bezier(0.175, 0.885, 0.320, 1.275)';
var AnimUtils = (function () {
    function AnimUtils() {
    }
    AnimUtils.dialog = core_1.trigger('dialog', [
        core_1.state('in', core_1.style(DIALOG_STYLE_IN)),
        core_1.transition('void => *', [
            core_1.style(DIALOG_STYLE_OUT),
            core_1.animate(DIALOG_ANIM_DURATION + 'ms ' + EASE_OUT_BACK)
        ]),
        core_1.transition('* => void', [
            core_1.animate(DIALOG_ANIM_DURATION + 'ms ' + EASE_IN_BACK, core_1.style(DIALOG_STYLE_OUT))
        ])
    ]);
    return AnimUtils;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AnimUtils;

//# sourceMappingURL=anim.util.js.map
