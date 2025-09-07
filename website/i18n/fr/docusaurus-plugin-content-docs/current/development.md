---
id: development
title: Développement
sidebar_label: Développement
---

## Guide de développement

### Prérequis

- Node.js 18+ et npm
- Thunderbird 128 ESR ou plus récent (pour les tests manuels)

### Organisation du projet (vue d’ensemble)

- Racine : script de packaging `distribution_zip_packer.sh`, docs, captures
- `sources/` : code principal du module (arrière‑plan, UI options/pop‑up, manifestes, icônes)
- `tests/` : suite Vitest
- `website/` : docs Docusaurus (i18n sous `website/i18n/de/...`)

### Installation & outils

- Installer les dépendances racine : `npm ci`
- Docs (optionnel) : `cd website && npm ci`
- Explorer les cibles : `make help`

### Build & packaging

- Construire les ZIP : `make pack`
  - Produit des ZIP ATN et LOCAL à la racine du dépôt (ne pas modifier à la main)
  - Astuce : mettez à jour la version dans `sources/manifest_ATN.json` et `sources/manifest_LOCAL.json` avant le packaging
- Installation manuelle (dev) : Thunderbird → Outils → Modules et thèmes → engrenage → Installer un module depuis un fichier… → sélectionnez le ZIP

### Tests

- Suite complète : `make test` (Vitest)
- Couverture (optionnel) :
  - `npm i -D @vitest/coverage-v8`
  - Exécutez `make test` ; ouvrez `coverage/index.html` pour le rapport HTML
- i18n uniquement : `make test-i18n` (parité, placeholders, titres)

### Débogage & journaux

- Console d’erreurs : Outils → Outils de développement → Console d’erreurs
- Basculer les journaux verbeux à l’exécution :
  - Activer : `messenger.storage.local.set({ debug: true })`
  - Désactiver : `messenger.storage.local.set({ debug: false })`
- Les journaux apparaissent lors de la rédaction/l’envoi de réponses

### Docs (site)

- Serveur de dev : `cd website && npm run start`
- Build du site statique : `cd website && npm run build`
- i18n : anglais dans `website/docs/*.md` ; allemand dans `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Recherche : si DocSearch Algolia est configuré en CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), le site utilise Algolia ; sinon, recherche locale. Sur la page d’accueil, `/` ou `Ctrl+K` ouvre la recherche.

### Sécurité & configuration

- Ne pas committer `sources/manifest.json` (créé temporairement par la build)
- Garder `browser_specific_settings.gecko.id` stable pour préserver le canal de mise à jour

### Dépannage

- Vérifiez que Thunderbird est en 128 ESR ou plus récent
- Utilisez la Console d’erreurs pour les problèmes d’exécution

### CI & couverture

- GitHub Actions (`CI — Tests`) exécute vitest avec des seuils de couverture (85 % lignes/fonctions/branches/instructions). En‑dessous, le job échoue.
- Le workflow charge l’artéfact `coverage-html` (rapport HTML) ; téléchargez‑le depuis la page de l’exécution (Actions → dernière exécution → Artifacts).

### Contribuer

- Voir CONTRIBUTING.md pour les règles de branches/commits/PR
