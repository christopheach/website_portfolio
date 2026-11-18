/**
 * Uploads the site's static media to Zipline and records where each file went.
 *
 *   npm run media:upload                     # uploads every file in ./media-src not yet in the manifest
 *   npm run media:upload -- path/to/folder   # same, from another folder
 *
 * Files keep their path relative to the source folder as their key, e.g. media-src/images/hero.jpg
 * becomes "/images/hero.jpg" in config/media-manifest.json. Code refers to that key through
 * `media("/images/hero.jpg")` (config/media.ts), so Zipline's random file names never leak into the code.
 *
 * Already-uploaded keys are skipped, so the script is safe to re-run after adding files.
 * To replace a file, delete its line from the manifest and run the script again.
 *
 * Needs ZIPLINE_URL and ZIPLINE_TOKEN (read from .env.local by the npm script).
 * ZIPLINE_MEDIA_FOLDER_ID optionally puts the files in a Zipline folder.
 */
import { openAsBlob } from "node:fs";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const manifestPath = path.join(root, "config", "media-manifest.json");
const sourceDir = path.resolve(process.argv[2] ?? path.join(root, "media-src"));

const MIME = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
};

const baseUrl = process.env.ZIPLINE_URL?.replace(/\/+$/, "");
const token = process.env.ZIPLINE_TOKEN;
const folderId = process.env.ZIPLINE_MEDIA_FOLDER_ID;
if (!baseUrl || !token) {
  console.error("ZIPLINE_URL and ZIPLINE_TOKEN must be set (see .env.example).");
  process.exit(1);
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
  const files = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : [full];
    }),
  );
  return files.flat();
}

async function upload(file, type) {
  const body = new FormData();
  body.append("file", await openAsBlob(file, { type }), path.basename(file));
  const headers = { authorization: token };
  if (folderId) headers["x-zipline-folder"] = folderId;

  const response = await fetch(`${baseUrl}/api/upload`, { method: "POST", headers, body });
  if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
  const { files } = await response.json();
  return `${baseUrl}/raw/${encodeURIComponent(files[0].name)}`;
}

const manifest = JSON.parse(await readFile(manifestPath, "utf8").catch(() => "{}"));
const files = (await walk(sourceDir)).filter((file) => MIME[path.extname(file).toLowerCase()]).sort();
if (files.length === 0) console.log(`No media found in ${sourceDir}.`);

let uploaded = 0;
for (const file of files) {
  const key = "/" + path.relative(sourceDir, file).split(path.sep).join("/");
  if (manifest[key]) continue;
  process.stdout.write(`Uploading ${key} … `);
  try {
    manifest[key] = await upload(file, MIME[path.extname(file).toLowerCase()]);
    uploaded += 1;
    console.log(manifest[key]);
    // Save after every file so an interrupted run can resume where it stopped.
    const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
    await writeFile(manifestPath, JSON.stringify(sorted, null, 2) + "\n");
  } catch (error) {
    console.log("failed");
    console.error(`  ${error.message}`);
    process.exitCode = 1;
  }
}
console.log(`Done: ${uploaded} uploaded, ${files.length - uploaded} already in the manifest or failed.`);
