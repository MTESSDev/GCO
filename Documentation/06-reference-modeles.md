# 06 — Référence des modèles JSON

[[_TOC_]]

Cette page décrit en détail tous les objets JSON utilisés dans l'API GCO212.

---

## ParamsGenerationCorrespondance

Corps de la requête `POST /systeme/correspondances/generer`.

```json
{
  "codeTypeCorrespondance": "string",
  "codeEnvironnement": "string",
  "codeLangue": "F" | "A",
  "modeImpression": "PREVIEW" | "IMMEDIAT" | "LOT" | "LOTDIFF" | "NUMERIQUE",
  "dateEffectiviteCorrespondance": "2026-04-22T00:00:00",
  "dateEmissionCorrespondance": "2026-04-22T08:30:00",
  "numeroIndividu": 1234567890,
  "uniteTraitementAppelante": "string",
  "codeSystemeEmetteur": "string",
  "donneesCorrespondance": { },
  "indDepotGED": true,
  "metadonneesDocument": { }
}
```

| Champ | Type | Obligatoire | Contraintes | Description |
|-------|------|:-----------:|-------------|-------------|
| `codeTypeCorrespondance` | string | **Oui** | max 20 car. | Code de la correspondance dans GCO. |
| `codeEnvironnement` | string | **Oui** | max 10 car. | Code court de l'environnement. |
| `codeLangue` | string | **Oui** | `F` ou `A` | Langue de production. |
| `modeImpression` | string | **Oui** | Voir valeurs | Mode de traitement après production. |
| `dateEffectiviteCorrespondance` | datetime | **Oui** | ISO 8601 | Date d'effectivité. |
| `dateEmissionCorrespondance` | datetime | **Oui** | ISO 8601 | Date d'émission par le SM. |
| `numeroIndividu` | long | Non | 0–9 999 999 999 999 | Numéro GDI du destinataire. |
| `uniteTraitementAppelante` | string | **Oui** | max 50 car. | Unité de traitement appelante. |
| `codeSystemeEmetteur` | string | **Oui** | max 50 car. | Code du système émetteur. |
| `donneesCorrespondance` | objet JSON | **Oui** | JSON valide | Données dynamiques pour le gabarit. |
| `indDepotGED` | bool | Non | — | Activer/désactiver le dépôt GED. |
| `metadonneesDocument` | MetadonneesDocument | Conditionnel | — | Requis si `indDepotGED = true`. |

---

## MetadonneesDocument

Métadonnées pour le dépôt dans la GED.

```json
{
  "identifiantUniqueDocument": 9876543210123,
  "cleReperageSystemeMission": "string",
  "individusLies": [1234567890],
  "indAffichageClient": false,
  "numeroReferenceEvenement": "string",
  "ligneAffaire": "string",
  "sujetFrancais": "string",
  "sujetAnglais": "string",
  "auteurDocument": "string",
  "informationsSupplementaires": [
    { "cle": "string", "valeur": "string" }
  ]
}
```

| Champ | Type | Obligatoire | Contraintes | Description |
|-------|------|:-----------:|-------------|-------------|
| `identifiantUniqueDocument` | long | Non¹ | 0–9 999 999 999 999 | Identifiant unique GED (IDE). Si absent, généré par GCO. |
| `cleReperageSystemeMission` | string | Non¹ | max 50 car. | Clé de repérage dans le système de mission. |
| `individusLies` | long[] | Non¹ | 13 chiffres max | Numéros GDI des individus associés. |
| `indAffichageClient` | bool | Non | — | `true` = visible dans Mon Dossier / ECS. |
| `numeroReferenceEvenement` | string | Non | max 50 car. | Numéro d'événement pour ECS. |
| `ligneAffaire` | string | Non² | max 50 car. | Ligne d'affaires (converti en majuscules). |
| `sujetFrancais` | string | Non | max 260 car. | Sujet du document en français. |
| `sujetAnglais` | string | Non | max 260 car. | Sujet du document en anglais. |
| `auteurDocument` | string | Non | max 25 car. | Auteur du document. |
| `informationsSupplementaires` | InformationSupplementaires[] | Non | — | Liste de métadonnées supplémentaires. |

> ¹ Au moins **un** parmi `identifiantUniqueDocument`, `cleReperageSystemeMission`, ou un élément dans `individusLies` est requis lors d'un dépôt GED.
>
> ² Si absent à tous les niveaux (entrée + attributs version), GCO228 retourne une erreur.

---

## InformationSupplementaires

Paire clé/valeur de métadonnée supplémentaire.

```json
{
  "cle": "NumeroDossier",
  "valeur": "2026-00042"
}
```

| Champ | Type | Obligatoire | Contraintes | Description |
|-------|------|:-----------:|-------------|-------------|
| `cle` | string | **Oui** | max 25 car. | Code de la métadonnée. |
| `valeur` | string | **Oui** | max 1000 car. | Valeur de la métadonnée. |

---

## RetourGenererCorrespondance

Réponse JSON de GCO212 (`Accept: application/json`).

```json
{
  "numeroCommande": "string",
  "nomFichier": "string",
  "identifiantUniqueDocument": 9876543210123
}
```

| Champ | Type | Description |
|-------|------|-------------|
| `numeroCommande` | string | Numéro de commande GCO (clé en BD). |
| `nomFichier` | string | Nom du fichier PDF produit (ShortGuid). |
| `identifiantUniqueDocument` | long | Identifiant unique GED reçu ou généré. |

---

## Valeurs d'énumération

### codeLangue

| Valeur | Description |
|--------|-------------|
| `F` | Français |
| `A` | Anglais |

### modeImpression

| Valeur | Description |
|--------|-------------|
| `PREVIEW` | Aperçu — PDF retourné, pas d'impression ni de dépôt GED |
| `IMMEDIAT` | Impression locale sur l'imprimante du profil utilisateur |
| `LOT` | Impression en lot différé (automatique) |
| `LOTDIFF` | Impression en lot différé (déclenchement manuel) |
| `NUMERIQUE` | PDF uniquement, dépôt GED sans impression |

### Attributs de version (configurés dans GCO)

Les attributs de version servent de valeurs de repli pour la production. Ils sont configurés dans l'interface GCO par l'équipe responsable. Voici les attributs standards reconnus par GCO212 :

| Préfixe:Clé | Usage | Requis pour le dépôt GED |
|-------------|-------|:------------------------:|
| `PDF:Titre` | Titre du document PDF | Non |
| `PDF:Sujet` | Sujet du document PDF | Non |
| `PDF:Auteur` | Auteur du document PDF | Non |
| `GED:Type` | Type de document dans la GED | **Oui** |
| `GED:Sujet` | Sujet dans la GED (repli si absent en entrée) | Non |
| `GED:Auteur` | Auteur dans la GED (repli si absent en entrée) | Non |
| `GED:IndAffichageClient` | Ind. affichable client (bool: `true`/`false`, `oui`/`non`) | Non |
| `GED:LigneAffaire` | Ligne d'affaires dans la GED | **Oui** |

---

## Format des dates

Toutes les dates doivent être au format **ISO 8601** :

```
2026-04-22T08:30:00
2026-04-22T00:00:00Z
2026-04-22T08:30:00-04:00
```

---

## Format de l'objet `donneesCorrespondance`

L'objet `donneesCorrespondance` est un JSON libre dont les clés correspondent aux **champs-signets** définis dans le gabarit Word `.docx`. Il n'existe pas de schéma fixe : la structure dépend du gabarit de chaque correspondance.

Exemple :
```json
{
  "NomDestinataire": "Dupont, Jean",
  "Adresse": "123, rue Principale, Québec (Québec)  G1A 0A0",
  "MontantAide": 500.00,
  "DateDecision": "22 avril 2026",
  "CodeReference": "ASF-2026-00042"
}
```

Consultez l'équipe responsable du gabarit ou prévisualisez la correspondance (mode `PREVIEW`) pour valider les noms des champs attendus.

---

## Valeurs booléennes supportées

GCO accepte plusieurs formats pour les valeurs booléennes (insensible à la casse) :

| Valeur vraie | Valeur fausse |
|:---:|:---:|
| `true` | `false` |
| `vrai` | `faux` |
| `oui` | `non` |
| `o` | `n` |
| `1` | `0` |

Si la valeur ne peut pas être analysée, elle est traitée comme `null`.
