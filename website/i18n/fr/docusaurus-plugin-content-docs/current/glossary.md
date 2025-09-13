---
id: glossary
title: 'Glossaire'
sidebar_label: 'Glossaire'
---

## Glossaire

Termes canoniques utilisés dans l'interface utilisateur et la documentation de l'extension. Utilisez-les pour garder les traductions cohérentes entre les locales.

---

### Notes

- Gardez les chaînes de l'interface utilisateur courtes et orientées vers l'action.
- Préférez les noms pour les paramètres et les verbes pour les actions.
- Utilisez la casse de phrase (seulement le premier mot en majuscule) sauf pour les titres.

---

### Termes

- **Pièces jointes** : fichiers inclus avec un e-mail. Évitez “enclosures”.
- **Liste noire** (Exclude list) : liste de motifs qui empêchent l'attachement automatique des fichiers. Dans l'interface utilisateur, cela apparaît comme “Liste noire (motifs glob)”.
- Dans le texte de l'UI, privilégiez “Liste noire (motifs glob)” pour correspondre à la page des paramètres.
- Expliquez que seuls les noms de fichier sont correspondus ; pas les chemins.
- **Confirmer / Confirmation :** demander à l'utilisateur de procéder avant d'ajouter des pièces jointes.
- **Réponses :** “Oui” (ajouter), “Non” (annuler). Gardez les étiquettes de bouton courtes.
- **Image en ligne :** une image référencée par CID dans le HTML du message ; jamais ajoutée en tant que fichier.
- **Signature S/MIME :** `smime.p7s` ou parties de signature PKCS7 ; jamais ajoutées.
- **Options / Paramètres :** la page de configuration de l'extension dans Thunderbird.
- **Réponse par défaut :** la réponse préselectionnée pour la boîte de dialogue de confirmation.

---

### Actions par e-mail

- **Répondre :** répondre à l'expéditeur d'un message.
- **Répondre à tous :** répondre à l'expéditeur et à tous les destinataires.
- **Transférer :** envoyer le message à un autre destinataire ; cette extension ne modifie pas le comportement de transfert.

---

### Types de pièces jointes

- **Pièces jointes en ligne :** ressources intégrées dans le corps du message (par exemple, référencées via Content-ID). Non ajoutées en tant que fichiers par l'extension.
- **Fichiers attachés :** fichiers attachés au message en tant que pièces jointes régulières (candidats à la copie lors de la réponse).

---

### Style

- **Noms de fichiers :** afficher comme du code (monospace), par ex., `smime.p7s`, `*.png`.
- **Clés/boutons :** en camel case uniquement lorsqu'ils sont des noms propres ; sinon, en casse de phrase.
- **Évitez le jargon** (par exemple, “idempotency”) ; préférez “prévenir les doublons”.

---
