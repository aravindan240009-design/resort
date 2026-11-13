import fs from 'fs';

const pages = ['index.html', 'apartments.html', 'contact.html', 'coming-soon.html'];
const pageImages = {};

for (const p of pages) {
  if (!fs.existsSync(p)) continue;
  const html = fs.readFileSync(p, 'utf8');
  const regex = /(?:src|srcset|poster)=["']([^"']+\.(?:webp|jpg|jpeg|png|avif))(?:\s+[^"']*)?["']/gi;
  const imgs = new Set();
  let m;
  while ((m = regex.exec(html)) !== null) {
    // Only local assets
    if (m[1].startsWith('/assets/images/')) {
      imgs.add(m[1].split(' ')[0]);
    }
  }
  pageImages[p] = Array.from(imgs);
}

for (const [page, imgs] of Object.entries(pageImages)) {
  console.log(`\n=== ${page} (${imgs.length} images) ===`);
  for (const img of imgs) {
    const full = 'public' + img;
    const size = fs.existsSync(full) ? Math.round(fs.statSync(full).size / 1024) + ' KB' : 'MISSING';
    console.log(`  ${img} [${size}]`);
  }
}
