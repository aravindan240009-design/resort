import fs from 'fs';

const pages = ['index.html', 'apartments.html', 'contact.html', 'coming-soon.html'];
for (const p of pages) {
  const html = fs.readFileSync(p, 'utf8');
  const external = Array.from(html.matchAll(/https?:\/\/[^\s"')]+/g)).map(m => m[0]);
  const cdn = external.filter(u => u.includes('cdn.prod.website-files.com') || u.includes('assets.slater.app') || u.includes('assets.era-residence.com'));
  console.log(p, 'Total external URLs:', external.length, 'CDN/Slater remaining:', cdn.length);
  if (cdn.length > 0) {
    console.log('  Samples:', cdn.slice(0, 5));
  }
}
