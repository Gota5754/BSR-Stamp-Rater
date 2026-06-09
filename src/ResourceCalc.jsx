import { useState, useMemo } from "react";

// ─── SOURCE DATA (from bsr-calculator.vercel.app/data.js) ────────────────────

const EXP_DATA = {
  1:  { 20: 35792,  30: 99276,  40: 216908, 50: 421035,  60: 752613,  70: 1256584, 80: 1973318, 90: 2930463, 100: 4101463 },
  20: { 30: 63484,  40: 181116, 50: 382761, 60: 697868,  70: 1160996, 80: 1812596, 90: 2698156, 100: 3869156 },
  30: { 40: 117632, 50: 319277, 60: 634384, 70: 1097512, 80: 1749112, 90: 2634672, 100: 3805672 },
  40: { 50: 204127, 60: 516752, 70: 979880, 80: 1631480, 90: 2517040, 100: 3688040 },
  50: { 60: 331578, 70: 778235, 80: 1429835, 90: 2315395, 100: 3486395 },
  60: { 70: 503971, 80: 1114728, 90: 2000288, 100: 3171288 },
  70: { 80: 716734, 90: 1537160, 100: 2708160 },
  80: { 90: 957145, 100: 2056560 },
  90: { 100: 1171000 },
};

const CHAR_LEVEL_KANS = { "1-20": 7500, "20-30": 12900, "30-40": 23800, "40-50": 41200, "50-60": 66700, "60-70": 101300, "70-80": 145100, "80-90": 193300, "90-100": 239000 };
const CHAR_ASCENSION_KANS = { "1-20": 0, "20-30": 2500, "30-40": 5000, "40-50": 10000, "50-60": 15000, "60-70": 20000, "70-80": 30000, "80-90": 40000, "90-100": 50000 };
const CHAR_ASCENSION_ESSENCES = {
  "20-30": { green: 0, blue: 6,  purple: 0 },
  "30-40": { green: 0, blue: 12, purple: 0 },
  "40-50": { green: 6, blue: 0,  purple: 0 },
  "50-60": { green: 10, blue: 0, purple: 0 },
  "60-70": { green: 14, blue: 0, purple: 0 },
  "70-80": { green: 0, blue: 0,  purple: 6 },
  "80-90": { green: 0, blue: 0,  purple: 7 },
  "90-100": { green: 0, blue: 0, purple: 8 },
};

const BOOK_EXP  = { green: 500, blue: 3000, purple: 10000, yellow: 20000 };

const WEAPON_TAMA_XP_COSTS = { "1-20": 19120, "20-30": 33876, "30-40": 62756, "40-50": 108888, "50-60": 176864, "60-70": 268808, "70-80": 382280, "80-90": 510496, "90-100": 636384 };
const WEAPON_TAMA_EXP = { green: 100, blue: 600, purple: 2000, yellow: 4000 };
const WEAPON_GOLD = { "20-30": 1500, "30-40": 3000, "40-50": 6000, "50-60": 9000, "60-70": 12000, "70-80": 18000, "80-90": 24000, "90-100": 30000 };
const WEAPON_ASCENSION_KANS = { "20-30": 8500, "30-40": 15875, "40-50": 28125, "50-60": 45875, "60-70": 67875, "70-80": 96000, "80-90": 129750, "90-100": 159625 };
const WEAPON_HAMMER_COSTS = {
  "20-30": { green: 0, blue: 6,  purple: 0 },
  "30-40": { green: 0, blue: 12, purple: 0 },
  "40-50": { green: 6, blue: 0,  purple: 0 },
  "50-60": { green: 10, blue: 0, purple: 0 },
  "60-70": { green: 14, blue: 0, purple: 0 },
  "70-80": { green: 0, blue: 0,  purple: 6 },
  "80-90": { green: 0, blue: 0,  purple: 7 },
  "90-100": { green: 0, blue: 0, purple: 8 },
};

// Arts per skill level (1→9)
const SKILL_ART_COSTS = {
  2: { green: 2,  blue: 0,  purple: 0,  kans: 2500  },
  3: { green: 4,  blue: 0,  purple: 0,  kans: 5000  },
  4: { green: 8,  blue: 0,  purple: 0,  kans: 10000 },
  5: { green: 0,  blue: 4,  purple: 0,  kans: 15000 },
  6: { green: 0,  blue: 7,  purple: 0,  kans: 20000 },
  7: { green: 0,  blue: 0,  purple: 6,  kans: 30000 },
  8: { green: 0,  blue: 0,  purple: 7,  kans: 40000 },
  9: { green: 0,  blue: 0,  purple: 10, kans: 50000 },
};
// Per skill 1→9: 14 green, 11 blue, 23 purple, 172500 Kans

const PASSIVE_COSTS = {
  passive1: { 1: { omamori: 2,  kans: 6000  }, 2: { omamori: 8,  kans: 19000  }, 3: { omamori: 14, kans: 70000  } },
  passive2: { 1: { omamori: 4,  kans: 10500 }, 2: { omamori: 10, kans: 27000  }, 3: { omamori: 16, kans: 100000 } },
  passive3: { 1: { omamori: 6,  kans: 16500 }, 2: { omamori: 12, kans: 43500  }, 3: { omamori: 18, kans: 150000 } },
};

const LEVEL_BRACKETS = ["1-20","20-30","30-40","40-50","50-60","60-70","70-80","80-90","90-100"];
const LEVEL_STEPS = [1, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const PULL_COST = 300;
const HARD_PITY = 90;

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function getBracketsInRange(from, to, allBrackets) {
  return allBrackets.filter(b => {
    const [s, e] = b.split("-").map(Number);
    return s >= from && e <= to;
  });
}

function calcCharResources(from, to) {
  const brackets = getBracketsInRange(from, to, LEVEL_BRACKETS);
  let kans = 0, ascKans = 0;
  let essGreen = 0, essBlue = 0, essPurple = 0;

  brackets.forEach(b => {
    kans    += CHAR_LEVEL_KANS[b]     || 0;
    ascKans += CHAR_ASCENSION_KANS[b] || 0;
    const e  = CHAR_ASCENSION_ESSENCES[b];
    if (e) { essGreen += e.green; essBlue += e.blue; essPurple += e.purple; }
  });

  const expNeeded = from === 1 ? (EXP_DATA[1]?.[to] || 0)
    : (() => {
        const total1ToFrom = EXP_DATA[1]?.[from] || 0;
        const total1ToTo   = EXP_DATA[1]?.[to]   || 0;
        return total1ToTo - total1ToFrom;
      })();

  return { kans: kans + ascKans, essGreen, essBlue, essPurple, expNeeded };
}

function calcWeaponResources(from, to) {
  const brackets = getBracketsInRange(from, to, LEVEL_BRACKETS.slice(1)); // weapons start at 20
  let kans = 0, gold = 0;
  let hamGreen = 0, hamBlue = 0, hamPurple = 0;
  let tamaXp = 0;

  brackets.forEach(b => {
    kans   += WEAPON_ASCENSION_KANS[b] || 0;
    gold   += WEAPON_GOLD[b]           || 0;
    tamaXp += WEAPON_TAMA_XP_COSTS[b]  || 0;
    const h = WEAPON_HAMMER_COSTS[b];
    if (h) { hamGreen += h.green; hamBlue += h.blue; hamPurple += h.purple; }
  });

  return { kans, gold, tamaXp, hamGreen, hamBlue, hamPurple };
}

function calcSkillResources(fromLv, toLv, numSkills) {
  let green = 0, blue = 0, purple = 0, kans = 0;
  for (let lv = fromLv + 1; lv <= toLv; lv++) {
    const c = SKILL_ART_COSTS[lv];
    if (c) { green += c.green; blue += c.blue; purple += c.purple; kans += c.kans; }
  }
  return { green: green * numSkills, blue: blue * numSkills, purple: purple * numSkills, kans: kans * numSkills };
}

function calcPassiveResources(p1, p2, p3) {
  let omamori = 0, kans = 0;
  [[PASSIVE_COSTS.passive1, p1], [PASSIVE_COSTS.passive2, p2], [PASSIVE_COSTS.passive3, p3]].forEach(([costs, target]) => {
    for (let lv = 1; lv <= target; lv++) {
      omamori += costs[lv].omamori;
      kans    += costs[lv].kans;
    }
  });
  return { omamori, kans };
}

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function StatRow({ label, value, have, onHave, color, t, fmt = v => v.toLocaleString() }) {
  const pct  = have !== undefined ? Math.min(100, (have / value) * 100) : 0;
  const done = have !== undefined && have >= value;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
      <span style={{ fontFamily: "'Outfit'", fontSize: 12, color: t.text2, minWidth: 170, fontWeight: 500 }}>{label}</span>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
          <span style={{ fontFamily: "'Space Mono'", fontSize: 10, color: done ? "#34c759" : t.text3 }}>
            {have !== undefined ? `${have.toLocaleString()} / ` : ""}{fmt(value)}
          </span>
        </div>
        {have !== undefined && (
          <div style={{ height: 3, background: t.div, borderRadius: 2, overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: done ? "#34c759" : color, borderRadius: 2, transition: "width 0.4s" }} />
          </div>
        )}
      </div>
      {have !== undefined && (
        <input
          type="number" value={have === 0 ? "" : have}
          onChange={e => onHave(Math.max(0, Number(e.target.value) || 0))}
          placeholder="0"
          style={{ width: 72, background: t.input, border: `1px solid ${t.cardBorder}`, borderRadius: 7, padding: "4px 6px", color: t.text, fontSize: 11, outline: "none", fontFamily: "'Outfit'", textAlign: "right" }}
        />
      )}
    </div>
  );
}

function SectionCard({ title, children, t }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 14, overflow: "hidden", marginBottom: 12, backdropFilter: "blur(24px)" }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 18px", background: "transparent", border: "none", cursor: "pointer",
        fontFamily: "'Outfit'", fontSize: 13, fontWeight: 800, color: t.text2,
        textTransform: "uppercase", letterSpacing: 1.5,
      }}>
        {title}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", color: t.text3 }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <div style={{ padding: "0 18px 16px" }}>{children}</div>}
    </div>
  );
}

function LevelSelect({ label, value, onChange, options, t }) {
  return (
    <div>
      <div style={{ fontFamily: "'Outfit'", fontSize: 9, color: t.text3, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>{label}</div>
      <div style={{ position: "relative" }}>
        <select value={value} onChange={e => onChange(Number(e.target.value))} style={{ width: "100%", background: t.input, border: `1px solid ${t.cardBorder}`, borderRadius: 8, padding: "8px 28px 8px 10px", color: t.text, fontSize: 13, fontFamily: "'Outfit'", outline: "none", appearance: "none", cursor: "pointer" }}>
          {options.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        <div style={{ position: "absolute", right: 9, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: t.text3 }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
        </div>
      </div>
    </div>
  );
}

// ─── PULL CALCULATOR ─────────────────────────────────────────────────────────
function PullCalc({ t, lang }) {
  const [crystals, setCrystals] = useState("");
  const [pity,     setPity]     = useState("");
  const [days,     setDays]     = useState("");
  const [daily,    setDaily]    = useState("30");

  const total    = (Number(crystals) || 0) + (Number(days) || 0) * (Number(daily) || 0);
  const pulls    = Math.floor(total / PULL_COST);
  const curPity  = Math.min(Number(pity) || 0, HARD_PITY - 1);
  const needed   = Math.max(1, HARD_PITY - curPity);
  const ok       = pulls >= needed;
  const short    = Math.max(0, needed - pulls);
  const L = { fr: { cur: "Cristaux actuels", pity: "Pity actuelle", days: "Jours avant banner", daily: "Cristaux / jour", estPulls: "Pulls estimés", forGuarantee: "Pour garantie", enough: "Suffisant !", short: "Manquants", crystalShort: "cristaux manquants" }, en: { cur: "Current crystals", pity: "Current pity", days: "Days until banner", daily: "Crystals / day", estPulls: "Est. pulls", forGuarantee: "For guarantee", enough: "Enough!", short: "Shortfall", crystalShort: "crystals needed" } }[lang];

  const inp = { width: "100%", background: t.input, border: `1px solid ${t.cardBorder}`, borderRadius: 9, padding: "9px 11px", color: t.text, fontSize: 13, outline: "none", fontFamily: "'Outfit'", boxSizing: "border-box" };
  const lbl = { fontFamily: "'Outfit'", fontSize: 9, color: t.text3, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4, display: "block" };

  return (
    <SectionCard title={`💎 ${lang === "fr" ? "Calculateur de Pulls" : "Pull Calculator"}`} t={t}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        <div><span style={lbl}>{L.cur}</span><input type="number" value={crystals} onChange={e => setCrystals(e.target.value)} placeholder="0" style={inp} min="0" /></div>
        <div><span style={lbl}>{L.pity}</span><input type="number" value={pity} onChange={e => setPity(e.target.value)} placeholder="0" style={inp} min="0" max="89" /></div>
        <div><span style={lbl}>{L.days}</span><input type="number" value={days} onChange={e => setDays(e.target.value)} placeholder="0" style={inp} min="0" /></div>
        <div><span style={lbl}>{L.daily}</span><input type="number" value={daily} onChange={e => setDaily(e.target.value)} placeholder="30" style={inp} min="0" /></div>
      </div>
      {crystals !== "" && (
        <div style={{ background: ok ? "rgba(52,199,89,0.08)" : "rgba(255,45,85,0.08)", border: `1px solid ${ok ? "rgba(52,199,89,0.3)" : "rgba(255,45,85,0.3)"}`, borderRadius: 10, padding: 14, animation: "bsr-fadein 0.3s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-around", gap: 8 }}>
            {[{ val: pulls, lab: L.estPulls, col: ok ? "#34c759" : "#ff2d55" }, { val: needed, lab: L.forGuarantee, col: t.text }, { val: ok ? "✓" : `−${short}`, lab: ok ? L.enough : L.short, col: ok ? "#34c759" : "#ff9500" }].map(({ val, lab, col }) => (
              <div key={lab} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Space Mono'", fontSize: 22, fontWeight: 700, color: col }}>{val}</div>
                <div style={{ fontFamily: "'Outfit'", fontSize: 9, color: t.text3, textTransform: "uppercase", letterSpacing: 1 }}>{lab}</div>
              </div>
            ))}
          </div>
          {!ok && <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: "#ff9500", marginTop: 10, textAlign: "center" }}>
            {lang === "fr" ? `Il manque ${(short * PULL_COST).toLocaleString()} ${L.crystalShort}` : `${(short * PULL_COST).toLocaleString()} ${L.crystalShort}`}
          </div>}
        </div>
      )}
    </SectionCard>
  );
}

// ─── CHARACTER CALCULATOR ────────────────────────────────────────────────────
function CharCalc({ t, lang }) {
  const [fromLv, setFromLv] = useState(1);
  const [toLv,   setToLv]   = useState(100);
  const [haveEssGreen,   setHaveEssGreen]   = useState(0);
  const [haveEssBlue,    setHaveEssBlue]    = useState(0);
  const [haveEssPurple,  setHaveEssPurple]  = useState(0);
  const [haveBooksGreen,  setHaveBooksGreen]  = useState(0);
  const [haveBooksBlue,   setHaveBooksBlue]   = useState(0);
  const [haveBooksPurple, setHaveBooksPurple] = useState(0);
  const [haveBooksYellow, setHaveBooksYellow] = useState(0);

  const res = useMemo(() => toLv > fromLv ? calcCharResources(fromLv, toLv) : null, [fromLv, toLv]);

  const booksExpOwned = haveBooksGreen * 500 + haveBooksBlue * 3000 + haveBooksPurple * 10000 + haveBooksYellow * 20000;
  const booksOk = res ? booksExpOwned >= res.expNeeded : false;

  const fromOpts = LEVEL_STEPS.slice(0, -1);
  const toOpts   = LEVEL_STEPS.filter(v => v > fromLv);

  const cc = "#5ac8fa";
  const L = lang === "fr" ? {
    from: "Niveau actuel", to: "Niveau cible", expNeeded: "EXP nécessaire",
    kans: "Kans total", essGreen: "Essences Vertes", essBlue: "Essences Bleues", essPurple: "Essences Violettes",
    booksGreen: "Livres Verts (500 EXP)", booksBlue: "Livres Bleus (3 000 EXP)", booksPurple: "Livres Violets (10 000 EXP)", booksYellow: "Livres Jaunes (20 000 EXP)",
    expOwned: "EXP possédée (livres)", booksEnough: "✓ Assez de livres !",
  } : {
    from: "Current level", to: "Target level", expNeeded: "EXP needed",
    kans: "Total Kans", essGreen: "Green Essences", essBlue: "Blue Essences", essPurple: "Purple Essences",
    booksGreen: "Green Books (500 EXP)", booksBlue: "Blue Books (3,000 EXP)", booksPurple: "Purple Books (10,000 EXP)", booksYellow: "Yellow Books (20,000 EXP)",
    expOwned: "Owned EXP (books)", booksEnough: "✓ Enough books!",
  };

  return (
    <SectionCard title={`🧑 ${lang === "fr" ? "Personnage" : "Character"}`} t={t}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        <LevelSelect label={L.from} value={fromLv} onChange={v => { setFromLv(v); if (toLv <= v) setToLv(LEVEL_STEPS[LEVEL_STEPS.indexOf(v) + 1]); }} options={fromOpts} t={t} />
        <LevelSelect label={L.to}   value={toLv}   onChange={setToLv} options={toOpts} t={t} />
      </div>
      {res && (<>
        <StatRow label={L.expNeeded} value={res.expNeeded} t={t} color={cc} />
        <StatRow label={L.kans}      value={res.kans}      t={t} color={cc} />
        <div style={{ height: 1, background: t.div, margin: "10px 0" }} />
        <div style={{ fontFamily: "'Outfit'", fontSize: 9, color: t.text3, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6 }}>
          {lang === "fr" ? "Essences (Ascension)" : "Essences (Ascension)"}
        </div>
        {res.essGreen  > 0 && <StatRow label={L.essGreen}  value={res.essGreen}  have={haveEssGreen}  onHave={setHaveEssGreen}  t={t} color="#34c759" />}
        {res.essBlue   > 0 && <StatRow label={L.essBlue}   value={res.essBlue}   have={haveEssBlue}   onHave={setHaveEssBlue}   t={t} color={cc} />}
        {res.essPurple > 0 && <StatRow label={L.essPurple} value={res.essPurple} have={haveEssPurple} onHave={setHaveEssPurple} t={t} color="#bf5af2" />}
        <div style={{ height: 1, background: t.div, margin: "10px 0" }} />
        <div style={{ fontFamily: "'Outfit'", fontSize: 9, color: t.text3, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6 }}>
          {lang === "fr" ? "Livres EXP" : "EXP Books"}
        </div>
        <StatRow label={L.booksGreen}  value={0} have={haveBooksGreen}  onHave={setHaveBooksGreen}  t={t} color="#34c759" />
        <StatRow label={L.booksBlue}   value={0} have={haveBooksBlue}   onHave={setHaveBooksBlue}   t={t} color={cc} />
        <StatRow label={L.booksPurple} value={0} have={haveBooksPurple} onHave={setHaveBooksPurple} t={t} color="#bf5af2" />
        <StatRow label={L.booksYellow} value={0} have={haveBooksYellow} onHave={setHaveBooksYellow} t={t} color="#ffd700" />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, background: booksOk ? "rgba(52,199,89,0.08)" : "rgba(255,149,0,0.08)", border: `1px solid ${booksOk ? "rgba(52,199,89,0.25)" : "rgba(255,149,0,0.2)"}`, borderRadius: 8, padding: "8px 12px" }}>
          <span style={{ fontFamily: "'Outfit'", fontSize: 11, color: t.text3 }}>{L.expOwned}</span>
          <span style={{ fontFamily: "'Space Mono'", fontSize: 11, color: booksOk ? "#34c759" : "#ff9500", fontWeight: 700 }}>
            {booksOk ? L.booksEnough : `${booksExpOwned.toLocaleString()} / ${res.expNeeded.toLocaleString()}`}
          </span>
        </div>
      </>)}
    </SectionCard>
  );
}

// ─── WEAPON CALCULATOR ───────────────────────────────────────────────────────
function WeaponCalc({ t, lang }) {
  const [fromLv, setFromLv] = useState(1);
  const [toLv,   setToLv]   = useState(100);
  const [haveTamaGreen,  setHaveTamaGreen]  = useState(0);
  const [haveTamaBlue,   setHaveTamaBlue]   = useState(0);
  const [haveTamaPurple, setHaveTamaPurple] = useState(0);
  const [haveTamaYellow, setHaveTamaYellow] = useState(0);
  const [haveHamGreen,  setHaveHamGreen]  = useState(0);
  const [haveHamBlue,   setHaveHamBlue]   = useState(0);
  const [haveHamPurple, setHaveHamPurple] = useState(0);

  const effectiveFrom = fromLv === 1 ? 20 : fromLv;
  const res = useMemo(() => toLv > effectiveFrom ? calcWeaponResources(effectiveFrom, toLv) : null, [effectiveFrom, toLv]);

  const tamaExpOwned = haveTamaGreen * 100 + haveTamaBlue * 600 + haveTamaPurple * 2000 + haveTamaYellow * 4000;
  const tamaOk = res ? tamaExpOwned >= res.tamaXp : false;

  const fromOpts = LEVEL_STEPS.slice(0, -1);
  const toOpts   = LEVEL_STEPS.filter(v => v > effectiveFrom);

  const cc = "#ff9500";
  const L = lang === "fr" ? {
    from: "Niveau actuel", to: "Niveau cible",
    tamaXp: "EXP Tamahagane nécessaire", kans: "Kans total", gold: "Or total",
    hamGreen: "Marteaux Verts", hamBlue: "Marteaux Bleus", hamPurple: "Marteaux Violets",
    tamaGreen: "Tamahagane Vert (100 EXP)", tamaBlue: "Tamahagane Bleu (600 EXP)", tamaPurple: "Tamahagane Violet (2 000 EXP)", tamaYellow: "Tamahagane Jaune (4 000 EXP)",
    expOwned: "EXP possédée (tamahagane)", tamaEnough: "✓ Assez de Tamahagane !",
  } : {
    from: "Current level", to: "Target level",
    tamaXp: "Tamahagane EXP needed", kans: "Total Kans", gold: "Total Gold",
    hamGreen: "Green Hammers", hamBlue: "Blue Hammers", hamPurple: "Purple Hammers",
    tamaGreen: "Green Tamahagane (100 EXP)", tamaBlue: "Blue Tamahagane (600 EXP)", tamaPurple: "Purple Tamahagane (2,000 EXP)", tamaYellow: "Yellow Tamahagane (4,000 EXP)",
    expOwned: "Owned EXP (tamahagane)", tamaEnough: "✓ Enough Tamahagane!",
  };

  return (
    <SectionCard title={`⚔️ ${lang === "fr" ? "Arme" : "Weapon"}`} t={t}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        <LevelSelect label={L.from} value={fromLv} onChange={v => { setFromLv(v); if (toLv <= Math.max(v, 20)) setToLv(30); }} options={fromOpts} t={t} />
        <LevelSelect label={L.to}   value={toLv}   onChange={setToLv} options={toOpts} t={t} />
      </div>
      {res && (<>
        <StatRow label={L.tamaXp} value={res.tamaXp} t={t} color={cc} />
        <StatRow label={L.kans}   value={res.kans}   t={t} color={cc} />
        <StatRow label={L.gold}   value={res.gold}   t={t} color="#ffd700" />
        <div style={{ height: 1, background: t.div, margin: "10px 0" }} />
        <div style={{ fontFamily: "'Outfit'", fontSize: 9, color: t.text3, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6 }}>
          {lang === "fr" ? "Marteaux (Ascension)" : "Hammers (Ascension)"}
        </div>
        {res.hamGreen  > 0 && <StatRow label={L.hamGreen}  value={res.hamGreen}  have={haveHamGreen}  onHave={setHaveHamGreen}  t={t} color="#34c759" />}
        {res.hamBlue   > 0 && <StatRow label={L.hamBlue}   value={res.hamBlue}   have={haveHamBlue}   onHave={setHaveHamBlue}   t={t} color={cc} />}
        {res.hamPurple > 0 && <StatRow label={L.hamPurple} value={res.hamPurple} have={haveHamPurple} onHave={setHaveHamPurple} t={t} color="#bf5af2" />}
        <div style={{ height: 1, background: t.div, margin: "10px 0" }} />
        <div style={{ fontFamily: "'Outfit'", fontSize: 9, color: t.text3, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6 }}>
          {lang === "fr" ? "Tamahagane EXP" : "Tamahagane EXP"}
        </div>
        <StatRow label={L.tamaGreen}  value={0} have={haveTamaGreen}  onHave={setHaveTamaGreen}  t={t} color="#34c759" />
        <StatRow label={L.tamaBlue}   value={0} have={haveTamaBlue}   onHave={setHaveTamaBlue}   t={t} color={cc} />
        <StatRow label={L.tamaPurple} value={0} have={haveTamaPurple} onHave={setHaveTamaPurple} t={t} color="#bf5af2" />
        <StatRow label={L.tamaYellow} value={0} have={haveTamaYellow} onHave={setHaveTamaYellow} t={t} color="#ffd700" />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, background: tamaOk ? "rgba(52,199,89,0.08)" : "rgba(255,149,0,0.08)", border: `1px solid ${tamaOk ? "rgba(52,199,89,0.25)" : "rgba(255,149,0,0.2)"}`, borderRadius: 8, padding: "8px 12px" }}>
          <span style={{ fontFamily: "'Outfit'", fontSize: 11, color: t.text3 }}>{L.expOwned}</span>
          <span style={{ fontFamily: "'Space Mono'", fontSize: 11, color: tamaOk ? "#34c759" : "#ff9500", fontWeight: 700 }}>
            {tamaOk ? L.tamaEnough : `${tamaExpOwned.toLocaleString()} / ${res.tamaXp.toLocaleString()}`}
          </span>
        </div>
      </>)}
    </SectionCard>
  );
}

// ─── SKILLS CALCULATOR ───────────────────────────────────────────────────────
function SkillCalc({ t, lang }) {
  const [fromLv, setFromLv] = useState(1);
  const [toLv,   setToLv]   = useState(9);
  const [numSkills, setNumSkills] = useState(4);
  const [haveGreen,  setHaveGreen]  = useState(0);
  const [haveBlue,   setHaveBlue]   = useState(0);
  const [havePurple, setHavePurple] = useState(0);
  const [p1, setP1] = useState(3);
  const [p2, setP2] = useState(3);
  const [p3, setP3] = useState(3);
  const [haveOmamori, setHaveOmamori] = useState(0);

  const skills  = useMemo(() => calcSkillResources(fromLv, toLv, numSkills), [fromLv, toLv, numSkills]);
  const passives = useMemo(() => calcPassiveResources(p1, p2, p3), [p1, p2, p3]);
  const totalKans = skills.kans + passives.kans;

  const SKILL_LEVELS = [1,2,3,4,5,6,7,8,9];
  const PASSIVE_LEVELS_OPT = [0,1,2,3];
  const NUM_SKILLS_OPT = [1,2,3,4];

  const cc = "#ff2d55";

  return (
    <SectionCard title={`📚 ${lang === "fr" ? "Compétences & Passifs" : "Skills & Passives"}`} t={t}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
        <LevelSelect label={lang === "fr" ? "Niv. actuel" : "From level"} value={fromLv} onChange={v => { setFromLv(v); if (toLv <= v) setToLv(v + 1); }} options={SKILL_LEVELS.slice(0,-1)} t={t} />
        <LevelSelect label={lang === "fr" ? "Niv. cible" : "Target level"} value={toLv} onChange={setToLv} options={SKILL_LEVELS.filter(v => v > fromLv)} t={t} />
        <LevelSelect label={lang === "fr" ? "Nb compétences" : "Nb skills"} value={numSkills} onChange={setNumSkills} options={NUM_SKILLS_OPT} t={t} />
      </div>
      <StatRow label={lang === "fr" ? "Arts Verts" : "Green Arts"} value={skills.green} have={haveGreen} onHave={setHaveGreen} t={t} color="#34c759" />
      <StatRow label={lang === "fr" ? "Arts Bleus" : "Blue Arts"} value={skills.blue} have={haveBlue} onHave={setHaveBlue} t={t} color={cc} />
      <StatRow label={lang === "fr" ? "Arts Violets" : "Purple Arts"} value={skills.purple} have={havePurple} onHave={setHavePurple} t={t} color="#bf5af2" />

      <div style={{ height: 1, background: t.div, margin: "10px 0" }} />
      <div style={{ fontFamily: "'Outfit'", fontSize: 9, color: t.text3, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>
        {lang === "fr" ? "Passifs (niveau cible)" : "Passives (target level)"}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 10 }}>
        {[["Passif 1 / Passive 1", p1, setP1], ["Passif 2 / Passive 2", p2, setP2], ["Passif 3 / Passive 3", p3, setP3]].map(([lbl, val, set]) => (
          <LevelSelect key={lbl} label={lbl.split(" / ")[lang === "fr" ? 0 : 1]} value={val} onChange={set} options={PASSIVE_LEVELS_OPT} t={t} />
        ))}
      </div>
      <StatRow label={lang === "fr" ? "Omamori" : "Omamori"} value={passives.omamori} have={haveOmamori} onHave={setHaveOmamori} t={t} color="#ffd700" />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, background: "rgba(255,149,0,0.06)", border: `1px solid rgba(255,149,0,0.2)`, borderRadius: 8, padding: "8px 12px" }}>
        <span style={{ fontFamily: "'Outfit'", fontSize: 11, color: t.text3 }}>Kans total</span>
        <span style={{ fontFamily: "'Space Mono'", fontSize: 12, color: "#ff9500", fontWeight: 700 }}>{totalKans.toLocaleString()}</span>
      </div>
    </SectionCard>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function ResourceCalc({ t, lang }) {
  return (
    <div style={{ animation: "bsr-fadein 0.4s ease" }}>
      <PullCalc t={t} lang={lang} />
      <CharCalc t={t} lang={lang} />
      <WeaponCalc t={t} lang={lang} />
      <SkillCalc t={t} lang={lang} />
      <div style={{ fontFamily: "'Outfit'", fontSize: 9, color: t.text3, textAlign: "center", marginTop: 8, fontStyle: "italic" }}>
        {lang === "fr"
          ? "Données basées sur bsr-calculator.vercel.app — crédits : @enveelive, @Ganxo012, @Joker"
          : "Data sourced from bsr-calculator.vercel.app — credits: @enveelive, @Ganxo012, @Joker"}
      </div>
    </div>
  );
}
