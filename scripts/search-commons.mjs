import fs from 'fs';

async function searchCommons() {
  const query = 'aerial modern luxury villa pool drone';
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=20&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
  
  const res = await fetch(url, { headers: { 'User-Agent': 'ModernVillaBot/1.0' } });
  const data = await res.json();
  const pages = data.query?.pages || {};
  const results = [];
  for (const pageId in pages) {
    const p = pages[pageId];
    const info = p.imageinfo?.[0];
    if (info && (info.url.endsWith('.jpg') || info.url.endsWith('.png') || info.url.endsWith('.jpeg'))) {
      results.push({
        title: p.title,
        url: info.url,
        width: info.width,
        height: info.height,
        desc: info.extmetadata?.ObjectName?.value || p.title
      });
    }
  }
  console.log(`Found ${results.length} results on Wikimedia Commons`);
  fs.writeFileSync('scripts/commons_results.json', JSON.stringify(results, null, 2));
}

searchCommons();
