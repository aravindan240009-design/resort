import fs from 'fs';

let code = fs.readFileSync('scripts/build-all-pages.mjs', 'utf8');

const globalTarget = `    .page-w,
    .hero-scroll-area,
    .hero-w,
    .section,
    .marquee,
    .marquee_track,
    [data-barba="wrapper"],
    [data-barba="container"] {
      max-width: 100vw !important;
      overflow-x: clip !important;
    }`;

const globalReplacement = `${globalTarget}

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
    }`;

if (code.includes(globalTarget)) {
  code = code.replace(globalTarget, globalReplacement);
  console.log('Replaced globalTarget successfully');
} else {
  console.error('globalTarget not found in scripts/build-all-pages.mjs');
}

const mobileTarget = `    @media screen and (max-width: 991px) {
      /* Header Navigation & Mobile Menu Touch Ergonomics (Inspired by macmillan.studio) */`;

const mobileReplacement = `    @media screen and (max-width: 991px) {
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

      /* Header Navigation & Mobile Menu Touch Ergonomics (Inspired by macmillan.studio) */`;

if (code.includes(mobileTarget)) {
  code = code.replace(mobileTarget, mobileReplacement);
  console.log('Replaced mobileTarget successfully');
} else {
  console.error('mobileTarget not found in scripts/build-all-pages.mjs');
}

fs.writeFileSync('scripts/build-all-pages.mjs', code, 'utf8');
console.log('Updated scripts/build-all-pages.mjs successfully!');
