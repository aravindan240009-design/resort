import fs from 'fs';
import { chromium } from 'playwright';

async function run() {
  fs.mkdirSync('screenshots/target', { recursive: true });
  const browser = await chromium.launch();

  const pages = [
    { url: 'https://www.era-residence.com/apartments/011', name: 'target-011' },
    { url: 'https://www.era-residence.com/', name: 'target-home' },
    { url: 'https://www.era-residence.com/apartments', name: 'target-apartments' },
    { url: 'https://www.era-residence.com/contact', name: 'target-contact' }
  ];

  for (const p of pages) {
    // 1. Desktop 1440x900
    const deskContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const deskPage = await deskContext.newPage();
    try {
      await deskPage.goto(p.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await deskPage.waitForTimeout(3000);
      await deskPage.screenshot({ path: `screenshots/target/${p.name}-desktop.png` });
      console.log(`Saved screenshots/target/${p.name}-desktop.png`);
    } catch (e) {
      console.error(`Error desktop ${p.url}:`, e.message);
    }
    await deskContext.close();

    // 2. Mobile 390x844 (iPhone 14)
    const mobContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
    });
    const mobPage = await mobContext.newPage();
    try {
      await mobPage.goto(p.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await mobPage.waitForTimeout(3000);
      await mobPage.screenshot({ path: `screenshots/target/${p.name}-mobile.png` });
      console.log(`Saved screenshots/target/${p.name}-mobile.png`);
    } catch (e) {
      console.error(`Error mobile ${p.url}:`, e.message);
    }
    await mobContext.close();
  }

  await browser.close();
}

run();
