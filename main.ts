// news-image-20261123 — copies the pre-rendered front page (entry.png) to
// the output directory. Node 22 standard library only; no network access.
// The image is "THE WORLD." front page for Monday 23 November 2026, built
// from that day's verified news (see NEWS_23NOV.md). Usage:
//   MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const MAX_BYTES = 1048576;
const MAX_DIMENSION = 1024;

const source = "entry.png";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const destination = join(outDir, "entry.png");

const data = readFileSync(source);
if (data.length > MAX_BYTES) {
  throw new Error(`entry.png is ${data.length} bytes, over the 1 MiB limit`);
}

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (data.length < 33 || !data.subarray(0, 8).equals(PNG_MAGIC)) {
  throw new Error("entry.png is not a PNG file (bad magic bytes)");
}
if (data.toString("ascii", 12, 16) !== "IHDR") {
  throw new Error("entry.png has no IHDR chunk where one is expected");
}
const width = data.readUInt32BE(16);
const height = data.readUInt32BE(20);
if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
  throw new Error(`entry.png is ${width}x${height}, over the 1024x1024 limit`);
}
if (width === 0 || height === 0) {
  throw new Error("entry.png has a zero dimension");
}

// Genuine IEND check: a whole PNG ends with a 12-byte IEND chunk — a
// zero length, the ASCII type "IEND", and the fixed CRC 0xae426082.
// Anything else means the file was cut short, so refuse it outright.
const IEND_CRC = 0xae426082;
if (data.length < 45) {
  throw new Error("entry.png is too small to be a whole PNG (file may be truncated)");
}
const tail = data.subarray(data.length - 12);
if (
  tail.readUInt32BE(0) !== 0 ||
  tail.toString("ascii", 4, 8) !== "IEND" ||
  tail.readUInt32BE(8) !== IEND_CRC
) {
  throw new Error("entry.png does not end with a valid IEND chunk (file may be truncated)");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, destination);

const written = statSync(destination);
console.log(`Wrote ${destination}`);
console.log(`Dimensions: ${width}x${height}`);
console.log(`Size: ${written.size} bytes`);
