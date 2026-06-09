// ─── CHARACTER DATA ──────────────────────────────────────────────────────
// Poids des substats, main stats recommandées, overrides de Boundary
// Ascension, niveaux d'arme (A1-A5) et de passif. Modifier ici pour
// ajuster le scoring — l'UI se met à jour automatiquement.

export const CHARACTERS = [
  {
    id: "ichigo_bankai", rarity: "SSR", name: "Ichigo Kurosaki (Bankai)", subtitle: null, set_bis: "Rising Black Moon / Ready to Go", initials: "IC",
    color: "#ff6a00", gradient: "linear-gradient(135deg, #ff6a00, #ee0979)", mal_id: 5,
    recommended_main_stats: { piece_1: ["Slash DMG %", "ATK %"], piece_2: ["Crit Rate %", "Crit DMG %"], piece_3: ["ATK %"] },
    weights: { "Crit Rate %": 1.0, "Crit DMG %": 1.0, "Ultimate Charge Rate %": 0.4, "ATK %": 0.8, "ATK": 0.4, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0, "Ailment Bonus %": 0 },
    core_stamp: "Getsuga Tangle", weapon_stamp: "Rising Black Moon",
    overrides: null
  },
  {
    id: "kisuke", rarity: "SSR", name: "Kisuke Urahara", subtitle: null, set_bis: "Hidden Wisdom / Ready to Go", initials: "KU",
    color: "#2ecc71", gradient: "linear-gradient(135deg, #2ecc71, #1a5c34)", mal_id: 36,
    recommended_main_stats: { piece_1: ["Slash DMG %", "ATK %"], piece_2: ["Crit DMG %"], piece_3: ["Ultimate Charge Rate %"] },
    weights: { "Ultimate Charge Rate %": 1.0, "Crit DMG %": 1.0, "Crit Rate %": 0.6, "ATK %": 0.6, "ATK": 0.2, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0, "Ailment Bonus %": 0 },
    core_stamp: "Reishi Analysis", weapon_stamp: "Hidden Wisdom",
    overrides: null
  },
  {
    id: "byakuya", rarity: "SSR", name: "Byakuya Kuchiki", subtitle: null, set_bis: "Blooming Sakura", initials: "BY",
    color: "#e891cf", gradient: "linear-gradient(135deg, #e891cf, #8e44ad)", mal_id: 24,
    recommended_main_stats: { piece_1: ["Slash DMG %", "ATK %"], piece_2: ["Crit Rate %", "Crit DMG %"], piece_3: ["Ultimate Charge Rate %"] },
    weights: { "Ultimate Charge Rate %": 1.0, "Crit Rate %": 0.8, "Crit DMG %": 0.8, "ATK %": 0.6, "ATK": 0.4, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0, "Ailment Bonus %": 0 },
    core_stamp: "Thousand Blade Funeral", weapon_stamp: "Blooming Sakura",
    overrides: [{ id: "b1_active", label: "B1 (DPS mode)", changes: { "ATK %": 0.8, "Crit Rate %": 0.9 } }]
  },
  {
    id: "kenpachi", rarity: "SSR", name: "Kenpachi Zaraki", subtitle: null, set_bis: "Ready to Go", initials: "KZ",
    color: "#f1c40f", gradient: "linear-gradient(135deg, #f1c40f, #c0392b)", mal_id: 35,
    recommended_main_stats: { piece_1: ["Slash DMG %", "ATK %"], piece_2: ["Crit Rate %", "Crit DMG %"], piece_3: ["Ultimate Charge Rate %", "Ailment DMG Bonus %"] },
    weights: { "Crit Rate %": 1.0, "Crit DMG %": 1.0, "Ailment Bonus %": 0.8, "ATK %": 0.6, "Ultimate Charge Rate %": 0.5, "ATK": 0.4, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0 },
    core_stamp: "Savage Cleave", weapon_stamp: "Ready to Go",
    overrides: [{ id: "ucr_useless", label: "B2 activé", changes: { "Ultimate Charge Rate %": 0.4 }, rec_override: { piece_3: ["Ailment DMG Bonus %"] } }]
  },
  {
    id: "toshiro", rarity: "SSR", name: "Toshiro Hitsugaya", subtitle: null, set_bis: "Ready to Go", initials: "TH",
    color: "#74d4f0", gradient: "linear-gradient(135deg, #74d4f0, #2980b9)", mal_id: 28,
    recommended_main_stats: { piece_1: ["Spirit DMG %", "ATK %"], piece_2: ["Crit Rate %", "Crit DMG %"], piece_3: ["ATK %"] },
    weights: { "Crit Rate %": 1.0, "Crit DMG %": 1.0, "ATK %": 0.8, "Ultimate Charge Rate %": 0.6, "ATK": 0.4, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0, "Ailment Bonus %": 0 },
    core_stamp: "Ice Dragon Reign", weapon_stamp: "World Conquest",
    overrides: [
      { id: "b2_active", label: "B2", changes: { "Crit Rate %": 0.4, "Crit DMG %": 1.0 } },
      { id: "b2_a5", label: "B2 + A5", changes: { "Crit Rate %": 0, "Crit DMG %": 1.0, "Ultimate Charge Rate %": 0.9, "ATK %": 0.85, "ATK": 0.7 } },
    ]
  },
  {
    id: "aizen", rarity: "SSR", name: "Sosuke Aizen", subtitle: null, set_bis: "Immeasurable Gap", initials: "SA",
    color: "#9b59b6", gradient: "linear-gradient(135deg, #9b59b6, #2c3e50)", mal_id: 32,
    recommended_main_stats: { piece_1: ["Spirit DMG %", "ATK %"], piece_2: ["Crit Rate %", "Crit DMG %"], piece_3: ["ATK %"] },
    weights: { "Crit Rate %": 1.0, "Crit DMG %": 1.0, "ATK %": 0.8, "Ultimate Charge Rate %": 0.3, "ATK": 0.4, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0, "Ailment Bonus %": 0 },
    core_stamp: "Before We Realized", weapon_stamp: "Immeasurable Gap",
    overrides: [{ id: "b6_active", label: "B6 activé (Crit ×2)", changes: { "Crit Rate %": 0.9, "Crit DMG %": 1.0 }, rec_override: { piece_2: ["Crit DMG %"] } }]
  },
  {
    id: "gin", rarity: "SSR", name: "Gin Ichimaru", subtitle: null, set_bis: "Mocking Visage", initials: "GI",
    color: "#bdc3c7", gradient: "linear-gradient(135deg, #bdc3c7, #5d6d7e)", mal_id: 34,
    recommended_main_stats: { piece_1: ["Thrust DMG %", "ATK %"], piece_2: ["Crit Rate %", "Crit DMG %"], piece_3: ["Ailment DMG Bonus %", "ATK %"] },
    weights: { "Crit Rate %": 1.0, "Crit DMG %": 1.0, "Ailment Bonus %": 0.8, "ATK %": 0.7, "Ultimate Charge Rate %": 0.4, "ATK": 0.4, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0 },
    core_stamp: "Deadly Venom", weapon_stamp: "Mocking Visage",
    overrides: [{ id: "ailment_cap", label: "Ailment ≥ 80%", changes: { "Ailment Bonus %": 0.4, "ATK %": 0.8 } }]
  },
  {
    id: "nelliel", rarity: "SSR", name: "Nelliel", subtitle: "Tu Odelschwanck", set_bis: "Knight's Anthem", initials: "NE",
    color: "#1abc9c", gradient: "linear-gradient(135deg, #1abc9c, #16a085)", mal_id: 2512,
    recommended_main_stats: { piece_1: ["ATK %", "Thrust DMG %"], piece_2: ["Crit Rate %", "Crit DMG %"], piece_3: ["ATK %", "Ultimate Charge Rate %"] },
    weights: { "Crit Rate %": 1.0, "Crit DMG %": 0.9, "Ailment Bonus %": 0.8, "ATK %": 0.6, "Ultimate Charge Rate %": 0.6, "ATK": 0.4, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0 },
    core_stamp: "Impale Scale", weapon_stamp: "Knight's Anthem",
    overrides: [
      { id: "b2_active", label: "B2 (80% Crit DMG)", changes: { "Crit DMG %": 0.8, "Crit Rate %": 1.0 } },
      { id: "b4_active", label: "B4 (+20% Crit Rate)", changes: { "Crit Rate %": 0.8, "Crit DMG %": 1.0 } }
    ]
  },
  {
    id: "ikkaku", rarity: "SSR", name: "Ikkaku Madarame", subtitle: null, set_bis: "Unyielding Light", initials: "IM",
    color: "#e74c3c", gradient: "linear-gradient(135deg, #e74c3c, #c0392b)", mal_id: 38,
    recommended_main_stats: { piece_1: ["Thrust DMG %", "ATK %"], piece_2: ["Crit Rate %", "Crit DMG %"], piece_3: ["Ultimate Charge Rate %", "Ailment DMG Bonus %"] },
    weights: { "Crit Rate %": 1.0, "Crit DMG %": 1.0, "Ultimate Charge Rate %": 0.8, "ATK %": 0.6, "Ailment Bonus %": 0.4, "ATK": 0.4, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0 },
    core_stamp: "Dragon Crest", weapon_stamp: "Unyielding Light",
    overrides: [{ id: "b1_active", label: "B1 (Bleed+)", changes: { "Ailment Bonus %": 0.6 } }]
  },
  {
    id: "tosen", rarity: "SSR", name: "Kaname Tosen", subtitle: null, set_bis: "Mocking Visage", initials: "KT",
    color: "#8e44ad", gradient: "linear-gradient(135deg, #8e44ad, #2c3e50)", mal_id: 47,
    recommended_main_stats: { piece_1: ["Thrust DMG %", "ATK %"], piece_2: ["Crit Rate %", "Crit DMG %"], piece_3: ["Ailment DMG Bonus %", "ATK %", "Ultimate Charge Rate %"] },
    weights: { "ATK %": 1.0, "Crit Rate %": 0.8, "Crit DMG %": 0.8, "ATK": 0.4, "Ultimate Charge Rate %": 0.4, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0, "Ailment Bonus %": 0 },
    core_stamp: "Wound Settlement", weapon_stamp: "Mocking Visage",
    overrides: [{ id: "b1_active", label: "B1 (Wound retain)", changes: { "ATK %": 1.0, "Crit Rate %": 0.9 } }]
  },
  {
    id: "yoruichi", rarity: "SSR", name: "Yoruichi Shihoin", subtitle: "Flash Goddess", set_bis: "Shadow in Still Night / Ready to Go", initials: "YS",
    color: "#d4a017", gradient: "linear-gradient(135deg, #d4a017, #6c3483)", mal_id: 30,
    recommended_main_stats: { piece_1: ["Strike DMG %", "ATK %"], piece_2: ["Crit Rate %", "Crit DMG %"], piece_3: ["Ultimate Charge Rate %"] },
    weights: { "Crit Rate %": 1.0, "Crit DMG %": 1.0, "Ultimate Charge Rate %": 0.8, "ATK %": 0.6, "ATK": 0.4, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0, "Ailment Bonus %": 0 },
    core_stamp: "Lightning Seal", weapon_stamp: "Shadow in Still Night",
    overrides: null
  },
  {
    id: "komamura", rarity: "SSR", name: "Sajin Komamura", subtitle: null, set_bis: "Inner Fang", initials: "SK",
    color: "#b8860b", gradient: "linear-gradient(135deg, #b8860b, #8b4513)", mal_id: 29,
    recommended_main_stats: { piece_1: ["Strike DMG %", "ATK %"], piece_2: ["Crit Rate %", "Crit DMG %"], piece_3: ["Ultimate Charge Rate %"] },
    weights: { "Crit Rate %": 1.0, "Crit DMG %": 1.0, "Ultimate Charge Rate %": 0.8, "ATK %": 0.6, "ATK": 0.4, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0, "Ailment Bonus %": 0 },
    core_stamp: "Build Up", weapon_stamp: "Inner Fang",
    overrides: [{ id: "b1_active", label: "B1 (Strike RES↓)", changes: { "ATK %": 0.8 } }]
  },
  {
    id: "mayuri", rarity: "SSR", name: "Mayuri Kurotsuchi", subtitle: null, set_bis: "Sample Collection", initials: "MK",
    color: "#6c3baa", gradient: "linear-gradient(135deg, #6c3baa, #1a1a3e)", mal_id: null,
    recommended_main_stats: { piece_1: ["Thrust DMG %", "ATK %"], piece_2: ["ATK %"], piece_3: ["Ultimate Charge Rate %"] },
    weights: { "Crit Rate %": 0, "Crit DMG %": 0, "Ultimate Charge Rate %": 1.0, "ATK %": 0.4, "ATK": 0.4, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0, "Ailment Bonus %": 0.6 },
    core_stamp: "Curious About You", weapon_stamp: "Wipe Out",
    overrides: [{ id: "ucr_cap", label: "UCR > 250%", changes: { "Ultimate Charge Rate %": 0 } }]
  },
  {
    id: "grimmjow_pantera", rarity: "SSR", name: "Grimmjow Jaegerjaquez", subtitle: "Pantera", set_bis: "Becoming the King", initials: "GP",
    color: "#0096c7", gradient: "linear-gradient(135deg, #0096c7, #023e8a)", mal_id: 42,
    recommended_main_stats: { piece_1: ["ATK %", "Strike DMG %"], piece_2: ["Crit Rate %"], piece_3: ["ATK %"] },
    weights: { "ATK %": 1.0, "Crit Rate %": 1.0, "Crit DMG %": 0.8, "Ultimate Charge Rate %": 0.7, "ATK": 0.4, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0, "Ailment Bonus %": 0 },
    core_stamp: "Becoming the King", weapon_stamp: "Becoming the King",
    overrides: [{ id: "b6_active", label: "B6 activé", changes: { "Crit Rate %": 0.6 }, rec_override: { piece_2: ["ATK %"] } }]
  },
  {
    id: "soifon", rarity: "SSR", name: "Soi Fon", subtitle: null, set_bis: "Stealth Force", initials: "SF",
    color: "#d4a017", gradient: "linear-gradient(135deg, #d4a017, #8b6914)", mal_id: null,
    recommended_main_stats: { piece_1: ["Strike DMG %", "ATK %"], piece_2: ["Crit DMG %"], piece_3: ["Ailment DMG Bonus %"] },
    weights: { "Ultimate Charge Rate %": 1.0, "Crit DMG %": 0.9, "Ailment Bonus %": 0.8, "ATK %": 0.6, "Crit Rate %": 0.5, "ATK": 0.4, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0 },
    overrides: null
  },
  {
    id: "szayelaporro", rarity: "SSR", name: "Szayelaporro Granz", subtitle: null, set_bis: "Curtain Falls", initials: "SG",
    color: "#e84393", gradient: "linear-gradient(135deg, #e84393, #a23370)", mal_id: null,
    recommended_main_stats: { piece_1: ["Spirit DMG %", "ATK %"], piece_2: ["Crit DMG %"], piece_3: ["ATK %"] },
    weights: { "Crit DMG %": 1.0, "Crit Rate %": 0.9, "ATK %": 0.7, "ATK": 0.4, "Ultimate Charge Rate %": 0.7, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0, "Ailment Bonus %": 0 },
    overrides: [{ id: "b6_active", label: "B6", changes: { "Ultimate Charge Rate %": 0.2 } }]
  },
  {
    id: "white_ichigo", rarity: "SSR", name: "White Ichigo", subtitle: null, set_bis: "Mindscape Encroachment", initials: "WI",
    color: "#d0d0d0", gradient: "linear-gradient(135deg, #e8e8e8, #1a1a1a)", mal_id: null,
    recommended_main_stats: { piece_1: ["Slash DMG %", "ATK %"], piece_2: ["Crit Rate %"], piece_3: ["ATK %"] },
    weights: { "Crit Rate %": 1.0, "Crit DMG %": 1.0, "ATK %": 1.0, "Ultimate Charge Rate %": 1.0, "ATK": 0.6, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0, "Ailment Bonus %": 0 },
    core_stamp: "The Way to Use Bankai", weapon_stamp: "Mindscape Encroachment",
    overrides: [{ id: "a5_active", label: "A5", changes: { "Crit Rate %": 0.6 }, rec_override: { piece_2: ["Crit DMG %"] } }]
  },
  {
    id: "grimmjow_sr", rarity: "SR+", name: "Grimmjow Jaegerjaquez", subtitle: null, set_bis: "Ready to Go", initials: "GJ",
    color: "#00b4d8", gradient: "linear-gradient(135deg, #00b4d8, #0077b6)", mal_id: null,
    recommended_main_stats: { piece_1: ["Strike DMG %", "ATK %"], piece_2: ["Crit Rate %"], piece_3: ["Ultimate Charge Rate %"] },
    weights: { "Ultimate Charge Rate %": 1.0, "Crit Rate %": 0.9, "Crit DMG %": 0.9, "ATK %": 0.7, "ATK": 0.4, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0, "Ailment Bonus %": 0 },
    overrides: null
  },
  {
    id: "ichigo_initial", rarity: "SR", name: "Ichigo Kurosaki (Initial)", subtitle: null, set_bis: "Rising Black Moon", initials: "IK",
    color: "#ff8c00", gradient: "linear-gradient(135deg, #ff8c00, #b85c00)", mal_id: null,
    recommended_main_stats: { piece_1: ["Slash DMG %", "ATK %"], piece_2: ["Crit Rate %", "Crit DMG %"], piece_3: ["Ultimate Charge Rate %"] },
    weights: { "Crit Rate %": 1.0, "Crit DMG %": 1.0, "Ultimate Charge Rate %": 0.7, "ATK %": 0.6, "ATK": 0.4, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0, "Ailment Bonus %": 0 },
    overrides: null
  },
  {
    id: "ichigo_shikai", rarity: "SR", name: "Ichigo Kurosaki (Shikai)", subtitle: null, set_bis: "Savage Beast King", initials: "IS",
    color: "#e67e22", gradient: "linear-gradient(135deg, #e67e22, #a0522d)", mal_id: null,
    recommended_main_stats: { piece_1: ["Slash DMG %", "ATK %"], piece_2: ["Crit Rate %", "Crit DMG %"], piece_3: ["Ultimate Charge Rate %"] },
    weights: { "Crit Rate %": 1.0, "Crit DMG %": 1.0, "ATK %": 0.7, "Ultimate Charge Rate %": 0.6, "ATK": 0.4, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0, "Ailment Bonus %": 0 },
    overrides: null
  },
  {
    id: "momo", rarity: "SR", name: "Momo Hinamori", subtitle: null, set_bis: "Hidden Wisdom", initials: "MH",
    color: "#5b8fb9", gradient: "linear-gradient(135deg, #5b8fb9, #2c3e6b)", mal_id: null,
    recommended_main_stats: { piece_1: ["Spirit DMG %", "ATK %"], piece_2: ["Crit Rate %", "Crit DMG %"], piece_3: ["Ultimate Charge Rate %"] },
    weights: { "Ultimate Charge Rate %": 1.0, "Crit Rate %": 0.7, "Crit DMG %": 0.7, "ATK %": 0.5, "ATK": 0.3, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0, "Ailment Bonus %": 0 },
    overrides: null
  },
  {
    id: "nemu", rarity: "SR", name: "Nemu Kurotsuchi", subtitle: null, set_bis: "Hidden Wisdom", initials: "NK",
    color: "#2d3436", gradient: "linear-gradient(135deg, #2d3436, #636e72)", mal_id: null,
    recommended_main_stats: { piece_1: ["Strike DMG %", "ATK %"], piece_2: ["Crit Rate %", "Crit DMG %"], piece_3: ["Ultimate Charge Rate %"] },
    weights: { "Ultimate Charge Rate %": 1.0, "Crit Rate %": 0.7, "Crit DMG %": 0.7, "ATK %": 0.5, "ATK": 0.4, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0, "Ailment Bonus %": 0 },
    overrides: null
  },
  {
    id: "orihime", rarity: "SR", name: "Orihime Inoue", subtitle: null, set_bis: "Hidden Wisdom", initials: "OI",
    color: "#e17055", gradient: "linear-gradient(135deg, #e17055, #d63031)", mal_id: null,
    recommended_main_stats: { piece_1: ["HP %"], piece_2: [], piece_3: ["Ultimate Charge Rate %", "HP %"] },
    weights: { "Ultimate Charge Rate %": 1.0, "HP %": 0.7, "HP": 0.4, "DEF %": 0.3, "DEF": 0.2, "ATK %": 0, "ATK": 0, "Crit Rate %": 0, "Crit DMG %": 0, "Ailment Bonus %": 0 },
    overrides: null
  },
  {
    id: "rangiku", rarity: "SR", name: "Rangiku Matsumoto", subtitle: null, set_bis: "Mocking Visage / Hidden Wisdom", initials: "RM",
    color: "#fdcb6e", gradient: "linear-gradient(135deg, #fdcb6e, #e17055)", mal_id: null,
    recommended_main_stats: { piece_1: ["Thrust DMG %", "ATK %"], piece_2: ["Crit Rate %", "Crit DMG %"], piece_3: ["Ailment DMG Bonus %", "Ultimate Charge Rate %"] },
    weights: { "Ultimate Charge Rate %": 1.0, "Ailment Bonus %": 0.8, "Crit Rate %": 0.7, "Crit DMG %": 0.7, "ATK %": 0.5, "ATK": 0.4, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0 },
    overrides: null
  },
  {
    id: "renji", rarity: "SR", name: "Renji Abarai", subtitle: null, set_bis: "Unyielding Light", initials: "RA",
    color: "#c0392b", gradient: "linear-gradient(135deg, #c0392b, #7b241c)", mal_id: null,
    recommended_main_stats: { piece_1: ["Thrust DMG %", "ATK %"], piece_2: ["Crit Rate %", "Crit DMG %"], piece_3: ["Ultimate Charge Rate %", "Ailment DMG Bonus %"] },
    weights: { "Crit Rate %": 1.0, "Crit DMG %": 1.0, "Ultimate Charge Rate %": 0.8, "Ailment Bonus %": 0.6, "ATK %": 0.5, "ATK": 0.4, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0 },
    overrides: null
  },
  {
    id: "rukia", rarity: "SR", name: "Rukia Kuchiki", subtitle: null, set_bis: "Blooming Sakura", initials: "RK",
    color: "#a29bfe", gradient: "linear-gradient(135deg, #a29bfe, #6c5ce7)", mal_id: null,
    recommended_main_stats: { piece_1: ["Spirit DMG %", "ATK %"], piece_2: ["Crit Rate %", "Crit DMG %"], piece_3: ["Ultimate Charge Rate %"] },
    weights: { "Ultimate Charge Rate %": 1.0, "Crit Rate %": 0.9, "Crit DMG %": 0.9, "ATK %": 0.7, "ATK": 0.4, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0, "Ailment Bonus %": 0 },
    overrides: null
  },
  {
    id: "sado", rarity: "SR", name: "Yasutora Sado", subtitle: "Chad", set_bis: "???", initials: "YS",
    color: "#6d4c41", gradient: "linear-gradient(135deg, #6d4c41, #3e2723)", mal_id: null,
    recommended_main_stats: { piece_1: ["Strike DMG %", "ATK %"], piece_2: ["Crit Rate %", "Crit DMG %"], piece_3: ["Ultimate Charge Rate %"] },
    weights: { "Crit Rate %": 1.0, "Crit DMG %": 1.0, "HP %": 0.7, "Ultimate Charge Rate %": 0.6, "ATK %": 0.5, "ATK": 0.4, "DEF %": 0.1, "HP": 0, "DEF": 0, "Ailment Bonus %": 0 },
    overrides: null
  },
  {
    id: "ururu", rarity: "SR", name: "Ururu Tsumugiya", subtitle: null, set_bis: "Savage Beast King", initials: "UT",
    color: "#b388ff", gradient: "linear-gradient(135deg, #b388ff, #7c4dff)", mal_id: null,
    recommended_main_stats: { piece_1: ["Spirit DMG %", "ATK %"], piece_2: ["Crit Rate %", "Crit DMG %"], piece_3: ["Ultimate Charge Rate %"] },
    weights: { "Crit Rate %": 1.0, "Crit DMG %": 1.0, "ATK %": 0.7, "Ultimate Charge Rate %": 0.6, "ATK": 0.4, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0, "Ailment Bonus %": 0 },
    overrides: null
  },
  {
    id: "uryu", rarity: "SR", name: "Uryu Ishida", subtitle: null, set_bis: "Inner Fang", initials: "UI",
    color: "#74b9ff", gradient: "linear-gradient(135deg, #74b9ff, #0984e3)", mal_id: null,
    recommended_main_stats: { piece_1: ["Thrust DMG %", "ATK %"], piece_2: ["Crit Rate %", "Crit DMG %"], piece_3: ["Ultimate Charge Rate %", "ATK %"] },
    weights: { "Crit Rate %": 1.0, "Crit DMG %": 1.0, "Ultimate Charge Rate %": 0.8, "ATK %": 0.6, "ATK": 0.4, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0, "Ailment Bonus %": 0 },
    overrides: null
  },
  {
    id: "yachiru", rarity: "SR", name: "Yachiru Kusajishi", subtitle: null, set_bis: "Hidden Wisdom", initials: "YK",
    color: "#fd79a8", gradient: "linear-gradient(135deg, #fd79a8, #e84393)", mal_id: null,
    recommended_main_stats: { piece_1: ["Slash DMG %", "ATK %"], piece_2: ["Crit Rate %", "Crit DMG %"], piece_3: ["Ultimate Charge Rate %"] },
    weights: { "Ultimate Charge Rate %": 1.0, "Crit Rate %": 0.9, "Crit DMG %": 0.9, "ATK %": 0.7, "ATK": 0.4, "HP %": 0.1, "DEF %": 0.1, "HP": 0, "DEF": 0, "Ailment Bonus %": 0 },
    overrides: null
  },
];

export const CHAR_GUIDES = {
  ichigo_bankai: { fr: "Au-delà de 100% Crit Rate, chaque 1% excédentaire se convertit en 2% Crit DMG (passif niv 3). Empiler du Crit Rate est donc doublement rentable.", en: "Above 100% Crit Rate, every 1% excess converts to 2% Crit DMG (passive lv3). Stacking Crit Rate is doubly efficient." },
  kisuke: { fr: "Kisuke buff le Crit DMG de toute l'équipe via Reishi Analysis. Maximiser son propre Crit DMG amplifie ce buff pour tous.", en: "Kisuke buffs the whole team's Crit DMG via Reishi Analysis. Maximizing his own Crit DMG amplifies this buff for everyone." },
  byakuya: { fr: "Byakuya est avant tout un buffer off-field Slash. L'UCR est sa stat reine pour spam son Battlefield Skill.", en: "Byakuya is primarily an off-field Slash buffer. UCR is his top stat to spam his Battlefield Skill." },
  kenpachi: { fr: "Kenpachi scale énormément sur le Crit et l'Ailment. À B2, l'UCR perd en priorité car l'ailment buff son Crit Rate.", en: "Kenpachi scales heavily on Crit and Ailment. At B2, UCR loses priority as ailment buffs his Crit Rate." },
  aizen: { fr: "Aizen est le meilleur tactic universel. À B6, son Crit Rate est presque cap grâce au passif x2, il faut maximiser le Crit DMG.", en: "Aizen is the best universal tactic. At B6, his Crit Rate is nearly capped via the x2 passive, so maximize Crit DMG." },
  gin: { fr: "Gin excelle dans les dégâts d'altération (poison). Crit et Ailment sont ses deux piliers. Au-delà de 80% Ailment, l'ATK% devient plus rentable.", en: "Gin excels at ailment damage (poison). Crit and Ailment are his two pillars. Above 80% Ailment, ATK% becomes more efficient." },
  nelliel: { fr: "Nelliel est DPS + support hybride. Son B2 lui donne ~80% uptime Crit DMG, mais empiler davantage reste toujours excellent.", en: "Nelliel is a hybrid DPS + support. Her B2 gives ~80% Crit DMG uptime, but stacking more is always excellent." },
  ikkaku: { fr: "Ikkaku est un DPS Thrust basé sur le Bleed. UCR est prioritaire pour spam son ultime. À B1, l'Ailment prend plus de valeur.", en: "Ikkaku is a Thrust DPS based on Bleed. UCR is priority for ulti spam. At B1, Ailment gains more value." },
  tosen: { fr: "Tosen est le cœur des comps Wound/Bleed. L'ATK% est sa stat reine car tout son kit scale sur l'ATK. À B1, les Wounds se conservent mieux.", en: "Tosen is the core of Wound/Bleed comps. ATK% is his top stat since his whole kit scales on ATK. At B1, Wounds retain better." },
  yoruichi: { fr: "Yoruichi est la meilleure DPS Strike standard. Son kit dépend entièrement du Crit Rate, Crit DMG et ATK %. 🐱 Shoutout à Yoruichi_Woo, le GOAT de la Flash Goddess.", en: "Yoruichi is the best standard Strike DPS. Her kit depends entirely on Crit Rate, Crit DMG and ATK%. 🐱 Shoutout to Yoruichi_Woo, the Flash Goddess GOAT." },
  komamura: { fr: "Komamura augmente les Crit DMG des alliés protégés par son bouclier. Son B1 renforce cet effet, rendant le Crit DMG plus précieux pour toute la team.", en: "Komamura boosts Crit DMG of allies under his shield. His B1 strengthens this effect, making Crit DMG more valuable for the whole team." },
  grimmjow_pantera: { fr: "Grimmjow Pantera est un DPS Strike SSR qui scale sur l'ATK% et le Crit. À B6, son Crit Rate est naturellement cappé, ce qui rend l'ATK% optimal en main stat sur le Stamp II.", en: "Grimmjow Pantera is a Strike SSR DPS who scales on ATK% and Crit. At B6, his Crit Rate is naturally capped, making ATK% optimal as the Stamp II main stat." },
  white_ichigo: { fr: "⚠️ Ultimate Charge Rate % minimum 135%. À A5, le Stamp II passe en Crit DMG et le poids du Crit Rate descend à 0.6.", en: "⚠️ Ultimate Charge Rate % minimum 135%. At A5, Stamp II switches to Crit DMG and the Crit Rate weight drops to 0.6." },
};

export const CHAR_PASSIVES = {
  ichigo_bankai: { recommended: ["Overdrive - Full Assault", "Enhanced Damage", "Enhanced Special Attack - Full Assault", "Enhanced Ultimate"], note: null },
  kisuke: { recommended: ["Invigorate - Support", "Restrain"], note: { fr: "Invigorate ne stack que sur le même perso : 3x Invigorate est idéal pour Kisuke.", en: "Invigorate only stacks on the same character: 3x Invigorate is ideal for Kisuke." } },
  byakuya: { recommended: ["Overdrive - Tactic", "Enhanced Damage", "Enhanced Battlefield Skill"], note: null },
  kenpachi: { recommended: ["Overdrive - Full Assault", "Enhanced Damage", "Enhanced Ultimate", "Enhanced Technique"], note: null },
  toshiro: { recommended: ["Overdrive - Full Assault", "Enhanced Damage", "Enhanced Basic Attack - Full Assault", "Enhanced Ultimate"], note: null },
  aizen: { recommended: ["Overdrive - Tactic", "Enhanced Damage", "Enhanced Battlefield Skill II", "Enhanced Battlefield Skill"], note: null },
  gin: { recommended: ["Overdrive - Full Assault", "Enhanced Damage", "Enhanced Technique - Full Assault", "Enhanced Ultimate"], note: null },
  nelliel: { recommended: ["Overdrive - Tactic", "Enhanced Damage", "Enhanced Ultimate", "Enhanced Technique"], note: null },
  ikkaku: { recommended: [], note: { fr: "⚠️ Ne pas 6★ son équipement.", en: "⚠️ Do not 6★ his gear." } },
  tosen: { recommended: ["Overdrive - Tactic", "Enhanced Damage", "Enhanced Technique", "Enhanced Ultimate"], note: null },
  yoruichi: { recommended: ["Overdrive - Full Assault", "Enhanced Damage", "Enhanced Special Attack - Full Assault", "Enhanced Ultimate"], note: null },
  komamura: { recommended: [], note: { fr: "⚠️ Ne pas 6★ son équipement.", en: "⚠️ Do not 6★ his gear." } },
  grimmjow_sr: { recommended: ["Overdrive - Full Assault", "Enhanced Ultimate"], note: null },
  szayelaporro: { recommended: ["Invigorate - Support"], note: { fr: "Invigorate ne stack que sur le même perso : 3x Invigorate est idéal.", en: "Invigorate only stacks on the same character: 3x Invigorate is ideal." } },
  grimmjow_pantera: { recommended: ["Overdrive - Full Assault", "Enhanced Damage", "Enhanced Special Attack - Full Assault", "Enhanced Ultimate"], note: null },
  soifon: { recommended: ["Enhanced Battlefield Skill II", "Overdrive - Tactic"], note: null },
  white_ichigo: { recommended: ["Overdrive - Tactic", "Enhanced Damage", "Enhanced Battlefield Skill II", "Enhanced Battlefield Skill"], note: { fr: "⚠️ Ultimate Charge Rate % 135% minimum.", en: "⚠️ Ultimate Charge Rate % 135% minimum." } },
};

export const ALL_PASSIVES = [
  "Overdrive - Full Assault", "Overdrive - Tactic", "Overdrive - Support",
  "Enhanced Damage",
  "Enhanced Special Attack - Full Assault", "Enhanced Special Attack",
  "Enhanced Basic Attack - Full Assault", "Enhanced Basic Attack",
  "Enhanced Technique - Full Assault", "Enhanced Technique",
  "Enhanced Ultimate",
  "Enhanced Battlefield Skill", "Enhanced Battlefield Skill II",
  "Invigorate - Support", "Restrain",
];

export const PASSIVE_TOOLTIPS = {
  "Overdrive - Full Assault": { fr: "Augmente tous les dégâts de 9%. Sur un Full Assault : +3% supplémentaires.", en: "Increases all damage by 9%. On a Full Assault character: +3% extra." },
  "Overdrive - Tactic": { fr: "Augmente tous les dégâts de 9%. Sur un Tactic : +3% supplémentaires.", en: "Increases all damage by 9%. On a Tactic character: +3% extra." },
  "Overdrive - Support": { fr: "Augmente tous les dégâts de 9%. Sur un Support : +3% supplémentaires.", en: "Increases all damage by 9%. On a Support character: +3% extra." },
  "Enhanced Damage": { fr: "Augmente les dégâts globaux de 6%.", en: "Increases overall damage by 6%." },
  "Enhanced Special Attack - Full Assault": { fr: "Augmente les dégâts de l'attaque spéciale. Full Assault : bonus supplémentaire.", en: "Increases Special Attack damage. Full Assault: extra bonus." },
  "Enhanced Special Attack": { fr: "Augmente les dégâts de l'attaque spéciale.", en: "Increases Special Attack damage." },
  "Enhanced Basic Attack - Full Assault": { fr: "Augmente les dégâts de l'attaque de base. Full Assault : bonus supplémentaire.", en: "Increases Basic Attack damage. Full Assault: extra bonus." },
  "Enhanced Basic Attack": { fr: "Augmente les dégâts de l'attaque de base.", en: "Increases Basic Attack damage." },
  "Enhanced Technique - Full Assault": { fr: "Augmente les dégâts de la technique. Full Assault : bonus supplémentaire.", en: "Increases Technique damage. Full Assault: extra bonus." },
  "Enhanced Technique": { fr: "Augmente les dégâts de la technique.", en: "Increases Technique damage." },
  "Enhanced Ultimate": { fr: "Augmente les dégâts de l'ultime.", en: "Increases Ultimate damage." },
  "Enhanced Battlefield Skill": { fr: "Augmente les dégâts du Battlefield Skill.", en: "Increases Battlefield Skill damage." },
  "Enhanced Battlefield Skill II": { fr: "Augmente les dégâts du Battlefield Skill II.", en: "Increases Battlefield Skill II damage." },
  "Invigorate - Support": { fr: "Augmente les dégâts d'équipe. Ne stack que sur le même personnage.", en: "Increases team damage. Only stacks on the same character." },
  "Restrain": { fr: "Réduit la résistance ennemie après utilisation d'une compétence.", en: "Reduces enemy resistance after using a skill." },
};

// Niveaux d'arme (A1-A5) qui modifient les poids — par personnage
export const WEAPON_LEVELS = {
  aizen: {
    label: "Before We Realized",
    levels: [
      { id: "a1", label: "A1", changes: { "Crit Rate %": 0.9 }, b6_changes: { "Crit Rate %": 0.5 }, tooltip: { fr: "+25% Crit Rate", en: "+25% Crit Rate" } },
      { id: "a3", label: "A3", changes: { "Crit Rate %": 0.7 }, b6_changes: { "Crit Rate %": 0.4 }, tooltip: { fr: "+37.5% Crit Rate", en: "+37.5% Crit Rate" } },
      { id: "a5", label: "A5", changes: { "Crit Rate %": 0.5 }, b6_changes: { "Crit Rate %": 0.3 }, tooltip: { fr: "+50% Crit Rate", en: "+50% Crit Rate" } },
    ]
  },
  gin: {
    label: "Buto: Renjin",
    levels: [
      { id: "a1", label: "A1", changes: { "Crit Rate %": 0.9 }, tooltip: { fr: "+15% Crit Rate", en: "+15% Crit Rate" } },
      { id: "a3", label: "A3", changes: { "Crit Rate %": 0.8 }, tooltip: { fr: "+22.5% Crit Rate", en: "+22.5% Crit Rate" } },
      { id: "a5", label: "A5", changes: { "Crit Rate %": 0.7 }, tooltip: { fr: "+30% Crit Rate", en: "+30% Crit Rate" } },
    ]
  },
};

// Niveaux de passif de personnage qui modifient les poids
export const PASSIVE_LEVELS = {
  nelliel: {
    label: "Dead Aim",
    levels: [
      { id: "p3", label: "Lv3", changes: { "Crit Rate %": 0.7, "Crit DMG %": 1.0 }, tooltip: { fr: "Dead Aim — +25% Crit Rate en combat", en: "Dead Aim — +25% Crit Rate in battle" } },
    ]
  },
  ichigo_bankai: {
    label: "Spirit Surge",
    levels: [
      { id: "p3", label: "Lv3", changes: {}, tooltip: { fr: "Spirit Surge — Au-delà de 100% CR, chaque 1% → 2% Crit DMG", en: "Spirit Surge — Above 100% CR, every 1% → 2% Crit DMG" } },
    ]
  },
  kisuke: {
    label: "Kido Master",
    levels: [
      { id: "p3", label: "Lv3", changes: {}, tooltip: { fr: "Kido Master — +20% Ultimate Charge Rate", en: "Kido Master — +20% Ultimate Charge Rate" } },
    ]
  },
  gin: {
    label: "Lethal Dose",
    levels: [
      { id: "p3", label: "Lv3", changes: { "Crit Rate %": 0.8 }, tooltip: { fr: "Triggé 2 fois : +30% Crit Rate pendant 20s", en: "Triggered 2 times: +30% Crit Rate for 20s" } },
    ]
  },
};

export const STAMP_SLOTS = {
  piece_1: { label: "Stamp I", main_stats: ["Thrust DMG %", "Spirit DMG %", "Strike DMG %", "Slash DMG %", "ATK", "HP", "DEF", "ATK %", "HP %", "DEF %"] },
  piece_2: { label: "Stamp II", main_stats: ["Crit Rate %", "Crit DMG %", "ATK", "HP", "ATK %", "HP %", "DEF %"] },
  piece_3: { label: "Stamp III", main_stats: ["Ultimate Charge Rate %", "Ailment DMG Bonus %", "ATK", "DEF", "ATK %", "HP %", "DEF %"] },
};

export const ALL_SUBSTATS = ["ATK", "HP", "DEF", "ATK %", "HP %", "DEF %", "Crit Rate %", "Crit DMG %", "Ultimate Charge Rate %", "Ailment Bonus %"];
