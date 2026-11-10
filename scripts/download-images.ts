import { readFileSync, mkdirSync, existsSync, statSync, renameSync, unlinkSync } from 'fs';
import { dirname } from 'path';

const IMG_DIR = '/tmp/siteclone/images';
mkdirSync(IMG_DIR, { recursive: true });

const lines = readFileSync('/tmp/siteclone/image-list.txt', 'utf-8').trim().split('\n');
type Item = { url: string; rel: string; page: string };
const items: Item[] = [];
for (const line of lines) {
  const [url, rel, page] = line.split('\t');
  if (url && rel) items.push({ url, rel, page });
}

function paramsFor(rel: string) {
  const ext = rel.split('.').pop()?.toLowerCase() || 'jpg';
  switch (ext) {
    case 'jpg':
    case 'jpeg': return '&q=92';
    case 'png': return '&output=png';
    case 'webp': return '&output=webp&q=92';
    case 'gif': return '&n=-1';
    default: return '&q=92';
  }
}

function looksLikeImage(buf: Buffer): boolean {
  if (buf.length < 12) return false;
  // JPEG
  if (buf[0] === 0xff && buf[1] === 0xd8) return true;
  // PNG
  if (buf[0] === 0x89 && buf[1] === 0x50) return true;
  // GIF
  if (buf[0] === 0x47 && buf[1] === 0x49) return true;
  // WEBP (RIFF....WEBP)
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
  } catch (e) {
    if (attempt < 4) {
      await new Promise(r => setTimeout(r, 1500));
      return fetchWithRetry(url, attempt + 1);
    }
    return null;
  }
}

async function downloadOne(it: Item) {
  const out = `${IMG_DIR}/${it.rel}`;
  if (existsSync(out) && statSync(out).size > 500) {
    return 'skip';
  }
  mkdirSync(dirname(out), { recursive: true });
  const enc = encodeURIComponent(it.url);
  const url = `https://wsrv.nl/?url=${enc}${paramsFor(it.rel)}`;
  const res = await fetchWithRetry(url);
  if (res && res.ok) {
    const buf = Buffer.from(await res.arrayBuffer());
    if (looksLikeImage(buf)) {
      writeBuf(out, buf);
      return 'ok';
    }
  }
  return 'fail';
}

import { writeFileSync } from 'fs';
function writeBuf(path: string, buf: Buffer) {
  writeFileSync(path, buf);
}

async function main() {
  let ok = 0, skip = 0, fail = 0;
  const failed: string[] = [];
  const CONCURRENCY = 12;
  let idx = 0;

  async function worker() {
    while (idx < items.length) {
      const i = idx++;
      const it = items[i];
      try {
        const r = await downloadOne(it);
        if (r === 'ok') ok++;
        else if (r === 'skip') skip++;
        else { fail++; failed.push(it.rel); }
      } catch {
        fail++;
        failed.push(it.rel);
      }
      if ((ok + skip + fail) % 50 === 0) {
        console.log(`PROGRESS ${ok + skip + fail}/${items.length} (ok=${ok} skip=${skip} fail=${fail})`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  console.log(`DONE ok=${ok} skip=${skip} fail=${fail}`);
  if (failed.length) {
    writeFileSync('/tmp/siteclone/failed-images.txt', failed.join('\n'), 'utf-8');
    console.log('Failed list saved');
  }
}

main();
