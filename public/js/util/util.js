"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util = (function () {
    function Util() {
    }
    Util.indexOfId = function (array, object) {
        var index = -1, term = typeof (object) == 'string' ? object : object._id;
        array.some(function (o, i) {
            if ((o._id && o._id == term) || o == term) {
                index = i;
                return true;
            }
        });
        return index;
    };
    return Util;
}());
exports.Util = Util;

//# sourceMappingURL=util.js.map
