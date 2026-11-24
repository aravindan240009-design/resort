import { chromium } from 'playwright';

async function checkMobileMetrics() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(1000);

  const metrics = await page.evaluate(() => {
    const inputs = document.querySelectorAll('input, select, textarea');
    let smallInputs = [];
    inputs.forEach(inp => {
      const fs = parseFloat(window.getComputedStyle(inp).fontSize);
      if (fs < 16) {
        smallInputs.push({ name: inp.name || inp.id || inp.placeholder, fs });
      }
    });

    const links = document.querySelectorAll('.link, .btn, .nav-item, .btn-menu, .filter_select_btn');
    let linkMetrics = [];
    links.forEach(l => {
      const r = l.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        linkMetrics.push({
          class: l.className,
          text: l.innerText.trim().slice(0, 20),
          w: Math.round(r.width),
          h: Math.round(r.height)
        });
      }
    });

    return {
      smallInputsCount: smallInputs.length,
      smallInputs,
      sampleLinks: linkMetrics.slice(0, 10)
    };
  });

  console.log(JSON.stringify(metrics, null, 2));
  await browser.close();
}

checkMobileMetrics().catch(console.error);
