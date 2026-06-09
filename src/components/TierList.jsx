import { CHARACTERS } from "../data/characters.js";
import { TIER_LIST } from "../data/tierlist.js";

export default function TierList({ images, L }) {
  return (
    <div className="fadein">
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {TIER_LIST.tiers.map(tier => {
          const charIds = TIER_LIST.placements[tier.id] || [];
          return (
            <div key={tier.id} className="tier-row">
              <div className="tier-label" style={{ background: tier.color + "cc" }}>{tier.id}</div>
              <div className="tier-chars">
                {charIds.map(id => {
                  const char = CHARACTERS.find(c => c.id === id);
                  if (!char) return null;
                  const img = images[id];
                  return (
                    <div key={id} className="tier-char" title={char.name}>
                      <div className="avatar" style={{ border: `2px solid ${char.color}55`, background: char.gradient }}>
                        {img
                          ? <img src={img} alt={char.name} loading="lazy" />
                          : <div className="initials">{char.initials}</div>}
                      </div>
                      <span className="label">{char.name.split(" ")[0]}</span>
                    </div>
                  );
                })}
                {charIds.length === 0 && <span style={{ fontSize: 11, color: "var(--text3)", fontStyle: "italic" }}>—</span>}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 14, textAlign: "center", fontStyle: "italic", lineHeight: 1.6 }}>
        {L.tierlist_note}
      </div>
    </div>
  );
}
