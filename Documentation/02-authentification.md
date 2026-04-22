# 02 — Authentification

[[_TOC_]]

## Mécanismes supportés

GCO supporte deux mécanismes d'authentification pour l'endpoint `POST /systeme/correspondances/generer` :

| Mécanisme | Usage | Profil requis |
|-----------|-------|--------------|
| **Clé d'API** | Intégration système-à-système (recommandé) | `SISAppelExterne` |
| **Windows / NTLM** | Appels depuis un compte applicatif Windows (ex. GCO05) | `CompteApplicatifGCO` |

Pour la grande majorité des intégrations, vous utiliserez l'**authentification par clé d'API**.

---

## Authentification par clé d'API

### Comment ça fonctionne

Chaque clé d'API est associée à :

- Une **équipe** (ex. `ASF`) ;
- Un **type d'environnement** (ex. développement, production).

Lors d'un appel, GCO identifie automatiquement l'équipe et les environnements autorisés à partir de la clé. Vous n'avez pas besoin de passer le code d'équipe dans la requête.

### En-têtes HTTP requis

```http
Authorization: Api-Key {votre-cle-api}
x-client-id: {votre-client-id}
```

| En-tête | Obligatoire | Description |
|---------|-------------|-------------|
| `Authorization` | Oui | Format exact : `Api-Key ` suivi de la clé. |
| `x-client-id` | Oui | Identifiant unique de votre système, fourni avec la clé. |
| `x-code-nt` | Non | Code NT Windows au format `DOMAINE\UTILISATEUR`. Permet d'associer l'appel à un utilisateur spécifique (utilisé pour l'impression `IMMEDIAT`). |
| `x-code-equipe` | Non | Rarement utilisé. Permet de surcharger l'équipe résolue par la clé (NTLM seulement). |

### Exemple complet

```http
POST /systeme/correspondances/generer HTTP/1.1
Host: master-webapi.intra-gco.sa.mes.reseau.intra
Authorization: Api-Key 3f9a2b1c-d4e5-4f6a-b7c8-9d0e1f2a3b4c
x-client-id: ASF-SAT-001
Content-Type: application/json
Accept: application/json

{ ... corps de la requête ... }
```

---

## Obtenir une clé d'API

Les clés d'API sont générées depuis l'interface GCO par un utilisateur ayant le profil **Contributeur** ou supérieur pour l'équipe concernée.

### Étapes

1. Connectez-vous à l'interface GCO.
2. Naviguez vers votre équipe → section **Clés d'API**.
3. Cliquez sur **Générer une nouvelle clé**.
4. Sélectionnez le **type d'environnement** (développement ou production).
5. Copiez et conservez la clé générée — elle ne sera plus affichable intégralement après cette étape.
6. Notez le **Client Id** associé.

> La génération d'une clé pour un environnement de **production** requiert le profil **ContributeurProd** ou supérieur.

### Durée de vie des clés

Les clés ont une date de début (`DateDebut`) et une date de fin (`DateFin`). Une clé expirée retourne une réponse `401 Unauthorized`. Prévoyez un processus de rotation des clés avant leur expiration.

---

## Erreurs d'authentification courantes

| Code HTTP | Cause probable | Solution |
|-----------|---------------|----------|
| `401 Unauthorized` | En-tête `Authorization` absent ou malformé | Vérifier le format `Api-Key {clé}` |
| `401 Unauthorized` | `x-client-id` absent ou invalide | Fournir le Client Id associé à la clé |
| `401 Unauthorized` | Clé expirée | Générer une nouvelle clé dans l'interface GCO |
| `403 Forbidden` | Clé valide mais sans accès à l'équipe ou l'environnement demandé | Vérifier que la clé est associée au bon type d'environnement |

---

## Prochaines étapes

→ [03 — Générer une correspondance](03-generer-correspondance.md) : utiliser la clé pour appeler GCO212.
