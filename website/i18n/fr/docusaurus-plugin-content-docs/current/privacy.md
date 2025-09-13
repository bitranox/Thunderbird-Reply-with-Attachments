---
id: privacy
title: 'Confidentialité'
sidebar_label: 'Confidentialité'
---

## Confidentialité

:::note Pas de télémétrie ; pas de réseau en arrière-plan
Cet add-on ne **collecte pas** d'analytique/télémétrie et ne fait **aucune** requête réseau en arrière-plan. Tout accès réseau se produit uniquement lorsque vous cliquez sur un lien externe (Docs, GitHub, Faire un don).
:::

Répondre avec des pièces jointes ne collecte pas d'analytique ni de télémétrie et n'envoie pas vos données nulle part.

Ce que fait l'add-on :

- Lit les métadonnées des pièces jointes et les fichiers du message original localement (API Thunderbird) pour les joindre à votre réponse.
- Stocke vos options (liste noire, confirmation, réponse par défaut) dans le stockage local de Thunderbird.

Ce que l'add-on ne fait pas :

- Pas de suivi, d'analytique, de rapport d'erreurs ou de journaux à distance.
- Pas de requêtes réseau en arrière-plan, sauf lorsque vous ouvrez explicitement des liens externes (Docs, GitHub, Faire un don).

Les autorisations sont documentées sur la page [Autorisations](permissions).

---

## Politique de sécurité des contenus (CSP) {#content-security-policy-csp}

Les options et les pages contextuelles évitent les scripts en ligne. Tout JavaScript est chargé à partir de fichiers fournis avec l'add-on pour se conformer à une CSP stricte dans Thunderbird. Si vous intégrez des extraits de code dans des documents, ce ne sont que des exemples et ne sont pas exécutés par l'add-on.

---

## Stockage des données {#data-storage}

- Les préférences utilisateur (liste noire, bascule de confirmation, réponse par défaut) sont stockées dans le `storage.local` de Thunderbird pour cet add-on.
- Aucun synchronisation cloud n'est effectuée par l'add-on.

---

## Réseau {#network}

- L'add-on n'effectue aucune activité réseau en arrière-plan.
- Tout accès réseau se produit uniquement lorsque vous cliquez sur des liens (Docs, GitHub, Faire un don) ou lorsque Thunderbird lui-même effectue des opérations normales sans rapport avec cet add-on.

---

## Suppression des données {#data-removal}

- Désinstaller l'add-on supprime son code.
- Les paramètres sont conservés uniquement dans le `storage.local` de Thunderbird et sont supprimés lors de la désinstallation ; aucun stockage externe n'est utilisé.
- Réinitialiser les paramètres sans désinstaller :
  - Page des options : utilisez "Réinitialiser aux valeurs par défaut" pour la liste noire et l'avertissement de liste noire.
  - Avancé : dans Thunderbird → Outils → Outils de développement → Déboguer les add-ons, ouvrez le stockage de l'extension et effacez les clés si nécessaire.

---
