// Static fallback content for product pages.
// Keyed by slug first, then category, then 'default'.

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
    beforeOutput: `Voici un post LinkedIn sur le coaching B2B :

Today I want to share tips on productivity in B2B sales. Being efficient is key. Here are 5 tips:
1. Wake up early
2. Use a to-do list
3. Stay focused
4. Take breaks
5. Stay hydrated

#productivity #sales #B2B`,
    beforeVerdict: 'Ton US, anglicismes, conseils creux, hashtags EN — engagement quasi nul à prévoir',
    afterOutput: `J'ai perdu 3 clients en une semaine.

Pas parce que mon travail était mauvais. Parce que je ne publiais rien.

Pendant 6 mois je me suis dit « mon travail parle pour moi ». Spoiler : il ne parlait à personne.

Voici les 5 formats qui m'ont ramené 47 leads en 30 jours.

Le post « échec + leçon ». Engagement LinkedIn FR : 4,2 % contre 1,1 % en moyenne.

Le carrousel « méthode en 5 étapes ». 12 saves par post.

Le thread « données de marché ». 8 fois plus de partages que les posts d'opinion.

La vidéo « avant / après client ». Le format qui convertit le plus en discovery call.

Le commentaire stratégique sur les posts de prospects. Invisible mais redoutable.

Quel format testez-vous cette semaine ?

#CoachingB2B #LinkedInFR #ContentMarketing`,
    afterVerdict: 'Hook négatif, retournement, données FR réelles, hashtags B2B francophones, CTA ouvert',
    demo: [
      { role: 'user', text: 'Crée-moi un post LinkedIn pour mon offre de coaching B2B. Mes clients doublent leur taux de closing en 60 jours.' },
      { role: 'claude', text: 'Compétence Contenu Viral FR activée. J\'analyse avec le protocole viralité FR — 40 sources, 6 formats éprouvés.\n\nFormat recommandé : storytelling personnel (taux d\'engagement LinkedIn FR : 3,2 fois un post classique).\n\nStratégie : hook négatif, retournement, preuve sociale, CTA ouvert.\n\nDonnée clé détectée : « doubler le taux de closing en 60 jours » — je vais m\'en servir comme pivot émotionnel. Je génère maintenant.' },
      { role: 'user', text: 'Parfait, génère le post complet.' },
      { role: 'claude', text: 'J\'ai failli abandonner le coaching B2B.\n\nAprès 6 mois, mon meilleur client m\'a dit : « Tes méthodes marchent. Mais je les aurais trouvées tout seul. »\n\nCette phrase m\'a détruit.\n\nAlors j\'ai tout repensé. Plus de frameworks US recyclés, plus de templates copier-coller. Un protocole pensé pour le cycle de vente français.\n\nRésultat sur mes 12 derniers clients : taux de closing multiplié par 2 en 60 jours.\n\nPas avec plus de calls. Avec de meilleurs calls.\n\nLe lien pour comprendre la différence est en commentaire.\n\n#CoachingB2B #VentesFR #LinkedInFR\n\nScore viralité : 7,8 sur 10. Longueur : 142 mots (optimal FR). Hook validé. CTA algo validé.' },
    ],
    outputs: [
      { format: 'Post LinkedIn', description: 'Hook + storytelling + CTA ouvert', details: '~150 mots · score viralité · hashtags B2B FR' },
      { format: 'Thread X (Twitter)', description: '5 à 8 tweets chaînés pédagogiques', details: 'Format déroulé FR · accroches par tweet' },
      { format: 'Script YouTube Shorts', description: 'Hook 3s + structure AIDA 60s', details: 'Timestamps · description SEO · miniature' },
      { format: 'Caption TikTok / Reels', description: 'Tendances FR + hooks natifs', details: 'Sons suggérés · CTAs FR · durée optimale' },
    ],
  },

  'internationalisation-nextjs-fr': {
    beforeOutput: `Here's how to add i18n to your Next.js app:

1. Install next-intl: npm install next-intl
2. Create locales/en.json and locales/fr.json
3. Update next.config.js
4. Wrap your app with NextIntlClientProvider
5. Use useTranslations() in components

That's it! Your app now supports multiple languages.`,
    beforeVerdict: 'Instructions EN génériques, ignore le SEO multilingue, RGPD et RGAA — risques non couverts',
    afterOutput: `Internationalisation Next.js — plan FR complet

Architecture SEO-first, 6 décisions critiques

Routage : /fr/, /en/, /es/ avec middleware de détection auto.
Stratégie hreflang : balises rel="alternate" sur chaque page, sitemap XML multilingue conforme Google.
Canonical : une URL maître par contenu, rel=canonical par locale.

Conformité RGPD et RGAA

Bannière cookies traduite par locale, consentement stocké séparément par langue.
Attributs lang et aria-label sur tous les éléments interactifs.
Direction LTR / RTL automatique pour le support arabe et hébreu.

Migration de vos 47 pages existantes

Un script Python inclus détecte les chaînes non externalisées en 12 minutes. Temps estimé pour la migration complète : 3 heures pour un dev mid-level.`,
    afterVerdict: 'Architecture SEO FR, conformité RGPD/RGAA intégrée, hreflang natif, plan de migration réaliste',
    demo: [
      { role: 'user', text: 'Mon site Next.js est en français uniquement. Je veux l\'ouvrir à l\'anglais et à l\'espagnol sans casser le SEO.' },
      { role: 'claude', text: 'Compétence Internationalisation Next.js FR activée.\n\nDiagnostic préliminaire. Trois risques majeurs :\n\nRisque 1 : sans hreflang correct, Google indexe les 3 versions en compétition, ce qui entraîne une pénalité pour contenu dupliqué.\n\nRisque 2 : les bannières cookies doivent être traduites et le consentement stocké par locale (exigence RGPD).\n\nRisque 3 : des attributs aria-label en anglais sur une interface française provoquent une non-conformité RGAA.\n\nJe vous prépare l\'architecture complète. Combien de pages a votre site actuellement ?' },
      { role: 'user', text: '47 pages, majoritairement statiques, quelques pages dynamiques pour un catalogue produit.' },
      { role: 'claude', text: 'Plan de migration FR / EN / ES — 47 pages.\n\nPhase 1, jours 1 et 2 : structure de routage. Middleware de détection de locale vers /fr/, /en/, /es/. next-intl v4 avec fallback intelligent FR vers EN.\n\nPhase 2, jours 3 et 4 : SEO multilingue. Sitemap XML avec hreflang sur 141 URLs (47 pages multipliées par 3 locales). Open Graph par langue avec og:locale. Script Python de vérification des traductions inclus.\n\nPhase 3, jour 5 : conformité. Bannière RGPD traduite avec consentement par locale. Audit RGAA sur lang, aria-label, direction.\n\nTemps estimé : 3 heures de dev mid-level avec les templates fournis.' },
    ],
    outputs: [
      { format: 'Plan architecture', description: 'Routage + SEO + conformité', details: 'Décisions documentées · risques listés' },
      { format: 'Fichiers traduction JSON', description: 'Structure i18n prête à l\'emploi', details: 'next-intl v4 · fallback FR→EN · typage TS' },
      { format: 'Sitemap hreflang XML', description: 'Google-compliant, multilocale', details: '141 URLs pour 47 pages × 3 locales' },
      { format: 'Rapport vérification', description: 'Script Python d\'audit traductions', details: 'Détecte chaînes manquantes en 12 min' },
    ],
  },

  'ai-marketing-claude-zubair-trabzada-fr': {
    beforeOutput: `Here's a basic SEO audit for your website:

- Check title tags (should be under 60 chars)
- Check meta descriptions
- Make sure your site loads fast
- Get some backlinks
- Post regular content

These basic steps will help your SEO rankings.`,
    beforeVerdict: 'Conseils US génériques, ignore CNIL et RGPD, aucun scoring, non actionnable',
    afterOutput: `Audit SEO — rapport exécutif (18 pages)

Score global : 62 sur 100.

Répartition par axe

Technique : 48 sur 100. robots.txt bloque /blog/ (34 articles non indexés).
On-page : 67 sur 100. 12 titles en double, H1 absent sur la home.
Contenu : 78 sur 100. Bon maillage, articles supérieurs à 1 500 mots.
RGPD : 30 sur 100. GA4 actif sans bannière de consentement, risque CNIL avéré.
Local SEO : 55 sur 100. Google Business non revendiqué.
Performance : 82 sur 100. Core Web Vitals dans le vert.

Top 5 actions, classées par ROI

1. Corriger robots.txt pour récupérer 40 % de pages indexées (1 heure).
2. Installer la bannière CNIL pour une conformité immédiate (2 heures).
3. Revendiquer la fiche Google Business pour gagner 25 % de trafic local (30 minutes).
4. Dédupliquer les titles pour gagner 15 % de CTR en SERP (3 heures).
5. Publier un sitemap.xml pour diviser par 2 le délai d'indexation (1 heure).`,
    afterVerdict: 'Audit 6 axes, scoring 0 à 100, conformité CNIL intégrée, actions priorisées par ROI',
    demo: [
      { role: 'user', text: 'Fais-moi un audit SEO de mon site : agence-comptable-bordeaux.fr' },
      { role: 'claude', text: 'Suite Marketing IA FR activée, module Audit SEO.\n\nJ\'analyse 6 axes : technique, on-page, contenu, RGPD, local, performance.\n\nPremiers résultats. robots.txt bloque /ressources/ — 22 pages non indexées. GA4 actif sans bannière de consentement — risque d\'amende CNIL. Google Business présent mais non revendiqué. Core Web Vitals : LCP 1,8 s validé, CLS 0,02 validé.\n\nJe génère le rapport complet (PDF 18 pages) ?' },
      { role: 'user', text: 'Oui, avec le plan d\'action priorisé.' },
      { role: 'claude', text: 'Rapport complet. Score global : 58 sur 100.\n\nPlan d\'action sur 4 semaines.\n\nSemaine 1, 3 heures de quick wins. Correction robots.txt, 22 pages indexables immédiatement. Installation de la bannière CNIL pour la conformité RGPD.\n\nSemaine 2, 5 heures d\'on-page. 8 titles dédupliqués, gain estimé de 12 % de CTR. H1 ajouté sur 4 pages clés pour renforcer le signal de pertinence.\n\nSemaines 3 et 4, 6 heures pour l\'autorité locale. Fiche Google Business revendiquée, 15 avis clients sollicités. 3 articles de fond sur des mots-clés comptables de Bordeaux.\n\nROI estimé : 35 % de trafic organique supplémentaire en 90 jours.' },
    ],
    outputs: [
      { format: 'Audit SEO complet', description: 'Rapport PDF 18 pages, 6 axes', details: 'Score 0-100 · CNIL intégrée · plan 4 sem.' },
      { format: 'Copy landing page', description: 'Structure AIDA adaptée FR', details: 'Hook · preuve sociale · CTA · A/B variant' },
      { format: 'Séquence email (5)', description: 'Nurturing B2B francophone', details: 'Délais optimaux · objet + preview · RGPD' },
      { format: 'Stratégie LinkedIn 90j', description: 'Calendrier éditorial complet', details: '12 formats · fréquence · KPIs FR' },
    ],
  },

  'marketing-agence-fr': {
    beforeOutput: `Voici une proposition commerciale :

Chère madame, cher monsieur,

Nous vous proposons nos services marketing.
Nos prix sont compétitifs.
Nous avons beaucoup d'expérience.

Cordialement,
L'équipe`,
    beforeVerdict: 'Trop vague, pas de chiffres, pas de cas clients — aucun argument de conversion',
    afterOutput: `Proposition commerciale — Agence Dupont & Associés
Préparée pour le Cabinet Martin Conseil, 20 avril 2026

Votre situation

Vous avez 47 clients actifs en Île-de-France et vous visez 80 d'ici fin 2026. Le frein n'est pas le marché : c'est votre site, qui génère zéro lead entrant malgré 2 000 visiteurs par mois.

Notre proposition

Audit complet puis refonte SEO sur 4 semaines. Objectif chiffré : 50 leads organiques par mois sous 90 jours. Méthode déjà déployée chez 12 cabinets comparables au vôtre.

Référence client : Cabinet Lefebvre (Paris 8e), passé de 0 à 34 leads mensuels en 3 mois.

Investissement

2 400 € HT par mois, engagement 6 mois. Avec un CA moyen de 4 000 € par dossier gagné, la rentabilité est atteinte dès le deuxième lead converti du mois.

Prochaine étape

Un rendez-vous de cadrage de 45 minutes la semaine prochaine. Je vous propose 3 créneaux mercredi après-midi.`,
    afterVerdict: 'Personnalisée, chiffrée, preuve sociale, ROI explicite — conversion multipliée par 3',
    demo: [
      { role: 'user', text: 'Prépare une propale pour un cabinet de conseil juridique à Lyon, 15 collaborateurs, veut plus de leads B2B.' },
      { role: 'claude', text: 'Skills Marketing Agence FR activés, module Propositions Commerciales.\n\nJe prépare la propale personnalisée. Quelques éléments que j\'intègre automatiquement.\n\nContexte marché : les cabinets juridiques lyonnais sont en forte demande de digitalisation depuis 2024.\n\nBenchmark : 3 cabinets comparables en base, taux de conversion moyen 2,3 %.\n\nAncrage prix : formule mensuelle vs one-shot pour jouer sur la psychologie d\'achat B2B.\n\nJe génère le document complet, 12 pages ?' },
      { role: 'user', text: 'Oui, avec un focus sur leur ROI.' },
      { role: 'claude', text: 'Proposition — Cabinet [Nom], Lyon, juridique B2B.\n\nROI calculé pour votre cabinet. Honoraires moyens par dossier : 3 500 €. Objectif de leads par mois : 8 (réaliste à 90 jours). Taux de closing estimé sur cabinets similaires : 22 %.\n\n1,7 nouveau dossier par mois multiplié par 3 500 € = 6 000 € de CA additionnel mensuel.\n\nInvestissement mensuel proposé : 1 800 € HT. Retour sur investissement supérieur à 3 dès le mois 4.\n\nDocument complet 12 pages généré, PDF prêt à envoyer au client.' },
    ],
    outputs: [
      { format: 'Proposition commerciale', description: 'Personnalisée, chiffrée, ROI inclus', details: '12 pages · PDF client · conversion × 3' },
      { format: 'Rapport audit SEO', description: '6 axes, score 0-100, plan 4 sem.', details: 'CNIL intégrée · actions priorisées par ROI' },
      { format: 'Calendrier éditorial 30j', description: 'Planning social + blog complet', details: '20 posts · horaires FR · angles éditoriaux' },
      { format: 'Campagne email (5 mails)', description: 'Séquence nurturing B2B FR', details: 'Objets testés · RGPD · taux ouverture +40%' },
    ],
  },
};

// ─── By category ──────────────────────────────────────────────────────────────

const BY_CATEGORY: Record<string, ProductContent> = {
  Marketing: {
    beforeOutput: `Voici du contenu marketing :

Bonjour,

Nous proposons des services de qualité à des prix compétitifs.
Contactez-nous pour en savoir plus.

Cordialement`,
    beforeVerdict: 'Générique, sans valeur, aucun argument différenciant',
    afterOutput: `Je me suis planté 3 fois avant de trouver la bonne structure.

La plupart des posts B2B français tombent à plat pour la même raison : ils parlent comme un communiqué de presse.

La structure qui marche, c'est un hook qui dérange, un problème client précis, une preuve chiffrée, une question ouverte en fin.

C'est tout. Pas de templates recyclés, pas de frameworks US, juste un ton qui ressemble à votre marque.

#MarketingFR #LinkedInFR #BtoB`,
    afterVerdict: 'Structure éprouvée, ton FR authentique, preuve sociale intégrée',
    demo: [
      { role: 'user', text: 'Aide-moi à créer du contenu marketing pour mon offre.' },
      { role: 'claude', text: 'Compétence Marketing FR activée. Je suis prêt à créer du contenu adapté au marché francophone. Décrivez votre offre et votre audience cible — je m\'occupe du reste.' },
    ],
    outputs: [
      { format: 'Post LinkedIn', description: 'Hook + storytelling + CTA', details: 'Score viralité · hashtags FR · optimal algo' },
      { format: 'Email campagne', description: 'Séquence nurturing B2B', details: 'RGPD compliant · objets optimisés' },
      { format: 'Rapport SEO', description: 'Audit 6 axes + plan action', details: 'CNIL intégrée · ROI estimé' },
      { format: 'Propale client', description: 'Personnalisée + chiffrée', details: 'PDF prêt · ROI calculé' },
    ],
  },

  Tech: {
    beforeOutput: `Here's how to build your feature:

1. Create a new component
2. Add state management
3. Connect to the API
4. Write tests
5. Deploy

Good luck!`,
    beforeVerdict: 'Instructions EN génériques, ignore RGPD, RGAA et les spécificités du marché FR',
    afterOutput: `Plan d'implémentation — feature [X]

Contraintes FR identifiées

La feature collecte des données personnelles, il faut donc documenter la base légale au sens de l'article 6 RGPD. Les composants interactifs doivent exposer aria-label et un focus visible (exigence RGAA). Le stockage des données doit rester en UE, conformément aux recommandations CNIL.

Architecture proposée

Plan technique détaillé adapté à votre stack, avec diagramme d'architecture et contrats d'API documentés.

Tests et déploiement

Plan de tests complet (unitaires, intégration, end-to-end) et checklist sécurité OWASP adaptée au marché français.`,
    afterVerdict: 'Plan complet, conformité RGPD et RGAA intégrée, hébergement UE, sécurité OWASP',
    demo: [
      { role: 'user', text: 'Je dois implémenter une feature complexe dans mon app.' },
      { role: 'claude', text: 'Compétence Tech FR activée. Je vais concevoir une solution qui respecte les standards FR : RGPD, RGAA, sécurité OWASP. Décrivez votre besoin en détail.' },
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
  beforeOutput: `Claude sans compétence :

Voici une réponse générique à votre demande. Je fais de mon mieux avec les informations disponibles, mais je manque de contexte spécifique à votre métier et au marché français.`,
  beforeVerdict: 'Réponse générique, sans expertise métier, sans adaptation FR',
  afterOutput: `Claude avec la compétence active :

Je connais votre secteur, vos outils et vos réglementations.

Réponse structurée selon les standards de votre métier, avec les références légales françaises applicables et dans un format de livrable prêt à envoyer.

Résultat prêt pour le client, en français natif — pas un brouillon à retoucher.`,
  afterVerdict: 'Expert métier, conformité FR, livrable prêt à utiliser',
  demo: [
    { role: 'user', text: 'Active cette compétence et montre-moi ce qu\'elle sait faire.' },
    { role: 'claude', text: 'Compétence active. Je suis prêt. Décrivez votre besoin en langage naturel — je m\'en occupe avec les standards de votre métier, en français natif, avec les références réglementaires applicables.' },
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
