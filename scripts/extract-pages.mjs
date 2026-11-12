import fs from 'fs';
import path from 'path';

const pages = [
  { url: 'https://www.era-residence.com/', filename: 'index.html' },
  { url: 'https://www.era-residence.com/apartments', filename: 'apartments.html' },
  { url: 'https://www.era-residence.com/contact', filename: 'contact.html' },
  { url: 'https://www.era-residence.com/coming-soon', filename: 'coming-soon.html' }
];

async function extractPages() {
  fs.mkdirSync('extracted/pages', { recursive: true });
  for (const p of pages) {
    try {
      console.log('Fetching', p.url);
      const res = await fetch(p.url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const html = await res.text();
      fs.writeFileSync(path.join('extracted/pages', p.filename), html, 'utf8');
      console.log('Saved', p.filename, 'length:', html.length);
    } catch (e) {
      console.error('Error fetching', p.url, e.message);
    }
  }
}

extractPages();
