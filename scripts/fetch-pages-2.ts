import ZAI from 'z-ai-web-dev-sdk';
import { writeFileSync, mkdirSync, existsSync } from 'fs';

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
mkdirSync(OUT, { recursive: true });

async function main() {
  const zai = await ZAI.create();
  for (const [url, name] of PAGES) {
    const outFile = `${OUT}/${name}.html`;
    if (existsSync(outFile)) {
      console.log(`SKIP ${name}`);
      continue;
    }
    try {
      const result = await zai.functions.invoke('page_reader', { url });
      const html = result?.data?.html || '';
      if (html.length > 1000) {
        writeFileSync(outFile, html, 'utf-8');
        console.log(`OK ${name} ${html.length}`);
      } else {
        console.log(`SMALL ${name} ${html.length}`);
      }
    } catch (e: unknown) {
      console.log(`ERR ${name}: ${e instanceof Error ? e.message : String(e)}`);
    }
    await new Promise((r) => setTimeout(r, 800));
  }
}

main();
