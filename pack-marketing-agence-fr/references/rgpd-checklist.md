# Checklist RGPD pour Marketing Digital

Document de référence pour garantir la conformité RGPD de tout contenu ou action produit par ce pack.

## Principes fondamentaux RGPD

Le RGPD (Règlement Général sur la Protection des Données) s'applique à toute entreprise qui traite des données personnelles de résidents européens, peu importe où l'entreprise est basée.

### Les 7 principes clés

1. **Licéité, loyauté, transparence** : avoir une base légale et informer clairement
2. **Limitation des finalités** : collecter uniquement pour un objectif précis
3. **Minimisation** : ne collecter que le strict nécessaire
4. **Exactitude** : données à jour et corrigibles
5. **Limitation de conservation** : durée maximale définie
6. **Intégrité et confidentialité** : sécurité technique et organisationnelle
7. **Responsabilité** : capacité à prouver la conformité

## Bases légales du traitement

Toute collecte de données doit reposer sur UNE base légale :

| Base | Cas d'usage typique |
|---|---|
| **Consentement** | Newsletter, cookies marketing, tracking |
| **Contrat** | Facturation, livraison, support client |
| **Obligation légale** | Comptabilité (10 ans), fiscalité |
| **Intérêts vitaux** | Très rare (urgence médicale) |
| **Mission d'intérêt public** | Secteur public |
| **Intérêt légitime** | Prospection B2B (avec opt-out facile) |

## Checklist site web

### Mentions légales (obligatoires par LCEN)
- [ ] Raison sociale complète
- [ ] Adresse postale
- [ ] Numéro de téléphone
- [ ] Email de contact
- [ ] SIREN / SIRET
- [ ] Numéro TVA intracommunautaire
- [ ] Capital social (si SAS/SARL)
- [ ] Nom du directeur de publication
- [ ] Hébergeur (nom + adresse)
- [ ] RCS ou Répertoire des Métiers

### Politique de confidentialité
- [ ] Identité du responsable de traitement
- [ ] Coordonnées du DPO (si désigné)
- [ ] Finalités des traitements
- [ ] Bases légales
- [ ] Catégories de données collectées
- [ ] Destinataires des données
- [ ] Durée de conservation
- [ ] Transferts hors UE (si applicable)
- [ ] Droits des personnes (accès, rectification, effacement, portabilité, opposition, retrait consentement)
- [ ] Coordonnées pour exercer ses droits
- [ ] Droit de réclamation auprès de la CNIL

### Cookies et trackers
- [ ] Bandeau conforme CNIL (refuser aussi facile qu'accepter)
- [ ] Pas de dépôt de cookies avant consentement (sauf essentiels)
- [ ] Liste des cookies dans politique dédiée
- [ ] Durée de vie de chaque cookie
- [ ] Finalité de chaque cookie
- [ ] Cookie management platform (Axeptio, Didomi, Tarteaucitron)

### Formulaires
- [ ] Indication claire de la finalité
- [ ] Données obligatoires signalées (*)
- [ ] Mention de la politique de confidentialité
- [ ] Case à cocher NON pré-cochée pour opt-in newsletter
- [ ] Durée de conservation mentionnée
- [ ] Possibilité de suppression / modification

## Checklist emailing

### Avant d'envoyer
- [ ] Consentement explicite pour marketing (opt-in)
- [ ] Double opt-in recommandé (confirmation email)
- [ ] Base légale identifiée et documentée
- [ ] Données à jour (nettoyage régulier)

### Dans chaque email
- [ ] Lien de désabonnement fonctionnel en 1 clic
- [ ] Identité de l'expéditeur claire
- [ ] Objet honnête (pas trompeur)
- [ ] Mention origine des données si demandé
- [ ] Adresse postale de l'entreprise (footer)

### Gestion des désabonnements
- [ ] Traitement sous 48h max
- [ ] Pas de friction (pas de "pourquoi partez-vous ?" obligatoire)
- [ ] Confirmation de désabonnement par email
- [ ] Conservation de la preuve du désabonnement

## Checklist prospection B2B

### Cold email B2B (intérêt légitime)
- [ ] Contact à titre professionnel (email pro)
- [ ] Proposition en rapport avec sa fonction
- [ ] Source des données identifiable
- [ ] Opt-out facile dans chaque email
- [ ] Pas de profilage comportemental sans consentement

### LinkedIn / réseaux sociaux
- [ ] Pas de scraping massif (violation LinkedIn + RGPD)
- [ ] Messages personnalisés (pas de spam)
- [ ] Respect des demandes de ne plus contacter

## Checklist tracking et analytics

### Google Analytics 4
- [ ] Consentement préalable obligatoire en FR (post-mise en demeure CNIL 2022)
- [ ] Ou configuration "mode consentement" (consent mode v2)
- [ ] IP anonymisée (automatique en GA4)
- [ ] Durée de conservation max 14 mois configurée
- [ ] Partage de données désactivé si possible

### Alternatives RGPD-friendly (à proposer aux clients)
- **Matomo** (on-premise) : 100% conforme par défaut
- **Plausible** : simple, no-cookie
- **Fathom** : alternative légère
- **Piwik PRO** : enterprise compliant

### Facebook Pixel / Meta
- [ ] Consentement explicite préalable
- [ ] Advanced Matching désactivé par défaut
- [ ] Custom Audiences avec consentement

## Checklist contenu marketing

### Témoignages et cas clients
- [ ] Accord écrit du client pour publication
- [ ] Accord pour utilisation du nom, logo, chiffres
- [ ] Possibilité de retrait du consentement
- [ ] Anonymisation possible si souhaité

### Photos et images
- [ ] Droit à l'image : accord des personnes identifiables
- [ ] Photos d'enfants : accord des deux parents
- [ ] Événements publics : avertir de la captation
- [ ] Stock photos : licence commerciale vérifiée

### Vidéos et webinars
- [ ] Avertissement enregistrement en début
- [ ] Bouton caméra désactivable pour participants
- [ ] Durée de conservation annoncée
- [ ] Accord pour rediffusion

## Durées de conservation recommandées

| Type de donnée | Durée max |
|---|---|
| Prospect inactif | 3 ans après dernier contact |
| Client actif | Durée de la relation commerciale |
| Client inactif | 3 ans après dernière relation commerciale |
| Facturation | 10 ans (obligation comptable) |
| Données RH | Durée du contrat + 5 ans |
| Cookies analytics | 13 mois max |
| Logs serveur | 1 an max |

## Droits des personnes à garantir

Toute personne peut exercer ces droits à tout moment :

1. **Droit d'accès** : voir ses données
2. **Droit de rectification** : corriger ses données
3. **Droit à l'effacement** ("droit à l'oubli") : supprimer ses données
4. **Droit à la portabilité** : récupérer ses données dans format standard
5. **Droit d'opposition** : refuser certains traitements
6. **Droit à la limitation** : geler le traitement temporairement
7. **Retrait du consentement** : à tout moment, aussi facile que donner

**Délai de réponse obligatoire** : 1 mois (prolongeable à 3 mois si complexité).

## En cas de violation de données

Obligations sous 72h :
1. Notifier la CNIL
2. Si risque élevé pour les personnes : les informer directement
3. Documenter l'incident dans le registre de violations
4. Mettre en œuvre des mesures correctives

## Documents à tenir à jour

- Registre des activités de traitement (art. 30 RGPD)
- Analyse d'impact (AIPD) pour traitements risqués
- Registre des violations de données
- Contrats avec sous-traitants (DPA)
- Procédure d'exercice des droits

## DPO (Délégué à la Protection des Données)

Obligatoire pour :
- Autorités publiques
- Traitements à grande échelle de données sensibles
- Suivi systématique à grande échelle

**Optionnel mais recommandé** pour toute entreprise > 20 salariés.

## Sanctions CNIL

Barème des amendes :
- Amende maximale : 20M € ou 4% du CA mondial
- Avertissements publics
- Mise en demeure publique
- Sanctions récentes sur le marketing : 30K € à 150K € pour PME

## Ressources officielles

- **CNIL** : cnil.fr (FAQ, guides, outils)
- **RGPD texte officiel** : cnil.fr/fr/reglement-europeen-protection-donnees
- **Outil PIA CNIL** : gratuit pour analyses d'impact
- **Formations CNIL** : gratuite pour DPO

## Quand orienter vers un professionnel

Pour ces cas, **ne pas improviser** et orienter vers avocat RGPD ou DPO :
- Traitement données sensibles (santé, religion, orientation sexuelle, biométrie)
- Profilage automatisé à grande échelle
- Transferts hors UE complexes
- Incident de sécurité majeur
- Contrôle ou contentieux CNIL

---

**Document de référence — usage interne pour skills Lemon Zest Digital**
Source : RGPD, CNIL, pratiques de marché. À vérifier pour chaque cas client.
