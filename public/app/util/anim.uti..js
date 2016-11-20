"use strict";
var core_1 = require("@angular/core");
var DIALOG_STYLE_IN = {
    transform: 'translate(-50%, -50%)',
    opacity: 1
};
var DIALOG_STYLE_OUT = {
    transform: 'translate(-50%, -150%)',
    opacity: 0
};
var DIALOG_ANIM_DURATION = 200;
var AnimUtils = (function () {
    function AnimUtils() {
    }
    return AnimUtils;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AnimUtils;
AnimUtils.dialog = core_1.trigger('dialog', [
    core_1.state('in', core_1.style(DIALOG_STYLE_IN)),
    core_1.transition('void => *', [
        core_1.style(DIALOG_STYLE_OUT),
        core_1.animate(DIALOG_ANIM_DURATION + 'ms ease-out')
    ]),
    core_1.transition('* => void', [
        core_1.animate(DIALOG_ANIM_DURATION + 'ms ease-in', core_1.style(DIALOG_STYLE_OUT))
    ])
]);

//# sourceMappingURL=anim.uti..js.map
