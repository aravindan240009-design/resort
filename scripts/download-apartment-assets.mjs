import fs from 'fs';
import path from 'path';

async function run() {
  const assetMapFile = 'extracted/asset-map.json';
  const assetMap = fs.existsSync(assetMapFile)
    ? JSON.parse(fs.readFileSync(assetMapFile, 'utf8'))
    : {};

  const pagesDir = 'extracted/pages/apartments';
  const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

  const urlRegex = /(https:\/\/(?:cdn\.prod\.website-files\.com|assets\.era-residence\.com)\/[a-zA-Z0-9_\-\.%~/]+)/g;
  const newAssets = new Map();

  for (const file of files) {
    const html = fs.readFileSync(path.join(pagesDir, file), 'utf8');
    let m;
    while ((m = urlRegex.exec(html)) !== null) {
      let url = m[1];
      url = url.split('&')[0];
      if (url.endsWith('.js') || url.endsWith('.css') || url.includes('/css/') || url.includes('/js/')) {
        continue;
      }
      if (!assetMap[url] && !newAssets.has(url)) {
        const basename = path.basename(url.split('?')[0]);
        const isVideo = basename.endsWith('.webm') || basename.endsWith('.mov') || basename.endsWith('.mp4');
        const folder = isVideo ? 'public/assets/videos' : 'public/assets/images';
        const cleanName = basename.replace(/[^a-zA-Z0-9_.-]/g, '_');
        const localRel = isVideo ? `/assets/videos/${cleanName}` : `/assets/images/${cleanName}`;
        newAssets.set(url, {
          url,
          localPath: path.join(folder, cleanName),
          webPath: localRel
        });
      }
    }
  }

  console.log(`Discovered ${newAssets.size} new unique assets across apartment pages.`);

  const items = Array.from(newAssets.values());
  const limit = 8;
  let count = 0;
  let failed = 0;

  for (let i = 0; i < items.length; i += limit) {
    const chunk = items.slice(i, i + limit);
    await Promise.all(
      chunk.map(async item => {
        if (fs.existsSync(item.localPath) && fs.statSync(item.localPath).size > 0) {
          assetMap[item.url] = item.webPath;
          count++;
          return;
        }
        try {
          const res = await fetch(item.url);
          if (!res.ok) {
            console.error(`Failed ${item.url}: HTTP ${res.status}`);
            failed++;
            return;
          }
          const buf = Buffer.from(await res.arrayBuffer());
          fs.writeFileSync(item.localPath, buf);
          assetMap[item.url] = item.webPath;
          count++;
        } catch (e) {
          console.error(`Error downloading ${item.url}:`, e.message);
          failed++;
        }
      })
    );
  }

  console.log(`Downloaded ${count} assets (${failed} failed). Total assets in map: ${Object.keys(assetMap).length}`);
  fs.writeFileSync(assetMapFile, JSON.stringify(assetMap, null, 2), 'utf8');
}

run();
