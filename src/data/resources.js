// ─── RESOURCE DATA (source : bsr-calculator.vercel.app/data.js) ──────────
// Crédits : @enveelive, @Ganxo012, @Joker

export const EXP_DATA = {
  1: { 20: 35792, 30: 99276, 40: 216908, 50: 421035, 60: 752613, 70: 1256584, 80: 1973318, 90: 2930463, 100: 4101463 },
};

export const CHAR_LEVEL_KANS = { "1-20": 7500, "20-30": 12900, "30-40": 23800, "40-50": 41200, "50-60": 66700, "60-70": 101300, "70-80": 145100, "80-90": 193300, "90-100": 239000 };
export const CHAR_ASCENSION_KANS = { "1-20": 0, "20-30": 2500, "30-40": 5000, "40-50": 10000, "50-60": 15000, "60-70": 20000, "70-80": 30000, "80-90": 40000, "90-100": 50000 };
export const CHAR_ASCENSION_ESSENCES = {
  "20-30": { green: 0, blue: 6, purple: 0 },
  "30-40": { green: 0, blue: 12, purple: 0 },
  "40-50": { green: 6, blue: 0, purple: 0 },
  "50-60": { green: 10, blue: 0, purple: 0 },
  "60-70": { green: 14, blue: 0, purple: 0 },
  "70-80": { green: 0, blue: 0, purple: 6 },
  "80-90": { green: 0, blue: 0, purple: 7 },
  "90-100": { green: 0, blue: 0, purple: 8 },
};

export const BOOK_EXP = { green: 500, blue: 3000, purple: 10000, yellow: 20000 };

export const WEAPON_TAMA_XP_COSTS = { "1-20": 19120, "20-30": 33876, "30-40": 62756, "40-50": 108888, "50-60": 176864, "60-70": 268808, "70-80": 382280, "80-90": 510496, "90-100": 636384 };
export const WEAPON_TAMA_EXP = { green: 100, blue: 600, purple: 2000, yellow: 4000 };
export const WEAPON_GOLD = { "20-30": 1500, "30-40": 3000, "40-50": 6000, "50-60": 9000, "60-70": 12000, "70-80": 18000, "80-90": 24000, "90-100": 30000 };
export const WEAPON_ASCENSION_KANS = { "20-30": 8500, "30-40": 15875, "40-50": 28125, "50-60": 45875, "60-70": 67875, "70-80": 96000, "80-90": 129750, "90-100": 159625 };
export const WEAPON_HAMMER_COSTS = {
  "20-30": { green: 0, blue: 6, purple: 0 },
  "30-40": { green: 0, blue: 12, purple: 0 },
  "40-50": { green: 6, blue: 0, purple: 0 },
  "50-60": { green: 10, blue: 0, purple: 0 },
  "60-70": { green: 14, blue: 0, purple: 0 },
  "70-80": { green: 0, blue: 0, purple: 6 },
  "80-90": { green: 0, blue: 0, purple: 7 },
  "90-100": { green: 0, blue: 0, purple: 8 },
};

// Arts par niveau de compétence (1→9)
export const SKILL_ART_COSTS = {
  2: { green: 2, blue: 0, purple: 0, kans: 2500 },
  3: { green: 4, blue: 0, purple: 0, kans: 5000 },
  4: { green: 8, blue: 0, purple: 0, kans: 10000 },
  5: { green: 0, blue: 4, purple: 0, kans: 15000 },
  6: { green: 0, blue: 7, purple: 0, kans: 20000 },
  7: { green: 0, blue: 0, purple: 6, kans: 30000 },
  8: { green: 0, blue: 0, purple: 7, kans: 40000 },
  9: { green: 0, blue: 0, purple: 10, kans: 50000 },
};

export const PASSIVE_COSTS = {
  passive1: { 1: { omamori: 2, kans: 6000 }, 2: { omamori: 8, kans: 19000 }, 3: { omamori: 14, kans: 70000 } },
  passive2: { 1: { omamori: 4, kans: 10500 }, 2: { omamori: 10, kans: 27000 }, 3: { omamori: 16, kans: 100000 } },
  passive3: { 1: { omamori: 6, kans: 16500 }, 2: { omamori: 12, kans: 43500 }, 3: { omamori: 18, kans: 150000 } },
};

export const LEVEL_BRACKETS = ["1-20", "20-30", "30-40", "40-50", "50-60", "60-70", "70-80", "80-90", "90-100"];
export const LEVEL_STEPS = [1, 20, 30, 40, 50, 60, 70, 80, 90, 100];
export const PULL_COST = 300;
export const HARD_PITY = 90;

// ─── CALCULS ─────────────────────────────────────────────────────────────

function bracketsInRange(from, to, brackets) {
  return brackets.filter(b => {
    const [s, e] = b.split("-").map(Number);
    return s >= from && e <= to;
  });
}

export function calcCharResources(from, to) {
  const brackets = bracketsInRange(from, to, LEVEL_BRACKETS);
  let kans = 0, ascKans = 0, essGreen = 0, essBlue = 0, essPurple = 0;
  brackets.forEach(b => {
    kans += CHAR_LEVEL_KANS[b] || 0;
    ascKans += CHAR_ASCENSION_KANS[b] || 0;
    const e = CHAR_ASCENSION_ESSENCES[b];
    if (e) { essGreen += e.green; essBlue += e.blue; essPurple += e.purple; }
  });
  const expNeeded = (EXP_DATA[1]?.[to] || 0) - (from === 1 ? 0 : EXP_DATA[1]?.[from] || 0);
  return { kans: kans + ascKans, essGreen, essBlue, essPurple, expNeeded };
}

export function calcWeaponResources(from, to) {
  const brackets = bracketsInRange(from, to, LEVEL_BRACKETS.slice(1)); // les armes commencent à 20
  let kans = 0, gold = 0, hamGreen = 0, hamBlue = 0, hamPurple = 0, tamaXp = 0;
  brackets.forEach(b => {
    kans += WEAPON_ASCENSION_KANS[b] || 0;
    gold += WEAPON_GOLD[b] || 0;
    tamaXp += WEAPON_TAMA_XP_COSTS[b] || 0;
    const h = WEAPON_HAMMER_COSTS[b];
    if (h) { hamGreen += h.green; hamBlue += h.blue; hamPurple += h.purple; }
  });
  return { kans, gold, tamaXp, hamGreen, hamBlue, hamPurple };
}

export function calcSkillResources(fromLv, toLv, numSkills) {
  let green = 0, blue = 0, purple = 0, kans = 0;
  for (let lv = fromLv + 1; lv <= toLv; lv++) {
    const c = SKILL_ART_COSTS[lv];
    if (c) { green += c.green; blue += c.blue; purple += c.purple; kans += c.kans; }
  }
  return { green: green * numSkills, blue: blue * numSkills, purple: purple * numSkills, kans: kans * numSkills };
}

export function calcPassiveResources(p1, p2, p3) {
  let omamori = 0, kans = 0;
  [[PASSIVE_COSTS.passive1, p1], [PASSIVE_COSTS.passive2, p2], [PASSIVE_COSTS.passive3, p3]].forEach(([costs, target]) => {
    for (let lv = 1; lv <= target; lv++) {
      omamori += costs[lv].omamori;
      kans += costs[lv].kans;
    }
  });
  return { omamori, kans };
}
