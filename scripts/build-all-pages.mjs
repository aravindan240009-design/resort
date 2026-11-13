import fs from 'fs';
import path from 'path';

const assetMap = JSON.parse(fs.readFileSync('extracted/asset-map.json', 'utf8'));
const sortedUrls = Object.keys(assetMap).sort((a, b) => b.length - a.length);

const slugs = [
  '011', '012', '031', '032', '033', '034',
  '111', '112', '113', '114', '121', '122',
  '123', '124', '131', '132', '133', '134',
  '211', '212', '213', '221', '222', '223',
  '224'
];

const deskBadge = `<div class="header-logo_bg b-desk w-embed"><svg width="100%" height="100%" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <path id="circle-badge-desk" d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" />
  </defs>
  <text font-size="8.8" letter-spacing="3.5" fill="currentColor" text-anchor="middle" font-family="'Maison Neue Extended', Arial, sans-serif" font-weight="700">
    <textPath href="#circle-badge-desk" startOffset="50%">[YOUR BRAND] • RESIDENCES • </textPath>
  </text>
</svg></div>`;

const mobBadge = `<div class="header-logo_bg b-mob w-embed"><svg width="100%" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <path id="circle-badge-mob" d="M 40,40 m -29,0 a 29,29 0 1,1 58,0 a 29,29 0 1,1 -58,0" />
  </defs>
  <text font-size="5.8" letter-spacing="2.4" fill="currentColor" text-anchor="middle" font-family="'Maison Neue Extended', Arial, sans-serif" font-weight="700">
    <textPath href="#circle-badge-mob" startOffset="50%">[YOUR BRAND] • RESIDENCES • </textPath>
  </text>
</svg></div>`;

const headEnhancements = `
  <link rel="preload" href="/fonts/ambroise-francois-std.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/sloop-script-three.woff2" as="font" type="font/woff2" crossorigin>
  <style id="aura-fonts">
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
  <style id="aura-template-enhancements">
    /* 1. Flower Background Fix: 100% transparent knockout of poster & video white boxes */
    .flower,
    .flower video,
    .flower img,
    .flower svg,
    .loc-path-w_flower .flower {
      mix-blend-mode: multiply !important;
      background: transparent !important;
      background-color: transparent !important;
      pointer-events: none !important;
    }

    /* 2. Hero Title Font Size Reduction (Clean Luxury Proportion) */
    .hero-s_logo .h1 {
      font-size: clamp(56px, 5.2vw, 82px) !important;
      line-height: 0.95 !important;
      letter-spacing: 0.01em !important;
    }
    .hero-s_logo_a .a2 {
      font-size: clamp(32px, 3vw, 48px) !important;
      margin-top: -1.2rem !important;
      margin-left: -0.8rem !important;
    }

    /* 2b. Floating Tip Cards with Architectural Images */
    .floating-tip-card {
      min-height: 390px !important;
      height: auto !important;
      aspect-ratio: auto !important;
    }
    .floating-tip-card_img {
      position: relative !important;
      z-index: 1 !important;
      flex-shrink: 0 !important;
    }

    /* 3. Responsive Mobile Phone Optimizations (<= 991px & <= 767px) */
    @media screen and (max-width: 991px) {
      .hero-s_logo .h1 {
        font-size: clamp(32px, 8.5vw, 48px) !important;
        line-height: 0.95 !important;
      }
      .hero-s_logo_a .a2 {
        font-size: clamp(22px, 5.5vw, 34px) !important;
        margin-top: -0.8rem !important;
        margin-left: -0.4rem !important;
      }
      .flower {
        z-index: 0 !important;
        max-width: 45vw !important;
        max-height: 45vw !important;
        opacity: 0.75 !important;
        pointer-events: none !important;
      }
      .flower.loc-info { max-width: 40vw !important; max-height: 40vw !important; top: -15px !important; left: -15px !important; }
      .flower.loc-intro { max-width: 42vw !important; max-height: 42vw !important; bottom: -20px !important; left: -15px !important; }
      .flower.apart-info { max-width: 42vw !important; max-height: 42vw !important; bottom: -15px !important; left: -15px !important; }
      .flower.interior { max-width: 45vw !important; max-height: 45vw !important; }
      .flower.other { max-width: 40vw !important; max-height: 40vw !important; right: -15px !important; }

      .info-s_lead, .info-s_desc, .s_title, .loc-info-s_lead,
      .apart-info-s_title, .apart-info-s_lead, .apart-info-s_desc,
      .loc-intro-s_title, .loc-intro-s_desc, .loc-intro-s_cap,
      .loc-intro-s_title_t, .loc-intro-s_title_b,
      .s_title_h1, .s_title_h2, .s_title_sub,
      .h1, .h2, .h3, .h4, .l1, .l2, .p,
      [data-scroll-reveal], [data-parallax="title"] {
        position: relative !important;
        z-index: 2 !important;
      }

      .loc-path-s_title { text-align: center !important; padding: 0 1rem !important; }
      .loc-path-s_title_line { font-size: clamp(2rem, 7.5vw, 3.2rem) !important; line-height: 1.15 !important; display: inline-block !important; }
      .loc-path-s_title_a { font-size: clamp(2.4rem, 9vw, 4rem) !important; display: inline-block !important; }
      .apart-item_card { margin-bottom: 2rem !important; }
    }
  </style>
  <script id="aura-dummy-redirect-handler">
    document.addEventListener('DOMContentLoaded', function() {
      function showToast(msg) {
        var toast = document.getElementById('demo-toast');
        if (!toast) {
          toast = document.createElement('div');
          toast.id = 'demo-toast';
          toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#17233B;color:#fff;padding:12px 24px;border-radius:24px;font-family:sans-serif;font-size:13px;letter-spacing:0.5px;z-index:999999;box-shadow:0 8px 24px rgba(0,0,0,0.3);transition:opacity 0.3s,transform 0.3s;pointer-events:none;opacity:0;text-align:center;max-width:90vw;';
          document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
        clearTimeout(window.__demoToastTimer);
        window.__demoToastTimer = setTimeout(function() {
          toast.style.opacity = '0';
          toast.style.transform = 'translateX(-50%) translateY(10px)';
        }, 3000);
      }
      document.addEventListener('click', function(e) {
        var target = e.target.closest('[data-dummy-redirect], .social-btn, a[href="#privacy-policy"]');
        if (target) {
          e.preventDefault();
          var label = target.getAttribute('aria-label') || 'Social Profile';
          showToast(label + ' — Demo dummy redirect (placeholder for your brand profile)');
        }
      });
    });
  </script>
`;

function cleanAndTransformHtml(html, pageType = 'page', slug = '') {
  let res = html;

  // 1. Remove dns-prefetch and preconnect
  res = res.replace(/<link[^>]+rel=["'](?:dns-prefetch|preconnect)["'][^>]*>/gi, '');

  // 2. Remove Google Tag Manager entire block
  res = res.replace(/<!--\s*Google Tag Manager\s*-->[\s\S]*?<!--\s*End Google Tag Manager\s*-->/gi, '');
  res = res.replace(/<!--\s*Google Tag Manager \(noscript\)\s*-->[\s\S]*?<!--\s*End Google Tag Manager \(noscript\)\s*-->/gi, '');
  res = res.replace(/<noscript>[\s\S]*?<\/noscript>/gi, '');

  // 3. Remove Typekit scripts
  res = res.replace(/<script[^>]*use\.typekit\.net[\s\S]*?<\/script>/gi, '');
  res = res.replace(/<script[^>]*>\s*try\s*\{\s*Typekit\.load\(\);\s*\}\s*catch\s*\(e\)\s*\{\s*\}\s*<\/script>/gi, '');

  // 3b. STRIP THE CONSOLE CREDITS & ASCII SCRIPT
  const safeScriptRegex = /<script\b[^>]*>(?:(?!<\/script>)[\s\S])*?(?:THEFIRSTTHELAST|Ivan Chopei|console\.log\(\s*["']%c["'])(?:(?!<\/script>)[\s\S])*?<\/script>/gi;
  res = res.replace(safeScriptRegex, '');

  // 4. Remove integrity and crossorigin attributes from external links
  res = res.replace(/\s+integrity="[^"]*"/gi, '');
  res = res.replace(/\s+crossorigin="[^"]*"/gi, '');

  // 5. Replace stylesheet links to local paths
  res = res.replace(
    /https:\/\/cdn\.prod\.website-files\.com\/[^\/]+\/css\/era-residence\.webflow\.shared\.[a-z0-9]+\.min\.css/gi,
    '/css/era-residence.shared.css'
  );
  res = res.replace(/https:\/\/unpkg\.com\/lenis@[^\/]+\/dist\/lenis\.css/gi, '/css/lenis.css');

  // 6. Replace Slater loader script with local main.js
  const slaterRegex = /<script>\s*document\.addEventListener\('DOMContentLoaded',\s*function\s*\(\)\s*\{[\s\S]*?loadtwc\(src\);\s*\}\);\s*<\/script>/gi;
  res = res.replace(slaterRegex, '<script type="module" src="/src/scripts/main.js"></script>');

  // 7. Replace vendor scripts
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
  res = res.replace(/https:\/\/cdn\.jsdelivr\.net\/npm\/gsap@[^\/]+\/dist\/ScrollTrigger\.min\.js/gi, '/vendor/ScrollTrigger.min.js');
  res = res.replace(/https:\/\/cdn\.jsdelivr\.net\/npm\/gsap@[^\/]+\/dist\/SplitText\.min\.js/gi, '/vendor/SplitText.min.js');
  res = res.replace(/https:\/\/cdn\.jsdelivr\.net\/npm\/gsap@[^\/]+\/dist\/CustomEase\.min\.js/gi, '/vendor/CustomEase.min.js');
  res = res.replace(/https:\/\/unpkg\.com\/lenis@[^\/]+\/dist\/lenis\.min\.js/gi, '/vendor/lenis.min.js');
  res = res.replace(/https:\/\/cdn\.jsdelivr\.net\/npm\/lottie-web@[^\/]+\/build\/player\/lottie\.min\.js/gi, '/vendor/lottie.min.js');

  // 8. Replace all asset URLs using assetMap
  for (const url of sortedUrls) {
    const local = assetMap[url];
    if (res.includes(url)) {
      res = res.split(url).join(local);
    }
  }

  // 9. Rebrand circular rotating badge SVG to [YOUR BRAND] • RESIDENCES
  res = res.replace(/<div class="header-logo_bg b-desk w-embed">[\s\S]*?<\/div>/gi, deskBadge);
  res = res.replace(/<div class="header-logo_bg b-mob w-embed">[\s\S]*?<\/div>/gi, mobBadge);

  // 10a. HERO SECTION - PLACEHOLDER TITLES & CHENNAI LOCATION
  res = res.replace(/<h1 data-prevent-flicker="" data-scroll-reveal="h" class="h1 a-center">\s*Era\s*<br\s*\/?>\s*Residence\s*<\/h1>/gi,
    '<h1 data-prevent-flicker="" data-scroll-reveal="h" class="h1 a-center">[YOUR BRAND]<br/>RESIDENCES</h1>'
  );
  res = res.replace(/<div class="hero-s_logo_a"><h2 data-prevent-flicker="" data-scroll-reveal="a" class="a2">Estepona<\/h2><\/div>/gi,
    '<div class="hero-s_logo_a"><h2 data-prevent-flicker="" data-scroll-reveal="a" class="a2">Chennai</h2></div>'
  );

  // 10b. Preloader / Splash Screen Rebranding with Placeholders & Chennai Location
  res = res.replace(/<div class="preloader_logo"><div data-part="h" class="h3 a-center">\s*Era\s*<br\s*\/?>\s*Residence\s*<\/div><div class="preloader_logo_a"><div data-part="a" class="a2 preloader_a a-center">Estepona<\/div><\/div><\/div>/gi,
    '<div class="preloader_logo"><div data-part="h" class="h3 a-center">[YOUR BRAND]<br/>RESIDENCES</div><div class="preloader_logo_a"><div data-part="a" class="a2 preloader_a a-center">Chennai</div></div></div>'
  );
  res = res.replace(/<div class="preloader_title-l"><div data-part="h" class="c1 a-center">\s*Costa\s*<\/div><\/div>/gi,
    '<div class="preloader_title-l"><div data-part="h" class="c1 a-center">Chennai</div></div>'
  );
  res = res.replace(/<div class="preloader_title-r"><div data-part="h" class="c1 a-center">\s*del Sol\s*<\/div><\/div>/gi,
    '<div class="preloader_title-r"><div data-part="h" class="c1 a-center">India</div></div>'
  );
  res = res.replace(/<p data-part="p" class="l1 a-center">\s*Era Residence\s*<br\s*\/?>\s*A place to return to\.\s*<\/p>/gi,
    '<p data-part="p" class="l1 a-center">[YOUR RESIDENCES]<br/>A place to return to.</p>'
  );

  // 10c. Benefits & Highlights
  res = res.replace(/Three reasons to choose Era/gi, 'Key Highlights of [Your Residences]');
  res = res.replace(/making ERA/gi, 'making [Your Residences]');
  res = res.replace(/making AURA/gi, 'making [Your Residences]');

  // 10d. Contacts, Phone, Address - CHENNAI, TN, INDIA
  res = res.replace(/<div class="contact-cms w-dyn-list">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, '');
  res = res.replace(/<a[^>]*href="tel:[^"]*"[\s\S]*?<\/a>/gi, '');
  res = res.replace(/\+34\s*\(655\)\s*408-648/gi, '');
  res = res.replace(/\+1\s*\(800\)\s*555-0199(?:\s*\[Your Sales Hotline\])?/gi, '');
  res = res.replace(/"telephone":\s*"[^"]*",?/gi, '');
  
  // Specific Address & Geo replacements
  res = res.replace(/Avenida Litoral, 29680 Estepona, Málaga, Spain/gi, 'East Coast Road, Chennai, Tamil Nadu 600041, India');
  res = res.replace(/\[Your Sales Gallery Address\], \[Your City\]/gi, 'East Coast Road, Chennai, Tamil Nadu 600041, India');
  res = res.replace(/"streetAddress":\s*"[^"]*"/gi, '"streetAddress": "East Coast Road"');
  res = res.replace(/"addressLocality":\s*"[^"]*"/gi, '"addressLocality": "Chennai"');
  res = res.replace(/"addressRegion":\s*"[^"]*"/gi, '"addressRegion": "Tamil Nadu"');
  res = res.replace(/"addressCountry":\s*"[^"]*"/gi, '"addressCountry": "India"');
  res = res.replace(/"postalCode":\s*"[^"]*"/gi, '"postalCode": "600041"');
  res = res.replace(/New Golden Mile, Estepona Costa del Sol, Spain/gi, 'ECR Coastline, Chennai, Tamil Nadu, India');
  res = res.replace(/\[Your Prime Location\] Costa del Sol, Spain/gi, 'ECR Coastline, Chennai, Tamil Nadu, India');
  res = res.replace(/Costa del Sol, Spain/gi, 'Chennai, Tamil Nadu, India');
  res = res.replace(/Costa del Sol/gi, 'Chennai, India');
  res = res.replace(/Sales Office/g, 'Sales & VIP Gallery');
  res = res.replace(/info@aura-residences\.com/gi, 'sales@[yourcompany].com');

  // Google Maps Links to Chennai, TN, India
  res = res.replace(/https:\/\/maps\.app\.goo\.gl\/[a-zA-Z0-9_-]+/gi, 'https://maps.google.com/?q=Chennai+Tamil+Nadu+India');

  // 10e. General Brand & Location Text
  res = res.replace(/ERA Residence Estepona/gi, '[Your Brand] Residences — Chennai, TN, India');
  res = res.replace(/ERA Residence — Contemporary Mediterranean Residences in Estepona/gi, '[Your Brand] Residences — Luxury Coastal Residences in Chennai, TN, India');
  res = res.replace(/Residences in Estepona/gi, 'Residences in Chennai, TN, India');
  res = res.replace(/near Marbella and Estepona/gi, 'near Chennai, TN, India');
  res = res.replace(/New Golden Mile, Estepona/gi, 'ECR Coastline, Chennai');
  res = res.replace(/\[Your Prime Location\]/gi, 'ECR Coastline, Chennai');
  res = res.replace(/\[Your Location\]/gi, 'Chennai');
  res = res.replace(/ERA Residence/g, '[Your Brand] Residences');
  res = res.replace(/Era Residence/g, '[Your Brand] Residences');
  res = res.replace(/ERA RESIDENCE/g, '[YOUR BRAND] RESIDENCES');
  res = res.replace(/\bEstepona\b/g, 'Chennai');
  res = res.replace(/era-residence\.com/gi, 'yourdomain.com');
  res = res.replace(/data-wf-domain="www\.era-residence\.com"/gi, 'data-wf-domain="www.yourdomain.com"');

  // 10f. Social Media & External Links -> DUMMY REDIRECTS
  // Replace all social links and WhatsApp with safe dummy redirect anchors
  res = res.replace(/href="https:\/\/(?:www\.)?linkedin\.com\/company\/[^"]*"/gi, 'href="#" data-dummy-redirect="true" onclick="event.preventDefault(); return false;"');
  res = res.replace(/href="https:\/\/(?:www\.)?facebook\.com\/[^"]*"/gi, 'href="#" data-dummy-redirect="true" onclick="event.preventDefault(); return false;"');
  res = res.replace(/href="https:\/\/(?:www\.)?instagram\.com\/[^"]*"/gi, 'href="#" data-dummy-redirect="true" onclick="event.preventDefault(); return false;"');
  res = res.replace(/href="https:\/\/wa\.me\/[^"]*"/gi, 'href="#" data-dummy-redirect="true" onclick="event.preventDefault(); return false;"');
  res = res.replace(/href="https:\/\/thefirstthelast\.agency[^\s"']*"/gi, 'href="#" data-dummy-redirect="true" onclick="event.preventDefault(); return false;"');
  res = res.replace(/aria-label="The First The Last"/gi, 'aria-label="[Your Company Name]"');
  res = res.replace(/data-json="https:\/\/pub-157506367d4c4fa1825d7a6d26b687a2\.r2\.dev\/tftl-logo_white\.json"/gi, '');
  res = res.replace(/Made by\s*<\/div>\s*<div[^>]*>\s*<a[^>]*class="nav-item[^"]*"[^>]*>[\s\S]*?<\/a>/gi,
    'Made by</div><div data-text="p"><a hover-nav-item="" aria-label="[Your Company Name]" href="#" data-dummy-redirect="true" onclick="event.preventDefault(); return false;" class="nav-item w-inline-block"><div class="nav-item_label"><div class="nav-item_label_text"><div hover="text" class="l1">[Your Company Name]</div></div><div class="nav-item_label_text is-2"><div hover="text" class="l1">[Your Company Name]</div></div></div></a>'
  );

  // Ensure all social buttons have data-dummy-redirect and safe onclick
  res = res.replace(/class="social-btn\s+w-inline-block"/gi, 'class="social-btn w-inline-block" data-dummy-redirect="true" onclick="event.preventDefault(); return false;"');

  // Privacy Policy clean dummy redirect
  res = res.replace(/href="[^"]*politica_privacidad_era_residence\.pdf"/gi, 'href="#privacy-policy" data-dummy-redirect="true" onclick="event.preventDefault(); return false;"');
  res = res.replace(/href="\/assets\/images\/6a1576532e78ed7645599d9b_#privacy-policy"/gi, 'href="#privacy-policy" data-dummy-redirect="true" onclick="event.preventDefault(); return false;"');

  // 10g. Hotspot Floating Tip Cards Images
  res = res.replace(
    /<div class="floating-tip-card_t"><h1 class="h5">Crafted to Endure<\/h1><\/div>/gi,
    '<div class="floating-tip-card_t"><h1 class="h5">Crafted to Endure</h1></div><div class="floating-tip-card_img" style="margin: 0.85rem 0; width: 100%; height: 160px; overflow: hidden; border-radius: 4px; position: relative; z-index: 1;"><img src="/assets/images/crafted_to_endure.jpg" alt="Crafted to Endure" style="width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 4px;" loading="lazy" /></div>'
  );
  res = res.replace(
    /<div class="floating-tip-card_t"><h1 class="h5">Light &amp; Flow<\/h1><\/div>/gi,
    '<div class="floating-tip-card_t"><h1 class="h5">Light &amp; Flow</h1></div><div class="floating-tip-card_img" style="margin: 0.85rem 0; width: 100%; height: 160px; overflow: hidden; border-radius: 4px; position: relative; z-index: 1;"><img src="/assets/images/light_and_flow.jpg" alt="Light & Flow" style="width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 4px;" loading="lazy" /></div>'
  );
  res = res.replace(
    /<div class="floating-tip-card_t"><h1 class="h5">Your Private Sanctuary<\/h1><\/div>/gi,
    '<div class="floating-tip-card_t"><h1 class="h5">Your Private Sanctuary</h1></div><div class="floating-tip-card_img" style="margin: 0.85rem 0; width: 100%; height: 160px; overflow: hidden; border-radius: 4px; position: relative; z-index: 1;"><img src="/assets/images/private_sanctuary.jpg" alt="Your Private Sanctuary" style="width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 4px;" loading="lazy" /></div>'
  );
  res = res.replace(/<div data-text="p" class="l1">\s*(?:ERA|Aura|\[Your Brand\])\s*Residences?\.?\s*<\/div>/gi,
    '<div data-text="p" class="l1">[Your Brand] Residences.</div>'
  );
  res = res.replace(/©<span class="year">2026<\/span> All rights reserved/gi,
    '©<span class="year">2026</span> [Your Company Name]. All rights reserved.'
  );
  // 11. Add font preloads, enhancements, and dummy redirect handler in <head>
  if (!res.includes('id="aura-template-enhancements"')) {
    res = res.replace('</head>', headEnhancements + '\n</head>');
  }

  // 12. Universal navigation links & redirections audit
  // Ensure /apartments always resolves with trailing slash /apartments/
  res = res.replace(/href="\/apartments"(?!\/)/gi, 'href="/apartments/"');
  // Ensure apartment links use trailing slash /apartments/:slug/
  res = res.replace(/href="\/apartments\/([0-9]+)"/gi, 'href="/apartments/$1/"');
  // Ensure root / is clean
  res = res.replace(/href="\/"/gi, 'href="/"');

  return res;
}

// 1. Core pages
const corePages = [
  { src: 'extracted/pages/index.html', dest: 'index.html', type: 'home' },
  { src: 'extracted/pages/apartments.html', dest: 'apartments.html', type: 'apartments' },
  { src: 'extracted/pages/contact.html', dest: 'contact.html', type: 'contact' },
  { src: 'extracted/pages/coming-soon.html', dest: 'coming-soon.html', type: 'coming-soon' }
];

for (const p of corePages) {
  const raw = fs.readFileSync(p.src, 'utf8');
  const transformed = cleanAndTransformHtml(raw, p.type);
  fs.writeFileSync(p.dest, transformed, 'utf8');
  console.log(`Generated core page: ${p.dest} (${transformed.length} bytes)`);
}

// 2. All 25 Apartment Pages
fs.mkdirSync('apartments', { recursive: true });

for (const slug of slugs) {
  const srcFile = path.join('extracted/pages/apartments', `${slug}.html`);
  if (!fs.existsSync(srcFile)) {
    console.warn(`Warning: ${srcFile} does not exist`);
    continue;
  }
  const raw = fs.readFileSync(srcFile, 'utf8');
  const transformed = cleanAndTransformHtml(raw, 'apartment', slug);

  // A) Write apartments/{slug}/index.html (standard directory index)
  const dir = path.join('apartments', slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), transformed, 'utf8');

  // B) Write apartments/{slug}.html (direct flat file)
  fs.writeFileSync(path.join('apartments', `${slug}.html`), transformed, 'utf8');

  console.log(`Generated apartment page: apartments/${slug}/index.html & apartments/${slug}.html`);
}

console.log('All 29 pages built successfully with reduced font sizes and complete placeholders!');
