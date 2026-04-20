---
name: skill-fr-factory
description: Transforme un skill Claude en anglais (fichier SKILL.md EN) en un skill professionnel francophone prêt à vendre sur la marketplace Lemon Zest Digital. Déclencher dès que Jean-Michel dit "francise ce skill", "adapte ce skill en FR", "transforme ce skill pour le marché français", "rends ce skill compatible RGPD", "crée un skill FR à partir de", ou colle un SKILL.md EN dans la conversation. Produit un skill complet avec SKILL.md FR, références juridiques françaises, plateformes FR/BE/CH/MU, typographie française, et un guide PDF livrable client. Ne jamais traduire bêtement — toujours adapter au marché francophone.
---

# 🍋 Skill FR Factory — Lemon Zest Digital

Transforme un skill Claude EN en skill FR vendable sur marketplace.lemonzestdigital.com.

## Quand utiliser ce skill

- Utilisateur colle un SKILL.md EN dans la conversation
- "Francise ce skill", "adapte en FR", "rends RGPD-compliant"
- "Crée la version française de [skill]"
- "Adapte pour le marché francophone"

## Pipeline de production (8 étapes)

Exécuter dans l'ordre. Ne pas sauter d'étapes.

---

### ÉTAPE 1 — Analyse du skill EN

Lire et analyser le SKILL.md EN fourni. Produire un rapport d'analyse :

```
RAPPORT D'ANALYSE — [Nom du skill EN]
======================================
Source : [GitHub URL si connue]
Licence : [MIT / Apache / GPL / Autre]
Complexité : [Low / Medium / High]
Niche : [SEO/Marketing / RH / Juridique / E-commerce / Immo / Artisans / Tech]

ÉLÉMENTS US-CENTRÉS À ADAPTER :
□ Références légales US → [liste]
□ Plateformes US → [liste]
□ Typographie EN → [liste]
□ Culture business US → [description]
□ APIs/outils US sans équivalent FR → [liste]

OPPORTUNITÉ FR :
Score : [1-10]
Justification : [2-3 phrases]
Recommandation : TRANSLATE / INSPIRE / IGNORE
```

Si IGNORE → stopper et expliquer pourquoi.

---

### ÉTAPE 2 — Mapping des adaptations FR

Avant d'écrire une ligne, établir la table de correspondance complète.
Lire le fichier `references/adaptations-fr.md` pour les correspondances standard.

Format obligatoire :

```
MAPPING ADAPTATIONS
===================
LÉGAL
  US : Disclaimer, Terms of Service        → FR : Mentions légales (LCEN art. L111-7)
  US : Privacy Policy                      → FR : Politique confidentialité (RGPD art. 13)
  US : CCPA compliance                     → FR : CNIL / RGPD compliance
  US : ADA accessibility                   → FR : RGAA (Référentiel Général d'Accessibilité)
  US : [autres]                            → FR : [équivalents]

PLATEFORMES
  US : Yelp                               → FR : Pages Jaunes, Trustpilot
  US : Google My Business                 → FR : Google Business Profile (GBP)
  US : Zillow / Realtor                   → FR : SeLoger, LeBonCoin Immobilier, PAP
  US : Indeed / LinkedIn Jobs             → FR : France Travail (ex Pôle Emploi), APEC, Cadremploi
  US : Shopify                            → FR : PrestaShop (dominant FR), WooCommerce
  US : Mailchimp                          → FR : Brevo (ex Sendinblue), Mailjet
  US : Google Analytics (sans consent)    → FR : Matomo (RGPD) ou GA4 + CMP
  US : Stripe                             → FR : Stripe FR + Mollie + PayPlug
  US : [autres]                           → FR : [équivalents]

TYPOGRAPHIE
  EN : "..."                              → FR : « ... »
  EN : apostrophe '                       → FR : apostrophe typographique '
  EN : pas d'espace avant : ; ? ! %      → FR : espace insécable avant : ; ? ! % €
  EN : 1,000.00                           → FR : 1 000,00 €
  EN : date MM/DD/YYYY                    → FR : JJ/MM/AAAA

CULTURE BUSINESS
  EN : [ton informel, tutoiement]         → FR : [ton professionnel, vouvoiement par défaut]
  EN : [références culturelles US]        → FR : [références francophones]
  EN : [unités impériales]               → FR : [unités métriques]
```

---

### ÉTAPE 3 — Rédaction du SKILL.md FR

Règles absolues :
- Rédiger **tout** en français (instructions, commentaires, exemples)
- Appliquer **toutes** les adaptations du mapping Étape 2
- Conserver la **structure technique** du skill EN (frontmatter YAML, sections)
- Adapter le **nom** du skill : `[nom]-fr` (ex: `local-seo-artisans-fr`)
- Adapter la **description** pour le triggering francophone

Structure obligatoire du SKILL.md FR produit :

```markdown
---
name: [nom-du-skill]-fr
description: [Description en français. Triggers explicites. Marché FR/BE/CH/MU. 
Mentionner RGPD si pertinent. Mentionner les plateformes FR cibles.]
---

# [Titre en français]

[Accroche en 1-2 phrases — valeur pour le professionnel francophone]

## Marché cible
- Pays : France, Belgique, Suisse romande, Maurice, Afrique francophone
- Profils : [agences / freelances / TPE / artisans / etc.]
- Outils compatibles : Claude.ai (Projects), Claude Code, ChatGPT

## Conformité FR
[Section explicite sur les lois/réglementations respectées]
- RGPD (Règlement Général sur la Protection des Données)
- [LCEN si pertinent]
- [Code du Travail si RH]
- [Loi Alur si immobilier]
- [autres réglementations sectorielles]

## Utilisation
[Instructions en français, exemples francophones, cas d'usage FR]

## [Sections techniques adaptées]
[Adapter fidèlement le contenu technique du skill EN]

## Typographie française
Ce skill applique automatiquement :
- Guillemets français : « »
- Espaces insécables avant : ; ? ! % €
- Apostrophes typographiques : '
- Format date : JJ/MM/AAAA
- Séparateur milliers : espace (1 250 €)
```

---

### ÉTAPE 4 — Vérification qualité (checklist)

Passer chaque point. Cocher ✅ ou noter ❌ avec correction.

```
CHECKLIST QUALITÉ SKILL FR
===========================

LÉGAL / CONFORMITÉ
□ RGPD mentionné si traitement de données personnelles
□ Consentement cookies si analytics mentionné
□ Mentions légales LCEN si applicable
□ Lois sectorielles correctes (Code du Travail / Loi Alur / etc.)
□ Pas de référence à loi US sans équivalent FR

PLATEFORMES
□ Toutes les plateformes US remplacées par équivalents FR
□ Plateformes FR vérifiées (toujours actives en 2026)
□ Prix/TVA en € (pas en $)

TYPOGRAPHIE
□ Guillemets « » utilisés (pas "")
□ Espaces insécables correctement placées
□ Format date JJ/MM/AAAA
□ Format monétaire FR (1 250,50 €)
□ Pas d'apostrophe droite '  (utiliser ')

CONTENU
□ Tout en français (0 ligne EN non traduite)
□ Ton professionnel (vouvoiement dans exemples)
□ Exemples avec prénoms/villes/entreprises francophones
□ Pas de référence culturelle US inexpliquée

TECHNIQUE
□ Frontmatter YAML valide
□ Nom du skill en kebab-case avec suffixe -fr
□ Description contient les triggers en français
□ Structure de dossiers correcte
```

---

### ÉTAPE 5 — Création des fichiers annexes

Créer dans le dossier du skill :

**`references/contexte-marche-fr.md`** :
- Panorama du marché francophone pour ce secteur
- Chiffres clés FR (sources INSEE, FEVAD, etc.)
- Acteurs principaux FR
- Spécificités culturelles B2B/B2C FR

**`references/conformite-rgpd.md`** (si données personnelles) :
- Checklist RGPD complète pour ce secteur
- Modèles de consentement
- Durées de conservation légales
- Contacts CNIL

**`assets/exemples-fr/`** :
- 3 à 5 exemples de prompts en français
- 3 à 5 exemples de sorties en français
- 1 exemple avant/après (EN → FR)

---

### ÉTAPE 6 — README.md client

Créer un `README.md` propre pour l'acheteur :

```markdown
# [Nom du Skill] FR — Lemon Zest Digital

[Description commerciale en 2-3 phrases]

## Ce que vous recevez
- `SKILL.md` — Le skill principal
- `references/` — Contexte marché FR + conformité RGPD
- `assets/exemples-fr/` — Exemples prêts à l'emploi
- `GUIDE-INSTALLATION.md` — Guide d'installation

## Installation rapide (2 minutes)
### Claude.ai (Projects)
1. Ouvrir Claude.ai → Projects → votre project
2. Uploader tous les fichiers .md
3. Tester avec : "[prompt exemple]"

### Claude Code
```bash
cp -r [nom-skill]-fr/ ~/.claude/skills/
```

## Compatibilité
✅ Claude.ai (Projects)  ✅ Claude Code  ✅ ChatGPT  ✅ Cursor

## Conformité
✅ RGPD  ✅ [autres certifications]  ✅ Typographie FR

## Support
hello@lemonzestdigital.com — Réponse sous 48h (FR)

## Garantie
14 jours satisfait ou remboursé — sans justification.

---
© 2026 Lemon Zest Digital — marketplace.lemonzestdigital.com
```

---

### ÉTAPE 7 — Packaging pour Gumroad

Structure finale du `.zip` à livrer :

```
[nom-skill]-fr/
├── SKILL.md                          ← Le skill principal FR
├── README.md                         ← Guide client
├── GUIDE-INSTALLATION.md             ← Installation détaillée (4 modes)
├── references/
│   ├── contexte-marche-fr.md
│   └── conformite-rgpd.md (si applicable)
└── assets/
    └── exemples-fr/
        ├── exemples-prompts.md
        └── exemples-sorties.md
```

Créer le zip :
```bash
zip -r [nom-skill]-fr-v1.0.zip [nom-skill]-fr/
```

---

### ÉTAPE 8 — Fiche produit Gumroad + Marketplace

Produire automatiquement :

**Titre Gumroad** (max 80 chars) :
`[Skill] FR — [Bénéfice principal] pour [cible] francophone`

**Description Gumroad** (structure obligatoire) :
```
[HOOK — problème résolu en 1 phrase]

[Problème développé — 2-3 phrases sur la douleur client FR]

Ce que vous recevez :
• [Skill 1] — [bénéfice concret]
• [Skill 2] — [bénéfice concret]
• [Templates] — [nombre et usage]
• Guide d'installation FR (PDF)

✨ Compatibilité : Claude.ai, Claude Code, ChatGPT, Cursor
🔒 Conformité : RGPD, [autres]
🇫🇷 Marché : France, Belgique, Suisse, Maurice, Afrique FR

ROI : Pour un consultant à [X €/h], économiser [Y h/semaine]
= [calcul] € de temps valorisé par mois.

Investissement : [PRIX] € — paiement unique, accès à vie.
Garantie 14 jours satisfait ou remboursé.

Contact : hello@lemonzestdigital.com
```

**Fiche marketplace** (format JSON pour le site Notion/site) :
```json
{
  "nom": "[Nom du skill]",
  "slug": "[nom-skill]-fr",
  "categorie": "[Marketing/RH/Juridique/E-commerce/Immo/Artisans/Tech]",
  "prix": [XX],
  "statut": "disponible",
  "badge": "Nouveau",
  "description_courte": "[1 phrase]",
  "bullets": ["bullet 1", "bullet 2", "bullet 3"],
  "url_gumroad": "https://lemonzestdigital.gumroad.com/l/[slug]",
  "url_marketplace": "https://marketplace.lemonzestdigital.com/produits/[slug]"
}
```

---

## Résumé de la livraison finale

À la fin des 8 étapes, produire dans `/mnt/user-data/outputs/` :

1. **`[nom]-fr/`** — Dossier complet du skill
2. **`[nom]-fr-v1.0.zip`** — Archive Gumroad-ready
3. **`fiche-gumroad-[nom].md`** — Description prête à coller dans Gumroad
4. **`fiche-marketplace-[nom].json`** — Données pour le site

Confirmer : "✅ Skill [nom] francisé et packagé. Prêt pour Gumroad."
