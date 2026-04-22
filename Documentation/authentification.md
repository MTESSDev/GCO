# Authentification

## Comment GCO identifie-t-il votre système?

GCO utilise une **clé d'API** pour identifier votre système et déterminer automatiquement l'équipe et les environnements auxquels vous avez accès. Chaque clé est propre à une équipe et à un type d'environnement.

&nbsp;

## Comment obtenir une clé d'API?

1. Connectez-vous à l'interface GCO avec un compte ayant le profil **Contributeur** ou supérieur pour votre équipe;
2. Naviguez vers votre équipe → section **Clés d'API**;
3. Cliquez sur **Générer une nouvelle clé** et sélectionnez le type d'environnement (développement ou production);
4. Copiez la clé générée et le **Client Id** associé — la clé ne sera plus affichable intégralement après cette étape.

> La génération d'une clé pour un environnement de **production** requiert le profil **ContributeurProd** ou supérieur.

&nbsp;

## Comment utiliser la clé dans vos requêtes?

Ajoutez ces deux en-têtes HTTP à chaque appel :

```http
Authorization: Api-Key {votre-cle-api}
x-client-id: {votre-client-id}
```

### En-têtes disponibles

| En-tête | Obligatoire | Description |
|---------|:-----------:|-------------|
| `Authorization` | **Oui** | Format exact : `Api-Key ` suivi de la clé. |
| `x-client-id` | **Oui** | Client Id fourni avec la clé. |
| `x-code-nt` | Non | Code NT Windows `DOMAINE\UTILISATEUR`. Obligatoire pour le mode `IMMEDIAT`. |

### Exemple complet

```http
POST /systeme/correspondances/generer HTTP/1.1
Host: master-webapi.intra-gco.sa.mes.reseau.intra
Authorization: Api-Key 3f9a2b1c-d4e5-4f6a-b7c8-9d0e1f2a3b4c
x-client-id: ASF-SAT-001
Content-Type: application/json
Accept: application/json
```

&nbsp;

## Durée de vie des clés

Les clés ont une date de début et une date de fin. Une clé expirée retourne `401 Unauthorized`. Prévoyez une rotation avant l'expiration en générant une nouvelle clé via l'interface GCO.

&nbsp;

## Vous obtenez une erreur d'authentification?

| Code HTTP | Cause probable | Solution |
|-----------|---------------|----------|
| `401` | En-tête `Authorization` absent ou malformé | Vérifier le format `Api-Key {clé}` |
| `401` | `x-client-id` absent ou invalide | Fournir le Client Id associé à la clé |
| `401` | Clé expirée | Générer une nouvelle clé dans GCO |
| `403` | Clé valide mais environnement non autorisé | Vérifier que la clé est du bon type d'environnement |

[Consulter la référence complète des codes d'erreur →](codes-erreur.md)

&nbsp;

## Prochaine étape

[Appeler le service de génération de correspondance →](generer-correspondance.md)
