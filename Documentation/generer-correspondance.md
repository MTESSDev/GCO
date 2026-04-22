# Générer une correspondance (GCO212)

## Qu'est-ce que ce service fait?

`POST /systeme/correspondances/generer` est le **point d'entrée unique** pour produire une correspondance depuis un système externe. Il valide les paramètres, localise la version déployée, produit le PDF, déclenche l'impression ou le dépôt GED, et enregistre la commande.

&nbsp;

## Comment appeler le service?

```http
POST /systeme/correspondances/generer
Authorization: Api-Key {votre-cle-api}
x-client-id: {votre-client-id}
Content-Type: application/json
Accept: application/json   (ou application/pdf)
```

Corps minimal :

```json
{
  "codeTypeCorrespondance": "J08",
  "codeEnvironnement": "SAT",
  "codeLangue": "F",
  "modeImpression": "PREVIEW",
  "dateEffectiviteCorrespondance": "2026-04-22T00:00:00",
  "dateEmissionCorrespondance": "2026-04-22T08:30:00",
  "uniteTraitementAppelante": "ASF421",
  "codeSystemeEmetteur": "ASF",
  "donneesCorrespondance": {
    "NomDestinataire": "Dupont, Jean"
  }
}
```

[Voir des exemples complets pour tous les modes →](exemples.md)

&nbsp;

## Paramètres de la requête

### Paramètres principaux

| Champ | Obligatoire | Contraintes | Description |
|-------|:-----------:|-------------|-------------|
| `codeTypeCorrespondance` | **Oui** | max 20 car. | Code de la correspondance dans GCO (ex. `J08`). |
| `codeEnvironnement` | **Oui** | max 10 car. | Code court de l'environnement (ex. `SAT`, `PROD`). |
| `codeLangue` | **Oui** | `F` ou `A` | Langue de production. Repli vers le français si version anglaise absente. |
| `modeImpression` | **Oui** | Voir valeurs | Mode de traitement après production. |
| `dateEffectiviteCorrespondance` | **Oui** | ISO 8601 | Date d'effectivité. |
| `dateEmissionCorrespondance` | **Oui** | ISO 8601 | Date d'émission par le système de mission. |
| `uniteTraitementAppelante` | **Oui** | max 50 car. | Unité de traitement (ex. `ASF421`). Les 3 premiers caractères déterminent le regroupement de lot. |
| `codeSystemeEmetteur` | **Oui** | max 50 car. | Code du système émetteur (ex. `ASF`). |
| `donneesCorrespondance` | **Oui** | JSON valide | Valeurs dynamiques à substituer dans le gabarit Word. |
| `numeroIndividu` | Non | max 13 chiffres | Numéro GDI du destinataire. |
| `indDepotGED` | Non | bool | `true` pour déposer dans la GED. Valeur par défaut de config si absent. |
| `metadonneesDocument` | Conditionnel | — | **Obligatoire** si `indDepotGED = true`. [Voir détail](depot-ged.md). |

### Valeurs de `modeImpression`

`PREVIEW` · `LOT` · `LOTDIFF` · `IMMEDIAT` · `NUMERIQUE`

[Consulter la description détaillée de chaque mode →](modes-de-production.md)

&nbsp;

## Que retourne le service?

Le format de retour dépend de l'en-tête `Accept`.

### Accept: application/json

```json
{
  "numeroCommande": "CMD-2026-88421",
  "nomFichier": "3f9a2b1c-d4e5-4f6a-b7c8-9d0e1f2a3b4c.pdf",
  "identifiantUniqueDocument": 9876543210123
}
```

### Accept: application/pdf

Binaire du fichier PDF, avec en-tête `Content-Disposition: attachment; filename="{guid}.pdf"`.

> Si l'en-tête `Accept` est absent ou différent de `application/json` et `application/pdf`, le service retourne `415 Unsupported Media Type`.

&nbsp;

## Comment les valeurs sont-elles résolues pour la GED?

Pour les paramètres de dépôt GED (sujet, auteur, type, ligne d'affaires), GCO applique une hiérarchie :

```
1. Valeur reçue dans les paramètres d'entrée
        ↓
2. Valeur de l'attribut configuré sur la version GCO
        ↓
3. Valeur par défaut dans la configuration GCO
        ↓
   Erreur si aucune valeur (GED:Type et GED:LigneAffaire)
```

> **Exception** : pour le sujet de la GED, le repli de langue vers le français ne s'applique **pas**.

&nbsp;

## Validations et erreurs courantes

| Code | Condition | Message |
|------|-----------|---------|
| `GCO212001` | `codeLangue` invalide | `CodeLangue invalide. Valeurs possibles: F, A.` |
| `GCO212002` | `modeImpression` invalide | `ModeImpression invalide. Valeurs possibles: PREVIEW, IMMEDIAT, LOT, LOTDIFF, NUMERIQUE.` |
| `GCO212003` | Dépôt GED sans `metadonneesDocument` | `MetadonneesDocument est obligatoire pour un dépôt dans GED.` |
| `GCO212005` | Mode `IMMEDIAT`, aucune imprimante au profil | `Imprimante non définie dans le profil GCO, vérifiez vos courriels.` |
| `GCO000099` | Aucune version déployée trouvée | `Aucune version n'est déployée pour la correspondance {code}...` |

[Consulter la référence complète des codes d'erreur →](codes-erreur.md)

&nbsp;

## Prochaine étape

[Choisir le mode de production approprié →](modes-de-production.md)
