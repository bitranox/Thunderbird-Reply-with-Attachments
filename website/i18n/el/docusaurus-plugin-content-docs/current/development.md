---
id: development
title: 'Ανάπτυξη'
sidebar_label: 'Ανάπτυξη'
---

---

## Οδηγός Ανάπτυξης {#development-guide}

:::note Επεξεργασία μόνο στα Αγγλικά· οι μεταφράσεις διαδίδονται
Ενημερώστε την τεκμηρίωση μόνο κάτω από `website/docs` (Αγγλικά). Οι μεταφράσεις κάτω από `website/i18n/<locale>/…` παράγονται και δεν πρέπει να τροποποιούνται χειροκίνητα. Χρησιμοποιήστε τις εργασίες μετάφρασης (π.χ. `make translate_web_docs_batch`) για να ανανεώσετε το μεταφρασμένο περιεχόμενο.
:::

### Προαπαιτούμενα {#prerequisites}

- Node.js 22+ και npm (δοκιμασμένο με Node 22)
- Thunderbird 128 ESR ή νεότερο (για χειροκίνητες δοκιμές)

---

### Δομή Έργου (υψηλού επιπέδου) {#project-layout-high-level}

- Ρίζα: script συσκευασίας `distribution_zip_packer.sh`, έγγραφα, στιγμιότυπα οθόνης
- `sources/`: κύριος κώδικας πρόσθετου (background, UI επιλογών/αναδυόμενου, manifests, εικονίδια)
- `tests/`: σουίτα Vitest
- `website/`: τεκμηρίωση Docusaurus (με i18n κάτω από `website/i18n/de/...`)

---

### Εγκατάσταση & Εργαλεία {#install-and-tooling}

- Εγκατάσταση εξαρτήσεων ρίζας: `npm ci`
- Έγγραφα (προαιρετικά): `cd website && npm ci`
- Εύρεση στόχων: `make help`

---

### Ζωντανή Ανάπτυξη (web‑ext run) {#live-dev-web-ext}

- Γρήγορος κύκλος στο Firefox Desktop (μόνο smoke‑tests UI):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Εκτέλεση στο Thunderbird (προτιμώμενο για MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Συμβουλές:
- Κρατήστε ανοιχτή την Κονσόλα Σφαλμάτων του Thunderbird (Εργαλεία → Εργαλεία προγραμματιστή → Κονσόλα σφαλμάτων).
- Οι σελίδες συμβάντων MV3 αναστέλλονται όταν είναι ανενεργές· επαναφορτώστε το πρόσθετο μετά από αλλαγές κώδικα ή αφήστε το web‑ext να κάνει αυτόματη επαναφόρτωση.
- Ορισμένες συμπεριφορές αποκλειστικά του Firefox διαφέρουν· να ελέγχετε πάντα στο Thunderbird για ισοτιμία API.
- Διαδρομές binary του Thunderbird (παραδείγματα):
- Linux: `thunderbird` (π.χ., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Απομόνωση προφίλ: Χρησιμοποιήστε ξεχωριστό προφίλ Thunderbird για ανάπτυξη ώστε να μην επηρεάζεται το καθημερινό σας περιβάλλον.

---

### Στόχοι Make (αλφαβητικά) {#make-targets-alphabetical}

Το Makefile τυποποιεί τις κοινές ροές ανάπτυξης. Εκτελέστε `make help` οποτεδήποτε για μια σύνοψη μίας γραμμής για κάθε στόχο.

Συμβουλή: εκτελώντας το `make` χωρίς στόχο ανοίγει ένα απλό μενού Whiptail για να επιλέξετε στόχο.

| Στόχος                                                   | Περιγραφή σε μία γραμμή                                                                                  |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Αφαίρεση τοπικών artifacts build/preview (tmp/, web-local-preview/, website/build/).                     |
| [`commit`](#mt-commit)                                   | Μορφοποίηση, εκτέλεση δοκιμών (συμπ. i18n), ενημέρωση changelog, commit & push.                          |
| [`eslint`](#mt-eslint)                                   | Εκτέλεση ESLint μέσω flat config (`npm run -s lint:eslint`).                                             |
| [`help`](#mt-help)                                       | Λίστα όλων των στόχων με σύντομη περιγραφή (ταξινομημένα).                                               |
| [`lint`](#mt-lint)                                       | web‑ext lint στο `sources/` (προσωρινό manifest· αγνοεί ZIPs· μη-κρίσιμο).                               |
| [`menu`](#mt-menu)                                       | Διαδραστικό μενού για επιλογή στόχου και προαιρετικών ορισμάτων.                                         |
| [`pack`](#mt-pack)                                       | Δημιουργία ATN & LOCAL ZIPs (τρέχει linter· καλεί script συσκευασίας).                                   |
| [`prettier`](#mt-prettier)                               | Μορφοποίηση αποθετηρίου επί τόπου (γράφει αλλαγές).                                                      |
| [`prettier_check`](#mt-prettier_check)                   | Prettier σε λειτουργία ελέγχου (χωρίς εγγραφές)· αποτυγχάνει αν απαιτείται αναμόρφωση.                   |
| [`prettier_write`](#mt-prettier_write)                   | Ψευδώνυμο για `prettier`.                                                                                |
| [`test`](#mt-test)                                       | Prettier (εγγραφή), ESLint, μετά Vitest (coverage αν έχει ρυθμιστεί).                                    |
| [`test_i18n`](#mt-test_i18n)                             | Μόνο i18n δοκιμές: placeholders/ισοτιμία πρόσθετου + ισοτιμία ιστότοπου.                                 |
| [`translate_app`](#mt-translation-app)                   | Ψευδώνυμο για `translation_app`.                                                                         |
| [`translation_app`](#mt-translation-app)                 | Μετάφραση συμβολοσειρών UI εφαρμογής από `sources/_locales/en/messages.json`.                            |
| [`translate_web_docs_batch`](#mt-translation-web)        | Μετάφραση εγγράφων ιστότοπου μέσω OpenAI Batch API (προτεινόμενο).                                       |
| [`translate_web_docs_sync`](#mt-translation-web)         | Μετάφραση εγγράφων ιστότοπου συγχρονισμένα (παλαιού τύπου, χωρίς batch).                                 |
| [`translate_web_index`](#mt-translation_web_index)       | Ψευδώνυμο για `translation_web_index`.                                                                   |
| [`translation_web_index`](#mt-translation_web_index)     | Μετάφραση UI αρχικής/γραμμής πλοήγησης/footer (`website/i18n/en/code.json → .../<lang>/code.json`).      |
| [`web_build`](#mt-web_build)                             | Δημιουργία εγγράφων σε `website/build` (υποστηρίζει `--locales` / `BUILD_LOCALES`).                      |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Έλεγχος συνδέσμων με ασφάλεια εκτός σύνδεσης (παραλείπει απομακρυσμένα HTTP[S]).                         |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Τοπική προεπισκόπηση gh‑pages· αυτόματη εξυπηρέτηση στις 8080–8090· προαιρετικά tests/έλεγχος συνδέσμων. |
| [`web_push_github`](#mt-web_push_github)                 | Προώθηση του `website/build` στο κλάδο `gh-pages`.                                                       |

Syntax for options

- Χρησιμοποιήστε `make <command> OPTS="…"` για να περάσετε επιλογές (συνιστώνται εισαγωγικά). Κάθε στόχος παρακάτω δείχνει παράδειγμα χρήσης.

--

-

#### Συμβουλές δημιουργίας τοπικών εκδόσεων {#locale-build-tips}

- Δημιουργία υποσυνόλου γλωσσών: ορίστε `BUILD_LOCALES="en de"` ή περάστε `OPTS="--locales en,de"` στους web στόχους.
- Προεπισκόπηση συγκεκριμένης γλώσσας: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Δημιουργία & Συσκευασία {#build-and-package}

- Δημιουργία ZIPs: `make pack`
- Παράγει ATN και LOCAL ZIPs στη ρίζα του repo (μην επεξεργάζεστε τα artifacts χειροκίνητα)
- Συμβουλή: ενημερώστε την έκδοση και στα `sources/manifest_ATN.json` και `sources/manifest_LOCAL.json` πριν από τη συσκευασία
- Εγκατάσταση με το χέρι (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → επιλέξτε το παραχθέν ZIP

---

### Δοκιμή {#test}

- Πλήρης σουίτα: `make test` (Vitest)
- Κάλυψη (προαιρετικά):
- `npm i -D @vitest/coverage-v8`
- Εκτελέστε `make test`; ανοίξτε `coverage/index.html` για την HTML αναφορά
- Μόνο i18n: `make test_i18n` (κλειδιά UI/placeholders/titles + ισοτιμία ιστότοπου ανά γλώσσα και έγγραφο με ελέγχους id/title/sidebar_label)

---

### Αποσφαλμάτωση & Καταγραφές {#debugging-and-logs}

- Κονσόλα Σφαλμάτων: Tools → Developer Tools → Error Console
- Εναλλαγή αναλυτικών logs κατά την εκτέλεση:
- Ενεργοποίηση: `messenger.storage.local.set({ debug: true })`
- Απενεργοποίηση: `messenger.storage.local.set({ debug: false })`
- Τα logs εμφανίζονται κατά τη σύνταξη/αποστολή απαντήσεων

---

### Έγγραφα (ιστότοπος) {#docs-website}

- Διακομιστής ανάπτυξης: `cd website && npm run start`
- Δημιουργία στατικού ιστότοπου: `cd website && npm run build`
- Ισοδύναμα Make (αλφαβητικά): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Παραδείγματα χρήσης:
- Μόνο EN, χωρίς tests/έλεγχο συνδέσμων, χωρίς push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Όλες οι γλώσσες, με tests/έλεγχο συνδέσμων, έπειτα push: `make web_build_local_preview && make web_push_github`
- Πριν από τη δημοσίευση, εκτελέστε τον έλεγχο συνδέσμων με ασφάλεια εκτός σύνδεσης: `make web_build_linkcheck`.
- i18n: Τα Αγγλικά βρίσκονται στο `website/docs/*.md`; οι γερμανικές μεταφράσεις στο `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Αναζήτηση: Αν οι μεταβλητές περιβάλλοντος του Algolia DocSearch έχουν οριστεί στο CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), ο ιστότοπος χρησιμοποιεί την αναζήτηση Algolia· διαφορετικά γίνεται fallback στην τοπική αναζήτηση. Στην αρχική σελίδα, πατήστε `/` ή `Ctrl+K` για να ανοίξετε το πλαίσιο αναζήτησης.

---

#### Ανακατεύθυνση δωρεάς {#donate-redirect}

- `website/src/pages/donate.js`
- Διαδρομή: `/donate` (και `/<locale>/donate`)
- Συμπεριφορά:
- Εάν η τρέχουσα διαδρομή έχει locale (π.χ., `/de/donate`), χρησιμοποιήστε το
- Διαφορετικά, επιλέξτε την καλύτερη αντιστοίχιση από `navigator.languages` έναντι των ρυθμισμένων locales· κάντε fallback στο προεπιλεγμένο locale
- Ανακατευθύνει σε:
- `en` → `/docs/donation`
- άλλες → `/<locale>/docs/donation`
- Χρησιμοποιεί `useBaseUrl` για σωστό χειρισμό baseUrl
- Περιλαμβάνει meta refresh + σύνδεσμο `noscript` ως εναλλακτική

---

---

#### Συμβουλές προεπισκόπησης {#preview-tips}

- Τερματίστε καθαρά την προεπισκόπηση Node: ανοίξτε `http://localhost:<port>/__stop` (εκτυπώνεται μετά το `Local server started`).
- Αν οι εικόνες δεν φορτώνουν σε MDX/JSX, χρησιμοποιήστε `useBaseUrl('/img/...')` ώστε να τηρείται το `baseUrl` του ιστότοπου.
- Η προεπισκόπηση ξεκινά πρώτη· ο έλεγχος συνδέσμων εκτελείται αργότερα και δεν μπλοκάρει (χαλασμένοι εξωτερικοί σύνδεσμοι δεν θα σταματήσουν την προεπισκόπηση).
- Παράδειγμα URL προεπισκόπησης: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (εκτυπώνεται μετά το “Local server started”).
- Εξωτερικοί σύνδεσμοι στον έλεγχο: Ορισμένοι εξωτερικοί ιστότοποι (π.χ. addons.thunderbird.net) μπλοκάρουν αυτόματους ανιχνευτές και μπορεί να εμφανίζουν 403 στους ελέγχους συνδέσμων. Η προεπισκόπηση εξακολουθεί να ξεκινά· αυτά είναι ασφαλή να αγνοηθούν.

---

#### Μετάφραση του ιστότοπου {#translate-website}

Τι μπορείτε να μεταφράσετε

- Μόνο το UI του ιστότοπου: αρχική σελίδα, γραμμή πλοήγησης, footer και άλλες συμβολοσειρές UI. Το περιεχόμενο των εγγράφων παραμένει προς το παρόν μόνο στα Αγγλικά.

Πού να επεξεργαστείτε

- Επεξεργαστείτε το `website/i18n/<locale>/code.json` (χρησιμοποιήστε το `en` ως αναφορά). Κρατήστε ανέπαφους τους placeholders όπως `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}`.

Δημιουργία ή ανανέωση αρχείων

- Δημιουργία ελλειπόντων stubs για όλες τις γλώσσες: `npm --prefix website run i18n:stubs`
- Αντικατάσταση stubs από τα Αγγλικά (μετά την προσθήκη νέων συμβολοσειρών): `npm --prefix website run i18n:stubs:force`
- Εναλλακτική για μία μόνο γλώσσα: `npx --prefix website docusaurus write-translations --locale <locale>`

Μετάφραση συμβολοσειρών UI αρχικής/γραμμής πλοήγησης/footer (OpenAI)

- Ορίστε διαπιστευτήρια μία φορά (shell ή .env):
- `export OPENAI_API_KEY=sk-...`
- Προαιρετικό: `export OPENAI_MODEL=gpt-4o-mini`
- One‑shot (όλες οι γλώσσες, παράλειψη en): `make translate_web_index`
- Περιορισμός σε συγκεκριμένες γλώσσες: `make translate_web_index OPTS="--locales de,fr"`
- Αντικατάσταση υπαρχουσών τιμών: `make translate_web_index OPTS="--force"`

Επικύρωση & επαναπροσπάθειες

- Το script μετάφρασης επικυρώνει το σχήμα JSON, διατηρεί τα placeholders με άγκιστρα και διασφαλίζει ότι τα URLs μένουν αμετάβλητα.
- Σε αποτυχία επικύρωσης, επιχειρεί ξανά με ανατροφοδότηση έως 2 φορές πριν κρατήσει τις υπάρχουσες τιμές.

Προεπισκόπηση της γλώσσας σας

- Διακομιστής ανάπτυξης: `npm --prefix website run start`
- Επισκεφθείτε το `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Υποβολή

- Ανοίξτε PR με τα επεξεργασμένα αρχεία `code.json`. Κρατήστε τις αλλαγές στοχευμένες και συμπεριλάβετε ένα γρήγορο στιγμιότυπο όπου είναι δυνατό.

---

### Συμβουλές Ασφαλείας & Ρύθμισης {#security-and-configuration-tips}

- Μην κάνετε commit το `sources/manifest.json` (δημιουργείται προσωρινά από το build)
- Διατηρήστε το `browser_specific_settings.gecko.id` σταθερό για να διαφυλάξετε το κανάλι ενημερώσεων

---

### Διατήρηση Ρυθμίσεων {#settings-persistence}

- Αποθήκευση: Όλες οι ρυθμίσεις χρήστη ζουν στο `storage.local` και διατηρούνται μεταξύ ενημερώσεων του πρόσθετου.
- Εγκατάσταση: Τα προεπιλεγμένα εφαρμόζονται μόνο όταν λείπει αυστηρά ένα κλειδί (undefined).
- Ενημέρωση: Ένα migration συμπληρώνει μόνο τα ελλείποντα κλειδιά· οι υπάρχουσες τιμές δεν αντικαθίστανται ποτέ.
- Δείκτης σχήματος: `settingsVersion` (αυτή τη στιγμή `1`).
- Κλειδιά και προεπιλογές:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Κώδικας: δείτε `sources/background.js` → `initializeOrMigrateSettings()` και `SCHEMA_VERSION`.

Ροή εργασίας ανάπτυξης (προσθήκη νέας ρύθμισης)

- Αυξήστε το `SCHEMA_VERSION` στο `sources/background.js`.
- Προσθέστε το νέο κλειδί + προεπιλογή στο αντικείμενο `DEFAULTS` στο `initializeOrMigrateSettings()`.
- Χρησιμοποιήστε τον κανόνα «only-if-undefined» κατά τη σπορά προεπιλογών· μην αντικαθιστάτε υπάρχουσες τιμές.
- Αν η ρύθμιση είναι ορατή στον χρήστη, συνδέστε τη στο `sources/options.js` και προσθέστε μεταφρασμένες συμβολοσειρές.
- Προσθέστε/προσαρμόστε δοκιμές (δείτε `tests/background.settings.migration.test.js`).

Συμβουλές χειροκίνητων δοκιμών

- Προσομοιώστε καθαρή εγκατάσταση: καθαρίστε τον κατάλογο δεδομένων της επέκτασης ή ξεκινήστε με νέο προφίλ.
- Προσομοιώστε ενημέρωση: ορίστε `settingsVersion` σε `0` στο `storage.local` και επαναφορτώστε· επιβεβαιώστε ότι οι υπάρχουσες τιμές παραμένουν αμετάβλητες και προστίθενται μόνο τα ελλείποντα κλειδιά.

---

### Αντιμετώπιση προβλημάτων {#troubleshooting}

- Βεβαιωθείτε ότι το Thunderbird είναι 128 ESR ή νεότερο
- Χρησιμοποιήστε την Κονσόλα Σφαλμάτων για θέματα χρόνου εκτέλεσης
- Αν οι αποθηκευμένες ρυθμίσεις φαίνεται να μην εφαρμόζονται σωστά, επανεκκινήστε το Thunderbird και δοκιμάστε ξανά. (Το Thunderbird μπορεί να κάνει cache την κατάσταση μεταξύ συνεδριών· μια επανεκκίνηση διασφαλίζει ότι φορτώνονται φρέσκες ρυθμίσεις.)

---

### CI & Κάλυψη {#ci-and-coverage}

- Τα GitHub Actions (`CI — Tests`) εκτελούν vitest με όρια κάλυψης (85% γραμμές/συναρτήσεις/κλάδοι/δηλώσεις). Αν δεν καλυφθούν τα όρια, η εργασία αποτυγχάνει.
- Η ροή εργασίας ανεβάζει ένα artifact `coverage-html` με την HTML αναφορά· κατεβάστε το από τη σελίδα εκτέλεσης (Actions → latest run → Artifacts).

---

### Συνεισφορά {#contributing}

- Δείτε το CONTRIBUTING.md για οδηγίες branch/commit/PR
- Συμβουλή: Δημιουργήστε ξεχωριστό προφίλ ανάπτυξης Thunderbird για δοκιμές ώστε να μην επηρεάζεται το καθημερινό σας προφίλ.

---

### Μεταφράσεις

- Η εκτέλεση μεγάλων εργασιών μετάφρασης «all → all» μπορεί να είναι αργή και δαπανηρή. Ξεκινήστε με υποσύνολο (π.χ. μερικά έγγραφα και 1–2 γλώσσες), ελέγξτε το αποτέλεσμα και μετά επεκταθείτε.

---

- Πολιτική επαναπροσπάθειας: οι εργασίες μετάφρασης κάνουν έως 3 επαναπροσπάθειες με εκθετική καθυστέρηση σε σφάλματα API· δείτε `scripts/translate_web_docs_batch.js` και `scripts/translate_web_docs_sync.js`.

Στιγμιότυπα για τα έγγραφα

- Αποθηκεύστε εικόνες κάτω από `website/static/img/`.
- Αναφερθείτε σε αυτές σε MD/MDX μέσω `useBaseUrl('/img/<filename>')` ώστε τα μονοπάτια να λειτουργούν με το `baseUrl` του ιστότοπου.
- Μετά την προσθήκη ή μετονομασία εικόνων κάτω από `website/static/img/`, επιβεβαιώστε ότι όλες οι αναφορές συνεχίζουν να χρησιμοποιούν `useBaseUrl('/img/…')` και αποδίδονται σε τοπική προεπισκόπηση.
  Favicons

- Το πολλαπλών μεγεθών `favicon.ico` δημιουργείται αυτόματα σε όλα τα μονοπάτια build (Make + scripts) μέσω `website/scripts/build-favicon.mjs`.
- Δεν απαιτείται χειροκίνητο βήμα· αρκεί η ενημέρωση του `icon-*.png`.
  Συμβουλή ελέγχου

- Διατηρήστε το front‑matter `id` αμετάβλητο στα μεταφρασμένα έγγραφα· μεταφράστε μόνο τα `title` και `sidebar_label` όταν υπάρχουν.

#### clean {#mt-clean}

- Σκοπός: αφαίρεση τοπικών artifacts build/preview.
- Χρήση: `make clean`
- Καταργεί (αν υπάρχουν):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Σκοπός: μορφοποίηση, δοκιμές, ενημέρωση changelog, commit και push.
- Χρήση: `make commit`
- Λεπτομέρειες: τρέχει Prettier (εγγραφή), `make test`, `make test_i18n`; προσθέτει στο changelog όταν υπάρχουν staged διαφορές· κάνει push στο `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Σκοπός: εκτέλεση ESLint μέσω flat config.
- Χρήση: `make eslint`

---

#### help {#mt-help}

- Σκοπός: λίστα όλων των στόχων με σύντομη περιγραφή.
- Χρήση: `make help`

---

#### lint {#mt-lint}

- Σκοπός: lint του MailExtension με χρήση `web-ext`.
- Χρήση: `make lint`
- Σημειώσεις: αντιγράφει προσωρινά `sources/manifest_LOCAL.json` → `sources/manifest.json`; αγνοεί έτοιμα ZIPs· οι προειδοποιήσεις δεν αποτυγχάνουν την pipeline.

---

#### menu {#mt-menu}

- Σκοπός: διαδραστικό μενού για επιλογή στόχου Make και προαιρετικών ορισμάτων.
- Χρήση: εκτελέστε `make` χωρίς ορίσματα.
- Σημειώσεις: αν το `whiptail` δεν είναι διαθέσιμο, το μενού υποχωρεί σε `make help`.

---

#### pack {#mt-pack}

- Σκοπός: δημιουργία ATN και LOCAL ZIPs (εξαρτάται από `lint`).
- Χρήση: `make pack`
- Συμβουλή: αυξήστε εκδόσεις και στα `sources/manifest_*.json` πριν από τη συσκευασία.

---

#### prettier {#mt-prettier}

- Σκοπός: μορφοποίηση του repo επί τόπου.
- Χρήση: `make prettier`

#### prettier_check {#mt-prettier_check}

- Σκοπός: επαλήθευση μορφοποίησης (χωρίς εγγραφές).
- Χρήση: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Σκοπός: ψευδώνυμο για `prettier`.
- Χρήση: `make prettier_write`

---

#### test {#mt-test}

- Σκοπός: εκτέλεση Prettier (εγγραφή), ESLint, μετά Vitest (coverage αν είναι εγκατεστημένο).
- Χρήση: `make test`

#### test_i18n {#mt-test_i18n}

- Σκοπός: δοκιμές εστιασμένες στο i18n για συμβολοσειρές πρόσθετου και έγγραφα ιστότοπου.
- Χρήση: `make test_i18n`
- Εκτελεί: `npm run test:i18n` και `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Σκοπός: μετάφραση συμβολοσειρών UI πρόσθετου από EN σε άλλες γλώσσες.
- Χρήση: `make translation_app OPTS="--locales all|de,fr"`
- Σημειώσεις: διατηρεί τη δομή κλειδιών και τα placeholders· καταγράφει στο `translation_app.log`. Μορφή script: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Σκοπός: μετάφραση εγγράφων ιστότοπου από `website/docs/*.md` σε `website/i18n/<locale>/...`.
- Προτεινόμενο: `translate_web_docs_batch` (OpenAI Batch API)
  - Χρήση (flags): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Γίνεται δεκτή και η παλιά positional μορφή: `OPTS="<doc|all> <lang|all>"`
- Συμπεριφορά: δημιουργεί JSONL, ανεβάζει, ελέγχει κάθε 30s, κατεβάζει αποτελέσματα, γράφει αρχεία.
- Σημείωση: μια εργασία batch μπορεί να διαρκέσει έως 24 ώρες για να ολοκληρωθεί (σύμφωνα με το παράθυρο batch του OpenAI). Η κονσόλα δείχνει τον χρόνο που πέρασε σε κάθε έλεγχο.
- Περιβάλλον: `OPENAI_API_KEY` (απαραίτητο), προαιρετικά `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (προεπιλογή 24h), `BATCH_POLL_INTERVAL_MS`.
- Παλιό: `translate_web_docs_sync`
  - Χρήση (flags): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Γίνεται δεκτή και η παλιά positional μορφή: `OPTS="<doc|all> <lang|all>"`
- Συμπεριφορά: συγχρονιστικά αιτήματα ανά ζεύγος (χωρίς συνάθροιση batch).
- Σημειώσεις: Διαδραστικές ερωτήσεις όταν παραλείπεται το `OPTS`. Και οι δύο λειτουργίες διατηρούν τα μπλοκ κώδικα/inline code και κρατούν το front‑matter `id` αμετάβλητο· καταγραφή στο `translation_web_batch.log` (batch) ή `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Σκοπός: μετάφραση συμβολοσειρών UI ιστότοπου (αρχική, γραμμή πλοήγησης, footer) από `website/i18n/en/code.json` σε όλες τις γλώσσες κάτω από `website/i18n/<locale>/code.json` (εξαιρείται το `en`).
- Χρήση: `make translate_web_index` ή `make translate_web_index OPTS="--locales de,fr [--force]"`
- Απαιτήσεις: κάντε export το `OPENAI_API_KEY` (προαιρετικά: `OPENAI_MODEL=gpt-4o-mini`).
- Συμπεριφορά: επικυρώνει τη δομή JSON, διατηρεί placeholders με άγκιστρα, κρατά τα URLs αμετάβλητα και επαναπροσπαθεί με ανατροφοδότηση σε σφάλματα επικύρωσης.

---

#### web_build {#mt-web_build}

- Σκοπός: δημιουργία του ιστότοπου τεκμηρίωσης σε `website/build`.
- Χρήση: `make web_build OPTS="--locales en|de,en|all"` (ή ορίστε `BUILD_LOCALES="en de"`)
- Εσωτερικά: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Εξαρτήσεις: τρέχει `npm ci` στο `website/` μόνο αν λείπει το `website/node_modules/@docusaurus`.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Σκοπός: έλεγχος συνδέσμων με ασφάλεια εκτός σύνδεσης.
- Χρήση: `make web_build_linkcheck OPTS="--locales en|all"`
- Σημειώσεις: δημιουργεί σε `tmp_linkcheck_web_pages`· ξαναγράφει τα GH Pages `baseUrl` σε `/`· παραλείπει απομακρυσμένους συνδέσμους HTTP(S).

#### web_build_local_preview {#mt-web_build_local_preview}

- Σκοπός: τοπική προεπισκόπηση gh‑pages με προαιρετικά tests/έλεγχο συνδέσμων.
- Χρήση: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Συμπεριφορά: δοκιμάζει πρώτα τον διακομιστή προεπισκόπησης Node (`scripts/preview-server.mjs`, υποστηρίζει `/__stop`), υποχωρεί σε `python3 -m http.server`· σερβίρει στις 8080–8090· PID στο `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Σκοπός: push του `website/build` στον κλάδο `gh-pages`.
- Χρήση: `make web_push_github`

Συμβουλή: ορίστε το `NPM=…` για να παρακάμψετε τον διαχειριστή πακέτων που χρησιμοποιεί το Makefile (προεπιλογή το `npm`).
