/**
 * Смалява и конвертира снимките от `images/<папка>/` към `public/images/obekti/`.
 *
 * Нужно е, защото на безплатния план на Cloudflare няма оптимизация на
 * снимки по време на заявка (next/image е с `unoptimized: true`) — затова
 * файловете се подготвят предварително, при билд от разработчика.
 *
 * Пускане:  npm run images
 */
import sharp from "sharp";
import { readdir, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public/images/obekti");

/** Изходна папка -> префикс на файловете в сайта. */
const SOURCES = [
  { dir: "images/Завършен цялостен ремонт на покрив с.Марково", prefix: "markovo" },
  { dir: "images/A roof", prefix: "pokriv" },
];

// Плочките се показват най-много ~344px широки (3 колони в 1152px контейнер),
// затова 900px покрива и retina екрани с резерв.
const MAX_WIDTH = 900;
const QUALITY = 76;

await mkdir(OUT, { recursive: true });

let totalIn = 0;
let totalOut = 0;

for (const { dir, prefix } of SOURCES) {
  const absDir = path.join(ROOT, dir);
  const files = (await readdir(absDir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();

  let index = 1;
  for (const file of files) {
    const inPath = path.join(absDir, file);
    const name = `${prefix}-${String(index).padStart(2, "0")}.webp`;

    const inSize = (await stat(inPath)).size;
    const buf = await sharp(inPath)
      .rotate() // спазва EXIF ориентацията
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toBuffer();
    await writeFile(path.join(OUT, name), buf);

    totalIn += inSize;
    totalOut += buf.length;
    console.log(`${name}  ${(inSize / 1024).toFixed(0)}KB -> ${(buf.length / 1024).toFixed(0)}KB`);
    index++;
  }
  console.log(`${prefix}: ${files.length} снимки\n`);
}

const saved = 100 - (totalOut / totalIn) * 100;
console.log(
  `ОБЩО: ${(totalIn / 1024 / 1024).toFixed(2)} MB -> ${(totalOut / 1024 / 1024).toFixed(2)} MB (-${saved.toFixed(0)}%)`,
);
