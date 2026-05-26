// ─── TIER LIST DATA ──────────────────────────────────────────────────────────
// Modifier les placements ici pour mettre à jour la tier list
const TIER_LIST_DATA = {
  tiers: [
    { id: "SS", color: "#ff2d55" },
    { id: "S",  color: "#ff9500" },
    { id: "A",  color: "#ffd700" },
    { id: "B",  color: "#34c759" },
    { id: "C",  color: "#5ac8fa" },
    { id: "D",  color: "#8e8e93" },
  ],
  placements: {
    SS: ["aizen", "nelliel"],
    S:  ["grimmjow_pantera", "szayel", "mayuri", "soifon", "gin"],
    A:  ["toshiro", "kenpachi", "kisuke"],
    B:  ["yoruichi", "ichigo_bankai", "grimmjow_sr"],
    C:  ["komamura", "tosen", "rangiku", "momo", "byakuya", "ikkaku", "yachiru"],
    D:  ["ichigo_initial", "ichigo_shikai", "nemu", "orihime", "renji", "rukia"],
  },
};

// Noms et couleurs pour les personnages pas encore dans l'app principale
const EXTRA_CHARS = {
  grimmjow_pantera: { name: "Grimmjow Pantera", initials: "GJ", color: "#4fa8ff", gradient: "linear-gradient(135deg,#1a3a6b,#4fa8ff)" },
  szayel:           { name: "Szayel Aporro",    initials: "SZ", color: "#cc44cc", gradient: "linear-gradient(135deg,#4a1a6b,#cc44cc)" },
  soifon:           { name: "Soi Fon",          initials: "SF", color: "#888",    gradient: "linear-gradient(135deg,#333,#888)"       },
  grimmjow_sr:      { name: "Grimmjow SR+",     initials: "GS", color: "#3a7acc", gradient: "linear-gradient(135deg,#142a4a,#3a7acc)" },
  yachiru:          { name: "Yachiru",           initials: "YA", color: "#ff7eb3", gradient: "linear-gradient(135deg,#5a1a3a,#ff7eb3)" },
};

export default function TierList({ characters, images, t, lang }) {
  return (
    <div style={{ animation: "bsr-fadein 0.4s ease" }}>
      {/* Tier rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {TIER_LIST_DATA.tiers.map(tier => {
          const charIds = TIER_LIST_DATA.placements[tier.id] || [];
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
                  const char = characters.find(c => c.id === id) || EXTRA_CHARS[id];
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
                          : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontWeight: 900, color: "rgba(255,255,255,0.5)", fontSize: 11 }}>{char.initials}</div>
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
