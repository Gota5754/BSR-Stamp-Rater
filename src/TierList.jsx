import { useState } from "react";

// ─── TIER LIST DATA ──────────────────────────────────────────────────────────
// Modifier les placements ici pour mettre à jour la tier list
const TIER_LIST_DATA = {
  categories: [
    { id: "pve", fr: "PvE Général", en: "General PvE" },
    { id: "raid", fr: "Raid", en: "Raid" },
    { id: "pvp", fr: "PvP", en: "PvP" },
  ],
  tiers: [
    { id: "SS", color: "#ff2d55" },
    { id: "S",  color: "#ff9500" },
    { id: "A",  color: "#ffd700" },
    { id: "B",  color: "#34c759" },
    { id: "C",  color: "#5ac8fa" },
    { id: "D",  color: "#8e8e93" },
  ],
  placements: {
    pve: {
      SS: ["ichigo_bankai", "kisuke", "aizen"],
      S:  ["yoruichi", "nelliel", "gin"],
      A:  ["byakuya", "toshiro", "kenpachi"],
      B:  ["tosen", "ikkaku", "komamura", "mayuri"],
      C:  ["ichigo_initial", "ichigo_shikai", "momo", "rangiku"],
      D:  ["nemu", "orihime", "renji", "rukia"],
    },
    raid: {
      SS: ["kisuke", "aizen"],
      S:  ["ichigo_bankai", "yoruichi", "nelliel"],
      A:  ["gin", "byakuya", "toshiro"],
      B:  ["kenpachi", "tosen", "ikkaku"],
      C:  ["komamura", "mayuri", "rangiku"],
      D:  ["ichigo_initial", "ichigo_shikai", "momo", "nemu", "orihime", "renji", "rukia"],
    },
    pvp: {
      SS: ["aizen", "gin"],
      S:  ["ichigo_bankai", "yoruichi"],
      A:  ["kisuke", "nelliel", "byakuya"],
      B:  ["toshiro", "kenpachi", "tosen"],
      C:  ["ikkaku", "komamura", "mayuri"],
      D:  ["ichigo_initial", "ichigo_shikai", "momo", "nemu", "orihime", "renji", "rukia", "rangiku"],
    },
  },
};

export default function TierList({ characters, images, t, lang }) {
  const [category, setCategory] = useState("pve");
  const placements = TIER_LIST_DATA.placements[category];

  return (
    <div style={{ animation: "bsr-fadein 0.4s ease" }}>
      {/* Category selector */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {TIER_LIST_DATA.categories.map(cat => {
          const a = category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              style={{
                fontFamily: "'Outfit'", fontSize: 12, fontWeight: 700,
                padding: "7px 18px", borderRadius: 10, cursor: "pointer",
                border: a ? "2px solid #ff9500" : `1px solid ${t.cardBorder}`,
                background: a ? "rgba(255,149,0,0.12)" : t.input,
                color: a ? "#ff9500" : t.text2, transition: "all 0.2s",
              }}
            >
              {cat[lang]}
            </button>
          );
        })}
      </div>

      {/* Tier rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {TIER_LIST_DATA.tiers.map(tier => {
          const charIds = placements[tier.id] || [];
          return (
            <div
              key={tier.id}
              style={{
                display: "flex", alignItems: "stretch",
                borderRadius: 12, overflow: "hidden",
                border: `1px solid ${t.cardBorder}`,
              }}
            >
              {/* Tier label */}
              <div style={{
                width: 52, minWidth: 52,
                background: tier.color + "cc",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Space Mono', monospace", fontSize: 20, fontWeight: 700,
                color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                flexShrink: 0,
              }}>
                {tier.id}
              </div>

              {/* Characters */}
              <div style={{
                flex: 1, background: t.card,
                display: "flex", flexWrap: "wrap", gap: 8,
                padding: "10px 14px", alignItems: "center", minHeight: 72,
              }}>
                {charIds.map(id => {
                  const char = characters.find(c => c.id === id);
                  if (!char) return null;
                  const img = images[id];
                  return (
                    <div key={id} title={char.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 8, overflow: "hidden",
                        border: `2px solid ${char.color}55`, background: char.gradient,
                        position: "relative", flexShrink: 0,
                      }}>
                        {img
                          ? <img src={img} alt={char.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
                          : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontWeight: 900, color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{char.initials}</div>
                        }
                      </div>
                      <span style={{
                        fontFamily: "'Outfit'", fontSize: 8, color: t.text3, fontWeight: 600,
                        textAlign: "center", maxWidth: 52,
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}>
                        {char.name.split(" ")[0]}
                      </span>
                    </div>
                  );
                })}
                {charIds.length === 0 && (
                  <span style={{ fontFamily: "'Outfit'", fontSize: 11, color: t.text3, fontStyle: "italic" }}>—</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ fontFamily: "'Outfit'", fontSize: 10, color: t.text3, marginTop: 14, textAlign: "center", fontStyle: "italic", lineHeight: 1.6 }}>
        {lang === "fr"
          ? "Tier list basée sur le méta actuel — modifiable dans TIER_LIST_DATA (TierList.jsx)"
          : "Tier list based on current meta — editable in TIER_LIST_DATA (TierList.jsx)"}
      </div>
    </div>
  );
}
