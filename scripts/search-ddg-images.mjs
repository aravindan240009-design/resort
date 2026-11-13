import fs from 'fs';

async function searchDDG() {
  const query = 'luxury modern villa aerial drone view';
  // DuckDuckGo token
  const reqUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&iax=images&ia=images`;
  const res = await fetch(reqUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  const html = await res.text();
  const vqdMatch = html.match(/vqd=['"]?([^&'"]+)/);
  if (!vqdMatch) {
    console.log('No VQD found');
    return;
  }
  const vqd = vqdMatch[1];
  console.log('Found vqd:', vqd);

  const imgApiUrl = `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(query)}&vqd=${vqd}&f=,,,type:photo,aspect:wide&p=1`;
  const imgRes = await fetch(imgApiUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'Referer': 'https://duckduckgo.com/'
    }
  });
  const imgData = await imgRes.json();
  const results = (imgData.results || []).map(r => ({
    title: r.title,
    image: r.image,
    width: r.width,
    height: r.height,
    source: r.source
  }));
  console.log(`Found ${results.length} images from DDG!`);
  fs.writeFileSync('scripts/ddg_results.json', JSON.stringify(results, null, 2));
}

searchDDG().catch(console.error);
