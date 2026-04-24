# Charte graphique Lemon Zest Digital

Référence officielle des couleurs, typos et règles visuelles de la marque.
Toute modification de la palette côté site doit rester cohérente avec ce fichier.

---

## 🎨 Palette officielle

### Couleurs primaires (identité marque)

| Rôle | Nom CSS | Hex | Usage |
|---|---|---|---|
| **Lemon** | `--lemon` | `#FFD91C` | Accent principal, highlights, sticker hero |
| **Lemon deep** | `--lemon-deep` | `#F5C400` | Variante sombre, shadow/depth |
| **Lemon soft** | `--lemon-soft` | `#FFF1A8` | Fond doux, sections lite |
| **Teal** (logo) | `--teal` | `#2EC4B6` | Cercle extérieur du logo citron |
| **Ink** | `--ink` | `#1A1915` | Texte principal, fond des sections sombres |
| **Charcoal** | `--charcoal` | `#0F0E0C` | Variante plus profonde que ink |
| **Cream** | `--cream` | `#FFF8E7` | Fond global du site |
| **Slate** | `--slate` | `#5C5A52` | Texte secondaire, placeholders |

### Couleurs d'accent secondaires

| Rôle | Nom CSS | Hex | Usage |
|---|---|---|---|
| **Mint** | `--mint` | `#6EE7B7` | Accent doux pastel (badge pulse, proof dot) |
| **Mint deep** | `--mint-deep` | `#10B981` | Accent vert saturé (liens success, eyebrows) |
| **Fuchsia** | `--fuchsia` | `#EC4899` | Accent tendance, contraste fort (background paths V2) |

### Utilitaires

| Rôle | Nom CSS | Valeur |
|---|---|---|
| Border | `--line` | `rgba(15, 14, 12, 0.08)` |
| Border fort | `--line-strong` | `rgba(15, 14, 12, 0.14)` |

---

## ✍️ Typographie

| Usage | Font | Poids |
|---|---|---|
| Titres H1/H2 | **Geist** | 700 / 800 |
| Italique expressif (sticker, serif accents) | **Instrument Serif** | 400 italic |
| Labels / code / timer | **Geist Mono** | 400 / 500 |
| Body | Geist | 300-500 |

Règles :
- Letter-spacing `-0.04em` sur H1, `-0.03em` sur H2, `-0.015em` sur sub
- Petits caps (`.eyebrow`, labels) : Geist Mono 11px tracking 0.12em uppercase opacity 0.5
- Font feature settings : `"ss01", "cv11"` activés sur body (Geist stylistic alternates)

---

## 📐 Règles visuelles non négociables

1. **"Fait à Maurice 🇲🇺"** — le drapeau est le seul emoji toléré dans le footer
2. **Aucun prix affiché publiquement** (sauf "Gratuit" pour le Skill Lite)
3. **Aucune mention Gumroad** (modèle "fichiers à 99€" abandonné)
4. **Ton chaleureux mais pro** — pas de jargon US, pas de superlatifs vides
5. **Typographie française** : apostrophes courbes ('), espaces insécables avant `:` `;` `?` `!` `%` `€`
6. **Logo** : citron jaune #FFD91C entouré d'un cercle teal #2EC4B6

---

## 🍋 Logo

- **Ovale citron** : fill `#FFD91C`
- **Cercle extérieur** : stroke `#2EC4B6` (teal signature)
- **Segments internes** : jaune plus foncé ou ink 10%
- **Feuille** (si présente) : teal `#2EC4B6` ou vert plus saturé
- **Animation site** : pulse 3s + rotation ±3°

---

## 🎯 Décisions de design récentes

| Date | Décision |
|---|---|
| 2026-04-21 | Abandon modèle marketplace fichiers → vitrine conseil sur-mesure |
| 2026-04-24 | Ajout fuchsia `#EC4899` comme accent tendance (remplace mint dans hero background paths) |
| 2026-04-24 | Marquee 26 logos clients avec grayscale→couleur au hover |

---

## 📁 Ressources source

- Charte visuelle originale : `~/Downloads/chartelemon/` (1.png = logo principal, 3-4.png = portraits circle)
- Logos clients : `marketplace-site/assets/clients/` (1.png → 26.png, 400×400 PNG transparent)
