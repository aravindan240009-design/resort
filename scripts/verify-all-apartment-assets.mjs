import fs from 'fs';
import path from 'path';

const assetMap = JSON.parse(fs.readFileSync('extracted/asset-map.json', 'utf8'));
const pagesDir = 'extracted/pages/apartments';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const urlRegex = /(https:\/\/(?:cdn\.prod\.website-files\.com|assets\.era-residence\.com)\/[a-zA-Z0-9_\-\.%~/]+)/g;
const missing = new Set();
let totalFound = 0;

for (const file of files) {
  const html = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  let m;
  while ((m = urlRegex.exec(html)) !== null) {
    let url = m[1].split('&')[0];
    if (url.endsWith('.js') || url.endsWith('.css') || url.includes('/css/') || url.includes('/js/')) {
      continue;
    }
    totalFound++;
    if (!assetMap[url]) {
      missing.add(url);
    } else {
      const local = path.join('public', assetMap[url].replace(/^\//, ''));
      if (!fs.existsSync(local)) {
        missing.add(url + ' (local missing: ' + local + ')');
      }
    }
  }
}

console.log(`Scanned ${files.length} apartment pages.`);
console.log(`Total asset references: ${totalFound}`);
console.log(`Missing or unmapped assets: ${missing.size}`);
if (missing.size > 0) {
  console.log('Sample missing:');
  console.log(Array.from(missing).slice(0, 10));
}
