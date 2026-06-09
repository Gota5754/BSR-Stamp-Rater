import { CHAR_PASSIVES, WEAPON_LEVELS, PASSIVE_LEVELS } from "../data/characters.js";

export function getRank(score) {
  if (score >= 90) return { rank: "SSS", color: "#ff2d55", glow: "0 0 40px rgba(255,45,85,0.4)" };
  if (score >= 80) return { rank: "SS", color: "#ff9500", glow: "0 0 30px rgba(255,149,0,0.35)" };
  if (score >= 70) return { rank: "S", color: "#ffd700", glow: "0 0 25px rgba(255,215,0,0.3)" };
  if (score >= 60) return { rank: "A", color: "#34c759", glow: "0 0 20px rgba(52,199,89,0.25)" };
  if (score >= 50) return { rank: "B", color: "#5ac8fa", glow: "0 0 15px rgba(90,200,250,0.2)" };
  if (score >= 40) return { rank: "C", color: "#8e8e93", glow: "none" };
  if (score >= 25) return { rank: "D", color: "#636366", glow: "none" };
  return { rank: "F", color: "#48484a", glow: "none" };
}

export function getEffectiveWeights(char, ov, weaponLv = "", passiveLv = "") {
  const w = { ...char.weights };
  const activeOverrides = {};
  if (char.overrides && ov) {
    char.overrides.forEach(o => {
      if (ov[o.id]) {
        activeOverrides[o.id] = true;
        Object.entries(o.changes).forEach(([s, v]) => { w[s] = v; });
      }
    });
  }
  if (weaponLv && WEAPON_LEVELS[char.id]) {
    const lv = WEAPON_LEVELS[char.id].levels.find(l => l.id === weaponLv);
    if (lv) {
      const hasB6 = lv.b6_changes && Object.keys(activeOverrides).some(k => k.includes("b6"));
      const changes = hasB6 ? lv.b6_changes : lv.changes;
      Object.entries(changes).forEach(([s, v]) => { w[s] = v; });
    }
  }
  if (passiveLv && PASSIVE_LEVELS[char.id]) {
    const lv = PASSIVE_LEVELS[char.id].levels.find(l => l.id === passiveLv);
    if (lv) Object.entries(lv.changes).forEach(([s, v]) => { w[s] = v; });
  }
  return w;
}

export function getPassiveScore(passive, charId) {
  if (!passive || !charId || !CHAR_PASSIVES[charId]) return 0;
  const rec = CHAR_PASSIVES[charId].recommended;
  if (!rec.length) return 0;
  const idx = rec.indexOf(passive);
  if (idx === 0) return 1.0;
  if (idx === 1) return 0.7;
  if (idx === 2) return 0.5;
  if (idx === 3) return 0.3;
  return 0.1;
}

export function calcScore(subs, w, procs = [], passive = "", charId = "") {
  const p = subs.filter(s => s !== "");
  if (!p.length) return 0;
  const baseScore = p.reduce((sum, s) => sum + (w[s] || 0), 0);
  const procScore = procs.filter(s => s !== "").reduce((sum, s) => sum + (w[s] || 0), 0);
  const passiveScore = getPassiveScore(passive, charId);
  const scored = baseScore + procScore + passiveScore;
  const top4 = Object.values(w).sort((a, b) => b - a).slice(0, 4);
  const perfBase = top4.reduce((s, v) => s + v, 0);
  const perfProcs = 3 * (top4[0] || 0);
  const perfPassive = (CHAR_PASSIVES[charId] && CHAR_PASSIVES[charId].recommended.length) ? 1.0 : 0;
  const perf = perfBase + perfProcs + perfPassive;
  return perf === 0 ? 0 : Math.round((scored / perf) * 100);
}

export function getEffectiveRecs(char, slot, ov) {
  let recs = char.recommended_main_stats[slot] || [];
  if (char.overrides && ov) {
    char.overrides.forEach(o => {
      if (ov[o.id] && o.rec_override && o.rec_override[slot]) recs = o.rec_override[slot];
    });
  }
  return recs;
}

export function checkMainStat(char, slot, ms, ov) {
  if (!ms || !char) return null;
  return getEffectiveRecs(char, slot, ov).includes(ms) ? "bis" : "off";
}

export function getTag(w) {
  if (w >= 0.9) return { l: "BiS", cls: "tag-bis" };
  if (w >= 0.7) return { l: "Great", cls: "tag-great" };
  if (w >= 0.5) return { l: "Good", cls: "tag-good" };
  if (w > 0) return { l: "Low", cls: "tag-low" };
  return { l: "Dead", cls: "tag-dead" };
}

export const EMPTY_STAMP = { mainStat: "", substats: ["", "", "", ""], procs: ["", "", ""], passive: "" };
