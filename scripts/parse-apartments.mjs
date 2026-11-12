import fs from 'fs';

const html = fs.readFileSync('extracted/pages/apartments.html', 'utf8');

// Find all elements with class containing 'apart-card'
// Look for items inside apart-cms or role="listitem"
const items = [];
const itemRegex = /<div role="listitem" class="w-dyn-item">([\s\S]*?)<\/div>\s*<\/div>/g;

// Let's inspect w-dyn-item occurrences
const matches = html.match(/<div role="listitem" class="w-dyn-item">/g);
console.log('w-dyn-item occurrences:', matches ? matches.length : 0);

// Let's find apart-card occurrences
const apartMatches = html.match(/class="apart-card/g);
console.log('apart-card occurrences:', apartMatches ? apartMatches.length : 0);

// Let's extract each apartment card info
// In Webflow, each apart-card has:
// data-type, unit number (e.g. №011), block, floor, beds, area, terrace area, price/status, image, etc.
const cardRegex = /<a[^>]*class="[^"]*apart-card[^"]*"[^>]*>([\s\S]*?)<\/a>/g;
let m;
while ((m = cardRegex.exec(html)) !== null) {
  const cardHtml = m[0];
  const unitMatch = cardHtml.match(/№\s*([0-9]+)/i);
  const titleMatch = cardHtml.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i);
  const blockMatch = cardHtml.match(/Block\s*([A-Za-z0-9]+)/i);
  const floorMatch = cardHtml.match(/([0-9]+)\s*floor/i);
  const bedMatch = cardHtml.match(/([0-9]+)\s*bed/i);
  const areaMatch = cardHtml.match(/([0-9]+)\s*m²/i);
  const terraceMatch = cardHtml.match(/\+\s*([0-9]+)\s*M²\s*Terrace/i);
  const completionMatch = cardHtml.match(/Completion:\s*([^<]+)/i);
  const hrefMatch = cardHtml.match(/href="([^"]+)"/i);
  const imgMatch = cardHtml.match(/<img[^>]+src="([^"]+)"/i);

  items.push({
    unit: unitMatch ? unitMatch[1] : null,
    title: titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : null,
    block: blockMatch ? blockMatch[1] : null,
    floor: floorMatch ? floorMatch[1] : null,
    beds: bedMatch ? parseInt(bedMatch[1]) : null,
    area: areaMatch ? parseInt(areaMatch[1]) : null,
    terrace: terraceMatch ? parseInt(terraceMatch[1]) : null,
    completion: completionMatch ? completionMatch[1].trim() : null,
    href: hrefMatch ? hrefMatch[1] : null,
    image: imgMatch ? imgMatch[1] : null,
    rawCardHtml: cardHtml
  });
}

console.log('Parsed items count:', items.length);
if (items.length > 0) {
  console.log('First parsed item:', JSON.stringify(items[0], null, 2));
}

fs.mkdirSync('data', { recursive: true });
fs.writeFileSync('data/apartments.json', JSON.stringify(items, null, 2));
console.log('Saved data/apartments.json');
