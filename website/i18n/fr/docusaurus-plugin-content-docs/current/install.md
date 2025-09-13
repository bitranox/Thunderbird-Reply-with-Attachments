---
id: install
title: 'Installation'
slug: /install
sidebar_label: 'Installation'
---

## Installation via "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Version minimale de Thunderbird
Cet ajout prend en charge Thunderbird **128 ESR ou plus récent**. Les anciennes versions ne sont pas prises en charge.
:::

C'est la méthode d'installation recommandée. Les ajouts installés depuis ATN (addons.thunderbird.net) reçoivent des mises à jour automatiques. Les installations LOCAL/dev ne se mettent pas à jour automatiquement.

- Version minimale de Thunderbird : 128 ESR ou plus récent.

1. Dans Thunderbird, allez dans **Outils > Add-ons et thèmes**.
2. Recherchez "répondre avec des pièces jointes".
3. Ajoutez l'ajout.

Ou ouvrez la page de l'ajout directement : [Add-ons Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Installation manuelle depuis XPI {#local-installation-in-thunderbird}

### Télécharger le fichier XPI {#download-the-xpi-file}

1. Allez sur la [page de l'ajout Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Téléchargez la dernière version de l'ajout sous forme de fichier XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Installer dans Thunderbird {#install-in-thunderbird-local}

1. Ouvrez Thunderbird.
2. Allez dans **Outils > Add-ons et thèmes**.
3. Dans le **Gestionnaire d'ajouts**, cliquez sur l'icône de roue dentée dans le coin supérieur droit.
4. Choisissez **Installer l'ajout à partir du fichier…** dans le menu.
5. Sélectionnez le fichier téléchargé `reply_with_attachments-x.y.z-tb.xpi`.
6. Confirmez l'installation lorsque cela est demandé.

---

## Installation pour le développement {#installation-for-development}

### Télécharger le dépôt {#download-the-repository}

1. Téléchargez la dernière version du dépôt GitHub.
2. Exécutez `make help` pour plus d'informations.

### Installer dans Thunderbird {#install-in-thunderbird-dev}

1. Ouvrez Thunderbird.
2. Allez dans **Outils > Add-ons et thèmes**.
3. Dans le **Gestionnaire d'ajouts**, cliquez sur l'icône de roue dentée dans le coin supérieur droit.
4. Choisissez **Installer l'ajout à partir du fichier…** dans le menu.
5. Sélectionnez le fichier généré `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Confirmez l'installation lorsque cela est demandé.

Remarque : Si Thunderbird n'accepte pas le `.zip` sur votre système, renommez-le en `.xpi` et réessayez "Installer l'ajout à partir du fichier…".

### Où trouver le LOCAL ZIP {#where-local-zip}

- Tout d'abord, empaquetez l'ajout : exécutez `make pack` dans le répertoire racine du dépôt.
- Après l'emballage, trouvez le zip "LOCAL" dans le répertoire racine du dépôt (par ex., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Avant de reconditionner pour les tests, augmentez les versions dans `sources/manifest_ATN.json` et `sources/manifest_LOCAL.json`.

---

## Désactiver, désinstaller et mises à jour {#disable-uninstall-updates}

- Désactiver : Thunderbird → Outils → Add-ons et thèmes → trouvez l'ajout → désactiver.
- Désinstaller : même vue → menu à trois points → Supprimer.
- Mises à jour : les installations ATN se mettent à jour automatiquement lorsque de nouvelles versions sont approuvées. Les installations LOCAL/dev ne se mettent pas à jour automatiquement ; réinstallez un nouveau build LOCAL manuellement.
- Supprimez complètement les paramètres : voir [Confidentialité → Suppression des données](privacy#data-removal).

Voir aussi

- [Guide de démarrage rapide](quickstart)
