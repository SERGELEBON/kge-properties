import ZAI from 'z-ai-web-dev-sdk';
import { writeFileSync } from 'fs';

async function main() {
  const url = process.argv[2];
  const outFile = process.argv[3] || '/tmp/page.txt';
  try {
    const zai = await ZAI.create();
    const result = await zai.functions.invoke('page_reader', { url });
    const content = (result.data?.html || '') + '';
    writeFileSync(outFile, content, 'utf-8');
    console.log('SAVED:', outFile, 'SIZE:', content.length);
    console.log('HEAD:', content.slice(0, 300));
  } catch (e) {
    console.error('ERROR:', e?.message || e);
    process.exit(1);
  }
}

main();
