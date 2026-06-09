import { getRank } from "../lib/scoring.js";

export default function ScoreRing({ score, size = 140 }) {
  const { rank, color, glow } = getRank(score);
  const r = (size - 14) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="fadein" style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)", position: "absolute" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--div)" strokeWidth="7" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="7" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1), stroke 0.4s" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span className="mono" style={{ fontSize: size * 0.3, fontWeight: 700, color, lineHeight: 1 }}>{score}</span>
        <span style={{ fontSize: 9, color: "var(--text3)", letterSpacing: 2, marginTop: 1 }}>/ 100</span>
        <span className="mono" style={{ fontSize: size * 0.16, fontWeight: 700, color, letterSpacing: 5, marginTop: 6, textShadow: glow }}>{rank}</span>
      </div>
    </div>
  );
}
