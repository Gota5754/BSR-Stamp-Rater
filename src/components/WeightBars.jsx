export default function WeightBars({ weights, color }) {
  const max = Math.max(...Object.values(weights), 0.0001);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {Object.entries(weights).sort(([, a], [, b]) => b - a).map(([stat, w]) => (
        <div key={stat} className="wbar">
          <span className={`stat ${w > 0 ? "" : "dead"}`}>{stat}</span>
          <div className="track">
            <div className="fill" style={{
              width: `${(w / max) * 100}%`,
              background: w >= 0.9 ? color : w >= 0.7 ? `${color}aa` : w > 0 ? `${color}55` : "transparent",
            }} />
          </div>
          <span className="mono val" style={{ color: w > 0 ? "var(--text)" : "var(--text3)" }}>{w}</span>
        </div>
      ))}
    </div>
  );
}
