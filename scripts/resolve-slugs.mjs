async function resolveSlugs() {
  const ids = [
    '4M3z9p0rHoQ',
    'cb235d6e117e',
    'EIxaW82h-HcU',
    'Ey4vfPaFf29',
    'A8EgC5oghlc',
    '510c1c99cafe'
  ];

  for (const id of ids) {
    try {
      // Test fetching photo page to extract raw image URL
      const res = await fetch(`https://unsplash.com/photos/${id}`, {
        headers: { 'User-Agent': 'curl/7.68.0' }
      });
      console.log(`ID ${id} status:`, res.status);
      const text = await res.text();
      const match = text.match(/https:\/\/images\.unsplash\.com\/(photo-[a-zA-Z0-9_-]+)/);
      if (match) {
        console.log(`Resolved ${id} -> ${match[0]}`);
      }
    } catch (e) {
      console.error(id, e.message);
    }
  }
}
resolveSlugs();
