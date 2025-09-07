---
id: permissions
title: Autorisations
---

Le module ne demande qu’un ensemble réduit d’autorisations. Pourquoi chacune est nécessaire :

- compose : observer les événements de rédaction, lister/ajouter des pièces jointes dans votre réponse.
- messagesRead : lire les métadonnées et récupérer les fichiers joints depuis le message original.
- scripting : insérer la petite boîte de confirmation dans la rédaction lorsque l’option est activée.
- windows : ouvrir une petite fenêtre de confirmation en dernier recours si la messagerie échoue.
- sessions : stocker un indicateur par onglet pour éviter un double traitement.
- storage : conserver les options (liste noire, bascule de confirmation, réponse par défaut).
- tabs : envoyer des messages ciblés à l’onglet de rédaction pour les demandes de confirmation.

Tout est documenté dans le code source et testé en CI. Le module ne collecte aucune télémétrie.
