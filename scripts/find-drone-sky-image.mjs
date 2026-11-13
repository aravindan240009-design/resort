import fs from 'fs';

async function run() {
  const query = 'aerial modern luxury villa architecture drone looking down pool';
  // Let's search Unsplash API/search page
  const searchUrl = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=20`;
  try {
    const res = await fetch(searchUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    const data = await res.json();
    console.log('Results count:', data.results?.length || 0);
    const urls = [];
    for (const item of (data.results || [])) {
      urls.push({
        id: item.id,
        desc: item.alt_description || item.description,
        regular: item.urls?.regular,
        full: item.urls?.full,
        raw: item.urls?.raw
      });
    }
    fs.writeFileSync('scripts/aerial_candidates.json', JSON.stringify(urls, null, 2));
    console.log('Wrote', urls.length, 'candidates');
  } catch (err) {
    console.error('Error fetching:', err);
  }
}

run();
