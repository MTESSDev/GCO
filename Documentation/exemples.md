# Exemples de requêtes

Remplacez les valeurs entre `{accolades}` par vos propres valeurs.

&nbsp;

## Aperçu d'une correspondance (PREVIEW)

Recevoir le PDF directement, sans impression ni dépôt GED.

```http
POST /systeme/correspondances/generer HTTP/1.1
Host: master-webapi.intra-gco.sa.mes.reseau.intra
Authorization: Api-Key {votre-cle-api}
x-client-id: {votre-client-id}
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
    "NomDestinataire": "Dupont, Jean",
    "Adresse": "123, rue Principale, Québec (Québec)  G1A 0A0",
    "MontantAide": 500.00
  }
}
```

**Réponse :** `200 OK` avec le binaire PDF dans le corps.

&nbsp;

## Impression en lot avec dépôt GED (LOT)

Cas d'usage le plus courant.

```http
POST /systeme/correspondances/generer HTTP/1.1
Host: {url-base-api}
Authorization: Api-Key {votre-cle-api}
x-client-id: {votre-client-id}
Content-Type: application/json
Accept: application/json

{
  "codeTypeCorrespondance": "J08",
  "codeEnvironnement": "PROD",
  "codeLangue": "F",
  "modeImpression": "LOT",
  "dateEffectiviteCorrespondance": "2026-04-22T00:00:00",
  "dateEmissionCorrespondance": "2026-04-22T08:30:00",
  "numeroIndividu": 1234567890,
  "uniteTraitementAppelante": "ASF421",
  "codeSystemeEmetteur": "ASF",
  "donneesCorrespondance": {
    "NomDestinataire": "Dupont, Jean",
    "Adresse": "123, rue Principale, Québec (Québec)  G1A 0A0",
    "MontantAide": 500.00,
    "DateDecision": "22 avril 2026"
  },
  "indDepotGED": true,
  "metadonneesDocument": {
    "identifiantUniqueDocument": null,
    "cleReperageSystemeMission": "ASF-2026-00042",
    "individusLies": [1234567890],
    "indAffichageClient": false,
    "ligneAffaire": "ASF",
    "sujetFrancais": "Avis de décision — Aide sociale",
    "sujetAnglais": "Decision Notice — Social Assistance",
    "informationsSupplementaires": [
      { "cle": "NumeroDossier", "valeur": "2026-00042" }
    ]
  }
}
```

**Réponse :**
```json
{
  "numeroCommande": "CMD-2026-88421",
  "nomFichier": "3f9a2b1c-d4e5-4f6a-b7c8-9d0e1f2a3b4c.pdf",
  "identifiantUniqueDocument": 9876543210123
}
```

&nbsp;

## Lot différé (LOTDIFF)

Correspondance retenue jusqu'au déclenchement manuel.

```http
POST /systeme/correspondances/generer HTTP/1.1
Host: {url-base-api}
Authorization: Api-Key {votre-cle-api}
x-client-id: {votre-client-id}
Content-Type: application/json
Accept: application/json

{
  "codeTypeCorrespondance": "AVIS_RENOUVELLEMENT",
  "codeEnvironnement": "PROD",
  "codeLangue": "F",
  "modeImpression": "LOTDIFF",
  "dateEffectiviteCorrespondance": "2026-05-01T00:00:00",
  "dateEmissionCorrespondance": "2026-04-22T10:00:00",
  "numeroIndividu": 9876543210,
  "uniteTraitementAppelante": "ASF421",
  "codeSystemeEmetteur": "ASF",
  "donneesCorrespondance": {
    "NomDestinataire": "Tremblay, Marie",
    "DateExpiration": "1er mai 2026"
  },
  "indDepotGED": false
}
```

&nbsp;

## Document numérique uniquement (NUMERIQUE)

Dépôt dans la GED, aucune impression.

```http
POST /systeme/correspondances/generer HTTP/1.1
Host: {url-base-api}
Authorization: Api-Key {votre-cle-api}
x-client-id: {votre-client-id}
Content-Type: application/json
Accept: application/pdf

{
  "codeTypeCorrespondance": "AVIS_NUMERIQUE",
  "codeEnvironnement": "PROD",
  "codeLangue": "A",
  "modeImpression": "NUMERIQUE",
  "dateEffectiviteCorrespondance": "2026-04-22T00:00:00",
  "dateEmissionCorrespondance": "2026-04-22T09:00:00",
  "numeroIndividu": 5555555555,
  "uniteTraitementAppelante": "ASF421",
  "codeSystemeEmetteur": "ASF",
  "donneesCorrespondance": {
    "RecipientName": "Smith, John",
    "DecisionDate": "April 22, 2026"
  },
  "indDepotGED": true,
  "metadonneesDocument": {
    "cleReperageSystemeMission": "ASF-2026-EN-001",
    "individusLies": [5555555555],
    "indAffichageClient": true,
    "ligneAffaire": "ASF",
    "sujetAnglais": "Decision Notice"
  }
}
```

&nbsp;

## Impression immédiate (IMMEDIAT)

Impression sur l'imprimante du profil d'un agent. Requiert l'en-tête `x-code-nt`.

```http
POST /systeme/correspondances/generer HTTP/1.1
Host: {url-base-api}
Authorization: Api-Key {votre-cle-api}
x-client-id: {votre-client-id}
x-code-nt: MES\j.dupont
Content-Type: application/json
Accept: application/json

{
  "codeTypeCorrespondance": "FICHE_ENTRETIEN",
  "codeEnvironnement": "PROD",
  "codeLangue": "F",
  "modeImpression": "IMMEDIAT",
  "dateEffectiviteCorrespondance": "2026-04-22T00:00:00",
  "dateEmissionCorrespondance": "2026-04-22T14:30:00",
  "numeroIndividu": 1111111111,
  "uniteTraitementAppelante": "ASF421",
  "codeSystemeEmetteur": "ASF",
  "donneesCorrespondance": {
    "NomClient": "Lapointe, Pierre",
    "DateEntretien": "22 avril 2026 à 14h30"
  },
  "indDepotGED": false
}
```

> L'utilisateur `j.dupont` doit avoir une imprimante configurée dans son profil GCO.

&nbsp;

## Avec identifiant unique de document fourni

Quand votre système possède déjà un identifiant GED unique (provenant de l'IDE).

```http
POST /systeme/correspondances/generer HTTP/1.1
Host: {url-base-api}
Authorization: Api-Key {votre-cle-api}
x-client-id: {votre-client-id}
Content-Type: application/json
Accept: application/json

{
  "codeTypeCorrespondance": "J08",
  "codeEnvironnement": "PROD",
  "codeLangue": "F",
  "modeImpression": "LOT",
  "dateEffectiviteCorrespondance": "2026-04-22T00:00:00",
  "dateEmissionCorrespondance": "2026-04-22T09:00:00",
  "uniteTraitementAppelante": "ASF421",
  "codeSystemeEmetteur": "ASF",
  "donneesCorrespondance": {
    "NomDestinataire": "Bouchard, Luc"
  },
  "indDepotGED": true,
  "metadonneesDocument": {
    "identifiantUniqueDocument": 1234567890123,
    "individusLies": [7777777777],
    "ligneAffaire": "ASF",
    "sujetFrancais": "Confirmation d'inscription"
  }
}
```

**Réponse :**
```json
{
  "numeroCommande": "CMD-2026-99001",
  "nomFichier": "abc12345-de67-890f-abcd-ef1234567890.pdf",
  "identifiantUniqueDocument": 1234567890123
}
```

&nbsp;

## Tester via Swagger

L'interface interactive est disponible à `{url-de-base}/Swagger/index.html`.

1. Cliquez sur **Authorize** et entrez `Api-Key {votre-cle}`;
2. Naviguez vers `POST /systeme/correspondances/generer`;
3. Ajoutez `x-client-id` dans les en-têtes;
4. Copiez un des exemples ci-dessus comme corps de requête.
