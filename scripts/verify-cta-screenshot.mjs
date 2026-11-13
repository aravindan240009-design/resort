import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3005/', { waitUntil: 'networkidle' });
  
  // Wait for preloader animation to finish
  await page.waitForTimeout(4000);
  await page.evaluate(() => {
    document.querySelectorAll('[data-preloader], [data-master-preloader], .preloader').forEach(el => el.remove());
    document.body.style.overflow = 'auto';
  });

  const cta = await page.$('.cta-w');
  if (cta) {
    await cta.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'C:/Users/ashok/.gemini/antigravity/brain/40e031e6-9ab8-40fb-b402-5e891059c713/cta_section_updated.png' });
    console.log('SUCCESS: Captured screenshot of updated CTA section');
  } else {
    console.log('ERROR: CTA section not found');
  }
  await browser.close();
})();
