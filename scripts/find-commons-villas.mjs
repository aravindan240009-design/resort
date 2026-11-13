import fs from 'fs';

async function findVillaImages() {
  const query = 'aerial "modern" villa OR architecture drone pool';
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=50&format=json`;
  const r = await fetch(url, { headers: { 'User-Agent': 'ModernVillaSearch/1.0' } });
  const data = await r.json();
  const titles = (data.query?.search || []).map(s => s.title).filter(t => t.endsWith('.jpg') || t.endsWith('.jpeg') || t.endsWith('.png'));
  console.log('Valid image titles:', titles.length);

  // Now query imageinfo for these titles
  const results = [];
  for (let i = 0; i < titles.length; i += 10) {
    const batch = titles.slice(i, i + 10);
    const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(batch.join('|'))}&prop=imageinfo&iiprop=url|size&format=json`;
    const res = await fetch(infoUrl, { headers: { 'User-Agent': 'ModernVillaSearch/1.0' } });
    const infoData = await res.json();
    const pages = Object.values(infoData.query?.pages || {});
    for (const p of pages) {
      const info = p.imageinfo?.[0];
      if (info && info.width >= 1600) {
        results.push({
          title: p.title,
          url: info.url,
          width: info.width,
          height: info.height
        });
      }
    }
  }

  console.log(`High-res images (>= 1600px): ${results.length}`);
  fs.writeFileSync('scripts/commons_villas.json', JSON.stringify(results, null, 2));
}

findVillaImages();
