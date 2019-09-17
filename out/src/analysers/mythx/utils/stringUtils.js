"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stringUtils;
(function (stringUtils) {
    function formatString(str, ...val) {
        for (let index = 0; index < val.length; index++) {
            str = str.replace(`{${index}}`, val[index]);
        }
        return str;
    }
    stringUtils.formatString = formatString;
})(stringUtils = exports.stringUtils || (exports.stringUtils = {}));
//# sourceMappingURL=stringUtils.js.map