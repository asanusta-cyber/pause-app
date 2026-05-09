// Генерирует PWA-иконки: /public/icon-192.png, /public/icon-512.png, /public/icon-512-maskable.png
// Запуск: node scripts/generate-icons.mjs
//
// Дизайн: круг (для обычных иконок) или квадрат с safe-zone (для maskable)
// фон #efede7 (наш bg-secondary), литера «L» цветом #1a1a1a, font-weight 500.

import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "..", "public");

const BG = "#efede7";
const FG = "#1a1a1a";
const RADIAL_OUTER = "#e3dfd6"; // лёгкая виньетка по краям

function svgRound(size) {
  const r = size / 2;
  const fontSize = Math.round(size * 0.62);
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <radialGradient id="g" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="${BG}" />
      <stop offset="100%" stop-color="${RADIAL_OUTER}" />
    </radialGradient>
  </defs>
  <circle cx="${r}" cy="${r}" r="${r}" fill="url(#g)" />
  <text x="50%" y="50%"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        font-weight="500"
        font-size="${fontSize}"
        fill="${FG}">L</text>
</svg>`;
}

function svgMaskable(size) {
  // Полный квадратный фон + safe-zone ~80%; буква вписана в центр.
  const fontSize = Math.round(size * 0.5);
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <radialGradient id="g" cx="50%" cy="45%" r="70%">
      <stop offset="0%" stop-color="${BG}" />
      <stop offset="100%" stop-color="${RADIAL_OUTER}" />
    </radialGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#g)" />
  <text x="50%" y="50%"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        font-weight="500"
        font-size="${fontSize}"
        fill="${FG}">L</text>
</svg>`;
}

async function render(svg, outPath, size) {
  const buf = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
  await writeFile(outPath, buf);
  console.log("wrote", outPath);
}

async function main() {
  await mkdir(publicDir, { recursive: true });
  await render(svgRound(192), resolve(publicDir, "icon-192.png"), 192);
  await render(svgRound(512), resolve(publicDir, "icon-512.png"), 512);
  await render(
    svgMaskable(512),
    resolve(publicDir, "icon-512-maskable.png"),
    512
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
