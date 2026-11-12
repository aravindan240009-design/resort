import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const scripts = Array.from(html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi));
console.log('Total script tags:', scripts.length);
scripts.forEach((s, idx) => {
  const isInline = !s[0].includes('src=');
  console.log(`Script #${idx}: ${isInline ? 'INLINE' : 'SRC ' + s[0].match(/src=["']([^"']+)["']/)?.[1]}`);
  if (isInline) {
    console.log('  Content preview:', s[1].trim().slice(0, 150));
  }
});
