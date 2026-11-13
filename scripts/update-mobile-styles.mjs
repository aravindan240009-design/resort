import fs from 'fs';

const cssContent = `/* ==========================================================================
   AURA RESIDENCES - CUSTOM COMMERCIAL REAL ESTATE TEMPLATE ENHANCEMENTS
   ========================================================================== */

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

/* 2. Hero Title Font Size (Clean Luxury Proportion) */
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

  /* Reset GSAP scroll-reveal transforms on mobile so elements sit naturally in normal document flow */
  [data-scroll-reveal],
  [data-scroll-reveal] *,
  [data-part],
  [data-part] *,
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

  /* Hero Section Mobile Proportions */
  .hero-s_logo .h1 {
    font-size: clamp(40px, 11vw, 54px) !important;
    line-height: 0.94 !important;
    letter-spacing: -0.01em !important;
    text-align: center !important;
  }
  .hero-s_logo_a .a2 {
    font-size: clamp(30px, 8.5vw, 42px) !important;
    margin-top: -0.25rem !important;
    margin-left: 0 !important;
    text-align: center !important;
    display: block !important;
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
`;

// 1. Update public/css/era-residence.shared.css
let shared = fs.readFileSync('public/css/era-residence.shared.css', 'utf8');
const startIdx = shared.indexOf('/* ==========================================================================');
if (startIdx !== -1) {
  shared = shared.slice(0, startIdx) + cssContent;
  fs.writeFileSync('public/css/era-residence.shared.css', shared, 'utf8');
  console.log('Successfully updated public/css/era-residence.shared.css');
}

// 2. Update scripts/build-all-pages.mjs
let buildScript = fs.readFileSync('scripts/build-all-pages.mjs', 'utf8');
const styleTagStart = buildScript.indexOf('<style id="aura-template-enhancements">');
const styleTagEnd = buildScript.indexOf('</style>', styleTagStart);
if (styleTagStart !== -1 && styleTagEnd !== -1) {
  const cssInner = cssContent.replace('/* ==========================================================================\n   AURA RESIDENCES - CUSTOM COMMERCIAL REAL ESTATE TEMPLATE ENHANCEMENTS\n   ========================================================================== */\n', '');
  buildScript = buildScript.slice(0, styleTagStart) + '<style id="aura-template-enhancements">\n' + cssInner + '\n  ' + buildScript.slice(styleTagEnd);
  fs.writeFileSync('scripts/build-all-pages.mjs', buildScript, 'utf8');
  console.log('Successfully updated scripts/build-all-pages.mjs');
}
