// Static fallback content for product pages.
// Keyed by slug first, then category, then 'default'.
// All Notion-side optional fields (before_output etc.) can override these.

export interface ConvMessage { role: 'user' | 'claude'; text: string }
export interface OutputExample { format: string; description: string; details: string }

export interface ProductContent {
  beforeOutput: string;
  beforeVerdict: string;
  afterOutput: string;
  afterVerdict: string;
  demo: ConvMessage[];
  outputs: OutputExample[];
}

// ─── By slug ──────────────────────────────────────────────────────────────────

const BY_SLUG: Record<string, ProductContent> = {

  'create-viral-content-aaaronmiller-fr': {
    beforeOutput: `"Voici un post LinkedIn sur le coaching B2B :\n\nToday I want to share tips on productivity in B2B sales. Being efficient is key. Here are 5 tips:\n1. Wake up early\n2. Use a to-do list\n3. Stay focused\n4. Take breaks\n5. Stay hydrated\n\n#productivity #sales #B2B"`,
    beforeVerdict: 'Ton US, anglicismes, conseils creux, hashtags EN — 0 engagement prévisible',
    afterOutput: `"J'ai perdu 3 clients en une semaine.\n\nPas parce que mon travail était mauvais.\nParce que je ne publiais rien.\n\nPendant 6 mois je me disais « mon travail parle pour moi ».\nSpoiler : il ne parlait à personne.\n\nVoici les 5 formats qui m'ont ramené 47 leads en 30 jours :\n↓\n\n1/ Le post « échec + leçon »\n→ Engagement LinkedIn FR : 4,2 % vs 1,1 % en moyenne\n\n2/ Le carrousel « méthode en 5 étapes »\n→ 12 saves par post en moyenne\n\n3/ Le thread « données de marché »\n→ 8× plus de partages que les posts opinion\n\n[...]\n\nQuel format testez-vous cette semaine ?\n\n#CoachingB2B #LinkedInFR #ContentMarketing"`,
    afterVerdict: 'Hook négatif + retournement, données FR réelles, hashtags B2B francophones, CTA ouvert',
    demo: [
      { role: 'user', text: 'Crée-moi un post LinkedIn pour mon offre de coaching B2B. Mes clients doublent leur taux de closing en 60 jours.' },
      { role: 'claude', text: '✦ **Compétence Contenu Viral FR** activée.\n\nJ\'analyse avec le protocole viralité FR — 40 sources, 6 formats éprouvés.\n\n**Format recommandé** : Storytelling personnel (taux d\'engagement LinkedIn FR : 3,2× vs post classique).\n\n**Stratégie** : Hook négatif → retournement → preuve sociale → CTA ouvert.\n\nDonnée clé détectée : « doubler le taux de closing en 60 jours » → je vais l\'utiliser comme pivot émotionnel. Je génère maintenant...' },
      { role: 'user', text: 'Parfait, génère le post complet.' },
      { role: 'claude', text: '**J\'ai failli abandonner le coaching B2B.**\n\nAprès 6 mois, mon meilleur client m\'a dit :\n« Tes méthodes marchent. Mais je les aurais trouvées tout seul. »\n\nCette phrase m\'a détruit.\n\nAlors j\'ai tout repensé :\n→ Exit les frameworks US recyclés\n→ Exit les templates copier-coller\n→ Place à un protocole adapté au cycle de vente français\n\nRésultat pour mes 12 derniers clients :\n**Taux de closing × 2 en 60 jours.**\n\nPas avec plus de calls. Avec de meilleurs calls.\n\nSi vous voulez comprendre la différence, le lien est dans les commentaires ↓\n\n#CoachingB2B #VentesFR #LinkedInFR\n\n---\n**Score viralité** : 7,8/10 · **Longueur** : 142 mots (optimal FR) · **Hook** ✓ · **CTA algo** ✓' },
    ],
    outputs: [
      { format: 'Post LinkedIn', description: 'Hook + storytelling + CTA ouvert', details: '~150 mots · score viralité · hashtags B2B FR' },
      { format: 'Thread X (Twitter)', description: '5-8 tweets chaînés pédagogiques', details: 'Format déroulé FR · accroches par tweet' },
      { format: 'Script YouTube Shorts', description: 'Hook 3s + structure AIDA 60s', details: 'Timestamps · description SEO · miniature' },
      { format: 'Caption TikTok / Reels', description: 'Tendances FR + hooks natifs', details: 'Sons suggérés · CTAs FR · durée optimale' },
    ],
  },

  'internationalisation-nextjs-fr': {
    beforeOutput: `"Here's how to add i18n to your Next.js app:\n\n1. Install next-intl: npm install next-intl\n2. Create locales/en.json and locales/fr.json\n3. Update next.config.js\n4. Wrap your app with NextIntlClientProvider\n5. Use useTranslations() in components\n\nThat's it! Your app now supports multiple languages."`,
    beforeVerdict: 'Instructions EN génériques, ignore SEO multilingue, RGPD et RGAA — risques non couverts',
    afterOutput: `"# Internationalisation Next.js — Plan FR complet\n\n## Architecture SEO-first (6 décisions critiques)\n\n**Routage** : /fr/, /en/, /es/ avec middleware de détection auto\n**Stratégie hreflang** : balises <link rel="alternate"> sur chaque page, sitemap XML multilingue Google-compliant\n**Canonical** : une URL maître par contenu, rel=canonical par locale\n\n## Conformité RGPD + RGAA\n\n- Bannière cookies traduite par locale (consentement séparé)\n- Attributs lang + aria-label sur tous les éléments interactifs\n- Direction LTR/RTL automatique (support arabe/hébreu)\n\n## Migration de vos 47 pages existantes\n\nScript Python inclus → détecte les strings non externalisées en 12 min.\nTemps estimé migration complète : 3h pour un dev mid-level."`,
    afterVerdict: 'Architecture SEO FR, conformité RGPD/RGAA intégrée, hreflang natif, plan migration réaliste',
    demo: [
      { role: 'user', text: 'Mon site Next.js est en français uniquement. Je veux l\'ouvrir à l\'anglais et l\'espagnol sans casser le SEO.' },
      { role: 'claude', text: '✦ **Compétence Internationalisation Next.js FR** activée.\n\nDiagnostic préliminaire :\n\n**Risque n°1** : sans hreflang correct, Google indexe les 3 versions en compétition → pénalité duplicate content.\n**Risque n°2** : bannières cookies doivent être traduites et le consentement stocké par locale (RGPD).\n**Risque n°3** : attributs aria-label EN sur interface FR → non-conformité RGAA.\n\nJe vous prépare l\'architecture complète. Combien de pages a votre site actuellement ?' },
      { role: 'user', text: '47 pages, majoritairement statiques, quelques pages dynamiques pour un catalogue produit.' },
      { role: 'claude', text: '**Plan de migration FR/EN/ES — 47 pages**\n\nPhase 1 (Jour 1-2) : Structure routage\n→ Middleware de détection locale → /fr/, /en/, /es/\n→ next-intl v4 avec fallback intelligent FR → EN\n\nPhase 2 (Jour 3-4) : SEO multilingue\n→ Sitemap XML avec hreflang sur 141 URLs (47 × 3 locales)\n→ Open Graph par langue (og:locale)\n→ Script Python de vérification traductions inclus\n\nPhase 3 (Jour 5) : Conformité\n→ Bannières RGPD traduite + consentement par locale\n→ Audit RGAA : lang, aria-label, direction\n\n**Temps estimé** : 3h dev mid-level avec les templates fournis.' },
    ],
    outputs: [
      { format: 'Plan architecture', description: 'Routage + SEO + conformité', details: 'Décisions documentées · risques listés' },
      { format: 'Fichiers traduction JSON', description: 'Structure i18n prête à l\'emploi', details: 'next-intl v4 · fallback FR→EN · typage TS' },
      { format: 'Sitemap hreflang XML', description: 'Google-compliant, multilocale', details: '141 URLs pour 47 pages × 3 locales' },
      { format: 'Rapport vérification', description: 'Script Python d\'audit traductions', details: 'Détecte strings manquantes en 12 min' },
    ],
  },

  'ai-marketing-claude-zubair-trabzada-fr': {
    beforeOutput: `"Here's a basic SEO audit for your website:\n\n- Check title tags (should be under 60 chars)\n- Check meta descriptions\n- Make sure your site loads fast\n- Get some backlinks\n- Post regular content\n\nThese basic steps will help your SEO rankings."`,
    beforeVerdict: 'Conseils US génériques, ignore CNIL/RGPD, aucun scoring, non actionnable',
    afterOutput: `"# Audit SEO — Rapport exécutif (18 pages)\n\n## Score global : 62/100\n\n### Répartition par axe :\n🔴 Technique : 48/100 — robots.txt bloque /blog/ (34 articles non indexés)\n🟡 On-page : 67/100 — 12 title en double, H1 absent sur la home\n🟢 Contenu : 78/100 — bon maillage, articles >1500 mots\n🔴 RGPD : 30/100 — GA4 sans bannière consentement → risque CNIL\n🟡 Local SEO : 55/100 — Google Business non revendiqué\n🟢 Performance : 82/100 — Core Web Vitals OK\n\n## Top 5 actions (ROI estimé)\n1. Corriger robots.txt → +40% pages indexées (1h)\n2. Bannière CNIL → conformité immédiate (2h)\n3. Google Business → +25% trafic local (30min)\n4. Dédupliquer titles → +15% CTR SERP (3h)\n5. Sitemap.xml → -50% délai indexation (1h)"`,
    afterVerdict: 'Audit 6 axes, scoring 0-100, conformité CNIL intégrée, actions priorisées par ROI',
    demo: [
      { role: 'user', text: 'Fais-moi un audit SEO de mon site : agence-comptable-bordeaux.fr' },
      { role: 'claude', text: '✦ **Suite Marketing IA FR** activée — module Audit SEO.\n\nJ\'analyse en 6 axes (technique, on-page, contenu, RGPD, local, performance)...\n\n**Premiers résultats** :\n🔴 robots.txt bloque /ressources/ → 22 pages non indexées\n🔴 GA4 actif sans bannière consentement → risque amende CNIL\n🟡 Google Business présent mais non revendiqué\n🟢 Core Web Vitals : LCP 1,8s ✓, CLS 0,02 ✓\n\nJe génère le rapport complet PDF 18 pages ?' },
      { role: 'user', text: 'Oui, avec le plan d\'action priorisé.' },
      { role: 'claude', text: '**Rapport complet — Score global : 58/100**\n\n**Plan d\'action 4 semaines** :\n\nSemaine 1 (3h) — Quick wins :\n→ robots.txt corrigé → 22 pages indexables immédiatement\n→ Bannière CNIL installée → conformité RGPD\n\nSemaine 2 (5h) — On-page :\n→ 8 titles dédupliqués → +12% CTR estimé\n→ H1 ajouté sur 4 pages clés → signal de pertinence\n\nSemaine 3-4 (6h) — Autorité locale :\n→ Google Business revendiqué + 15 avis sollicités\n→ 3 articles de fond sur mots-clés comptables Bordeaux\n\n**ROI estimé** : +35% trafic organique en 90 jours.' },
    ],
    outputs: [
      { format: 'Audit SEO complet', description: 'Rapport PDF 18 pages, 6 axes', details: 'Score 0-100 · CNIL intégrée · plan 4 sem.' },
      { format: 'Copy landing page', description: 'Structure AIDA adaptée FR', details: 'Hook · preuve sociale · CTA · A/B variant' },
      { format: 'Séquence email (5)', description: 'Nurturing B2B francophone', details: 'Délais optimaux · objet + preview · RGPD' },
      { format: 'Stratégie LinkedIn 90j', description: 'Calendrier éditorial complet', details: '12 formats · fréquence · KPIs FR' },
    ],
  },

  'marketing-agence-fr': {
    beforeOutput: `"Voici une proposition commerciale :\n\nChère madame, cher monsieur,\n\nNous vous proposons nos services marketing.\nNos prix sont compétitifs.\nNous avons beaucoup d'expérience.\n\nCordialement,\nL'équipe"`,
    beforeVerdict: 'Trop vague, pas de chiffres, pas de cas clients — aucun argument de conversion',
    afterOutput: `"**Proposition Commerciale — Agence Dupont & Associés**\nPréparée pour : Cabinet Martin Conseil\nDate : 20 avril 2026\n\n## Votre situation\n\nVous avez 47 clients actifs en Île-de-France et souhaitez atteindre 80 d\'ici fin 2026. Votre principal frein : un site web qui génère 0 lead entrant malgré 2 000 visiteurs/mois.\n\n## Notre réponse\n\n**Audit + refonte SEO** (semaines 1-4)\n→ Objectif : 50 leads/mois organiques sous 90 jours\n→ Méthode éprouvée sur 12 cabinets similaires\n\n**Preuve** : Cabinet Lefebvre (Paris 8e) — 0 → 34 leads/mois en 3 mois\n\n## Investissement\n\nFormule Croissance : 2 400 € HT/mois (engagement 6 mois)\nROI estimé : 1 lead = 4 000 € de CA potentiel → objectif 136 000 € de pipe/mois"`,
    afterVerdict: 'Personnalisée, chiffrée, preuve sociale, ROI explicite — conversion 3× supérieure',
    demo: [
      { role: 'user', text: 'Prépare une propale pour un cabinet de conseil juridique à Lyon, 15 collaborateurs, veut plus de leads B2B.' },
      { role: 'claude', text: '✦ **Skills Marketing Agence FR** activés — module Propositions Commerciales.\n\nJe prépare la propale personnalisée. Quelques éléments que j\'intègre automatiquement :\n\n**Contexte marché** : Cabinets juridiques Lyon → segment en forte demande de digitalisation post-2024\n**Benchmark** : 3 cabinets similaires référencés en base → taux de conversion moyen 2,3%\n**Ancrage prix** : formule mensuelle vs one-shot → psychologie d\'achat B2B favorable\n\nJe génère le document complet (12 pages) ?' },
      { role: 'user', text: 'Oui, avec un focus sur leur ROI.' },
      { role: 'claude', text: '**Proposition — Cabinet [Nom] · Lyon · Juridique B2B**\n\n**ROI calculé pour votre cabinet** :\n- Honoraires moyen/dossier : 3 500 €\n- Objectif leads/mois : 8 (réaliste à 90j)\n- Taux closing estimé cabinets similaires : 22%\n→ **1,7 nouveau dossier/mois × 3 500 € = 6 000 €/mois de CA additionnel**\n\nInvestissement mensuel proposé : 1 800 € HT\n→ Retour sur investissement : **× 3,3 dès le mois 4**\n\n[Document complet 12 pages généré — PDF prêt client]' },
    ],
    outputs: [
      { format: 'Proposition commerciale', description: 'Personnalisée, chiffrée, ROI inclus', details: '12 pages · PDF client · taux de conversion +3×' },
      { format: 'Rapport audit SEO', description: '6 axes, score 0-100, plan 4 sem.', details: 'CNIL intégrée · actions priorisées par ROI' },
      { format: 'Calendrier éditorial 30j', description: 'Planning social + blog complet', details: '20 posts · horaires FR · angles éditoriaux' },
      { format: 'Campagne email (5 mails)', description: 'Séquence nurturing B2B FR', details: 'Objets testés · RGPD · taux ouverture +40%' },
    ],
  },
};

// ─── By category ──────────────────────────────────────────────────────────────

const BY_CATEGORY: Record<string, ProductContent> = {
  Marketing: {
    beforeOutput: `"Voici du contenu marketing :\n\nBonjour,\n\nNous proposons des services de qualité à des prix compétitifs.\nContactez-nous pour en savoir plus.\n\nCordialement"`,
    beforeVerdict: 'Générique, sans valeur, aucun argument différenciant',
    afterOutput: `"**[Hook accrocheur adapté à votre audience FR]**\n\n[Problème client formulé avec empathie]\n\n[Solution concrète + preuve sociale FR]\n\n[CTA spécifique]\n\n#MarketingFR #[SecteurCible] #BtoB"`,
    afterVerdict: 'Structure éprouvée, ton professionnel FR, preuve sociale intégrée',
    demo: [
      { role: 'user', text: 'Aide-moi à créer du contenu marketing pour mon offre.' },
      { role: 'claude', text: '✦ Compétence Marketing FR activée.\n\nJe suis prêt à créer du contenu adapté au marché francophone. Décrivez votre offre et votre audience cible — je m\'occupe du reste.' },
    ],
    outputs: [
      { format: 'Post LinkedIn', description: 'Hook + storytelling + CTA', details: 'Score viralité · hashtags FR · optimal algo' },
      { format: 'Email campagne', description: 'Séquence nurturing B2B', details: 'RGPD compliant · objets optimisés' },
      { format: 'Rapport SEO', description: 'Audit 6 axes + plan action', details: 'CNIL intégrée · ROI estimé' },
      { format: 'Propale client', description: 'Personnalisée + chiffrée', details: 'PDF prêt · ROI calculé' },
    ],
  },

  Tech: {
    beforeOutput: `"Here's how to build your feature:\n\n1. Create a new component\n2. Add state management\n3. Connect to the API\n4. Write tests\n5. Deploy\n\nGood luck!"`,
    beforeVerdict: 'Instructions EN génériques, ignore RGPD, RGAA, et les spécificités du marché FR',
    afterOutput: `"# Plan d'implémentation — Feature [X]\n\n## Contraintes FR identifiées\n- RGPD : données personnelles → base légale à documenter\n- RGAA : composants accessibles (aria-label, focus visible)\n- Hébergement : préférence UE (CNIL)\n\n## Architecture proposée\n[Plan technique détaillé adapté à votre stack]\n\n## Tests & déploiement\n[Plan de tests + checklist sécurité OWASP adapté FR]"`,
    afterVerdict: 'Plan complet, conformité RGPD/RGAA intégrée, hébergement UE, sécurité OWASP',
    demo: [
      { role: 'user', text: 'Je dois implémenter une feature complexe dans mon app.' },
      { role: 'claude', text: '✦ Compétence Tech FR activée.\n\nJe vais concevoir une solution respectant les standards FR : RGPD, RGAA, sécurité OWASP. Décrivez votre besoin en détail.' },
    ],
    outputs: [
      { format: 'Plan architecture', description: 'Décisions techniques documentées', details: 'Risques · alternatives · conformité' },
      { format: 'Spécifications', description: 'Spec fonctionnelle + technique', details: 'User stories · critères d\'acceptance' },
      { format: 'Plan de tests', description: 'Stratégie QA complète', details: 'Unit · intégration · E2E · accessibilité' },
      { format: 'Checklist déploiement', description: 'Go-live sécurisé', details: 'OWASP · RGPD · monitoring · rollback' },
    ],
  },
};

// ─── Default ──────────────────────────────────────────────────────────────────

const DEFAULT: ProductContent = {
  beforeOutput: `"Claude sans compétence :\n\nVoici une réponse générique à votre demande. Je fais de mon mieux avec les informations disponibles, mais je manque de contexte spécifique à votre métier et au marché français."`,
  beforeVerdict: 'Réponse générique, sans expertise métier, sans adaptation FR',
  afterOutput: `"Claude avec la compétence active :\n\n✦ Je connais votre secteur, vos outils, vos réglementations.\n\n[Réponse structurée selon les standards de votre métier]\n[Références légales françaises applicables]\n[Format de livrable prêt à utiliser]\n\n→ Résultat prêt à envoyer au client, en français natif."`,
  afterVerdict: 'Expert métier, conformité FR, livrable prêt — pas un brouillon à retoucher',
  demo: [
    { role: 'user', text: 'Active cette compétence et montre-moi ce qu\'elle sait faire.' },
    { role: 'claude', text: '✦ Compétence active.\n\nJe suis prêt. Décrivez votre besoin en langage naturel — je m\'en occupe avec les standards de votre métier, en français natif, avec les références réglementaires applicables.' },
  ],
  outputs: [
    { format: 'Livrable principal', description: 'Adapté à votre demande', details: 'Format professionnel · prêt à utiliser' },
    { format: 'Variante A/B', description: 'Alternative pour tester', details: 'Angle différent · même qualité' },
    { format: 'Rapport structuré', description: 'Synthèse exécutive', details: 'Headers · bullets · conclusions' },
    { format: 'Template réutilisable', description: 'Pour itérer rapidement', details: 'Variables à remplir · instructions claires' },
  ],
};

// ─── Public API ───────────────────────────────────────────────────────────────

export function getProductContent(slug: string, categories: string[]): ProductContent {
  if (BY_SLUG[slug]) return BY_SLUG[slug];
  for (const cat of categories) {
    if (BY_CATEGORY[cat]) return BY_CATEGORY[cat];
  }
  return DEFAULT;
}
