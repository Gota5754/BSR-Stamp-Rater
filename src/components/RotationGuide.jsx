export default function RotationGuide({ L }) {
  return (
    <div className="fadein" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 260, gap: 14 }}>
      <div style={{ fontSize: 48 }}>🔄</div>
      <div className="mono" style={{ fontSize: 22, fontWeight: 700, letterSpacing: 1 }}>Work in Progress</div>
      <div style={{ fontSize: 13, color: "var(--text3)", textAlign: "center", maxWidth: 340, lineHeight: 1.7 }}>
        {L.rotation_wip}
      </div>
    </div>
  );
}
