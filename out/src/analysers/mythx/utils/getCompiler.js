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
// TODO:
// FILE ATM IS NOT BEING USED, BUT WILL SERVE AS PLACE TO HANDLE DIFFERENT COMPILERS LOGIC IN FUTURE
const vscode = require("vscode");
const { extensions } = vscode;
function getCompiler() {
    return __awaiter(this, void 0, void 0, function* () {
        const selection = yield vscode.window.showQuickPick(["solc", "truffle"], {
            placeHolder: "Select compiler version:",
            canPickMany: false
        });
        if (selection === "solc") {
            extensions.getExtension("JuanBlanco.solidity").activate().then((done) => {
                vscode.commands.executeCommand("solidity.compile.active");
                return selection;
            }, (err) => console.error(err));
        }
        else {
            throw new Error(`MythX-vscode: Unfortunately we still do not support ${selection} compilation!`);
        }
        return "";
    });
}
exports.getCompiler = getCompiler;
// dev helper function to dump all the command identifiers to the console
// helps if you cannot find the command id on github.
var findCommand = function () {
    vscode.commands.getCommands(true).then(function (cmds) {
        console.log("fulfilled");
        console.log(cmds);
    }, function () {
        console.log("failed");
        console.log(arguments);
    });
};
//# sourceMappingURL=getCompiler.js.map