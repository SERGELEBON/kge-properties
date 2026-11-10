import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { readdirSync } from 'fs';

const PAGES_DIR = '/tmp/siteclone/pages';
const IMG_DIR = '/tmp/siteclone/images';
mkdirSync(IMG_DIR, { recursive: true });

function listImagesFromHtml(html: string): Set<string> {
  const urls = new Set<string>();
  const add = (u: string) => {
    if (!u) return;
    u = u.replace(/^\/\//, 'https://').trim();
    if (u.startsWith('/')) u = 'https://regimanuelgray.com' + u;
    if (!u.includes('regimanuelgray.com/wp-content/uploads')) return;
    if (u.endsWith('.svg') && u.includes('plugins')) return;
    urls.add(u);
  };
  // img src
  for (const m of html.matchAll(/<img[^>]*src="([^"]+)"/g)) add(m[1]);
  for (const m of html.matchAll(/<img[^>]*data-lazyload="([^"]+)"/g)) add(m[1]);
  // srcset variants (only take the base and listed)
  for (const m of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const part of m[1].split(',')) {
      const u = part.trim().split(/\s+/)[0];
      add(u);
    }
  }
  // css background images inline
  for (const m of html.matchAll(/background-image:\s*url\(&quot;([^&]+)&quot;\)/g)) add(m[1]);
  for (const m of html.matchAll(/background-image:\s*url\(['"]([^'"]+)['"]\)/g)) add(m[1]);
  // data-bg for slides
  for (const m of html.matchAll(/data-bg="([^"]+)"/g)) add(m[1]);
  // og:image
  for (const m of html.matchAll(/property="og:image"[^>]*content="([^"]+)"/g)) add(m[1]);
  for (const m of html.matchAll(/content="([^"]+)"[^>]*property="og:image"/g)) add(m[1]);
  return urls;
}

const all = new Map<string, string>(); // url -> filename
for (const f of readdirSync(PAGES_DIR)) {
  const html = readFileSync(`${PAGES_DIR}/${f}`, 'utf-8');
  const pageName = f.replace('.html', '');
  for (const u of listImagesFromHtml(html)) {
    if (!all.has(u)) all.set(u, pageName);
  }
}

console.log(`TOTAL UNIQUE IMAGES: ${all.size}`);

// Build curl list
const lines: string[] = [];
for (const [url, page] of all) {
  let fn = url
    .replace('https://regimanuelgray.com/wp-content/uploads/', '')
    .replace(/[^a-zA-Z0-9._\/-]/g, '');
  lines.push(`${url}\t${fn}\t${page}`);
}
writeFileSync('/tmp/siteclone/image-list.txt', lines.join('\n'), 'utf-8');
console.log('Wrote /tmp/siteclone/image-list.txt');
