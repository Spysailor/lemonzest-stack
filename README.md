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

## 🆘 Reprise à froid d'un VPS

Si le VPS est reset, migré, ou remplacé (nouveau provider, nouveau serveur, Hostinger qui reprovisionne), **une seule commande** remet le site en ligne avec certificat Let's Encrypt :

```bash
ssh root@<NOUVELLE_IP>
bash <(curl -fsSL https://raw.githubusercontent.com/Spysailor/lemonzest-stack/main/ops/bootstrap-vps.sh)
```

Le script `ops/bootstrap-vps.sh` est **idempotent** et couvre :

- VPS Ubuntu vierge → installe Docker + clone le repo + Traefik + marketplace-site
- VPS avec Docker déjà présent → skip l'install, continue
- VPS avec un reverse proxy existant (ex : Traefik Hostinger) → piggyback sans conflit
- Reprise après incident → re-clone + `docker compose up -d` en 2 minutes

Variables personnalisables (optionnelles) :

```bash
REPO_URL=https://github.com/.../custom-fork.git \
DOMAIN=autre.exemple.com \
LETSENCRYPT_EMAIL=admin@exemple.com \
bash <(curl -fsSL .../bootstrap-vps.sh)
```

## ⚠️ Ajouter une app sur le VPS (ne PAS utiliser le panel Hostinger)

**N'utilise jamais le "Gestionnaire Docker" de Hostinger pour installer une nouvelle app** — il reprovisionne le VPS entier et efface les stacks existantes.

Méthode propre : SSH + `docker compose` avec un fichier versionné dans `ops/`, en réutilisant le Traefik déjà en place (labels standards `traefik.http.routers.<name>...`). Voir `ops/docker-compose.marketplace.yml` comme exemple.

