import { chromium } from 'playwright';

async function verifyFullTemplate() {
  console.log('--- Launching Playwright Mobile & Desktop Verification ---');
  const browser = await chromium.launch({ headless: true });

  const consoleLogs = [];
  const pageErrors = [];

  // 1. Mobile Verification on iPhone 16 Pro Max viewport (440 x 956)
  const mobileContext = await browser.newContext({
    viewport: { width: 440, height: 956 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'
  });
  const page = await mobileContext.newPage();

  page.on('console', msg => consoleLogs.push({ type: msg.type(), text: msg.text() }));
  page.on('pageerror', err => pageErrors.push(err.message));

  // Bypass preloader on visit
  await page.addInitScript(() => sessionStorage.setItem('hasVisited', 'true'));

  console.log('1. Loading Home Page on Mobile (440x956)...');
  await page.goto('http://localhost:3005/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Take screenshot of mobile top
  await page.screenshot({ path: 'screenshots/mobile-verified-hero.png' });

  // Scroll to loc-info section (~3600)
  await page.evaluate(() => window.scrollTo(0, 3600));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/mobile-verified-flowers-3600.png' });

  // Scroll to coast wave path (~5200)
  await page.evaluate(() => window.scrollTo(0, 5200));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/mobile-verified-wave-5200.png' });

  // Scroll to apart-info section (~8300)
  await page.evaluate(() => window.scrollTo(0, 8300));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/mobile-verified-flowers-8300.png' });

  // Check flower computed styles
  const flowerStyles = await page.evaluate(() => {
    const flowers = Array.from(document.querySelectorAll('.flower'));
    return flowers.map(f => {
      const cs = window.getComputedStyle(f);
      return {
        className: f.className,
        mixBlendMode: cs.mixBlendMode,
        zIndex: cs.zIndex,
        pointerEvents: cs.pointerEvents
      };
    });
  });
  console.log('Mobile Flowers Computed Styles:', flowerStyles);

  // 2. Test Apartment 033 Direct Route
  console.log('2. Loading /apartments/033/ on Mobile...');
  await page.goto('http://localhost:3005/apartments/033/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/mobile-verified-033.png' });

  const title033 = await page.evaluate(() => document.title);
  console.log('Page Title for 033:', title033);

  // 3. Test Apartment Navigation from Catalog (/apartments/)
  console.log('3. Loading /apartments/ and testing card navigation...');
  await page.goto('http://localhost:3005/apartments/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Check card link targets
  const cardHref011 = await page.evaluate(() => {
    const card = document.querySelector('a[href*="/apartments/011"]');
    return card ? card.getAttribute('href') : null;
  });
  console.log('Card href for №011:', cardHref011);

  // Click card for №011
  await page.click('a[href*="/apartments/011"]');
  await page.waitForTimeout(1500);

  const currentUrl = page.url();
  console.log('Current URL after card click:', currentUrl);
  await page.screenshot({ path: 'screenshots/mobile-verified-card-click-011.png' });

  // 4. Test Preloader text on fresh session (Desktop)
  console.log('4. Verifying Splash / Preloader Screen on fresh visit...');
  const deskContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const deskPage = await deskContext.newPage();
  // Do NOT set sessionStorage so preloader runs
  await deskPage.goto('http://localhost:3005/', { waitUntil: 'domcontentloaded' });
  await deskPage.waitForTimeout(400);

  const preloaderText = await deskPage.evaluate(() => {
    const logo = document.querySelector('.preloader_logo');
    const titleL = document.querySelector('.preloader_title-l');
    const titleR = document.querySelector('.preloader_title-r');
    const p = document.querySelector('.preloader_b p');
    return {
      logo: logo ? logo.innerText.trim() : null,
      titleL: titleL ? titleL.innerText.trim() : null,
      titleR: titleR ? titleR.innerText.trim() : null,
      desc: p ? p.innerText.trim() : null
    };
  });
  console.log('Preloader Branding:', preloaderText);
  await deskPage.screenshot({ path: 'screenshots/verified-preloader.png' });

  // 5. Check Console Errors and Watermarks
  console.log('5. Checking Console Errors & Logs:');
  console.log('Page Errors count:', pageErrors.length);
  if (pageErrors.length > 0) {
    console.error('Page errors encountered:', pageErrors);
  }

  const creditLogs = consoleLogs.filter(l => 
    l.text.includes('Chopei') || 
    l.text.includes('THEFIRSTTHELAST') || 
    l.text.includes('Stepenko')
  );
  console.log('Credit / Watermark console logs count:', creditLogs.length);

  await browser.close();
  console.log('--- Verification Finished ---');
}

verifyFullTemplate().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
