---
id: development
title: 'Développement'
sidebar_label: 'Développement'
---

---

## Guide de développement {#development-guide}

:::note Modifier uniquement l’anglais ; les traductions se propagent
Mettez à jour la documentation **uniquement** sous `website/docs` (anglais). Les traductions sous `website/i18n/<locale>/…` sont générées et ne doivent pas être modifiées manuellement. Utilisez les tâches de traduction (p. ex., `make translate_web_docs_batch`) pour actualiser le contenu localisé.
:::

### Prérequis {#prerequisites}

- Node.js 22+ et npm (testé avec Node 22)
- Thunderbird 128 ESR ou plus récent (pour les tests manuels)

---

### Structure du projet (vue d’ensemble) {#project-layout-high-level}

- Racine : script de packaging `distribution_zip_packer.sh`, docs, captures d’écran
- `sources/` : code principal du module (arrière‑plan, UI options/popup, manifests, icônes)
- `tests/` : suite Vitest
- `website/` : docs Docusaurus (avec i18n sous `website/i18n/de/...`)

---

### Installation et outils {#install-and-tooling}

- Installer les dépendances racine : `npm ci`
- Docs (optionnel) : `cd website && npm ci`
- Découvrir les cibles : `make help`

---

### Développement en direct (web‑ext run) {#live-dev-web-ext}

- Boucle rapide dans Firefox Desktop (tests sommaires de l’UI uniquement) :
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Exécuter dans Thunderbird (préféré pour les MailExtensions) :
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Conseils :
- Gardez la console d’erreurs de Thunderbird ouverte (Outils → Outils de développement → Console d’erreurs).
- Les pages d’événements MV3 sont suspendues à l’inactivité ; rechargez le module après des modifications de code, ou laissez web‑ext recharger automatiquement.
- Certains comportements propres à Firefox diffèrent ; vérifiez toujours dans Thunderbird pour la parité des API.
- Chemins binaires de Thunderbird (exemples) :
- Linux : `thunderbird` (p. ex., `/usr/bin/thunderbird`)
- macOS : `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows : `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Isolement de profil : utilisez un profil Thunderbird distinct pour le développement afin d’éviter d’affecter votre configuration quotidienne.

---

### Cibles Make (alphabétique) {#make-targets-alphabetical}

Le Makefile standardise les flux de dev courants. Exécutez `make help` à tout moment pour un résumé en une ligne de chaque cible.

Astuce : exécuter `make` sans cible ouvre un simple menu Whiptail pour choisir une cible.

| Cible                                                    | Description en une ligne                                                                                                          |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Supprime les artefacts de build/aperçu locaux (tmp/, web-local-preview/, website/build/).                                         |
| [`commit`](#mt-commit)                                   | Formate, exécute les tests (y c. i18n), met à jour le changelog, commit et push.                                                  |
| [`eslint`](#mt-eslint)                                   | Exécute ESLint via configuration plate (`npm run -s lint:eslint`).                                                                |
| [`help`](#mt-help)                                       | Liste toutes les cibles avec une doc en une ligne (triées).                                                                       |
| [`lint`](#mt-lint)                                       | web‑ext lint sur `sources/` (manifeste temporaire ; ignore les ZIP ; non fatal).                                                  |
| [`menu`](#mt-menu)                                       | Menu interactif pour sélectionner une cible et des arguments optionnels.                                                          |
| [`pack`](#mt-pack)                                       | Construit les ZIP ATN & LOCAL (exécute le linter ; appelle le script de packaging).                                               |
| [`prettier`](#mt-prettier)                               | Formate le dépôt sur place (écrit les modifications).                                                                             |
| [`prettier_check`](#mt-prettier_check)                   | Prettier en mode vérification (sans écriture) ; échoue si un reformatage est nécessaire.                                          |
| [`prettier_write`](#mt-prettier_write)                   | Alias de `prettier`.                                                                                                              |
| [`test`](#mt-test)                                       | Prettier (écriture), ESLint, puis Vitest (couverture si configurée).                                                              |
| [`test_i18n`](#mt-test_i18n)                             | Tests i18n uniquement : espaces réservés/parité de l’extension + parité du site.                                                  |
| [`translate_app`](#mt-translation-app)                   | Alias de `translation_app`.                                                                                                       |
| [`translation_app`](#mt-translation-app)                 | Traduit les chaînes d’UI de l’application depuis `sources/_locales/en/messages.json`.                                             |
| [`translate_web_docs_batch`](#mt-translation-web)        | Traduit la documentation du site via l’API OpenAI Batch (préféré).                                                                |
| [`translate_web_docs_sync`](#mt-translation-web)         | Traduit la documentation du site de manière synchrone (héritage, sans batch).                                                     |
| [`translate_web_index`](#mt-translation_web_index)       | Alias de `translation_web_index`.                                                                                                 |
| [`translation_web_index`](#mt-translation_web_index)     | Traduit l’UI de la page d’accueil/de la barre de navigation/du pied de page (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Construit la documentation vers `website/build` (prend en charge `--locales` / `BUILD_LOCALES`).                                  |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Vérification des liens sans connexion (ignore les HTTP[S] distants).                                                              |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Aperçu gh‑pages local ; auto‑service sur 8080–8090 ; tests/vérification des liens en option.                                      |
| [`web_push_github`](#mt-web_push_github)                 | Pousse `website/build` sur la branche `gh-pages`.                                                                                 |

Syntaxe des options

- Utilisez `make <command> OPTS="…"` pour passer des options (guillemets recommandés). Chaque cible ci‑dessous montre un exemple d’utilisation.

--

-

#### Conseils de build par locale {#locale-build-tips}

- Construire un sous‑ensemble de locales : définir `BUILD_LOCALES="en de"` ou passer `OPTS="--locales en,de"` aux cibles web.
- Aperçu d’une locale spécifique : `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Compilation et empaquetage {#build-and-package}

- Construire les ZIP : `make pack`
- Produit des ZIP ATN et LOCAL à la racine du dépôt (ne pas modifier les artefacts à la main)
- Astuce : mettez à jour la version à la fois dans `sources/manifest_ATN.json` et `sources/manifest_LOCAL.json` avant l’empaquetage
- Installation manuelle (dev) : Thunderbird → Outils → Modules complémentaires et thèmes → engrenage → Installer un module depuis un fichier… → sélectionner le ZIP construit

---

### Tests {#test}

- Suite complète : `make test` (Vitest)
- Couverture (optionnel) :
- `npm i -D @vitest/coverage-v8`
- Exécutez `make test` ; ouvrez `coverage/index.html` pour le rapport HTML
- i18n uniquement : `make test_i18n` (clés/espaces réservés/titres de l’UI + parité site par locale et par doc avec vérifications id/title/sidebar_label)

---

### Débogage et journaux {#debugging-and-logs}

- Console d’erreurs : Outils → Outils de développement → Console d’erreurs
- Activer/désactiver les journaux détaillés à l’exécution :
- Activer : `messenger.storage.local.set({ debug: true })`
- Désactiver : `messenger.storage.local.set({ debug: false })`
- Les journaux apparaissent lors de la rédaction/de l’envoi des réponses

---

### Docs (site web) {#docs-website}

- Serveur de dev : `cd website && npm run start`
- Construire le site statique : `cd website && npm run build`
- Équivalents Make (alphabétique) : `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Exemples d’utilisation :
- EN uniquement, ignorer tests/vérif. des liens, pas de push : `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Toutes les locales, avec tests/vérif. des liens, puis push : `make web_build_local_preview && make web_push_github`
- Avant de publier, exécutez la vérification des liens sans connexion : `make web_build_linkcheck`.
- i18n : l’anglais vit dans `website/docs/*.md` ; les traductions allemandes dans `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Recherche : Si les variables d’environnement Algolia DocSearch sont définies dans le CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), le site utilise la recherche Algolia ; sinon, il revient à la recherche locale. Sur la page d’accueil, appuyez sur `/` ou `Ctrl+K` pour ouvrir la boîte de recherche.

---

#### Route de redirection de don {#donate-redirect}

- `website/src/pages/donate.js`
- Itinéraire : `/donate` (et `/<locale>/donate`)
- Comportement :
- Si l’itinéraire actuel a une locale (p. ex., `/de/donate`), l’utiliser
- Sinon, choisir la meilleure correspondance entre `navigator.languages` et les locales configurées ; repli sur la locale par défaut
- Redirige vers :
- `en` → `/docs/donation`
- autres → `/<locale>/docs/donation`
- Utilise `useBaseUrl` pour une gestion correcte de baseUrl
- Inclut un meta refresh + un lien `noscript` comme repli

---

---

#### Conseils d’aperçu {#preview-tips}

- Arrêter proprement l’aperçu Node : ouvrir `http://localhost:<port>/__stop` (affiché après `Local server started`).
- Si les images ne se chargent pas en MDX/JSX, utilisez `useBaseUrl('/img/...')` pour respecter le `baseUrl` du site.
- L’aperçu démarre d’abord ; la vérification des liens s’exécute ensuite et n’est pas bloquante (les liens externes cassés n’arrêtent pas l’aperçu).
- URL d’aperçu exemple : `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (affichée après « Local server started »).
- Liens externes lors de la vérification : Certains sites externes (p. ex., addons.thunderbird.net) bloquent les robots automatisés et peuvent afficher 403 lors des vérifications. L’aperçu démarre quand même ; on peut ignorer cela sans risque.

---

#### Traduire le site web {#translate-website}

Ce que vous pouvez traduire

- Uniquement l’UI du site : page d’accueil, barre de navigation, pied de page et autres chaînes d’UI. Le contenu des docs reste pour l’instant uniquement en anglais.

Où éditer

- Éditez `website/i18n/<locale>/code.json` (utilisez `en` comme référence). Gardez inchangés les espaces réservés tels que `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}`.

Générer ou actualiser les fichiers

- Créer les squelettes manquants pour toutes les locales : `npm --prefix website run i18n:stubs`
- Écraser les squelettes depuis l’anglais (après ajout de nouvelles chaînes) : `npm --prefix website run i18n:stubs:force`
- Alternative pour une seule locale : `npx --prefix website docusaurus write-translations --locale <locale>`

Traduire les chaînes d’UI de la page d’accueil/barre de navigation/pied de page (OpenAI)

- Définir les identifiants une fois (shell ou .env) :
- `export OPENAI_API_KEY=sk-...`
- Facultatif : `export OPENAI_MODEL=gpt-4o-mini`
- En une fois (toutes les locales, exclut en) : `make translate_web_index`
- Limiter à des locales spécifiques : `make translate_web_index OPTS="--locales de,fr"`
- Écraser les valeurs existantes : `make translate_web_index OPTS="--force"`

Validation et nouvelles tentatives

- Le script de traduction valide la forme JSON, préserve les espaces réservés entre accolades et garantit que les URL restent inchangées.
- En cas d’échec de validation, il retente avec retour jusqu’à 2 fois avant de conserver les valeurs existantes.

Prévisualiser votre locale

- Serveur de dev : `npm --prefix website run start`
- Visitez `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Soumission

- Ouvrez une PR avec le(s) fichier(s) `code.json` modifié(s). Gardez les changements ciblés et incluez une capture d’écran rapide si possible.

---

### Conseils de sécurité et de configuration {#security-and-configuration-tips}

- Ne commitez pas `sources/manifest.json` (créé temporairement par le build)
- Gardez `browser_specific_settings.gecko.id` stable pour préserver le canal de mise à jour

---

### Persistance des paramètres {#settings-persistence}

- Stockage : Tous les paramètres utilisateur résident dans `storage.local` et persistent lors des mises à jour du module.
- Installation : Les valeurs par défaut ne sont appliquées que lorsqu’une clé est strictement manquante (undefined).
- Mise à jour : Une migration ne remplit que les clés manquantes ; les valeurs existantes ne sont jamais écrasées.
- Marqueur de schéma : `settingsVersion` (actuellement `1`).
- Clés et valeurs par défaut :
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Code : voir `sources/background.js` → `initializeOrMigrateSettings()` et `SCHEMA_VERSION`.

Flux de développement (ajouter un nouveau paramètre)

- Incrémentez `SCHEMA_VERSION` dans `sources/background.js`.
- Ajoutez la nouvelle clé + valeur par défaut à l’objet `DEFAULTS` dans `initializeOrMigrateSettings()`.
- Utilisez la règle « only‑if‑undefined » lors du semis des valeurs par défaut ; n’écrasez pas les valeurs existantes.
- Si le paramètre est visible par l’utilisateur, câblez‑le dans `sources/options.js` et ajoutez des chaînes localisées.
- Ajoutez/ajustez les tests (voir `tests/background.settings.migration.test.js`).

Conseils de test manuel

- Simuler une installation neuve : effacez le répertoire de données de l’extension ou démarrez avec un nouveau profil.
- Simuler une mise à jour : définissez `settingsVersion` à `0` dans `storage.local` puis rechargez ; confirmez que les valeurs existantes restent inchangées et que seules les clés manquantes sont ajoutées.

---

### Dépannage {#troubleshooting}

- Assurez‑vous que Thunderbird est en version 128 ESR ou plus récente
- Utilisez la console d’erreurs pour les problèmes d’exécution
- Si les paramètres stockés semblent ne pas s’appliquer correctement, redémarrez Thunderbird et réessayez. (Thunderbird peut mettre en cache l’état entre les sessions ; un redémarrage garantit que des paramètres frais sont chargés.)

---

### CI et couverture {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) exécute vitest avec des seuils de couverture (85 % lignes/fonctions/branches/instructions). Si les seuils ne sont pas atteints, la tâche échoue.
- Le workflow téléverse un artefact `coverage-html` avec le rapport HTML ; téléchargez‑le depuis la page d’exécution (Actions → dernière exécution → Artifacts).

---

### Contribution {#contributing}

- Voir CONTRIBUTING.md pour les directives de branches/commits/PR
- Astuce : Créez un profil de développement Thunderbird séparé pour les tests afin d’éviter d’impacter votre profil quotidien.

---

### Traductions

- Exécuter de gros travaux de traduction « tout → tout » peut être lent et coûteux. Commencez par un sous‑ensemble (p. ex., quelques documents et 1–2 locales), examinez le résultat, puis étendez.

---

- Politique de nouvelle tentative : les travaux de traduction effectuent jusqu’à 3 nouvelles tentatives avec backoff exponentiel en cas d’erreurs d’API ; voir `scripts/translate_web_docs_batch.js` et `scripts/translate_web_docs_sync.js`.

Captures d’écran pour la documentation

- Stockez les images sous `website/static/img/`.
- Référencez‑les en MD/MDX via `useBaseUrl('/img/<filename>')` pour que les chemins fonctionnent avec le `baseUrl` du site.
- Après avoir ajouté ou renommé des images sous `website/static/img/`, confirmez que toutes les références utilisent toujours `useBaseUrl('/img/…')` et s’affichent dans un aperçu local.
  Favicons

- Le `favicon.ico` multi‑taille est généré automatiquement dans tous les chemins de build (Make + scripts) via `website/scripts/build-favicon.mjs`.
- Aucune étape manuelle n’est requise ; mettre à jour `icon-*.png` suffit.
  Astuce de relecture

- Gardez `id` du front‑matter inchangé dans les documents traduits ; ne traduisez que `title` et `sidebar_label` lorsqu’ils sont présents.

#### clean {#mt-clean}

- Objectif : supprimer les artefacts de build/aperçu locaux.
- Utilisation : `make clean`
- Supprime (si présents) :
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Objectif : formater, tester, mettre à jour le changelog, commit et push.
- Utilisation : `make commit`
- Détails : exécute Prettier (écriture), `make test`, `make test_i18n` ; ajoute au changelog lorsqu’il y a des diffs indexés ; pousse vers `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Objectif : exécuter ESLint via une configuration plate.
- Utilisation : `make eslint`

---

#### help {#mt-help}

- Objectif : lister toutes les cibles avec une doc en une ligne.
- Utilisation : `make help`

---

#### lint {#mt-lint}

- Objectif : analyser la MailExtension avec `web-ext`.
- Utilisation : `make lint`
- Remarques : copies temporaires `sources/manifest_LOCAL.json` → `sources/manifest.json` ; ignore les ZIP construits ; les avertissements ne font pas échouer le pipeline.

---

#### menu {#mt-menu}

- Objectif : menu interactif pour sélectionner une cible Make et des arguments optionnels.
- Utilisation : exécuter `make` sans argument.
- Remarques : si `whiptail` n’est pas disponible, le menu revient à `make help`.

---

#### pack {#mt-pack}

- Objectif : construire les ZIP ATN et LOCAL (dépend de `lint`).
- Utilisation : `make pack`
- Astuce : incrémentez les versions dans les deux `sources/manifest_*.json` avant l’empaquetage.

---

#### prettier {#mt-prettier}

- Objectif : formater le dépôt sur place.
- Utilisation : `make prettier`

#### prettier_check {#mt-prettier_check}

- Objectif : vérifier le formatage (sans écriture).
- Utilisation : `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Objectif : alias de `prettier`.
- Utilisation : `make prettier_write`

---

#### test {#mt-test}

- Objectif : exécuter Prettier (écriture), ESLint, puis Vitest (couverture si installé).
- Utilisation : `make test`

#### test_i18n {#mt-test_i18n}

- Objectif : tests axés i18n pour les chaînes de l’extension et la documentation du site.
- Utilisation : `make test_i18n`
- Exécute : `npm run test:i18n` et `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Objectif : traduire les chaînes d’UI de l’extension de EN vers d’autres locales.
- Utilisation : `make translation_app OPTS="--locales all|de,fr"`
- Remarques : préserve la structure des clés et les espaces réservés ; journalise dans `translation_app.log`. Version script : `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Objectif : traduire la documentation du site de `website/docs/*.md` vers `website/i18n/<locale>/...`.
- Préféré : `translate_web_docs_batch` (OpenAI Batch API)
  - Utilisation (drapeaux) : `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - L’ancienne forme positionnelle est toujours acceptée : `OPTS="<doc|all> <lang|all>"`
- Comportement : construit le JSONL, téléverse, scrute toutes les 30 s, télécharge les résultats, écrit les fichiers.
- Remarque : un job batch peut prendre jusqu’à 24 heures (fenêtre batch d’OpenAI). La console affiche le temps écoulé à chaque sondage.
- Env : `OPENAI_API_KEY` (requis), optionnels `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (par défaut 24 h), `BATCH_POLL_INTERVAL_MS`.
- Héritage : `translate_web_docs_sync`
  - Utilisation (drapeaux) : `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - L’ancienne forme positionnelle est toujours acceptée : `OPTS="<doc|all> <lang|all>"`
- Comportement : requêtes synchrones par paire (pas d’agrégation batch).
- Remarques : invites interactives lorsque `OPTS` est omis. Les deux modes préservent les blocs/inline de code et gardent `id` du front‑matter inchangé ; journalisent dans `translation_web_batch.log` (batch) ou `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Objectif : traduire les chaînes d’UI du site (page d’accueil, barre de navigation, pied de page) de `website/i18n/en/code.json` vers toutes les locales sous `website/i18n/<locale>/code.json` (en excluant `en`).
- Utilisation : `make translate_web_index` ou `make translate_web_index OPTS="--locales de,fr [--force]"`
- Exigences : exporter `OPENAI_API_KEY` (optionnel : `OPENAI_MODEL=gpt-4o-mini`).
- Comportement : valide la structure JSON, préserve les espaces réservés entre accolades, conserve les URL inchangées et réessaie avec feedback en cas d’erreurs de validation.

---

#### web_build {#mt-web_build}

- Objectif : construire le site de docs vers `website/build`.
- Utilisation : `make web_build OPTS="--locales en|de,en|all"` (ou définir `BUILD_LOCALES="en de"`)
- Internes : `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Dépendances : exécute `npm ci` dans `website/` uniquement si `website/node_modules/@docusaurus` est absent.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Objectif : vérification des liens sans connexion.
- Utilisation : `make web_build_linkcheck OPTS="--locales en|all"`
- Remarques : construit vers `tmp_linkcheck_web_pages` ; réécrit `baseUrl` de GH Pages en `/` ; ignore les liens HTTP(S) distants.

#### web_build_local_preview {#mt-web_build_local_preview}

- Objectif : aperçu gh‑pages local avec tests/vérif. des liens optionnels.
- Utilisation : `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Comportement : essaie d’abord le serveur d’aperçu Node (`scripts/preview-server.mjs`, prend en charge `/__stop`), se replie sur `python3 -m http.server` ; sert sur 8080–8090 ; PID à `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Objectif : pousser `website/build` vers la branche `gh-pages`.
- Utilisation : `make web_push_github`

Astuce : définissez `NPM=…` pour remplacer le gestionnaire de paquets utilisé par le Makefile (par défaut `npm`).

---
