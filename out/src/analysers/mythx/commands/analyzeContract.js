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
const mythxjs_1 = require("mythxjs");
const getCredentials_1 = require("../login/getCredentials");
const errorCodeDiagnostic_1 = require("../errorCodeDiagnostic");
const getFileContent_1 = require("../utils/getFileContent");
const getAstData_1 = require("../utils/getAstData");
const { window } = vscode;
let mythx;
let contractNameOption = {
    prompt: "Contract Name: ",
    placeHolder: "Contract Name",
    ignoreFocusOut: true
};
function analyzeContract(diagnosticCollection) {
    return __awaiter(this, void 0, void 0, function* () {
        let contractName;
        // TODO: throw errror if compilation fails 
        yield vscode.extensions.getExtension("JuanBlanco.solidity").activate().then((done) => {
            vscode.commands.executeCommand("solidity.compile.active");
        }, (err) => { throw new Error(`MythX: Error with solc compilation. ${err}`); });
        const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));
        yield waitFor(5000);
        const credentials = yield getCredentials_1.getCredentials();
        mythx = new mythxjs_1.Client(credentials.ethAddress, credentials.password, "mythXvsc");
        yield mythx.login();
        yield window.showInputBox(contractNameOption).then(value => {
            if (value === undefined) {
                throw new Error('Contract Name cancelled. Please re-run analysis.');
            }
            contractName = value;
        });
        const fileContent = yield getFileContent_1.getFileContent();
        const requestObj = yield getAstData_1.getAstData(contractName, fileContent);
        const analyzeRes = yield mythx.analyze(requestObj);
        const { uuid } = analyzeRes;
        // Get in progress bar
        yield window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: `Analysing smart contract ${contractName}`,
            cancellable: true
        }, (_) => new Promise((resolve) => {
            // Handle infinite queue
            const timer = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                const analysis = yield mythx.getAnalysisStatus(uuid);
                if (analysis.status === "Finished") {
                    clearInterval(timer);
                    resolve("done");
                }
            }), 10000);
        }));
        const analysisResult = yield mythx.getDetectedIssues(uuid);
        const { issues } = analysisResult[0];
        // Some warning have messages but no SWCID (like free trial user warn)
        const filtered = issues.filter(issue => issue.swcID !== "");
        if (!filtered) {
            vscode.window.showInformationMessage(`MythXvs: No security issues found in your contract.`);
        }
        else {
            vscode.window.showWarningMessage(`MythXvs: found ${filtered.length} security issues with contract.`);
        }
        // Diagnostic
        errorCodeDiagnostic_1.errorCodeDiagnostic(vscode.window.activeTextEditor.document, diagnosticCollection, analysisResult);
    });
}
exports.analyzeContract = analyzeContract;
//# sourceMappingURL=analyzeContract.js.map