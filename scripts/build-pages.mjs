import fs from 'fs';
import path from 'path';

const assetMap = JSON.parse(fs.readFileSync('extracted/asset-map.json', 'utf8'));
const sortedUrls = Object.keys(assetMap).sort((a, b) => b.length - a.length);

const pages = [
  { src: 'extracted/pages/index.html', dest: 'index.html' },
  { src: 'extracted/pages/apartments.html', dest: 'apartments.html' },
  { src: 'extracted/pages/contact.html', dest: 'contact.html' },
  { src: 'extracted/pages/coming-soon.html', dest: 'coming-soon.html' }
];

function cleanHtml(html) {
  let res = html;

  // 1. Remove dns-prefetch and preconnect ONLY
  res = res.replace(/<link[^>]+rel=["'](?:dns-prefetch|preconnect)["'][^>]*>/gi, '');

  // 2. Remove Google Tag Manager entire block (both head and noscript body)
  res = res.replace(/<!--\s*Google Tag Manager\s*-->[\s\S]*?<!--\s*End Google Tag Manager\s*-->/gi, '');
  res = res.replace(/<!--\s*Google Tag Manager \(noscript\)\s*-->[\s\S]*?<!--\s*End Google Tag Manager \(noscript\)\s*-->/gi, '');
  res = res.replace(/<noscript>[\s\S]*?<\/noscript>/gi, '');

  // 3. Remove Typekit scripts cleanly
  res = res.replace(/<script[^>]*use\.typekit\.net[\s\S]*?<\/script>/gi, '');
  res = res.replace(/<script[^>]*>\s*try\s*\{\s*Typekit\.load\(\);\s*\}\s*catch\s*\(e\)\s*\{\s*\}\s*<\/script>/gi, '');

  // 4. Remove integrity and crossorigin attributes
  res = res.replace(/\s+integrity="[^"]*"/gi, '');
  res = res.replace(/\s+crossorigin="[^"]*"/gi, '');

  // 5. Replace stylesheet links to local paths
  res = res.replace(
    /https:\/\/cdn\.prod\.website-files\.com\/[^\/]+\/css\/era-residence\.webflow\.shared\.[a-z0-9]+\.min\.css/gi,
    '/css/era-residence.shared.css'
  );
  res = res.replace(/https:\/\/unpkg\.com\/lenis@[^\/]+\/dist\/lenis\.css/gi, '/css/lenis.css');

  // 6. Remove Slater loader script and replace with our local main.js
  const slaterRegex = /<script>\s*document\.addEventListener\('DOMContentLoaded',\s*function\s*\(\)\s*\{[\s\S]*?loadtwc\(src\);\s*\}\);\s*<\/script>/gi;
  res = res.replace(slaterRegex, '<script type="module" src="/src/scripts/main.js"></script>');

  // 7. Replace vendor script links
  res = res.replace(
    /https:\/\/d3e54v103j8qbb\.cloudfront\.net\/js\/jquery-[0-9\.]+\.min\.[a-z0-9]+\.js\?site=[a-z0-9]+/gi,
    '/vendor/jquery.min.js'
  );
  res = res.replace(
    /https:\/\/cdn\.prod\.website-files\.com\/[^\/]+\/js\/webflow\.[a-z0-9\.]+\.js/gi,
    '/vendor/webflow.js'
  );
  res = res.replace(/https:\/\/unpkg\.com\/@barba\/core/gi, '/vendor/barba.min.js');
  res = res.replace(/https:\/\/cdn\.jsdelivr\.net\/npm\/gsap@[^\/]+\/dist\/gsap\.min\.js/gi, '/vendor/gsap.min.js');
  res = res.replace(
    /https:\/\/cdn\.jsdelivr\.net\/npm\/gsap@[^\/]+\/dist\/ScrollTrigger\.min\.js/gi,
    '/vendor/ScrollTrigger.min.js'
  );
  res = res.replace(
    /https:\/\/cdn\.jsdelivr\.net\/npm\/gsap@[^\/]+\/dist\/SplitText\.min\.js/gi,
    '/vendor/SplitText.min.js'
  );
  res = res.replace(
    /https:\/\/cdn\.jsdelivr\.net\/npm\/gsap@[^\/]+\/dist\/CustomEase\.min\.js/gi,
    '/vendor/CustomEase.min.js'
  );
  res = res.replace(/https:\/\/unpkg\.com\/lenis@[^\/]+\/dist\/lenis\.min\.js/gi, '/vendor/lenis.min.js');
  res = res.replace(
    /https:\/\/cdn\.jsdelivr\.net\/npm\/lottie-web@[^\/]+\/build\/player\/lottie\.min\.js/gi,
    '/vendor/lottie.min.js'
  );

  // 8. Replace all asset URLs using assetMap
  for (const url of sortedUrls) {
    const local = assetMap[url];
    if (res.includes(url)) {
      res = res.split(url).join(local);
    }
  }

  // 9. Ensure local fonts are linked in head
  const fontStyle = `
  <style>
    @font-face {
      font-family: 'ambroise-francois-std';
      src: url('/fonts/ambroise-francois-std.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'sloop-script-three';
      src: url('/fonts/sloop-script-three.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
  </style>
`;
  if (!res.includes('/fonts/ambroise-francois-std.woff2')) {
    res = res.replace('</head>', fontStyle + '\n</head>');
  }

  return res;
}

for (const p of pages) {
  const raw = fs.readFileSync(p.src, 'utf8');
  const cleaned = cleanHtml(raw);
  fs.writeFileSync(p.dest, cleaned, 'utf8');
  console.log(`Generated ${p.dest} (${cleaned.length} bytes)`);
}
