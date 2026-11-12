import fs from 'fs';
import { createServer } from 'http';
import path from 'path';
import { chromium } from 'playwright';

function startStaticServer(port = 3007) {
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
      console.log('404 NOT FOUND:', req.url);
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found: ' + reqPath);
    }
  });

  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}

async function debug() {
  const server = await startStaticServer(3007);
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();

  page.on('requestfailed', req => {
    console.log('[FAILED REQUEST]:', req.url(), req.failure()?.errorText);
  });

  page.on('response', res => {
    if (res.status() >= 400) {
      console.log(`[HTTP ${res.status()}]:`, res.url());
    }
  });

  page.on('pageerror', err => {
    console.log('[PAGE ERROR MESSAGE]:', err.message);
    console.log('[PAGE ERROR STACK]:', err.stack);
  });

  await page.goto('http://localhost:3007/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  await browser.close();
  server.close();
}

debug();
