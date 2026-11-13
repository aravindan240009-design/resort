import fs from 'fs';

async function testDownload() {
  const ids = [
    '1600585154340-be6161a56a0c',
    '1512917774080-9991f1c4c750',
    '1600596542815-ffad4c1539a9',
    '1613977257363-707ba9348227',
    '1600585152220-90363fe7e115',
    '1584622650111-993a426fbf0a',
    '1600607687939-ce8a6c25118c'
  ];
  for (const id of ids) {
    const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;
    const res = await fetch(url);
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(`scripts/test_${id}.jpg`, buf);
      console.log(`Saved ${id} (${buf.length} bytes)`);
    }
  }
}
testDownload();
