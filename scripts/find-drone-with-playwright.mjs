import { chromium } from 'playwright';
import fs from 'fs';

async function findDroneImage() {
  console.log('Launching browser to find drone luxury villa images...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Navigate to unsplash search for drone modern villa
  await page.goto('https://unsplash.com/s/photos/modern-villa-aerial', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);
  
  const images = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img[src*="images.unsplash.com/photo-"]'));
    return imgs.map(img => {
      const src = img.src;
      // Extract clean photo base URL
      const baseMatch = src.match(/https:\/\/images\.unsplash\.com\/(photo-[a-zA-Z0-9_-]+)/);
      return {
        src: src,
        base: baseMatch ? baseMatch[0] : null,
        alt: img.alt || ''
      };
    }).filter(x => x.base);
  });

  console.log(`Found ${images.length} Unsplash images!`);
  const unique = [];
  const seen = new Set();
  for (const item of images) {
    if (!seen.has(item.base)) {
      seen.add(item.base);
      unique.push(item);
    }
  }

  console.log(`Unique photos: ${unique.length}`);
  fs.writeFileSync('scripts/playwright_unsplash.json', JSON.stringify(unique, null, 2));

  await browser.close();
}

findDroneImage().catch(console.error);
