import ZAI from 'z-ai-web-dev-sdk';
import { writeFileSync } from 'fs';

async function main() {
  const url = process.argv[2];
  const outFile = process.argv[3] || '/tmp/page.html';
  try {
    const zai = await ZAI.create();
    const result = await zai.functions.invoke('page_reader', { url });
    console.log('CODE:', result.code);
    console.log('TITLE:', result.data?.title);
    const html = result.data?.html || '';
    writeFileSync(outFile, html, 'utf-8');
    console.log('SAVED:', outFile, 'SIZE:', html.length);
  } catch (e) {
    console.error('ERROR:', e?.message || e);
    process.exit(1);
  }
}

main();
