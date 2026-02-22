---
id: install
title: 'Installation'
slug: /install
sidebar_label: 'Installation'
---

---

## Installation via « Modules complémentaires et thèmes » de Thunderbird {#installation-in-thunderbird-recommended}

:::important Version minimale de Thunderbird
Ce module complémentaire prend en charge Thunderbird **128 ESR ou plus récent**. Les versions antérieures ne sont pas prises en charge.
:::

C’est la méthode d’installation recommandée. Les modules installés depuis l’ATN (addons.thunderbird.net) reçoivent des mises à jour automatiques. Les installations LOCAL/dev ne se mettent pas à jour automatiquement.

- Version minimale de Thunderbird : 128 ESR ou plus récent.

1. Dans Thunderbird, allez à **Outils > Modules complémentaires et thèmes**.
2. Recherchez « reply with attachments ».
3. Ajoutez le module.

Ou ouvrez directement la page du module : [Modules complémentaires Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Installation manuelle depuis un XPI {#local-installation-in-thunderbird}

### Télécharger le fichier XPI {#download-the-xpi-file}

1. Allez sur la [page du module Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Téléchargez la dernière version du module au format XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Installer dans Thunderbird {#install-in-thunderbird-local}

1. Ouvrez Thunderbird.
2. Allez à **Outils > Modules complémentaires et thèmes**.
3. Dans le **Gestionnaire de modules complémentaires**, cliquez sur l’icône d’engrenage en haut à droite.
4. Choisissez **Installer un module depuis un fichier…** dans le menu.
5. Sélectionnez le fichier `reply_with_attachments-x.y.z-tb.xpi` téléchargé.
6. Confirmez l’installation lorsque vous y êtes invité.

---

## Installation pour le développement {#installation-for-development}

### Télécharger le dépôt {#download-the-repository}

1. Téléchargez la dernière version du dépôt GitHub.
2. Exécutez `make help` pour plus d’informations.

### Installer dans Thunderbird {#install-in-thunderbird-dev}

1. Ouvrez Thunderbird.
2. Allez à **Outils > Modules complémentaires et thèmes**.
3. Dans le **Gestionnaire de modules complémentaires**, cliquez sur l’icône d’engrenage en haut à droite.
4. Choisissez **Installer un module depuis un fichier…** dans le menu.
5. Sélectionnez le fichier généré `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Confirmez l’installation lorsque vous y êtes invité.

Remarque : Si Thunderbird n’accepte pas le `.zip` sur votre système, renommez‑le en `.xpi` et réessayez « Installer un module depuis un fichier… ».

### Où trouver le ZIP LOCAL {#where-local-zip}

- D’abord, empaquetez le module : exécutez `make pack` à la racine du dépôt.
- Après l’empaquetage, trouvez l’archive « LOCAL » à la racine du dépôt (p. ex. `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Avant de re‑paqueter pour les tests, incrémentez les versions dans `sources/manifest_ATN.json` et `sources/manifest_LOCAL.json`.

---

## Désactiver, désinstaller et mises à jour {#disable-uninstall-updates}

- Désactiver : Thunderbird → Outils → Modules complémentaires et thèmes → trouvez le module → basculez l’interrupteur sur désactivé.
- Désinstaller : même vue → menu à trois points → Supprimer.
- Mises à jour : les installations via l’ATN se mettent à jour automatiquement lorsque de nouvelles versions sont approuvées. Les installations LOCAL/dev ne se mettent pas à jour automatiquement ; réinstallez manuellement une nouvelle version LOCAL.
- Supprimer complètement les paramètres : voir [Confidentialité → Suppression des données](privacy#data-removal).

Voir aussi

- [Démarrage rapide](quickstart)
