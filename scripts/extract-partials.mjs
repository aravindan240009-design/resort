import fs from 'fs';
import path from 'path';

const html = fs.readFileSync('extracted/pages/index.html', 'utf8');

fs.mkdirSync('src/partials', { recursive: true });

// 1. Cookies
const cookiesMatch = html.match(/<!--\s*cookies\s*-->[\s\S]*?<!--\s*\/cookies\s*-->/i) || 
                     html.match(/<div[^>]*class="[^"]*cookies-w[^"]*"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i);
if (cookiesMatch) {
  fs.writeFileSync('src/partials/cookies.html', cookiesMatch[0], 'utf8');
  console.log('Saved cookies.html, length:', cookiesMatch[0].length);
} else {
  // Try extracting .cookies-w block
  const start = html.indexOf('class="cookies-w');
  if (start !== -1) {
    const blockStart = html.lastIndexOf('<div', start);
    // Find matching closing tags or slice until master preloader
    const preloaderStart = html.indexOf('data-master-preloader');
    const block = html.slice(blockStart, html.lastIndexOf('<div', preloaderStart));
    fs.writeFileSync('src/partials/cookies.html', block, 'utf8');
    console.log('Saved cookies.html via slice, length:', block.length);
  }
}

// 2. Preloader
const preloaderStart = html.indexOf('data-master-preloader');
if (preloaderStart !== -1) {
  const blockStart = html.lastIndexOf('<div', preloaderStart);
  const mainStart = html.indexOf('<main');
  const block = html.slice(blockStart, mainStart);
  fs.writeFileSync('src/partials/preloader.html', block, 'utf8');
  console.log('Saved preloader.html, length:', block.length);
}

// 3. Nav
const navStart = html.indexOf('class="nav"');
if (navStart !== -1) {
  const blockStart = html.lastIndexOf('<div', navStart);
  const heroStart = html.indexOf('id="hero"');
  const block = html.slice(blockStart, html.lastIndexOf('<div', heroStart));
  fs.writeFileSync('src/partials/nav.html', block, 'utf8');
  console.log('Saved nav.html, length:', block.length);
}

// 4. Footer
const footerStart = html.indexOf('class="footer-w');
if (footerStart !== -1) {
  const blockStart = html.lastIndexOf('<div', footerStart);
  // Find where modal starts or main ends
  const mainEnd = html.indexOf('</main>');
  const block = html.slice(blockStart, mainEnd);
  fs.writeFileSync('src/partials/footer.html', block, 'utf8');
  console.log('Saved footer.html, length:', block.length);
}

// 5. Modals (Menu and CTA)
const modalMenuStart = html.indexOf('data-modal="menu"');
if (modalMenuStart !== -1) {
  const blockStart = html.lastIndexOf('<div', modalMenuStart);
  const modalCtaStart = html.indexOf('data-modal="cta"');
  if (modalCtaStart !== -1) {
    const block = html.slice(blockStart, html.lastIndexOf('<div', modalCtaStart));
    fs.writeFileSync('src/partials/modal-menu.html', block, 'utf8');
    console.log('Saved modal-menu.html, length:', block.length);
    
    // CTA modal
    const ctaBlockStart = html.lastIndexOf('<div', modalCtaStart);
    const scriptStart = html.indexOf('<script', ctaBlockStart);
    const ctaBlock = html.slice(ctaBlockStart, scriptStart);
    fs.writeFileSync('src/partials/modal-cta.html', ctaBlock, 'utf8');
    console.log('Saved modal-cta.html, length:', ctaBlock.length);
  }
}
