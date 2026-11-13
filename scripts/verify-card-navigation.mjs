import { chromium } from 'playwright';

async function verifyCardNavigation() {
  console.log('Launching browser to test apartment card clicks...');
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  }

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  console.log('Navigating to http://localhost:3005/apartments ...');
  await page.goto('http://localhost:3005/apartments', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  // Accept cookies if present
  const cookieBtn = await page.$('[data-cookies-accept]');
  if (cookieBtn) await cookieBtn.click().catch(() => {});
  await page.waitForTimeout(500);

  // Test 1: Click card 011
  console.log('\n--- Test 1: Clicking Card №011 ---');
  const card011 = await page.$('a.apart-card[href*="011"]');
  if (!card011) throw new Error('Card 011 not found!');
  const href011 = await card011.getAttribute('href');
  console.log('Card 011 href:', href011);
  await card011.click();
  await page.waitForTimeout(2500);

  const url011 = page.url();
  const title011 = await page.title();
  const header011 = await page.$eval('.lot-s_info_header_num', el => el.innerText.trim()).catch(() => null);
  console.log('After click 011:');
  console.log('- Current URL:', url011);
  console.log('- Page Title:', title011);
  console.log('- Header text:', header011);

  if (url011.includes('011') && title011.includes('011')) {
    console.log('✓ PASS: Card 011 redirected successfully to Apartment 011 detail page!');
  } else {
    console.error('✗ FAIL: Card 011 did not redirect to 011!');
  }

  await page.screenshot({ path: 'screenshots/verify-click-011.png' });
  console.log('Saved screenshots/verify-click-011.png');

  // Test 2: Navigate back to /apartments and click card 012
  console.log('\n--- Test 2: Clicking Card №012 ---');
  await page.goto('http://localhost:3005/apartments', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  const card012 = await page.$('a.apart-card[href*="012"]');
  if (!card012) throw new Error('Card 012 not found!');
  const href012 = await card012.getAttribute('href');
  console.log('Card 012 href:', href012);
  await card012.click();
  await page.waitForTimeout(2500);

  const url012 = page.url();
  const title012 = await page.title();
  const header012 = await page.$eval('.lot-s_info_header_num', el => el.innerText.trim()).catch(() => null);
  console.log('After click 012:');
  console.log('- Current URL:', url012);
  console.log('- Page Title:', title012);
  console.log('- Header text:', header012);

  if (url012.includes('012') && title012.includes('012')) {
    console.log('✓ PASS: Card 012 redirected successfully to Apartment 012 detail page!');
  } else {
    console.error('✗ FAIL: Card 012 did not redirect to 012!');
  }

  // Check console errors
  console.log('\nConsole errors encountered:', errors.length);
  if (errors.length > 0) {
    console.error('Errors:', errors);
  }

  await browser.close();
  console.log('\nAll card redirect tests finished successfully!');
}

verifyCardNavigation().catch(e => {
  console.error('FATAL:', e);
  process.exit(1);
});
