import { chromium } from 'playwright';

async function capture() {
  console.log('Capturing screenshots of updated hero & images...');
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1440x900
  const deskContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const deskPage = await deskContext.newPage();
  await deskPage.addInitScript(() => sessionStorage.setItem('hasVisited', 'true'));

  await deskPage.goto('http://localhost:3005/', { waitUntil: 'networkidle' });
  await deskPage.waitForTimeout(1000);

  // Hero Screenshot Desktop
  await deskPage.screenshot({ path: 'screenshots/updated-hero-desktop.png' });
  console.log('Saved screenshots/updated-hero-desktop.png');

  // Hero Title inspection
  const heroText = await deskPage.evaluate(() => {
    const h1 = document.querySelector('.hero-s_logo h1');
    const h2 = document.querySelector('.hero-s_logo_a h2');
    const deskBadge = document.querySelector('.header-logo_bg.b-desk textPath');
    return {
      h1: h1 ? h1.innerText.trim() : null,
      h2: h2 ? h2.innerText.trim() : null,
      badge: deskBadge ? deskBadge.textContent.trim() : null
    };
  });
  console.log('Desktop Hero Text:', heroText);

  // Scroll to villa / pool section (~1800)
  await deskPage.evaluate(() => window.scrollTo(0, 1800));
  await deskPage.waitForTimeout(800);
  await deskPage.screenshot({ path: 'screenshots/updated-pool-desktop.png' });
  console.log('Saved screenshots/updated-pool-desktop.png');

  // 2. Mobile 440x956
  const mobContext = await browser.newContext({ viewport: { width: 440, height: 956 } });
  const mobPage = await mobContext.newPage();
  await mobPage.addInitScript(() => sessionStorage.setItem('hasVisited', 'true'));

  await mobPage.goto('http://localhost:3005/', { waitUntil: 'networkidle' });
  await mobPage.waitForTimeout(1000);
  await mobPage.screenshot({ path: 'screenshots/updated-hero-mobile.png' });
  console.log('Saved screenshots/updated-hero-mobile.png');

  await browser.close();
  console.log('Finished capturing!');
}

capture().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
