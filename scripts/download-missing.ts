import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'fs';
import { dirname } from 'path';

// Missing gallery images referenced in src/data/properties.ts (relative to /images/)
const MISSING = [
  '2023/08/IMG_9122-2-1024x683.jpg',
  '2023/08/IMG_9157-2-1-1024x683.jpg',
  '2023/08/IMG_9468-1024x683.jpg',
  '2023/08/IMG_9472-1-1024x683.jpg',
  '2023/08/IMG_9975-1-1024x683.jpg',
  '2023/08/RGP-1-2-6-1024x724.jpg',
  '2023/10/RG3-3-Bedroom-Detached-Expandable-4-1024x683.webp',
  '2023/10/RG3-3-Bedroom-Detached-Expandable-6-1024x683.webp',
  '2023/10/RG3-3-Bedroom-Detached-Expandable-a-1024x683.webp',
  '2023/10/RG3-Type-A-Three-Bedroom-Expandable-Detached-House-10-1024x683.webp',
  '2023/10/RG3-Type-A-Three-Bedroom-Expandable-Detached-House-8-1024x683.webp',
  '2023/10/RG3-Type-A-Three-Bedroom-Expandable-Detached-House-9-1024x683.webp',
  '2023/10/RG7-2-Bedroom-Detached-_-Expandable-16-1024x683.webp',
  '2023/10/RG7-2-Bedroom-Detached-_-Expandable-17-1024x683.webp',
  '2023/10/RG7-2-Bedroom-Detached-_-Expandable-19-1024x683.webp',
  '2023/10/RG7-2-Bedroom-Detached-_-Expandable-2-1024x683.webp',
  '2023/10/RG7-Type-B-Two-Bedroom-Expandable-Detached-House-1024x683.webp',
  '2024/04/A-beautiful-bedroom-with-a-white-bedsheet-nicely-covering-the-bed.-The-TV-is-installed-on-the-left-wall-and-facing-the-bed-1024x576.png',
  '2024/04/A-calm-bedroom-view-with-white-walls-and-a-white-voil-on-the-large-left-windows.-The-foot-of-the-bed-is-facing-the-camera-1024x576.png',
  '2024/04/An-extended-view-of-an-open-plan-modern-living-room-3-1024x576.jpg',
  '2024/04/The-back-view-of-a-white-one-storey-house-with-the-back-garden-view-and-a-blue-car-parked-outside-1024x576.jpg',
  '2024/04/The-front-view-of-a-white-3-bedroom-storey-house-with-beautiful-plant-adorning-the-front-door-of-the-house-1024x576.png',
  '2024/04/The-front-view-of-a-white-and-brown-one-storey-house-at-Regimanuel-Satellite-City-with-a-Toyota-Land-Cruiser-parked-in-front-of-the-house-1024x576.jpg',
  '2024/09/A-well-spaced-room-in-a-3-bedroom-house-for-sale-in-Accra-Ghana-The-right-side-of-this-view-shows-the-television-facing-the-bed-and-the-left-side-is-a-large-glass-window-that-brings-in-a-lot-na-1024x682.jpg',
  '2024/09/BEDS-EYE-VIEW-OF-THE-OPEN-ROOF-OF-a-3-bedroom-house-for-sale-in-Accra-Ghana-1024x682.jpg',
  '2024/09/the-main-front-view-of-a-3-bedroom-house-for-sale-in-Accra-Ghana-The-building-is-grey-1024x683.jpg',
];

const IMG_DIR = '/home/z/my-project/public/images';
const ORIGIN = 'https://regimanuelgray.com/wp-content/uploads/';

function paramsFor(rel: string) {
  const ext = rel.split('.').pop()?.toLowerCase() || 'jpg';
  switch (ext) {
    case 'png': return '&output=png';
    case 'webp': return '&output=webp&q=92';
    default: return '&q=92';
  }
}

function looksLikeImage(buf: Buffer): boolean {
  if (buf.length < 12) return false;
  if (buf[0] === 0xff && buf[1] === 0xd8) return true; // jpeg
  if (buf[0] === 0x89 && buf[1] === 0x50) return true; // png
  if (buf[0] === 0x47 && buf[1] === 0x49) return true; // gif
  if (buf.slice(0, 4).toString() === 'RIFF' && buf.slice(8, 12).toString() === 'WEBP') return true;
  return false;
}

async function fetchWithRetry(url: string, attempt = 1): Promise<Response | null> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 60000);
    const res = await fetch(url, { signal: ctrl.signal });
    clearTimeout(t);
    return res;
  } catch {
    if (attempt < 4) {
      await new Promise((r) => setTimeout(r, 1500));
      return fetchWithRetry(url, attempt + 1);
    }
    return null;
  }
}

async function downloadOne(rel: string): Promise<string> {
  const out = `${IMG_DIR}/${rel}`;
  if (existsSync(out) && statSync(out).size > 500) return 'skip';
  mkdirSync(dirname(out), { recursive: true });
  const enc = encodeURIComponent(ORIGIN + rel);
  const url = `https://wsrv.nl/?url=${enc}${paramsFor(rel)}`;
  const res = await fetchWithRetry(url);
  if (res && res.ok) {
    const buf = Buffer.from(await res.arrayBuffer());
    if (looksLikeImage(buf)) {
      writeFileSync(out, buf);
      return `ok ${buf.length}`;
    }
  }
  return 'fail';
}

async function main() {
  const results: Record<string, string> = {};
  for (const rel of MISSING) {
    results[rel] = await downloadOne(rel);
    console.log(results[rel], rel.split('/').pop()?.slice(0, 60));
  }
  writeFileSync('/tmp/siteclone/dl-results.json', JSON.stringify(results, null, 1));
}

main();
