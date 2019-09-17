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
const vscode = require("vscode");
function getCredentials() {
    return __awaiter(this, void 0, void 0, function* () {
        const { window } = vscode;
        try {
            let ethAddress = "0x0000000000000000000000000000000000000000";
            let password = "trial";
            const projectConfiguration = vscode.workspace.getConfiguration('mythxvsc');
            console.log(projectConfiguration, 'poro');
            if (projectConfiguration.ethAddress && projectConfiguration.password) {
                ethAddress = projectConfiguration.ethAddress;
                password = projectConfiguration.password;
            }
            else {
                window.showInformationMessage("No user settings found for EthAddress and password. Using trial user");
            }
            return {
                ethAddress,
                password
            };
        }
        catch (err) {
            throw new Error(`MythXvs Error with getting credentials. ${err}.`);
        }
    });
}
exports.getCredentials = getCredentials;
//# sourceMappingURL=getCredentials.js.map