"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
exports.extensionPrefix = 'mythx';
function getExtensionSetting(key, fsPath) {
    const projectConfiguration = vscode_1.workspace.getConfiguration(exports.extensionPrefix, fsPath ? vscode_1.Uri.file(fsPath) : undefined);
    return projectConfiguration.get(key);
}
exports.getExtensionSetting = getExtensionSetting;
function updateSetting(section, value, prefix = exports.extensionPrefix) {
    return __awaiter(this, void 0, void 0, function* () {
        const projectConfiguration = vscode_1.workspace.getConfiguration(prefix);
        yield projectConfiguration.update(section, value, vscode_1.ConfigurationTarget.Global);
    });
}
exports.updateSetting = updateSetting;
//# sourceMappingURL=ProjectSettings.js.map