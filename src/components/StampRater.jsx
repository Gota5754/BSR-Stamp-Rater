import { useState, useMemo } from "react";
import { CHARACTERS, CHAR_GUIDES, STAMP_SLOTS, WEAPON_LEVELS, PASSIVE_LEVELS } from "../data/characters.js";
import { getEffectiveWeights, getEffectiveRecs, calcScore, EMPTY_STAMP } from "../lib/scoring.js";
import CharCard from "./CharCard.jsx";
import StampCard from "./StampCard.jsx";
import WeightBars from "./WeightBars.jsx";

const emptyStamp = () => ({ ...EMPTY_STAMP, substats: ["", "", "", ""], procs: ["", "", ""] });
const emptySlots = () => ({
  piece_1: { a: emptyStamp(), b: emptyStamp() },
  piece_2: { a: emptyStamp(), b: emptyStamp() },
  piece_3: { a: emptyStamp(), b: emptyStamp() },
});

function LevelToggles({ data, value, onChange, label, lang, color }) {
  return (
    <>
      <span className="section-label" style={{ alignSelf: "center", letterSpacing: 1 }}>{label}:</span>
      {data.levels.map(lv => {
        const a = value === lv.id;
        const hasData = Object.keys(lv.changes).length > 0;
        const tip = lv.tooltip?.[lang] || "";
        return (
          <div key={lv.id} className="tooltip-wrap">
            <button className={`pill ${a ? "active" : ""} ${hasData ? "" : "dim"}`} style={{ "--cc": color }}
              onClick={() => onChange(a ? "" : lv.id)}>{lv.label}</button>
            {tip && <div className="tooltip">{tip}</div>}
          </div>
        );
      })}
    </>
  );
}

export default function StampRater({ images, L, lang }) {
  const [rarityFilter, setRarityFilter] = useState("all");
  const [charId, setCharId] = useState("");
  const [slot, setSlot] = useState("piece_1");
  const [ov, setOv] = useState({});
  const [cmp, setCmp] = useState(false);
  const [weaponLv, setWeaponLv] = useState("");
  const [passiveLv, setPassiveLv] = useState("");
  const [slotData, setSlotData] = useState(emptySlots());

  const ch = CHARACTERS.find(c => c.id === charId) || null;
  const sA = slotData[slot].a;
  const sB = slotData[slot].b;
  const setSA = v => setSlotData(prev => ({ ...prev, [slot]: { ...prev[slot], a: v } }));
  const setSB = v => setSlotData(prev => ({ ...prev, [slot]: { ...prev[slot], b: v } }));

  const w = useMemo(() => (ch ? getEffectiveWeights(ch, ov, weaponLv, passiveLv) : {}), [ch, ov, weaponLv, passiveLv]);
  const scA = useMemo(() => (ch ? calcScore(sA.substats, w, sA.procs, sA.passive, ch.id) : 0), [sA, w, ch]);
  const scB = useMemo(() => (ch ? calcScore(sB.substats, w, sB.procs, sB.passive, ch.id) : 0), [sB, w, ch]);
  const win = cmp && scA > 0 && scB > 0 ? (scA > scB ? "a" : scB > scA ? "b" : "tie") : null;

  const selectChar = id => {
    setCharId(id);
    window.dispatchEvent(new CustomEvent("bsr:char", { detail: id }));
    setOv({});
    setWeaponLv("");
    setPassiveLv("");
  };

  return (
    <>
      {/* GRILLE DE PERSONNAGES */}
      <div style={{ marginTop: 24, marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div className="section-label">{L.character}</div>
          <div style={{ display: "flex", gap: 4 }}>
            {["all", "SSR", "SR+", "SR"].map(r => (
              <button key={r} className={`filter-btn ${rarityFilter === r ? "active" : ""}`}
                onClick={() => setRarityFilter(r)}>{r === "all" ? L.filter_all : r}</button>
            ))}
          </div>
        </div>
        <div className="char-grid">
          {CHARACTERS.filter(c => rarityFilter === "all" || c.rarity === rarityFilter).map(c => (
            <CharCard key={c.id} character={c} isActive={charId === c.id} onClick={() => selectChar(c.id)} imgUrl={images[c.id]} />
          ))}
        </div>
      </div>

      {ch && (
        <div className="fadein">
          {/* BANNIÈRE DU PERSO SÉLECTIONNÉ */}
          <div className="card" style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", borderColor: `${ch.color}22`, borderRadius: 18, marginBottom: 20 }}>
            <div style={{ width: 56, height: 56, borderRadius: 12, overflow: "hidden", flexShrink: 0, border: `2px solid ${ch.color}55`, background: ch.gradient }}>
              {images[ch.id]
                ? <img src={images[ch.id]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
                : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: 18, fontWeight: 900, color: "rgba(255,255,255,0.3)" }}>{ch.initials}</div>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: ch.color, letterSpacing: -0.5 }}>{ch.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3, flexWrap: "wrap" }}>
                {ch.subtitle && <span style={{ fontSize: 12, color: "var(--text2)", fontStyle: "italic" }}>{ch.subtitle}</span>}
                <span style={{ background: `${ch.color}15`, color: ch.color, fontSize: 10, padding: "3px 10px", borderRadius: 8, fontWeight: 800, letterSpacing: 0.5 }}>{ch.set_bis}</span>
              </div>
              {ch.core_stamp && (
                <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap", fontSize: 9, color: "var(--text2)" }}>
                  <span>🎯 {L.core_stamp}: <strong style={{ color: "var(--text)" }}>{ch.core_stamp}</strong></span>
                  <span>⚔️ {L.weapon_stamp}: <strong style={{ color: "var(--text)" }}>{ch.weapon_stamp}</strong></span>
                </div>
              )}
              {CHAR_GUIDES[ch.id] && (
                <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 8, lineHeight: 1.5, fontStyle: "italic", borderLeft: `2px solid ${ch.color}33`, paddingLeft: 10 }}>
                  💡 {CHAR_GUIDES[ch.id][lang]}
                </div>
              )}
            </div>
          </div>

          {/* PIÈCE */}
          <div style={{ marginBottom: 16 }}>
            <div className="section-label" style={{ marginBottom: 8 }}>{L.piece}</div>
            <div style={{ display: "flex", gap: 8 }}>
              {Object.entries(STAMP_SLOTS).map(([k, v]) => (
                <button key={k} className={`pill ${slot === k ? "active" : ""}`} style={{ "--cc": ch.color, flex: 1, padding: "10px 0", fontSize: 12 }}
                  onClick={() => setSlot(k)}>{v.label}</button>
              ))}
            </div>
            <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 8 }}>
              ✦ {L.recommended} : {getEffectiveRecs(ch, slot, ov).join(" / ")}
            </div>
          </div>

          {/* OVERRIDES BOUNDARY */}
          {ch.overrides && (
            <div style={{ marginBottom: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {ch.overrides.map(o => {
                const a = !!ov[o.id];
                return (
                  <label key={o.id} className={`pill ${a ? "active" : ""}`} style={{ "--cc": ch.color, display: "flex", alignItems: "center", gap: 8, userSelect: "none" }}>
                    <input type="checkbox" checked={a} onChange={e => setOv({ ...ov, [o.id]: e.target.checked })} style={{ accentColor: ch.color, cursor: "pointer" }} />
                    {o.label}
                  </label>
                );
              })}
            </div>
          )}

          {/* NIVEAUX D'ARME ET DE PASSIF */}
          {(WEAPON_LEVELS[ch.id] || PASSIVE_LEVELS[ch.id]) && (
            <div style={{ marginBottom: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {WEAPON_LEVELS[ch.id] && (
                <LevelToggles data={WEAPON_LEVELS[ch.id]} value={weaponLv} onChange={setWeaponLv} label={L.weapon_level} lang={lang} color={ch.color} />
              )}
              {PASSIVE_LEVELS[ch.id] && (
                <LevelToggles data={PASSIVE_LEVELS[ch.id]} value={passiveLv} onChange={setPassiveLv} label={L.passive_level} lang={lang} color={ch.color} />
              )}
            </div>
          )}

          {/* MODE COMPARAISON */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 16 }}>
            <button className={`pill ${cmp ? "active" : ""}`} style={{ "--cc": ch.color }} onClick={() => setCmp(c => !c)}>
              ⇔ {L.compare}
            </button>
          </div>

          {/* CARTES STAMP */}
          <div className="stamp-cards">
            <StampCard label="Stamp A" character={ch} slot={slot} weights={w} stamp={sA} setStamp={setSA} score={scA} isWinner={win === "a"} ov={ov} L={L} />
            {cmp && <StampCard label="Stamp B" character={ch} slot={slot} weights={w} stamp={sB} setStamp={setSB} score={scB} isWinner={win === "b"} ov={ov} L={L} />}
          </div>

          {/* RÉSULTAT DE COMPARAISON */}
          {win && (
            <div className="card" style={{ textAlign: "center", marginTop: 16, padding: "14px 20px", borderRadius: 14, fontSize: 14, fontWeight: 800 }}>
              {win === "tie"
                ? <span style={{ color: "var(--text2)" }}>{L.tie}</span>
                : <span style={{ color: ch.color }}>{L.wins(win === "a" ? "Stamp A" : "Stamp B", win === "a" ? scA : scB, win === "a" ? scB : scA)}</span>}
            </div>
          )}

          {/* PRIORITÉ DES SUBSTATS */}
          <div className="card" style={{ marginTop: 28, padding: "20px 24px", borderRadius: 18 }}>
            <div className="section-label" style={{ marginBottom: 14 }}>{L.priority}</div>
            <WeightBars weights={w} color={ch.color} />
          </div>
        </div>
      )}

      {/* ÉTAT VIDE */}
      {!ch && (
        <div className="fadein" style={{ textAlign: "center", padding: "40px 20px", color: "var(--text3)" }}>
          <svg width="52" height="52" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.3" style={{ animation: "float 3s ease-in-out infinite" }}>
            <line x1="10" y1="38" x2="36" y2="12" /><line x1="30" y1="12" x2="36" y2="12" /><line x1="36" y1="12" x2="36" y2="18" /><line x1="16" y1="28" x2="20" y2="32" />
          </svg>
          <div style={{ fontSize: 14, marginTop: 12 }}>{L.pick_char}</div>
        </div>
      )}
    </>
  );
}
