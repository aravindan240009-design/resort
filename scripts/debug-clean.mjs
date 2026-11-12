import fs from 'fs';

const raw = fs.readFileSync('extracted/pages/index.html', 'utf8');
const specificRegex = /<script>\s*document\.addEventListener\('DOMContentLoaded',\s*function\s*\(\)\s*\{[\s\S]*?loadtwc\(src\);\s*\}\);\s*<\/script>/gi;

const replaced = raw.replace(specificRegex, '<script type="module" src="/src/scripts/main.js"></script>');
console.log('Original length:', raw.length);
console.log('New length:', replaced.length);
console.log('Diff:', raw.length - replaced.length);
