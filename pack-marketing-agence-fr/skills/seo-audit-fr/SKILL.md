---
name: seo-audit-fr
description: Audit SEO complet pour sites francophones (France, Belgique, Suisse, Maurice, Afrique FR). Utilisez dès qu'un utilisateur demande une analyse SEO, un audit de référencement, une étude de positionnement Google.fr, ou évoque des problèmes de visibilité sur un site francophone. Génère un rapport structuré avec SEO technique, on-page, contenu, maillage interne, SEO local FR, et recommandations actionnables priorisées. Inclut vérifications RGPD, schémas Google FR, annuaires locaux francophones.
---

# SEO Audit FR

Audit SEO spécialisé pour sites francophones avec approche structurée en 7 axes.

## Quand activer

- "Audit SEO de mon site"
- "Pourquoi mon site ne ranke pas sur Google"
- "Analyser le référencement de [URL]"
- "Comparer mon site à celui de mes concurrents FR"
- "Améliorer la visibilité de mon site B2B francophone"
- Toute demande d'analyse de performance SEO d'un site en français

## Spécificités du SEO francophone

### Marché Google FR
- **Google.fr** : 91% de part de marché en France (source Similarweb 2025)
- **Google.be** / **Google.ch** / **Google.mu** selon le pays cible
- Bing/Qwant/Ecosia : parts marginales mais Qwant en croissance (respect vie privée)
- SEO local : Google Maps + Pages Jaunes FR + Kompass

### Annuaires FR à surveiller
- Pages Jaunes (FR)
- Kompass (B2B FR)
- Societe.com
- Europages (B2B EU)
- PagesPro (B2B)
- Local : Petit Futé, Gralon, Yelp France

### Intégrations SEO FR populaires
- Yoast SEO (WordPress — standard FR)
- Rank Math (alternative populaire)
- SEOPress (éditeur français)
- Ahrefs / SEMrush (analyse concurrentielle)
- DataForSEO (données SERP FR)

## Structure de l'audit en 7 axes

### Axe 1 : SEO Technique
Vérifier :
- Vitesse de chargement (Core Web Vitals via PageSpeed Insights)
- Mobile-first indexing
- HTTPS + certificat SSL
- Robots.txt + sitemap.xml
- Erreurs 404, redirections 301
- Crawlabilité (Screaming Frog recommandé)
- Structure URL (lisibles, hiérarchisées, sans caractères spéciaux)

### Axe 2 : SEO On-Page
Pour chaque page prioritaire :
- Title (50-60 caractères, mot-clé principal à gauche)
- Meta description (140-155 caractères, accroche + CTA)
- H1 unique par page
- Hiérarchie Hn logique (H2 → H3 → H4)
- Densité mot-clé raisonnable (1-2%, éviter le keyword stuffing)
- Alt text sur toutes les images
- Attribut lang="fr" sur la balise `<html>`

### Axe 3 : Contenu
- Longueur moyenne des articles (500 mots minimum, 1500+ pour les pages pilier)
- Fraîcheur du contenu (articles datés, mis à jour)
- Orthographe et grammaire FR (correcteur type Antidote recommandé)
- Typographie française respectée (espaces insécables, guillemets français)
- Intention de recherche couverte (informationnelle, transactionnelle, navigationnelle)
- Recherche sémantique : champ lexical complet du sujet

### Axe 4 : Maillage interne
- Nombre de liens internes par page
- Ancres de liens descriptives (pas de "cliquez ici")
- Pages orphelines (non liées depuis le reste du site)
- Profondeur de clic (pages critiques à 3 clics max de l'accueil)
- Breadcrumbs / fil d'Ariane

### Axe 5 : SEO Local FR (si pertinent)
- Fiche Google Business Profile complète et à jour
- Présence sur Pages Jaunes avec fiche complète
- Citations NAP cohérentes (Nom, Adresse, Téléphone)
- Avis clients (volume + qualité + réponse du professionnel)
- Schema LocalBusiness / Organization

### Axe 6 : SEO Mobile + Core Web Vitals
- LCP (Largest Contentful Paint) < 2.5s
- FID (First Input Delay) < 100ms
- CLS (Cumulative Layout Shift) < 0.1
- Design responsive
- Taille des images optimisée (WebP recommandé)
- Police de chargement (font-display: swap)

### Axe 7 : SEO "off-site" + E-E-A-T
- Backlinks de qualité (vérifier via Ahrefs)
- Mentions de la marque sur le web FR
- Présence réseaux sociaux cohérente
- Page "À propos" et "Mentions légales" conformes
- Auteur identifié pour les articles (photo + bio)
- Schema Author / Organization

## Conformité RGPD (à vérifier systématiquement)

Un site FR non conforme RGPD = amende CNIL potentielle + pénalité SEO indirecte (bounce rate élevé sur bandeaux cookies mal gérés).

Checks obligatoires :
- Bandeau cookies conforme (consentement explicite opt-in)
- Politique de confidentialité accessible
- Mentions légales complètes (LCEN 2004)
- Droit d'accès / d'oubli mentionné
- Si tracking (GA4, FB Pixel) : conditionné au consentement
- Formulaires : finalité + durée de conservation indiquées

## Livrable : Rapport d'audit structuré

Utiliser le template `../templates/audit-seo-rapport.md` pour produire un rapport avec :

1. **Résumé exécutif** (3-5 bullets, score global /100)
2. **Tableau synthétique** par axe avec score et priorité
3. **Points forts** identifiés
4. **Points à améliorer** priorisés (Critique / Important / Nice-to-have)
5. **Plan d'action sur 90 jours** avec étapes concrètes
6. **Annexe technique** (captures d'écran, données brutes)

## Tonalité du rapport

- **Professionnel et bienveillant** : pas de "votre site est nul"
- **Orienté action** : chaque problème a une solution chiffrée
- **Transparent** : expliquer pourquoi chaque point compte pour le SEO
- **Chiffré quand possible** : "+15% de CTR estimé si les meta descriptions sont réécrites"

## Ne pas faire

- Inventer des données (trafic, position, backlinks) — toujours citer la source
- Promettre des résultats précis ("+50% de trafic en 30 jours")
- Minimiser des problèmes critiques pour ménager le client
- Utiliser du jargon sans l'expliquer (définir "Core Web Vitals" si nouveau client)

## Intégration avec d'autres skills du pack

- Après l'audit, si le client veut améliorer son contenu → `content-writer-fr`
- Si le client veut une proposition commerciale pour prestation SEO → `client-proposal-fr`
- Si le client veut promouvoir le nouveau contenu sur LinkedIn → `linkedin-post-fr`
