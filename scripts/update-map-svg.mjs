import fs from 'fs';

const svgPath = 'public/assets/images/6a258c1f74c3435f82f4f129_map_sales-office.svg';
let svg = fs.readFileSync(svgPath, 'utf8');

// Replace lines 364 to 371
const oldBlockRegex = /<circle cx="918" cy="377" r="3" fill="#17233B" fill-opacity="0\.6"\/>[\s\S]*?<circle cx="766" cy="169" r="3" fill="#17233B" fill-opacity="0\.6"\/>\s*<path d="M776\.776[\s\S]*?fill-opacity="0\.6"\/>/;

const newBlock = `<circle cx="918" cy="377" r="3" fill="#17233B" fill-opacity="0.6"/>
<text x="926" y="380" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="7.5" font-weight="600" letter-spacing="1" fill="#17233B" fill-opacity="0.7">ECR BEACH ROAD</text>
<circle cx="455" cy="532" r="3" fill="#17233B" fill-opacity="0.6"/>
<text x="465" y="535" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="7.5" font-weight="600" letter-spacing="1" fill="#17233B" fill-opacity="0.7">MARINA COAST</text>
<circle cx="618" cy="417" r="3" fill="#17233B" fill-opacity="0.6"/>
<text x="628" y="420" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="7.5" font-weight="600" letter-spacing="1" fill="#17233B" fill-opacity="0.7">BESANT NAGAR</text>
<circle cx="766" cy="169" r="3" fill="#17233B" fill-opacity="0.6"/>
<text x="776" y="172" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="7.5" font-weight="600" letter-spacing="1" fill="#17233B" fill-opacity="0.7">GUINDY ESTATE</text>`;

if (oldBlockRegex.test(svg)) {
  svg = svg.replace(oldBlockRegex, newBlock);
  fs.writeFileSync(svgPath, svg, 'utf8');
  fs.writeFileSync('dist/assets/images/6a258c1f74c3435f82f4f129_map_sales-office.svg', svg, 'utf8');
  console.log('Successfully updated map SVG with Chennai landmarks!');
} else {
  console.error('Could not match oldBlockRegex in SVG!');
}
