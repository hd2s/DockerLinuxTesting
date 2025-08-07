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
// @ts-ignore
const readline = require("readline");
const fs_1 = require("fs");
const child_process_1 = require("child_process");
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function runCode(code) {
    return __awaiter(this, void 0, void 0, function* () {
        const tmpFile = 'student_code.py';
        (0, fs_1.writeFileSync)(tmpFile, code);
        const py = (0, child_process_1.spawn)('python3', [tmpFile], { stdio: 'inherit' });
        yield new Promise((resolve) => py.on('close', resolve));
        (0, fs_1.unlinkSync)(tmpFile);
    });
}
function prompt() {
    let lines = [];
    function readLine() {
        rl.question(lines.length === 0 ? 'PY> ' : '... ', (input) => __awaiter(this, void 0, void 0, function* () {
            if (input.trim().toLowerCase() === 'exit') {
                rl.close();
                return;
            }
            if (input.trim() === 'END') {
                const code = lines.join('\n');
                lines = [];
                rl.close(); // Close before running Python
                yield runCode(code);
                rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });
                readLine();
            }
            else {
                lines.push(input);
                readLine();
            }
        }));
    }
    readLine();
}
prompt();
