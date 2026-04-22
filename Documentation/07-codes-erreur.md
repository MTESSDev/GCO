# 07 — Codes d'erreur et dépannage

[[_TOC_]]

## Format général des erreurs

Toutes les erreurs retournées par GCO suivent le format standard ASP.NET Problem Details :

```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "codeErreur": "GCO212001",
  "errors": {
    "codeLangue": [
      "CodeLangue invalide. Valeurs possibles: F, A."
    ]
  },
  "traceId": "00-0dba2caf308e572dfcfe9f97e75fbaaf-030798fbe439bbe2-00"
}
```

| Champ | Description |
|-------|-------------|
| `status` | Code HTTP |
| `codeErreur` | Code fonctionnel GCO (ex. `GCO212001`) |
| `errors` | Dictionnaire des erreurs de validation par champ |
| `traceId` | Identifiant de corrélation — à fournir lors d'un signalement |

---

## Codes HTTP

| Code | Nom | Signification dans GCO |
|------|-----|----------------------|
| `200 OK` | Succès | Traitement complété. |
| `201 Created` | Créé | Ressource créée (non utilisé pour GCO212). |
| `400 Bad Request` | Requête invalide | Un ou plusieurs paramètres sont invalides. Voir `errors`. |
| `401 Unauthorized` | Non authentifié | Clé d'API absente, malformée ou expirée. |
| `403 Forbidden` | Accès refusé | Authentification réussie mais accès à l'équipe ou l'environnement non autorisé. |
| `404 Not Found` | Introuvable | Correspondance, environnement ou version déployée introuvable. |
| `415 Unsupported Media Type` | Type non supporté | L'en-tête `Accept` n'est pas `application/json` ni `application/pdf`. |
| `500 Internal Server Error` | Erreur interne | Erreur technique non gérée. Consulter les logs avec le `traceId`. |

---

## Codes d'erreur fonctionnels GCO212

| Code | HTTP | Condition | Message |
|------|------|-----------|---------|
| `GCO212001` | 400 | `codeLangue` absent ou invalide | `CodeLangue invalide. Valeurs possibles: F, A.` |
| `GCO212002` | 400 | `modeImpression` absent ou invalide | `ModeImpression invalide. Valeurs possibles: PREVIEW, IMMEDIAT, LOT, LOTDIFF, NUMERIQUE.` |
| `GCO212003` | 400 | `indDepotGED = true` mais `metadonneesDocument` absent | `MetadonneesDocument est obligatoire pour un dépôt dans GED.` |
| `GCO212004` | 400 | Un élément de `individusLies` dépasse 13 chiffres | `Les IndividusLies doivent avoir maximum 13 chiffres.` |
| `GCO212005` | 500 | Mode `IMMEDIAT` et aucune imprimante dans le profil | `Imprimante non définie dans le profil GCO, vérifiez vos courriels.` |

---

## Codes d'erreur génériques GCO

| Code | HTTP | Condition | Message |
|------|------|-----------|---------|
| `GCO000099` | 404 | Environnement introuvable ou non autorisé | `L'environnement {env} de l'équipe {equipe} est introuvable ou vous n'y avez pas accès.` |
| `GCO000099` | 404 | Correspondance introuvable | `La correspondance {code} de l'équipe {equipe} est introuvable.` |
| `GCO000099` | 404 | Aucune version déployée | `Aucune version n'est déployée pour la correspondance {code} dans l'environnement {env} pour l'équipe {equipe}.` |
| `GCO000099` | 500 | Erreur lors de la production du PDF (GCO219) | `Erreur lors de l'appel à GCO219.` |

---

## Erreur de dépôt GED (sans code)

| Condition | Message |
|-----------|---------|
| `indDepotGED = true` mais aucun des 3 identifiants présents | `Présence obligatoire au moins 1 (clé repérage, identifiant document, ou individu lié) lors du dépôt dans GED.` |
| `GED:Type` absent dans les attributs et non fourni | Erreur GCO228 : `Numéro: GCO000001 Cible: Type de communication Erreur : Paramètre manquant : Type de communication.` |
| `GED:LigneAffaire` absent dans les attributs et non fourni | Erreur GCO228 : `Numéro: GCO000001 Cible: LigneAffaire Erreur : Paramètre manquant : Ligne d'affaire.` |

---

## Validation du code NT (x-code-nt)

Si l'en-tête `x-code-nt` est fourni mais dans un format invalide :

```
Le code nt passé en entête (x-code-nt) est invalide. Le format est DOMAINE\UTILISATEUR.
```

Format attendu : `DOMAINE\NOMUTILISATEUR` (avec un anti-slash).

---

## Erreurs d'authentification

| Situation | Code HTTP | Cause |
|-----------|-----------|-------|
| En-tête `Authorization` absent | 401 | Pas de clé fournie |
| Format incorrect (ex. `Bearer {token}` au lieu de `Api-Key {clé}`) | 401 | Format non reconnu |
| Clé invalide ou expirée | 401 | Clé révoquée ou hors date |
| `x-client-id` absent ou ne correspond pas à la clé | 401 | Client Id invalide |
| Clé valide mais type d'environnement non autorisé | 403 | Clé de développement utilisée en production |

---

## Erreurs de validation de champs

Ces erreurs sont retournées avec HTTP `400` et un corps `errors` contenant le ou les champs concernés.

| Champ | Contrainte | Message |
|-------|------------|---------|
| `codeTypeCorrespondance` | Obligatoire | `codeTypeCorrespondance est obligatoire.` |
| `codeTypeCorrespondance` | max 20 car. | `codeTypeCorrespondance doit avoir maximum 20 caractères.` |
| `dateEffectiviteCorrespondance` | Obligatoire | `dateEffectiviteCorrespondance est obligatoire.` |
| `dateEmissionCorrespondance` | Obligatoire | `dateEmissionCorrespondance est obligatoire.` |
| `modeImpression` | Obligatoire | `modeImpression est obligatoire.` |
| `modeImpression` | max 30 car. | `modeImpression doit avoir maximum 30 caractères.` |
| `codeLangue` | Obligatoire | `codeLangue est obligatoire.` |
| `codeEnvironnement` | Obligatoire | `codeEnvironnement est obligatoire.` |
| `codeEnvironnement` | max 10 car. | `codeEnvironnement doit avoir maximum 10 caractères.` |
| `uniteTraitementAppelante` | Obligatoire | `uniteTraitementAppelante est obligatoire.` |
| `codeSystemeEmetteur` | Obligatoire | `codeSystemeEmetteur est obligatoire.` |
| `donneesCorrespondance` | Obligatoire / JSON valide | `donneesCorrespondance est obligatoire.` |
| `numeroIndividu` | 0–9 999 999 999 999 | `numeroIndividu doit avoir maximum 13 chiffres.` |

---

## Conseils de dépannage

### La production échoue avec 404 "version non déployée"

1. Vérifiez que le code de correspondance est correct dans GCO.
2. Vérifiez que l'environnement demandé existe dans GCO pour votre équipe.
3. Vérifiez qu'une version a bien été **déployée** (pas seulement créée) dans cet environnement.
4. Vérifiez que votre clé d'API est associée au bon type d'environnement.

### La production réussit mais le PDF est incorrect

- Vérifiez que les clés dans `donneesCorrespondance` correspondent exactement aux champs-signets du gabarit Word.
- Utilisez le mode `PREVIEW` pour valider le résultat avant de passer en production.

### L'appel retourne 403 Forbidden

- Votre clé d'API n'est pas associée à l'environnement demandé.
- Si vous utilisez l'authentification Windows, vous n'avez pas le rôle `SISAppelExterne` ou `CompteApplicatifGCO`.

### Le dépôt GED échoue avec "Type de communication manquant"

- L'attribut `GED:Type` n'est pas configuré sur la version déployée.
- Demandez à un Contributeur de votre équipe GCO de configurer cet attribut sur la version.
