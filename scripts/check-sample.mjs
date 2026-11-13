import fs from 'fs';

async function check() {
  const r = await fetch('https://unsplash.com/s/photos/drone-house', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5'
    }
  });
  console.log('Status:', r.status);
  const text = await r.text();
  console.log('Length:', text.length);
  fs.writeFileSync('scripts/unsplash_sample.html', text);
}
check();
