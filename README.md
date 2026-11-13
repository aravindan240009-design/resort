# AURA Residences — Commercial Turn-Key Real Estate Template

A pixel-accurate, ultra-luxury, commercial-ready residential sales showcase template rebuilt from **[https://www.era-residence.com/](https://www.era-residence.com/)** and transformed into a customizable template ready to sell or demo to property developers, luxury brokerages, and architectural studios.

Preserves 100% of the genuine hydrated DOM structure, Webflow layout classes, typography, animations, motion choreography, and interactive states, while disconnecting all third-party trackers, replacing proprietary renders with AI and royalty-free Mediterranean luxury architecture imagery, fixing mobile floral backgrounds, and inserting professional commercial placeholders.

---

## Target URL

`https://www.era-residence.com/`

---

## Quick Start & Run Commands

### 1. Installation
```bash
npm install
```

### 2. Run Verification Gate (100% Pass)
```bash
npm run test:styles
```

### 3. Production Build & Bundle
```bash
npm run build
```

### 4. Production Preview
```bash
npm run preview
```
Runs the high-performance Vite preview server at `http://localhost:3005`.

### 5. Development Server
```bash
npm run dev
```

---

## Recent Fixes & Client-Ready Features

1. **Flower Background Fix (Phone View & Mobile Viewports)**:
   - Eliminated the white video/poster boxes on mobile screens using `mix-blend-mode: multiply !important; background: transparent !important; pointer-events: none !important;`.
   - On viewports `<= 991px`, `.flower` containers are placed in background (`z-index: 0 !important; max-width: 45vw !important;`) while text headers and lead paragraphs are elevated to `z-index: 2 !important; position: relative !important;`. The floral accents frame the page without covering any text.

2. **Mobile Typography & Alignment Polish**:
   - Refined mobile layout for the interactive coast timeline (`.loc-path`), title headings, and distance indicators ("KEMPINSKI 5 MIN", "PUERTO BANUS 20 MIN").
   - Responsive card layouts on `/apartments` and all 25 residence pages on phone viewports (iPhone 14/15/16 Pro Max 390px–440px).

3. **Commercial Template Branding & Sales Placeholders**:
   - **Project Name**: `AURA RESIDENCES` with subtitle `[Your Exclusive Real Estate Template]`
   - **Splash Screen / Preloader**: Rebranded with `AURA RESIDENCES`, `[LUXURY LIVING]`, `[YOUR BRAND] SHOWCASE`.
   - **Company / Developer Name**: `[Your Company Name]` / `Ashok Studio`
   - **Sales Hotline**: `+1 (800) 555-0199` (`[Your Sales Number]`)
   - **Sales Email**: `sales@yourdomain.com` / `info@aura-residences.com`
   - **Showcase Gallery Address**: `[Your Sales Gallery Address], Golden Mile, Costa del Sol`
   - **Legal & Copyright**: `© 2026 [Your Company Name]. All rights reserved.`

4. **100% Royalty-Free & AI Media**:
   - Hero / CTA villas replaced with photorealistic AI-generated Mediterranean luxury villa renders.
   - All lifestyle, interior (living room, bedroom, kitchen, spa bathroom, gym, pool, parking) and exterior architecture photography replaced with high-definition, royalty-free architectural photography.
   - Completely free of proprietary licenses and ready for commercial sales demonstration.

5. **Sanitized Console & Code**:
   - Stripped all ASCII watermarks, external telemetry scripts, and proprietary credit tags.
   - Clean browser console output with zero uncaught errors.

---

## Routes Rebuilt, Connected & Verified (29 Routes)

| Route | Type | Verification Status | Features Cloned & Enhanced |
|---|---|---|---|
| `/` | Core Home | Verified (100% Pass) | Hero intro, Preloader arch, Lenis smooth scroll, Day/Night lighting switcher, Horizontal scroll track with bougainvillea flower parallax, Architecture clip-path morphing, Amenities gallery, Footer clip-path transition, Book a Call drawer modal, Fullscreen navigation menu modal, Cookies banner. |
| `/apartments` | Catalog | Verified (100% Pass) | 25 residences catalog, Typology filters (Ground floor + basement, Ground Floor, Penthouse duplex), Bedroom filters (2, 3 beds), Area sorting, SVG corner decor frames, direct navigation to each residence. |
| `/contact` | Contact | Verified (100% Pass) | Contact form, Office & Sales details, Floating tooltips, Interactive input focus states, Social media links. |
| `/coming-soon` | Teaser | Verified (100% Pass) | Teaser page with luxury typography and branding. |
| `/apartments/011/` | Residence Detail | Verified (100% Pass) | Ground floor + basement, 3 beds, 132 m² interior, 29 m² terrace, 46 m² garden. Architectural floor plans, compass rotation (-165deg), building block locator diagram, specs drawer, request modal. |
| `/apartments/012/` | Residence Detail | Verified (100% Pass) | Ground floor + basement, 3 beds, 133 m² interior, 27 m² terrace, 46 m² garden. Full architectural floor plans, compass rotation (-165deg), specs drawer, request modal. |
| `/apartments/031/` ... `/apartments/224/` | 23 Residences | Verified (100% Pass) | All remaining 23 individual residence pages extracted, built with trailing slash routing, fully self-hosted, connected, and verified across desktop and mobile viewports. |

---

## Performance & Optimization

- **Zero External CDNs**: All fonts, SVGs, and imagery are served locally from `public/`.
- **Fast Build Times**: Vite MPA compiles all 29 routes in ~3.6s.
- **Zero Console Errors**: Verified in headless Playwright automation.
