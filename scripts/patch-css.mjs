import fs from 'fs';

let css = fs.readFileSync('public/css/era-residence.shared.css', 'utf8');

css = css.replace('https://cdn.prod.website-files.com/6a068da7ad91b057365bf967/6a06a699270853940fed199c_MaisonNeueExt-Book.woff2', '/fonts/MaisonNeueExt-Book.woff2');
css = css.replace('https://cdn.prod.website-files.com/6a068da7ad91b057365bf967/6a06a6b22391d5d6ce159452_MaisonNeueExt-Bold.woff2', '/fonts/MaisonNeueExt-Bold.woff2');

const customFonts = `
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
`;

css = customFonts + css;
fs.writeFileSync('public/css/era-residence.shared.css', css, 'utf8');
console.log('Successfully patched public/css/era-residence.shared.css with local fonts');
