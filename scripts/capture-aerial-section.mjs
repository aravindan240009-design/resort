import { chromium } from 'playwright';
import path from 'path';

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3005/', { waitUntil: 'networkidle' });
  
  // Wait 5.5s for preloader to animate out
  await page.waitForTimeout(5500);

  // Scroll down to the gated community section
  await page.evaluate(() => {
    const el = document.querySelector('.hero-w') || document.querySelector('[data-day-night]') || document.querySelector('.section-gated-community');
    if (el) {
      el.scrollIntoView({ behavior: 'instant', block: 'center' });
    } else {
      window.scrollTo(0, 3200);
    }
  });

  await page.waitForTimeout(2000);

  const artDir = 'C:\\Users\\ashok\\.gemini\\antigravity\\brain\\40e031e6-9ab8-40fb-b402-5e891059c713';
  await page.screenshot({ path: path.join(artDir, 'aerial_sky_building_view_day.png') });
  console.log('Saved aerial_sky_building_view_day.png');

  // Click "BY NIGHT" toggle
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('*'));
    const nightBtn = btns.find(b => b.textContent && b.textContent.trim().toUpperCase() === 'BY NIGHT');
    if (nightBtn) nightBtn.click();
  });

  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(artDir, 'aerial_sky_building_view_night.png') });
  console.log('Saved aerial_sky_building_view_night.png');

  await browser.close();
}

capture().catch(console.error);
