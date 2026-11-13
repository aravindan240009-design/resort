import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function processImages() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Read source image as base64
  const srcBuf = fs.readFileSync('scripts/candidates/aerial_cand_5.jpg');
  const base64 = `data:image/jpeg;base64,${srcBuf.toString('base64')}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="margin: 0; background: #000;">
        <canvas id="c"></canvas>
      </body>
    </html>
  `;
  await page.setContent(html);

  const sizes = [1920, 1600, 1080, 800, 500];

  // Function to render Day version at specific width
  async function renderVariant(width, isNight) {
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
        // Apply Night color grade: deep navy tone, enhance warm lights
        ctx.save();
        ctx.globalCompositeOperation = 'multiply';
        // Deep midnight blue multiply
        ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
        ctx.fillRect(0, 0, width, height);
        ctx.restore();

        // Add soft warm illumination to windows/pool
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = 'rgba(254, 215, 170, 0.15)';
        ctx.fillRect(0, 0, width, height);
        ctx.restore();

        // Subtle vignette
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

  // Generate test Day and Night at 1920
  const day1920 = await renderVariant(1920, false);
  const night1920 = await renderVariant(1920, true);

  fs.writeFileSync('scripts/test_aerial_day.webp', Buffer.from(day1920.split(',')[1], 'base64'));
  fs.writeFileSync('scripts/test_aerial_night.webp', Buffer.from(night1920.split(',')[1], 'base64'));

  console.log('Saved test Day and Night webp successfully!');
  await browser.close();
}

processImages().catch(console.error);
