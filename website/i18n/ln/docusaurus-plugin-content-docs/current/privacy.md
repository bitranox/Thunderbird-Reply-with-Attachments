---
id: privacy
title: 'Intimité'
sidebar_label: 'Intimité'
---

## Intimité

:::note Pas de télémétrie; pas de réseau en arrière-plan
Cet ajout **ne** collecte **pas** d'analytique/télémétrie et **ne** fait **aucune** requête réseau en arrière-plan. Tout accès au réseau se produit uniquement lorsque vous cliquez sur un lien externe (Docs, GitHub, Faire un don).
:::

Reply with Attachments ne collecte pas d'analytique ou de télémétrie et n'envoie vos données nulle part.

Ce que fait l'ajout :

- Lit les métadonnées des pièces jointes et les fichiers du message original localement (API Thunderbird) pour les joindre à votre réponse.
- Stocke vos options (liste noire, confirmation, réponse par défaut) dans le stockage local de Thunderbird.

Ce que l'ajout ne fait pas :

- Pas de suivi, d'analytique, de rapports de plantage ou de journalisation à distance.
- Pas de requêtes réseau en arrière-plan, sauf lorsque vous ouvrez explicitement des liens externes (Docs, GitHub, Faire un don).

Les autorisations sont documentées sur la page [Permissions](permissions).

---

## Politique de sécurité des contenus (CSP) {#content-security-policy-csp}

Les options et les pages contextuelles évitent les scripts en ligne. Tout le JavaScript est chargé à partir de fichiers livrés avec l'ajout pour se conformer à la CSP stricte dans Thunderbird. Si vous intégrez des extraits de code dans des docs, ce ne sont que des exemples et ne sont pas exécutés par l'ajout.

---

## Stockage de données {#data-storage}

- Les préférences utilisateur (liste noire, bascule de confirmation, réponse par défaut) sont stockées dans le `storage.local` de Thunderbird pour cet ajout.
- Aucun synchronisation dans le cloud n'est effectuée par l'ajout.

---

## Réseau {#network}

- L'ajout n'effectue aucune activité réseau en arrière-plan.
- Tout accès au réseau se produit uniquement lorsque vous cliquez sur des liens (Docs, GitHub, Faire un don) ou lorsque Thunderbird lui-même effectue des opérations normales non liées à cet ajout.

---

## Suppression des données {#data-removal}

- La désinstallation de l'ajout supprime son code.
- Les paramètres sont conservés uniquement dans le `storage.local` de Thunderbird et sont supprimés lors de la désinstallation ; aucun stockage externe n'est utilisé.
- Réinitialiser les paramètres sans désinstaller :
  - Page des options : utilisez "Réinitialiser par défaut" pour la liste noire et l'avertissement de la liste noire.
  - Avancé : dans Thunderbird → Outils → Outils de développement → Déboguer les ajouts, ouvrez le stockage de l'extension et effacez les clés si nécessaire.

---
