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
const os = require('os');
const path = require('path');
const hasPlaceHolder_1 = require("./hasPlaceHolder");
function getAstData(contractName, fileContent) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let outputAST;
            let fixedPath = vscode.window.activeTextEditor.document.fileName;
            const roothPath = vscode.workspace.rootPath;
            // Windows OS hack
            if (os.platform() === 'win32') {
                fixedPath = fixedPath.replace(/\\/g, '/');
                if (fixedPath.charAt(0) === '/') {
                    fixedPath = fixedPath.substr(1);
                }
            }
            const fileName = fixedPath.split("/").pop();
            const fileNameTrimmed = fileName.replace('.sol', '');
            const pathNoFileName = fixedPath.substring(0, fixedPath.lastIndexOf("/"));
            // Find differences between two path
            const relativePath = path.relative(vscode.workspace.rootPath, pathNoFileName);
            if (pathNoFileName === roothPath) {
                outputAST = `${roothPath}/bin/${fileNameTrimmed}-solc-output.json`;
            }
            else {
                outputAST = `${roothPath}/bin/${relativePath}/${fileNameTrimmed}-solc-output.json`;
            }
            const documentObj = yield vscode.workspace.openTextDocument(outputAST);
            const compiled = JSON.parse(documentObj.getText());
            const contract = compiled.contracts[fixedPath];
            const sources = compiled.sources;
            // source is required by our API but does not exist in solc output
            sources[fixedPath].source = fileContent;
            /*
             Data to submit
            */
            // Bytecode
            const bytecode = contract[contractName].evm.bytecode;
            const deployedBytecode = contract[contractName].evm.deployedBytecode;
            // Metadata
            const metadata = JSON.parse(contract[contractName].metadata);
            const solcVersion = metadata.compiler.version;
            const request = {
                toolName: "mythx-vscode-extension",
                contractName: contractName,
                bytecode: hasPlaceHolder_1.hasPlaceHolder(bytecode.object),
                sourceMap: bytecode.sourceMap,
                deployedBytecode: hasPlaceHolder_1.hasPlaceHolder(deployedBytecode.object),
                deployedSourceMap: deployedBytecode.sourceMap,
                mainSource: fixedPath,
                sources: sources,
                sourceList: Object.keys(compiled.sources),
                solcVersion: solcVersion
            };
            return request;
        }
        catch (err) {
            vscode.window.showWarningMessage(`Mythx error with analysing your AST. ${err}`);
            throw new Error(`Mythx error with analysing your AST. ${err}`);
        }
    });
}
exports.getAstData = getAstData;
//# sourceMappingURL=getAstData.js.map