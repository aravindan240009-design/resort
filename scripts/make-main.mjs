import fs from 'fs';

const raw = fs.readFileSync('extracted/slater-raw.js', 'utf8');

// Let's create a single clean unminified module or modularized files
// First, let's write src/scripts/app.js which contains the full unminified, well-commented implementation
// and then export each submodule so it can be imported as ES modules or used as main entry.

fs.mkdirSync('src/scripts', { recursive: true });

// Let's write src/scripts/main.js
const mainJs = `/**
 * ERA Residence — Core Application Bundle (Modular ES Module)
 * Handles Lenis smooth scroll, GSAP animations, split text,
 * theme toggle, horizontal scroll, apartment filtering, and page transitions.
 */

${raw}
`;

fs.writeFileSync('src/scripts/main.js', mainJs, 'utf8');
console.log('Saved src/scripts/main.js, size:', mainJs.length);
