import fs from 'fs';
import path from 'path';

const pages = ['index.html', 'apartments.html', 'contact.html', 'coming-soon.html'];

async function run() {
  const assetMap = new Map(); // url -> localRelativePath
  fs.mkdirSync('public/assets/images', { recursive: true });
  fs.mkdirSync('public/assets/videos', { recursive: true });

  const urlRegex = /(https:\/\/(?:cdn\.prod\.website-files\.com|assets\.era-residence\.com)\/[a-zA-Z0-9_\-\.%~/]+)/g;

  for (const p of pages) {
    const html = fs.readFileSync(path.join('extracted/pages', p), 'utf8');
    let m;
    while ((m = urlRegex.exec(html)) !== null) {
      let url = m[1];
      // Clean up url
      url = url.split('&')[0];
      if (url.endsWith('.js') || url.endsWith('.css') || url.includes('/css/') || url.includes('/js/')) {
        continue;
      }
      if (!assetMap.has(url)) {
        const basename = path.basename(url.split('?')[0]);
        const isVideo = basename.endsWith('.webm') || basename.endsWith('.mov') || basename.endsWith('.mp4');
        const folder = isVideo ? 'public/assets/videos' : 'public/assets/images';
        const cleanName = basename.replace(/[^a-zA-Z0-9_.-]/g, '_');
        const localRel = isVideo ? `/assets/videos/${cleanName}` : `/assets/images/${cleanName}`;
        assetMap.set(url, {
          url,
          localPath: path.join(folder, cleanName),
          webPath: localRel
        });
      }
    }
  }

  console.log('Total unique assets to download:', assetMap.size);

  let count = 0;
  let failed = 0;
  const items = Array.from(assetMap.values());

  // Download with concurrency limit of 8
  const limit = 8;
  for (let i = 0; i < items.length; i += limit) {
    const chunk = items.slice(i, i + limit);
    await Promise.all(
      chunk.map(async item => {
        if (fs.existsSync(item.localPath) && fs.statSync(item.localPath).size > 0) {
          count++;
          return;
        }
        try {
          const res = await fetch(item.url);
          if (!res.ok) {
            failed++;
            console.error('Failed HTTP ' + res.status, item.url);
            return;
          }
          const buf = Buffer.from(await res.arrayBuffer());
          fs.writeFileSync(item.localPath, buf);
          count++;
          if (count % 20 === 0 || count === items.length) {
            console.log(`Progress: ${count}/${items.length}`);
          }
        } catch (e) {
          failed++;
          console.error('Failed fetch', item.url, e.message);
        }
      })
    );
  }

  console.log(`Done downloading: ${count} successful, ${failed} failed.`);

  // Save asset mapping
  const mappingObj = {};
  for (const [url, data] of assetMap.entries()) {
    mappingObj[url] = data.webPath;
  }
  fs.writeFileSync('extracted/asset-map.json', JSON.stringify(mappingObj, null, 2));
  console.log('Saved extracted/asset-map.json');
}

run();
