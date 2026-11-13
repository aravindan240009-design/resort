import fs from 'fs';

async function run() {
  const r = await fetch(`https://unsplash.com/s/photos/modern-house`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  const html = await r.text();
  console.log('HTML length:', html.length);
  // look for image links like https://images.unsplash.com/photo-
  const matches = [...html.matchAll(/https:\/\/images\.unsplash\.com\/(photo-[a-zA-Z0-9_-]+)/g)];
  console.log('Photo matches:', matches.length);
  const ids = [...new Set(matches.map(m => m[1]))];
  console.log('Unique photo IDs:', ids.slice(0, 15));
  fs.writeFileSync('scripts/unsplash_ids.json', JSON.stringify(ids, null, 2));
}

run();
