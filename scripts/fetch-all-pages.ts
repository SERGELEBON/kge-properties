import ZAI from 'z-ai-web-dev-sdk';
import { writeFileSync, existsSync } from 'fs';

const PAGES: [string, string][] = [
  ['https://regimanuelgray.com/', 'home'],
  ['https://regimanuelgray.com/corporate-overview/', 'corporate-overview'],
  ['https://regimanuelgray.com/hallmarks/', 'hallmarks'],
  ['https://regimanuelgray.com/brand-story/', 'brand-story'],
  ['https://regimanuelgray.com/how-we-are-organised', 'how-we-are-organised'],
  ['https://regimanuelgray.com/our-team/', 'our-team'],
  ['https://regimanuelgray.com/our-expertise/', 'our-expertise'],
  ['https://regimanuelgray.com/regimanuel-satellite-city-east-legon-hills-accra/', 'satellite-city'],
  ['https://regimanuelgray.com/other-housing-developments/', 'other-housing'],
  ['https://regimanuelgray.com/infrastructure-site-services/', 'infrastructure'],
  ['https://regimanuelgray.com/commercial-development/', 'commercial'],
  ['https://regimanuelgray.com/industrial-land/', 'industrial-land'],
  ['https://regimanuelgray.com/rli-pharma-park/', 'rli-pharma-park'],
  ['https://regimanuelgray.com/textile-garment-apparel-zone/', 'textile-zone'],
  ['https://regimanuelgray.com/agro-processing-zone/', 'agro-zone'],
  ['https://regimanuelgray.com/warehousing-logistics-zone/', 'warehousing'],
  ['https://regimanuelgray.com/news-insights/', 'news-insights'],
  ['https://regimanuelgray.com/buy-a-house/', 'buy-a-house'],
  ['https://regimanuelgray.com/how-to-buy-a-house-at-regimanuel-gray-accra/', 'how-to-buy'],
  ['https://regimanuelgray.com/the-best-real-estate-developer-in-ghana/', 'why-trusted'],
  ['https://regimanuelgray.com/houses-for-sale-in-accra-the-pearls/', 'the-pearls'],
  ['https://regimanuelgray.com/adom-gate/', 'adom-gate'],
  ['https://regimanuelgray.com/east-airport/', 'east-airport'],
  ['https://regimanuelgray.com/contact/', 'contact'],
  ['https://regimanuelgray.com/privacy-policy', 'privacy-policy'],
  ['https://regimanuelgray.com/property/2-bedroom-house-for-sale-in-accra-detached/', 'prop-2bed-detached'],
  ['https://regimanuelgray.com/property/2-bedroom-house-for-sale-in-accra-detached-storey/', 'prop-2bed-storey'],
  ['https://regimanuelgray.com/property/3-bedroom-detached-expandable-storey/', 'prop-3bed-expandable'],
  ['https://regimanuelgray.com/how-to-own-your-dream-home-without-paying-everything-upfront/', 'post-dream-home'],
  ['https://regimanuelgray.com/why-diaspora-buyers-choose-regimanuel-gray/', 'post-diaspora'],
  ['https://regimanuelgray.com/industrial-and-commercial-land-near-tema/', 'post-industrial-land'],
];

const OUT = '/tmp/siteclone/pages';
import { mkdirSync } from 'fs';
mkdirSync(OUT, { recursive: true });

async function fetchPage(zai: any, url: string, name: string) {
  const file = `${OUT}/${name}.html`;
  if (existsSync(file)) {
    console.log(`SKIP ${name} (exists)`);
    return true;
  }
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const result = await zai.functions.invoke('page_reader', { url });
      if (result.code === 200 && result.data?.html) {
        writeFileSync(file, result.data.html, 'utf-8');
        console.log(`OK ${name} (${result.data.html.length} bytes)`);
        return true;
      }
      console.log(`RETRY ${name} attempt ${attempt}: code=${result.code}`);
    } catch (e: any) {
      console.log(`ERR ${name} attempt ${attempt}: ${e?.message || e}`);
      await new Promise(r => setTimeout(r, 3000));
    }
  }
  return false;
}

async function main() {
  const zai = await ZAI.create();
  let ok = 0, fail = 0;
  for (const [url, name] of PAGES) {
    const success = await fetchPage(zai, url, name);
    if (success) ok++; else fail++;
  }
  console.log(`\nDONE: ${ok} ok, ${fail} failed`);
}

main();
