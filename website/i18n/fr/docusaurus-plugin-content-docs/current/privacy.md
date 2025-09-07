---
id: privacy
title: Confidentialité
sidebar_label: Confidentialité
---

Répondre avec pièces jointes ne collecte aucune analyse ni télémétrie et n’envoie pas vos données ailleurs.

Ce que fait le module :

- Lit localement (API Thunderbird) les métadonnées et fichiers des pièces jointes du message original pour les ajouter à votre réponse.
- Stocke vos options (liste noire, confirmation, réponse par défaut) dans le stockage local de Thunderbird.

Ce que le module ne fait pas :

- Aucun suivi, analyse, rapport de plantage, ni journalisation distante.
- Aucune requête réseau en arrière‑plan, sauf lorsque vous ouvrez explicitement des liens externes (Docs, GitHub, Don).

Les autorisations sont décrites sur la page [Autorisations](permissions).

## Politique de sécurité de contenu (CSP)

Les pages d’options et de fenêtre contextuelle évitent les scripts inline. Tout le JavaScript est chargé depuis des fichiers fournis avec le module afin de respecter la CSP stricte de Thunderbird. Les extraits de code dans la documentation sont des exemples uniquement et ne sont pas exécutés par le module.
