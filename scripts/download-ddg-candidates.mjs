import fs from 'fs';
import path from 'path';

async function downloadCandidates() {
  const data = JSON.parse(fs.readFileSync('scripts/ddg_results.json'));
  const candidates = data.filter(item => {
    return item.width >= 1920 && (item.width / item.height) >= 1.4;
  });

  console.log(`Wide high-res candidates: ${candidates.length}`);
  fs.mkdirSync('scripts/candidates', { recursive: true });

  let downloaded = 0;
  for (let i = 0; i < candidates.length && downloaded < 8; i++) {
    const c = candidates[i];
    try {
      const res = await fetch(c.image, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        },
        signal: AbortSignal.timeout(8000)
      });
      if (res.ok) {
        const ct = res.headers.get('content-type') || '';
        if (ct.includes('image')) {
          const buf = Buffer.from(await res.arrayBuffer());
          const ext = ct.includes('png') ? 'png' : 'jpg';
          const file = `scripts/candidates/aerial_cand_${downloaded}.${ext}`;
          fs.writeFileSync(file, buf);
          console.log(`Saved ${file} (${buf.length} bytes, ${c.width}x${c.height}): ${c.title.slice(0, 60)}`);
          downloaded++;
        }
      }
    } catch (e) {
      // skip on timeout/error
    }
  }
}

downloadCandidates().catch(console.error);
