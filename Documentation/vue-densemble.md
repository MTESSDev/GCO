# Vue d'ensemble de l'intégration GCO

## Qu'est-ce que GCO?

Un service centralisé du MESS pour la **production et la gestion des correspondances** : lettres, avis et formulaires générés à partir de gabarits Word (`.docx`). Les documents produits peuvent être imprimés en lot, envoyés à une imprimante locale ou déposés dans la GED.

&nbsp;

## Comment fonctionne l'intégration?

Votre système appelle un seul endpoint REST. GCO se charge de trouver le gabarit déployé, de produire le PDF et de le traiter selon le mode demandé.

```
Système de mission
        │
        │  POST /systeme/correspondances/generer
        │  Authorization: Api-Key {cle}
        │  x-client-id: {clientId}
        ▼
┌──────────────────────────────────┐
│           GCO.SV.API             │
├──────────────────────────────────┤
│  1. Authentification par clé API │
│  2. Résolution de la version     │
│     déployée dans l'environnement│
│  3. Production PDF (gabarit Word)│
│  4. Dépôt GED (si requis)        │
│  5. Mise en lot ou impression    │
│  6. Enregistrement de la commande│
└──────────────────────────────────┘
        │
        │  PDF binaire  OU  JSON { numCmd, nomFichier, idDoc }
        ▼
Système de mission
```

&nbsp;

## Concepts à connaître avant de commencer

### Correspondance

Une correspondance est identifiée par un **code** (ex. `J08`). Elle appartient à une **équipe** et possède plusieurs **versions**. Votre système appelle le code de correspondance dans un environnement ; GCO résout automatiquement la version déployée la plus récente.

### Environnement

Chaque équipe gère ses propres environnements (ex. `SAT`, `ACCP`, `IT`, `PROD`). Votre clé d'API est liée à un type d'environnement précis.

### Gabarit

Fichier `.docx` servant de modèle. Les variables dynamiques (`donneesCorrespondance`) y sont substituées lors de la production. Le résultat est toujours un **PDF**.

### Attributs de version

Métadonnées configurables dans GCO sur chaque version de correspondance. Ils fournissent des valeurs de repli pour le type GED, le sujet, l'auteur, etc. Certains sont obligatoires pour que la production soit possible.

&nbsp;

## Pré-requis avant le premier appel

Avant d'appeler GCO212, les étapes suivantes doivent être complétées **dans l'application GCO** :

1. Créer l'équipe (Admin GCO / Pilotage);
2. Créer la correspondance avec son code (Contributeur+);
3. Créer une version et téléverser le gabarit `.docx` (Contributeur+);
4. Configurer les attributs de la version — notamment `GED:Type` et `GED:LigneAffaire` si vous utilisez la GED (Contributeur+);
5. Déployer la version dans l'environnement cible (ContributeurProd pour la production);
6. Générer une clé d'API pour l'équipe — [voir le guide d'authentification](authentification.md).

&nbsp;

## Flux de production résumé

```
1. POST /systeme/correspondances/generer  avec les données dynamiques

2. GCO valide les paramètres et localise la version déployée

3. GCO produit le PDF à partir du gabarit Word

4. Selon le mode d'impression :
   PREVIEW   → PDF retourné directement, sans dépôt ni impression
   NUMERIQUE → PDF déposé dans la GED uniquement
   LOT       → PDF mis en lot d'impression différé (automatique)
   LOTDIFF   → PDF retenu pour lot déclenché manuellement
   IMMEDIAT  → PDF imprimé sur l'imprimante locale de l'utilisateur

5. La commande est enregistrée dans la base de données GCO

6. Retour :
   Accept: application/pdf  → binaire du fichier PDF
   Accept: application/json → { numeroCommande, nomFichier, identifiantUniqueDocument }
```

&nbsp;

## Prochaine étape

[Obtenir une clé d'API →](authentification.md)
