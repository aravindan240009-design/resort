import fs from 'fs';

const js = fs.readFileSync('src/scripts/main.js', 'utf8');
const urls = Array.from(js.matchAll(/https?:\/\/[^\s"')]+/g)).map(m => m[0]);
console.log('URLs in src/scripts/main.js:', urls);
