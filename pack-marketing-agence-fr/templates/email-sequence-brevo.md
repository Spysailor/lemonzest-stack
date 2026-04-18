# 📧 Séquence Email — Template Brevo / Mailjet

Template prêt à importer dans Brevo (ex-Sendinblue) ou Mailjet. Remplacer les variables entre `{{}}` par le contenu personnalisé.

---

## SÉQUENCE BIENVENUE (4 emails / 7 jours)

### Email 1 — Jour 0 (envoi immédiat après inscription)

**Objet :** `{{ contact.FIRSTNAME }}, votre [ressource] vous attend 👋`
**Preview text :** `Voici ce que vous avez réservé. Profitez-en dès maintenant.`

**Corps :**

```
Bonjour {{ contact.FIRSTNAME }},

Merci pour votre inscription à [nom ressource / newsletter].

Comme promis, voici votre accès :

👉 [Lien vers la ressource]

En quelques mots, voici ce que vous allez trouver :
→ [Bénéfice 1]
→ [Bénéfice 2]
→ [Bénéfice 3]

Dans les prochains jours, je vais vous envoyer 3 autres emails pour :
- Vous présenter notre approche
- Partager un conseil concret que vous pourrez appliquer
- Vous proposer d'aller plus loin si ça vous intéresse

Si vous avez des questions, répondez directement à cet email : je lis tout personnellement.

Bien cordialement,

[Votre prénom]
[Votre fonction]
[Votre entreprise]

P.S. Vous pouvez me suivre sur LinkedIn pour recevoir mes conseils quotidiens : [URL LinkedIn]

---
[Mention RGPD : lien vers politique de confidentialité]
[Lien de désabonnement en 1 clic]
```

---

### Email 2 — Jour 2

**Objet :** `Pourquoi j'ai créé [entreprise]`
**Preview text :** `L'histoire courte (et les enjeux que ça résout pour vous)`

**Corps :**

```
Bonjour {{ contact.FIRSTNAME }},

J'espère que [nom ressource] vous a été utile.

Je voulais prendre quelques minutes pour vous expliquer pourquoi j'ai créé [entreprise], et surtout, ce que ça peut changer pour vous.

[Raconter en 2-3 paragraphes : origine, problème identifié, mission]

Concrètement, ça veut dire que si vous êtes [persona cible] et que vous cherchez à [objectif], on peut vous aider de [X] façons :

1. [Service / produit 1]
2. [Service / produit 2]
3. [Service / produit 3]

Je continuerai à vous envoyer des contenus utiles (sans spammer, promis). Le prochain email sera un conseil pratique que vous pourrez appliquer dès demain.

À bientôt,

[Votre prénom]

---
[Lien de désabonnement]
```

---

### Email 3 — Jour 5

**Objet :** `L'erreur #1 que font [cible] (et comment l'éviter)`
**Preview text :** `C'est rapide à corriger et ça change tout.`

**Corps :**

```
Bonjour {{ contact.FIRSTNAME }},

Aujourd'hui, un conseil court et actionnable.

En travaillant avec [X+] clients sur [sujet], j'ai remarqué une erreur qui revient 8 fois sur 10.

Voici laquelle : [Décrire l'erreur en 2-3 lignes]

Pourquoi c'est un problème :
→ [Conséquence 1]
→ [Conséquence 2]

Comment la corriger concrètement :

1. [Étape 1]
2. [Étape 2]
3. [Étape 3]

Ça prend [X minutes / heures] à mettre en place, et ça peut faire la différence entre [situation A] et [situation B].

Si vous voulez aller plus loin, j'ai préparé [ressource complémentaire] — dites-moi si ça vous intéresse, je vous l'envoie.

[Votre prénom]

---
[Lien de désabonnement]
```

---

### Email 4 — Jour 7

**Objet :** `Une question pour vous, {{ contact.FIRSTNAME }}`
**Preview text :** `Une minute de votre temps, pas plus.`

**Corps :**

```
Bonjour {{ contact.FIRSTNAME }},

Voilà une semaine que vous êtes inscrit·e et j'espère que les conseils envoyés vous sont utiles.

J'ai une question directe : est-ce que votre [problème / enjeu] avance ?

Si oui : parfait, continuez sur votre lancée !

Si non, j'ai peut-être une piste pour vous :

Nous proposons [offre / service], qui permet à [persona cible] de [transformation recherchée].

Si ça vous parle, je peux vous offrir [un diagnostic gratuit / un appel de 30 min / une ressource premium].

👉 [Lien vers prise de RDV ou offre]

Pas d'engagement, pas de vente forcée. Juste une discussion pour voir si on peut vous aider.

Et si ce n'est pas le moment, aucun souci : vous continuerez à recevoir nos contenus utiles.

Bien cordialement,

[Votre prénom]

P.S. Répondre "oui" à cet email suffit, je reviens vers vous sous 24h.

---
[Lien de désabonnement]
```

---

## SÉQUENCE PANIER ABANDONNÉ (3 emails / 48h) — E-commerce

### Email 1 — H+1 (1 heure après abandon)

**Objet :** `Vous avez oublié quelque chose, {{ contact.FIRSTNAME }} ?`
**Preview text :** `Votre panier vous attend encore.`

```
Bonjour {{ contact.FIRSTNAME }},

On dirait que vous avez laissé votre panier en attente.

Rien de grave : je vous l'ai mis de côté.

[Bloc produits du panier avec images et prix]

👉 [Bouton CTA : Reprendre ma commande]

Si vous avez une question ou une hésitation, répondez à cet email — on vous répond sous 2h pendant les heures de bureau.

À bientôt,

L'équipe [Entreprise]

---
[Lien désabonnement]
```

---

### Email 2 — H+24 (lendemain)

**Objet :** `Hésitation ? Ils ont adoré leur [produit]`
**Preview text :** `Les avis des clients précédents.`

```
Bonjour {{ contact.FIRSTNAME }},

Votre panier est toujours là.

Peut-être que vous hésitez ? C'est normal. Voici ce que les clients qui ont choisi ce produit en disent :

⭐⭐⭐⭐⭐ "[Témoignage court 1]"
— [Prénom], [ville]

⭐⭐⭐⭐⭐ "[Témoignage court 2]"
— [Prénom], [ville]

⭐⭐⭐⭐⭐ "[Témoignage court 3]"
— [Prénom], [ville]

👉 [Bouton CTA : Reprendre ma commande]

Petite info rassurante : livraison gratuite dès 50€ et retour possible sous 14 jours sans justification.

À bientôt,

L'équipe [Entreprise]

---
[Lien désabonnement]
```

---

### Email 3 — H+48 (2 jours après)

**Objet :** `-10% sur votre panier, {{ contact.FIRSTNAME }} (dernière chance)`
**Preview text :** `Code valable 24h.`

```
Bonjour {{ contact.FIRSTNAME }},

Dernière relance de notre part, promis.

Pour vous remercier de votre intérêt, voici un code promo de -10% valable pendant 24h sur votre panier :

🎁 Code : PANIER10

👉 [Bouton CTA : Finaliser avec -10%]

Au-delà de demain, ce code expire et on remet votre panier à zéro.

Si finalement ce produit ne vous correspondait pas, aucun souci : on ne vous dérangera plus. 🙂

L'équipe [Entreprise]

---
[Lien désabonnement]
```

---

## SÉQUENCE LANCEMENT PRODUIT (5 emails / 10 jours)

### Email 1 — J-7 : Teaser

**Objet :** `Ce que je prépare depuis 6 mois...`
**Corps :** [Storytelling sur la genèse du produit, sans révéler le nom]

### Email 2 — J-3 : Révélation + early bird

**Objet :** `C'est officiel : [Nom produit] sort le [date]`
**Corps :** [Présentation complète + offre early bird -30% pour les inscrits]

### Email 3 — J-1 : Derniers arguments

**Objet :** `[Nom produit] sort demain — 3 raisons de ne pas hésiter`
**Corps :** [3 bénéfices clés + FAQ rapide + social proof]

### Email 4 — J0 : Ouverture

**Objet :** `C'est parti ! [Nom produit] est disponible`
**Corps :** [Annonce ouverture + rappel early bird + CTA achat]

### Email 5 — J+3 : Last chance

**Objet :** `-24h pour bénéficier de l'offre de lancement`
**Corps :** [Rappel urgence + témoignages premiers acheteurs + CTA]

---

## SÉQUENCE COLD EMAIL B2B (4 emails / 14 jours)

### Email 1 — J0

**Objet :** `Question concernant [entreprise du prospect]`
**Corps :**

```
Bonjour {{ contact.FIRSTNAME }},

Je suis tombé sur [élément spécifique : article, post LinkedIn, actualité] concernant [entreprise prospect]. [Compliment sincère ou observation pertinente en 1-2 lignes].

Je me permets de vous contacter car nous aidons des [catégorie d'entreprises similaires] à [résultat concret].

Par exemple, [nom client] a obtenu [résultat chiffré] en [durée].

Est-ce que le sujet [problème] est pertinent pour vous en ce moment ?

Si oui, je peux vous envoyer [ressource utile, pas une présentation commerciale] ou programmer 15 min pour en discuter.

Sans suite de votre part, je ne vous relancerai qu'une fois.

Bien cordialement,

[Votre nom]
[Fonction]
[Entreprise]
[LinkedIn]

---
[Mention RGPD : vos coordonnées professionnelles ont été obtenues via source publique. Vous pouvez vous opposer à nouvel envoi en répondant "STOP".]
```

### Email 2 — J+4 : Relance avec nouvel angle

### Email 3 — J+9 : Social proof

### Email 4 — J+14 : Break up email (dernière relance)

```
Objet : Je n'insiste plus, {{ contact.FIRSTNAME }}

Bonjour {{ contact.FIRSTNAME }},

Je vous ai contacté il y a [X] jours et n'ai pas eu de retour.

Je ne cherche pas à forcer. Trois scénarios possibles :

1. Pas le bon moment : très bien, je ne vous recontacterai pas.
2. Pas la bonne personne : pouvez-vous m'orienter vers la bonne ?
3. Pas intéressé : dites-le moi simplement, je respecte.

Dans tous les cas, bonne continuation à [entreprise].

Bien cordialement,

[Votre nom]

---
[Mention RGPD]
```

---

## Variables Brevo couramment utilisées

| Variable | Fonction |
|---|---|
| `{{ contact.FIRSTNAME }}` | Prénom |
| `{{ contact.LASTNAME }}` | Nom |
| `{{ contact.EMAIL }}` | Email |
| `{{ contact.COMPANY }}` | Entreprise |
| `{{ params.PRODUCT_NAME }}` | Variable personnalisée (ex: produit panier) |

## Checklist avant import dans Brevo

- [ ] Encodage UTF-8 vérifié (accents FR corrects)
- [ ] Variables `{{ }}` testées avec données fictives
- [ ] Lien de désabonnement automatique activé (Brevo le gère)
- [ ] Préférences de fréquence configurées
- [ ] Adresse physique ajoutée au footer (obligatoire)
- [ ] Pré-header (preview text) renseigné
- [ ] Version mobile testée
- [ ] A/B test configuré si liste > 1 000 contacts
- [ ] Horaire d'envoi optimal (mardi/jeudi 10h ou 14h)
- [ ] Groupe cible et exclusions définis

---

**Templates Lemon Zest Digital** — Usage commercial sur achat uniquement.
