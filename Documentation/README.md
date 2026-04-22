# GCO — Intégration système (P700U)

## Qu'est-ce que c'est?

Un service centralisé du MESS qui permet à vos systèmes de mission de **produire des correspondances** (lettres, avis, formulaires) à partir de gabarits Word, de les imprimer en lot et de les déposer automatiquement dans la GED.

[Consulter la vue d'ensemble de l'architecture d'intégration](vue-densemble.md).

&nbsp;

## Comment intégrer GCO à votre système?

### Pré-requis

Avant d'appeler GCO, votre équipe doit avoir complété les étapes suivantes dans l'application GCO :

1. Créer l'équipe et la correspondance (avec son code, ex. `J08`);
2. Créer une version de la correspondance et téléverser le gabarit `.docx`;
3. Configurer les attributs de la version (`GED:Type`, `GED:LigneAffaire`, etc.);
4. Déployer la version dans l'environnement cible.

&nbsp;

### Obtenir une clé d'API

1. Connectez-vous à l'interface GCO et naviguez vers votre équipe → **Clés d'API**;
2. Générez une nouvelle clé en sélectionnant le type d'environnement souhaité;
3. Notez la clé générée et le **Client Id** associé — la clé ne sera plus affichable intégralement par la suite.

[Consulter le guide complet d'authentification](authentification.md).

&nbsp;

### Appeler le service de production d'une correspondance

Effectuez un appel `POST /systeme/correspondances/generer` avec les en-têtes et le corps suivants :

```http
POST /systeme/correspondances/generer
Authorization: Api-Key {votre-cle-api}
x-client-id: {votre-client-id}
Content-Type: application/json
Accept: application/json
```

[Consulter le guide complet de GCO212](generer-correspondance.md).

&nbsp;

### Choisir le mode de production (optionnel)

Le paramètre `modeImpression` détermine ce qu'il advient du PDF après sa production :

1. `PREVIEW` — PDF retourné directement, sans impression ni dépôt GED;
2. `LOT` — PDF mis en file d'attente pour impression en lot différé;
3. `LOTDIFF` — Lot retenu jusqu'au déclenchement manuel;
4. `IMMEDIAT` — Impression locale sur l'imprimante du profil de l'utilisateur;
5. `NUMERIQUE` — Dépôt dans la GED uniquement, sans impression.

[Consulter la description détaillée de chaque mode](modes-de-production.md).

&nbsp;

### Configurer le dépôt dans la GED (optionnel)

1. Passez `"indDepotGED": true` dans votre requête;
2. Fournissez l'objet `metadonneesDocument` avec au moins un identifiant (individu, clé de repérage ou id unique GED);
3. Vérifiez que les attributs `GED:Type` et `GED:LigneAffaire` sont configurés sur la version déployée dans GCO.

[Consulter le guide de dépôt GED](depot-ged.md).

&nbsp;

### Consulter les références

- [Référence complète des modèles JSON](reference-modeles.md) — schémas, énumérations, contraintes de validation;
- [Codes d'erreur et dépannage](codes-erreur.md) — erreurs HTTP, codes fonctionnels, conseils;
- [Exemples de requêtes](exemples.md) — exemples prêts à l'emploi pour tous les modes.

&nbsp;

## Vous avez une question sur l'intégration?

1. Consultez les [codes d'erreur et conseils de dépannage](codes-erreur.md);
2. Consultez la [spécification fonctionnelle détaillée de GCO212](../GCO212.md);
3. Contactez l'équipe GCO via votre canal de support habituel.

&nbsp;

## Vous avez trouvé une erreur dans cette documentation?

1. Vérifiez si la documentation fonctionnelle source dans [/Documentation](../) contient l'information à jour;
2. Proposez une correction directement dans le code source du dépôt `SPFS-GCO`.

&nbsp;

## Vous désirez connaître les environnements disponibles?

| Environnement | URL de base | Usage |
|---------------|-------------|-------|
| Satellite | `https://master-webapi.intra-gco.sa.mes.reseau.intra` | Développement |
| Acceptation | `https://release-webapi.intra-gco.ac.mes.reseau.intra` | Validation |
| Intégration Tech. | `https://release-webapi.intra-gco.it.mes.reseau.intra` | Tests d'intégration |
| Production | `https://webapi.intra-gco.mes.reseau.intra` | Production |

L'interface Swagger est disponible à `{url-de-base}/Swagger/index.html` pour chaque environnement.
