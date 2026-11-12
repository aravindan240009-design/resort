# Design Tokens & System Specifications — ERA Residence

Extracted from live target: `https://www.era-residence.com/`

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
  - `u-96`: `6rem`
  - `u-160`: `10rem`
  - `u-272`: `17rem`

---

## 4. Animation & Motion Design

### Durations
- `--dur-s`: `0.4s` (Quick micro-interactions, badge reveals)
- `--dur-m`: `0.8s` (Button hover transitions, modal reveals)
- `--dur-l`: `1.2s` (Hero entrance, character reveals, section transitions)
- `stagger`: `0.1s` (Character and list stagger intervals)

### Timing Functions / Easing Curves
- `--ease-in-out`: `cubic-bezier(0.76, 0, 0.24, 1)`
- `--ease-out`: `cubic-bezier(0.25, 1, 0.5, 1)`
- `--ease-in`: `cubic-bezier(0.5, 0, 0.75, 0)`
- `--ease`: `cubic-bezier(0.25, 0.1, 0.25, 1)`
- `--ease-write`: `cubic-bezier(0.333, 0, 0.667, 1)`
- `diveIn`: `cubic-bezier(0.6, 0, 0, 1)`
- `horScroll`: `cubic-bezier(0.25, 0, 0.75, 1)`
- `loaderEase`: Custom bezier `M0,0,C0,0,0.13,0.34,0.238,0.442,0.305,0.506,0.322,0.514,0.396,0.54,0.478,0.568,0.468,0.56,0.522,0.584,0.572,0.606,0.61,0.719,0.714,0.826,0.798,0.912,1,1,1,1`

---

## 5. Key Interactive Mechanics

1. **Preloader Arch & Reveal**: Progressive arch scaling and expansion revealing the hero section with smooth camera zoom.
2. **Day / Night Switching**: Seamlessly toggles daylight architectural visuals and nighttime ambient lighting.
3. **Smooth Scroll Engine**: Lenis running at 60/120fps with inertial damping.
4. **Horizontal Walkway Section**: Min-width 992px horizontal scroll pinned track displaying the residential pathway and bougainvillea parallax layers.
5. **Architectural Clip-Path Transitions**: Geometric polygon clip-path morphs coordinated with scroll position.
6. **Apartment Browser**: Live filterable 25-residence catalog (Typology, Bedrooms, Area Sorting) with detail drawers and floorplans.
7. **Modals & Drawers**: Fullscreen responsive navigation menu and "Book a call" / "Contact" drawer forms.
