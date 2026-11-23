import fs from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';

const slugs = [
  '011', '012', '031', '032', '033', '034',
  '111', '112', '113', '114', '121', '122',
  '123', '124', '131', '132', '133', '134',
  '211', '212', '213', '221', '222', '223',
  '224'
];

const input = {
  main: resolve(import.meta.dirname, 'index.html'),
  apartments: resolve(import.meta.dirname, 'apartments.html'),
  apartmentsIndex: resolve(import.meta.dirname, 'apartments/index.html'),
  contact: resolve(import.meta.dirname, 'contact.html'),
  comingSoon: resolve(import.meta.dirname, 'coming-soon.html')
};

if (fs.existsSync(resolve(import.meta.dirname, 'contact/index.html'))) {
  input.contactIndex = resolve(import.meta.dirname, 'contact/index.html');
}
if (fs.existsSync(resolve(import.meta.dirname, 'coming-soon/index.html'))) {
  input.comingSoonIndex = resolve(import.meta.dirname, 'coming-soon/index.html');
}

for (const slug of slugs) {
  const p = resolve(import.meta.dirname, `apartments/${slug}/index.html`);
  if (fs.existsSync(p)) {
    input[`apartment_${slug}`] = p;
  }
}

function apartmentRewritePlugin() {
  const handler = (req, res, next) => {
    const rawUrl = req.url || '';
    const pathname = rawUrl.split('?')[0];
    const query = rawUrl.includes('?') ? rawUrl.slice(rawUrl.indexOf('?')) : '';

    if (pathname === '/apartments' || pathname === '/apartments/') {
      req.url = '/apartments.html' + query;
      return next();
    }
    if (pathname === '/contact' || pathname === '/contact/') {
      req.url = '/contact.html' + query;
      return next();
    }
    if (pathname === '/coming-soon' || pathname === '/coming-soon/') {
      req.url = '/coming-soon.html' + query;
      return next();
    }

    const match = pathname.match(/^\/apartments\/([0-9]+)\/?$/);
    if (match) {
      const slug = match[1];
      req.url = `/apartments/${slug}/index.html` + query;
      return next();
    }
    next();
  };

  return {
    name: 'apartment-rewrite-plugin',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    }
  };
}

export default defineConfig({
  root: './',
  publicDir: 'public',
  plugins: [apartmentRewritePlugin()],
  server: {
    port: 3005,
    strictPort: false,
    open: false
  },
  preview: {
    port: 3005,
    strictPort: false,
    open: false
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input
    }
  }
});
