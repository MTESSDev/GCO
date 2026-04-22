# Modes de production

## Quel mode choisir?

```
Besoin d'un aperçu du document ?              → PREVIEW
Document uniquement électronique (GED) ?      → NUMERIQUE
Impression immédiate sur le poste d'un agent? → IMMEDIAT  (fournir x-code-nt)
Impression groupée envoyée automatiquement ?  → LOT
Impression groupée déclenchée manuellement ?  → LOTDIFF
```

&nbsp;

## Tableau de synthèse

| Mode | PDF retourné | Dépôt GED | Impression | Commande enregistrée |
|------|:---:|:---:|:---:|:---:|
| `PREVIEW` | Oui | Non | Non | Oui |
| `NUMERIQUE` | Oui | Oui (si requis) | Non | Oui |
| `IMMEDIAT` | Non | Oui (si requis) | Oui — imprimante locale | Oui |
| `LOT` | Non | Oui (si requis) | Oui — lot automatique | Oui |
| `LOTDIFF` | Non | Oui (si requis) | Oui — lot manuel | Oui |

&nbsp;

## PREVIEW — Aperçu

Produit le PDF et le retourne directement à l'appelant **sans** déclencher d'impression ni de dépôt GED, même si `indDepotGED = true`.

Utiliser `Accept: application/pdf` pour recevoir le binaire.

**Cas d'usage :** prévisualiser la correspondance avant de la soumettre en production.

&nbsp;

## NUMERIQUE — Document électronique

Produit le PDF et le dépose dans la GED. Aucune impression déclenchée.

Utiliser `Accept: application/json` pour obtenir l'`identifiantUniqueDocument` retourné.

**Cas d'usage :** correspondances uniquement électroniques, accessibles dans Mon Dossier.

&nbsp;

## IMMEDIAT — Impression locale

Envoie le document directement à l'imprimante configurée dans le **profil GCO de l'utilisateur** identifié par l'en-tête `x-code-nt`.

1. Fournir l'en-tête `x-code-nt: DOMAINE\NOMUTILISATEUR`;
2. L'utilisateur doit avoir une imprimante configurée dans son profil GCO.

> Si aucune imprimante n'est définie au profil, GCO envoie un courriel à l'utilisateur et retourne l'erreur `GCO212005`.

**Cas d'usage :** impression sur le poste d'un agent lors d'un entretien client.

&nbsp;

## LOT — Impression en lot automatique

Place le document dans la file d'attente d'impression en lot. Les lots sont traités automatiquement par GCO selon le calendrier configuré.

Le regroupement du lot est déterminé par les **3 premiers caractères** de `uniteTraitementAppelante`
(ex. `ASF421` → cellule `ASF`, lot nommé `ASF-NomDuTravail`). Si aucune cellule n'existe, `01` est utilisé.

**Cas d'usage :** impression de masse pour des envois postaux.

&nbsp;

## LOTDIFF — Lot différé

Fonctionne comme `LOT`, mais l'impression est **retenue** jusqu'à un déclenchement manuel via le service GCO224. Une occurrence est insérée dans `GCO2.IMPRESSION_CORRESPONDANCE_DIFFERE` avec le statut `PRODUIT`.

**Cas d'usage :** correspondances à valider ou regrouper manuellement avant envoi postal.

&nbsp;

## Prochaine étape

[Configurer le dépôt dans la GED →](depot-ged.md)
