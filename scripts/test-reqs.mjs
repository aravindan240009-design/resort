import fs from 'fs';
import { createServer } from 'http';
import path from 'path';

const root = path.resolve('.');
const server = createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const cleanPath = reqPath.startsWith('/') ? reqPath.slice(1) : reqPath;
  let filePath = path.join(root, cleanPath);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(root, 'public', cleanPath);
  }
  const exists = fs.existsSync(filePath);
  console.log(`REQ: ${req.url} -> ${filePath} (exists: ${exists})`);
  res.end('ok');
});

server.listen(3009, () => {
  console.log('Listening on 3009');
});

setTimeout(() => {
  server.close();
}, 2000);
