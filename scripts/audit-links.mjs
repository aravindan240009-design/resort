import fs from 'fs';
import path from 'path';

function walk(dir) {
  let res = [];
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) res = res.concat(walk(full));
    else if (file.endsWith('.html')) res.push(full);
  });
  return res;
}

const allHrefs = new Set();
const hrefByFile = {};

walk('dist').forEach(f => {
  const text = fs.readFileSync(f, 'utf8');
  const matches = [...text.matchAll(/href=["']([^"']*)["']/g)].map(m => m[1]);
  matches.forEach(href => {
    allHrefs.add(href);
    hrefByFile[href] = (hrefByFile[href] || 0) + 1;
  });
});

console.log('Unique hrefs count:', allHrefs.size);
console.log('All unique hrefs:');
for (const href of Array.from(allHrefs).sort()) {
  console.log(`- ${href} (${hrefByFile[href]} occurrences)`);
}
