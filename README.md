# ⚔️ BSR Toolkit

Boîte à outils pour **Bleach: Soul Resonance** — refonte complète du [BSR Set Stamp Rater](https://github.com/Gota5754/BSR-Stamp-Rater).
Analysez vos Set Stamps, consultez la tier list et planifiez vos ressources.

🌐 **Disponible en Français et Anglais**

---

## Fonctionnalités

### ⚔️ Stamp Rater
- **30+ personnages** (SSR / SR+ / SR) avec poids de substats personnalisés
- Évaluation des **3 pièces** (Stamp I, II, III) avec scoring de **SSS à F**
- **Main stats recommandées** par personnage et par pièce, indicateur **BiS / Off**
- **Procs Niv 10/15/20** pris en compte dans le score
- **Passifs 6★** recommandés avec priorité et tooltips
- **Boundary Ascension** : overrides dynamiques par perso (B1/B2/B4/B6)
- **Niveaux d'arme (A1-A5)** et **passifs de perso** qui ajustent les poids
- **Mode Comparaison** Stamp A vs Stamp B
- Guides par personnage expliquant le "pourquoi" des priorités

### 📊 Tier List
- Tier list SS → D basée sur le méta actuel (B6/A5/CS5)

### 🎯 Calculateur de ressources
- **Pulls** : cristaux, pity, estimation jusqu'à la garantie
- **Personnage** : EXP, Kans, essences d'ascension, livres possédés
- **Arme** : Tamahagane, or, marteaux d'ascension
- **Compétences & passifs** : arts, omamori, Kans total

### 🎨 Interface
- Thème **sombre / clair** et langue **FR / EN** mémorisés (localStorage)
- **Responsive mobile**
- Portraits chargés via l'API Jikan avec cache local

---

## Stack technique

- **React 18** + **Vite 6**
- CSS natif avec variables de thème (plus de styles inline géants)
- Données du jeu isolées dans `src/data/` — faciles à mettre à jour
- Logique de scoring testable dans `src/lib/scoring.js`

## Développement

```bash
npm install
npm run dev     # serveur de dev
npm run build   # build de production
```

## Structure

```
src/
├── data/          # personnages, poids, tier list, coûts de ressources
├── lib/scoring.js # calcul des scores et rangs
├── hooks/         # localStorage, chargement des portraits
├── components/    # StampRater, TierList, ResourceCalc, etc.
└── i18n.js        # traductions FR/EN
```

---

## Contribuer

Les retours sur les poids des stats sont les bienvenus ! Ouvrez une issue ou contactez-moi sur Discord **@Gota57**.

Données de ressources basées sur bsr-calculator.vercel.app — crédits : @enveelive, @Ganxo012, @Joker.

---

*Fait avec ❤️ pour la communauté Bleach: Soul Resonance*
