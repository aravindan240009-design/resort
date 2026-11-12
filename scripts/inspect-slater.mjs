import fs from 'fs';

const code = fs.readFileSync('extracted/slater-raw.js', 'utf8');

// List all top-level functions and their signatures
const regex = /function\s+([a-zA-Z0-9_$]+)\s*\(([^)]*)\)/g;
let m;
const functions = [];
while ((m = regex.exec(code)) !== null) {
  functions.push({ name: m[1], args: m[2], index: m.index });
}

console.log('Total functions:', functions.length);
functions.forEach(f => {
  console.log(`- ${f.name}(${f.args}) at index ${f.index}`);
});
