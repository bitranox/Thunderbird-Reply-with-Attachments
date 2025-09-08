---
id: third-party-licenses
title: Licences de tiers
sidebar_label: Licences de tiers
---

Cette page résume les licences tierces utilisées par ce dépôt. Pour la
liste faisant autorité dans l’arborescence des sources, voir `THIRD_PARTY_LICENSES.md` à la
racine du dépôt.

Outils et bibliothèques (développement/test/docs)

- vitest — MIT
- jsdom — MIT
- @docusaurus/core — MIT
- @docusaurus/preset-classic — MIT
- react — MIT
- react-dom — MIT
- clsx — MIT
- web‑ext (utilisé via npx uniquement) — MPL‑2.0 (outil de développement ; non distribué avec le module complémentaire)

Notes

- Les API MailExtension de Thunderbird sont des API de la plateforme ; aucun code tiers n’en est intégré.
- Les icônes du projet dans `sources/icons` sont des ressources du projet (MIT sauf indication contraire). Le logo/l’icône GitHub est une marque de GitHub et n’est pas couvert par la licence MIT ; il est utilisé conformément aux directives de marque de GitHub.

Si vous ajoutez de nouvelles dépendances ou empaquetez du code tiers, veuillez mettre à jour à la fois cette
page et `THIRD_PARTY_LICENSES.md` en conséquence.
