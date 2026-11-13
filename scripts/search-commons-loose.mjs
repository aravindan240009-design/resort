import fs from 'fs';

async function searchCommons() {
  const terms = ['"aerial view" villa', '"drone" villa modern', '"birds eye" house modern', 'villa "aerial photograph"'];
  for (const term of terms) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(term)}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const data = await res.json();
      const pages = data.query?.pages || {};
      const list = Object.values(pages).map(p => ({
        title: p.title,
        url: p.imageinfo?.[0]?.url,
        width: p.imageinfo?.[0]?.width,
        height: p.imageinfo?.[0]?.height
      })).filter(x => x.url && (x.url.endsWith('.jpg') || x.url.endsWith('.jpeg')));
      console.log(`Term "${term}": found ${list.length} images`);
      if (list.length > 0) {
        fs.writeFileSync(`scripts/commons_${term.replace(/[^a-z0-9]/gi, '_')}.json`, JSON.stringify(list, null, 2));
      }
    } catch (e) {
      console.error(e);
    }
  }
}
searchCommons();
