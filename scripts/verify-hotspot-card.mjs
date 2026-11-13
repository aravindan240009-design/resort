import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:3005/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);

  // Remove preloader
  await page.evaluate(() => {
    document.querySelectorAll('[data-preloader], [data-master-preloader], .preloader').forEach(el => el.remove());
  });

  const pin = await page.$('[data-modal-tip-btn="light-flow"]');
  if (pin) {
    await pin.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'C:/Users/ashok/.gemini/antigravity/brain/40e031e6-9ab8-40fb-b402-5e891059c713/hotspot_mobile_modal_clicked.png' });
    console.log('SUCCESS: Captured mobile modal click');
  } else {
    console.log('Pin not found on mobile');
  }
  await browser.close();
})();
