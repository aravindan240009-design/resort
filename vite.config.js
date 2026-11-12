import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  publicDir: 'public',
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
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        apartments: resolve(import.meta.dirname, 'apartments.html'),
        contact: resolve(import.meta.dirname, 'contact.html'),
        comingSoon: resolve(import.meta.dirname, 'coming-soon.html')
      }
    }
  }
});
