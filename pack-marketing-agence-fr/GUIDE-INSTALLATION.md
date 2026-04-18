# 🚀 Guide d'installation — Pack Marketing Agence FR

**Bienvenue et merci pour votre achat !**

Ce guide vous permet d'installer et d'utiliser le pack en moins de 5 minutes,
quelle que soit votre plateforme IA préférée.

---

## 📦 Ce que vous avez téléchargé

Un fichier `.zip` contenant :

- **1 skill orchestrateur** qui route automatiquement vers le bon sous-skill
- **5 sous-skills spécialisés** (SEO, contenu, LinkedIn, email, propositions)
- **2 références contextuelles** (marché FR, RGPD)
- **5 templates** prêts à personnaliser

**Taille totale** : ~50 Ko · 14 fichiers au format `.md` (Markdown).

---

## 🎯 Avant de commencer : quelle plateforme utilisez-vous ?

Choisissez votre mode d'installation selon votre environnement :

| Plateforme | Mode | Temps | Difficulté |
|---|---|---|---|
| **Claude.ai** (Pro / Team) | Mode A | 3 min | ⭐ Débutant |
| **Claude Code** (CLI) | Mode B | 2 min | ⭐⭐ Intermédiaire |
| **ChatGPT** (Plus / Team) | Mode C | 5 min | ⭐ Débutant |
| **Cursor / Codex / autres** | Mode D | 5 min | ⭐⭐ Intermédiaire |

---

## 🟢 Mode A — Installation sur Claude.ai (recommandé)

### Prérequis
- Un abonnement Claude.ai **Pro** (20 $/mois) ou **Team** minimum
- Les **Projects** activés sur votre compte

### Étapes détaillées

**Étape 1 — Dézipper le pack**

Faites un clic droit sur le fichier téléchargé `pack-marketing-agence-fr.zip` → "Extraire" / "Décompresser".

Vous obtenez un dossier `pack-marketing-agence-fr/` avec plusieurs sous-dossiers.

**Étape 2 — Créer un nouveau Project dans Claude.ai**

1. Connectez-vous sur [claude.ai](https://claude.ai)
2. Cliquez sur **"Projects"** dans le menu de gauche
3. Cliquez sur **"+ Create Project"**
4. Nommez-le : `Marketing Agence FR` (ou ce que vous voulez)
5. Cliquez sur **"Create Project"**

**Étape 3 — Ajouter les skills en Knowledge**

1. Dans le Project créé, trouvez la section **"Project knowledge"** à droite
2. Cliquez sur **"+ Add content"** → **"Upload files"**
3. Sélectionnez **tous les fichiers `.md`** du dossier dézippé :
   - Naviguez dans chaque sous-dossier (skills, references, templates)
   - Uploadez chaque `SKILL.md`, référence et template
   - **Astuce** : sur Mac, utilisez `Cmd+A` pour tout sélectionner en une fois

4. Attendez que tous les fichiers soient uploadés (barre de progression)

**Étape 4 — Configurer les instructions du Project**

1. Dans le Project, cliquez sur **"Edit Project details"** → **"Custom instructions"**
2. Collez ce texte dans le champ instructions :

```
Ce Project contient 5 skills marketing francophones orchestrés par marketing-agence-fr.

Quand l'utilisateur demande quelque chose relié à :
- Audit SEO, analyse référencement → utilise seo-audit-fr
- Rédaction web, article de blog, page pilier → utilise content-writer-fr
- Post LinkedIn, publication pro → utilise linkedin-post-fr
- Séquence email, newsletter, campagne Brevo → utilise email-sequence-fr
- Proposition commerciale, devis, offre de service → utilise client-proposal-fr

Toujours respecter les règles de typographie française (espaces insécables, guillemets français),
le RGPD, et le ton B2B francophone (mesuré, pas de hype US).

Pour toute tâche marketing en français, consulte les fichiers du Knowledge avant de répondre.
```

3. Cliquez sur **"Save"**

**Étape 5 — Tester**

Dans le Project, tapez un premier message :

> « Écris-moi un post LinkedIn de storytelling sur comment j'ai gagné 5 heures par semaine en utilisant l'IA dans mon agence. »

Claude devrait répondre avec un post structuré en format storytelling, typographie française parfaite, hashtags B2B FR.

✅ **C'est gagné !**

---

## 🟡 Mode B — Installation sur Claude Code

### Prérequis
- Claude Code installé et fonctionnel
- Terminal / ligne de commande de base

### Étapes détaillées

**Étape 1 — Dézipper et copier**

Ouvrez votre terminal et exécutez :

```bash
# 1. Dézipper (adaptez le chemin vers votre fichier téléchargé)
unzip ~/Downloads/pack-marketing-agence-fr.zip -d ~/Downloads/

# 2. Créer le dossier skills si nécessaire
mkdir -p ~/.claude/skills/

# 3. Copier le pack dans vos skills Claude Code
cp -r ~/Downloads/pack-marketing-agence-fr ~/.claude/skills/
```

**Étape 2 — Redémarrer Claude Code**

Quittez Claude Code avec `/exit`, puis relancez-le :

```bash
claude
```

**Étape 3 — Vérifier l'installation**

Dans Claude Code, tapez :

```
/skills
```

Vous devriez voir `marketing-agence-fr` et les 5 sous-skills dans la liste.

**Étape 4 — Utiliser**

Les skills se déclenchent automatiquement selon le contexte de votre demande :

```
> Fais-moi un audit SEO rapide de https://example.fr
```

Claude Code appelle automatiquement `seo-audit-fr`.

✅ **C'est installé !**

---

## 🟠 Mode C — Installation sur ChatGPT

### Prérequis
- Abonnement ChatGPT **Plus** (20 $/mois) ou **Team**
- Accès aux **Projects** ou **Custom GPTs**

### Option C1 : Via ChatGPT Projects (recommandé)

1. Dans ChatGPT, cliquez sur **"Projects"** → **"New project"**
2. Nommez-le : `Marketing Agence FR`
3. Dans **"Add files"**, uploadez tous les fichiers `.md` du pack dézippé
4. Dans **"Instructions"** du Project, collez le même texte qu'en Mode A étape 4
5. Testez avec une demande marketing en français

### Option C2 : Via Custom GPT

1. Allez dans **"Explore GPTs"** → **"+ Create"**
2. Dans l'onglet **"Configure"** :
   - **Name** : Marketing Agence FR
   - **Description** : Suite de skills marketing francophones
   - **Instructions** : coller le texte du Mode A étape 4
   - **Knowledge** : uploader tous les fichiers `.md`
3. Cliquez sur **"Create"**

✅ **Votre GPT personnalisé est prêt !**

---

## 🟠 Mode D — Installation sur Cursor / Codex / autres

Pour les éditeurs de code et assistants IA compatibles SKILL.md :

### Cursor

1. Créez un fichier `.cursorrules` à la racine de votre projet
2. Copiez le contenu de `SKILL.md` (orchestrateur principal) dedans
3. Ajoutez les références aux sous-skills au besoin

### Codex CLI

1. Placez le dossier `pack-marketing-agence-fr/` dans votre dossier de skills Codex
2. Référencez-le dans votre configuration Codex

### Autres (Gemini CLI, Cline, etc.)

Le format `.md` est ouvert et lisible. Adaptez selon la documentation de votre assistant.

---

## 💡 Comment utiliser le pack au quotidien

### Déclenchement automatique

Les skills se déclenchent **automatiquement** selon le vocabulaire de vos demandes.
Vous n'avez pas besoin de les appeler par leur nom.

**Exemples de prompts qui fonctionnent :**

| Vous tapez... | Claude utilise... |
|---|---|
| *"Audit SEO de ce site : [URL]"* | `seo-audit-fr` |
| *"Écris un article sur [sujet]"* | `content-writer-fr` |
| *"Post LinkedIn pour promouvoir..."* | `linkedin-post-fr` |
| *"Séquence email de bienvenue"* | `email-sequence-fr` |
| *"Proposition commerciale pour..."* | `client-proposal-fr` |

### Workflow complet en une requête

Le pack est orchestré. Vous pouvez enchaîner plusieurs skills dans une seule demande :

> *"Je lance une nouvelle offre SEO. Aide-moi à créer :
> 1. Un post LinkedIn de lancement
> 2. Une séquence email de 3 mails pour mes contacts
> 3. Une proposition commerciale type pour mes prospects"*

Claude va utiliser les 3 skills nécessaires avec cohérence de ton et de message.

### Personnaliser pour vos clients

Avant d'utiliser un skill sur un client spécifique, donnez-lui le contexte :

> *"Je bosse pour [Entreprise X], un cabinet d'avocats à Lyon, cible TPE/PME.
> Fais-moi un audit SEO de leur site."*

Les skills s'adaptent au contexte client automatiquement.

---

## 🧪 Premiers tests recommandés

Pour valider que tout fonctionne, testez ces 5 prompts :

### Test 1 — Post LinkedIn
```
Écris un post LinkedIn de storytelling : comment j'ai aidé
un client à gagner 20 places sur Google en 3 mois.
```
✅ Attendu : post avec hook, storytelling, 3 leçons bullet, question finale, 3-5 hashtags FR.

### Test 2 — Audit SEO
```
Fais-moi un audit SEO rapide de https://www.exemple-client.fr
```
✅ Attendu : rapport structuré en 7 axes avec score, priorités et plan d'action.

### Test 3 — Séquence email
```
Crée-moi une séquence email de bienvenue pour mes nouveaux
inscrits newsletter (4 emails sur 7 jours, sur Brevo).
```
✅ Attendu : 4 emails avec objets, preview text, corps, CTA, mentions RGPD.

### Test 4 — Proposition commerciale
```
Rédige-moi une proposition commerciale pour une prestation SEO
de 6 mois, 1 500 € HT / mois, pour un e-commerce à Nantes.
```
✅ Attendu : proposition structurée en 11 sections avec mentions légales FR.

### Test 5 — Article blog
```
Écris un article de 1 500 mots sur "Comment choisir son agence SEO en 2026"
pour mon blog d'agence digitale francophone.
```
✅ Attendu : article structuré H2/H3, typographie FR, sources, FAQ finale.

---

## 🛠️ Dépannage

### Claude ne semble pas utiliser les skills

**Cause probable** : les fichiers ne sont pas correctement chargés en Knowledge.

**Solution** :
1. Vérifier que TOUS les fichiers `.md` sont bien uploadés (pas juste `SKILL.md` principal)
2. Relire les instructions du Project (doivent mentionner les skills)
3. Commencer la conversation en demandant explicitement : *"Utilise le skill linkedin-post-fr pour..."*

### Les réponses ne sont pas en français

**Cause probable** : Claude utilise sa configuration par défaut (anglais).

**Solution** : ajouter dans les instructions du Project : *"Tu réponds toujours en français, sauf demande explicite contraire."*

### Le typographie n'est pas parfaite (espaces insécables manquants, etc.)

**Cause probable** : Claude.ai ne gère pas toujours les caractères spéciaux nativement.

**Solution** : demander explicitement : *"Applique rigoureusement les règles de typographie française définies dans content-writer-fr."*

### J'ai perdu mon fichier .zip

Retournez sur votre email Gumroad (`reçu d'achat de Lemon Zest Digital`) et cliquez sur le lien de téléchargement. Il reste valable à vie.

### J'ai cassé mon installation, comment tout réinitialiser ?

**Claude.ai** : supprimez le Project et recommencez le Mode A.
**Claude Code** : `rm -rf ~/.claude/skills/pack-marketing-agence-fr` puis refaites le Mode B.

---

## 📚 Ressources complémentaires

### Documentation officielle
- Claude.ai Projects : [support.claude.com/projects](https://support.claude.com)
- Claude Code : [docs.claude.com/claude-code](https://docs.claude.com)

### Communauté Lemon Zest
- **Discord** (utilisateurs du pack) : lien dans votre email de livraison
- **Newsletter** : `lemonzest.digital/newsletter`
- **LinkedIn** : Suivez Lemon Zest Digital pour les mises à jour

### Mises à jour du pack
Les mises à jour mineures sont **incluses à vie**. Vous recevrez un email Gumroad à chaque nouvelle version.

Les versions majeures (v2, v3) seront proposées à **-50 %** pour les clients existants.

---

## 🆘 Support

### En cas de problème
**Email** : `support@lemonzest.digital`
**Délai de réponse** : 24-48 h ouvrées
**Langue** : Français ou Anglais

### Avant de nous contacter
Vérifiez que :
- [ ] Vous avez bien dézippé l'archive (pas juste double-cliqué)
- [ ] Tous les fichiers `.md` sont uploadés dans votre environnement
- [ ] Les instructions du Project sont configurées
- [ ] Vous avez testé au moins un des 5 prompts de test

### Garantie satisfait ou remboursé
14 jours sans justification. Un simple email à `support@lemonzest.digital`
avec votre email d'achat suffit.

---

## 🎁 Bonus

En tant que client, vous avez accès à :

- **Communauté Discord privée** (lien dans votre email de livraison)
- **Session Q&A mensuelle** avec Jean-Michel de Lemon Zest Digital
- **Priorité sur les nouveaux skills** (pré-accès avant sortie publique)
- **Templates additionnels** publiés régulièrement

---

## 💚 Merci

Merci d'avoir choisi Pack Marketing Agence FR.

Notre mission : armer les indépendants et agences francophones avec des outils IA
de qualité industrielle, pensés pour notre marché.

Si le pack vous rend service, **un témoignage sur LinkedIn** nous aide énormément
à faire grandir la marketplace francophone. Un simple post mentionnant
`@Lemon Zest Digital` fait toute la différence. 🙏

**Bonne production !**

— L'équipe Lemon Zest Digital
`contact@lemonzest.digital`
`marketplace.lemonzestdigital.com`
