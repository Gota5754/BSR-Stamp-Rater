import { useState, useMemo } from "react";

// ─── DÉRIVATION DU TYPE DE DÉGÂTS (depuis recommended_main_stats) ─────────
function charType(c) {
  const p1 = (c.recommended_main_stats?.piece_1 || []).join(" ");
  if (p1.includes("Slash")) return "Slash";
  if (p1.includes("Spirit")) return "Spirit";
  if (p1.includes("Thrust")) return "Thrust";
  if (p1.includes("Strike")) return "Strike";
  return null;
}

const TYPE_COLORS = {
  Slash: "#ff6a00", Spirit: "#9b59b6", Thrust: "#1abc9c", Strike: "#d4a017",
};

// Supports / buffers identifiés (heuristique, à titre indicatif)
const SUPPORT_IDS = new Set([
  "kisuke", "byakuya", "komamura", "tosen", "szayelaporro",
  "orihime", "momo", "nemu", "rukia", "rangiku", "yachiru",
]);

export default function TeamBuilder({ characters, images, t, lang, L }) {
  const [team, setTeam] = useState([null, null, null]); // ids

  const toggle = (id) => {
    setTeam(prev => {
      if (prev.includes(id)) return prev.map(x => (x === id ? null : x));
      const idx = prev.findIndex(x => x === null);
      if (idx === -1) return prev; // équipe pleine
      const next = [...prev];
      next[idx] = id;
      return next;
    });
  };

  const members = team.map(id => characters.find(c => c.id === id) || null);
  const filled = members.filter(Boolean);

  const analysis = useMemo(() => {
    if (filled.length < 2) return null;
    const types = filled.map(charType).filter(Boolean);
    const uniqueTypes = [...new Set(types)];
    const supports = filled.filter(c => SUPPORT_IDS.has(c.id));
    const dps = filled.filter(c => !SUPPORT_IDS.has(c.id));
    const hints = [];

    if (uniqueTypes.length === 1 && types.length === filled.length) {
      hints.push({
        kind: "good",
        text: lang === "fr"
          ? `Mono-${uniqueTypes[0]} : tes 3 persos partagent le même type de dégâts, idéal pour les buffs de type et les comps de résonance.`
          : `Mono-${uniqueTypes[0]}: all 3 share the same damage type — great for type buffs and resonance comps.`,
      });
    } else if (uniqueTypes.length >= 1) {
      hints.push({
        kind: "neutral",
        text: lang === "fr"
          ? `Types mixtes (${uniqueTypes.join(", ")}). Pense à aligner ton DPS principal avec un buffer du même type.`
          : `Mixed types (${uniqueTypes.join(", ")}). Try aligning your main DPS with a same-type buffer.`,
      });
    }

    if (supports.length === 0) {
      hints.push({
        kind: "warn",
        text: lang === "fr"
          ? "Aucun support/buffer détecté. Ajouter un support (ex: Kisuke, Byakuya, Komamura) amplifie souvent fortement les dégâts."
          : "No support/buffer detected. Adding a support (e.g. Kisuke, Byakuya, Komamura) often boosts damage significantly.",
      });
    } else if (dps.length >= 1) {
      hints.push({
        kind: "good",
        text: lang === "fr"
          ? `Bonne base : ${supports.length} support + ${dps.length} DPS. Place ton DPS principal sur le terrain et swap pour appliquer les buffs.`
          : `Solid base: ${supports.length} support + ${dps.length} DPS. Keep your main DPS on-field and swap to apply buffs.`,
      });
    }

    return { uniqueTypes, supports, dps, hints };
  }, [filled, lang]);

  const slotBox = (m, i) => (
    <div key={i} style={{
      flex: 1, minWidth: 90, aspectRatio: "3 / 4", borderRadius: 14, overflow: "hidden",
      border: m ? `2px solid ${m.color}` : `2px dashed ${t.cardBorder}`,
      background: m ? m.gradient : t.input, position: "relative",
      display: "flex", alignItems: "center", justifyContent: "center", cursor: m ? "pointer" : "default",
    }} onClick={() => m && toggle(m.id)}>
      {m ? (<>
        {images[m.id]
          ? <img src={images[m.id]} alt={m.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
          : <span style={{ fontSize: 26, fontWeight: 900, color: "rgba(255,255,255,0.3)" }}>{m.initials}</span>}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 6px 6px", background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)" }}>
          <div style={{ fontFamily: "'Outfit'", fontSize: 10, fontWeight: 800, color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,0.7)", lineHeight: 1.1 }}>{m.name.split(" ")[0]}</div>
          {charType(m) && <div style={{ fontFamily: "'Outfit'", fontSize: 8, fontWeight: 700, color: TYPE_COLORS[charType(m)] || "#fff", marginTop: 2 }}>{charType(m)}</div>}
        </div>
        <div style={{ position: "absolute", top: 4, right: 4, width: 18, height: 18, borderRadius: "50%", background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</div>
      </>) : (
        <span style={{ fontFamily: "'Outfit'", fontSize: 22, color: t.text3 }}>+</span>
      )}
    </div>
  );

  return (
    <div style={{ animation: "bsr-fadein 0.4s ease", marginTop: 24 }}>
      {/* SLOTS */}
      <div style={{ fontFamily: "'Outfit'", fontSize: 10, color: t.text3, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>
        {L.tb_team}
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 20, maxWidth: 360 }}>
        {members.map((m, i) => slotBox(m, i))}
      </div>

      {/* ANALYSE DE SYNERGIE */}
      {analysis && (
        <div style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 8 }}>
          {analysis.hints.map((h, i) => (
            <div key={i} style={{
              fontFamily: "'Outfit'", fontSize: 12, lineHeight: 1.5, padding: "10px 14px", borderRadius: 12,
              background: h.kind === "good" ? "rgba(52,199,89,0.08)" : h.kind === "warn" ? "rgba(255,149,0,0.08)" : t.input,
              border: `1px solid ${h.kind === "good" ? "rgba(52,199,89,0.25)" : h.kind === "warn" ? "rgba(255,149,0,0.25)" : t.cardBorder}`,
              color: h.kind === "good" ? "#34c759" : h.kind === "warn" ? "#ff9500" : t.text2,
            }}>
              {h.kind === "good" ? "✓ " : h.kind === "warn" ? "⚠️ " : "→ "}{h.text}
            </div>
          ))}
          <div style={{ fontFamily: "'Outfit'", fontSize: 9, color: t.text3, fontStyle: "italic", marginTop: 2 }}>
            {L.tb_disclaimer}
          </div>
        </div>
      )}

      {/* SÉLECTEUR DE PERSONNAGES */}
      <div style={{ fontFamily: "'Outfit'", fontSize: 10, color: t.text3, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>
        {L.tb_pick}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(64px, 1fr))", gap: 8 }}>
        {characters.map(c => {
          const sel = team.includes(c.id);
          const type = charType(c);
          return (
            <div key={c.id} onClick={() => toggle(c.id)} title={c.name} style={{
              aspectRatio: "1", borderRadius: 10, overflow: "hidden", position: "relative", cursor: "pointer",
              border: sel ? `2px solid ${c.color}` : `1px solid ${t.cardBorder}`,
              background: c.gradient, opacity: sel ? 1 : 0.92, transition: "all 0.15s",
              boxShadow: sel ? `0 0 0 2px ${c.color}55` : "none",
            }}>
              {images[c.id]
                ? <img src={images[c.id]} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
                : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: 13, fontWeight: 900, color: "rgba(255,255,255,0.4)" }}>{c.initials}</div>}
              {type && <div style={{ position: "absolute", top: 3, left: 3, width: 8, height: 8, borderRadius: "50%", background: TYPE_COLORS[type], border: "1px solid rgba(0,0,0,0.3)" }} />}
              {sel && <div style={{ position: "absolute", inset: 0, background: `${c.color}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ background: c.color, color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900 }}>✓</span>
              </div>}
            </div>
          );
        })}
      </div>

      {/* LÉGENDE TYPES */}
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 16, justifyContent: "center" }}>
        {Object.entries(TYPE_COLORS).map(([type, col]) => (
          <div key={type} style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "'Outfit'", fontSize: 10, color: t.text3 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: col }} />{type}
          </div>
        ))}
      </div>
    </div>
  );
}
