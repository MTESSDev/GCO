# 05 — Dépôt dans la GED

[[_TOC_]]

## Vue d'ensemble

GCO peut déposer automatiquement la correspondance produite dans la **GED** (Gestion Électronique des Documents) via le service interne GCO228.

---

## Activer le dépôt GED

Le dépôt GED est contrôlé par le paramètre `indDepotGED` dans la requête :

```json
{
  "indDepotGED": true,
  ...
}
```

| Valeur | Comportement |
|--------|-------------|
| `true` | Dépôt dans la GED activé |
| `false` | Pas de dépôt dans la GED |
| absent / `null` | Valeur par défaut de la configuration GCO appliquée (`GCO:ParamsDefautGenerationCorrespondance:GED:IndDepotGED`) |

> Pour les modes `PREVIEW` et `NUMERIQUE`, le comportement du dépôt GED suit les mêmes règles, mais `PREVIEW` **ignore** systématiquement le dépôt même si `indDepotGED = true`.

---

## Prérequis au dépôt GED

Lorsque `indDepotGED = true`, la requête **doit** inclure l'objet `metadonneesDocument` avec **au moins un** des identifiants suivants :

- `identifiantUniqueDocument` (non nul)
- `cleReperageSystemeMission` (non nul)
- Au moins un élément dans `individusLies`

À défaut, GCO retourne une erreur de validation :
```
Présence obligatoire au moins 1 (clé repérage, identifiant document, ou individu lié) lors du dépôt dans GED.
```

---

## Paramètres transmis à la GED (GCO228)

GCO transmet les informations suivantes au service GCO228 lors du dépôt. Pour chaque paramètre, une **hiérarchie de résolution** s'applique :

| Paramètre GED | Priorité 1 — Entrée | Priorité 2 — Attribut version | Priorité 3 — Défaut config |
|---------------|---------------------|-------------------------------|----------------------------|
| **Type de document** | N/A | `GED:Type` | ⚠️ Aucun — erreur si absent |
| **Sujet** | `metadonneesDocument.sujetFrancais` ou `sujetAnglais` (selon langue) | `GED:Sujet` | `GCO:ParamsDefautGenerationCorrespondance:Default:Sujet` |
| **Auteur** | `metadonneesDocument.auteurDocument` | `GED:Auteur` | `GCO:ParamsDefautGenerationCorrespondance:Default:Auteur` |
| **Ind. affichable client** | `metadonneesDocument.indAffichageClient` | `GED:IndAffichageClient` | `GCO:ParamsDefautGenerationCorrespondance:GED:IndAffichageClient` |
| **Ligne d'affaires** | `metadonneesDocument.ligneAffaire` | `GED:LigneAffaire` | ⚠️ Aucun — erreur si absent |

> Les champs marqués ⚠️ **doivent** être fournis soit dans les paramètres d'entrée, soit dans les attributs de la version GCO. Contactez le responsable de votre équipe GCO pour vérifier que les attributs `GED:Type` et `GED:LigneAffaire` sont configurés sur la version déployée.

### Paramètres toujours transmis depuis les entrées

| Paramètre GED | Source |
|---------------|--------|
| Identifiant unique document | `metadonneesDocument.identifiantUniqueDocument` (ou généré par GCO si absent) |
| Clé de repérage SM | `metadonneesDocument.cleReperageSystemeMission` |
| Individus liés | `metadonneesDocument.individusLies` |
| Date d'émission | `dateEmissionCorrespondance` |
| Numéro référence événement | `metadonneesDocument.numeroReferenceEvenement` |
| Code système | `codeSystemeEmetteur` |
| Langue | `codeLangue` (converti en majuscules) |
| Niveau de sécurité | `1` (fixe) |
| Informations supplémentaires | `metadonneesDocument.informationsSupplementaires` |

---

## Identifiant unique de document

Si votre système possède un identifiant unique de document GED (provenant de l'IDE), passez-le dans `metadonneesDocument.identifiantUniqueDocument`.

Si vous passez `null`, GCO génère un identifiant via `CAC.Identifiant` et le retourne dans le champ `identifiantUniqueDocument` de la réponse JSON. Conservez cet identifiant pour les traitements ultérieurs.

---

## Gestion de la langue pour le sujet

**Exception importante** : contrairement aux autres paramètres, le **sujet** n'applique **pas** le repli de langue vers le français lorsque la valeur anglaise est absente. Si la langue demandée est `A` et qu'aucun sujet anglais n'est disponible à aucun niveau, GCO transmet une valeur nulle à GCO228.

---

## Parcours du fichier vers la GED

1. GCO dépose le PDF produit dans le répertoire `GCO_FICH_ECHANGE_01`.
2. GCO appelle le service asynchrone continu GCO228 en lui transmettant les métadonnées.
3. GCO228 inscrit le document dans la GED.
