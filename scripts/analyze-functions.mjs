import fs from 'fs';

const code = fs.readFileSync('extracted/slater-raw.js', 'utf8');

// Find all function declarations
const fnRegex = /function\s+([a-zA-Z0-9_$]+)\s*\(([^)]*)\)\s*\{/g;
let match;
const fns = [];
while ((match = fnRegex.exec(code)) !== null) {
  fns.push({
    name: match[1],
    args: match[2],
    index: match.index
  });
}

console.log('Total named functions:', fns.length);
fns.forEach((f, i) => {
  console.log(`${i}: ${f.name}(${f.args}) at ${f.index}`);
});
