import { STAMP_SLOTS, ALL_SUBSTATS, CHAR_PASSIVES, ALL_PASSIVES, PASSIVE_TOOLTIPS } from "../data/characters.js";
import { checkMainStat, getTag, EMPTY_STAMP } from "../lib/scoring.js";
import ScoreRing from "./ScoreRing.jsx";

const Chevron = () => (
  <div className="chevron">
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
  </div>
);

function Select({ value, onChange, placeholder, options, small }) {
  return (
    <div className="select-wrap">
      <select className={value ? "" : "empty"} value={value} onChange={e => onChange(e.target.value)}
        style={small ? { fontSize: 11, padding: "8px 28px 8px 8px" } : undefined}>
        <option value="">{placeholder}</option>
        {options.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <Chevron />
    </div>
  );
}

export default function StampCard({ label, character, slot, weights, stamp, setStamp, score, isWinner, ov, L }) {
  const { mainStat, substats, procs = ["", "", ""], passive = "" } = stamp;
  const sd = STAMP_SLOTS[slot];
  const mc = checkMainStat(character, slot, mainStat, ov);
  const hasInput = mainStat || substats.some(s => s !== "");
  const allSubsFilled = substats.every(s => s !== "");
  const passives = CHAR_PASSIVES[character.id];

  const avail = (i) => {
    const used = substats.filter((s, j) => j !== i && s !== "");
    return ALL_SUBSTATS.filter(s => !used.includes(s));
  };

  return (
    <div className={`card stamp-card ${isWinner ? "winner" : ""}`} style={{ "--cc": character.color }}>
      <div className="topline" />
      {isWinner && <div className="winner-badge">★ {L.winner}</div>}
      <div className="section-label" style={{ letterSpacing: 3, marginBottom: 20, color: "var(--text2)", fontSize: 12 }}>{label}</div>

      <div style={{ marginBottom: 20 }}>
        <div className="section-label" style={{ marginBottom: 6 }}>{L.mainStat}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Select value={mainStat} onChange={v => setStamp({ ...stamp, mainStat: v })} placeholder={L.choose} options={sd.main_stats} />
          {mc === "bis" && <span className="tag-ms-bis">✓ BiS</span>}
          {mc === "off" && <span className="tag-ms-off">Off</span>}
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div className="section-label" style={{ marginBottom: 8 }}>{L.substats}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {substats.map((sub, i) => {
            const tag = sub ? getTag(weights[sub] ?? 0) : null;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Select
                  value={sub}
                  onChange={v => {
                    const n = [...substats];
                    n[i] = v;
                    const np = procs.map(p => (n.includes(p) ? p : ""));
                    setStamp({ ...stamp, substats: n, procs: np });
                  }}
                  placeholder={`${L.substatN} ${i + 1} —`}
                  options={avail(i)}
                />
                {tag && <span className={`tag ${tag.cls}`}>{tag.l}</span>}
              </div>
            );
          })}
        </div>
      </div>

      {allSubsFilled && (
        <div style={{ marginBottom: 24 }}>
          <div className="section-label" style={{ marginBottom: 8 }}>{L.procs_title}</div>
          <div style={{ display: "flex", gap: 6 }}>
            {procs.map((proc, i) => (
              <Select key={i} small value={proc}
                onChange={v => { const n = [...procs]; n[i] = v; setStamp({ ...stamp, procs: n }); }}
                placeholder={`${L.lvl} ${[10, 15, 20][i]}`}
                options={substats.filter(s => s !== "")} />
            ))}
          </div>
          <div style={{ fontSize: 9, color: "var(--text3)", marginTop: 4, fontStyle: "italic" }}>{L.procs_note}</div>
        </div>
      )}

      {allSubsFilled && character.rarity === "SSR" && passives && (
        <div style={{ marginBottom: 24 }}>
          <div className="section-label" style={{ marginBottom: 8 }}>{L.passive_title}</div>
          {passives.recommended.length > 0 ? (
            <div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                {passives.recommended.map((p, idx) => {
                  const isActive = passive === p;
                  const rankColors = ["#ff2d55", "#ff9500", "#ffd700", "#5ac8fa"];
                  const rankLabels = ["BiS", "#2", "#3", "#4"];
                  const tip = PASSIVE_TOOLTIPS[p]?.[L._lang] || "";
                  return (
                    <div key={p} className="tooltip-wrap">
                      <button className={`pill ${isActive ? "active" : ""}`} style={{ "--cc": rankColors[idx], display: "flex", alignItems: "center", gap: 6 }}
                        onClick={() => setStamp({ ...stamp, passive: isActive ? "" : p })}>
                        <span style={{ background: rankColors[idx], color: "#fff", fontSize: 8, fontWeight: 900, padding: "2px 5px", borderRadius: 4, letterSpacing: 0.5 }}>{rankLabels[idx]}</span>
                        {p}
                      </button>
                      {tip && <div className="tooltip">{tip}</div>}
                    </div>
                  );
                })}
              </div>
              <Select small value={passives.recommended.includes(passive) ? "" : passive}
                onChange={v => setStamp({ ...stamp, passive: v })}
                placeholder={L.passive_none}
                options={ALL_PASSIVES.filter(p => !passives.recommended.includes(p))} />
            </div>
          ) : (
            <div style={{ fontSize: 11, color: "#ff9500", fontStyle: "italic" }}>
              {passives.note?.[L._lang] || ""}
            </div>
          )}
          {passives.note && passives.recommended.length > 0 && (
            <div style={{ fontSize: 9, color: "var(--text3)", marginTop: 4, fontStyle: "italic" }}>{passives.note[L._lang]}</div>
          )}
        </div>
      )}

      {hasInput && score > 0 && (
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 4 }}>
          <ScoreRing score={score} size={135} />
        </div>
      )}
      {hasInput && (
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <button onClick={() => setStamp({ ...EMPTY_STAMP, substats: ["", "", "", ""], procs: ["", "", ""] })}
            style={{ background: "none", border: "none", color: "var(--text3)", fontSize: 11, cursor: "pointer", fontFamily: "Outfit", textDecoration: "underline", textUnderlineOffset: 3, padding: "4px 12px" }}>
            {L.reset}
          </button>
        </div>
      )}
    </div>
  );
}
