import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { readdirSync } from 'fs';

const PAGES_DIR = '/tmp/siteclone/pages';
const OUT_DIR = '/tmp/siteclone/analysis';
mkdirSync(OUT_DIR, { recursive: true });

function decode(s: string) {
  return s
    .replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&#8217;|&rsquo;/g, "'").replace(/&#8216;|&lsquo;/g, "'")
    .replace(/&#8220;|&ldquo;/g, '"').replace(/&#8221;|&rdquo;/g, '"')
    .replace(/&#8211;|&ndash;/g, '–').replace(/&#8212;|&mdash;/g, '—')
    .replace(/&#038;|&#38;/g, '&').replace(/&#8230;/g, '…').replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(parseInt(d)));
}

function extractPage(html: string, name: string) {
  // Remove scripts/styles
  let body = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');

  // Find main content: strip cookie banner, mobile menu duplicates
  const out: string[] = [];

  // Headings
  for (const m of body.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)) {
    const txt = decode(m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')).trim();
    if (txt) out.push(`${m[1].toUpperCase()}: ${txt}`);
  }

  // Elementor text editor widgets
  for (const m of body.matchAll(/elementor-widget-text-editor[\s\S]{0,200}?<div class="elementor-widget-container">([\s\S]*?)<\/div>\s*<\/div>/g)) {
    const txt = decode(m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')).trim();
    if (txt && txt.length > 10) out.push(`TEXT: ${txt}`);
  }

  // Buttons / CTA links
  for (const m of body.matchAll(/<a[^>]*class="[^"]*elementor-button[^"]*"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)) {
    const txt = decode(m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')).trim();
    if (txt) out.push(`BTN: [${txt}] -> ${m[1]}`);
  }

  // Images with alt
  for (const m of body.matchAll(/<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/gi)) {
    if (m[1].includes('uploads') && !m[1].includes('plugins')) {
      out.push(`IMG: ${m[1]} | alt="${m[2]}"`);
    }
  }

  writeFileSync(`${OUT_DIR}/${name}.txt`, out.join('\n'), 'utf-8');
  console.log(`${name}: ${out.length} elements`);
}

for (const f of readdirSync(PAGES_DIR)) {
  const name = f.replace('.html', '');
  try {
    extractPage(readFileSync(`${PAGES_DIR}/${f}`, 'utf-8'), name);
  } catch (e) {
    console.log(`${name}: ERROR ${e.message}`);
  }
}
