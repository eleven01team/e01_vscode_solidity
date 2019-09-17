"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hasPlaceHolder(el) {
    if (el.includes("__$")) {
        el = el.replace(/__\$(.+)\$__/, (m, p) => Array(p.length).fill(0).join(''));
    }
    return el;
}
exports.hasPlaceHolder = hasPlaceHolder;
//# sourceMappingURL=hasPlaceHolder.js.map