import fs from 'fs';

async function run() {
  const queries = [
    'modern-house-drone',
    'aerial-villa-pool',
    'drone-architecture-house',
    'modern-building-aerial-view'
  ];

  const allPhotos = [];

  for (const q of queries) {
    try {
      const r = await fetch(`https://unsplash.com/s/photos/${q}`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
      });
      const html = await r.text();
      const nextData = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
      if (nextData) {
        const json = JSON.parse(nextData[1]);
        const results = json?.props?.pageProps?.initialData?.photos?.results || [];
        console.log(`Query ${q}: found ${results.length} photos`);
        for (const p of results) {
          if (!p.urls?.raw) continue;
          if (p.is_plus || p.premium) continue; // skip premium
          allPhotos.push({
            id: p.id,
            slug: p.slug,
            desc: p.alt_description || p.description,
            raw: p.urls.raw,
            regular: p.urls.regular,
            user: p.user?.name
          });
        }
      }
    } catch (e) {
      console.error(e.message);
    }
  }

  console.log(`Total non-plus photos: ${allPhotos.length}`);
  fs.writeFileSync('scripts/drone_candidates.json', JSON.stringify(allPhotos, null, 2));
}

run();
