import { useEffect, useState } from "react";
import { LANG } from "./i18n.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { useCharacterImages } from "./hooks/useCharacterImages.js";
import { CHARACTERS } from "./data/characters.js";
import StampRater from "./components/StampRater.jsx";
import TierList from "./components/TierList.jsx";
import ResourceCalc from "./components/ResourceCalc.jsx";
import RotationGuide from "./components/RotationGuide.jsx";

const TABS = [
  { id: "rater", icon: "⚔️" },
  { id: "tierlist", icon: "📊" },
  { id: "resources", icon: "🎯" },
  { id: "rotation", icon: "🔄" },
];

export default function App() {
  const [theme, setTheme] = useLocalStorage("bsr-theme", "dark");
  const [lang, setLang] = useLocalStorage("bsr-lang", "fr");
  const [activeTab, setActiveTab] = useState("rater");
  const [glowColor, setGlowColor] = useState(null);
  const images = useCharacterImages();
  const L = LANG[lang];

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Expose la couleur du perso sélectionné aux enfants via un événement simple
  useEffect(() => {
    const handler = e => {
      const ch = CHARACTERS.find(c => c.id === e.detail);
      setGlowColor(ch ? ch.color : null);
    };
    window.addEventListener("bsr:char", handler);
    return () => window.removeEventListener("bsr:char", handler);
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      {glowColor && <div className="glow" style={{ background: `radial-gradient(ellipse, ${glowColor}06, transparent 70%)` }} />}
      <div className="container">
        <div className="header">
          <div>
            <div className="kicker">Bleach: Soul Resonance</div>
            <h1>BSR Toolkit</h1>
          </div>
          <div className="header-btns">
            <button className="icon-btn" onClick={() => setLang(l => (l === "fr" ? "en" : "fr"))} title="Langue / Language">
              {lang === "fr" ? "🇫🇷" : "🇬🇧"}
            </button>
            <button className="icon-btn" onClick={() => setTheme(m => (m === "dark" ? "light" : "dark"))} title="Theme">
              {theme === "dark" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>

        <div className="tabs">
          {TABS.map(tab => (
            <button key={tab.id} className={activeTab === tab.id ? "active" : ""} onClick={() => setActiveTab(tab.id)}>
              {tab.icon} {L.tabs[tab.id]}
            </button>
          ))}
        </div>

        {activeTab === "rater" && <StampRater images={images} L={L} lang={lang} />}
        {activeTab === "tierlist" && <TierList images={images} L={L} />}
        {activeTab === "resources" && <ResourceCalc L={L} />}
        {activeTab === "rotation" && <RotationGuide L={L} />}

        <div className="footer">
          <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 10 }}>{L.support_footer}</div>
          <div style={{ fontSize: 9, color: "var(--text3)", letterSpacing: 2 }}>BSR TOOLKIT v2.0 — FAN-MADE TOOL</div>
        </div>
      </div>
    </div>
  );
}
