async function testMediaWiki() {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=aerial+villa&srnamespace=6&format=json';
  const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
  const data = await r.json();
  console.log('Total hits:', data.query?.searchinfo?.totalhits);
  console.log('First 5:', data.query?.search?.slice(0, 5).map(s => s.title));
}
testMediaWiki();
