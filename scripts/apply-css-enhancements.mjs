import fs from 'fs';

const customCss = `

/* ==========================================================================
   AURA RESIDENCES - CUSTOM COMMERCIAL REAL ESTATE TEMPLATE ENHANCEMENTS
   ========================================================================== */

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

  /* Keep decorative flowers tasteful and prevent them from covering text */
  .flower {
    z-index: 0 !important;
    max-width: 45vw !important;
    max-height: 45vw !important;
    opacity: 0.75 !important;
    pointer-events: none !important;
  }

  .flower.loc-info {
    max-width: 40vw !important;
    max-height: 40vw !important;
    top: -15px !important;
    left: -15px !important;
  }

  .flower.loc-intro {
    max-width: 42vw !important;
    max-height: 42vw !important;
    bottom: -20px !important;
    left: -15px !important;
  }

  .flower.apart-info {
    max-width: 42vw !important;
    max-height: 42vw !important;
    bottom: -15px !important;
    left: -15px !important;
  }

  .flower.interior {
    max-width: 45vw !important;
    max-height: 45vw !important;
  }

  .flower.other {
    max-width: 40vw !important;
    max-height: 40vw !important;
    right: -15px !important;
  }

  /* Guarantee all text typography, titles, leads, and descriptions stay high z-index */
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

  /* Text alignments on mobile */
  .loc-path-s_title {
    text-align: center !important;
    padding: 0 1rem !important;
  }

  .loc-path-s_title_line {
    font-size: clamp(2rem, 7.5vw, 3.2rem) !important;
    line-height: 1.15 !important;
    display: inline-block !important;
  }

  .loc-path-s_title_a {
    font-size: clamp(2.4rem, 9vw, 4rem) !important;
    display: inline-block !important;
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

const files = [
  'public/css/era-residence.shared.css',
  'public/css/aura-residence.shared.css'
];

for (const f of files) {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    const marker = '/* ==========================================================================\n   AURA RESIDENCES - CUSTOM COMMERCIAL REAL ESTATE TEMPLATE ENHANCEMENTS';
    if (content.includes(marker)) {
      content = content.split(marker)[0].trim();
    }
    content += '\n' + customCss;
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Updated ${f} with custom enhancements (${content.length} bytes)`);
  }
}
