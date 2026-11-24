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
    /* 0. Global Mobile Overflow Prevention & Viewport Safety:
       Eliminates side white space / void on phone view & prevents layout horizontal shift */
    html, body {
      overflow-x: hidden !important;
      max-width: 100vw !important;
      width: 100% !important;
      position: relative !important;
    }
    .page-w,
    .hero-scroll-area,
    .hero-w,
    .section,
    .marquee,
    .marquee_track,
    [data-barba="wrapper"],
    [data-barba="container"] {
      max-width: 100vw !important;
      overflow-x: clip !important;
    }

    /* Global Contact Page & Section Overflow Prevention (All Viewports) */
    .contact-s,
    .contact-s_section,
    .contact-s_map,
    .contact-s_map_c {
      max-width: 100vw !important;
      overflow: hidden !important;
      overflow-x: hidden !important;
      box-sizing: border-box !important;
    }
    .contact-s_map {
      margin-left: 0 !important;
      margin-right: 0 !important;
      width: 100% !important;
      max-width: 100% !important;
    }
    .contact-s_map_c {
      width: 100% !important;
      max-width: 100% !important;
    }
    .contact-s_map img {
      width: 100% !important;
      max-width: 100% !important;
      height: auto !important;
      object-fit: cover !important;
    }
    .a1.a-center {
      max-width: calc(100vw - 32px) !important;
      right: auto !important;
    }

    /* High-contrast luxury typography for Hero, Architecture & Section Titles */
    .arch-w h1,
    .arch-w .h1,
    .arch-s_t h1,
    .arch-s_t h2,
    .hero-s_logo .h1,
    .hero-s_title .span {
      text-shadow: 0 4px 24px rgba(11, 18, 30, 0.5), 0 1px 3px rgba(0, 0, 0, 0.35) !important;
    }
    .hero-s_tabs a,
    .header-nav_list a {
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.45);
    }

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
      filter: sepia(100%) saturate(220%) hue-rotate(350deg) brightness(1.08) contrast(1.05) !important;
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
      /* WCAG 2.2 AA Minimum 44x44px Touch Targets & iOS Zoom Prevention */
      a.link.w-inline-block,
      .link.w-inline-block,
      .link,
      .nav-item.w-inline-block,
      .nav-item,
      .btn.w-inline-block,
      .btn,
      .pag_prev,
      .pag_next,
      .pag_btn,
      .btn-circle_link,
      button,
      [role="button"],
      [hover-btn],
      .filter_select_btn {
        min-height: 44px !important;
        min-width: 44px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        box-sizing: border-box !important;
        touch-action: manipulation !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      .banner_cta .link,
      .banner_cta a {
        min-height: 44px !important;
        padding: 10px 18px !important;
      }
      input,
      select,
      textarea,
      .input_field,
      .input {
        font-size: 16px !important;
        min-height: 44px !important;
        box-sizing: border-box !important;
      }

      /* Header Navigation & Mobile Menu Touch Ergonomics (Inspired by macmillan.studio) */
      .header-nav {
        right: clamp(16px, 4.5vw, 24px) !important;
        top: clamp(16px, 4.5vw, 24px) !important;
        width: auto !important;
        display: flex !important;
        align-items: center !important;
        justify-content: flex-end !important;
        pointer-events: auto !important;
        z-index: 10001 !important;
      }
      .header-logo {
        z-index: 10001 !important;
      }
      .header-nav_list.f-mob {
        width: auto !important;
        display: flex !important;
        align-items: center !important;
        justify-content: flex-end !important;
      }
      .btn-menu {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 6px !important;
        margin-right: 0 !important;
        padding: 8px 12px !important;
        min-height: 44px !important;
        min-width: 44px !important;
        box-sizing: border-box !important;
        touch-action: manipulation !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      .btn-menu .nav-item {
        min-height: 44px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 4px 6px !important;
      }
      .btn-menu .ico-24 {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 24px !important;
        height: 24px !important;
      }

      /* Strict Mobile Overflow Containment:
         Eliminates horizontal wobble, sideways pull & scrollbar creep on mobile */
      .hero-w,
      .hero-w_bg,
      .hero-w_bg_master,
      .hero-w_bg_master_img,
      .hero-w_bg_master_img_day,
      .hero-w_bg_master_img_night,
      .hero-scroll-area,
      .loc-w,
      .loc-w_clouds,
      .marquee,
      .marquee_track {
        max-width: 100vw !important;
        overflow: hidden !important;
        overflow-x: hidden !important;
      }

      /* Contact map overflow fix */
      .contact-s_map {
        margin-left: 0 !important;
        margin-right: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
        overflow: hidden !important;
      }
      .contact-s_map_c {
        width: 100% !important;
        max-width: 100% !important;
        overflow: hidden !important;
      }
      .contact-s_map img {
        width: 100% !important;
        max-width: 100% !important;
        height: auto !important;
        object-fit: cover !important;
      }

      .hero-s_logo .h1 {
        font-size: clamp(34px, 8.8vw, 46px) !important;
        line-height: 1.02 !important;
        letter-spacing: 0.02em !important;
        text-align: center !important;
        margin: 0 auto !important;
      }
      .hero-s_logo_a {
        position: relative !important;
        margin-top: 16px !important;
        margin-left: 0 !important;
        margin-bottom: 0 !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        width: 100% !important;
        transform: rotate(-5deg) !important;
        z-index: 3 !important;
      }
      .hero-s_logo_a .a2 {
        font-family: 'sloop-script-three', cursive !important;
        font-size: clamp(28px, 7.5vw, 38px) !important;
        line-height: 1 !important;
        margin: 0 !important;
        display: inline-block !important;
        color: #f3f0e8 !important;
        opacity: 0.95 !important;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5) !important;
      }
      /* Compact spacers: remove excessive padding and whitespace on phone view */
      .u-272.b-mob, .u-272 { height: clamp(24px, 5vw, 36px) !important; }
      .u-160.b-mob, .u-160 { height: clamp(18px, 4vw, 28px) !important; }
      .u-96.b-mob, .u-96 { height: clamp(14px, 3vw, 22px) !important; }
      .u-64.b-mob, .u-64 { height: clamp(12px, 2.5vw, 18px) !important; }
      .u-48.b-mob, .u-48 { height: clamp(10px, 2vw, 16px) !important; }
      .u-32.b-mob, .u-32 { height: clamp(8px, 1.8vw, 14px) !important; }

      /* Arch Section Top Padding (Similar Options):
         Ensure elegant breathing room within the curved dome on mobile without clipping against arch border */
      .other-title-s_t > .u-160,
      .section.arch .other-title-s_t > .u-160 {
        height: clamp(88px, 22vw, 120px) !important;
      }

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

      /* Hero Subtitle 'A place — to return to' cohesive balanced alignment:
         Fills the empty space with current text & provides generous padding */
      .hero-s_title {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        text-align: center !important;
        width: 100% !important;
        margin: clamp(24px, 5vh, 36px) auto 0 auto !important;
        padding: 8px 20px !important;
        box-sizing: border-box !important;
        gap: clamp(8px, 2.5vw, 14px) !important;
      }
      .hero-s_title .a-left,
      .hero-s_title .a-right {
        flex: 0 auto !important;
        text-align: center !important;
        display: inline-flex !important;
        align-items: center !important;
      }
      .hero-s_title .span {
        font-family: 'ambroise-francois-std', serif !important;
        font-size: clamp(18px, 4.8vw, 24px) !important;
        line-height: 1.1 !important;
        letter-spacing: 0.06em !important;
        text-transform: uppercase !important;
        color: #ffffff !important;
        opacity: 0.95 !important;
        white-space: nowrap !important;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.55) !important;
      }
      .hero-s_title .a-left::after {
        content: '—';
        margin-left: clamp(8px, 2.5vw, 14px);
        opacity: 0.65;
        font-family: 'ambroise-francois-std', serif;
        font-size: 1.1em;
        color: #ffffff;
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
         100% transparent cutouts, zero background box, vibrant pink bougainvillea, and balanced breathing room */
      .flower {
        background: transparent !important;
        background-color: transparent !important;
        isolation: auto !important;
        opacity: 1 !important;
        pointer-events: none !important;
      }
      .flower video {
        display: none !important;
        pointer-events: none !important;
        background: transparent !important;
        background-color: transparent !important;
      }
      .flower .flower_mob_img,
      .flower img {
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        object-fit: contain !important;
        pointer-events: none !important;
        background: transparent !important;
        background-color: transparent !important;
        filter: sepia(100%) saturate(220%) hue-rotate(350deg) brightness(1.08) contrast(1.05) !important;
      }

      .flower.loc-info {
        max-width: clamp(130px, 34vw, 175px) !important;
        max-height: clamp(130px, 34vw, 175px) !important;
        top: clamp(8px, 2.5vw, 16px) !important;
        left: clamp(8px, 2.5vw, 16px) !important;
        z-index: 2 !important;
      }

      .flower.loc-intro {
        max-width: clamp(130px, 34vw, 175px) !important;
        max-height: clamp(130px, 34vw, 175px) !important;
        bottom: clamp(12px, 3vw, 24px) !important;
        left: clamp(10px, 3vw, 20px) !important;
        z-index: 1 !important;
      }

      /* Location Intro & Route spacing: generous padding & margins around circular button */
      .loc-intro-s {
        padding-top: clamp(32px, 6vw, 48px) !important;
        padding-bottom: clamp(56px, 11vw, 84px) !important;
        position: relative !important;
      }

      .loc-intro-s_btn {
        margin-top: clamp(24px, 5vw, 40px) !important;
        margin-bottom: clamp(24px, 5vw, 40px) !important;
        position: relative !important;
        z-index: 2 !important;
      }

      .loc-path-s_t > .u-160 {
        height: clamp(64px, 14vw, 96px) !important;
      }

      .flower.apart-info {
        max-width: clamp(110px, 28vw, 150px) !important;
        max-height: clamp(110px, 28vw, 150px) !important;
        bottom: clamp(8px, 2vw, 16px) !important;
        left: clamp(8px, 2vw, 16px) !important;
        z-index: 1 !important;
      }

      .flower.interior {
        max-width: clamp(130px, 32vw, 170px) !important;
        max-height: clamp(130px, 32vw, 170px) !important;
        top: clamp(8px, 2vw, 16px) !important;
        right: clamp(8px, 2vw, 16px) !important;
        z-index: 5 !important;
      }

      .flower.other {
        max-width: clamp(130px, 34vw, 175px) !important;
        max-height: clamp(130px, 34vw, 175px) !important;
        top: clamp(8px, 2vw, 16px) !important;
        right: clamp(8px, 2vw, 16px) !important;
        z-index: 2 !important;
      }
      .flower.apart {
        max-width: 30vw !important;
        max-height: 30vw !important;
        right: 0 !important;
        top: 10px !important;
        z-index: 2 !important;
        overflow: hidden !important;
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
      .loc-path-s_title_line { font-size: clamp(24px, 6.5vw, 36px) !important; line-height: 1.15 !important; display: inline-block !important; letter-spacing: 0.02em !important; }
      .loc-path-s_title_a { font-size: clamp(32px, 8.5vw, 48px) !important; display: inline-block !important; }

      /* Full interactive swipeable coastline route line on mobile view */
      .loc-path-s_path {
        grid-column: 1 / -1 !important;
        grid-area: 1 / 1 / 2 / -1 !important;
        width: 100% !important;
        max-width: 100vw !important;
        overflow-x: auto !important;
        overflow-y: hidden !important;
        -webkit-overflow-scrolling: touch !important;
        overscroll-behavior-x: contain !important;
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
        margin-left: calc(-1 * clamp(16px, 4.5vw, 24px)) !important;
        margin-right: calc(-1 * clamp(16px, 4.5vw, 24px)) !important;
        padding-left: clamp(16px, 4.5vw, 24px) !important;
        padding-right: clamp(16px, 4.5vw, 24px) !important;
        box-sizing: border-box !important;
        cursor: grab !important;
      }
      .loc-path-s_path::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
      }
      .loc-path-s_path_c {
        position: relative !important;
        width: 250% !important;
        min-width: 880px !important;
        max-width: none !important;
        margin: 0 !important;
      }
      .loc-path-s_path_c img.img.loc-path {
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100% !important;
        object-fit: contain !important;
        display: block !important;
        pointer-events: none !important;
      }
      .loc-path-s_path_c img.img.h-auto {
        position: relative !important;
        width: 100% !important;
        max-width: none !important;
        height: auto !important;
        display: block !important;
        pointer-events: none !important;
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
        visibility: visible !important;
        z-index: 5 !important;
        right: -8px !important;
        top: -24px !important;
        max-width: 38vw !important;
        max-height: 38vw !important;
        pointer-events: none !important;
      }

      /* Mobile Architecture Scroll & Sticky Sequence Parity (<= 991px) */
      .arch-scroll-area {
        position: relative !important;
        height: 260vh !important;
      }
      .arch-scroll-area ._100vh {
        display: block !important;
        height: 100vh !important;
        height: 100svh !important;
      }
      .arch-intro-s {
        display: block !important;
        position: sticky !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100vh !important;
        height: 100svh !important;
        margin-bottom: -100vh !important;
        z-index: 3 !important;
        overflow: hidden !important;
        pointer-events: none !important;
      }
      .arch-intro-s_bg_l {
        background-color: var(--_colors---base-0--primary, #f3f3ec) !important;
        position: absolute !important;
        inset: -1% calc(50% - 1px) 0% 0% !important;
        z-index: 2 !important;
      }
      .arch-intro-s_bg_r {
        background-color: var(--_colors---base-0--primary, #f3f3ec) !important;
        position: absolute !important;
        inset: -1% 0% 0% 50% !important;
        z-index: 2 !important;
      }
      .flower.arch-intro-l,
      .flower.arch-intro-r {
        display: block !important;
        position: absolute !important;
        z-index: 4 !important;
        width: clamp(140px, 42vw, 190px) !important;
        height: clamp(140px, 42vw, 190px) !important;
        pointer-events: none !important;
      }
      .flower.arch-intro-l {
        left: -4vw !important;
        bottom: 22vh !important;
        transform: rotate(-150deg);
      }
      .flower.arch-intro-r {
        right: -4vw !important;
        bottom: 22vh !important;
        transform: rotate(65deg);
      }
      .flower.arch-intro-l .flower_mob_img,
      .flower.arch-intro-r .flower_mob_img {
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        object-fit: contain !important;
      }
      .arch-w {
        position: sticky !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100vh !important;
        height: 100svh !important;
        z-index: 1 !important;
        overflow: hidden !important;
      }
      .arch-s {
        height: 100vh !important;
        height: 100svh !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
        padding: 80px 24px 48px !important;
        box-sizing: border-box !important;
        z-index: 2 !important;
        position: relative !important;
      }
      .arch-s_t {
        margin-top: 15px !important;
      }
      .arch-s_t h2 {
        font-size: clamp(38px, 11vw, 56px) !important;
        line-height: 1 !important;
        letter-spacing: 0.04em !important;
        text-align: center !important;
        color: #ffffff !important;
        text-shadow: 0 4px 16px rgba(0,0,0,0.5) !important;
      }
      .arch-s_quote .h5 {
        font-size: clamp(16px, 4.5vw, 20px) !important;
        line-height: 1.35 !important;
        color: #ffffff !important;
        text-shadow: 0 2px 12px rgba(0,0,0,0.5) !important;
      }
      .arch-s_author {
        color: #ffffff !important;
      }
      .arch-w_bg {
        position: absolute !important;
        inset: 0 !important;
        z-index: 1 !important;
      }
      .arch-w_bg .img {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
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
        background-color: var(--_global-colors---brand-500--velvet-plum, #0b121e) !important;
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
        padding-bottom: max(16px, env(safe-area-inset-bottom, 16px)) !important;
        border-top: 1px solid rgba(243, 243, 236, 0.16) !important;
        width: 100% !important;
      }

      /* iPhone Home Indicator & Safe Area padding */
      .modal_menu,
      .modal_cta_c {
        padding-bottom: max(24px, env(safe-area-inset-bottom, 24px)) !important;
      }

      .footer-s_b .u-48 {
        display: none !important;
      }

      .footer-s_b > .grid {
        display: flex !important;
        flex-direction: row !important;
        flex-wrap: wrap !important;
        justify-content: space-between !important;
        align-items: center !important;
        width: 100% !important;
        gap: 12px !important;
        box-sizing: border-box !important;
      }

      .footer-s_info {
        display: flex !important;
        flex-direction: column !important;
        align-items: flex-start !important;
        text-align: left !important;
        flex: 1 1 auto !important;
        min-width: 0 !important;
        max-width: 100% !important;
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
        display: none !important;
      }

      .footer-s_credits {
        display: flex !important;
        flex-direction: column !important;
        align-items: flex-end !important;
        text-align: right !important;
        flex: 0 0 auto !important;
        min-width: 0 !important;
        max-width: 100% !important;
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

    /* ==========================================================================
       IMPERIAL MIDNIGHT GOLD & ALABASTER LUXURY THEME
       ========================================================================== */
    :root {
      --_global-colors---brand-500--velvet-plum: #0b121e !important;
      --_global-colors---brand-500--powder-sky: #c8a97e !important;
      --_global-colors---brand-500--blush-bloom: #dfc39e !important;
      --_global-colors---base-0--100: #f7f6f2 !important;
      --_global-colors---base-1000--100: #17233b !important;
      --_colors---additional--success: #c8a97e !important;

      --luxury-midnight-obsidian: #0b121e;
      --luxury-midnight-card: #101a29;
      --luxury-gold-primary: #c8a97e;
      --luxury-gold-shimmer: #dfc39e;
      --luxury-alabaster-silk: #f7f6f2;
    }

    body {
      background-color: #f7f6f2 !important;
      color: #17233b !important;
    }

    .section {
      transition: background-color 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    .theme_on-dark,
    [data-bg="dark"],
    .footer-w,
    .modal.menu {
      --_colors---other--bg: #0b121e !important;
      background-color: #0b121e !important;
      color: #f7f6f2 !important;
    }

    .theme_on-dark .h1, .theme_on-dark .h2, .theme_on-dark .h3,
    .theme_on-dark .h4, .theme_on-dark .h5, .theme_on-dark .h6,
    .theme_on-dark .l1, .theme_on-dark .p1, .theme_on-dark .p2 {
      color: #f7f6f2 !important;
    }

    .theme_on-dark .a1, .theme_on-dark .a2 {
      color: #c8a97e !important;
    }

    .theme_on-color,
    [data-bg="color"],
    .section.theme_on-color,
    .cta-w,
    .amen-w {
      --_colors---other--bg: #0b121e !important;
      background-color: #0b121e !important;
      color: #f7f6f2 !important;
    }

    .theme_on-color .h1, .theme_on-color .h2, .theme_on-color .h3,
    .theme_on-color .h4, .theme_on-color .h5, .theme_on-color .h6 {
      color: #f7f6f2 !important;
    }

    .theme_on-color .c1, .theme_on-color .a2, .theme_on-color .a1 {
      color: #c8a97e !important;
    }

    .theme_on-brand,
    .section.theme_on-brand,
    .section.arch.clip.theme_on-brand {
      --_colors---other--bg: #101a29 !important;
      background-color: #101a29 !important;
      color: #f7f6f2 !important;
    }

    .theme_on-brand .h1, .theme_on-brand .h2, .theme_on-brand .h3,
    .theme_on-brand .h4, .theme_on-brand .h5,
    .theme_on-brand .s_title .l1,
    .theme_on-brand .info-s_lead .h4,
    .theme_on-brand .info-s_desc .p1 {
      color: #f7f6f2 !important;
    }

    .theme_on-brand .c1, .theme_on-brand .a2, .theme_on-brand .s_title {
      color: #c8a97e !important;
    }

    .theme_on-light,
    [data-bg="light"],
    .section.theme_on-light {
      --_colors---other--bg: #f7f6f2 !important;
      background-color: #f7f6f2 !important;
      color: #17233b !important;
    }

    .sloop-script-three,
    .hero-s_logo_a .a2,
    .a1, .a2 {
      color: #c8a97e !important;
    }

    .btn-circle_bg svg circle[data-arc] {
      stroke: #c8a97e !important;
    }
    .btn-circle_bg svg circle:not([data-arc]) {
      stroke: rgba(200, 169, 126, 0.4) !important;
    }
    .btn-circle:hover .btn-circle_bg {
      filter: drop-shadow(0 0 12px rgba(200, 169, 126, 0.5)) !important;
    }

    .divider .line-v, .line-v, .red-line {
      background-color: #c8a97e !important;
    }

    .header-logo {
      color: #c8a97e !important;
    }

    .s-bar_fill {
      background-color: #c8a97e !important;
    }

    .nav-item:hover, .nav-item.w--current {
      color: #c8a97e !important;
    }

    .preloader_progress_track,
    .preloader_progress_fill {
      background-color: #c8a97e !important;
    }

    .img-w img,
    .amen-slide_img img,
    .loc-intro-s_img img,
    .interior-s_l_img img,
    .interior-gallery-s_img img,
    .other-s_img img,
    .cta-w img {
      transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), filter 0.8s ease;
      will-change: transform;
    }

    @media screen and (min-width: 992px) {
      .u-272 { height: clamp(48px, 5vw, 72px) !important; }
      .u-160 { height: clamp(36px, 3.5vw, 48px) !important; }
      .u-96 { height: clamp(24px, 2.5vw, 36px) !important; }
      .u-64 { height: clamp(18px, 2vw, 28px) !important; }
      .divider .line-v, .line-v { height: clamp(48px, 5vh, 64px) !important; }
      .footer-s_t { height: clamp(36px, 4vw, 54px) !important; }
      .cta-s { padding-top: clamp(40px, 5vw, 60px) !important; padding-bottom: clamp(60px, 6vw, 80px) !important; }
      .cta-s > .u-272 { height: clamp(32px, 3vw, 48px) !important; }
      .cta-s_title > .u-160 { height: clamp(36px, 3.5vw, 48px) !important; }
      .interior-s > .u-272, .interior-s_l > .u-272 { height: clamp(40px, 4vw, 56px) !important; }
      .apart-info-s > .u-160 { height: clamp(24px, 2.5vw, 36px) !important; }
    }

    @media screen and (max-width: 991px) {
      .hero-s > .u-272.b-mob { height: clamp(40px, 8vh, 64px) !important; }
      .slow-scroll-trigger { display: none !important; height: 0 !important; }
      .divider, .divider .line-v, .line-v { height: clamp(32px, 5vh, 48px) !important; }
      .footer-s_t { height: 0 !important; display: none !important; }
      .cta-s { padding-top: 32px !important; padding-bottom: 48px !important; }
      .cta-s > .u-272 { height: 24px !important; }
      .cta-s_title > .u-160 { height: 28px !important; }
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

  // 6. Replace Slater loader script with local main.js and importmap
  const slaterRegex = /<script>\s*document\.addEventListener\('DOMContentLoaded',\s*function\s*\(\)\s*\{[\s\S]*?loadtwc\(src\);\s*\}\);\s*<\/script>/gi;
  res = res.replace(slaterRegex, '<script type="importmap">{"imports":{"three":"/vendor/three.module.js"}}</script>\n<script type="module" src="/src/scripts/main.js"></script>');

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

  // Remove footer legal links (Privacy policy, Terms of Use)
  res = res.replace(/<div class="u-12"><\/div>\s*<div[^>]*class="[^"]*legal-cms[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>(?=\s*<\/div>\s*<div class="footer-s_credits">)/gi, '');

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
    // Enable mobile architecture sticky sequence and interior parallax
    res = res.replace('<div class="arch-intro-s b-desk">', '<div class="arch-intro-s">');
    res = res.replace('<div class="_100vh b-desk"></div><div class="_100vh b-desk"></div>', '<div class="_100vh"></div><div class="_100vh"></div>');
    res = res.replace('<div class="u-160 b-desk"></div></div><div data-part="ctn" class="arch-s_btn b-desk">', '<div class="u-160"></div></div><div data-part="ctn" class="arch-s_btn">');
    res = res.replace('<div data-bg="light" class="arch_themes_light b-desk"></div>', '<div data-bg="light" class="arch_themes_light"></div>');
    res = res.replace('<div class="interior-s_imgs"><div data-mob="off" data-parallax="ctn-down" class="interior-s_l">', '<div class="interior-s_imgs"><div data-parallax="ctn-down" class="interior-s_l">');
    res = res.replace('<div data-mob="off" data-parallax="ctn-up" class="interior-s_r">', '<div data-parallax="ctn-up" class="interior-s_r">');

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

    // 10j. Replace Gated Community desktop image with the new 4K luxury architectural photograph
    res = res.replace(
      /<img data-parallax="img-in"[^>]*src="[^"]*era-residence-gated-community[^"]*"[^>]*class="img-p b-desk"\/>/gi,
      '<img data-parallax="img-in" loading="eager" alt="Gated community luxury residence" src="/assets/images/luxury_gated_community_residence_desktop_4k.jpg" sizes="100vw" class="img-p b-desk"/>'
    );
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
  if (p.dest === 'apartments.html') {
    fs.mkdirSync('apartments', { recursive: true });
    fs.writeFileSync(path.join('apartments', 'index.html'), transformed, 'utf8');
    console.log(`Generated directory index: apartments/index.html (${transformed.length} bytes)`);
  }
  if (p.dest === 'contact.html') {
    fs.mkdirSync('contact', { recursive: true });
    fs.writeFileSync(path.join('contact', 'index.html'), transformed, 'utf8');
    console.log(`Generated directory index: contact/index.html (${transformed.length} bytes)`);
  }
  if (p.dest === 'coming-soon.html') {
    fs.mkdirSync('coming-soon', { recursive: true });
    fs.writeFileSync(path.join('coming-soon', 'index.html'), transformed, 'utf8');
    console.log(`Generated directory index: coming-soon/index.html (${transformed.length} bytes)`);
  }
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
