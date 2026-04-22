# Codes d'erreur et dépannage

## Format des réponses d'erreur

```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "codeErreur": "GCO212001",
  "errors": {
    "codeLangue": ["CodeLangue invalide. Valeurs possibles: F, A."]
  },
  "traceId": "00-0dba2caf308e572dfcfe9f97e75fbaaf-030798fbe439bbe2-00"
}
```

Conservez le `traceId` lors d'un signalement à l'équipe GCO.

&nbsp;

## Codes HTTP

| Code | Signification dans GCO |
|------|----------------------|
| `200 OK` | Traitement complété avec succès. |
| `400 Bad Request` | Paramètre(s) invalide(s). Voir `errors` dans la réponse. |
| `401 Unauthorized` | Clé d'API absente, malformée ou expirée. |
| `403 Forbidden` | Accès à l'équipe ou à l'environnement non autorisé. |
| `404 Not Found` | Correspondance, environnement ou version déployée introuvable. |
| `415 Unsupported Media Type` | L'en-tête `Accept` n'est ni `application/json` ni `application/pdf`. |
| `500 Internal Server Error` | Erreur technique. Consulter les logs avec le `traceId`. |

&nbsp;

## Codes fonctionnels GCO212

| Code | HTTP | Condition | Message |
|------|------|-----------|---------|
| `GCO212001` | 400 | `codeLangue` invalide | `CodeLangue invalide. Valeurs possibles: F, A.` |
| `GCO212002` | 400 | `modeImpression` invalide | `ModeImpression invalide. Valeurs possibles: PREVIEW, IMMEDIAT, LOT, LOTDIFF, NUMERIQUE.` |
| `GCO212003` | 400 | Dépôt GED sans `metadonneesDocument` | `MetadonneesDocument est obligatoire pour un dépôt dans GED.` |
| `GCO212004` | 400 | Un `individusLies` dépasse 13 chiffres | `Les IndividusLies doivent avoir maximum 13 chiffres.` |
| `GCO212005` | 500 | Mode `IMMEDIAT`, aucune imprimante au profil | `Imprimante non définie dans le profil GCO, vérifiez vos courriels.` |
| `GCO000099` | 404 | Environnement introuvable | `L'environnement {env} de l'équipe {equipe} est introuvable ou vous n'y avez pas accès.` |
| `GCO000099` | 404 | Correspondance introuvable | `La correspondance {code} de l'équipe {equipe} est introuvable.` |
| `GCO000099` | 404 | Aucune version déployée | `Aucune version n'est déployée pour la correspondance {code} dans l'environnement {env}...` |

&nbsp;

## Erreurs de validation de champs (HTTP 400)

| Champ | Contrainte | Message |
|-------|------------|---------|
| `codeTypeCorrespondance` | Obligatoire, max 20 car. | `codeTypeCorrespondance est obligatoire.` |
| `dateEffectiviteCorrespondance` | Obligatoire | `dateEffectiviteCorrespondance est obligatoire.` |
| `dateEmissionCorrespondance` | Obligatoire | `dateEmissionCorrespondance est obligatoire.` |
| `modeImpression` | Obligatoire, max 30 car. | `modeImpression est obligatoire.` |
| `codeLangue` | Obligatoire, max 1 car. | `codeLangue est obligatoire.` |
| `codeEnvironnement` | Obligatoire, max 10 car. | `codeEnvironnement est obligatoire.` |
| `uniteTraitementAppelante` | Obligatoire, max 50 car. | `uniteTraitementAppelante est obligatoire.` |
| `codeSystemeEmetteur` | Obligatoire, max 50 car. | `codeSystemeEmetteur est obligatoire.` |
| `donneesCorrespondance` | Obligatoire, JSON valide | `donneesCorrespondance est obligatoire.` |
| `numeroIndividu` | max 13 chiffres | `numeroIndividu doit avoir maximum 13 chiffres.` |
| `x-code-nt` | Format `DOMAINE\USER` | `Le code nt passé en entête (x-code-nt) est invalide.` |

&nbsp;

## Vous obtenez une erreur 404 "version non déployée"?

1. Vérifiez que le code de correspondance est correct dans GCO;
2. Vérifiez que l'environnement demandé existe dans GCO pour votre équipe;
3. Vérifiez qu'une version a bien été **déployée** (pas seulement créée) dans cet environnement;
4. Vérifiez que votre clé d'API est associée au bon type d'environnement.

&nbsp;

## Le PDF est produit mais son contenu est incorrect?

1. Vérifiez que les clés dans `donneesCorrespondance` correspondent exactement aux champs-signets du gabarit Word;
2. Utilisez le mode `PREVIEW` pour valider le résultat sans déclencher d'impression.

&nbsp;

## Le dépôt GED échoue avec "Type de communication manquant"?

1. L'attribut `GED:Type` n'est pas configuré sur la version déployée;
2. Demandez à un Contributeur de votre équipe GCO de configurer cet attribut sur la version.

&nbsp;

## Vous obtenez 403 Forbidden?

1. Votre clé d'API n'est pas associée à l'environnement demandé (ex. clé de développement utilisée en production);
2. Si vous utilisez l'authentification Windows, vérifiez que votre compte possède le rôle `SISAppelExterne` ou `CompteApplicatifGCO`.
