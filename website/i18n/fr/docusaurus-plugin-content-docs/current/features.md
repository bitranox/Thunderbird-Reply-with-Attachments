---
id: features
title: 'Fonctionnalités'
sidebar_label: 'Fonctionnalités'
---

---

## Fonctionnalités {#features}

- Les images intégrées sont laissées à Thunderbird : elles restent dans le corps de la
  réponse et ne sont pas copiées comme pièces jointes. Une image qui ne porte qu'un
  `Content-ID` sans être référencée est traitée comme une pièce jointe normale et copiée.

---

## Fonctionnement {#how-it-works}

- Lors d’une réponse, le module complémentaire répertorie les pièces jointes d’origine.
- Filtre les signatures S/MIME des pièces jointes ; les images intégrées sont restaurées dans le corps (sauf si désactivé).
- Peut demander une confirmation (pratique au clavier).
- Ajoute les fichiers éligibles à votre message en cours de rédaction, en évitant les doublons par nom de fichier.
- Voir « Pourquoi les pièces jointes peuvent ne pas être ajoutées » dans Utilisation pour les cas limites.

Note de confidentialité : Tout le traitement a lieu localement dans Thunderbird. Le module complémentaire n’effectue aucune requête réseau en arrière‑plan.

---
