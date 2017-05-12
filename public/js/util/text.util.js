"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextUtil = (function () {
    function TextUtil() {
    }
    TextUtil.stripTags = function (html) {
        if (!html) {
            return '';
        }
        // this will create a description string without any HTML tags in it
        var div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || html;
    };
    return TextUtil;
}());
exports.TextUtil = TextUtil;

//# sourceMappingURL=text.util.js.map
