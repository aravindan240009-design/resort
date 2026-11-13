# Design Tokens & System Specifications — AURA Residence

Extracted from live target: `https://www.era-residence.com/`
Transformed into luxury template: **AURA Residence** by **Ashok Studio**

## 1. Typography

### Font Families
- **Display Serif**: `ambroise-francois-std, sans-serif` (Loaded via local `/fonts/ambroise-francois-std.woff2`)
- **Body & Technical**: `"Maison Neue Extended", Arial, sans-serif` (Book 400 & Bold 700 via local `/fonts/MaisonNeueExt-Book.woff2`, `MaisonNeueExt-Bold.woff2`)
- **Accent Script**: `sloop-script-three, sans-serif` (Loaded via local `/fonts/sloop-script-three.woff2`)
- **Webflow Icons**: `webflow-icons` (Base64 data font)

### Responsive Type Scale
Root sizing uses fluid typography with `html { font-size: 1vw; }`:
- **H1**: `calc(192rem/16)` (~12rem) | Line Height: `87.5%` | Letter Spacing: `-0.024em`
- **H2**: `calc(136rem/16)` (~8.5rem) | Line Height: `88.235%` | Letter Spacing: `-0.024em`
- **H3**: `calc(96rem/16)` (~6rem) | Line Height: `91.667%` | Letter Spacing: `-0.024em`
- **H4**: `calc(63rem/16)` (~3.9375rem) | Line Height: `88.889%` | Letter Spacing: `-0.016em`
- **H5**: `calc(40rem/16)` (~2.5rem) | Line Height: `100%` | Letter Spacing: `-0.008em`
- **H6**: `calc(28rem/16)` (~1.75rem) | Line Height: `100%` | Letter Spacing: `0em`
- **P1**: `calc(13rem/16)` (~0.8125rem) | Line Height: `138.462%` | Letter Spacing: `-0.024em`
- **P2**: `calc(11rem/16)` (~0.6875rem) | Line Height: `145.455%` | Letter Spacing: `-0.024em`
- **L1**: `calc(11rem/16)` (~0.6875rem) | Line Height: `145.455%` | Letter Spacing: `0.048em`
- **L2**: `calc(9rem/16)` (~0.5625rem) | Line Height: `133.333%` | Letter Spacing: `0.32em`
- **Accent 1**: `calc(192rem/16)` | Line Height: `100%`
- **Accent 2**: `calc(120rem/16)` | Line Height: `100%`

---

## 2. Color Palette

- **Primary Dark (Base 1000)**: `#17233b` (`rgb(23, 35, 59)`)
- **Primary Background (Base 0)**: `#f3f3ec` (`rgb(243, 243, 236)`)
- **Velvet Plum**: `#340c24`
- **Powder Sky**: `#b5cedb`
- **Blush Bloom**: `#f8bbcb`
- **Success Green**: `#1ba64b`
- **Alert Orange**: `#ffa800`
- **Error Red**: `#e23d3d`
- **Subtle Line / Borders**: `#17233b1a` (`rgba(23, 35, 59, 0.1)`)
- **Disabled Elements**: `#17233b4d` (`rgba(23, 35, 59, 0.3)`)
- **Muted / Gray Text**: `#17233b99` (`rgba(23, 35, 59, 0.6)`)
- **Subtle Fill / Card Hover**: `#17233b0d` (`rgba(23, 35, 59, 0.05)`)

---

## 3. Spacing & Grid System

- **Page Horizontal Insets**: `--_special-units---offset-l: calc(48rem/16)`, `--_special-units---offset-r: calc(48rem/16)`
- **Grid Gap**: `--_special-units---grid-gap: calc(16rem/16)`
- **Scale Unit Tokens**:
  - `u-0`: `0`
  - `u-4`: `0.25rem`
  - `u-8`: `0.5rem`
  - `u-12`: `0.75rem`
  - `u-16`: `1rem`
  - `u-24`: `1.5rem`
  - `u-32`: `2rem`
  - `u-48`: `3rem`
  - `u-64`: `4rem`

---

## 4. Motion & Animation Tokens

- **Durations**:
  - `--dur-s`: `0.3s` (standard micro-interactions, button hover)
  - `--dur-m`: `0.6s` (drawer slide, theme transitions)
  - `--dur-l`: `1.2s` (hero entrance, clip-path arch reveals)
- **Easing Curves**:
  - `--ease-out`: `cubic-bezier(0.16, 1, 0.3, 1)`
  - `--ease-in-out`: `cubic-bezier(0.76, 0, 0.24, 1)`
- **Scroll Physics**: Lenis smooth scroll (`smoothWheel: true`, `duration: 1.2`, `lerp: 0.1`).

---

## 5. Residence Detail Architecture (.lot- System)

- **Sticky Specs Rail (`.lot-s_info`)**: Sticks to the top of viewport (`position: sticky`, `height: 100vh`) on desktop viewports (`min-width: 992px`) displaying:
  - Unit Heading (`.lot-s_info_header_num`, e.g. `No. 011`)
  - Key metrics: Bedrooms, Interior Area, Terrace, Garden
  - Orienting compass with SVG angle indicator (`rotate: -165deg`)
  - Building block locator map (`.block-diagram`)
  - Request submission CTA trigger
- **Architectural Media Canvas (`.lot-s_media`)**:
  - **Desktop (`.b-desk`)**: High-res vector floor plans showing ground floor and basement layouts with room dimensions.
  - **Mobile (`.b-mob`)**: Dynamically scaled floor plans positioned inline with touch-friendly spacing and responsive height constraints.
