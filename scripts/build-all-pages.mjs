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
    /* 1. Flower Background & Color Fix: 100% transparent cutouts & rich desktop bougainvillea vibrancy */
    .flower,
    .flower .flower_mob_img,
    .loc-path-w_flower .flower {
      background: transparent !important;
      background-color: transparent !important;
      pointer-events: none !important;
      isolation: auto !important;
      opacity: 1 !important;
    }

    .flower video,
    .flower img,
    .flower .flower_mob_img {
      filter: saturate(1.4) contrast(1.15) brightness(1.02) !important;
      object-fit: contain !important;
      opacity: 1 !important;
    }

    /* Desktop flower styling (>= 992px) */
    @media screen and (min-width: 992px) {
      .flower .flower_mob_img {
        display: none !important;
      }
      .flower video {
        display: block !important;
        mix-blend-mode: multiply !important;
      }
      .flower.interior video {
        mix-blend-mode: normal !important;
      }
    }

    /* 2. Hero Title Font Size Reduction (Clean Luxury Proportion) */
    .hero-s_logo .h1 {
      font-size: clamp(56px, 5.2vw, 82px) !important;
      line-height: 0.98 !important;
      letter-spacing: 0.01em !important;
    }
    .hero-s_logo_a {
      margin-top: -15px !important;
      margin-left: -20px !important;
      transform: rotate(-9deg) !important;
    }
    .hero-s_logo_a .a2 {
      font-size: clamp(34px, 3vw, 48px) !important;
      margin-top: 0 !important;
      margin-left: 0 !important;
    }

    /* 2a. Global Apartment & Filter Dropdown Display Fix:
       Ensure closed dropdowns are NEVER rendered or leaking into the page */
    .filter_select:not(.is-open) .filter_select_drop-down,
    [data-select='']:not(.is-open) [data-select='drop-down'] {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }

    .filter_select.is-open .filter_select_drop-down,
    [data-select=''].is-open [data-select='drop-down'] {
      display: block !important;
      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: auto !important;
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
        font-size: clamp(34px, 8.5vw, 48px) !important;
        line-height: 1.05 !important;
        letter-spacing: 0.02em !important;
        text-align: center !important;
        margin: 0 auto !important;
      }
      .hero-s_logo_a {
        margin-top: 6px !important;
        margin-left: 0 !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        width: 100% !important;
        transform: rotate(-6deg) !important;
      }
      .hero-s_logo_a .a2 {
        font-size: clamp(26px, 6.5vw, 38px) !important;
        margin-top: 0 !important;
        margin-left: 0 !important;
        display: inline-block !important;
        color: #f3f0e8 !important;
        opacity: 0.95 !important;
      }
      /* Compact spacers: remove excessive padding and whitespace on phone view */
      .u-272.b-mob, .u-272 { height: clamp(24px, 5vw, 36px) !important; }
      .u-160.b-mob, .u-160 { height: clamp(18px, 4vw, 28px) !important; }
      .u-96.b-mob, .u-96 { height: clamp(14px, 3vw, 22px) !important; }
      .u-64.b-mob, .u-64 { height: clamp(12px, 2.5vw, 18px) !important; }
      .u-48.b-mob, .u-48 { height: clamp(10px, 2vw, 16px) !important; }
      .u-32.b-mob, .u-32 { height: clamp(8px, 1.8vw, 14px) !important; }

      /* Hero Section Optical Centering on Phone View:
         Keeps [YOUR BRAND] RESIDENCES centered vertically & horizontally on mobile screen */
      .hero-s > .u-272.b-mob {
        height: clamp(190px, 28vh, 270px) !important;
      }
      .hero-s_logo {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        text-align: center !important;
        width: 100% !important;
      }

      /* Hero Subtitle 'A place — to return to' cohesive balanced alignment */
      .hero-s_title {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        text-align: center !important;
        width: 100% !important;
        margin: clamp(14px, 2.8vh, 24px) auto 0 auto !important;
        gap: clamp(8px, 2.2vw, 16px) !important;
      }
      .hero-s_title .a-left,
      .hero-s_title .a-right {
        flex: 0 auto !important;
        text-align: center !important;
        display: inline-flex !important;
        align-items: center !important;
      }
      .hero-s_title .span {
        font-size: clamp(14px, 3.8vw, 17px) !important;
        letter-spacing: 0.08em !important;
        text-transform: uppercase !important;
        opacity: 0.9 !important;
        white-space: nowrap !important;
      }
      .hero-s_title .a-left::after {
        content: '—';
        margin-left: clamp(8px, 2.2vw, 16px);
        opacity: 0.55;
        font-size: 0.9em;
      }

      /* Reduce empty viewport voids on mobile sections */
      .loc-info-s,
      .loc-intro-s,
      .quote-s,
      .benefit-slide {
        height: auto !important;
        min-height: auto !important;
        padding-top: clamp(20px, 4.5vw, 36px) !important;
        padding-bottom: clamp(20px, 4.5vw, 36px) !important;
        justify-content: center !important;
      }

      /* Luxury apartment intro section with proper breathing room on mobile */
      .apart-info-s {
        min-height: 90vh !important;
        height: auto !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
        padding-top: clamp(24px, 5vw, 40px) !important;
        padding-bottom: clamp(40px, 8vw, 60px) !important;
        position: relative !important;
      }

      /* Mobile phone flower styling (<= 991px):
         Enables dancing bougainvillea video playback with transparent background knockout */
      .flower {
        mix-blend-mode: normal !important;
        background: transparent !important;
        background-color: transparent !important;
        isolation: auto !important;
        opacity: 1 !important;
        pointer-events: none !important;
      }
      .flower video {
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        object-fit: contain !important;
        mix-blend-mode: multiply !important;
        pointer-events: none !important;
        background: transparent !important;
        background-color: transparent !important;
        filter: saturate(1.4) contrast(1.15) brightness(1.02) !important;
      }
      .flower .flower_mob_img {
        display: none !important;
      }
      .flower.interior video {
        mix-blend-mode: normal !important;
      }

      .flower.loc-info {
        max-width: 44vw !important;
        max-height: 44vw !important;
        top: -12px !important;
        left: -15px !important;
        z-index: 2 !important;
      }
      .flower.loc-intro {
        max-width: 44vw !important;
        max-height: 44vw !important;
        bottom: -15px !important;
        left: -20px !important;
        z-index: 1 !important;
      }
      .flower.apart-info {
        max-width: 32vw !important;
        max-height: 32vw !important;
        bottom: -10px !important;
        left: -15px !important;
        z-index: 1 !important;
      }
      .flower.interior {
        max-width: 38vw !important;
        max-height: 38vw !important;
        top: -24px !important;
        right: -8px !important;
        z-index: 5 !important;
      }
      .flower.other {
        max-width: 44vw !important;
        max-height: 44vw !important;
        top: -10px !important;
        right: -15px !important;
        z-index: 2 !important;
      }

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

      /* Zoom out coastline route line on phone view keeping all other elements same size */
      .loc-path-s_path {
        grid-column: 1 / -1 !important;
        grid-area: 1 / 1 / 2 / -1 !important;
        width: 100% !important;
        max-width: 100% !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
        overflow: visible !important;
        padding: 0 0.5rem !important;
        box-sizing: border-box !important;
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

      /* Amenities tabs: bigger font and positioned on the right side of the screen */
      .amm-s_cms_tabs-w {
        width: 100% !important;
        left: 0 !important;
        right: 0 !important;
        top: clamp(60px, 12vh, 120px) !important;
        padding-right: clamp(20px, 6vw, 32px) !important;
        box-sizing: border-box !important;
        pointer-events: auto !important;
        z-index: 10 !important;
      }
      .amm-s_cms_tabs {
        width: 100% !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: flex-end !important;
        text-align: right !important;
        grid-column: 1 / -1 !important;
      }
      .amen-tabs-cms {
        width: 100% !important;
      }
      .amen-tabs-cms_list {
        display: flex !important;
        flex-direction: column !important;
        align-items: flex-end !important;
        text-align: right !important;
        gap: clamp(10px, 2.5vw, 16px) !important;
        width: 100% !important;
      }
      .amen-tabs-cms_list_item {
        width: auto !important;
        text-align: right !important;
      }
      .amen-tab {
        text-align: right !important;
        cursor: pointer !important;
        display: inline-block !important;
        padding: 2px 0 !important;
      }
      .amen-tab .h5 {
        font-family: 'ambroise-francois-std', serif !important;
        font-size: clamp(24px, 6.5vw, 36px) !important;
        line-height: 1.1 !important;
        letter-spacing: 0.03em !important;
        text-transform: uppercase !important;
        text-align: right !important;
        color: #fff !important;
        opacity: 0.55 !important;
        transition: opacity 0.3s ease, transform 0.3s ease !important;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.45) !important;
      }
      .amen-tab.is-active .h5,
      .amen-tab:hover .h5 {
        opacity: 1 !important;
      }
      .amm-s_cms_tabs_line {
        display: none !important;
      }

      /* Fit image to brown background card and make flower fully visible on phone */
      .interior-s_l_img-w {
        width: 100% !important;
        max-width: 100% !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
        padding-left: clamp(14px, 3.5vw, 20px) !important;
        padding-right: clamp(14px, 3.5vw, 20px) !important;
        padding-top: clamp(20px, 5vw, 28px) !important;
        padding-bottom: clamp(20px, 5vw, 28px) !important;
        aspect-ratio: auto !important;
        box-sizing: border-box !important;
        border-radius: 12px !important;
        overflow: visible !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
      }
      .interior-s_l_img {
        width: 100% !important;
        max-width: 100% !important;
        height: auto !important;
        aspect-ratio: 4/3 !important;
        border-radius: 8px !important;
        overflow: hidden !important;
      }
      .interior-s_l_img .img-w {
        width: 100% !important;
        height: 100% !important;
        clip-path: none !important;
        opacity: 1 !important;
      }
      .interior-s_l_img img {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        display: block !important;
      }
      .flower.interior,
      .flower.interior video,
      .flower.interior img {
        mix-blend-mode: normal !important;
        opacity: 1 !important;
        transform: none !important;
        visibility: visible !important;
        z-index: 5 !important;
        right: -8px !important;
        top: -24px !important;
        max-width: 38vw !important;
        max-height: 38vw !important;
        pointer-events: none !important;
      }

      .apart-item_card { margin-bottom: 2rem !important; }

      /* Mobile Apartment Filter Bar (Fixing overlap, clipping & layout) */
      .apart-s_cms_filter {
        height: auto !important;
        min-height: auto !important;
        padding: 16px 14px !important;
        margin-bottom: 24px !important;
      }

      .apart-s_cms_decor {
        height: 100% !important;
        min-height: 100% !important;
      }

      .apart-s_cms_filter_c {
        height: auto !important;
        width: 100% !important;
        position: relative !important;
        z-index: 2 !important;
      }

      .apart-s_cms_filter_c .grid._9-columns {
        display: flex !important;
        flex-direction: column !important;
        gap: 12px !important;
        width: 100% !important;
      }

      .apart-s_cms_filter_item {
        width: 100% !important;
        margin-bottom: 0 !important;
        padding: 0 !important;
        display: flex !important;
        flex-direction: column !important;
        position: relative !important;
      }

      .apart-s_cms_filter_item:has(.filter_select.is-open) {
        z-index: 150 !important;
      }

      .apart-s_cms_filter_item.is-last {
        flex-direction: row !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 12px !important;
      }

      .apart-s_cms_filter_item.is-last .filter_select {
        flex: 1 !important;
      }

      .apart-s_cms_filter_item.is-last [data-reset] {
        flex: none !important;
        padding: 10px 16px !important;
        font-size: 11px !important;
        letter-spacing: 0.08em !important;
        text-transform: uppercase !important;
        font-weight: 600 !important;
        color: var(--_colors---base-1000--primary, #17233B) !important;
        border: 1px solid rgba(23, 35, 59, 0.2) !important;
        border-radius: 4px !important;
        background: rgba(255, 255, 255, 0.6) !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        white-space: nowrap !important;
      }

      .filter_select {
        width: 100% !important;
        position: relative !important;
      }

      .filter_select.is-open {
        z-index: 160 !important;
      }

      .filter_select_btn {
        width: 100% !important;
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        padding: 10px 14px !important;
        border-radius: 4px !important;
        border: 1px solid rgba(23, 35, 59, 0.15) !important;
        background: rgba(255, 255, 255, 0.5) !important;
        cursor: pointer !important;
        box-sizing: border-box !important;
      }

      .filter_select_btn .l2.reg {
        font-size: 11px !important;
        letter-spacing: 0.06em !important;
        text-transform: uppercase !important;
        color: rgba(23, 35, 59, 0.7) !important;
        font-weight: 500 !important;
      }

      .filter_select_btn_label {
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
      }

      .filter_select_btn_label [data-select='value'] {
        font-size: 12px !important;
        font-weight: 600 !important;
        color: var(--_colors---base-1000--primary, #17233B) !important;
      }

      .filter_select_drop-down {
        position: absolute !important;
        top: calc(100% + 4px) !important;
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
        min-width: 100% !important;
        box-sizing: border-box !important;
        background-color: #f3f3ec !important;
        border: 1px solid rgba(23, 35, 59, 0.2) !important;
        border-radius: 6px !important;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
        z-index: 200 !important;
        padding: 6px !important;
      }

      .filter_select_drop-down_list {
        display: flex !important;
        flex-direction: column !important;
        gap: 2px !important;
      }

      .filter_select_drop-down_list_item {
        padding: 8px 12px !important;
        border-radius: 4px !important;
        cursor: pointer !important;
        font-size: 13px !important;
      }

      /* Mobile Apartment Media Scroll Gallery Navigation & Snapping */
      .lot-s_media.b-mob {
        position: relative !important;
        overflow: visible !important;
      }

      .lot-s_media.b-mob .lot-s_media_c {
        scroll-snap-type: x mandatory !important;
        scroll-behavior: smooth !important;
        -webkit-overflow-scrolling: touch !important;
      }

      .lot-s_media.b-mob .lot-s_media_layout_img-prim,
      .lot-s_media.b-mob .lot-media-cms_list_item {
        scroll-snap-align: start !important;
        scroll-snap-stop: always !important;
      }

      .apt-media-nav {
        position: absolute !important;
        top: 50% !important;
        left: 0 !important;
        right: 0 !important;
        transform: translateY(-50%) !important;
        pointer-events: none !important;
        z-index: 10 !important;
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        padding: 0 8px !important;
      }

      .apt-media-btn {
        pointer-events: auto !important;
        width: 44px !important;
        height: 44px !important;
        border-radius: 50% !important;
        background: rgba(29, 37, 44, 0.85) !important;
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        color: #ffffff !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        box-shadow: 0 4px 18px rgba(0, 0, 0, 0.35) !important;
        transition: transform 0.15s ease, opacity 0.25s ease, background-color 0.2s ease !important;
        outline: none !important;
        -webkit-tap-highlight-color: transparent !important;
        user-select: none !important;
      }

      .apt-media-btn:active {
        transform: scale(0.92) !important;
        background: rgba(29, 37, 44, 0.98) !important;
      }

      .apt-media-btn:disabled,
      .apt-media-btn[disabled] {
        opacity: 0 !important;
        pointer-events: none !important;
        transform: scale(0.85) !important;
      }

      .apt-media-counter {
        position: absolute !important;
        bottom: 12px !important;
        right: 14px !important;
        pointer-events: auto !important;
        background: rgba(29, 37, 44, 0.82) !important;
        backdrop-filter: blur(8px) !important;
        -webkit-backdrop-filter: blur(8px) !important;
        border: 1px solid rgba(255, 255, 255, 0.25) !important;
        color: #ffffff !important;
        font-family: inherit !important;
        font-size: 11px !important;
        font-weight: 500 !important;
        letter-spacing: 0.08em !important;
        padding: 4px 12px !important;
        border-radius: 20px !important;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25) !important;
        display: inline-flex !important;
        align-items: center !important;
        gap: 3px !important;
        z-index: 10 !important;
      }

      /* 6. Mobile Footer Layout & Alignment (Centered Logo & Address, Side-by-Side Bottom Credits) */
      .footer-w {
        margin-top: 0 !important;
        position: relative !important;
        height: auto !important;
        min-height: auto !important;
        overflow: visible !important;
      }

      .footer-w_bg {
        display: none !important;
      }

      .section.theme_on-dark {
        background-color: var(--_global-colors---brand-500--velvet-plum, #340c24) !important;
        height: auto !important;
        min-height: auto !important;
        padding-top: clamp(48px, 8vw, 64px) !important;
        padding-bottom: clamp(36px, 6vw, 48px) !important;
        position: relative !important;
        z-index: 5 !important;
      }

      .section.theme_on-dark .container {
        height: auto !important;
        min-height: auto !important;
        padding-left: clamp(16px, 4vw, 24px) !important;
        padding-right: clamp(16px, 4vw, 24px) !important;
      }

      .footer-s {
        height: auto !important;
        min-height: auto !important;
        opacity: 1 !important;
        visibility: visible !important;
        transform: none !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 36px !important;
        padding: 0 !important;
      }

      .footer-s,
      .footer-s *,
      .footer-s [data-text],
      .footer-s .split-char,
      .footer-s .split-word,
      .footer-s .split-line {
        opacity: 1 !important;
        visibility: visible !important;
      }

      .footer-s_t {
        display: none !important;
      }

      .footer-s_c {
        flex: none !important;
        margin-bottom: 0 !important;
        width: 100% !important;
      }

      .footer-s_c > .grid {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 16px !important;
        width: 100% !important;
      }

      .footer-s_contact {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        width: 100% !important;
        margin: 0 !important;
      }

      .footer-s_contact .s_logo {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        width: 100% !important;
        margin: 0 auto !important;
      }

      .footer-s_contact .logo_symbol.ico-64 {
        width: 48px !important;
        height: 48px !important;
        color: #f3f3ec !important;
        margin: 0 auto !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }

      .footer-s_contact .u-32,
      .footer-s_contact .u-48 {
        display: none !important;
      }

      .footer-s_address {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        text-align: center !important;
        width: 100% !important;
        max-width: 320px !important;
        margin: 0 auto !important;
        padding: 0 !important;
      }

      .footer-s_address .loc-cms,
      .footer-s_address .loc-cms_list,
      .footer-s_address .loc-cms_list_item {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        text-align: center !important;
        width: 100% !important;
      }

      .footer-s_address h3,
      .footer-s_address .l1.reg {
        font-family: 'Maison Neue Extended', Arial, sans-serif !important;
        font-size: 11px !important;
        font-weight: 600 !important;
        letter-spacing: 0.12em !important;
        text-transform: uppercase !important;
        color: #f3f3ec !important;
        text-align: center !important;
        margin: 0 0 6px 0 !important;
      }

      .footer-s_address .nav-item {
        display: inline-block !important;
        text-align: center !important;
        color: rgba(243, 243, 236, 0.9) !important;
        font-family: 'Maison Neue Extended', Arial, sans-serif !important;
        font-size: 10.5px !important;
        line-height: 1.55 !important;
        letter-spacing: 0.08em !important;
        text-transform: uppercase !important;
        max-width: 280px !important;
      }

      .footer-s_b {
        flex: none !important;
        padding-top: 24px !important;
        border-top: 1px solid rgba(243, 243, 236, 0.16) !important;
        width: 100% !important;
      }

      .footer-s_b .u-48 {
        display: none !important;
      }

      .footer-s_b > .grid {
        display: flex !important;
        flex-direction: row !important;
        justify-content: space-between !important;
        align-items: flex-end !important;
        width: 100% !important;
        gap: 16px !important;
      }

      .footer-s_info {
        display: flex !important;
        flex-direction: column !important;
        align-items: flex-start !important;
        text-align: left !important;
        flex: 1 !important;
        gap: 4px !important;
      }

      .footer-s_info .l1 {
        font-family: 'Maison Neue Extended', Arial, sans-serif !important;
        font-size: 9.5px !important;
        line-height: 1.45 !important;
        letter-spacing: 0.06em !important;
        text-transform: uppercase !important;
        color: rgba(243, 243, 236, 0.85) !important;
      }

      .footer-s_info .legal-cms {
        margin-top: 4px !important;
      }

      .footer-s_info .legal-cms_list {
        display: flex !important;
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 3px !important;
      }

      .footer-s_info .legal-cms_list_item {
        display: flex !important;
        align-items: center !important;
      }

      .footer-s_info .legal-cms_list_item a,
      .footer-s_info .legal-cms_list_item .nav-item {
        font-family: 'Maison Neue Extended', Arial, sans-serif !important;
        font-size: 9px !important;
        letter-spacing: 0.06em !important;
        text-transform: uppercase !important;
        color: rgba(243, 243, 236, 0.65) !important;
        text-decoration: underline !important;
      }

      .footer-s_info .legal-cms_list_item .l1[data-comma] {
        display: none !important;
      }

      .footer-s_credits {
        display: flex !important;
        flex-direction: column !important;
        align-items: flex-end !important;
        text-align: right !important;
        flex: none !important;
      }

      .footer-s_credits .credits {
        display: flex !important;
        flex-direction: column !important;
        align-items: flex-end !important;
        text-align: right !important;
        gap: 3px !important;
      }

      .footer-s_credits .l1.reg {
        font-family: 'Maison Neue Extended', Arial, sans-serif !important;
        font-size: 9px !important;
        letter-spacing: 0.08em !important;
        text-transform: uppercase !important;
        color: rgba(243, 243, 236, 0.65) !important;
      }

      .footer-s_credits .nav-item,
      .footer-s_credits .credits_link {
        font-family: 'Maison Neue Extended', Arial, sans-serif !important;
        font-size: 9.5px !important;
        letter-spacing: 0.08em !important;
        text-transform: uppercase !important;
        color: rgba(243, 243, 236, 0.9) !important;
        font-weight: 600 !important;
      }
    }

    @media screen and (min-width: 992px) {
      .apt-media-nav,
      .apt-media-counter {
        display: none !important;
      }
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

  // 8b. Add high-definition transparent mobile image to each .flower container (replaces video on phone)
  res = res.replace(/(<div[^>]*class="[^"]*flower[^"]*"[^>]*>)([\s\S]*?)(<\/div>)/gi, (match, openTag, inner, closeTag) => {
    const posterMatch = inner.match(/poster="([^"]+)"/i);
    if (posterMatch && !inner.includes('flower_mob_img')) {
      const posterUrl = posterMatch[1];
      const imgTag = `<img src="${posterUrl}" alt="Bougainvillea flowers" class="flower_mob_img b-mob" loading="eager" />`;
      return `${openTag}${inner}${imgTag}${closeTag}`;
    }
    return match;
  });

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
  // 10h. Apartment Mobile Media Gallery Scroll Navigation (Left/Right Buttons & Counter)
  if (pageType === 'apartment') {
    const navHtml = `<div class="apt-media-nav" data-apt-media-nav><button type="button" class="apt-media-btn prev" aria-label="Previous image" data-apt-btn="prev" disabled><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button><button type="button" class="apt-media-btn next" aria-label="Next image" data-apt-btn="next"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button></div><div class="apt-media-counter" data-apt-counter><span class="apt-cur">1</span> / <span class="apt-tot">1</span></div>`;

    res = res.replace(
      /(<div class="lot-s_media b-mob">)([\s\S]*?)(<div class="lot-s_media_c[^"]*">)/i,
      `$1${navHtml}$2$3`
    );

    const scriptHtml = `
<script id="aura-apt-media-nav-handler">
(function() {
  function setupAptMediaNav() {
    document.querySelectorAll('.lot-s_media.b-mob').forEach(function(container) {
      if (container.dataset.aptNavInitialized) return;
      container.dataset.aptNavInitialized = 'true';

      var scroller = container.querySelector('.lot-s_media_c');
      if (!scroller) return;

      var prevBtn = container.querySelector('[data-apt-btn="prev"]');
      var nextBtn = container.querySelector('[data-apt-btn="next"]');
      var curSpan = container.querySelector('.apt-cur');
      var totSpan = container.querySelector('.apt-tot');

      function getItems() {
        return Array.from(container.querySelectorAll('.lot-s_media_layout_img-prim, .lot-media-cms_list_item'));
      }

      function updateNav() {
        var items = getItems();
        if (!items.length) return;
        if (totSpan) totSpan.textContent = items.length;

        var sl = scroller.scrollLeft;
        var scrollerLeft = scroller.getBoundingClientRect().left;

        var activeIdx = 0;
        items.forEach(function(item, idx) {
          var rect = item.getBoundingClientRect();
          if (rect.left - scrollerLeft < scroller.clientWidth * 0.45) {
            activeIdx = idx;
          }
        });

        if (curSpan) curSpan.textContent = activeIdx + 1;
        if (prevBtn) prevBtn.disabled = activeIdx === 0;
        if (nextBtn) nextBtn.disabled = activeIdx >= items.length - 1;
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          var items = getItems();
          var scrollerLeft = scroller.getBoundingClientRect().left;
          var nextItem = items.find(function(it) {
            return (it.getBoundingClientRect().left - scrollerLeft) > 20;
          });
          if (nextItem) {
            scroller.scrollBy({ left: nextItem.getBoundingClientRect().left - scrollerLeft, behavior: 'smooth' });
          } else {
            scroller.scrollBy({ left: scroller.clientWidth * 0.85, behavior: 'smooth' });
          }
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          var items = getItems();
          var scrollerLeft = scroller.getBoundingClientRect().left;
          var prevItems = items.filter(function(it) {
            return (it.getBoundingClientRect().left - scrollerLeft) < -20;
          });
          if (prevItems.length > 0) {
            var prevItem = prevItems[prevItems.length - 1];
            scroller.scrollBy({ left: prevItem.getBoundingClientRect().left - scrollerLeft, behavior: 'smooth' });
          } else {
            scroller.scrollTo({ left: 0, behavior: 'smooth' });
          }
        });
      }

      scroller.addEventListener('scroll', updateNav, { passive: true });
      updateNav();
      setTimeout(updateNav, 300);
      setTimeout(updateNav, 1000);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupAptMediaNav);
  } else {
    setupAptMediaNav();
  }
  window.addEventListener('resize', setupAptMediaNav);
})();
</script>`;

    if (!res.includes('id="aura-apt-media-nav-handler"')) {
      res = res.replace('</body>', scriptHtml + '\n</body>');
    }
  }

  // 10i. Amenities 9:16 Portrait Images for Phone View (Prevents horizontal crop on mobile)
  if (pageType === 'home') {
    const mobAmenityImages = {
      'gated-community': '/assets/images/era-residence-gated-community-mob.jpg',
      'swimming-pool-2': '/assets/images/era-residence-pool-mob.jpg',
      'swimming-pool': '/assets/images/era-residence-parking-mob.jpg',
      'spa-gym': '/assets/images/era-residence-spa-gym-mob.jpg',
      'landscaping': '/assets/images/era-residence-landscaping-mob.jpg'
    };

    for (const [tabKey, mobSrc] of Object.entries(mobAmenityImages)) {
      const tabMarker = `data-tab-content="${tabKey}"`;
      const tabIdx = res.indexOf(tabMarker);
      if (tabIdx !== -1) {
        const imgTarget = 'class="img-p"/>';
        const imgIdx = res.indexOf(imgTarget, tabIdx);
        if (imgIdx !== -1 && !res.slice(tabIdx, imgIdx + 200).includes('b-mob')) {
          const mobImg = `<img data-parallax="img-in" loading="eager" alt="${tabKey}" src="${mobSrc}" class="img-p b-mob"/>`;
          res = res.slice(0, imgIdx) + 'class="img-p b-desk"/>' + mobImg + res.slice(imgIdx + imgTarget.length);
        }
      }
    }
  }

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

  // 13. Ensure all videos have autoplay attribute for immediate dancing motion on mobile & desktop
  res = res.replace(/<video(?![^>]*\bautoplay\b)/gi, '<video autoplay=""');

  // 14. Add resilient video playback enforcer for continuous dancing bougainvillea
  const flowerPlaybackScript = `
<script>
  (function() {
    function playAllFlowerVideos() {
      document.querySelectorAll('.flower video').forEach(function(v) {
        v.muted = true;
        v.playsInline = true;
        v.loop = true;
        v.setAttribute('autoplay', '');
        v.setAttribute('playsinline', '');
        v.setAttribute('webkit-playsinline', '');
        var p = v.play();
        if (p && typeof p.catch === 'function') {
          p.catch(function() {});
        }
      });
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', playAllFlowerVideos);
    } else {
      playAllFlowerVideos();
    }
    window.addEventListener('load', playAllFlowerVideos);
    ['touchstart', 'scroll', 'click'].forEach(function(evt) {
      document.addEventListener(evt, playAllFlowerVideos, { once: true, passive: true });
    });
  })();
</script>
`;
  if (!res.includes('playAllFlowerVideos')) {
    res = res.replace('</body>', flowerPlaybackScript + '\n</body>');
  }

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
