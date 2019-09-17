"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
function isPathEqual(fsPath1, fsPath2, relativeFunc = path.relative) {
    const relativePath = relativeFunc(fsPath1, fsPath2);
    return relativePath === "";
}
exports.isPathEqual = isPathEqual;
function isSubpath(expectedParent, expectedChild, relativeFunc = path.relative) {
    const relativePath = relativeFunc(expectedParent, expectedChild);
    return relativePath !== "" && !relativePath.startsWith("..") && relativePath !== expectedChild;
}
exports.isSubpath = isSubpath;
//# sourceMappingURL=fs.js.map