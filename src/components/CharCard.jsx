import { useState } from "react";

export default function CharCard({ character, isActive, onClick, imgUrl }) {
  const [imgErr, setImgErr] = useState(false);
  const hasImg = imgUrl && !imgErr;
  return (
    <div
      className={`char-card ${isActive ? "active" : ""}`}
      onClick={onClick}
      style={{ background: character.gradient, "--cc": character.color }}
    >
      {hasImg
        ? <img src={imgUrl} alt={character.name} onError={() => setImgErr(true)} loading="lazy" />
        : <div className="initials">{character.initials}</div>}
      <div className="scrim" />
      <div className="rarity-badge">{character.rarity}</div>
      <div className="meta">
        <div className="name">{character.name}</div>
        <span className="set">{character.set_bis}</span>
      </div>
      {isActive && (
        <div className="check">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
      )}
    </div>
  );
}
