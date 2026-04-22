# Référence des modèles JSON

## ParamsGenerationCorrespondance

Corps complet de la requête `POST /systeme/correspondances/generer`.

```json
{
  "codeTypeCorrespondance": "J08",
  "codeEnvironnement": "SAT",
  "codeLangue": "F",
  "modeImpression": "LOT",
  "dateEffectiviteCorrespondance": "2026-04-22T00:00:00",
  "dateEmissionCorrespondance": "2026-04-22T08:30:00",
  "numeroIndividu": 1234567890,
  "uniteTraitementAppelante": "ASF421",
  "codeSystemeEmetteur": "ASF",
  "donneesCorrespondance": { },
  "indDepotGED": true,
  "metadonneesDocument": { }
}
```

| Champ | Obligatoire | Contraintes | Description |
|-------|:-----------:|-------------|-------------|
| `codeTypeCorrespondance` | **Oui** | max 20 car. | Code de la correspondance dans GCO. |
| `codeEnvironnement` | **Oui** | max 10 car. | Code court de l'environnement. |
| `codeLangue` | **Oui** | `F` ou `A` | Langue de production. |
| `modeImpression` | **Oui** | Voir valeurs | Mode de traitement après production. |
| `dateEffectiviteCorrespondance` | **Oui** | ISO 8601 | Date d'effectivité. |
| `dateEmissionCorrespondance` | **Oui** | ISO 8601 | Date d'émission par le SM. |
| `uniteTraitementAppelante` | **Oui** | max 50 car. | Unité de traitement appelante. |
| `codeSystemeEmetteur` | **Oui** | max 50 car. | Code du système émetteur. |
| `donneesCorrespondance` | **Oui** | JSON valide | Données dynamiques pour le gabarit. |
| `numeroIndividu` | Non | 0–9 999 999 999 999 | Numéro GDI du destinataire. |
| `indDepotGED` | Non | bool | Activer/désactiver le dépôt GED. |
| `metadonneesDocument` | Conditionnel | — | Obligatoire si `indDepotGED = true`. |

&nbsp;

## MetadonneesDocument

```json
{
  "identifiantUniqueDocument": null,
  "cleReperageSystemeMission": "ASF-2026-00042",
  "individusLies": [1234567890],
  "indAffichageClient": false,
  "numeroReferenceEvenement": "EVT-2026-001",
  "ligneAffaire": "ASF",
  "sujetFrancais": "Avis de décision",
  "sujetAnglais": "Decision Notice",
  "auteurDocument": null,
  "informationsSupplementaires": [
    { "cle": "NumeroDossier", "valeur": "2026-00042" }
  ]
}
```

| Champ | Obligatoire | Contraintes | Description |
|-------|:-----------:|-------------|-------------|
| `identifiantUniqueDocument` | Non¹ | max 13 chiffres | Identifiant unique GED. Si `null`, GCO en génère un et le retourne. |
| `cleReperageSystemeMission` | Non¹ | max 50 car. | Clé de repérage dans le SM. |
| `individusLies` | Non¹ | max 13 chiffres chacun | Numéros GDI des individus associés. |
| `indAffichageClient` | Non | bool | `true` = visible dans Mon Dossier / ECS. |
| `numeroReferenceEvenement` | Non | max 50 car. | Numéro d'événement pour ECS. |
| `ligneAffaire` | Non² | max 50 car. | Ligne d'affaires (converti en majuscules). |
| `sujetFrancais` | Non | max 260 car. | Sujet du document en français. |
| `sujetAnglais` | Non | max 260 car. | Sujet du document en anglais. |
| `auteurDocument` | Non | max 25 car. | Auteur du document. |
| `informationsSupplementaires` | Non | — | Liste de paires clé/valeur supplémentaires. |

> ¹ Au moins **un** parmi `identifiantUniqueDocument`, `cleReperageSystemeMission`, ou un élément dans `individusLies` est requis lors d'un dépôt GED.
>
> ² Obligatoire si absent des attributs de la version GCO. Sinon GCO228 échoue.

&nbsp;

## InformationSupplementaires

```json
{ "cle": "NumeroDossier", "valeur": "2026-00042" }
```

| Champ | Obligatoire | Contraintes | Description |
|-------|:-----------:|-------------|-------------|
| `cle` | **Oui** | max 25 car. | Code de la métadonnée. |
| `valeur` | **Oui** | max 1000 car. | Valeur de la métadonnée. |

&nbsp;

## RetourGenererCorrespondance

Réponse JSON (`Accept: application/json`).

```json
{
  "numeroCommande": "CMD-2026-88421",
  "nomFichier": "3f9a2b1c-d4e5-4f6a-b7c8-9d0e1f2a3b4c.pdf",
  "identifiantUniqueDocument": 9876543210123
}
```

| Champ | Description |
|-------|-------------|
| `numeroCommande` | Numéro de commande en base de données GCO. |
| `nomFichier` | Nom du fichier PDF produit (ShortGuid). |
| `identifiantUniqueDocument` | Identifiant GED reçu ou généré par GCO. |

&nbsp;

## Valeurs d'énumération

### codeLangue

| Valeur | Description |
|--------|-------------|
| `F` | Français |
| `A` | Anglais (repli vers `F` si gabarit anglais absent) |

### modeImpression

| Valeur | Description |
|--------|-------------|
| `PREVIEW` | Aperçu — PDF retourné, pas d'impression ni de dépôt GED |
| `IMMEDIAT` | Impression locale sur l'imprimante du profil utilisateur |
| `LOT` | Impression en lot différé automatique |
| `LOTDIFF` | Impression en lot différé déclenchée manuellement |
| `NUMERIQUE` | PDF uniquement, dépôt GED sans impression |

&nbsp;

## Attributs de version (configurés dans GCO)

Ces attributs sont configurés dans l'interface GCO par l'équipe responsable.

| Attribut | Usage | Requis pour le dépôt GED |
|----------|-------|:------------------------:|
| `PDF:Titre` | Titre du document PDF | Non |
| `PDF:Sujet` | Sujet du document PDF | Non |
| `PDF:Auteur` | Auteur du document PDF | Non |
| `GED:Type` | Type de document dans la GED | **Oui** |
| `GED:Sujet` | Sujet dans la GED (repli si absent en entrée) | Non |
| `GED:Auteur` | Auteur dans la GED (repli si absent en entrée) | Non |
| `GED:IndAffichageClient` | Ind. affichable client (`true`/`false`, `oui`/`non`) | Non |
| `GED:LigneAffaire` | Ligne d'affaires dans la GED | **Oui** |

&nbsp;

## Notes sur les types

**Dates** — Format ISO 8601 : `2026-04-22T08:30:00`

**Booléens** — GCO accepte plusieurs formats (insensible à la casse) :

| Vrai | Faux |
|:----:|:----:|
| `true` | `false` |
| `vrai` | `faux` |
| `oui` | `non` |
| `o` | `n` |
| `1` | `0` |

**donneesCorrespondance** — Objet JSON libre dont les clés correspondent aux champs-signets du gabarit `.docx`. La structure dépend de chaque correspondance. Utilisez le mode `PREVIEW` pour valider les noms des champs attendus.
