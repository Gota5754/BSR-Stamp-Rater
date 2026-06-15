// Génère les icônes PWA (192 & 512) — carré sombre + "BSR" orange.
import zlib from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";

const F = {
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
};

function makeIcon(size) {
  const buf = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const i = (y * size + x) * 4;
    const t = y / size;
    buf[i] = 12 + t * 8; buf[i + 1] = 12 + t * 8; buf[i + 2] = 20 + t * 14; buf[i + 3] = 255;
  }
  const px = (x, y, c) => {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    const i = (y * size + x) * 4; buf[i] = c[0]; buf[i + 1] = c[1]; buf[i + 2] = c[2]; buf[i + 3] = 255;
  };
  // "BSR" centré
  const scale = Math.floor(size / 28);
  const word = "BSR";
  const wpx = word.length * 6 * scale - scale;
  let cx = Math.floor((size - wpx) / 2);
  const cy = Math.floor((size - 7 * scale) / 2);
  for (const ch of word) {
    const g = F[ch];
    for (let ry = 0; ry < 7; ry++) for (let rx = 0; rx < 5; rx++) {
      if (g[ry][rx] === "1") for (let sy = 0; sy < scale; sy++) for (let sx = 0; sx < scale; sx++) px(cx + rx * scale + sx, cy + ry * scale + sy, [255, 149, 0]);
    }
    cx += 6 * scale;
  }
  return encode(buf, size, size);
}

function crc32(b) { let c = ~0; for (let i = 0; i < b.length; i++) { c ^= b[i]; for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xEDB88320 & -(c & 1)); } return ~c >>> 0; }
function chunk(type, data) { const t = Buffer.from(type, "ascii"); const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([t, data]))); return Buffer.concat([len, t, data, crc]); }
function encode(buf, W, H) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4); ihdr[8] = 8; ihdr[9] = 6;
  const raw = Buffer.alloc(H * (W * 4 + 1));
  for (let y = 0; y < H; y++) { raw[y * (W * 4 + 1)] = 0; buf.copy(raw, y * (W * 4 + 1) + 1, y * W * 4, (y + 1) * W * 4); }
  const idat = zlib.deflateSync(raw, { level: 9 });
  return Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", idat), chunk("IEND", Buffer.alloc(0))]);
}

mkdirSync("public", { recursive: true });
writeFileSync("public/icon-192.png", makeIcon(192));
writeFileSync("public/icon-512.png", makeIcon(512));
console.log("Icônes PWA générées (192, 512)");
