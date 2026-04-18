# lemonzest-stack

Monorepo contenant tous les assets, produits et automations de Lemon Zest.

## Structure

```
lemonzest-stack/
├── marketplace-site/           # Site vitrine / marketplace principal
├── pack-marketing-agence-fr/   # Pack marketing complet pour agences (version FR)
├── pack-routines-marketing-fr-v1/  # Pack routines marketing v1 (version FR)
├── version-lite/               # Version allégée / freemium des packs
├── automations/                # Scénarios Make, webhooks, automatisations
├── docs/                       # Documentation interne, guides, SOPs
└── ops/                        # Config serveur, CI/CD, scripts d'ops
```

## Sous-projets

### `marketplace-site`
Site web principal pour la vente des packs. Contient le front-end, les pages produit et l'intégration paiement.

### `pack-marketing-agence-fr`
Pack complet destiné aux agences marketing francophones. Inclut templates, guides et ressources prêts à l'emploi.

### `pack-routines-marketing-fr-v1`
Pack de routines marketing structurées (version 1). Workflows, checklists et templates pour les équipes marketing.

### `version-lite`
Version allégée des packs principaux. Produit d'appel / freemium pour acquisition.

### `automations`
Tous les scénarios Make.com, webhooks et scripts d'automatisation liés aux produits et au site.

### `docs`
Documentation interne : onboarding, SOPs, guides d'utilisation, notes de décision.

### `ops`
Configuration infrastructure, scripts de déploiement, CI/CD, et outils d'exploitation.

## Démarrage

Chaque sous-dossier est autonome. Voir le `README.md` propre à chaque dossier pour les instructions spécifiques.
