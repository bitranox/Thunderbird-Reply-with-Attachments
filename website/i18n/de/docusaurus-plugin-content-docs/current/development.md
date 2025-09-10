---
id: development
title: Entwicklung
sidebar_label: Entwicklung
---

---

## Entwicklungsleitfaden {#development-guide}

### Voraussetzungen {#prerequisites}

- Node.js 22+ und npm (getestet mit Node 22)
- Thunderbird 128 ESR oder neuer (für manuelles Testen)

---

### Projektstruktur (High‑Level) {#project-layout-high-level}

- Root: Packaging-Skript `distribution_zip_packer.sh`, Doku, Screenshots
- `sources/`: Haupt-Add-on-Code (Hintergrund, Options-/Popup-UI, Manifeste, Icons)
- `tests/`: Vitest-Suite
- `website/`: Docusaurus-Dokumentation (mit i18n unter `website/i18n/de/...`)

---

### Installation & Tooling {#install-and-tooling}

- Root-Abhängigkeiten installieren: `npm ci`
- Doku (optional): `cd website && npm ci`
- Ziele entdecken: `make help`

---

### Live-Entwicklung (web‑ext run) {#live-dev-web-ext}

- Schnelle Schleife in Firefox Desktop (nur UI-Smoke-Tests):
  - `npx web-ext run --source-dir sources --target=firefox-desktop`
- In Thunderbird ausführen (bevorzugt für MailExtensions):
  - `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Tipps:
  - Lassen Sie Thunderbirds Fehlerkonsole geöffnet (Extras → Entwicklerwerkzeuge → Fehlerkonsole).
  - MV3-Ereignisseiten werden bei Inaktivität angehalten; laden Sie das Add-on nach Codeänderungen neu oder lassen Sie web‑ext automatisch neu laden.
  - Einige Firefox‑only-Verhalten unterscheiden sich; prüfen Sie API-Parität immer in Thunderbird.
  - Thunderbird-Binärpfade (Beispiele):
    - Linux: `thunderbird` (z. B. `/usr/bin/thunderbird`)
    - macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
    - Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
  - Profilisolation: Verwenden Sie für die Entwicklung ein separates Thunderbird-Profil, um Ihr tägliches Setup nicht zu beeinträchtigen.

---

### Make-Ziele (alphabetisch) {#make-targets-alphabetical}

Das Makefile standardisiert gängige Dev-Workflows. Führen Sie `make help` jederzeit aus, um eine einzeilige Zusammenfassung aller Ziele zu erhalten.

Syntax für Optionen

- Verwenden Sie `make <command> OPTS="…"`, um Optionen zu übergeben (Anführungszeichen empfohlen). Jedes Ziel unten zeigt eine Beispielverwendung.

---

#### commit

- Zweck: formatieren, testen, Changelog aktualisieren, committen und pushen.
- Verwendung: `make commit`
- Details: führt Prettier (write + check), `make test`, `make test-i18n` aus; hängt Einträge an das Changelog an, wenn es gestagte Diffs gibt; pusht nach `origin/<branch>`.

---

#### eslint

- Zweck: ESLint mit Flat-Config ausführen.
- Verwendung: `make eslint`

---

#### help

- Zweck: alle Ziele mit Einzeiler-Doku auflisten.
- Verwendung: `make help`

---

#### lint

- Zweck: die MailExtension mit `web-ext` linten.
- Verwendung: `make lint`
- Hinweise: kopiert temporär `sources/manifest_LOCAL.json` → `sources/manifest.json`; ignoriert gebaute ZIPs; Warnungen lassen die Pipeline nicht fehlschlagen.

---

#### pack

- Zweck: ATN- und LOCAL-ZIPs bauen (hängt von `lint` ab).
- Verwendung: `make pack`
- Tipp: Versionen in beiden `sources/manifest_*.json` vor dem Packen anheben.

---

#### prettier

- Zweck: das Repo inplace formatieren.
- Verwendung: `make prettier`

#### prettier-check

- Zweck: Formatierung prüfen (ohne Schreibvorgang).
- Verwendung: `make prettier-check`

#### prettier-write

- Zweck: Alias für `prettier`.
- Verwendung: `make prettier-write`

---

#### test

- Zweck: Prettier (write+check), ESLint und anschließend Vitest ausführen (Coverage, falls installiert).
- Verwendung: `make test`

#### test-i18n

- Zweck: i18n‑fokussierte Tests für Add-on‑Strings und Website‑Doku.
- Verwendung: `make test-i18n`
- Führt aus: `npm run test:i18n` und `npm run -s test:website-i18n`.

---

#### translate-app / translation-app

- Zweck: Add-on‑UI‑Strings von EN in andere Sprachen übersetzen.
- Verwendung: `make translation-app OPTS="--locales all|de,fr"`
- Hinweise: erhält Schlüsselstruktur und Platzhalter; schreibt Logs nach `translation_app.log`. Skriptform: `node scripts/translate_app.js --locales …`.

#### translate-web / translation-web

- Zweck: Website‑Doku übersetzen.
- Verwendung: `make translation-web OPTS="<doc|all> <lang|all>"`
- Hinweise: interaktiv, wenn `OPTS` weggelassen wird; erhält Codeblöcke und Front‑Matter `id`; schreibt Logs nach `translation_web.log`.

---

#### web-build

- Zweck: die Doku‑Site nach `website/build` bauen.
- Verwendung: `make web-build OPTS="--locales en|de,en|all"` (oder `BUILD_LOCALES="en de"` setzen)
- Interna: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Abhängigkeiten: führt `npm ci` in `website/` nur aus, wenn `website/node_modules/@docusaurus` fehlt.

#### web-build-linkcheck

- Zweck: offline‑sicherer Link‑Check.
- Verwendung: `make web-build-linkcheck OPTS="--locales en|all"`
- Hinweise: baut nach `tmp_linkcheck_web_pages`; schreibt GH‑Pages‑`baseUrl` zu `/` um; überspringt entfernte HTTP(S)-Links.

#### web-build-local-preview

- Zweck: lokales gh‑pages‑Preview mit optionalen Tests/Link‑Check.
- Verwendung: `make web-build-local-preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Verhalten: versucht zuerst den Node‑Preview‑Server (`scripts/preview-server.mjs`, unterstützt `/__stop`), fällt zurück auf `python3 -m http.server`; läuft auf 8080–8090; PID unter `web-local-preview/.server.pid`.

#### web-push-github

- Zweck: `website/build` in den Branch `gh-pages` pushen.
- Verwendung: `make web-push-github`

Tipp: Setzen Sie `NPM=…`, um den vom Makefile verwendeten Paketmanager zu überschreiben (Standard ist `npm`).

---

#### Tipps zum Locale‑Build {#locale-build-tips}

- Nur einen Teil der Locales bauen: `BUILD_LOCALES="en de"` setzen oder `OPTS="--locales en,de"` an Web‑Ziele übergeben.
- Bestimmte Locale in der Vorschau: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Build & Paketierung {#build-and-package}

- ZIPs bauen: `make pack`
  - Erzeugt ATN‑ und LOCAL‑ZIPs im Repo‑Root (Artefakte nicht von Hand bearbeiten)
  - Tipp: Version vor dem Packen in `sources/manifest_ATN.json` und `sources/manifest_LOCAL.json` aktualisieren
- Manuelle Installation (Dev): Thunderbird → Extras → Add-ons und Themes → Zahnrad → Add-on aus Datei installieren … → das gebaute ZIP auswählen

---

### Testen {#test}

- Gesamtsuite: `make test` (Vitest)
- Coverage (optional):
  - `npm i -D @vitest/coverage-v8`
  - `make test` ausführen; `coverage/index.html` für HTML‑Report öffnen
- Nur i18n: `make test-i18n` (UI‑Keys/Platzhalter/Titel + Website‑Parität pro Locale und Dokument mit Prüfungen für id/title/sidebar_label)

---

### Debugging & Logs {#debugging-and-logs}

- Fehlerkonsole: Extras → Entwicklerwerkzeuge → Fehlerkonsole
- Ausführliche Logs zur Laufzeit umschalten:
  - Aktivieren: `messenger.storage.local.set({ debug: true })`
  - Deaktivieren: `messenger.storage.local.set({ debug: false })`
- Logs erscheinen beim Verfassen/Senden von Antworten

---

### Doku (Website) {#docs-website}

- Dev-Server: `cd website && npm run start`
- Statische Site bauen: `cd website && npm run build`
- Make-Äquivalente (alphabetisch): `make web-build`, `make web-build-linkcheck`, `make web-build-local-preview`, `make web-push-github`
  - Verwendungsbeispiele:
    - Nur EN, Tests/Link‑Check überspringen, kein Push: `make web-build-local-preview OPTS="--locales en --no-test --no-link-check --dry-run"`
    - Alle Locales, mit Tests/Link‑Check, danach Push: `make web-build-local-preview && make web-push-github`
- Vor dem Veröffentlichen den offline‑sicheren Link‑Check ausführen: `make web-build-linkcheck`.
- i18n: Englisch liegt in `website/docs/*.md`; deutsche Übersetzungen in `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Suche: Wenn Algolia-DocSearch-Umgebungsvariablen in CI gesetzt sind (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), verwendet die Site Algolia Search; andernfalls wird auf die lokale Suche zurückgefallen. Auf der Startseite `/` oder `Ctrl+K` drücken, um die Suche zu öffnen.

---

#### Vorschau-Tipps {#preview-tips}

- Node‑Vorschau sauber beenden: `http://localhost:<port>/__stop` öffnen (wird nach `Local server started` ausgegeben).
- Wenn Bilder in MDX/JSX nicht laden, `useBaseUrl('/img/...')` verwenden, um die Site‑`baseUrl` zu berücksichtigen.
- Die Vorschau startet zuerst; der Link‑Check läuft danach und ist nicht blockierend (defekte externe Links stoppen die Vorschau nicht).
- Beispiel‑Preview‑URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (wird nach "Local server started" ausgegeben).
- Externe Links im Link‑Check: Manche externen Sites (z. B. addons.thunderbird.net) blockieren automatisierte Crawler und zeigen im Link‑Check evtl. 403. Die Vorschau startet trotzdem; diese können ignoriert werden.

---

#### Website übersetzen {#translate-website}

Was Sie übersetzen können

- Nur die Website‑UI: Startseite, Navbar, Footer und andere UI‑Strings. Der Doku‑Inhalt bleibt vorerst nur auf Englisch.

Wo bearbeiten

- Bearbeiten Sie `website/i18n/<locale>/code.json` (verwenden Sie `en` als Referenz). Platzhalter wie `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` unverändert lassen.

Dateien erzeugen oder aktualisieren

- Fehlende Stubs für alle Locales erzeugen: `npm --prefix website run i18n:stubs`
- Stubs aus Englisch überschreiben (nachdem neue Strings hinzugefügt wurden): `npm --prefix website run i18n:stubs:force`
- Alternative für eine einzelne Locale: `npx --prefix website docusaurus write-translations --locale <locale>`

UI‑Strings für Startseite/Navbar/Footer übersetzen (OpenAI)

- Zugangsdaten einmalig setzen (Shell oder .env):
  - `export OPENAI_API_KEY=sk-...`
  - Optional: `export OPENAI_MODEL=gpt-4o-mini`
- Einmalig (alle Locales, en überspringen): `make translation-web-index`
- Auf bestimmte Locales beschränken: `make translation-web-index OPTS="--locales de,fr"`
- Bestehende Werte überschreiben: `make translation-web-index OPTS="--force"`

Validierung & Wiederholungen

- Das Übersetzungsskript validiert die JSON‑Struktur, erhält geschweifte‑Klammer‑Platzhalter und stellt sicher, dass URLs unverändert bleiben.
- Bei Validierungsfehlern wird mit Feedback bis zu 2-mal erneut versucht, bevor bestehende Werte beibehalten werden.

Eigene Locale prüfen

- Dev‑Server: `npm --prefix website run start`
- Aufrufen: `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Einreichen

- Eröffnen Sie einen PR mit den bearbeiteten `code.json`-Dateien. Halten Sie die Änderungen fokussiert und fügen Sie nach Möglichkeit einen schnellen Screenshot bei.

---

### Sicherheits- & Konfigurationstipps {#security-and-configuration-tips}

- `sources/manifest.json` nicht committen (wird vom Build temporär erstellt)
- `browser_specific_settings.gecko.id` stabil halten, um den Update‑Kanal zu erhalten

---

### Persistenz der Einstellungen {#settings-persistence}

- Speicherung: Alle Benutzereinstellungen liegen in `storage.local` und bleiben über Add‑on‑Updates hinweg erhalten.
- Installation: Standardwerte werden nur angewendet, wenn ein Schlüssel strikt fehlt (undefined).
- Update: Eine Migration füllt nur fehlende Schlüssel; bestehende Werte werden nie überschrieben.
- Schema‑Marker: `settingsVersion` (derzeit `1`).
- Schlüssel und Standardwerte:
  - `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
  - `confirmBeforeAdd: boolean` → `false`
  - `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
  - `warnOnBlacklistExcluded: boolean` → `true`
- Code: siehe `sources/background.js` → `initializeOrMigrateSettings()` und `SCHEMA_VERSION`.

Dev‑Workflow (neue Einstellung hinzufügen)

- `SCHEMA_VERSION` in `sources/background.js` erhöhen.
- Den neuen Schlüssel + Standardwert dem `DEFAULTS`-Objekt in `initializeOrMigrateSettings()` hinzufügen.
- Beim Setzen von Defaults die "only-if-undefined"-Regel verwenden; bestehende Werte nicht überschreiben.
- Wenn die Einstellung für Nutzer sichtbar ist, in `sources/options.js` verdrahten und lokalisierte Strings hinzufügen.
- Tests hinzufügen/anpassen (siehe `tests/background.settings.migration.test.js`).

Tipps für manuelles Testen

- Frische Installation simulieren: Datenverzeichnis der Erweiterung leeren oder mit einem neuen Profil starten.
- Update simulieren: `settingsVersion` in `storage.local` auf `0` setzen und neu laden; bestätigen, dass bestehende Werte unverändert bleiben und nur fehlende Schlüssel hinzugefügt werden.

---

### Fehlerbehebung {#troubleshooting}

- Sicherstellen, dass Thunderbird 128 ESR oder neuer ist
- Die Fehlerkonsole für Laufzeitprobleme verwenden
- Wenn gespeicherte Einstellungen scheinbar nicht korrekt angewendet werden, Thunderbird neu starten und erneut versuchen. (Thunderbird kann Zustand über Sitzungen hinweg cachen; ein Neustart stellt sicher, dass frische Einstellungen geladen werden.)

---

### CI & Testabdeckung {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) führt Vitest mit Abdeckungs‑Schwellenwerten aus (85% Zeilen/Funktionen/Branches/Statements). Werden die Schwellen nicht erreicht, schlägt der Job fehl.
- Der Workflow lädt ein Artefakt `coverage-html` mit dem HTML‑Report hoch; laden Sie es von der Run‑Seite herunter (Actions → letzter Lauf → Artifacts).

---

### Mitwirken {#contributing}

- Siehe CONTRIBUTING.md für Branch/Commit/PR‑Richtlinien
- Tipp: Erstellen Sie ein separates Thunderbird‑Entwicklungsprofil zum Testen, um Ihr tägliches Profil nicht zu beeinträchtigen.

---

### Übersetzungen

- Große „all → all“-Übersetzungs‑Jobs können langsam und teuer sein. Beginnen Sie mit einer Teilmenge (z. B. ein paar Dokumente und 1–2 Locales), prüfen Sie das Ergebnis und erweitern Sie dann.

---
