import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join, relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";

function argument(name, fallback = null) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

const quality = Number(argument("--quality", "75"));
const root = resolve(process.cwd(), argument("--dir", "public/assets"));
const manifestPath = resolve(process.cwd(), "design-assets/optimization-manifest.json");
const checkOnly = process.argv.includes("--check");
const force = process.argv.includes("--force");

if (!Number.isInteger(quality) || quality < 1 || quality > 100) {
  throw new Error("La calidad debe ser un número entero entre 1 y 100.");
}

if (!existsSync(root)) throw new Error(`No existe el directorio ${root}`);

const magick = spawnSync("magick", ["-version"], { encoding: "utf8" });
if (magick.status !== 0) {
  throw new Error("ImageMagick no está disponible. Instálalo y confirma que el comando `magick` funciona.");
}

function filesIn(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) return filesIn(fullPath);
    return entry.isFile() && entry.name.toLowerCase().endsWith(".webp") ? [fullPath] : [];
  });
}

function hashFile(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

const previous = existsSync(manifestPath)
  ? JSON.parse(readFileSync(manifestPath, "utf8"))
  : { version: 1, files: {} };
const images = filesIn(root).sort();

if (checkOnly) {
  const stale = images.filter((filePath) => {
    const key = relative(process.cwd(), filePath).replaceAll("\\", "/");
    const entry = previous.files?.[key];
    return !entry || entry.quality !== quality || entry.outputHash !== hashFile(filePath);
  });
  if (stale.length) {
    console.error(`Hay ${stale.length} assets sin optimizar al ${quality}.`);
    stale.slice(0, 12).forEach((filePath) => console.error(`- ${relative(process.cwd(), filePath)}`));
    process.exit(1);
  }
  console.log(`✓ ${images.length} assets WebP verificados a calidad ${quality}.`);
  process.exit(0);
}

const tempRoot = join(tmpdir(), `razonor-assets-${Date.now()}`);
mkdirSync(tempRoot, { recursive: true });

let originalTotal = 0;
let finalTotal = 0;
let optimized = 0;
let skipped = 0;
const files = {};

try {
  for (const [index, filePath] of images.entries()) {
    const key = relative(process.cwd(), filePath).replaceAll("\\", "/");
    const originalBytes = statSync(filePath).size;
    const currentHash = hashFile(filePath);
    const oldEntry = previous.files?.[key];
    originalTotal += originalBytes;

    if (!force && oldEntry?.quality === quality && oldEntry.outputHash === currentHash) {
      skipped += 1;
      finalTotal += originalBytes;
      files[key] = oldEntry;
      continue;
    }

    const tempPath = join(tempRoot, `${String(index).padStart(4, "0")}-${basename(filePath)}`);
    const result = spawnSync(
      "magick",
      [
        filePath,
        "-auto-orient",
        "-strip",
        "-define", "webp:method=6",
        "-define", "webp:alpha-quality=90",
        "-quality", String(quality),
        tempPath,
      ],
      { encoding: "utf8" },
    );
    if (result.status !== 0 || !existsSync(tempPath)) {
      throw new Error(`No se pudo optimizar ${key}: ${result.stderr || result.stdout}`);
    }

    const candidateBytes = statSync(tempPath).size;
    if (candidateBytes < originalBytes) {
      rmSync(filePath, { force: true });
      renameSync(tempPath, filePath);
      optimized += 1;
    } else {
      rmSync(tempPath, { force: true });
    }

    const finalBytes = statSync(filePath).size;
    finalTotal += finalBytes;
    files[key] = {
      quality,
      bytes: finalBytes,
      outputHash: hashFile(filePath),
    };
  }
} finally {
  rmSync(tempRoot, { recursive: true, force: true });
}

mkdirSync(resolve(process.cwd(), "design-assets"), { recursive: true });
writeFileSync(
  manifestPath,
  `${JSON.stringify({ version: 1, quality, root: relative(process.cwd(), root).replaceAll("\\", "/"), files }, null, 2)}\n`,
  "utf8",
);

const saved = originalTotal - finalTotal;
const percent = originalTotal ? ((saved / originalTotal) * 100).toFixed(1) : "0.0";
console.log(`Assets WebP: ${images.length}`);
console.log(`Optimizados: ${optimized} · Sin cambios/repetidos: ${skipped + images.length - optimized - skipped}`);
console.log(`Antes: ${formatBytes(originalTotal)} · Después: ${formatBytes(finalTotal)}`);
console.log(`Ahorro: ${formatBytes(saved)} (${percent}%)`);
console.log(`Manifiesto: ${relative(process.cwd(), manifestPath)}`);
