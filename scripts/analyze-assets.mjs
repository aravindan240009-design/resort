import fs from 'fs';

async function check() {
  const pages = [
    'https://www.era-residence.com/',
    'https://www.era-residence.com/apartments',
    'https://www.era-residence.com/contact'
  ];
  const allUrls = new Set();
  for (const p of pages) {
    const html = await (await fetch(p)).text();
    const matches = Array.from(html.matchAll(/https:\/\/cdn\.prod\.website-files\.com\/[^\s"')]+/g)).map(m => m[0]);
    matches.forEach(u => allUrls.add(u));
  }
  console.log('Total unique CDN asset URLs found:', allUrls.size);
  const byExt = {};
  for (const u of allUrls) {
    const ext = u.split('.').pop().split('?')[0].toLowerCase();
    byExt[ext] = (byExt[ext] || 0) + 1;
  }
  console.log('Extensions:', byExt);
}
check();
