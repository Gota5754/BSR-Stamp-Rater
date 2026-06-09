export default function RotationGuide({ t, lang }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      minHeight: 260, animation: "bsr-fadein 0.4s ease", gap: 14,
    }}>
      <div style={{ fontSize: 48 }}>🔄</div>
      <div style={{
        fontFamily: "'Space Mono', monospace", fontSize: 22, fontWeight: 700,
        color: t.text, letterSpacing: 1,
      }}>
        Work in Progress
      </div>
      <div style={{
        fontFamily: "'Outfit'", fontSize: 13, color: t.text3,
        textAlign: "center", maxWidth: 340, lineHeight: 1.7,
      }}>
        {lang === "fr"
          ? "Les guides de rotation arrivent bientôt. Revenez plus tard !"
          : "Rotation guides are coming soon. Check back later!"}
      </div>
    </div>
  );
}
