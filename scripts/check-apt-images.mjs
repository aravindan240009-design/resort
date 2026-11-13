import fs from 'fs';
import path from 'path';

const aptDir = 'dist/apartments';
const allImgs = new Set();

function checkHtml(file) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(/src="\/assets\/images\/([^"]+)"/g);
  if (matches) {
    matches.forEach(m => {
      const name = m.replace('src="/assets/images/', '').replace('"', '');
      if (!name.endsWith('.svg') && !name.includes('diagram') && !name.includes('landscape')) {
        allImgs.add(name);
      }
    });
  }
}

fs.readdirSync(aptDir).forEach(item => {
  const p = path.join(aptDir, item);
  if (fs.statSync(p).isDirectory()) {
    const idx = path.join(p, 'index.html');
    if (fs.existsSync(idx)) checkHtml(idx);
  }
});

console.log('Distinct photo assets used in apartments:');
Array.from(allImgs).sort().forEach(img => {
  const stats = fs.statSync(path.join('public/assets/images', img));
  console.log(img, stats.mtime.toISOString(), stats.size);
});
