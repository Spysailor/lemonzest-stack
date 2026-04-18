# 🍋 Lemon Zest Digital — Stack Marketplace

**Propriétaire** : Jean-Michel, Lemon Zest Digital (Maurice, BRN Mauricien)
**Date de démarrage** : 18 avril 2026
**Claude Code** : tu es l'assistant IA de Jean-Michel, tu travailles sur son VPS

---

## 🎯 Mission globale

Jean-Michel lance une **marketplace francophone de skills et routines Claude Code**
à destination des freelances et agences marketing FR/BE/CH/MU.

**URL cible** : `marketplace.lemonzest.digital`
**Hébergement** : VPS (à créer) + domaine déjà possédé
**Checkout** : Gumroad (à configurer) avec compte société Maurice

---

## 📦 Structure du monorepo (ce VPS)

```
~/lemonzest-stack/
├── CLAUDE.md                              ← Ce fichier (contexte global)
├── README.md                              ← Guide humain du repo
│
├── marketplace-site/                      ← 🌐 Site vitrine + landing
│   ├── CLAUDE.md                          ← Contexte spécifique au site
│   ├── index.html                         ← Landing actuelle
│   ├── vercel.json                        ← Config Vercel
│   ├── .gitignore
│   └── assets/                            ← Images, OG, favicon
│
├── pack-marketing-agence-fr/              ← 📦 Produit #1 (skills)
│   ├── SKILL.md                           ← Skill orchestrateur
│   ├── skills/                            ← 5 sous-skills
│   ├── references/                        ← Contexte FR + RGPD
│   ├── templates/                         ← 5 templates
│   ├── GUIDE-INSTALLATION.md              ← Manuel client
│   └── GUIDE-INSTALLATION.pdf             ← Version PDF
│
├── pack-routines-marketing-fr-v1/         ← 📦 Produit #2 (routines)
│   ├── README.md                          ← Présentation du pack
│   ├── GUIDE-INSTALLATION.md              ← Setup Claude Code routines
│   └── routines/                          ← 15 fichiers .md (1 par routine)
│
├── version-lite/                          ← 🎁 Lead magnet gratuit
│   └── linkedin-post-fr-lite/
│
├── automations/                           ← ⚙️ Routines actives pour JM
│   ├── daily-marketplace-pulse/           ← Routine #1 (lui)
│   └── linkedin-post-du-jour/             ← Routine #2 (lui)
│
├── docs/                                  ← 📚 Documentation interne
│   ├── plan-lancement-30-jours.md
│   ├── etude-marche.md
│   └── architecture-technique.md
│
└── ops/                                   ← 🛠️ Scripts VPS et déploiement
    ├── deploy.sh                          ← Script déploiement
    ├── backup.sh                          ← Script backup
    └── monitoring.sh                      ← Healthcheck VPS
```

---

## 🏗️ Architecture technique cible

### Phase 1 (ce weekend)
```
┌──────────────────────────────────────────────────────┐
│  UTILISATEUR                                         │
│  └─> marketplace.lemonzest.digital                   │
└─────────────────────┬────────────────────────────────┘
                      ↓
┌──────────────────────────────────────────────────────┐
│  VPS (À CRÉER - Hetzner / OVH / DigitalOcean)        │
│  ├── Nginx (reverse proxy + SSL Let's Encrypt)       │
│  ├── Site statique /var/www/marketplace/             │
│  └── Certbot (renouvellement auto)                   │
└─────────────────────┬────────────────────────────────┘
                      ↓ CTA Acheter
┌──────────────────────────────────────────────────────┐
│  GUMROAD (checkout + livraison .zip)                 │
│  └─> gumroad.com/l/marketing-agence-fr               │
└──────────────────────────────────────────────────────┘
```

### Phase 2 (semaines 2-4)
- Ajout d'un backend léger (Node.js/Python) pour analytics custom
- Formulaire lead magnet avec Brevo API
- Dashboard privé (stats ventes, leads)

---

## 🎨 Charte graphique Lemon Zest

### Palette CSS (déjà dans index.html)
```css
--bg: #fdfaf4;          /* Fond crème */
--ink: #1a1814;         /* Encre texte */
--ink-soft: #4a453d;
--ink-muted: #8b857a;
--line: #e8e2d3;
--zest: #f5c518;        /* Jaune zest */
--zest-dark: #e0b000;
--zest-soft: #fdf4c9;
--lemon: #fef9d4;
--leaf: #2d5016;
--accent: #d94b1a;      /* Orange urgence */
```

### Typographies
- **Fraunces** (serif expressive) → titres
- **Manrope** (sans-serif) → body
- **JetBrains Mono** → code

---

## ✍️ Règles éditoriales (non-négociables)

- **Typographie française** : espaces insécables avant `:` `;` `?` `!` `%` `€`
- **Guillemets français** : « »
- **Apostrophes typographiques** : ’
- **Chiffres** : `1 250,50 €` (virgule décimale, espace milliers)
- **Ton mesuré**, pas de superlatifs US
- **Preuves chiffrées** obligatoires

### À éviter
- Jargon marketing vide (innovant, synergies, disruptif)
- Promesses absolues (100 % garanti, x10 vos ventes)
- Tutoiement dans les CTA
- Émojis excessifs (2-4 max par section)

---

## 💰 Offres actuelles

| Produit | Lancement | Standard | Catalogue |
|---|---|---|---|
| Pack Marketing Agence FR (skills) | **99 €** | 149 € | 199 € |
| Pack Routines Marketing FR v1 | 99 € | 129 € | 149 € |
| Bundle Skills + Routines | 149 € | 229 € | 299 € |
| Routines Premium (5 avancées) | — | 199 € | 249 € |

**Offre de lancement** : -50 % pendant 7 jours sur pack principal.

---

## 🔗 Intégrations externes

| Service | Rôle | État |
|---|---|---|
| **Gumroad** | Checkout + livraison | À créer demain |
| **Wise Business MU** | Compte de réception | À ouvrir demain (2j process) |
| **MCB EUR** | Compte fallback | Existant |
| **Brevo** | Newsletter + séquences | À configurer |
| **Notion** | CRM + pilotage | Actif (500 relations à trier) |
| **GitHub** | Code source | À créer |
| **Plausible** | Analytics RGPD | À installer phase 2 |

---

## 📊 Bases Notion actives (IDs utiles pour MCP Notion)

- **🎯 Skills Curator** : `[NOTION_DB_ID_SKILLS_CURATOR]` (75 skills analysés)
- **🚀 CRM Lancement Marketplace** : `[NOTION_DB_ID_CRM_LANCEMENT]` (500 relations LinkedIn)
- **🚀 Pilotage Lancement Marketplace FR** : page `[NOTION_PAGE_ID_PILOTAGE]`
- **⚡ Routines Claude Code Marketplace** : `[NOTION_DB_ID_ROUTINES]` (20 routines cataloguées)

> Les vrais IDs sont dans `.env` local (non commité). Voir `.env.example` pour la liste.

---

## 🎯 Priorités du weekend (18-19-20 avril)

### Samedi 18 avril (aujourd'hui)
1. **VPS création** (Hetzner ou OVH recommandé, ~5-10€/mois)
2. **Setup Nginx + SSL** pour `marketplace.lemonzest.digital`
3. **Déploiement site statique** depuis `marketplace-site/index.html`
4. **Gumroad compte société** + upload pack skills
5. **DNS configuration** chez registrar du domaine

### Dimanche 19 avril
1. **Audit 500 relations LinkedIn** → CRM Notion Tier A/B/C
2. **Préparation 10 DM Tier A** personnalisés
3. **Séquence welcome Brevo** setup (4 emails / 7 jours)

### Lundi 20 avril
1. **Teaser LinkedIn** (post #1 du plan 30j)
2. **DM Tier A** (5 premiers)
3. **Publication officielle** si tout est live

---

## 🛠️ Commandes VPS standards à prévoir

### Setup initial VPS
```bash
# Connexion SSH
ssh root@<IP_VPS>

# Mise à jour système
apt update && apt upgrade -y

# Installation stack minimale
apt install -y nginx certbot python3-certbot-nginx git ufw

# Firewall
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

### Déploiement site
```bash
# Clone du repo (après push GitHub)
cd /var/www/
git clone https://github.com/[USER]/lemonzest-stack.git
ln -s /var/www/lemonzest-stack/marketplace-site /var/www/marketplace

# Nginx config
cp /var/www/lemonzest-stack/ops/nginx-marketplace.conf /etc/nginx/sites-available/marketplace
ln -s /etc/nginx/sites-available/marketplace /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# SSL
certbot --nginx -d marketplace.lemonzest.digital
```

---

## 📝 Contexte de session précédente

Jean-Michel et Claude (Claude.ai) ont fait une **session longue de 8h+** le
**17 avril 2026 (vendredi soir)** pour construire toute la marketplace :

- Étude de marché validée (GO à 80 % confiance)
- Pack Skills créé (14 fichiers MD + guide d'installation PDF)
- Version Lite créée (lead magnet LinkedIn)
- Landing page HTML complète (38 Ko, 1308 lignes)
- Plan de lancement 30 jours rédigé
- Bases Notion structurées (Skills Curator + CRM + Routines + Pilotage)
- 20 routines Claude Code cataloguées
- Pricing final : 99 €/149 €/199 €

**Historique complet** dans : `/docs/session-17-avril-2026.md` (à créer au transfert)

---

## 🎓 Règles pour toi Claude Code

1. **Lis toujours ce CLAUDE.md en premier** à chaque nouvelle session
2. **Respecte la charte graphique et éditoriale** même si JM n'insiste pas
3. **Propose toujours 2-3 options** avant d'exécuter un changement majeur
4. **Commit messages** en français, format `feat: description` / `fix: ...` / `docs: ...`
5. **Jamais de `git push --force`** sur main sans confirmation explicite
6. **Tests locaux systématiques** avant push (au minimum `python3 -m http.server`)
7. **Sauvegarde automatique** : `./ops/backup.sh` avant toute opération risquée
8. **Tu peux accéder à Notion** via MCP si configuré — utilise les IDs ci-dessus

---

## 🆘 Contacts support

- **Email pro** : contact@lemonzest.digital
- **Société** : Lemon Zest Digital (Maurice)
- **Timezone** : UTC+4 (Maurice)
- **Domaine principal** : lemonzest.digital
- **Sous-domaine marketplace** : marketplace.lemonzest.digital

---

**Dernière mise à jour** : 18 avril 2026 (transfert Claude.ai → Claude Code)
