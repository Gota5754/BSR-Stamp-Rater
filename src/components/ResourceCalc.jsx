import { useState, useMemo } from "react";
import {
  LEVEL_STEPS, PULL_COST, HARD_PITY, BOOK_EXP, WEAPON_TAMA_EXP,
  calcCharResources, calcWeaponResources, calcSkillResources, calcPassiveResources,
} from "../data/resources.js";

function StatRow({ label, value, have, onHave, color, fmt = v => v.toLocaleString() }) {
  const pct = have !== undefined ? Math.min(100, (have / Math.max(value, 1)) * 100) : 0;
  const done = have !== undefined && value > 0 && have >= value;
  return (
    <div className="stat-row">
      <span className="label">{label}</span>
      <div style={{ flex: 1 }}>
        <span className="mono" style={{ fontSize: 10, color: done ? "#34c759" : "var(--text3)" }}>
          {have !== undefined ? `${have.toLocaleString()} / ` : ""}{fmt(value)}
        </span>
        {have !== undefined && value > 0 && (
          <div style={{ height: 3, background: "var(--div)", borderRadius: 2, overflow: "hidden", marginTop: 2 }}>
            <div style={{ width: `${pct}%`, height: "100%", background: done ? "#34c759" : color, borderRadius: 2, transition: "width 0.4s" }} />
          </div>
        )}
      </div>
      {have !== undefined && (
        <input type="number" value={have === 0 ? "" : have} placeholder="0"
          onChange={e => onHave(Math.max(0, Number(e.target.value) || 0))} />
      )}
    </div>
  );
}

function SectionCard({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="card section-card">
      <button onClick={() => setOpen(o => !o)}>
        {title}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", color: "var(--text3)" }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <div className="body">{children}</div>}
    </div>
  );
}

function LevelSelect({ label, value, onChange, options }) {
  return (
    <div>
      <span className="input-label">{label}</span>
      <div className="select-wrap">
        <select value={value} onChange={e => onChange(Number(e.target.value))}>
          {options.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        <div className="chevron">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
        </div>
      </div>
    </div>
  );
}

function ResultBox({ ok, children }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", marginTop: 8, padding: "8px 12px", borderRadius: 8,
      background: ok ? "rgba(52,199,89,0.08)" : "rgba(255,149,0,0.08)",
      border: `1px solid ${ok ? "rgba(52,199,89,0.25)" : "rgba(255,149,0,0.2)"}`,
    }}>{children}</div>
  );
}

function PullCalc({ L }) {
  const [crystals, setCrystals] = useState("");
  const [pity, setPity] = useState("");
  const [days, setDays] = useState("");
  const [daily, setDaily] = useState("30");

  const total = (Number(crystals) || 0) + (Number(days) || 0) * (Number(daily) || 0);
  const pulls = Math.floor(total / PULL_COST);
  const curPity = Math.min(Number(pity) || 0, HARD_PITY - 1);
  const needed = Math.max(1, HARD_PITY - curPity);
  const ok = pulls >= needed;
  const short = Math.max(0, needed - pulls);
  const P = L.pull;

  const fields = [
    [P.cur, crystals, setCrystals], [P.pity, pity, setPity],
    [P.days, days, setDays], [P.daily, daily, setDaily],
  ];

  return (
    <SectionCard title={`💎 ${P.title}`}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        {fields.map(([lbl, val, set]) => (
          <div key={lbl}>
            <span className="input-label">{lbl}</span>
            <input className="num-input" type="number" value={val} onChange={e => set(e.target.value)} placeholder="0" min="0" />
          </div>
        ))}
      </div>
      {crystals !== "" && (
        <div className="fadein" style={{
          background: ok ? "rgba(52,199,89,0.08)" : "rgba(255,45,85,0.08)",
          border: `1px solid ${ok ? "rgba(52,199,89,0.3)" : "rgba(255,45,85,0.3)"}`,
          borderRadius: 10, padding: 14,
        }}>
          <div style={{ display: "flex", justifyContent: "space-around", gap: 8 }}>
            {[
              { val: pulls, lab: P.estPulls, col: ok ? "#34c759" : "#ff2d55" },
              { val: needed, lab: P.forGuarantee, col: "var(--text)" },
              { val: ok ? "✓" : `−${short}`, lab: ok ? P.enough : P.short, col: ok ? "#34c759" : "#ff9500" },
            ].map(({ val, lab, col }) => (
              <div key={lab} style={{ textAlign: "center" }}>
                <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: col }}>{val}</div>
                <div style={{ fontSize: 9, color: "var(--text3)", textTransform: "uppercase", letterSpacing: 1 }}>{lab}</div>
              </div>
            ))}
          </div>
          {!ok && (
            <div style={{ fontSize: 11, color: "#ff9500", marginTop: 10, textAlign: "center" }}>
              {(short * PULL_COST).toLocaleString()} {P.crystalShort}
            </div>
          )}
        </div>
      )}
    </SectionCard>
  );
}

function CharCalc({ L }) {
  const C = L.charCalc;
  const [fromLv, setFromLv] = useState(1);
  const [toLv, setToLv] = useState(100);
  const [ess, setEss] = useState({ green: 0, blue: 0, purple: 0 });
  const [books, setBooks] = useState({ green: 0, blue: 0, purple: 0, yellow: 0 });

  const res = useMemo(() => (toLv > fromLv ? calcCharResources(fromLv, toLv) : null), [fromLv, toLv]);
  const booksExpOwned = books.green * BOOK_EXP.green + books.blue * BOOK_EXP.blue + books.purple * BOOK_EXP.purple + books.yellow * BOOK_EXP.yellow;
  const booksOk = res ? booksExpOwned >= res.expNeeded : false;
  const cc = "#5ac8fa";

  return (
    <SectionCard title={`🧑 ${C.title}`}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        <LevelSelect label={C.from} value={fromLv} options={LEVEL_STEPS.slice(0, -1)}
          onChange={v => { setFromLv(v); if (toLv <= v) setToLv(LEVEL_STEPS[LEVEL_STEPS.indexOf(v) + 1]); }} />
        <LevelSelect label={C.to} value={toLv} onChange={setToLv} options={LEVEL_STEPS.filter(v => v > fromLv)} />
      </div>
      {res && (<>
        <StatRow label={C.expNeeded} value={res.expNeeded} color={cc} />
        <StatRow label={C.kans} value={res.kans} color={cc} />
        <div className="divider" />
        <div className="input-label">{C.essences}</div>
        {res.essGreen > 0 && <StatRow label={C.essGreen} value={res.essGreen} have={ess.green} onHave={v => setEss({ ...ess, green: v })} color="#34c759" />}
        {res.essBlue > 0 && <StatRow label={C.essBlue} value={res.essBlue} have={ess.blue} onHave={v => setEss({ ...ess, blue: v })} color={cc} />}
        {res.essPurple > 0 && <StatRow label={C.essPurple} value={res.essPurple} have={ess.purple} onHave={v => setEss({ ...ess, purple: v })} color="#bf5af2" />}
        <div className="divider" />
        <div className="input-label">{C.books}</div>
        <StatRow label={C.booksGreen} value={0} have={books.green} onHave={v => setBooks({ ...books, green: v })} color="#34c759" />
        <StatRow label={C.booksBlue} value={0} have={books.blue} onHave={v => setBooks({ ...books, blue: v })} color={cc} />
        <StatRow label={C.booksPurple} value={0} have={books.purple} onHave={v => setBooks({ ...books, purple: v })} color="#bf5af2" />
        <StatRow label={C.booksYellow} value={0} have={books.yellow} onHave={v => setBooks({ ...books, yellow: v })} color="#ffd700" />
        <ResultBox ok={booksOk}>
          <span style={{ fontSize: 11, color: "var(--text3)" }}>{C.expOwned}</span>
          <span className="mono" style={{ fontSize: 11, color: booksOk ? "#34c759" : "#ff9500", fontWeight: 700 }}>
            {booksOk ? C.enough : `${booksExpOwned.toLocaleString()} / ${res.expNeeded.toLocaleString()}`}
          </span>
        </ResultBox>
      </>)}
    </SectionCard>
  );
}

function WeaponCalc({ L }) {
  const C = L.weaponCalc;
  const [fromLv, setFromLv] = useState(1);
  const [toLv, setToLv] = useState(100);
  const [tama, setTama] = useState({ green: 0, blue: 0, purple: 0, yellow: 0 });
  const [ham, setHam] = useState({ green: 0, blue: 0, purple: 0 });

  const effectiveFrom = fromLv === 1 ? 20 : fromLv;
  const res = useMemo(() => (toLv > effectiveFrom ? calcWeaponResources(effectiveFrom, toLv) : null), [effectiveFrom, toLv]);
  const tamaExpOwned = tama.green * WEAPON_TAMA_EXP.green + tama.blue * WEAPON_TAMA_EXP.blue + tama.purple * WEAPON_TAMA_EXP.purple + tama.yellow * WEAPON_TAMA_EXP.yellow;
  const tamaOk = res ? tamaExpOwned >= res.tamaXp : false;
  const cc = "#ff9500";

  return (
    <SectionCard title={`⚔️ ${C.title}`}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        <LevelSelect label={C.from} value={fromLv} options={LEVEL_STEPS.slice(0, -1)}
          onChange={v => { setFromLv(v); if (toLv <= Math.max(v, 20)) setToLv(30); }} />
        <LevelSelect label={C.to} value={toLv} onChange={setToLv} options={LEVEL_STEPS.filter(v => v > effectiveFrom)} />
      </div>
      {res && (<>
        <StatRow label={C.tamaXp} value={res.tamaXp} color={cc} />
        <StatRow label={C.kans} value={res.kans} color={cc} />
        <StatRow label={C.gold} value={res.gold} color="#ffd700" />
        <div className="divider" />
        <div className="input-label">{C.hammers}</div>
        {res.hamGreen > 0 && <StatRow label={C.hamGreen} value={res.hamGreen} have={ham.green} onHave={v => setHam({ ...ham, green: v })} color="#34c759" />}
        {res.hamBlue > 0 && <StatRow label={C.hamBlue} value={res.hamBlue} have={ham.blue} onHave={v => setHam({ ...ham, blue: v })} color={cc} />}
        {res.hamPurple > 0 && <StatRow label={C.hamPurple} value={res.hamPurple} have={ham.purple} onHave={v => setHam({ ...ham, purple: v })} color="#bf5af2" />}
        <div className="divider" />
        <div className="input-label">{C.tama}</div>
        <StatRow label={C.tamaGreen} value={0} have={tama.green} onHave={v => setTama({ ...tama, green: v })} color="#34c759" />
        <StatRow label={C.tamaBlue} value={0} have={tama.blue} onHave={v => setTama({ ...tama, blue: v })} color={cc} />
        <StatRow label={C.tamaPurple} value={0} have={tama.purple} onHave={v => setTama({ ...tama, purple: v })} color="#bf5af2" />
        <StatRow label={C.tamaYellow} value={0} have={tama.yellow} onHave={v => setTama({ ...tama, yellow: v })} color="#ffd700" />
        <ResultBox ok={tamaOk}>
          <span style={{ fontSize: 11, color: "var(--text3)" }}>{C.expOwned}</span>
          <span className="mono" style={{ fontSize: 11, color: tamaOk ? "#34c759" : "#ff9500", fontWeight: 700 }}>
            {tamaOk ? C.enough : `${tamaExpOwned.toLocaleString()} / ${res.tamaXp.toLocaleString()}`}
          </span>
        </ResultBox>
      </>)}
    </SectionCard>
  );
}

function SkillCalc({ L }) {
  const C = L.skillCalc;
  const [fromLv, setFromLv] = useState(1);
  const [toLv, setToLv] = useState(9);
  const [numSkills, setNumSkills] = useState(4);
  const [arts, setArts] = useState({ green: 0, blue: 0, purple: 0 });
  const [pass, setPass] = useState({ p1: 3, p2: 3, p3: 3 });
  const [haveOmamori, setHaveOmamori] = useState(0);

  const skills = useMemo(() => calcSkillResources(fromLv, toLv, numSkills), [fromLv, toLv, numSkills]);
  const passives = useMemo(() => calcPassiveResources(pass.p1, pass.p2, pass.p3), [pass]);
  const totalKans = skills.kans + passives.kans;
  const SKILL_LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <SectionCard title={`📚 ${C.title}`}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
        <LevelSelect label={C.from} value={fromLv} options={SKILL_LEVELS.slice(0, -1)}
          onChange={v => { setFromLv(v); if (toLv <= v) setToLv(v + 1); }} />
        <LevelSelect label={C.to} value={toLv} onChange={setToLv} options={SKILL_LEVELS.filter(v => v > fromLv)} />
        <LevelSelect label={C.numSkills} value={numSkills} onChange={setNumSkills} options={[1, 2, 3, 4]} />
      </div>
      <StatRow label={C.green} value={skills.green} have={arts.green} onHave={v => setArts({ ...arts, green: v })} color="#34c759" />
      <StatRow label={C.blue} value={skills.blue} have={arts.blue} onHave={v => setArts({ ...arts, blue: v })} color="#5ac8fa" />
      <StatRow label={C.purple} value={skills.purple} have={arts.purple} onHave={v => setArts({ ...arts, purple: v })} color="#bf5af2" />
      <div className="divider" />
      <div className="input-label">{C.passives}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 10 }}>
        <LevelSelect label={C.p1} value={pass.p1} onChange={v => setPass({ ...pass, p1: v })} options={[0, 1, 2, 3]} />
        <LevelSelect label={C.p2} value={pass.p2} onChange={v => setPass({ ...pass, p2: v })} options={[0, 1, 2, 3]} />
        <LevelSelect label={C.p3} value={pass.p3} onChange={v => setPass({ ...pass, p3: v })} options={[0, 1, 2, 3]} />
      </div>
      <StatRow label={C.omamori} value={passives.omamori} have={haveOmamori} onHave={setHaveOmamori} color="#ffd700" />
      <ResultBox ok={false}>
        <span style={{ fontSize: 11, color: "var(--text3)" }}>{C.totalKans}</span>
        <span className="mono" style={{ fontSize: 12, color: "#ff9500", fontWeight: 700 }}>{totalKans.toLocaleString()}</span>
      </ResultBox>
    </SectionCard>
  );
}

export default function ResourceCalc({ L }) {
  return (
    <div className="fadein">
      <PullCalc L={L} />
      <CharCalc L={L} />
      <WeaponCalc L={L} />
      <SkillCalc L={L} />
      <div style={{ fontSize: 9, color: "var(--text3)", textAlign: "center", marginTop: 8, fontStyle: "italic" }}>
        {L.resources_credits}
      </div>
    </div>
  );
}
