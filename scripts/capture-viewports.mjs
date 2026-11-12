import fs from 'fs';
import { createServer } from 'http';
import path from 'path';
import { chromium } from 'playwright';

function startStaticServer() {
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

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      resolve({ server, port });
    });
  });
}

async function capture() {
  fs.mkdirSync('screenshots', { recursive: true });
  const { server, port } = await startStaticServer();
  console.log(`Server listening on port ${port}`);

  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 375, height: 812 }
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);
    const shotPath = `screenshots/clone-${vp.name}.png`;
    await page.screenshot({ path: shotPath });
    console.log(`Captured ${shotPath}`);
    await page.close();
  }

  browser.close().catch(() => {});
  if (server.closeAllConnections) server.closeAllConnections();
  server.close();
  console.log('Screenshots captured successfully.');
  process.exit(0);
}

capture();
