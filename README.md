# ⚔️ BSR Set Stamp Rater

Outil d'évaluation des Set Stamps pour **Bleach: Soul Resonance**.
Analysez vos substats, comparez vos stamps et optimisez vos builds.

🌐 **Disponible en Français et Anglais**

---

## Fonctionnalités

### 🎯 Évaluation des Stamps
- **13 personnages** avec poids de stats personnalisés (+ Mayuri en Coming Soon)
- Évaluation des **3 pièces** (Stamp I, II, III) avec scoring de **SSS à F**
- **Main stats recommandées** par personnage et par pièce
- Indicateur **BiS / Off** sur la main stat sélectionnée

### 🔄 Système de Procs
- Sélection des procs de **Niv 10, 15 et 20**
- Le scoring prend en compte les substats qui ont proc
- Niv 25 : toutes les substats reçoivent un proc (inclus dans le calcul)

### ⭐ Passifs 6★
- Sélection du passif d'évolution pour chaque stamp
- **Passifs recommandés par personnage** avec priorité (★★★ / ★★ / ★ / ☆)
- Impact direct sur la note finale
- Notes spéciales (ex: Kisuke 3x Invigorate, Ikkaku/Komamura à ne pas 6★)

### 🔀 Boundary Ascension
- Overrides dynamiques par personnage (B1, B2, B4, B6 selon le perso)
- Ajuste automatiquement les **poids des substats** et les **stats recommandées**
- Exemples : Aizen B6 → Crit DMG prioritaire en Stamp II, Nelliel B2 → Crit Rate prioritaire, Nelliel B4 → Crit DMG repasse devant

### ⇔ Mode Comparaison
- Comparez **Stamp A vs Stamp B** côte à côte
- Affichage du gagnant avec le score

### 📊 Informations par Personnage
- **Core Stamp** et **Weapon Stamp** recommandés
- **Guide substats** avec explication du "pourquoi" des priorités (ex: conversion Crit Rate → Crit DMG d'Ichigo)
- Visualisation des **priorités de substats** avec barres de poids

### 🎨 Interface
- Thème **sombre / clair**
- **Responsive mobile** (optimisé pour téléphone)
- Langue **FR / EN** avec drapeaux
- Portraits HD des personnages

---

## Personnages supportés

| Personnage | Type | Set BiS |
|---|---|---|
| Ichigo Kurosaki (Bankai) | Slash | Rising Black Moon |
| Kisuke Urahara | Slash | Hidden Wisdom |
| Byakuya Kuchiki | Slash | Blooming Sakura |
| Kenpachi Zaraki | Slash | Ready to Go |
| Toshiro Hitsugaya | Spirit | World Conquest |
| Sosuke Aizen | Spirit | Immeasurable Gap |
| Gin Ichimaru | Thrust | Mocking Visage |
| Nelliel | Thrust | Knight's Anthem |
| Ikkaku Madarame | Thrust | Unyielding Light |
| Kaname Tosen | Thrust | Mocking Visage |
| Yoruichi Shihoin | Strike | Shadow in Still Night |
| Sajin Komamura | Strike | Inner Fang |
| Mayuri Kurotsuchi | ??? | Coming Soon |

---

## Stack technique

- **React 18** + **Vite 6**
- Style inline dynamique (thèmes, couleurs par personnage)
- Images embarquées en base64 (WebP)
- Déployé sur **Vercel** avec CI/CD automatique via GitHub

---

## Contribuer

Les retours sur les poids des stats sont les bienvenus ! Si vous avez des suggestions de personnages à ajouter ou des ajustements à proposer, ouvrez une issue ou contactez-moi sur Discord @Gota57

---

*Fait avec ❤️ pour la communauté Bleach: Soul Resonance*
