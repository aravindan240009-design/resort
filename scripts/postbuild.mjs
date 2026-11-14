import fs from 'fs';
import path from 'path';

// 1. Ensure dist/apartments/index.html exists
if (fs.existsSync('dist/apartments.html')) {
  fs.mkdirSync('dist/apartments', { recursive: true });
  fs.copyFileSync('dist/apartments.html', 'dist/apartments/index.html');
  console.log('Copied dist/apartments.html to dist/apartments/index.html');
}

// 2. Ensure dist/apartments/index.html exists from root if dist/apartments.html missing
if (fs.existsSync('apartments/index.html') && !fs.existsSync('dist/apartments/index.html')) {
  fs.mkdirSync('dist/apartments', { recursive: true });
  fs.copyFileSync('apartments/index.html', 'dist/apartments/index.html');
  console.log('Copied apartments/index.html to dist/apartments/index.html');
}
