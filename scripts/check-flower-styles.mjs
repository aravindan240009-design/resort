import { chromium } from 'playwright';

async function checkFlowerStyles() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 440, height: 956 } });
  await page.addInitScript(() => sessionStorage.setItem('hasVisited', 'true'));
  await page.goto('http://localhost:3005/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  const info = await page.evaluate(() => {
    const el = document.querySelector('.flower.loc-info');
    if (!el) return null;
    const style = window.getComputedStyle(el);
    const video = el.querySelector('video');
    const vStyle = video ? window.getComputedStyle(video) : null;
    return {
      el: {
        bg: style.backgroundColor,
        bgImg: style.backgroundImage,
        zIndex: style.zIndex,
        mixBlendMode: style.mixBlendMode,
        position: style.position,
        opacity: style.opacity
      },
      video: vStyle ? {
        bg: vStyle.backgroundColor,
        objectFit: vStyle.objectFit,
        poster: video.getAttribute('poster'),
        currentSrc: video.currentSrc,
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight
      } : null
    };
  });

  console.log('Flower computed styles:', info);
  await browser.close();
}

checkFlowerStyles();
