import fs from 'fs';

const html = fs.readFileSync('extracted/pages/index.html', 'utf8');
const regex = /<div[^>]+class="([^"]*)"[^>]*>/g;
let m;
const classes = new Set();
while ((m = regex.exec(html)) !== null) {
  const cls = m[1].split(' ')[0];
  if (cls.endsWith('-w') || cls.endsWith('-s') || cls.includes('preloader') || cls.includes('nav') || cls.includes('modal') || cls.includes('cookies')) {
    classes.add(m[0]);
  }
}

console.log('Key container elements:');
Array.from(classes).slice(0, 30).forEach(c => console.log(' ', c));
