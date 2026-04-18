# 🍋 Lemon Zest Marketplace — Contexte projet

Site de vente des skills Claude de Lemon Zest Digital.

**URL prod** : https://marketplace.lemonzest.digital
**Hébergement** : Vercel (déploiement auto sur push main)
**Dépôt** : GitHub

---

## 🎨 Charte graphique

### Couleurs (CSS variables déjà définies dans index.html)

```css
--bg: #fdfaf4;          /* Fond crème */
--ink: #1a1814;         /* Encre (texte principal) */
--ink-soft: #4a453d;    /* Encre adoucie */
--ink-muted: #8b857a;   /* Encre muted */
--line: #e8e2d3;        /* Bordures */
--zest: #f5c518;        /* Jaune zest (accent principal) */
--zest-dark: #e0b000;   /* Zest hover */
--zest-soft: #fdf4c9;   /* Zest très clair */
--lemon: #fef9d4;       /* Jaune citron (CTA sections) */
--leaf: #2d5016;        /* Vert feuille */
--accent: #d94b1a;      /* Orange urgence/promo */
--success: #2a7f3e;     /* Vert validation */
```

### Typographies (Google Fonts)

- **Fraunces** (serif expressive) → titres, display
- **Manrope** (sans-serif géométrique) → body, UI
- **JetBrains Mono** → code, tags

### Rayons

- `--radius-sm: 6px`
- `--radius: 12px`
- `--radius-lg: 20px`

---

## ✍️ Ton éditorial

### À respecter systématiquement

- **Typographie française** : espaces insécables avant `:` `;` `?` `!` `%` `€`
- **Guillemets français** : « »
- **Apostrophes typographiques** : ’ (pas ')
- **Chiffres** : `1 250,50 €` (virgule décimale, espace milliers)
- **Ton mesuré**, pas de superlatifs US
- **Preuves chiffrées** obligatoires sur chaque promesse

### À éviter

- Jargon marketing vide (innovant, synergies, disruptif)
- Promesses absolues (100 % garanti, x10 vos ventes)
- Tutoiement dans les CTA
- Émojis excessifs (2-4 max par section)

---

## 💰 Offre actuelle

- **Prix lancement** : 99 € (-50 %) pendant 7 jours
- **Prix mois 1** : 149 €
- **Prix catalogue** : 199 €
- **Lien Gumroad** : `https://gumroad.com/l/marketing-agence-fr` (à confirmer après setup)
- **Garantie** : 14 jours satisfait ou remboursé
- **Mises à jour** : incluses à vie (mineures), -50 % pour majeures

---

## 📐 Structure actuelle (index.html)

1. Nav sticky (logo + liens + CTA)
2. Hero (eyebrow + titre + sous-titre + CTA + cartes skills rotées)
3. Problem (3 cartes du pain point)
4. Skills (dark section, 6 skills détaillés)
5. Compare (tableau comparatif)
6. Lead magnet (encart téléchargement version Lite)
7. Pricing (carte prix 99 €, badge -50 %)
8. FAQ (9+ questions details/summary)
9. CTA final (section lemon)
10. Footer (4 colonnes)

---

## 🔗 Intégrations

- **Gumroad** (checkout) : `gumroad.com/l/marketing-agence-fr`
- **Brevo** (newsletter + lead magnet) : form Brevo sur `/skill-lite`
- **Plausible** (analytics RGPD-friendly, à installer)
- **Calendly** (optionnel, diagnostic offert)

---

## 🚀 Workflow de déploiement

```bash
# Test local
python3 -m http.server 8000

# Déploiement
git add .
git commit -m "feat: description du changement"
git push origin main
# → Vercel redéploie automatiquement en 30-60s
```

**Branches preview** : tout push sur une branche autre que `main` génère une URL preview Vercel automatique.

---

## 🎯 Priorités d'édition fréquentes

### Modifier le prix
Remplacer dans tout `index.html` :
- `99 €` → nouveau prix
- Badge `-50 %` dans pricing-wrapper → ajuster %
- Lien CTA bouton "Acheter maintenant"

### Ajouter un témoignage
Créer section après "Skills" ou dans "Pricing" avec bloc `.testimonial` :
```html
<blockquote class="testimonial">
  <p>« Citation exacte avec guillemets français »</p>
  <cite>— Prénom, Fonction, Ville</cite>
</blockquote>
```

### Ajouter une FAQ
Dans la section `#faq`, ajouter un `<details class="faq-item">` :
```html
<details class="faq-item">
  <summary class="faq-question">Question ?</summary>
  <div class="faq-answer">Réponse argumentée.</div>
</details>
```

### Modifier le positionnement hero
Éditer `.hero-title`, `.hero-sub`, `.hero-eyebrow` dans la section `<section class="hero">`.

---

## 📊 Objectifs de performance

- Lighthouse Performance > 95
- LCP < 2.5s
- CLS < 0.1
- Taille totale < 300 Ko (fonts incluses)

---

## 🛠️ Skills Claude Code à utiliser

Pour les modifications :
- **frontend-design** (Anthropic officiel) pour refontes visuelles
- Tes skills personnels de création de sites
- **wordpress-seo** (le tien) si besoin d'inspiration SEO/contenu

---

## ⚠️ Checkpoints avant push main

- [ ] Test visuel mobile (devtools responsive)
- [ ] Test visuel desktop
- [ ] Typographie française vérifiée
- [ ] Liens Gumroad valides
- [ ] Meta OG à jour si refonte majeure
- [ ] Pas de lorem ipsum oublié
