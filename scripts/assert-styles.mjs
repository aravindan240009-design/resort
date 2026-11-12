import fs from 'fs';
import { createServer } from 'http';
import path from 'path';
import { chromium } from 'playwright';

// Simple static HTTP server for verification
function startStaticServer(port = 3005) {
  const root = path.resolve('.');
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.mjs': 'application/javascript; charset=utf-8',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2',
    '.webm': 'video/webm',
    '.mov': 'video/quicktime',
    '.mp4': 'video/mp4'
  };

  const server = createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/') reqPath = '/index.html';
    else if (reqPath === '/apartments') reqPath = '/apartments.html';
    else if (reqPath === '/contact') reqPath = '/contact.html';
    else if (reqPath === '/coming-soon') reqPath = '/coming-soon.html';

    const cleanPath = reqPath.startsWith('/') ? reqPath.slice(1) : reqPath;
    let filePath = path.join(root, cleanPath);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(root, 'public', cleanPath);
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        'Content-Type': mimeTypes[ext] || 'application/octet-stream',
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found: ' + reqPath);
    }
  });

  return new Promise((resolve, reject) => {
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        server.listen(0, () => {
          resolve({ server, port: server.address().port });
        });
      } else {
        reject(err);
      }
    });

    server.listen(port, () => {
      resolve({ server, port });
    });
  });
}

async function runAssertions() {
  console.log('--- Step 5: Verify (The Gate) ---');
  const assertions = JSON.parse(fs.readFileSync('assertions.json', 'utf8'));
  const { server, port } = await startStaticServer(3005);
  console.log(`Test server running at http://localhost:${port}`);

  let browser;
  try {
    try {
      browser = await chromium.launch({ channel: 'chrome', headless: true });
    } catch {
      browser = await chromium.launch({ channel: 'msedge', headless: true });
    }
  } catch (e) {
    console.error('Failed to launch browser:', e.message);
    if (server.closeAllConnections) server.closeAllConnections();
    server.close();
    process.exit(1);
  }

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.message);
  });

  let passCount = 0;
  let failCount = 0;

  console.log(`\nNavigating to http://localhost:${port}/ ...`);
  await page.goto(`http://localhost:${port}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);

  // Check title
  const title = await page.title();
  console.log(`Page title: "${title}"`);
  if (title.includes('ERA Residence')) {
    console.log('✓ PASS: Page title contains "ERA Residence"');
    passCount++;
  } else {
    console.error(`✗ FAIL: Page title "${title}" expected to contain "ERA Residence"`);
    failCount++;
  }

  // Check computed style assertions
  for (const assertion of assertions.computedStyleAssertions) {
    const selector = assertion.selector;
    const exists = await page.$(selector);
    if (!exists) {
      console.error(`✗ FAIL: Selector "${selector}" not found on page`);
      failCount++;
      continue;
    }

    for (const [prop, expectedVal] of Object.entries(assertion.properties)) {
      const actualVal = await page.$eval(
        selector,
        (el, p) => window.getComputedStyle(el).getPropertyValue(p),
        prop
      );

      const matches = actualVal.toLowerCase().includes(expectedVal.toLowerCase());
      if (matches) {
        console.log(`✓ PASS: ${selector} [${prop}] => "${actualVal}" (matches "${expectedVal}")`);
        passCount++;
      } else {
        console.error(`✗ FAIL: ${selector} [${prop}] => "${actualVal}" (expected "${expectedVal}")`);
        failCount++;
      }
    }
  }

  // Check apartments page
  console.log('\nNavigating to /apartments ...');
  await page.goto(`http://localhost:${port}/apartments.html`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);
  const apartCards = await page.$$('.apart-card');
  console.log(`Found ${apartCards.length} apartment cards on /apartments`);
  if (apartCards.length === 25) {
    console.log('✓ PASS: All 25 residences verified in catalog');
    passCount++;
  } else {
    console.error(`✗ FAIL: Expected 25 apartment cards, found ${apartCards.length}`);
    failCount++;
  }

  // Check contact page
  console.log('\nNavigating to /contact ...');
  await page.goto(`http://localhost:${port}/contact.html`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);
  const formExists = await page.$('form');
  if (formExists) {
    console.log('✓ PASS: Contact form element verified');
    passCount++;
  } else {
    console.error('✗ FAIL: Contact form element not found');
    failCount++;
  }

  // Check console errors
  console.log('\nChecking console errors...');
  if (consoleErrors.length === 0) {
    console.log('✓ PASS: Zero uncaught browser console errors');
    passCount++;
  } else {
    console.error(`✗ FAIL: Encountered ${consoleErrors.length} console errors:`, consoleErrors);
    failCount++;
  }

  console.log('\n========================================');
  console.log(`SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
  console.log('========================================\n');

  browser.close().catch(() => {});
  if (server.closeAllConnections) server.closeAllConnections();
  server.close();

  if (failCount > 0) {
    console.error('Assertion failures detected.');
    process.exit(1);
  } else {
    console.log('Style assertion gate passed with 100% success!');
    process.exit(0);
  }
}

runAssertions();
