import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
import path from "path";

const OUT_DIR = "/home/z/my-project/public/images/kge";

interface Job {
  file: string;
  size: string;
  prompt: string;
}

const JOBS: Job[] = [
  {
    file: "hero-house.jpg",
    size: "1536x768",
    prompt:
      "Stunning modern two storey house exterior in an upscale gated community in Accra Ghana, warm golden hour light, palm trees, paved driveway with gate, lush tropical landscaping, professional real estate photography, high quality, detailed",
  },
  {
    file: "hero-office.jpg",
    size: "1536x768",
    prompt:
      "Modern glass office building exterior in Accra Ghana business district, bright blue sky, palm trees along the entrance, clean architectural lines, professional architectural photography, high quality, detailed",
  },
  {
    file: "hero-land.jpg",
    size: "1536x768",
    prompt:
      "Aerial drone view of prime residential land plots for sale in Accra Ghana, neatly demarcated plots with graded access roads, green vegetation and palm trees, sunny day, professional drone photography, high quality, detailed",
  },
  {
    file: "house-exterior-1.jpg",
    size: "1344x768",
    prompt:
      "Elegant four bedroom storey house exterior, white walls with brown stone accents, black metal gate, interlocking paved front yard, tropical plants, Accra Ghana, professional real estate photography, high quality",
  },
  {
    file: "house-exterior-2.jpg",
    size: "1344x768",
    prompt:
      "Modern three bedroom detached house with grey walls and large windows, covered carport, manicured green lawn, tropical Ghana setting, professional real estate photography, high quality",
  },
  {
    file: "house-exterior-3.jpg",
    size: "1344x768",
    prompt:
      "Row of modern semi detached townhouses with cream coloured walls and terracotta roof tiles, paved street with streetlights, residential estate in Ghana, professional real estate photography, high quality",
  },
  {
    file: "interior-living.jpg",
    size: "1344x768",
    prompt:
      "Bright modern open plan living room interior, beige sofas with wooden coffee table, warm wooden floor, large windows with garden view, contemporary African home, professional interior photography, high quality",
  },
  {
    file: "interior-kitchen.jpg",
    size: "1344x768",
    prompt:
      "Modern fitted kitchen with wooden cabinets, granite countertop, built in oven and hob, tiled floor, bright natural light from window, professional interior photography, high quality",
  },
  {
    file: "interior-bedroom.jpg",
    size: "1344x768",
    prompt:
      "Elegant master bedroom interior, king size bed with crisp white bedding, wooden wardrobe, warm bedside lighting, large window with curtains, contemporary home in Africa, professional interior photography, high quality",
  },
  {
    file: "interior-bathroom.jpg",
    size: "1344x768",
    prompt:
      "Modern bathroom with grey wall tiles, walk in shower with glass screen, white wash basin on wooden vanity, mirror with warm light, bright and clean, professional interior photography, high quality",
  },
  {
    file: "apartment-let.jpg",
    size: "1344x768",
    prompt:
      "Furnished modern apartment living room with wall mounted TV, dining table for four, balcony door with city view, warm cosy interior, Accra Ghana, professional real estate photography, high quality",
  },
  {
    file: "townhouse-let.jpg",
    size: "1344x768",
    prompt:
      "Charming two storey townhouse for rent, cream walls with small balcony, fenced compound with trimmed lawn and palm trees, quiet residential area Accra Ghana, professional real estate photography, high quality",
  },
  {
    file: "office-exterior.jpg",
    size: "1344x768",
    prompt:
      "Contemporary low rise office plaza building with blue glass facade, wide parking lot, palm trees, Accra Ghana business district, professional architectural photography, high quality",
  },
  {
    file: "office-interior.jpg",
    size: "1344x768",
    prompt:
      "Modern open plan office interior with neat workstations, glass partition meeting rooms, suspended ceiling lights, wooden floor, professional corporate photography, high quality",
  },
  {
    file: "office-suite.jpg",
    size: "1344x768",
    prompt:
      "Executive office suite interior with large wooden desk, ergonomic leather chair, bookshelf, panoramic city view through window, elegant corporate design, professional photography, high quality",
  },
  {
    file: "land-plots.jpg",
    size: "1344x768",
    prompt:
      "Serviced residential land plots with concrete survey pillars and painted beacons, graded red earth access road, green grass and palm trees, Ghana, professional real estate photography, high quality",
  },
  {
    file: "land-aerial.jpg",
    size: "1344x768",
    prompt:
      "Drone aerial view of a new residential land development with laid out plots and access roads in Ghana, patches of green vegetation, bright sunny sky, professional drone photography, high quality",
  },
  {
    file: "land-commercial.jpg",
    size: "1344x768",
    prompt:
      "Commercial land plot along a major tarmac road in Ghana, flat cleared ground with survey markers, a few acacia trees, distant buildings, professional photography, high quality",
  },
  {
    file: "arch-blueprint.jpg",
    size: "1344x768",
    prompt:
      "Architectural blueprints of a modern house on a drafting table with scale ruler, pencils, white hard hat and small house model, top view, warm light, professional photography, high quality",
  },
  {
    file: "arch-cad.jpg",
    size: "1344x768",
    prompt:
      "African architect working at a computer showing a 3D house model on screen, floor plans spread on desk, modern studio office, professional photography, high quality",
  },
  {
    file: "team.jpg",
    size: "1344x768",
    prompt:
      "Professional Ghanaian real estate team of five in smart office attire standing and smiling in a modern office reception, corporate team photo, warm natural light, professional photography, high quality",
  },
  {
    file: "keys-handover.jpg",
    size: "1344x768",
    prompt:
      "Happy Ghanaian couple receiving house keys from a female real estate agent in front of a modern house, bright sunny day, warm smiles, professional real estate photography, high quality",
  },
];

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const zai = await ZAI.create();
  const results: { file: string; ok: boolean; err?: string }[] = [];

  const CONCURRENCY = 1;
  const DELAY_BETWEEN = 8000;
  let index = 0;

  async function worker() {
    while (index < JOBS.length) {
      const job = JOBS[index++];
      const outPath = path.join(OUT_DIR, job.file);
      if (fs.existsSync(outPath) && fs.statSync(outPath).size > 30000) {
        results.push({ file: job.file, ok: true });
        console.log(`SKIP (exists) ${job.file}`);
        continue;
      }
      let lastErr: unknown = null;
      for (let attempt = 1; attempt <= 5; attempt++) {
        try {
          const res = await zai.images.generations.create({
            prompt: job.prompt,
            size: job.size,
          });
          const b64 = res.data?.[0]?.base64;
          if (!b64) throw new Error("empty base64");
          fs.writeFileSync(outPath, Buffer.from(b64, "base64"));
          console.log(`OK ${job.file} (${Math.round(fs.statSync(outPath).size / 1024)} KB)`);
          results.push({ file: job.file, ok: true });
          lastErr = null;
          break;
        } catch (err) {
          lastErr = err;
          const msg = (err as Error).message;
          const is429 = msg.includes("429");
          const wait = is429 ? 15000 * attempt : 3000 * attempt;
          console.error(`ERR attempt ${attempt} ${job.file} (wait ${wait}ms): ${msg}`);
          await new Promise((r) => setTimeout(r, wait));
        }
      }
      if (lastErr) results.push({ file: job.file, ok: false, err: (lastErr as Error).message });
      // be gentle with the API
      await new Promise((r) => setTimeout(r, DELAY_BETWEEN));
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  const failed = results.filter((r) => !r.ok);
  console.log(`\nDONE: ${results.filter((r) => r.ok).length}/${JOBS.length} generated`);
  if (failed.length) {
    console.log("FAILED:", failed.map((f) => `${f.file} (${f.err})`).join(", "));
    process.exitCode = 1;
  }
}

main();
