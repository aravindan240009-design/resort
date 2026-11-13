import { chromium } from 'playwright';

async function check() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const resp = await page.goto('https://unsplash.com/s/photos/modern-villa-aerial', { waitUntil: 'load', timeout: 30000 });
  console.log('Status:', resp.status());
  console.log('Title:', await page.title());
  console.log('URL:', page.url());
  await browser.close();
}
check();
