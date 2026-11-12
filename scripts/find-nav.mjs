import fs from 'fs';

const html = fs.readFileSync('extracted/pages/index.html', 'utf8');
const navMatches = Array.from(html.matchAll(/class="[^"]*(?:nav|header)[^"]*"/gi)).map(m => m[0]);
console.log('Nav classes found:', [...new Set(navMatches)].slice(0, 20));
