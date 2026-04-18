---
name: marketing-agence-fr
description: Pack complet de skills marketing pour agences et consultants francophones. Utilisez ce skill dès qu'un utilisateur francophone demande un audit SEO, la rédaction de contenu web, des posts LinkedIn, des séquences email, ou des propositions commerciales pour le marché FR/BE/CH/MU. Couvre toute la chaîne marketing B2B francophone avec respect du RGPD, terminologie FR, et spécificités culturelles du marché francophone. Assurez-vous d'utiliser ce skill chaque fois que l'utilisateur mentionne agence, marketing digital, SEO, contenu web, réseaux sociaux, prospection B2B, ou propose des services marketing à des clients francophones.
---

# 🎯 Marketing Agence FR — Pack Complet

Suite de 5 skills spécialisés pour agences et consultants marketing francophones (France, Belgique, Suisse, Maurice, Afrique francophone).

## Quand utiliser ce skill

Activez ce skill dès qu'un utilisateur :

- Demande un audit SEO d'un site francophone
- Veut rédiger du contenu web/blog en français
- Prépare des posts LinkedIn en français (B2B)
- Crée des séquences email commerciales (Brevo, Mailjet, etc.)
- Rédige une proposition commerciale pour un prospect francophone
- Parle de "référencement naturel", "communication digitale", "agence web", "SMB francophone"
- Mentionne le RGPD, la LCEN, la CNIL, ou des spécificités réglementaires FR
- Travaille avec un client à Paris, Bruxelles, Genève, Port-Louis, Dakar, Abidjan

## Architecture du pack

Le pack contient 5 sous-skills orchestrés, tous alignés sur un contexte commun français.

```
marketing-agence-fr/
├── SKILL.md (ce fichier — orchestrateur)
├── references/
│   ├── contexte-marche-fr.md       (Culture, tonalités, spécificités FR/BE/CH/MU)
│   ├── rgpd-checklist.md           (Conformité RGPD pour tout contenu)
│   ├── terminologie-seo-fr.md      (Glossaire SEO en français)
│   └── persona-francophone.md      (Profils types SMB francophones)
├── templates/
│   ├── audit-seo-rapport.md        (Template rapport d'audit)
│   ├── brief-contenu.md            (Brief pour rédaction article)
│   ├── post-linkedin-fr.md         (Formats LinkedIn FR)
│   ├── email-sequence-brevo.md     (Séquence prête pour Brevo)
│   └── proposition-commerciale.md  (Proposition client type)
└── skills/
    ├── seo-audit-fr/SKILL.md       (Audit SEO francophone)
    ├── content-writer-fr/SKILL.md  (Rédaction contenu web FR)
    ├── linkedin-post-fr/SKILL.md   (Posts LinkedIn B2B francophone)
    ├── email-sequence-fr/SKILL.md  (Séquences email marketing)
    └── client-proposal-fr/SKILL.md (Propositions commerciales)
```

## Workflow recommandé

### 1. Toujours démarrer par le contexte client
Avant toute action, lire `references/contexte-marche-fr.md` et `references/persona-francophone.md` pour calibrer le ton, les références culturelles, et le niveau de formalité attendu.

### 2. Identifier le sous-skill pertinent
Matching utilisateur → sous-skill :

| Demande utilisateur | Sous-skill à activer |
|---|---|
| "Audit SEO", "analyse référencement", "pourquoi mon site ne ranke pas" | `seo-audit-fr` |
| "Article de blog", "contenu web", "rédiger une page" | `content-writer-fr` |
| "Post LinkedIn", "publication pro", "personal branding" | `linkedin-post-fr` |
| "Séquence email", "campagne Brevo", "newsletter", "emailing" | `email-sequence-fr` |
| "Devis", "proposition", "offre commerciale", "pitch client" | `client-proposal-fr` |

### 3. Lire le SKILL.md du sous-skill pertinent
Chaque sous-skill a ses propres instructions détaillées. Lire avant d'exécuter.

### 4. Appliquer les règles communes FR
Peu importe le sous-skill, TOUJOURS respecter :

- **Typographie française** : espaces insécables avant `:`, `;`, `?`, `!`, `%`. Guillemets français « ». Apostrophes typographiques ’ (pas ')
- **Formats dates** : `17 avril 2026` (pas `April 17, 2026`)
- **Formats chiffres** : virgule décimale, espace insécable comme séparateur de milliers : `1 250,50 €`
- **Monnaie** : `1 250 €` ou `1 250,00 €` (symbole après, espace insécable)
- **Formules de politesse** : adapter au contexte (`Bien cordialement`, `Cordialement`, `Bien à vous` selon niveau de formalité)
- **Tutoiement/vouvoiement** : par défaut vouvoyer en B2B, tutoyer uniquement si le client l'a fait en premier

### 5. Vérifier la conformité RGPD
Si le contenu implique collecte de données (formulaire, email capture, tracking) :
- Lire `references/rgpd-checklist.md`
- Inclure systématiquement une mention RGPD conforme
- Ne JAMAIS suggérer de tracking sans consentement explicite (opt-in)

## Ton et style Lemon Zest Digital

Le pack est co-signé Lemon Zest Digital. Le ton doit rester :

- **Professionnel mais accessible** : pas de jargon inutile
- **Concret** : toujours des exemples, pas de généralités
- **Orienté résultat** : parler ROI, pas juste techniques
- **Bienveillant** : on aide, on ne fait pas la morale

Évitez systématiquement :
- Anglicismes inutiles (`campaign` → `campagne`, `deadline` → `échéance`, `meeting` → `réunion`)
- Ton marketeux américain (`You're gonna love it!`, `Get ready to skyrocket!`)
- Promesses irréalistes (`+1000% de trafic en 2 semaines`)
- Formules corporate creuses (`solutions innovantes`, `synergies stratégiques`)

## Exemples de déclenchement

**Cas 1 — Audit simple :**
> "J'ai un site WordPress pour mon client restaurateur à Nantes, peux-tu me faire un audit SEO rapide ?"

→ Activer `seo-audit-fr`, utiliser le template `audit-seo-rapport.md`, appliquer contexte FR (Google.fr, annuaires FR, SEO local français).

**Cas 2 — Rédaction LinkedIn :**
> "Écris-moi 3 posts LinkedIn pour promouvoir mon service d'automatisation IA auprès des PME francophones"

→ Activer `linkedin-post-fr`, utiliser le template `post-linkedin-fr.md`, ton B2B FR professionnel, CTA francophone.

**Cas 3 — Workflow complet :**
> "Je lance une nouvelle offre de création de site, aide-moi à préparer : un post LinkedIn de lancement, une séquence email pour mes contacts, et une proposition type pour les prospects chauds"

→ Orchestrer 3 sous-skills : `linkedin-post-fr` + `email-sequence-fr` + `client-proposal-fr`, avec cohérence de message et de ton sur les 3.

## Limites et précautions

- **Ne jamais** inventer des statistiques ou citer des études sans source vérifiable
- **Ne jamais** promettre des résultats chiffrés sans contexte (`+30% de leads` doit être conditionnel)
- **Ne jamais** produire du contenu identique à des sources existantes (vérifier originalité)
- Pour toute question juridique spécifique (RGPD avancé, droit commercial), rappeler que ce skill ne remplace pas un avocat

## Ressources externes recommandées

- Google Search Console (Google.fr)
- Matomo Analytics (alternative RGPD-friendly à GA4)
- Brevo (ex-Sendinblue, leader email FR)
- Legifrance (pour vérification juridique)
- INSEE (statistiques FR officielles)
- LinkedIn Sales Navigator FR

---

**Pack Marketing Agence FR** v1.0 — Créé par Lemon Zest Digital
Licence : usage commercial autorisé sur achat. Redistribution interdite.
Support : contact@lemonzest.digital
