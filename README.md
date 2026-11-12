# ERA Residence Clone

A pixel-accurate, runnable clone of **[https://www.era-residence.com/](https://www.era-residence.com/)**, preserving the authentic hydrated DOM structure, Webflow design system, typography, animations, motion choreography, and interactive states.

---

## Target URL

`https://www.era-residence.com/`

---

## Quick Start & Run Commands

### Installation & Production Run
```bash
# 1. Install dependencies
npm install

# 2. Run Style Assertions verification gate (100% pass)
npm run test:styles

# 3. Build production bundle (Vite MPA)
npm run build

# 4. Preview locally
npm run preview
```

### Development Server
```bash
npm run dev
```

---

## Routes Cloned & Verified

| Route | Source URL | Verification Status | Features Cloned |
|---|---|---|---|
| `/` | `https://www.era-residence.com/` | Verified (100% Pass) | Hero intro, Preloader arch, Lenis smooth scroll, Day/Night lighting switcher, Horizontal scroll track with bougainvillea flower parallax, Architecture clip-path morphing, Amenities gallery, Footer clip-path transition, Book a Call drawer modal, Fullscreen navigation menu modal, Cookies banner. |
| `/apartments` | `https://www.era-residence.com/apartments` | Verified (100% Pass) | 25 residences catalog, Typology filters (Ground floor + basement, Ground Floor, Penthouse duplex), Bedroom filters (2, 3 beds), Area sorting, Decoupled `data/apartments.json`, SVG corner decor frames. |
| `/contact` | `https://www.era-residence.com/contact` | Verified (100% Pass) | Contact form, Office & Sales details, Floating tooltips, Interactive input focus states, Social media links. |
| `/coming-soon` | `https://www.era-residence.com/coming-soon` | Verified (100% Pass) | Full teaser page with typography and branding. |

---

## Architecture & Scalability Standards

1. **DOM Ground Truth (Anti-Synthetic Rule)**:
   - Preserves 100% of the genuine extracted DOM hierarchy, CSS classes, SVG vectors, and dataset attributes.
   - Zero synthetic templates or generic frameworks; authentic Webflow CSS engine and layout classes intact.

2. **Asset Policy & Self-Hosting (Zero External CDN Dependencies)**:
   - **Local Fonts**: Self-hosts `ambroise-francois-std`, `Maison Neue Extended` (400, 700), and `sloop-script-three` locally in `/fonts/` with `@font-face` definitions.
   - **Local Media**: Self-hosts 304 images, webp responsive variants, SVG vector icons, and bougainvillea flower webm videos in `/assets/images/` and `/assets/videos/`.
   - **Local Vendor Libraries**: GSAP 3.15, ScrollTrigger, SplitText, CustomEase, Lenis 1.3.21, Lottie, jQuery, Webflow Core, and Barba.js served from `/vendor/`.
   - **Stripped External Trackers**: Stripped Google Tag Manager, Facebook Pixel, and Typekit JS to ensure zero uncaught console errors and privacy-safe offline execution.

3. **Modularized Scripts**:
   - `src/scripts/scroll.js`: Lenis smooth scrolling, scroll locks, progress scrollbar.
   - `src/scripts/nav.js`: Fullscreen navigation menu, CTA modal, Day/Night switcher, magnetic hover buttons, cookie banner.
   - `src/scripts/animations.js`: GSAP timeline triggers, preloader arch, SplitText letter reveals, horizontal scroll pinning, polygon clip-path morphs.
   - `src/scripts/apartments.js`: Client-side apartment filter and sorting engine.
   - `src/scripts/main.js`: Main application entry point orchestrating all modules.

4. **Decoupled Data**:
   - Extracted all 25 luxury residential units into `data/apartments.json` with specs, areas, bedroom counts, block, floor, and terrace measurements.

---

## Style Assertions Gate (`assertions.json`)

Verified via `npm run test:styles` (`scripts/assert-styles.mjs`):

- ✓ **Page Title**: Contains `"ERA Residence"`
- ✓ **Body Color**: Matches `rgb(23, 35, 59)` (`#17233b`)
- ✓ **Body Font-Family**: Matches `"Maison Neue Extended", Arial, sans-serif`
- ✓ **Heading 1 Font-Family**: Matches `ambroise-francois-std, sans-serif`
- ✓ **Heading 2 Font-Family**: Matches `sloop-script-three, sans-serif`
- ✓ **Interactive Buttons**: `[hover-btn]` has `cursor: pointer`
- ✓ **Navigation Positioning**: `.header-nav` has `position: fixed`
- ✓ **Apartment Catalog**: Exactly 25 residences verified
- ✓ **Contact Form**: Form element verified on `/contact`
- ✓ **Console Integrity**: **0 uncaught browser console errors**

**Result: 10 / 10 PASSED (100% Pass Rate, 0 Failures)**

---

## Substitutions Made & Why

1. **Local Self-Hosted Typekit Fonts**:
   - *Original*: Injected via Adobe Typekit script (`use.typekit.net/pig8glj.js`).
   - *Clone*: Converted to locally served WOFF2 fonts (`/fonts/ambroise-francois-std.woff2`, `/fonts/sloop-script-three.woff2`) to eliminate external CDN latency, ensure offline operation, and avoid tracking.

2. **Stripped Third-Party Trackers**:
   - *Original*: Loaded Google Tag Manager container `GTM-WMDRV3P6` and Facebook Pixel `845813938192979`.
   - *Clone*: Stripped to guarantee zero console warnings, eliminate third-party network stalls, and protect user privacy.

---

## Known Gaps

1. **Form Submission Backend**:
   - The contact form and "Book a call" modal have full interactive UI states, validation, and focus effects, but form submissions are handled on the client side (prevented default or mock alert) as there is no live private CRM/Webflow form backend attached.
2. **Video Codec Compatibility**:
   - Bougainvillea flower overlay videos use `.webm` formats with alpha channels; while supported in all Chromium and modern desktop browsers, older Safari versions require `.mov` ProRes/HEVC fallback.
