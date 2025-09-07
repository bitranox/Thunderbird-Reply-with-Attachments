---
id: features
title: Fonctionnalités
sidebar_label: Fonctionnalités
---

## Fonctionnalités

- Ajoute automatiquement les fichiers du courriel d’origine lors d’une réponse.
- Comportement configurable : les pièces jointes peuvent être
  - ajoutées automatiquement, ou
  - ajoutées uniquement après confirmation (petit dialogue accessible). Dans Options, vous pouvez activer la confirmation et choisir la réponse par défaut (Oui/Non).
- Liste noire de noms de fichiers (motifs glob) empêchant l’ajout automatique de certains fichiers. Exemples : `*intern*`, `*secret*`, `*passwor*`.
  La correspondance n’est pas sensible à la casse et ne vérifie que le nom de fichier ; fournissez un motif par ligne dans Options.
- Avertissement de liste noire (optionnel, activé par défaut) : lorsque des fichiers sont exclus par votre liste noire, un petit modal affiche le fichier et les motifs correspondants. Compatible avec le mode sombre et accessible au clavier (Entrée/Échap pour fermer).
- Ajoute les originaux même si vous avez déjà joint des éléments ; évite les doublons par nom de fichier.
- Ignore les certificats SMIME et les images en ligne pour éviter les pièces jointes inutiles.
