---
id: permissions
title: 'Autorisations'
---

## Permissions

:::note Minimal permissions
Aucune autorisation hôte (web) n'est demandée par cet add-on. L'add-on ne collecte pas de télémetrie ni ne fait de requêtes réseau en arrière-plan. Voir [Confidentialité](privacy).
:::

---

L'add-on demande un ensemble d'autorisations restreint et ciblé uniquement. Voici les raisons de chaque demande :

- `compose`: observer les événements de composition, lister/ajouter des pièces jointes dans votre réponse.
- `messagesRead`: lire les métadonnées et récupérer les fichiers de pièces jointes du message original.
- `scripting`: injecter la petite boîte de dialogue de confirmation lors de l'activation.
- `windows`: ouvrir une petite fenêtre de confirmation en dernier recours en cas d'échec de message.
- `sessions`: stocker un indicateur par onglet pour éviter le traitement en double.
- `storage`: persister les options (liste noire, bascule de confirmation, réponse par défaut).
- `tabs`: messagerie ciblée vers l'onglet de composition pour les demandes de confirmation.

Notes supplémentaires :

- Aucune autorisation hôte (origines web) n'est demandée par cet add-on.
- L'autorisation `tabs` est utilisée uniquement pour cibler l'onglet de composition lors de la coordination de la boîte de dialogue de confirmation optionnelle ; elle n'est pas utilisée pour lire l'historique ou naviguer entre les pages.

Ceci est documenté dans la source et testé en CI. L'add-on ne collecte pas de télémetrie.

---

### Summary (permissions → purpose) {#permissions-summary}

| Permission     | Pourquoi c'est nécessaire                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------- |
| `compose`      | Observer les événements de composition ; lister et ajouter des pièces jointes dans votre réponse. |
| `messagesRead` | Lister les pièces jointes du message original et récupérer les données du fichier.                |
| `scripting`    | Injecter/coordonner une interface utilisateur légère pour confirmation lorsqu'elle est activée.   |
| `windows`      | Fenêtre contextuelle de secours en cas d'échec de message (rare).                                 |
| `sessions`     | Stocker un indicateur par onglet pour prévenir le traitement en double.                           |
| `storage`      | Persister les options (liste noire, bascule de confirmation, réponse par défaut).                 |
| `tabs`         | Messagerie ciblée vers l'onglet de composition pour les demandes de confirmation.                 |
| (host perms)   | Aucune — l'add-on ne demande pas d'origines web.                                                  |

---

## Not requested {#not-requested}

- `compose.save`, `compose.send` — l'add-on ne sauvegarde ni n'envoie de mail en votre nom.

Voir aussi : [Confidentialité](privacy) — aucune télémetrie, aucun réseau en arrière-plan, liens uniquement initiés par l'utilisateur.

---
