/**
 * generate-posters.mjs
 * Generates 4 VOD poster placeholders at 400×600px (2:3 ratio).
 * Usage: node scripts/generate-posters.mjs
 *
 * Output: frontend/public/assest/images/movie/posters/poster-1..4.jpg
 *
 * To use your own images instead of placeholders, replace the SVG source
 * in each `posters` entry with a sharp().resize() call on your image file.
 */

import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const OUTPUT_DIR = path.join(
  __dirname,
  "../public/assest/images/movie/posters"
);

const WIDTH = 400;
const HEIGHT = 600;

// 4 poster definitions — swap `bgColor` / `title` for your real art
const posters = [
  { id: 1, title: "Movie 1",     subtitle: "2024 · Action",     bgColor: "#1a1a2e", accent: "#e94560" },
  { id: 2, title: "Movie 2",     subtitle: "2024 · Drama",      bgColor: "#16213e", accent: "#0f3460" },
  { id: 3, title: "TV Show 1",   subtitle: "Season 1 · Sci-Fi", bgColor: "#0f0f1a", accent: "#533483" },
  { id: 4, title: "TV Show 2",   subtitle: "Season 2 · Thriller",bgColor: "#1b1b2f", accent: "#f5a623" },
];

function makeSvg(title, subtitle, bgColor, accent) {
  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${bgColor}" stop-opacity="1"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="1"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#g)"/>

  <!-- Decorative accent bar -->
  <rect x="0" y="${HEIGHT - 8}" width="${WIDTH}" height="8" fill="${accent}"/>

  <!-- Centre icon placeholder -->
  <rect x="150" y="180" width="100" height="140" rx="8"
        fill="none" stroke="${accent}" stroke-width="3" opacity="0.6"/>
  <polygon points="185,230 185,290 235,260" fill="${accent}" opacity="0.8"/>

  <!-- Title -->
  <text x="${WIDTH / 2}" y="400"
        font-family="Arial, sans-serif" font-size="28" font-weight="bold"
        fill="#ffffff" text-anchor="middle">${title}</text>

  <!-- Subtitle -->
  <text x="${WIDTH / 2}" y="440"
        font-family="Arial, sans-serif" font-size="16"
        fill="#aaaaaa" text-anchor="middle">${subtitle}</text>

  <!-- Dimensions watermark -->
  <text x="${WIDTH / 2}" y="${HEIGHT - 20}"
        font-family="Arial, sans-serif" font-size="12"
        fill="#666666" text-anchor="middle">${WIDTH}×${HEIGHT}px</text>
</svg>`);
}

async function resizeExistingImage(inputPath, outputPath) {
  await sharp(inputPath)
    .resize(WIDTH, HEIGHT, {
      fit: "cover",        // crop to fill — change to "contain" to letterbox
      position: "centre",
    })
    .jpeg({ quality: 90 })
    .toFile(outputPath);
}

async function run() {
  console.log(`Output dir: ${OUTPUT_DIR}\n`);

  for (const p of posters) {
    const out = path.join(OUTPUT_DIR, `poster-${p.id}.jpg`);
    const svg = makeSvg(p.title, p.subtitle, p.bgColor, p.accent);

    await sharp(svg)
      .resize(WIDTH, HEIGHT)
      .jpeg({ quality: 90 })
      .toFile(out);

    console.log(`✓ poster-${p.id}.jpg  →  ${WIDTH}×${HEIGHT}px`);
  }

  console.log(`\nDone. Replace SVG placeholders with real art by calling`);
  console.log(`resizeExistingImage("your-file.jpg", outputPath) in the script.\n`);
  console.log(`Poster spec:`);
  console.log(`  Width  : ${WIDTH}px`);
  console.log(`  Height : ${HEIGHT}px`);
  console.log(`  Ratio  : 2:3 (vertical)`);
  console.log(`  Format : JPEG q90`);
}

run().catch((err) => { console.error(err); process.exit(1); });
