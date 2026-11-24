import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const VIEWPORTS = [
  { name: '320px-xs-mobile', width: 320, height: 640 },
  { name: '360px-sm-android', width: 360, height: 740 },
  { name: '375px-std-mobile', width: 375, height: 667 },
  { name: '390px-modern-iphone', width: 390, height: 844 },
  { name: '393px-modern-android-iphone', width: 393, height: 852 },
  { name: '414px-lg-mobile', width: 414, height: 896 },
  { name: '430px-lg-iphone', width: 430, height: 932 },
  { name: '480px-xl-mobile', width: 480, height: 854 },
  { name: '600px-sm-tablet', width: 600, height: 960 },
  { name: '768px-tablet-portrait', width: 768, height: 1024 },
  { name: '820px-ipad', width: 820, height: 1180 },
  { name: '1024px-tablet-landscape', width: 1024, height: 768 },
  { name: '1280px-laptop', width: 1280, height: 800 },
  { name: '1440px-desktop', width: 1440, height: 900 },
  { name: '1920px-lg-desktop', width: 1920, height: 1080 }
];

const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'apartments', path: '/apartments' },
  { name: 'apartment-011', path: '/apartments/011' },
  { name: 'contact', path: '/contact' },
  { name: 'coming-soon', path: '/coming-soon' }
];

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = 'C:/Users/ashok/.gemini/antigravity/brain/4e933641-711e-49ff-a066-c23d335c43ab/audit';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function audit() {
  const browser = await chromium.launch();
  const report = [];

  for (const route of ROUTES) {
    console.log(`\n========================================`);
    console.log(`Auditing Route: ${route.name} (${route.path})`);
    console.log(`========================================`);

    for (const vp of VIEWPORTS) {
      const page = await browser.newPage({
        viewport: { width: vp.width, height: vp.height },
        isMobile: vp.width < 992,
        hasTouch: vp.width < 992
      });

      const consoleErrors = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      try {
        await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await page.waitForTimeout(1000);

        // 1. Check Horizontal Overflow
        const overflow = await page.evaluate(() => {
          const docEl = document.documentElement;
          const body = document.body;
          const maxScrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
          const winWidth = window.innerWidth;
          const hasOverflow = maxScrollWidth > winWidth + 1; // 1px threshold for subpixels
          
          let overflowingElements = [];
          if (hasOverflow) {
            const allEls = document.querySelectorAll('*');
            allEls.forEach((el) => {
              const rect = el.getBoundingClientRect();
              if (rect.right > winWidth + 1 || rect.left < -1) {
                overflowingElements.push({
                  tag: el.tagName,
                  className: el.className,
                  id: el.id,
                  left: Math.round(rect.left),
                  right: Math.round(rect.right),
                  width: Math.round(rect.width)
                });
              }
            });
          }
          return {
            hasOverflow,
            scrollWidth: maxScrollWidth,
            innerWidth: winWidth,
            overflowAmount: Math.max(0, maxScrollWidth - winWidth),
            overflowingElements: overflowingElements.slice(0, 5)
          };
        });

        // 2. Check Touch Targets (< 44px)
        const touchTargets = await page.evaluate(() => {
          if (window.innerWidth >= 992) return { count: 0, smallTargets: [] };
          const interactives = document.querySelectorAll('button, a, input, select, textarea, [hover-btn], [role="button"]');
          let smallTargets = [];
          interactives.forEach((el) => {
            if (el.offsetParent === null) return; // hidden
            const rect = el.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
              // Ignore small text links inside long paragraphs if inline
              const isInlineText = getComputedStyle(el).display === 'inline' && el.tagName === 'A' && el.closest('p');
              if (!isInlineText) {
                smallTargets.push({
                  tag: el.tagName,
                  class: el.className,
                  text: (el.textContent || '').trim().slice(0, 25),
                  width: Math.round(rect.width),
                  height: Math.round(rect.height)
                });
              }
            }
          });
          return {
            count: smallTargets.length,
            smallTargets: smallTargets.slice(0, 6)
          };
        });

        // 3. Check Input Font Size (< 16px causes iOS zoom)
        const inputFonts = await page.evaluate(() => {
          const inputs = document.querySelectorAll('input, select, textarea');
          let smallInputs = [];
          inputs.forEach((inp) => {
            const fs = parseFloat(getComputedStyle(inp).fontSize);
            if (fs < 16) {
              smallInputs.push({
                name: inp.name || inp.id || inp.placeholder || inp.type,
                fontSize: fs
              });
            }
          });
          return smallInputs;
        });

        // Capture key viewport screenshots
        const keyViewports = ['320px-xs-mobile', '375px-std-mobile', '390px-modern-iphone', '768px-tablet-portrait', '1440px-desktop'];
        let screenshotPath = null;
        if (keyViewports.includes(vp.name)) {
          screenshotPath = path.join(OUTPUT_DIR, `${route.name}_${vp.name}.png`);
          await page.screenshot({ path: screenshotPath, fullPage: false });
        }

        const entry = {
          route: route.path,
          viewport: vp.name,
          width: vp.width,
          overflow: overflow.hasOverflow ? `FAIL (${overflow.overflowAmount}px)` : 'PASS',
          overflowDetails: overflow.overflowingElements,
          smallTouchCount: touchTargets.count,
          smallTouchExamples: touchTargets.smallTargets,
          inputsBelow16px: inputFonts.length,
          consoleErrorsCount: consoleErrors.length,
          screenshot: screenshotPath
        };

        report.push(entry);

        const statusIcon = overflow.hasOverflow ? '✗' : '✓';
        console.log(`[${statusIcon}] ${vp.name.padEnd(28)} | Overflow: ${entry.overflow.padEnd(12)} | Small touch: ${touchTargets.count} | Inputs <16px: ${inputFonts.length}`);

      } catch (err) {
        console.error(`Error on ${route.path} @ ${vp.name}:`, err.message);
      } finally {
        await page.close();
      }
    }
  }

  await browser.close();

  const reportPath = path.join(OUTPUT_DIR, 'audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`\nAudit completed! Report saved to ${reportPath}`);
}

audit().catch(console.error);
