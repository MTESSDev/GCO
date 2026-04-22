# 04 — Modes de production

[[_TOC_]]

Le paramètre `modeImpression` détermine comment le document PDF produit par GCO est traité après sa génération.

---

## Tableau de synthèse

| Mode | PDF retourné | Dépôt GED | Impression | Enregistrement commande |
|------|:---:|:---:|:---:|:---:|
| `PREVIEW` | Oui (Accept: pdf) | Non | Non | Oui |
| `NUMERIQUE` | Oui (Accept: pdf) | Oui (si requis) | Non | Oui |
| `IMMEDIAT` | Non | Oui (si requis) | Oui — imprimante locale | Oui |
| `LOT` | Non | Oui (si requis) | Oui — lot différé automatique | Oui |
| `LOTDIFF` | Non | Oui (si requis) | Oui — lot déclenché manuellement | Oui |

---

## PREVIEW — Aperçu

Le mode aperçu produit le PDF et le retourne directement à l'appelant **sans** déclencher d'impression ni de dépôt GED. C'est le mode idéal pour les prévisualisations depuis l'interface de votre système.

**Comportement :**
- Le PDF est généré et retourné dans le corps de la réponse HTTP.
- Aucun fichier n'est conservé sur les serveurs GCO.
- Aucune impression n'est déclenchée.
- Le dépôt GED est ignoré même si `indDepotGED = true`.
- La commande est tout de même enregistrée dans la BD.

**En-tête Accept recommandé :** `application/pdf`

**Cas d'usage :** Prévisualiser la correspondance avant de la soumettre en production.

---

## NUMERIQUE — Numérique (GED uniquement)

Le mode numérique produit le PDF et le dépose dans la GED. Aucune impression physique n'est déclenchée.

**Comportement :**
- Le PDF est généré.
- Si `indDepotGED = true` (ou configuré par défaut), le document est déposé dans la GED via GCO228.
- Aucune impression n'est déclenchée.
- La commande est enregistrée dans la BD.

**En-tête Accept recommandé :** `application/json` (pour obtenir `identifiantUniqueDocument`)

**Cas d'usage :** Correspondances uniquement électroniques, accessibles dans Mon Dossier.

---

## IMMEDIAT — Impression locale

Le mode immédiat envoie le document directement à l'imprimante configurée dans le **profil GCO de l'utilisateur** identifié par l'en-tête `x-code-nt`.

**Comportement :**
- L'imprimante du profil utilisateur est récupérée dans la BD GCO.
- Si aucune imprimante n'est définie, un courriel est envoyé à l'utilisateur et le traitement se termine en erreur `GCO212005`.
- L'impression est lancée en recto/verso.
- Cas spécial : si l'imprimante configurée est `PDF\Imprimante`, le document est enregistré dans un fichier PDF sur le répertoire configuré (`GCO:Impression:RepertoireImprimantePDF`).

**Prérequis :**
- L'en-tête `x-code-nt` doit être fourni avec un code NT Windows valide au format `DOMAINE\UTILISATEUR`.
- L'utilisateur doit avoir une imprimante réseau configurée dans son profil GCO.

**Cas d'usage :** Impression sur le poste de travail d'un agent lors d'un entretien avec un client.

---

## LOT — Impression en lot (automatique)

Le mode LOT place le document dans la file d'attente d'impression en lot. Les lots sont traités automatiquement selon le calendrier configuré dans GCO.

**Comportement :**
- Le PDF est déposé dans le répertoire de travail `{GCO_FICH_GCO223_01}\Travail`.
- Un traitement asynchrone (GCO222/GCO223) regroupe les fichiers en lots et déclenche l'envoi à l'imprimante.
- La commande est enregistrée dans la BD.

**Regroupement des lots :**
Le lot est constitué à partir de la valeur de regroupement au format `CELLULE-NOMDUTRAVAIL`, où la cellule est déterminée par les 3 premiers caractères de `uniteTraitementAppelante` (ex. `ASF421` → cellule `ASF`). Si aucune cellule n'existe, `01` est utilisé par défaut.

**Cas d'usage :** Impression de masse pour des envois postaux.

---

## LOTDIFF — Lot différé (déclenchement manuel)

Le mode LOTDIFF fonctionne comme LOT, avec la différence que l'impression est **retenue** jusqu'à un déclenchement manuel via le service GCO224.

**Comportement :**
- Le PDF est déposé dans le répertoire `{GCO_FICH_GCO223_01}\Travail`.
- Une occurrence est insérée dans `GCO2.IMPRESSION_CORRESPONDANCE_DIFFERE` avec le statut `PRODUIT`.
- L'impression n'est déclenchée que lorsqu'un opérateur GCO exécute le traitement GCO224.

**Cas d'usage :** Correspondances qui doivent être validées ou regroupées manuellement avant envoi postal.

---

## Choisir le bon mode

```
Mon système a besoin d'un aperçu du document ?
  → PREVIEW

Le document doit être uniquement électronique (GED / Mon Dossier) ?
  → NUMERIQUE

L'impression doit être immédiate sur le poste d'un agent ?
  → IMMEDIAT  (fournir x-code-nt)

L'impression doit être groupée et envoyée automatiquement par lot ?
  → LOT

L'impression doit être regroupée mais déclenchée manuellement ?
  → LOTDIFF
```
