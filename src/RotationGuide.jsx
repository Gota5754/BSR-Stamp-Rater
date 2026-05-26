import { useState } from "react";

// ─── ROTATION DATA ───────────────────────────────────────────────────────────
// Compléter / modifier les rotations ici par personnage
const ROTATIONS = {
  ichigo_bankai: {
    steps: [
      { key: "s2",  icon: "⚡", name: { fr: "Compétence 2",      en: "Skill 2"         }, tip: { fr: "Setup initial — applique un debuff de résistance réduite", en: "Initial setup — applies resistance reduction debuff"       } },
      { key: "s1",  icon: "⚔️", name: { fr: "Getsuga Tenshō",    en: "Getsuga Tensho"  }, tip: { fr: "DPS principal — lancer en fenêtre de dégâts maximaux",    en: "Main DPS — use during peak damage window"                 } },
      { key: "atk", icon: "👊", name: { fr: "Attaques normales",  en: "Normal Attacks"  }, tip: { fr: "Remplir les cooldowns et recharger l'ultime",              en: "Fill cooldowns and charge ultimate"                       } },
      { key: "ult", icon: "🌑", name: { fr: "Ultime",             en: "Ultimate"        }, tip: { fr: "Conserver pour le pic de burst groupé",                   en: "Save for grouped burst window"                            } },
    ],
    notes: { fr: "Spirit Surge : au-delà de 100% Crit Rate, chaque 1% → 2% Crit DMG. Priorité au burst groupé.", en: "Spirit Surge: above 100% Crit Rate, every 1% → 2% Crit DMG. Focus grouped burst." },
  },
  kisuke: {
    steps: [
      { key: "ult", icon: "✨", name: { fr: "Ultime (opener)",    en: "Ultimate (opener)" }, tip: { fr: "Ouvrir avec l'ultime pour activer les stacks Kido Master",  en: "Open with ultimate to activate Kido Master stacks"   } },
      { key: "s1",  icon: "🔬", name: { fr: "Compétence 1",       en: "Skill 1"           }, tip: { fr: "Lance le combo s1 → s2",                                  en: "Starts skill 1 → skill 2 combo"                      } },
      { key: "s2",  icon: "💡", name: { fr: "Compétence 2",       en: "Skill 2"           }, tip: { fr: "Enchaîner immédiatement après s1 pour le burst",           en: "Chain immediately after s1 for burst"                } },
      { key: "atk", icon: "👊", name: { fr: "Attaques normales",  en: "Normal Attacks"    }, tip: { fr: "Maintenir la pression, recharger l'ultime rapidement",    en: "Maintain pressure, recharge ultimate fast"           } },
    ],
    notes: { fr: "Passif recommandé : 3× Invigorate. Ultime fréquent = clé du DPS. UCR prioritaire.", en: "Recommended passive: 3× Invigorate. Frequent ultimates = DPS key. UCR is priority." },
  },
  aizen: {
    steps: [
      { key: "s1",  icon: "🌀", name: { fr: "Compétence 1",       en: "Skill 1"    }, tip: { fr: "Applique le debuff de réduction de résistance",    en: "Applies resistance reduction debuff"   } },
      { key: "s2",  icon: "👁️", name: { fr: "Compétence 2 (AoE)", en: "Skill 2 (AoE)" }, tip: { fr: "AoE — optimal contre groupes, setup avant l'ultime", en: "AoE — optimal vs groups, setup before ult" } },
      { key: "ult", icon: "🌙", name: { fr: "Ultime",             en: "Ultimate"   }, tip: { fr: "Burst massif — toujours après les debuffs actifs",  en: "Massive burst — always after active debuffs" } },
    ],
    notes: { fr: "Avec B6 : Crit DMG prioritaire devant Crit Rate. Maintenir les debuffs en permanence pour maximiser l'ultime.", en: "With B6: Crit DMG takes priority over Crit Rate. Keep debuffs active at all times to maximize ultimate." },
  },
  yoruichi: {
    steps: [
      { key: "s1",  icon: "⚡", name: { fr: "Compétence 1",      en: "Skill 1"       }, tip: { fr: "Dash d'engagement + dégâts immédiats — toujours en premier", en: "Engage dash + immediate damage — always first" } },
      { key: "s2",  icon: "🐆", name: { fr: "Compétence 2",      en: "Skill 2"       }, tip: { fr: "Cooldown court — utiliser aussi souvent que possible",       en: "Short cooldown — use as often as possible"     } },
      { key: "ult", icon: "🌩️", name: { fr: "Ultime",            en: "Ultimate"      }, tip: { fr: "Multi-hits — très efficace avec Crit Rate élevé",           en: "Multi-hit — very effective with high Crit Rate" } },
      { key: "atk", icon: "👊", name: { fr: "Attaques normales", en: "Normal Attacks" }, tip: { fr: "Générer UCR entre les skills",                              en: "Generate UCR between skills"                   } },
    ],
    notes: { fr: "Mobile fighter — maximiser la mobilité et les enchaînements rapides. UCR + Crit Rate en priorité.", en: "Mobile fighter — maximize mobility and fast chaining. UCR + Crit Rate as priority." },
  },
  nelliel: {
    steps: [
      { key: "s2",  icon: "🍃", name: { fr: "Compétence 2",      en: "Skill 2"       }, tip: { fr: "Setup Crit Rate via Dead Aim (Lv3)",                  en: "Set up Crit Rate via Dead Aim (Lv3)"         } },
      { key: "s1",  icon: "🐉", name: { fr: "Compétence 1",      en: "Skill 1"       }, tip: { fr: "Recharge rapide — spam pour accumuler les stacks Ailment", en: "Fast recharge — spam for Ailment stacks" } },
      { key: "ult", icon: "💫", name: { fr: "Ultime",            en: "Ultimate"      }, tip: { fr: "Déclencher après accumulation des stacks pour burst max",  en: "Trigger after stacks for max burst"         } },
    ],
    notes: { fr: "B2 : +80% Crit DMG — ajuster les poids (Crit Rate prioritaire). B4 : Crit DMG repasse devant. Ailment stacking recommandé.", en: "B2: +80% Crit DMG — adjust weights (Crit Rate priority). B4: Crit DMG takes lead again. Ailment stacking recommended." },
  },
  gin: {
    steps: [
      { key: "s1",  icon: "🌸", name: { fr: "Compétence 1",     en: "Skill 1"  }, tip: { fr: "Applique le poison/ailment — setup Lethal Dose",          en: "Applies poison/ailment — sets up Lethal Dose"     } },
      { key: "s2",  icon: "⚡", name: { fr: "Compétence 2",     en: "Skill 2"  }, tip: { fr: "Burst après 2 triggers de Lethal Dose pour Crit Rate +30%", en: "Burst after 2 Lethal Dose triggers for +30% Crit Rate" } },
      { key: "ult", icon: "☠️", name: { fr: "Ultime",           en: "Ultimate" }, tip: { fr: "Utiliser quand Lethal Dose est actif pour dégâts max",      en: "Use when Lethal Dose is active for max damage"     } },
    ],
    notes: { fr: "Lethal Dose se déclenche 2 fois avant le bonus Crit Rate. Tracker les triggers. Si Ailment ≥ 80% : ATK % > Ailment Bonus.", en: "Lethal Dose triggers 2 times before the Crit Rate bonus. Track triggers carefully. If Ailment ≥ 80%: ATK % > Ailment Bonus." },
  },
  byakuya: {
    steps: [
      { key: "s1",  icon: "🌸", name: { fr: "Compétence 1",     en: "Skill 1"       }, tip: { fr: "Pluie de pétales — DPS continu",                        en: "Petal rain — continuous DPS"                  } },
      { key: "s2",  icon: "❄️", name: { fr: "Compétence 2",     en: "Skill 2"       }, tip: { fr: "Setup et dégâts secondaires",                           en: "Setup and secondary damage"                   } },
      { key: "ult", icon: "💮", name: { fr: "Ultime",           en: "Ultimate"      }, tip: { fr: "Burst principal — après activation B1 DPS mode",        en: "Main burst — after B1 DPS mode activation"    } },
      { key: "atk", icon: "👊", name: { fr: "Attaques normales", en: "Normal Attacks" }, tip: { fr: "Recharge et pression continue",                        en: "Recharge and continuous pressure"             } },
    ],
    notes: { fr: "B1 DPS mode : ATK % augmente (0.8 → priorité plus haute). Garder l'ultime pour le burst window.", en: "B1 DPS mode: ATK % increases in priority. Save ultimate for burst window." },
  },
  toshiro: {
    steps: [
      { key: "s2",  icon: "❄️", name: { fr: "Compétence 2",      en: "Skill 2"      }, tip: { fr: "Gel / crowd control — ouvrir avec cette compétence",    en: "Freeze / crowd control — open with this skill"  } },
      { key: "s1",  icon: "🌊", name: { fr: "Compétence 1",      en: "Skill 1"      }, tip: { fr: "Dégâts Spirit principaux",                              en: "Main Spirit damage"                             } },
      { key: "ult", icon: "🏔️", name: { fr: "Ultime",            en: "Ultimate"     }, tip: { fr: "AoE glaciale massive — utiliser après setup gel",        en: "Massive ice AoE — use after freeze setup"       } },
    ],
    notes: { fr: "B2 : Crit DMG prioritaire (nouveau poids 1.0). Excellent contre les groupes gelés.", en: "B2: Crit DMG becomes priority (weight 1.0). Excellent vs frozen groups." },
  },
  kenpachi: {
    steps: [
      { key: "s1",  icon: "🗡️", name: { fr: "Compétence 1",      en: "Skill 1"      }, tip: { fr: "Attaque puissante — priorité dès disponible",           en: "Powerful attack — priority when available"      } },
      { key: "s2",  icon: "💢", name: { fr: "Compétence 2",      en: "Skill 2"      }, tip: { fr: "Applique Saignement (Ailment) pour bonus de dégâts",    en: "Applies Bleed (Ailment) for damage bonus"       } },
      { key: "ult", icon: "🔥", name: { fr: "Ultime",            en: "Ultimate"     }, tip: { fr: "Burst massif — utiliser en état de rage",               en: "Massive burst — use while enraged"              } },
      { key: "atk", icon: "👊", name: { fr: "Attaques normales", en: "Normal Attacks" }, tip: { fr: "Pression constante — Kenpachi récompense l'agression", en: "Constant pressure — Kenpachi rewards aggression" } },
    ],
    notes: { fr: "Avec B2 : UCR devient moins prioritaire. Ailment (Saignement) à maintenir en permanence.", en: "With B2: UCR becomes less priority. Keep Bleed Ailment active at all times." },
  },
  tosen: {
    steps: [
      { key: "s1",  icon: "🎵", name: { fr: "Compétence 1 (Wound)", en: "Skill 1 (Wound)" }, tip: { fr: "Applique Wound — ne pas laisser expirer",              en: "Applies Wound — do not let it expire"          } },
      { key: "s2",  icon: "⚖️", name: { fr: "Compétence 2",         en: "Skill 2"          }, tip: { fr: "Burst en combo avec Wound actif",                     en: "Burst combo with Wound active"                 } },
      { key: "ult", icon: "🌑", name: { fr: "Ultime",               en: "Ultimate"         }, tip: { fr: "Utiliser quand les stacks sont maximaux",             en: "Use when stacks are at maximum"                } },
    ],
    notes: { fr: "B1 Wound retain : ATK % prioritaire (0.9 → 1.0). Maintenir Wound en permanence pour le DPS optimal.", en: "B1 Wound retain: ATK % becomes priority (0.9 → 1.0). Keep Wound active permanently for optimal DPS." },
  },
  ikkaku: {
    steps: [
      { key: "s1",  icon: "🔱", name: { fr: "Compétence 1",      en: "Skill 1"       }, tip: { fr: "DPS principal — utiliser en priorité",                 en: "Main DPS — use as priority"                   } },
      { key: "s2",  icon: "💥", name: { fr: "Compétence 2",      en: "Skill 2"       }, tip: { fr: "Inflige Saignement + dégâts",                          en: "Inflicts Bleed + damage"                      } },
      { key: "ult", icon: "⚡", name: { fr: "Ultime",            en: "Ultimate"      }, tip: { fr: "UCR prioritaire — spammer l'ultime fréquemment",       en: "UCR priority — spam ultimate frequently"      } },
      { key: "atk", icon: "👊", name: { fr: "Attaques normales", en: "Normal Attacks" }, tip: { fr: "Maintenir pression et recharger",                      en: "Maintain pressure and recharge"               } },
    ],
    notes: { fr: "B1 Bleed+ : Ailment Bonus passe à 0.6. UCR crucial pour boucler l'ultime. Conseil : ne pas 6★ si ressources limitées.", en: "B1 Bleed+: Ailment Bonus rises to 0.6. UCR crucial for ultimate loop. Tip: don't 6★ if resources are limited." },
  },
  komamura: {
    steps: [
      { key: "s1",  icon: "🐺", name: { fr: "Compétence 1",      en: "Skill 1"       }, tip: { fr: "Attaque puissante — DPS principal",                    en: "Powerful attack — main DPS"                   } },
      { key: "s2",  icon: "🛡️", name: { fr: "Compétence 2",      en: "Skill 2"       }, tip: { fr: "Dégâts et éventuel support défensif",                  en: "Damage and possible defensive support"        } },
      { key: "ult", icon: "⚡", name: { fr: "Ultime",            en: "Ultimate"      }, tip: { fr: "Burst massif — UCR pour boucler fréquemment",          en: "Massive burst — UCR to loop frequently"       } },
    ],
    notes: { fr: "B1 : Réduction Strike RES ennemie — ATK % légèrement moins prioritaire. Conseil : ne pas 6★ si ressources limitées.", en: "B1: Enemy Strike RES reduction — ATK % slightly less priority. Tip: don't 6★ if resources are limited." },
  },
  mayuri: {
    steps: [
      { key: "s1",  icon: "🧪", name: { fr: "Compétence 1",      en: "Skill 1"       }, tip: { fr: "Applique poison/ailment — spam pour accumulation",      en: "Applies poison/ailment — spam for accumulation" } },
      { key: "s2",  icon: "🔬", name: { fr: "Compétence 2",      en: "Skill 2"       }, tip: { fr: "Dégâts Ailment amplifiés",                             en: "Amplified Ailment damage"                      } },
      { key: "ult", icon: "⚗️", name: { fr: "Ultime",            en: "Ultimate"      }, tip: { fr: "UCR prioritaire — dépasser 250% pour le cap",          en: "UCR priority — exceed 250% for cap"            } },
    ],
    notes: { fr: "UCR cap à 250% — au-delà, UCR poids → 0. Crit Rate et Crit DMG inutiles. Focus Ailment + UCR.", en: "UCR cap at 250% — beyond that, UCR weight → 0. Crit Rate and Crit DMG are useless. Focus Ailment + UCR." },
  },
};

const PLACEHOLDER_ROTATION = {
  steps: [
    { key: "s1",  icon: "⚔️", name: { fr: "Compétence 1",      en: "Skill 1"       }, tip: { fr: "Utiliser en priorité dès que disponible",               en: "Priority use as soon as available"           } },
    { key: "s2",  icon: "💥", name: { fr: "Compétence 2",      en: "Skill 2"       }, tip: { fr: "Enchaîner après skill 1 pour maximiser les dégâts",     en: "Chain after skill 1 to maximize damage"      } },
    { key: "ult", icon: "✨", name: { fr: "Ultime",            en: "Ultimate"      }, tip: { fr: "Réserver pour les phases de burst maximum",             en: "Reserve for maximum burst phases"            } },
  ],
  notes: { fr: "Guide générique — les données spécifiques seront ajoutées prochainement.", en: "Generic guide — specific data will be added soon." },
};

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function RotationGuide({ characters, images, t, lang }) {
  const [charId, setCharId] = useState("");
  const char        = characters.find(c => c.id === charId);
  const rotation    = charId ? (ROTATIONS[charId] || PLACEHOLDER_ROTATION) : null;
  const isPlaceholder = charId && !ROTATIONS[charId];

  return (
    <div style={{ animation: "bsr-fadein 0.4s ease" }}>
      {/* Character selector */}
      <div style={{ position: "relative", marginBottom: 20 }}>
        <select
          value={charId}
          onChange={e => setCharId(e.target.value)}
          style={{
            width: "100%", background: t.input, border: `1px solid ${t.cardBorder}`,
            borderRadius: 10, padding: "10px 34px 10px 12px",
            color: charId ? t.text : t.text3, fontSize: 13,
            outline: "none", cursor: "pointer", appearance: "none",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          <option value="">{lang === "fr" ? "— Choisir un personnage —" : "— Select a character —"}</option>
          {characters.filter(c => !c.coming_soon).map(c => (
            <option key={c.id} value={c.id}>{c.name} {c.rarity === "SR" ? "(SR)" : ""}</option>
          ))}
        </select>
        <div style={{ position: "absolute", right: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: t.text3 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
        </div>
      </div>

      {!charId && (
        <div style={{ textAlign: "center", padding: "40px 0", color: t.text3, fontFamily: "'Outfit'", fontSize: 13 }}>
          {lang === "fr" ? "Choisissez un personnage pour voir sa rotation" : "Select a character to see their rotation"}
        </div>
      )}

      {char && rotation && (
        <div style={{ animation: "bsr-fadein 0.4s ease" }}>
          {/* Character banner */}
          <div style={{
            display: "flex", alignItems: "center", gap: 14,
            padding: "14px 18px", background: t.card,
            border: `1px solid ${char.color}22`, borderRadius: 14,
            marginBottom: 20, backdropFilter: "blur(24px)",
          }}>
            <div style={{ width: 48, height: 48, borderRadius: 10, overflow: "hidden", border: `2px solid ${char.color}55`, background: char.gradient, flexShrink: 0 }}>
              {images[charId]
                ? <img src={images[charId]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
                : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontWeight: 900, color: "rgba(255,255,255,0.3)", fontSize: 14 }}>{char.initials}</div>
              }
            </div>
            <div>
              <div style={{ fontFamily: "'Outfit'", fontSize: 18, fontWeight: 900, color: char.color }}>{char.name}</div>
              <div style={{ fontFamily: "'Outfit'", fontSize: 10, color: t.text3, marginTop: 2 }}>
                {lang === "fr" ? "Rotation optimale" : "Optimal rotation"}
              </div>
            </div>
          </div>

          {isPlaceholder && (
            <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: "#ff9500", background: "rgba(255,149,0,0.08)", border: "1px solid rgba(255,149,0,0.2)", borderRadius: 8, padding: "8px 12px", marginBottom: 16 }}>
              {lang === "fr" ? "⚠ Guide générique — données spécifiques à venir" : "⚠ Generic guide — specific data coming soon"}
            </div>
          )}

          {/* Step sequence */}
          <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 16, padding: 20, backdropFilter: "blur(24px)", marginBottom: 16 }}>
            <div style={{ fontFamily: "'Outfit'", fontSize: 10, color: t.text3, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 16 }}>
              {lang === "fr" ? "Séquence" : "Sequence"}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {rotation.steps.map((step, i) => (
                <div key={step.key} style={{ display: "flex", alignItems: "flex-start", gap: 12, animation: `bsr-fadein 0.3s ease ${i * 0.07}s both` }}>
                  {/* Step number */}
                  <div style={{
                    width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                    background: `${char.color}20`, border: `1px solid ${char.color}44`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, color: char.color,
                  }}>
                    {i + 1}
                  </div>
                  {/* Skill icon */}
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: `${char.color}15`, border: `1px solid ${char.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                  }}>
                    {step.icon}
                  </div>
                  {/* Info */}
                  <div style={{ flex: 1, paddingTop: 2 }}>
                    <div style={{ fontFamily: "'Outfit'", fontSize: 13, fontWeight: 700, color: t.text }}>{step.name[lang]}</div>
                    <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: t.text3, marginTop: 2, lineHeight: 1.5 }}>{step.tip[lang]}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {rotation.notes && (
            <div style={{ background: `${char.color}08`, border: `1px solid ${char.color}22`, borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ fontFamily: "'Outfit'", fontSize: 10, color: char.color, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6 }}>
                💡 {lang === "fr" ? "Notes" : "Notes"}
              </div>
              <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: t.text2, lineHeight: 1.7 }}>{rotation.notes[lang]}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
