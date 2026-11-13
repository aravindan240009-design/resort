import { chromium } from 'playwright';

async function captureFlowerSection() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 440, height: 956 } });
  await page.addInitScript(() => sessionStorage.setItem('hasVisited', 'true'));
  await page.goto('http://localhost:3005/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Scroll to loc-info (top: 3780)
  await page.evaluate(() => window.scrollTo(0, 3600));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/actual-flower-3600.png' });
  console.log('Saved actual-flower-3600.png');

  // Scroll to apart-info (top: 8400)
  await page.evaluate(() => window.scrollTo(0, 8300));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/actual-flower-8300.png' });
  console.log('Saved actual-flower-8300.png');

  await browser.close();
}

captureFlowerSection();
