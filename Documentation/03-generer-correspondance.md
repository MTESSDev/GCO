# 03 — Générer une correspondance (GCO212)

[[_TOC_]]

## Description

`POST /systeme/correspondances/generer` est le **point d'entrée principal** pour la production d'une correspondance depuis un système externe. Il correspond au service fonctionnel **GCO212**.

Ce service :

1. Valide les paramètres d'entrée ;
2. Localise la version déployée du gabarit pour l'environnement demandé ;
3. Produit le document PDF à partir du gabarit Word et des données dynamiques ;
4. Dépose le document dans la GED (si requis) ;
5. Lance l'impression ou met en lot (selon le mode) ;
6. Enregistre la commande dans la base de données GCO ;
7. Retourne le PDF ou les informations sur la commande.

---

## Endpoint

```
POST /systeme/correspondances/generer
```

### En-têtes requis

| En-tête | Obligatoire | Description |
|---------|-------------|-------------|
| `Authorization` | Oui | `Api-Key {votre-cle-api}` |
| `x-client-id` | Oui | Identifiant du système appelant |
| `Content-Type` | Oui | `application/json` |
| `Accept` | Oui | `application/json` ou `application/pdf` (voir [Retour](#retour)) |
| `x-code-nt` | Non | Code NT Windows (`DOMAINE\UTILISATEUR`) — obligatoire pour mode `IMMEDIAT` |

---

## Corps de la requête

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
  "donneesCorrespondance": {
    "NomDestinataire": "Dupont, Jean",
    "Adresse": "123, rue Principale",
    "Ville": "Québec",
    "CodePostal": "G1A 0A0",
    "MontantAide": 500.00
  },
  "indDepotGED": true,
  "metadonneesDocument": {
    "identifiantUniqueDocument": null,
    "cleReperageSystemeMission": "ASF-2026-00042",
    "individusLies": [1234567890],
    "indAffichageClient": false,
    "numeroReferenceEvenement": "EVT-2026-001",
    "ligneAffaire": "ASF",
    "sujetFrancais": "Avis de décision - Aide sociale",
    "sujetAnglais": "Decision Notice - Social Assistance",
    "auteurDocument": null,
    "informationsSupplementaires": [
      { "cle": "NumeroDossier", "valeur": "2026-00042" }
    ]
  }
}
```

---

## Paramètres détaillés

### Paramètres principaux

| Champ | Type | Obligatoire | Longueur max | Description |
|-------|------|-------------|--------------|-------------|
| `codeTypeCorrespondance` | string | **Oui** | 20 | Code de la correspondance défini dans GCO (ex. `J08`). |
| `codeEnvironnement` | string | **Oui** | 10 | Code court de l'environnement de déploiement (ex. `SAT`, `PROD`). Doit correspondre à un environnement associé à votre clé d'API. |
| `codeLangue` | string | **Oui** | 1 | `F` (français) ou `A` (anglais). Si la version anglaise n'existe pas, le français est utilisé en repli. |
| `modeImpression` | string | **Oui** | 30 | Mode de traitement. Voir [04 — Modes de production](04-modes-de-production.md). Valeurs : `PREVIEW`, `IMMEDIAT`, `LOT`, `LOTDIFF`, `NUMERIQUE`. |
| `dateEffectiviteCorrespondance` | datetime | **Oui** | — | Date d'effectivité de la correspondance (ISO 8601). |
| `dateEmissionCorrespondance` | datetime | **Oui** | — | Date d'émission par le système de mission (ISO 8601). |
| `numeroIndividu` | long | Non | 13 chiffres | Numéro GDI de l'individu destinataire. |
| `uniteTraitementAppelante` | string | **Oui** | 50 | Numéro d'unité de traitement appelante (ex. `ASF421`). Les 3 premiers caractères déterminent le regroupement de lot pour l'impression différée. |
| `codeSystemeEmetteur` | string | **Oui** | 50 | Code du système qui émet la correspondance (ex. `ASF`). |
| `donneesCorrespondance` | objet JSON | **Oui** | — | Contient les valeurs dynamiques à substituer dans le gabarit Word. Les clés correspondent aux champs-signets définis dans le `.docx`. |
| `indDepotGED` | bool | Non | — | `true` pour déposer dans la GED. Si absent, la valeur par défaut de la configuration GCO est appliquée. |
| `metadonneesDocument` | objet | Conditionnel | — | **Obligatoire** si `indDepotGED` est `true`. Voir [05 — Dépôt GED](05-depot-ged.md). |

### Objet `metadonneesDocument`

| Champ | Type | Obligatoire | Longueur max | Description |
|-------|------|-------------|--------------|-------------|
| `identifiantUniqueDocument` | long | Non | 13 chiffres | Identifiant unique GED. Si absent, GCO en génère un nouveau et le retourne. |
| `cleReperageSystemeMission` | string | Non¹ | 50 | Identifiant de repérage dans le système de mission. |
| `individusLies` | long[] | Non¹ | 13 chiffres chacun | Numéros GDI des individus associés au document. |
| `indAffichageClient` | bool | Non | — | `true` si le document doit être visible par le client (Mon Dossier / ECS). |
| `numeroReferenceEvenement` | string | Non | 50 | Numéro associant le document à un événement ECS. |
| `ligneAffaire` | string | Non² | 50 | Ligne d'affaires (ex. `ASF`, `SRERCO`). Converti en majuscules. |
| `sujetFrancais` | string | Non | 260 | Sujet du document en français pour la GED. |
| `sujetAnglais` | string | Non | 260 | Sujet du document en anglais pour la GED. |
| `auteurDocument` | string | Non | 25 | Auteur du document. Si absent, la valeur de l'attribut `GED:Auteur` ou la valeur par défaut de configuration est utilisée. |
| `informationsSupplementaires` | objet[] | Non | — | Liste de métadonnées clé/valeur supplémentaires. |

> ¹ Lors d'un dépôt GED, **au moins un** des champs suivants doit être présent : `identifiantUniqueDocument`, `cleReperageSystemeMission`, ou au moins un élément dans `individusLies`. À défaut, GCO retourne une erreur de validation.
>
> ² Si `ligneAffaire` est absent (ni dans les paramètres, ni dans les attributs de version), GCO228 rejette l'appel avec une erreur technique.

### Objet `informationsSupplementaires`

| Champ | Type | Obligatoire | Longueur max | Description |
|-------|------|-------------|--------------|-------------|
| `cle` | string | **Oui** | 25 | Code de la métadonnée supplémentaire. |
| `valeur` | string | **Oui** | 1000 | Valeur de la métadonnée supplémentaire. |

---

## Retour

Le format de retour dépend de l'en-tête `Accept` de la requête.

### Accept: application/pdf

```
HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="{shortGuid}.pdf"

[Binaire du fichier PDF]
```

Utilisez ce mode pour obtenir directement le PDF (ex. prévisualisation, mode numérique).

### Accept: application/json

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "numeroCommande": "ABC-12345",
  "nomFichier": "3f9a2b1c-d4e5-4f6a-b7c8-9d0e1f2a3b4c.pdf",
  "identifiantUniqueDocument": 9876543210123
}
```

| Champ | Type | Description |
|-------|------|-------------|
| `numeroCommande` | string | Numéro de commande généré par GCO dans la base de données. |
| `nomFichier` | string | Nom du fichier PDF produit (ShortGuid). |
| `identifiantUniqueDocument` | long | Identifiant unique GED reçu en entrée ou généré durant le traitement. |

> Si l'en-tête `Accept` est absent ou différent de `application/pdf` et `application/json`, GCO retourne `415 Unsupported Media Type`.

---

## Hiérarchie des valeurs pour le dépôt GED

Pour certains paramètres (Titre, Sujet, Auteur, Type GED, etc.), GCO applique une hiérarchie de résolution :

```
Priorité 1 : Valeur reçue dans les paramètres d'entrée
      ↓
Priorité 2 : Valeur configurée dans les attributs de la version GCO
      ↓
Priorité 3 : Valeur par défaut dans la configuration GCO (appsettings)
      ↓
      Erreur si aucune valeur trouvée (ex. GED:Type, GED:LigneAffaire)
```

**Exception** : pour le **sujet de la GED**, le repli de langue (français si anglais absent) ne s'applique **pas**. Si le sujet anglais est absent à tous les niveaux, GCO transmet une valeur nulle à GCO228.

---

## Validation et erreurs courantes

| Code erreur | Condition | Message |
|-------------|-----------|---------|
| `GCO212001` | `codeLangue` invalide | `CodeLangue invalide. Valeurs possibles: F, A.` |
| `GCO212002` | `modeImpression` invalide | `ModeImpression invalide. Valeurs possibles: PREVIEW, IMMEDIAT, LOT, LOTDIFF, NUMERIQUE.` |
| `GCO212003` | `indDepotGED = true` mais `metadonneesDocument` absent | `MetadonneesDocument est obligatoire pour un dépôt dans GED.` |
| `GCO212004` | `individusLies` contient une valeur > 13 chiffres | `Les IndividusLies doivent avoir maximum 13 chiffres.` |
| `GCO212005` | Mode `IMMEDIAT` et aucune imprimante dans le profil | `Imprimante non définie dans le profil GCO, vérifiez vos courriels.` |
| `GCO000099` | Aucune version déployée trouvée | `Aucune version n'est déployée pour la correspondance {code} dans l'environnement {env} pour l'équipe {equipe}.` |
| — | Au moins un identifiant requis pour dépôt GED | `Présence obligatoire au moins 1 (clé repérage, identifiant document, ou individu lié) lors du dépôt dans GED.` |

Voir [07 — Codes d'erreur](07-codes-erreur.md) pour la référence complète.

---

## Exemple minimal

Requête pour produire un PDF en mode aperçu et le recevoir directement :

```http
POST /systeme/correspondances/generer HTTP/1.1
Host: master-webapi.intra-gco.sa.mes.reseau.intra
Authorization: Api-Key 3f9a2b1c-d4e5-4f6a-b7c8-9d0e1f2a3b4c
x-client-id: ASF-SAT-001
Content-Type: application/json
Accept: application/pdf

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

→ Voir [08 — Exemples](08-exemples.md) pour des cas plus complets.

---

## Enregistrement de la commande

Toute exécution de GCO212 — **succès ou échec** — est enregistrée dans la table `GCO2.COMMANDE_CORRESPONDANCE`. Cela permet :

- La production de statistiques de balancement ;
- La reprise en cas de défaillance ;
- L'audit des correspondances produites.

Les informations enregistrées incluent : version de correspondance, dates de traitement, mode d'impression, statut (`S` ou `E`), description de l'erreur, numéro d'individu, et l'ensemble des paramètres au format JSON.
