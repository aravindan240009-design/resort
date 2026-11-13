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

/* 1. Flower Background & Effects: 100% transparent knockout & rich vibrancy */
.flower,
.loc-path-w_flower .flower {
  mix-blend-mode: multiply !important;
  background: transparent !important;
  background-color: transparent !important;
  pointer-events: none !important;
  opacity: 1 !important;
  isolation: auto !important;
}

.flower video,
.flower img,
.flower svg {
  mix-blend-mode: multiply !important;
  background: transparent !important;
  background-color: transparent !important;
  filter: saturate(1.4) contrast(1.15) brightness(1.02) !important;
  object-fit: contain !important;
  opacity: 1 !important;
}

video {
  background-color: transparent !important;
  background: transparent !important;
}

/* 2. Hero Title Font Size & Desktop Alignment (Clean Luxury Proportion) */
.hero-s_logo .h1 {
  font-size: clamp(56px, 5.2vw, 82px) !important;
  line-height: 0.92 !important;
  letter-spacing: 0.01em !important;
  text-align: center !important;
}

.hero-s_logo_a {
  margin-top: 0.4rem !important;
  margin-left: 1.2rem !important;
  transform: rotate(-10deg) !important;
  display: block !important;
}

.hero-s_logo_a .a2 {
  font-size: clamp(34px, 3vw, 50px) !important;
  line-height: 1 !important;
  margin-top: 0 !important;
  margin-left: 0 !important;
  display: block !important;
  text-align: center !important;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.25) !important;
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
  /* Prevent horizontal scroll / clipping showing dark side background */
  html, body {
    overflow-x: hidden !important;
    max-width: 100vw !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    position: relative !important;
    background-color: #f3f3ec !important;
  }
  .transition-wrapper,
  .transition-container,
  [data-barba="wrapper"],
  main,
  .section,
  .container {
    overflow-x: clip !important;
    max-width: 100vw !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }

  /* Prevent oversized images or tracks from stretching viewport */
  .marquee_track,
  .marquee-w {
    overflow: hidden !important;
    max-width: 100vw !important;
  }
  .loc-w_bg_img,
  .loc-w_bg_img img {
    max-width: 100vw !important;
    overflow: hidden !important;
  }

  /* Reset GSAP scroll-reveal & parallax transforms on mobile so elements sit naturally in normal document flow */
  [data-scroll-reveal],
  [data-scroll-reveal] *,
  [data-part],
  [data-part] *,
  [data-parallax],
  [data-parallax] *,
  [data-scrub-reveal],
  [data-scrub-reveal] *,
  .loc-info-s,
  .loc-info-s *,
  .loc-intro-s,
  .loc-intro-s *,
  .loc-path-s,
  .loc-path-s *,
  .footer-s,
  .footer-s *,
  .quote-s,
  .quote-s *,
  .hero-s,
  .hero-s *,
  .benefits-intro-s,
  .benefits-intro-s *,
  .split-line-mask,
  .split-line,
  .split-word-mask,
  .split-word,
  .split-char {
    opacity: 1 !important;
    transform: none !important;
    translate: none !important;
    visibility: visible !important;
  }

  /* Eliminate multi-viewport artificial empty space on mobile */
  .hero-scroll-area {
    height: 100vh !important;
    min-height: 580px !important;
    max-height: 844px !important;
    position: relative !important;
  }
  .hero-w {
    position: relative !important;
    height: 100% !important;
    min-height: 100% !important;
  }
  .hero-w_bg {
    position: absolute !important;
    inset: 0 !important;
    height: 100% !important;
  }
  .hero-w_bg_master {
    height: 100% !important;
  }
  .hero_themes {
    display: none !important;
    height: 0 !important;
  }
  .slow-scroll-trigger {
    display: none !important;
    height: 0 !important;
  }

  /* Compact spacers: Eliminate giant empty voids on mobile */
  .u-272.b-mob,
  .u-272 {
    height: clamp(24px, 5vw, 40px) !important;
  }
  .u-160.b-mob,
  .u-160 {
    height: clamp(20px, 4vw, 32px) !important;
  }
  .u-96.b-mob,
  .u-96 {
    height: clamp(16px, 3vw, 24px) !important;
  }
  .u-64 {
    height: clamp(14px, 2.5vw, 20px) !important;
  }
  .u-48.b-mob,
  .u-48 {
    height: clamp(12px, 2vw, 16px) !important;
  }

  /* Location section: Stack children vertically so content flows naturally */
  .loc-scroll-area {
    height: auto !important;
    min-height: auto !important;
    overflow: visible !important;
    position: relative !important;
    display: block !important;
  }
  .loc-scroll-area_screen {
    display: block !important;
    flex-direction: column !important;
    width: 100% !important;
    max-width: 100vw !important;
    height: auto !important;
    position: relative !important;
    overflow: visible !important;
  }
  .loc-scroll-area_track {
    display: flex !important;
    flex-direction: column !important;
    flex-wrap: nowrap !important;
    width: 100% !important;
    max-width: 100vw !important;
    height: auto !important;
    position: relative !important;
    overflow: visible !important;
  }
  .loc-info-w,
  .loc-intro-w,
  .loc-path-w {
    width: 100% !important;
    max-width: 100vw !important;
    height: auto !important;
    min-height: auto !important;
    position: relative !important;
    overflow: visible !important;
    display: block !important;
    padding-left: 16px !important;
    padding-right: 16px !important;
    box-sizing: border-box !important;
  }

  /* Amenities section */
  .amen-scroll-area {
    height: auto !important;
    min-height: auto !important;
    position: relative !important;
    display: block !important;
  }
  .amen-scroll-area .scroll-area_screen {
    height: auto !important;
    min-height: 500px !important;
    position: relative !important;
  }
  .amen-scroll-area .hero_themes {
    display: none !important;
    height: 0 !important;
  }

  /* Footer section */
  .footer-s {
    opacity: 1 !important;
    visibility: visible !important;
    transform: none !important;
    height: auto !important;
    min-height: auto !important;
    padding: 48px 16px 32px !important;
  }
  .footer-s_s-top {
    display: none !important;
  }

  /* Hero Section Mobile Proportions */
  .hero-s_logo .h1 {
    font-size: clamp(40px, 11vw, 54px) !important;
    line-height: 0.94 !important;
    letter-spacing: -0.01em !important;
    text-align: center !important;
  }
  .hero-s_logo_a {
    margin-top: 0.4rem !important;
    margin-left: 0.8rem !important;
    transform: rotate(-10deg) !important;
    display: block !important;
  }
  .hero-s_logo_a .a2 {
    font-size: clamp(32px, 8.5vw, 44px) !important;
    line-height: 1 !important;
    margin-top: 0 !important;
    margin-left: 0 !important;
    text-align: center !important;
    display: block !important;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3) !important;
  }

  /* Flanking Title: A Place / To Return To */
  .hero-s_title {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    width: 100% !important;
    padding: 0 16px !important;
    margin-top: 18px !important;
    box-sizing: border-box !important;
  }
  .hero-s_tabs {
    display: none !important;
  }
  .hero-s_title .a-left {
    text-align: left !important;
    font-size: 13px !important;
    letter-spacing: 0.12em !important;
    text-transform: uppercase !important;
  }
  .hero-s_title .a-right {
    text-align: right !important;
    font-size: 13px !important;
    letter-spacing: 0.12em !important;
    text-transform: uppercase !important;
  }

  /* Circular CTA Button (View Available Apartments) */
  .hero-s_btn,
  .hero-s_b .btn-circle {
    width: 146px !important;
    height: 146px !important;
    margin: 0 auto !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    position: relative !important;
  }
  .btn-circle_bg {
    width: 100% !important;
    height: 100% !important;
    position: absolute !important;
    inset: 0 !important;
  }
  .btn-circle_bg svg {
    width: 100% !important;
    height: 100% !important;
    display: block !important;
  }
  .btn-circle_label {
    position: absolute !important;
    inset: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    text-align: center !important;
    padding: 12px !important;
    box-sizing: border-box !important;
  }
  .btn-circle_label .l1 {
    font-size: 10.5px !important;
    line-height: 1.25 !important;
    letter-spacing: 0.1em !important;
    text-transform: uppercase !important;
  }

  /* Flower Effects & Positioning on Mobile */
  .flower {
    z-index: 1 !important;
    opacity: 1 !important;
    mix-blend-mode: multiply !important;
    background: transparent !important;
    background-color: transparent !important;
    pointer-events: none !important;
  }

  /* Concept section top-left cascading bougainvillea */
  .flower.loc-info {
    position: absolute !important;
    top: -15px !important;
    left: -15px !important;
    width: 55vw !important;
    height: 55vw !important;
    max-width: 240px !important;
    max-height: 240px !important;
    transform: none !important;
  }

  /* Hide awkward floating flower in location intro so it doesn't collide with the button */
  .flower.loc-intro {
    display: none !important;
  }

  .flower.apart-info {
    position: absolute !important;
    bottom: -15px !important;
    left: -15px !important;
    max-width: 42vw !important;
    max-height: 42vw !important;
  }

  .flower.interior {
    max-width: 45vw !important;
    max-height: 45vw !important;
  }

  .flower.other {
    position: absolute !important;
    top: 0 !important;
    right: -15px !important;
    max-width: 42vw !important;
    max-height: 42vw !important;
  }

  /* Concept Section Text Hierarchy & Safe Spacing */
  .loc-info-s {
    padding-top: 80px !important;
    padding-bottom: 40px !important;
    min-height: auto !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    text-align: center !important;
  }
  .loc-info-s .s_title {
    text-align: center !important;
    margin-bottom: 20px !important;
  }
  .loc-info-s .s_title .l1 {
    font-size: 11px !important;
    letter-spacing: 0.25em !important;
    text-transform: uppercase !important;
    font-weight: 700 !important;
  }
  .loc-info-s .info-s_lead .h4 {
    font-size: clamp(22px, 6.2vw, 30px) !important;
    line-height: 1.15 !important;
    text-align: center !important;
    margin: 0 auto 20px !important;
    max-width: 90% !important;
    text-transform: uppercase !important;
  }
  .loc-info-s .info-s_desc .p1 {
    font-size: 13.5px !important;
    line-height: 1.6 !important;
    text-align: center !important;
    max-width: 86% !important;
    margin: 0 auto 24px !important;
    color: #17233B !important;
    text-align: center !important;
  }
  .loc-info-s .s_logo {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    margin: 0 auto !important;
  }

  /* Location Intro (New Golden Mile) Section */
  .loc-intro-s {
    padding-top: 56px !important;
    padding-bottom: 36px !important;
    text-align: center !important;
  }
  .loc-intro-s_cap .c1 {
    font-size: 11px !important;
    letter-spacing: 0.3em !important;
    text-transform: uppercase !important;
    text-align: center !important;
    margin-bottom: 12px !important;
    display: block !important;
  }
  .loc-intro-s_title .h1 {
    font-size: clamp(36px, 10vw, 50px) !important;
    line-height: 0.95 !important;
    text-align: center !important;
    margin-bottom: 16px !important;
  }
  .loc-intro-s_title_line {
    display: block !important;
    text-align: center !important;
  }
  .loc-intro-s_img {
    width: 92% !important;
    max-width: 100% !important;
    margin: 0 auto 20px !important;
    overflow: hidden !important;
    border-radius: 4px !important;
  }
  .loc-intro-s_img img {
    width: 100% !important;
    height: auto !important;
    display: block !important;
  }
  .loc-intro-s_desc {
    max-width: 88% !important;
    margin: 0 auto 24px !important;
    text-align: center !important;
  }
  .loc-intro-s_btn {
    width: 100% !important;
    margin: 28px auto 0 !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    grid-column: 1 / -1 !important;
  }
  .loc-intro-s_btn .btn-circle {
    width: 146px !important;
    height: 146px !important;
    margin: 0 auto !important;
  }

  /* Full-Width Road-Like Coastal Journey Line */
  .loc-path-w {
    width: 100% !important;
    max-width: 100vw !important;
    overflow: hidden !important;
    padding: 0 !important;
  }
  .loc-path-s {
    height: auto !important;
    min-height: auto !important;
    padding: 36px 0 20px !important;
    overflow: visible !important;
  }
  .loc-path-s_title {
    text-align: center !important;
    width: 100% !important;
    padding: 0 16px !important;
    margin-bottom: 24px !important;
    box-sizing: border-box !important;
  }
  .loc-path-s_title_line {
    font-size: clamp(24px, 7vw, 36px) !important;
    line-height: 1.1 !important;
    letter-spacing: -0.01em !important;
    display: block !important;
    text-align: center !important;
    text-transform: uppercase !important;
  }
  .loc-path-s_title_a {
    font-size: clamp(30px, 9vw, 44px) !important;
    line-height: 1 !important;
    display: block !important;
    text-align: center !important;
    margin-top: -0.4rem !important;
  }
  .loc-path-s_path {
    grid-column: 1 / -1 !important;
    grid-area: 1 / 1 / 2 / -1 !important;
    width: calc(100% + 3rem) !important;
    margin-left: -1.5rem !important;
    max-width: none !important;
    position: relative !important;
    overflow: hidden !important;
  }
  .loc-path-s_path_c {
    position: relative !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    margin: 0 auto !important;
  }
  .loc-path-s_path_c img.img.loc-path {
    position: absolute !important;
    inset: 0 !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: contain !important;
    display: block !important;
  }
  .loc-path-s_path_c img.img.h-auto {
    position: relative !important;
    width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
    display: block !important;
  }

  /* Amenities Section Mobile Layout (Matching Reference) */
  .amm-s_cms_tabs-w {
    width: 100% !important;
    margin: 0 auto !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    text-align: center !important;
  }
  .amm-s_cms_tabs {
    width: 100% !important;
    margin: 0 auto !important;
    text-align: center !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
  }
  .amen-tabs-cms {
    width: 100% !important;
  }
  .amen-tabs-cms_list {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 14px !important;
    width: 100% !important;
    text-align: center !important;
  }
  .amen-tabs-cms_list_item {
    width: 100% !important;
    text-align: center !important;
  }
  .amen-tab {
    width: 100% !important;
    text-align: center !important;
    cursor: pointer !important;
    padding: 4px 0 !important;
  }
  .amen-tab .h5 {
    font-family: 'ambroise-francois-std', serif !important;
    font-size: clamp(22px, 6vw, 30px) !important;
    line-height: 1.15 !important;
    letter-spacing: 0.04em !important;
    text-transform: uppercase !important;
    text-align: center !important;
    color: #fff !important;
    opacity: 0.55 !important;
    transition: opacity 0.3s ease, transform 0.3s ease !important;
  }
  .amen-tab.is-active .h5,
  .amen-tab:hover .h5 {
    opacity: 1 !important;
    transform: scale(1.02) !important;
  }
  .amm-s_cms_tabs_line {
    display: none !important;
  }

  /* High-resolution rendering & optimal positioning for all mobile images */
  img {
    image-rendering: -webkit-optimize-contrast;
  }
  .hero-w_bg_master_img_day img,
  .hero-w_bg_master_img_night img {
    object-fit: cover !important;
    object-position: center 38% !important;
    width: 100% !important;
    height: 100% !important;
  }
  .amen-slide_img,
  .amen-slide_img img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center !important;
  }
  .benefit-slide_img,
  .benefit-slide_img img {
    width: 100% !important;
    height: auto !important;
    object-fit: cover !important;
    object-position: center !important;
  }

  /* Guarantee all text typography stays crisp and high z-index */
  .info-s_lead,
  .info-s_desc,
  .s_title,
  .loc-info-s_lead,
  .apart-info-s_title,
  .apart-info-s_lead,
  .apart-info-s_desc,
  .loc-intro-s_title,
  .loc-intro-s_desc,
  .loc-intro-s_cap,
  .loc-intro-s_title_t,
  .loc-intro-s_title_b,
  .s_title_h1,
  .s_title_h2,
  .s_title_sub,
  .h1, .h2, .h3, .h4,
  .l1, .l2, .p,
  [data-scroll-reveal],
  [data-parallax="title"] {
    position: relative !important;
    z-index: 2 !important;
  }

  /* Spacing improvements for apartment cards on phone view */
  .apart-item_card {
    margin-bottom: 2rem !important;
  }
}

/* 4. High-definition template typography & contrast */
::selection {
  background: #1d252c;
  color: #f3f3ec;
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
fs.mkdirSync('apartments', { recursive: true });
fs.mkdirSync('contact', { recursive: true });
fs.mkdirSync('coming-soon', { recursive: true });

const corePages = [
  { src: 'extracted/pages/index.html', dest: 'index.html', type: 'home' },
  { src: 'extracted/pages/apartments.html', dest: 'apartments.html', type: 'apartments' },
  { src: 'extracted/pages/apartments.html', dest: 'apartments/index.html', type: 'apartments' },
  { src: 'extracted/pages/contact.html', dest: 'contact.html', type: 'contact' },
  { src: 'extracted/pages/contact.html', dest: 'contact/index.html', type: 'contact' },
  { src: 'extracted/pages/coming-soon.html', dest: 'coming-soon.html', type: 'coming-soon' },
  { src: 'extracted/pages/coming-soon.html', dest: 'coming-soon/index.html', type: 'coming-soon' }
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
