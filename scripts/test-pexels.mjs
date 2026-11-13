async function testPexels() {
  const r = await fetch('https://www.pexels.com/search/aerial%20luxury%20villa/', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  console.log('Status:', r.status);
  const text = await r.text();
  console.log('Length:', text.length);
  const imgMatches = text.match(/https:\/\/images\.pexels\.com\/photos\/[0-9]+\/pexels-photo-[0-9]+\.jpeg\?[^"'\s]+/g) || [];
  console.log('Pexels images found:', imgMatches.length);
  const unique = [...new Set(imgMatches)];
  console.log('Unique first 5:', unique.slice(0, 5));
}
testPexels();
