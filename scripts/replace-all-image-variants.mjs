import fs from 'fs';
import path from 'path';

const allFiles = fs.readdirSync('public/assets/images');

// Mapping of image concept prefixes to their Unsplash IDs or local source
const imageMappings = [
  // 1. Hero Day Villa
  {
    prefix: '6a25da81dce540a251389928_era-residence_gated-community_day',
    unsplashId: '1600585154340-be6161a56a0c', // modern luxury villa day
    fallbackWidth: 1920
  },
  // 2. Hero Night Villa
  {
    prefix: '6a25da802c253b9e5e3d44f5_era-residence_gated-community_night',
    unsplashId: '1512917774080-9991f1c4c750', // dusk luxury villa
    fallbackWidth: 1920
  },
  // 3. Pool Villa with Bougainvillea (shown in user's Image 4!)
  {
    prefix: '6a0f8994091fd12c24e79c8a_img_cam_02',
    unsplashId: '1600596542815-ffad4c1539a9', // modern villa with pool & palms
    fallbackWidth: 1920
  },
  // 4. Exterior Villa Cam 02
  {
    prefix: '6a150affaf1d8cc969d57dd0_img_cam_02',
    unsplashId: '1600596542815-ffad4c1539a9',
    fallbackWidth: 1920
  },
  // 5. Terraces 1
  {
    prefix: '6a150bbc2a39862be04f2cd5_era-residence-terrace',
    unsplashId: '1613977257363-707ba9348227', // modern terrace
    fallbackWidth: 1920
  },
  // 6. Terraces 2
  {
    prefix: '6a15723f346e4b3a6c0af26a_era-residence-terrace',
    unsplashId: '1613977257363-707ba9348227',
    fallbackWidth: 1920
  },
  // 7. Terraces 3
  {
    prefix: '6a15153b797c328a9f2f5964_era-residence-terrace',
    unsplashId: '1613977257363-707ba9348227',
    fallbackWidth: 1920
  },
  // 8. Pool
  {
    prefix: '6a151264dc1dcca76fda17d9_era-residence-pool',
    unsplashId: '1584622650111-993a426fbf0a', // luxury pool
    fallbackWidth: 1920
  },
  // 9. Gated Community overview
  {
    prefix: '6a1512e5b24991c76981118b_era-residence-gated-community',
    unsplashId: '1600585154340-be6161a56a0c',
    fallbackWidth: 1920
  },
  // 10. Garden 1
  {
    prefix: '6a150cc2f810e37eec2ea963_era-residence-garden',
    unsplashId: '1600585152220-90363fe7e115', // landscape & garden
    fallbackWidth: 1920
  },
  // 11. Garden 2
  {
    prefix: '6a1571e51d50c8bcf5f4bb3d_era-residence-garden-2',
    unsplashId: '1600585152220-90363fe7e115',
    fallbackWidth: 1920
  },
  // 12. Landscaping 1
  {
    prefix: '6a1575f46655e8c4e795ec64_era-residence-landscaping',
    unsplashId: '1580587771525-78b9dba3b914',
    fallbackWidth: 1920
  },
  // 13. Landscaping 2
  {
    prefix: '6a151382fb101ce2ca9db288_era-residence-landscaping',
    unsplashId: '1580587771525-78b9dba3b914',
    fallbackWidth: 1920
  },
  // 14. Living Room Cam 03
  {
    prefix: '6a1507fddb26e71ff717c30c_img_cam_03',
    unsplashId: '1600607687939-ce8a6c25118c', // luxury living room
    fallbackWidth: 1920
  },
  // 15. Master Bedroom Cam 07
  {
    prefix: '6a15080748155bc8e151f5ff_img_cam_07',
    unsplashId: '1600210492486-724fe5c67fb0', // luxury bedroom
    fallbackWidth: 1920
  },
  // 16. Spa Bathroom Cam 09
  {
    prefix: '6a150812aefa2e544369d4a6_img_cam_09',
    unsplashId: '1600566753376-12c8ab7fb75b', // luxury bathroom
    fallbackWidth: 1920
  },
  // 17. Contact Page Hero Cam 09
  {
    prefix: '6a1507d9c527d247564a1cd7_img_cam_09',
    unsplashId: '1600566753376-12c8ab7fb75b',
    fallbackWidth: 1920
  },
  // 18. Kitchen
  {
    prefix: '6a1575180f248400b7124a46_era-residence-kitchen',
    unsplashId: '1600566753190-17f0baa2a6c3', // luxury kitchen
    fallbackWidth: 1920
  },
  // 19. Spa & Gym
  {
    prefix: '6a15132fe66907986a254201_era-residence-spa-_26-gym',
    unsplashId: '1534438327276-14e5300c3a48', // gym & spa
    fallbackWidth: 1920
  },
  // 20. Underground Parking
  {
    prefix: '6a1573fc640c344ee0705819_era-residence-parking',
    unsplashId: '1506521781263-d8422e82f27a', // garage
    fallbackWidth: 1920
  },
  // 21. CTA Villa (Local AI Generated Render)
  {
    prefix: '6a0f88f3b81e88aabf6874e7_img_cta_1920',
    localFile: 'C:\\Users\\ashok\\.gemini\\antigravity\\brain\\40e031e6-9ab8-40fb-b402-5e891059c713\\aura_luxury_villa_hero_1794548040616.jpg'
  },
  // 22. Floating Hero Villa Cutout
  {
    prefix: '6a0f8c07861fe831459ff0d9_img_cam_05_alpha',
    localFile: 'C:\\Users\\ashok\\.gemini\\antigravity\\brain\\40e031e6-9ab8-40fb-b402-5e891059c713\\aura_luxury_villa_hero_1794548040616.jpg'
  },
  // 23. Catalog Exterior & Terrace
  {
    prefix: '6a54e888e523b4fb585095c4_exterior_201',
    unsplashId: '1600585154340-be6161a56a0c',
    fallbackWidth: 1920
  },
  {
    prefix: '6a54e86a8a1cf6dc64ae6420_terrace_20view_202',
    unsplashId: '1613977257363-707ba9348227',
    fallbackWidth: 1920
  },
  // 24. Ground floor renders
  {
    prefix: '6a1e3e0735b657ba4b1313cc_era-residence-ground-floor',
    unsplashId: '1600607687939-ce8a6c25118c',
    fallbackWidth: 1920
  },
  {
    prefix: '6a24918d32632ad41e5ee7c8_era-residence-ground-floor-2',
    unsplashId: '1600607687939-ce8a6c25118c',
    fallbackWidth: 1920
  },
  {
    prefix: '6a38473e1051ca440012729b_era-residence-ground-floor-2',
    unsplashId: '1600607687939-ce8a6c25118c',
    fallbackWidth: 1920
  },
  // 25. Open Graph social image
  {
    prefix: '6a39f0aba46d0d055c0476ff_open-graph',
    localFile: 'C:\\Users\\ashok\\.gemini\\antigravity\\brain\\40e031e6-9ab8-40fb-b402-5e891059c713\\aura_luxury_villa_hero_1794548040616.jpg'
  }
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function safeWrite(filePath, buffer, retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      fs.writeFileSync(filePath, buffer);
      return true;
    } catch (err) {
      if (i === retries - 1) throw err;
      await sleep(150);
    }
  }
}

async function replaceAll() {
  console.log('--- Overwriting ALL Responsive Variants for Each Image Concept ---');
  let totalReplacedFiles = 0;

  for (const m of imageMappings) {
    const matchingFiles = allFiles.filter(f => f.startsWith(m.prefix));
    if (matchingFiles.length === 0) continue;

    console.log(`\nConcept: ${m.prefix} -> ${matchingFiles.length} files found`);

    let buffer = null;

    if (m.localFile) {
      if (fs.existsSync(m.localFile)) {
        buffer = fs.readFileSync(m.localFile);
      } else {
        console.error(`Local file does not exist: ${m.localFile}`);
        continue;
      }
    } else if (m.unsplashId) {
      const url = `https://images.unsplash.com/photo-${m.unsplashId}?w=${m.fallbackWidth || 1920}&fm=webp&q=82`;
      try {
        const res = await fetch(url);
        if (res.ok) {
          const arrBuf = await res.arrayBuffer();
          buffer = Buffer.from(arrBuf);
        } else {
          console.error(`Fetch error: HTTP ${res.status}`);
          continue;
        }
      } catch (err) {
        console.error(`Fetch error: ${err.message}`);
        continue;
      }
    }

    if (!buffer) continue;

    for (const f of matchingFiles) {
      const targetPath = path.join('public/assets/images', f);
      await safeWrite(targetPath, buffer);
      totalReplacedFiles++;
      console.log(`  ✓ Replaced ${f}`);
    }
  }

  console.log(`\n========================================`);
  console.log(`TOTAL FILES OVERWRITTEN: ${totalReplacedFiles}`);
  console.log(`========================================`);
}

replaceAll().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
