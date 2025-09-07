---
id: usage
title: Utilisation
sidebar_label: Utilisation
---

## Utilisation

- À la réponse, le module ajoute automatiquement les originaux — ou demande d’abord si l’option est activée.
- Dé‑duplication par nom de fichier ; les SMIME et images intégrées sont toujours ignorés.
- Les pièces en liste noire sont également ignorées (insensible à la casse, motifs glob).

---

## Détails de comportement

- Prévention des doublons : le module marque l’onglet de rédaction comme traité (valeur de session par onglet + garde en mémoire). Les originaux ne seront pas ajoutés deux fois.
- Respect des pièces existantes : si des pièces existent déjà, les originaux sont tout de même ajoutés une seule fois, en évitant les noms déjà présents.
- Exclusions : les artefacts SMIME (par ex. `smime.p7s`, `application/pkcs7-signature`/`x-pkcs7-signature`/`pkcs7-mime`) et les images en ligne sont ignorés. Si rien n’est éligible au premier passage, un mode plus souple revérifie les parties non‑SMIME.
- Avertissement de liste noire (si activé) : lorsque des candidats sont exclus par votre liste, un petit modale liste les fichiers concernés et les motifs correspondants ; il apparaît aussi si rien ne sera joint car tout a été exclu.
