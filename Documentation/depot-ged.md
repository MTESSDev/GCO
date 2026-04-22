# Dépôt dans la GED

## Comment activer le dépôt GED?

Passez `"indDepotGED": true` dans votre requête. Si ce paramètre est absent ou `null`, la valeur par défaut de la configuration GCO est appliquée.

> Le mode `PREVIEW` ignore le dépôt GED même si `indDepotGED = true`.

&nbsp;

## Quels identifiants fournir?

Lorsque `indDepotGED = true`, l'objet `metadonneesDocument` est **obligatoire** et doit contenir **au moins un** des identifiants suivants :

- `identifiantUniqueDocument` (non nul)
- `cleReperageSystemeMission` (non nulle)
- Au moins un élément dans `individusLies`

À défaut, GCO retourne :
```
Présence obligatoire au moins 1 (clé repérage, identifiant document, ou individu lié) lors du dépôt dans GED.
```

&nbsp;

## Comment sont résolus les paramètres transmis à la GED?

Pour chaque paramètre, GCO applique une hiérarchie de résolution :

| Paramètre GED | Priorité 1 — Paramètre d'entrée | Priorité 2 — Attribut version GCO | Priorité 3 — Config GCO |
|---------------|--------------------------------|----------------------------------|------------------------|
| **Type de document** | N/A | `GED:Type` | ⚠️ Aucun — erreur si absent |
| **Sujet** | `sujetFrancais` / `sujetAnglais` | `GED:Sujet` | Valeur par défaut config |
| **Auteur** | `auteurDocument` | `GED:Auteur` | Valeur par défaut config |
| **Ind. affichable client** | `indAffichageClient` | `GED:IndAffichageClient` | Valeur par défaut config |
| **Ligne d'affaires** | `ligneAffaire` | `GED:LigneAffaire` | ⚠️ Aucun — erreur si absent |

> Les champs ⚠️ doivent être fournis en entrée **ou** configurés comme attributs sur la version dans GCO. Contactez le responsable de votre équipe GCO pour vérifier la configuration.

&nbsp;

## Comment fonctionne l'identifiant unique de document?

- Si vous passez un `identifiantUniqueDocument` (provenant de l'IDE), GCO l'utilise tel quel.
- Si vous passez `null`, GCO en génère un nouveau via `CAC.Identifiant` et le **retourne** dans le champ `identifiantUniqueDocument` de la réponse JSON. Conservez-le pour les traitements ultérieurs.

&nbsp;

## Attention — Exception pour le sujet

Contrairement aux autres paramètres, le **sujet** n'applique **pas** le repli de langue vers le français lorsque la valeur anglaise est absente. Si la langue demandée est `A` et qu'aucun sujet anglais n'est disponible, GCO transmet `null` à GCO228.

&nbsp;

## Parcours du fichier vers la GED

1. GCO dépose le PDF produit dans le répertoire `GCO_FICH_ECHANGE_01`;
2. GCO appelle le service asynchrone continu GCO228 avec les métadonnées;
3. GCO228 inscrit le document dans la GED.

&nbsp;

## Prochaine étape

[Consulter la référence complète des modèles JSON →](reference-modeles.md)
