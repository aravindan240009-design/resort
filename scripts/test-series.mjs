async function testSeries() {
  const base = 1600585154363;
  for (let offset = -50; offset <= 50; offset += 5) {
    const id = base + offset;
    const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (res.status === 200) {
        console.log(`Found photo-${id}:`, url);
      }
    } catch (e) {}
  }
}
testSeries();
