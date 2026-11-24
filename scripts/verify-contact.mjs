import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const vps = [1024, 1280, 1440, 1920];
  for (const w of vps) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    await page.goto('http://localhost:5173/contact');
    await page.waitForTimeout(1000);
    const scrollW = await page.evaluate(() => document.body.scrollWidth);
    const winW = await page.evaluate(() => window.innerWidth);
    const pass = scrollW <= winW;
    console.log(`Viewport ${w}px -> body scrollWidth: ${scrollW}, window: ${winW}, diff: ${scrollW - winW} (Overflow: ${pass ? 'PASS' : 'FAIL'})`);
    await page.close();
  }
  await browser.close();
}

run().catch(console.error);
