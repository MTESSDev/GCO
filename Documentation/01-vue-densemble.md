# 01 — Vue d'ensemble de l'intégration GCO

[[_TOC_]]

## Qu'est-ce que GCO ?

GCO (Gestion électronique des Correspondances) est le service centralisé du MESS pour la **production et la gestion des correspondances** : lettres, avis et formulaires générés à partir de gabarits Word (`.docx`).

GCO permet à vos systèmes de mission de :

- Produire un document PDF à partir d'un gabarit versionné et déployé ;
- Déposer automatiquement le document dans la GED ;
- Envoyer le document à l'impression en lot (différé ou immédiat) ;
- Obtenir le fichier PDF en retour direct (mode prévisualisation ou numérique).

---

## Modèle d'intégration

```
Système de mission
        │
        │  POST /systeme/correspondances/generer
        │  Authorization: Api-Key {cle}
        │  x-client-id: {clientId}
        ▼
┌──────────────────────────────────┐
│           GCO.SV.API             │
│   (ASP.NET Core 10 / REST)       │
├──────────────────────────────────┤
│  1. Authentification par clé API │
│  2. Résolution correspondance    │
│  3. Production PDF (Aspose Words)│
│  4. Dépôt GED (si requis)        │
│  5. Mise en lot impression       │
│  6. Enregistrement commande      │
└──────────────────────────────────┘
        │
        │  Retour : PDF binaire  OU  JSON { numCmd, nomFichier, idDoc }
        ▼
Système de mission
```

Le **seul point d'entrée** à implémenter dans votre système est l'endpoint **GCO212** :

```
POST /systeme/correspondances/generer
```

---

## Concepts clés

### Correspondance

Une correspondance est une définition de document identifiée par un **code** (ex. `J08`). Elle appartient à une **équipe** et possède plusieurs **versions**.

Votre système n'appelle pas directement une version : il appelle le code de correspondance dans un environnement, et GCO résout automatiquement la **version déployée la plus récente**.

### Environnement

Chaque équipe gère ses propres environnements (ex. `SAT`, `ACCP`, `IT`, `PROD`). Votre clé d'API est liée à un **type d'environnement** précis. Vous ne pouvez produire que dans les environnements auxquels votre clé donne accès.

### Gabarit

Le gabarit est le fichier `.docx` qui sert de modèle. Les variables dynamiques (données de la correspondance) y sont substituées lors de la production. Le fichier produit est toujours un **PDF**.

### Attributs de version

Des attributs (métadonnées configurables) sont associés à chaque version de correspondance dans GCO. Ils fournissent des valeurs par défaut pour le type GED, le sujet, l'auteur, etc. Certains attributs sont obligatoires pour que la production soit possible.

---

## Prérequis

Avant d'appeler GCO212, votre équipe doit avoir complété les étapes suivantes **dans l'application GCO** :

| Étape | Responsable | Description |
|-------|-------------|-------------|
| 1 | Admin GCO / Pilotage | Créer l'équipe dans GCO |
| 2 | Admin équipe | Créer la correspondance avec son code |
| 3 | Contributeur | Créer une version et téléverser le gabarit `.docx` |
| 4 | Contributeur | Configurer les attributs de la version (GED:Type, GED:LigneAffaire, etc.) |
| 5 | ContributeurProd | Déployer la version dans l'environnement cible |
| 6 | Contributeur+ | Générer une clé d'API pour l'équipe (voir [02 — Authentification](02-authentification.md)) |

---

## Environnements disponibles

| Environnement | URL de base de l'API | Usage |
|---------------|---------------------|-------|
| Satellite (dev) | `https://master-webapi.intra-gco.sa.mes.reseau.intra` | Développement et essais |
| Acceptation | `https://release-webapi.intra-gco.ac.mes.reseau.intra` | Validation |
| Intégration Technologique | `https://release-webapi.intra-gco.it.mes.reseau.intra` | Tests d'intégration |
| Production | `https://webapi.intra-gco.mes.reseau.intra` | Production |

L'interface Swagger est disponible à `{url-de-base}/Swagger/index.html` pour chaque environnement.

---

## Flux de production résumé

```
1. Votre système envoie une requête POST /systeme/correspondances/generer
   avec les données dynamiques de la correspondance.

2. GCO valide les paramètres d'entrée.

3. GCO identifie la version déployée dans l'environnement demandé.

4. GCO produit le PDF à partir du gabarit Word et des données reçues.

5. Selon le mode d'impression choisi :
   - PREVIEW    → PDF retourné directement, sans dépôt ni impression.
   - NUMERIQUE  → PDF déposé dans la GED uniquement.
   - LOT        → PDF mis en lot d'impression différé.
   - LOTDIFF    → PDF retenu pour impression différée déclenchée manuellement.
   - IMMEDIAT   → PDF imprimé sur l'imprimante locale de l'utilisateur.

6. La commande est enregistrée dans la base de données GCO.

7. Le retour est :
   - application/pdf  → binaire du fichier PDF
   - application/json → { numeroCommande, nomFichier, identifiantUniqueDocument }
```

---

## Prochaines étapes

→ [02 — Authentification](02-authentification.md) : obtenir et utiliser votre clé d'API.
