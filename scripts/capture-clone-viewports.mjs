import fs from 'fs';
import { createServer } from 'http';
import path from 'path';
import { chromium } from 'playwright';

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
    '.mp4': 'video/mp4',
    '.pdf': 'application/pdf'
  };

  const server = createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/') reqPath = '/index.html';
    else if (reqPath === '/apartments') reqPath = '/apartments.html';
    else if (reqPath === '/contact') reqPath = '/contact.html';
    else if (reqPath === '/coming-soon') reqPath = '/coming-soon.html';
    else if (reqPath.startsWith('/apartments/')) {
      const slug = reqPath.replace('/apartments/', '').replace(/\/$/, '').replace('.html', '');
      const p = path.join(root, 'apartments', slug, 'index.html');
      if (fs.existsSync(p)) {
        reqPath = `/apartments/${slug}/index.html`;
      }
    }

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

  return new Promise((resolve) => {
    server.listen(port, () => {
      resolve({ server, port });
    });
  });
}

async function run() {
  fs.mkdirSync('screenshots/clone', { recursive: true });
  const { server, port } = await startStaticServer(3006);

  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome' });
  } catch {
    browser = await chromium.launch({ channel: 'msedge' });
  }

  const pages = [
    { path: '/', name: 'clone-home' },
    { path: '/apartments', name: 'clone-apartments' },
    { path: '/apartments/011', name: 'clone-011' },
    { path: '/contact', name: 'clone-contact' }
  ];

  for (const p of pages) {
    // Desktop
    const deskCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const deskPage = await deskCtx.newPage();
    try {
      await deskPage.goto(`http://localhost:${port}${p.path}`, { waitUntil: 'domcontentloaded' });
      await deskPage.waitForTimeout(2000);
      await deskPage.screenshot({ path: `screenshots/clone/${p.name}-desktop.png` });
      console.log(`Saved screenshots/clone/${p.name}-desktop.png`);
    } catch (e) {
      console.error(`Error ${p.path} desk:`, e.message);
    }
    await deskCtx.close();

    // Mobile
    const mobCtx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
    });
    const mobPage = await mobCtx.newPage();
    try {
      await mobPage.goto(`http://localhost:${port}${p.path}`, { waitUntil: 'domcontentloaded' });
      await mobPage.waitForTimeout(2000);
      await mobPage.screenshot({ path: `screenshots/clone/${p.name}-mobile.png` });
      console.log(`Saved screenshots/clone/${p.name}-mobile.png`);
    } catch (e) {
      console.error(`Error ${p.path} mob:`, e.message);
    }
    await mobCtx.close();
  }

  await browser.close();
  server.close();
  console.log('Done capturing clone viewports!');
}

run();
