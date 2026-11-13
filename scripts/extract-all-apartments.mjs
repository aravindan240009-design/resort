import fs from 'fs';
import path from 'path';

const slugs = [
  '011', '012', '031', '032', '033', '034',
  '111', '112', '113', '114', '121', '122',
  '123', '124', '131', '132', '133', '134',
  '211', '212', '213', '221', '222', '223',
  '224'
];

async function run() {
  fs.mkdirSync('extracted/pages/apartments', { recursive: true });

  console.log(`Starting extraction of ${slugs.length} apartment pages...`);
  for (const slug of slugs) {
    const file = path.join('extracted/pages/apartments', `${slug}.html`);
    if (fs.existsSync(file) && fs.statSync(file).size > 10000) {
      console.log(`Apartment ${slug} already extracted (${fs.statSync(file).size} bytes)`);
      continue;
    }
    const url = `https://www.era-residence.com/apartments/${slug}`;
    try {
      console.log(`Fetching ${url}...`);
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`Failed ${url}: HTTP ${res.status}`);
        continue;
      }
      const text = await res.text();
      fs.writeFileSync(file, text, 'utf8');
      console.log(`Saved ${file} (${text.length} bytes)`);
    } catch (e) {
      console.error(`Error fetching ${url}:`, e.message);
    }
  }
  console.log('Finished apartment pages extraction.');
}

run();
