// Génère public/og.png (1200×630) — image Open Graph pour les partages
// Encodeur PNG minimal (RGBA + zlib) + petite police bitmap 5×7, sans dépendance.
import zlib from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";

const W = 1200, H = 630;
const buf = Buffer.alloc(W * H * 4);

const px = (x, y, r, g, b, a = 255) => {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = (y * W + x) * 4;
  const af = a / 255, ia = 1 - af;
  buf[i] = buf[i] * ia + r * af;
  buf[i + 1] = buf[i + 1] * ia + g * af;
  buf[i + 2] = buf[i + 2] * ia + b * af;
  buf[i + 3] = 255;
};

// Fond : dégradé sombre + glow orange en haut à droite
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const t = y / H;
    let r = 8 + t * 6, g = 8 + t * 6, b = 14 + t * 10;
    const dx = (x - W * 0.78) / (W * 0.5), dy = (y - H * 0.22) / (H * 0.5);
    const glow = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy));
    r += glow * glow * 90; g += glow * glow * 45; b += glow * glow * 4;
    const i = (y * W + x) * 4;
    buf[i] = Math.min(255, r); buf[i + 1] = Math.min(255, g); buf[i + 2] = Math.min(255, b); buf[i + 3] = 255;
  }
}

// Police 5×7
const F = {
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  " ": ["00000", "00000", "00000", "00000", "00000", "00000", "00000"],
};

function text(str, x0, y0, scale, col, gap = 1) {
  let cx = x0;
  for (const ch of str) {
    const g = F[ch] || F[" "];
    for (let ry = 0; ry < 7; ry++) for (let rx = 0; rx < 5; rx++) {
      if (g[ry][rx] === "1") {
        for (let sy = 0; sy < scale; sy++) for (let sx = 0; sx < scale; sx++) {
          px(cx + rx * scale + sx, y0 + ry * scale + sy, col[0], col[1], col[2]);
        }
      }
    }
    cx += (5 + gap) * scale;
  }
  return cx;
}

const measure = (str, scale, gap = 1) => str.length * (5 + gap) * scale - gap * scale;

// Barre d'accent orange
for (let y = 250; y < 258; y++) for (let x = 90; x < 330; x++) px(x, y, 255, 149, 0);

// Titre "BSR" (gros, orange) + "SET STAMP RATER" (blanc cassé)
text("BSR", 90, 285, 26, [255, 149, 0]);
text("SET STAMP RATER", 92, 470, 9, [234, 234, 239]);
// Sous-titre jeu
const sub = "BLEACH SOUL RESONANCE";
text(sub, 92, 560, 4, [120, 120, 135]);

// ── Encodage PNG ──
function crc32(b) {
  let c = ~0;
  for (let i = 0; i < b.length; i++) {
    c ^= b[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xEDB88320 & -(c & 1));
  }
  return ~c >>> 0;
}
function chunk(type, data) {
  const t = Buffer.from(type, "ascii");
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([t, data])));
  return Buffer.concat([len, t, data, crc]);
}
const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; ihdr[9] = 6; // 8-bit RGBA
const raw = Buffer.alloc(H * (W * 4 + 1));
for (let y = 0; y < H; y++) {
  raw[y * (W * 4 + 1)] = 0;
  buf.copy(raw, y * (W * 4 + 1) + 1, y * W * 4, (y + 1) * W * 4);
}
const idat = zlib.deflateSync(raw, { level: 9 });
const png = Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", idat), chunk("IEND", Buffer.alloc(0))]);

mkdirSync("public", { recursive: true });
writeFileSync("public/og.png", png);
console.log("public/og.png généré :", png.length, "octets");
