import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const distDir = resolve(process.cwd(), 'dist');
const indexHtml = resolve(distDir, 'index.html');
const notFoundHtml = resolve(distDir, '404.html');

// Ensure dist exists (vite should create it, but keep this script safe).
mkdirSync(distDir, { recursive: true });

if (!existsSync(indexHtml)) {
  console.warn('[postbuild-404] dist/index.html not found; skipping 404.html generation.');
  process.exit(0);
}

copyFileSync(indexHtml, notFoundHtml);
console.log('[postbuild-404] Generated dist/404.html for SPA routing fallback.');
