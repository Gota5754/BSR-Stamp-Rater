# BSR Set Stamp Rater

Outil d'évaluation des Set Stamps pour **Bleach: Soul Resonance**.

## Fonctionnalités

- 12 personnages avec poids de stats personnalisés
- Évaluation des stamps (I, II, III) avec scoring SSS → F
- Système de procs (Niv 10/15/20/25)
- Mode comparaison (Stamp A vs B)
- Overrides par personnage (B2/B6 activé, etc.)
- Thème sombre / clair

## Déploiement

### Dev local

```bash
npm install
npm run dev
```

### Build de production

```bash
npm run build
```

### Déploiement sur Vercel

1. Push ce repo sur GitHub
2. Va sur [vercel.com](https://vercel.com) → New Project
3. Importe ton repo GitHub
4. Vercel détecte automatiquement Vite → clique "Deploy"
5. C'est en ligne !
