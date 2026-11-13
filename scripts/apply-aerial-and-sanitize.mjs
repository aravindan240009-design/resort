import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function main() {
  console.log('1. Rendering responsive aerial Day and Night variants with Playwright...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const srcBuf = fs.readFileSync('scripts/candidates/aerial_cand_5.jpg');
  const base64 = `data:image/jpeg;base64,${srcBuf.toString('base64')}`;

  await page.setContent('<!DOCTYPE html><html><body><canvas id="c"></canvas></body></html>');

  async function render(width, isNight) {
    return await page.evaluate(async ({ base64, width, isNight }) => {
      const img = new Image();
      await new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
        img.src = base64;
      });

      const canvas = document.getElementById('c');
      const height = Math.round((width / img.width) * img.height);
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(img, 0, 0, width, height);

      if (isNight) {
        ctx.save();
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
        ctx.fillRect(0, 0, width, height);
        ctx.restore();

        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = 'rgba(254, 215, 170, 0.15)';
        ctx.fillRect(0, 0, width, height);
        ctx.restore();

        ctx.save();
        const grad = ctx.createRadialGradient(width * 0.5, height * 0.5, width * 0.2, width * 0.5, height * 0.5, width * 0.7);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(1, 'rgba(3, 7, 18, 0.6)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      return canvas.toDataURL('image/webp', 0.92);
    }, { base64, width, isNight });
  }

  const widths = [
    { suffix: '', w: 1920 },
    { suffix: '-p-1600', w: 1600 },
    { suffix: '-p-1080', w: 1080 },
    { suffix: '-p-800', w: 800 },
    { suffix: '-p-500', w: 500 }
  ];

  const targetsDay = [
    '6a25da81dce540a251389928_era-residence_gated-community_day',
    '6a1512e5b24991c76981118b_era-residence-gated-community'
  ];
  const targetsNight = [
    '6a25da802c253b9e5e3d44f5_era-residence_gated-community_night'
  ];

  const outDirs = [
    'public/assets/images',
    'dist/assets/images'
  ];

  for (const item of widths) {
    console.log(`Generating Day variant ${item.w}px...`);
    const dayData = await render(item.w, false);
    const dayBuf = Buffer.from(dayData.split(',')[1], 'base64');

    console.log(`Generating Night variant ${item.w}px...`);
    const nightData = await render(item.w, true);
    const nightBuf = Buffer.from(nightData.split(',')[1], 'base64');

    for (const dir of outDirs) {
      if (!fs.existsSync(dir)) continue;

      for (const base of targetsDay) {
        const dest = path.join(dir, `${base}${item.suffix}.webp`);
        fs.writeFileSync(dest, dayBuf);
      }

      for (const base of targetsNight) {
        const dest = path.join(dir, `${base}${item.suffix}.webp`);
        fs.writeFileSync(dest, nightBuf);
      }
    }
  }

  await browser.close();
  console.log('Aerial drone Day and Night variants written to public/ and dist/ successfully!');
}

main().catch(console.error);
