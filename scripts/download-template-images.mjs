import fs from 'fs';
import path from 'path';

const replacements = [
  // 1. CTA villa render (AI Generated)
  {
    type: 'copy-local',
    src: 'C:\\Users\\ashok\\.gemini\\antigravity\\brain\\40e031e6-9ab8-40fb-b402-5e891059c713\\aura_luxury_villa_hero_1794548040616.jpg',
    targets: [
      'public/assets/images/6a0f88f3b81e88aabf6874e7_img_cta_1920.webp',
      'public/assets/images/6a0f88f3b81e88aabf6874e7_img_cta_1920-p-1600.png',
      'public/assets/images/6a0f88f3b81e88aabf6874e7_img_cta_1920-p-500.png'
    ]
  },
  // 2. Gated Community Day (Modern Mediterranean Villa Exterior)
  {
    unsplashId: '1600585154340-be6161a56a0c',
    targets: [
      { path: 'public/assets/images/6a25da81dce540a251389928_era-residence_gated-community_day.webp', w: 1920, fm: 'webp' },
      { path: 'public/assets/images/6a25da81dce540a251389928_era-residence_gated-community_day-p-500.webp', w: 500, fm: 'webp' },
      { path: 'public/assets/images/6a1512e5b24991c76981118b_era-residence-gated-community.webp', w: 1920, fm: 'webp' },
      { path: 'public/assets/images/6a1512e5b24991c76981118b_era-residence-gated-community-p-500.webp', w: 500, fm: 'webp' }
    ]
  },
  // 3. Gated Community Night (Dusk Villa Architecture)
  {
    unsplashId: '1512917774080-9991f1c4c750',
    targets: [
      { path: 'public/assets/images/6a25da802c253b9e5e3d44f5_era-residence_gated-community_night.webp', w: 1920, fm: 'webp' },
      { path: 'public/assets/images/6a25da802c253b9e5e3d44f5_era-residence_gated-community_night-p-500.webp', w: 500, fm: 'webp' }
    ]
  },
  // 4. Exterior Facade (Cam 02)
  {
    unsplashId: '1600596542815-ffad4c1539a9',
    targets: [
      { path: 'public/assets/images/6a150affaf1d8cc969d57dd0_img_cam_02.webp', w: 1920, fm: 'webp' },
      { path: 'public/assets/images/6a150affaf1d8cc969d57dd0_img_cam_02-p-500.webp', w: 500, fm: 'webp' },
      { path: 'public/assets/images/6a0f8994091fd12c24e79c8a_img_cam_02.webp', w: 1920, fm: 'webp' },
      { path: 'public/assets/images/6a0f8994091fd12c24e79c8a_img_cam_02-p-500.png', w: 500, fm: 'png' }
    ]
  },
  // 5. Terraces (Luxury Mediterranean Terrace)
  {
    unsplashId: '1613977257363-707ba9348227',
    targets: [
      { path: 'public/assets/images/6a150bbc2a39862be04f2cd5_era-residence-terrace.webp', w: 1920, fm: 'webp' },
      { path: 'public/assets/images/6a150bbc2a39862be04f2cd5_era-residence-terrace-p-500.webp', w: 500, fm: 'webp' },
      { path: 'public/assets/images/6a15723f346e4b3a6c0af26a_era-residence-terrace.webp', w: 1920, fm: 'webp' },
      { path: 'public/assets/images/6a15723f346e4b3a6c0af26a_era-residence-terrace-p-500.png', w: 500, fm: 'png' },
      { path: 'public/assets/images/6a15153b797c328a9f2f5964_era-residence-terrace.webp', w: 1920, fm: 'webp' },
      { path: 'public/assets/images/6a15153b797c328a9f2f5964_era-residence-terrace-p-500.png', w: 500, fm: 'png' },
      { path: 'public/assets/images/6a54e86a8a1cf6dc64ae6420_terrace_20view_202.jpg', w: 1920, fm: 'jpg' }
    ]
  },
  // 6. Gardens & Landscaping
  {
    unsplashId: '1600585152220-90363fe7e115',
    targets: [
      { path: 'public/assets/images/6a150cc2f810e37eec2ea963_era-residence-garden.webp', w: 1920, fm: 'webp' },
      { path: 'public/assets/images/6a150cc2f810e37eec2ea963_era-residence-garden-p-500.png', w: 500, fm: 'png' },
      { path: 'public/assets/images/6a1571e51d50c8bcf5f4bb3d_era-residence-garden-2.webp', w: 1920, fm: 'webp' },
      { path: 'public/assets/images/6a1571e51d50c8bcf5f4bb3d_era-residence-garden-2-p-500.png', w: 500, fm: 'png' },
      { path: 'public/assets/images/6a1575f46655e8c4e795ec64_era-residence-landscaping.webp', w: 1920, fm: 'webp' },
      { path: 'public/assets/images/6a1575f46655e8c4e795ec64_era-residence-landscaping-p-500.webp', w: 500, fm: 'webp' },
      { path: 'public/assets/images/6a151382fb101ce2ca9db288_era-residence-landscaping.webp', w: 1920, fm: 'webp' },
      { path: 'public/assets/images/6a151382fb101ce2ca9db288_era-residence-landscaping-p-500.png', w: 500, fm: 'png' }
    ]
  },
  // 7. Infinity Pool
  {
    unsplashId: '1584622650111-993a426fbf0a',
    targets: [
      { path: 'public/assets/images/6a151264dc1dcca76fda17d9_era-residence-pool.webp', w: 1920, fm: 'webp' },
      { path: 'public/assets/images/6a151264dc1dcca76fda17d9_era-residence-pool-p-500.webp', w: 500, fm: 'webp' }
    ]
  },
  // 8. Living Room (Cam 03)
  {
    unsplashId: '1600607687939-ce8a6c25118c',
    targets: [
      { path: 'public/assets/images/6a1507fddb26e71ff717c30c_img_cam_03.webp', w: 1920, fm: 'webp' },
      { path: 'public/assets/images/6a1507fddb26e71ff717c30c_img_cam_03-p-500.webp', w: 500, fm: 'webp' }
    ]
  },
  // 9. Master Bedroom (Cam 07)
  {
    unsplashId: '1600210492486-724fe5c67fb0',
    targets: [
      { path: 'public/assets/images/6a15080748155bc8e151f5ff_img_cam_07.webp', w: 1920, fm: 'webp' },
      { path: 'public/assets/images/6a15080748155bc8e151f5ff_img_cam_07-p-500.webp', w: 500, fm: 'webp' }
    ]
  },
  // 10. Spa Bathroom (Cam 09)
  {
    unsplashId: '1600566753376-12c8ab7fb75b',
    targets: [
      { path: 'public/assets/images/6a150812aefa2e544369d4a6_img_cam_09.webp', w: 1920, fm: 'webp' },
      { path: 'public/assets/images/6a150812aefa2e544369d4a6_img_cam_09-p-500.webp', w: 500, fm: 'webp' },
      { path: 'public/assets/images/6a1507d9c527d247564a1cd7_img_cam_09.webp', w: 1920, fm: 'webp' },
      { path: 'public/assets/images/6a1507d9c527d247564a1cd7_img_cam_09-p-500.webp', w: 500, fm: 'webp' }
    ]
  },
  // 11. Kitchen
  {
    unsplashId: '1600566753190-17f0baa2a6c3',
    targets: [
      { path: 'public/assets/images/6a1575180f248400b7124a46_era-residence-kitchen.webp', w: 1920, fm: 'webp' },
      { path: 'public/assets/images/6a1575180f248400b7124a46_era-residence-kitchen-p-500.webp', w: 500, fm: 'webp' }
    ]
  },
  // 12. Spa & Gym
  {
    unsplashId: '1534438327276-14e5300c3a48',
    targets: [
      { path: 'public/assets/images/6a15132fe66907986a254201_era-residence-spa-_26-gym.webp', w: 1920, fm: 'webp' },
      { path: 'public/assets/images/6a15132fe66907986a254201_era-residence-spa-_26-gym-p-500.webp', w: 500, fm: 'webp' }
    ]
  },
  // 13. Underground Parking / Private Garage
  {
    unsplashId: '1506521781263-d8422e82f27a',
    targets: [
      { path: 'public/assets/images/6a1573fc640c344ee0705819_era-residence-parking.webp', w: 1920, fm: 'webp' },
      { path: 'public/assets/images/6a1573fc640c344ee0705819_era-residence-parking-p-500.png', w: 500, fm: 'png' }
    ]
  },
  // 14. Exterior Catalog Card
  {
    unsplashId: '1580587771525-78b9dba3b914',
    targets: [
      { path: 'public/assets/images/6a54e888e523b4fb585095c4_exterior_201.jpg', w: 1920, fm: 'jpg' }
    ]
  }
];

async function run() {
  console.log('Starting royalty-free & AI image replacement pipeline...');

  for (const item of replacements) {
    if (item.type === 'copy-local') {
      if (fs.existsSync(item.src)) {
        const buf = fs.readFileSync(item.src);
        for (const t of item.targets) {
          fs.writeFileSync(t, buf);
          console.log(`Copied AI render to ${t} (${buf.length} bytes)`);
        }
      } else {
        console.warn(`Local source file not found: ${item.src}`);
      }
      continue;
    }

    if (item.unsplashId) {
      for (const t of item.targets) {
        const url = `https://images.unsplash.com/photo-${item.unsplashId}?w=${t.w}&fm=${t.fm}&q=80`;
        try {
          const res = await fetch(url);
          if (res.ok) {
            const arrBuf = await res.arrayBuffer();
            const buf = Buffer.from(arrBuf);
            fs.writeFileSync(t.path, buf);
            console.log(`Downloaded & replaced ${t.path} from Unsplash ${item.unsplashId} (${buf.length} bytes)`);
          } else {
            console.error(`Failed to fetch ${url}: HTTP ${res.status}`);
          }
        } catch (e) {
          console.error(`Error downloading ${url}:`, e.message);
        }
      }
    }
  }

  console.log('All image replacements completed successfully!');
}

run();
