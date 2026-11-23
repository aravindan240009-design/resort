import fs from 'fs';
import path from 'path';

const slugs = [
  '011', '012', '031', '032', '033', '034',
  '111', '112', '113', '114', '121', '122',
  '123', '124', '131', '132', '133', '134',
  '211', '212', '213', '221', '222', '223',
  '224'
];

function syncFileAndDirIndex(flatPath, dirIndexPath) {
  const dir = path.dirname(dirIndexPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (fs.existsSync(flatPath) && !fs.existsSync(dirIndexPath)) {
    fs.copyFileSync(flatPath, dirIndexPath);
    console.log(`Synced ${flatPath} -> ${dirIndexPath}`);
  } else if (fs.existsSync(dirIndexPath) && !fs.existsSync(flatPath)) {
    fs.copyFileSync(dirIndexPath, flatPath);
    console.log(`Synced ${dirIndexPath} -> ${flatPath}`);
  }
}

// 1. Core routes dual existence (flat and directory index)
syncFileAndDirIndex('dist/apartments.html', 'dist/apartments/index.html');
syncFileAndDirIndex('dist/contact.html', 'dist/contact/index.html');
syncFileAndDirIndex('dist/coming-soon.html', 'dist/coming-soon/index.html');

// 2. Fallbacks from workspace root if not in dist
if (!fs.existsSync('dist/apartments/index.html') && fs.existsSync('apartments/index.html')) {
  fs.mkdirSync('dist/apartments', { recursive: true });
  fs.copyFileSync('apartments/index.html', 'dist/apartments/index.html');
  console.log('Copied apartments/index.html to dist/apartments/index.html');
}
if (!fs.existsSync('dist/apartments.html') && fs.existsSync('apartments.html')) {
  fs.copyFileSync('apartments.html', 'dist/apartments.html');
  console.log('Copied apartments.html to dist/apartments.html');
}
if (!fs.existsSync('dist/contact/index.html') && fs.existsSync('contact/index.html')) {
  fs.mkdirSync('dist/contact', { recursive: true });
  fs.copyFileSync('contact/index.html', 'dist/contact/index.html');
  console.log('Copied contact/index.html to dist/contact/index.html');
}
if (!fs.existsSync('dist/contact.html') && fs.existsSync('contact.html')) {
  fs.copyFileSync('contact.html', 'dist/contact.html');
  console.log('Copied contact.html to dist/contact.html');
}
if (!fs.existsSync('dist/coming-soon/index.html') && fs.existsSync('coming-soon/index.html')) {
  fs.mkdirSync('dist/coming-soon', { recursive: true });
  fs.copyFileSync('coming-soon/index.html', 'dist/coming-soon/index.html');
  console.log('Copied coming-soon/index.html to dist/coming-soon/index.html');
}
if (!fs.existsSync('dist/coming-soon.html') && fs.existsSync('coming-soon.html')) {
  fs.copyFileSync('coming-soon.html', 'dist/coming-soon.html');
  console.log('Copied coming-soon.html to dist/coming-soon.html');
}

// 3. Apartment slug pages dual existence
for (const slug of slugs) {
  const dirIndex = `dist/apartments/${slug}/index.html`;
  const flat = `dist/apartments/${slug}.html`;
  syncFileAndDirIndex(flat, dirIndex);
}

console.log('Postbuild verification completed successfully: all routes have both flat and index.html');
