import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const links = Array.from(html.matchAll(/<(link|script)[^>]+(href|src)=["']([^"']+)["'][^>]*>/gi));
links.forEach(l => {
  console.log(`${l[1]} -> ${l[3]}`);
});
