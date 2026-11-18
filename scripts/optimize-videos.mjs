/**
 * Builds web versions of the site's background videos with ffmpeg.
 *
 *   npm run media:videos      # then: npm run media:upload
 *
 * For every master in media-originals/videos/<name>.<ext> it writes to media-src/videos/:
 *   <name>.mp4         desktop version (1080p, or 720p wide for vertical videos)
 *   <name>-small.mp4   phone version   (720p, or 540p wide for vertical videos)
 *   <name>-poster.jpg  first frame, shown while the video loads
 *
 * All versions are muted (the site only plays them muted), H.264 for universal playback,
 * capped bitrate so they stream smoothly, and "faststart" so playback begins before the download ends.
 * Existing outputs are skipped; delete one to rebuild it.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const inputDir = path.join(root, "media-originals", "videos");
const outputDir = path.join(root, "media-src", "videos");

const VARIANTS = [
  // shortSide: target size of the video's shorter side (width for vertical videos, height for horizontal ones).
  { suffix: "", shortSide: { landscape: 1080, portrait: 720 }, crf: 26, maxrate: "3M" },
  { suffix: "-small", shortSide: { landscape: 720, portrait: 540 }, crf: 27, maxrate: "1.5M" },
];

function probe(file) {
  const out = execFileSync("ffprobe", [
    "-v", "error", "-select_streams", "v:0",
    "-show_entries", "stream=width,height:stream_side_data=rotation",
    "-of", "json", file,
  ]);
  const stream = JSON.parse(out.toString()).streams[0];
  const rotated = Math.abs(stream.side_data_list?.[0]?.rotation ?? 0) === 90;
  const [width, height] = rotated ? [stream.height, stream.width] : [stream.width, stream.height];
  return { width, height, portrait: height > width };
}

function run(args) {
  execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });
}

if (!existsSync(inputDir)) {
  console.error(`Put the original videos in ${path.relative(root, inputDir)}/ first.`);
  process.exit(1);
}
mkdirSync(outputDir, { recursive: true });

const masters = readdirSync(inputDir).filter((file) => /\.(mp4|mov|m4v|webm|mkv)$/i.test(file));
for (const file of masters) {
  const input = path.join(inputDir, file);
  const name = path.parse(file).name;
  const { width, height, portrait } = probe(input);
  const orientation = portrait ? "portrait" : "landscape";

  for (const variant of VARIANTS) {
    const output = path.join(outputDir, `${name}${variant.suffix}.mp4`);
    if (existsSync(output)) continue;
    // Never upscale.
    const target = Math.min(variant.shortSide[orientation], portrait ? width : height);
    const scale = portrait ? `scale=${target}:-2` : `scale=-2:${target}`;
    process.stdout.write(`${name}${variant.suffix}.mp4 (${scale}) … `);
    run([
      "-i", input,
      "-an", // muted on the site, so no audio track
      "-vf", `${scale}:flags=lanczos,format=yuv420p`,
      "-c:v", "libx264", "-preset", "slow", "-profile:v", "high",
      "-crf", String(variant.crf), "-maxrate", variant.maxrate, "-bufsize", `${parseFloat(variant.maxrate) * 2}M`,
      "-movflags", "+faststart",
      output,
    ]);
    console.log("done");
  }

  const poster = path.join(outputDir, `${name}-poster.jpg`);
  if (!existsSync(poster)) {
    const target = Math.min(VARIANTS[0].shortSide[orientation], portrait ? width : height);
    run(["-i", input, "-frames:v", "1", "-vf", portrait ? `scale=${target}:-2` : `scale=-2:${target}`, "-q:v", "3", poster]);
    console.log(`${name}-poster.jpg done`);
  }
}
console.log("Next: npm run media:upload");
