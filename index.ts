// @ts-ignore
import * as readline from 'readline';
import { writeFileSync, unlinkSync } from 'fs';
import { spawn } from 'child_process';

let rl = readline.createInterface({
  input: (process as NodeJS.Process).stdin,
  output: (process as NodeJS.Process).stdout
});

async function runCode(code: string) {
  const tmpFile = 'student_code.py';
  writeFileSync(tmpFile, code);
  const py = spawn('python3', [tmpFile], { stdio: 'inherit' });
  await new Promise((resolve) => py.on('close', resolve));
  unlinkSync(tmpFile);
}
function prompt() {
  let lines: string[] = [];
  function readLine() {
    rl.question(lines.length === 0 ? 'PY> ' : '... ', async (input: string) => {
      if (input.trim().toLowerCase() === 'exit') {
        rl.close();
        return;
      }
      if (input.trim() === 'END') {
        const code = lines.join('\n');
        lines = [];
        rl.close(); // Close before running Python
        await runCode(code);
        rl = readline.createInterface({
          input: (process as NodeJS.Process).stdin,
          output: (process as NodeJS.Process).stdout
        });
        readLine();
      } else {
        lines.push(input);
        readLine();
      }
    });
  }
  readLine();
}
prompt();

