import { useState } from "react";

// ─── ROTATION DATA ───────────────────────────────────────────────────────────
// Ajouter une rotation : déposer l'image dans public/rotations/ puis ajouter
// une entrée ici. L'UI (cartes + zoom plein écran) se génère automatiquement.
const CREDIT = { label: "@Bleached_BSR", url: "https://x.com/Bleached_BSR" };

const ROTATIONS = [
  {
    id: "thrust",
    title: { fr: "Team Thrust", en: "Thrust Team" },
    team: ["grimmjow_pantera", "soifon", "mayuri"],
    teamLabel: "Grimmjow • Soi Fon • Mayuri",
    start: { fr: "Démarrer avec Soi Fon", en: "Start w/ Soi Fon" },
    image: "/rotations/thrust.jpg",
    accent: "#0096c7",
    credit: CREDIT,
  },
  {
    id: "spirit",
    title: { fr: "Team Spirit", en: "Spirit Team" },
    team: ["toshiro", "aizen", "szayelaporro"],
    teamLabel: "Toshiro • Aizen • Szayelaporro",
    start: { fr: "Démarrer avec Toshiro", en: "Start w/ Toshiro" },
    image: "/rotations/spirit.jpg",
    accent: "#9b59b6",
    credit: CREDIT,
  },
];

// ─── LIGHTBOX (zoom plein écran) ─────────────────────────────────────────────
function Lightbox({ src, alt, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.92)", cursor: "zoom-out",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 12, animation: "bsr-fadein 0.2s ease",
        overflow: "auto",
      }}
    >
      <img
        src={src} alt={alt}
        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 8 }}
      />
      <button
        onClick={onClose}
        style={{
          position: "fixed", top: 14, right: 14, width: 40, height: 40,
          borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 18,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        }}
        aria-label="Fermer"
      >✕</button>
    </div>
  );
}

// ─── CARTE DE ROTATION ───────────────────────────────────────────────────────
function RotationCard({ rot, characters, images, t, lang, onZoom }) {
  const [imgErr, setImgErr] = useState(false);
  const members = rot.team
    .map(id => characters?.find(c => c.id === id))
    .filter(Boolean);

  return (
    <div style={{
      background: t.card, backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
      border: `1px solid ${t.cardBorder}`, borderRadius: 18, overflow: "hidden",
      boxShadow: t.shadow, marginBottom: 16, animation: "bsr-fadein 0.4s ease",
    }}>
      {/* En-tête : titre + avatars de la team */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", flexWrap: "wrap" }}>
        <div style={{ display: "flex" }}>
          {members.map((m, i) => (
            <div key={m.id} title={m.name} style={{
              width: 40, height: 40, borderRadius: "50%", overflow: "hidden",
              border: `2px solid ${m.color}`, background: m.gradient,
              marginLeft: i === 0 ? 0 : -10, position: "relative",
            }}>
              {images?.[m.id]
                ? <img src={images[m.id]} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
                : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: 11, fontWeight: 900, color: "rgba(255,255,255,0.5)" }}>{m.initials}</div>}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, minWidth: 140 }}>
          <div style={{ fontFamily: "'Outfit'", fontSize: 16, fontWeight: 900, color: rot.accent, letterSpacing: -0.3 }}>
            {rot.title[lang]}
          </div>
          <div style={{ fontFamily: "'Outfit'", fontSize: 10, color: t.text2, fontWeight: 600, letterSpacing: 0.5 }}>
            {rot.teamLabel}
          </div>
        </div>
        <span style={{
          fontFamily: "'Outfit'", fontSize: 10, fontWeight: 800, padding: "5px 12px",
          borderRadius: 8, background: `${rot.accent}15`, color: rot.accent,
          border: `1px solid ${rot.accent}33`, letterSpacing: 0.5, whiteSpace: "nowrap",
        }}>
          ▶ {rot.start[lang]}
        </span>
      </div>

      {/* Image de la rotation (clic = zoom) */}
      {!imgErr ? (
        <div onClick={() => onZoom(rot)} style={{ cursor: "zoom-in", position: "relative", background: "#000" }}>
          <img
            src={rot.image} alt={`${rot.title[lang]} rotation`}
            onError={() => setImgErr(true)}
            style={{ width: "100%", display: "block" }}
            loading="lazy"
          />
          <div style={{
            position: "absolute", bottom: 8, right: 10, fontFamily: "'Outfit'",
            fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.6)",
            background: "rgba(0,0,0,0.5)", padding: "3px 9px", borderRadius: 6, letterSpacing: 0.5,
          }}>
            🔍 {lang === "fr" ? "Toucher pour agrandir" : "Tap to zoom"}
          </div>
        </div>
      ) : (
        <div style={{ padding: "32px 18px", textAlign: "center", fontFamily: "'Outfit'", fontSize: 12, color: t.text3, fontStyle: "italic" }}>
          {lang === "fr" ? "Image en cours d'ajout…" : "Image coming soon…"}
        </div>
      )}

      {/* Crédit */}
      {rot.credit && (
        <div style={{ padding: "8px 18px", fontFamily: "'Outfit'", fontSize: 9, color: t.text3, fontStyle: "italic" }}>
          {lang === "fr" ? "Source :" : "Source:"}{" "}
          {rot.credit.url
            ? <a href={rot.credit.url} target="_blank" rel="noreferrer" style={{ color: t.text2 }}>{rot.credit.label}</a>
            : rot.credit.label}
        </div>
      )}
    </div>
  );
}

// ─── ONGLET ROTATION ─────────────────────────────────────────────────────────
export default function RotationGuide({ characters, images, t, lang }) {
  const [zoomed, setZoomed] = useState(null);

  return (
    <div style={{ animation: "bsr-fadein 0.4s ease", marginTop: 24 }}>
      <div style={{ fontFamily: "'Outfit'", fontSize: 10, color: t.text3, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 14 }}>
        {lang === "fr" ? "Guides de rotation" : "Rotation guides"}
      </div>

      {ROTATIONS.map(rot => (
        <RotationCard key={rot.id} rot={rot} characters={characters} images={images} t={t} lang={lang} onZoom={setZoomed} />
      ))}

      <div style={{
        fontFamily: "'Outfit'", fontSize: 11, color: "#ff9500", textAlign: "center",
        marginTop: 16, lineHeight: 1.6, padding: "10px 16px", borderRadius: 10,
        background: "rgba(255,149,0,0.07)", border: "1px solid rgba(255,149,0,0.2)",
      }}>
        ⚠️ {lang === "fr"
          ? "Rotations données à titre indicatif — elles peuvent comporter des erreurs."
          : "Rotations are provided as a guideline — they may contain errors."}
      </div>

      <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: t.text3, textAlign: "center", marginTop: 14, fontStyle: "italic", lineHeight: 1.7 }}>
        {lang === "fr"
          ? "D'autres rotations arrivent bientôt (Slash, Strike…)"
          : "More rotations coming soon (Slash, Strike…)"}
      </div>

      {zoomed && <Lightbox src={zoomed.image} alt={zoomed.title[lang]} onClose={() => setZoomed(null)} />}
    </div>
  );
}
