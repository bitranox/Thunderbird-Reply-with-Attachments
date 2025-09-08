---
id: development
title: Entwicklung
sidebar_label: Entwicklung
---

## Entwicklungsleitfaden

### Voraussetzungen

- Node.js 18+ und npm (getestet mit Node 20)
- Thunderbird 128 ESR oder neuer (für manuelles Testen)

### Projektstruktur (High-Level)

- Root: Packaging-Skript `distribution_zip_packer.sh`, Dokumentation, Screenshots
- `sources/`: Haupt-Add-on-Code (Hintergrund, Optionen/Popup-UI, Manifeste, Icons)
- `tests/`: Vitest-Suite
- `website/`: Docusaurus-Dokumentation (mit i18n unter `website/i18n/de/...`)

### Installation & Tooling

- Root-Abhängigkeiten installieren: `npm ci`
- Docs (optional): `cd website && npm ci`
- Ziele auflisten: `make help`

### Make-Ziele (detailliert)

Das Repository enthält ein schlankes Makefile zur Standardisierung üblicher Dev-Workflows. Führe `make help` aus, um die Ziele aufzulisten.

- `make help`
  - Listet alle verfügbaren Ziele mit Einzeilenbeschreibungen auf (alles, was im Makefile mit `##` annotiert ist).

- `make prettier`
  - Formatiert das gesamte Repository in-place mit Prettier (`node_modules/prettier/bin/prettier.cjs --write .`).
  - Wird von anderen Zielen verwendet, um eine konsistente Formatierung sicherzustellen.

- `make prettier-write`
  - Alias, der einfach `make prettier` ausführt.

- `make prettier-check`
  - Führt Prettier im Check-Modus aus (keine Schreibvorgänge). Schlägt fehl, wenn Dateien neu formatiert würden.

- `make eslint`
  - Führt ESLint mit der Flat-Konfiguration (`npm run -s lint:eslint`) aus.

- `make lint`
  - Führt Linting der MailExtension mit `web-ext lint` gegen `sources/` durch.
  - Implementierungsdetails:
    - Kopiert `sources/manifest_LOCAL.json` vorübergehend nach `sources/manifest.json` für den Linter.
    - Stellt sicher, dass die temporäre Datei beim Beenden entfernt wird.
    - Ignoriert erzeugte ZIP-Artefakte (`reply-with-attachments-plugin*.zip`).
    - `web-ext`-Feststellungen lassen die Pipeline nicht fehlschlagen (`|| true`), daher die Ausgabe prüfen.

- `make test`
  - End-to-End-Entwicklerprüfung: Formatieren (write), Formatieren (check), ESLint, dann Vitest.
  - Vitest läuft mit Coverage, wenn `@vitest/coverage-v8` installiert ist; andernfalls ohne Coverage.
  - Coverage-Einstellungen und -Schwellen sind in `vitest.config.mjs` konfiguriert (global: 85% Zeilen/Funktionen/Anweisungen, 70% Verzweigungen).

- `make test-i18n`
- Führt ausschließlich i18n‑fokussierte Testsuiten aus, die Add-on-UI‑Strings und Website-Dokumente über alle Sprachen hinweg abdecken:
  - `npm run test:i18n` → führt `tests/i18n.*.test.js` aus (mit Coverage, falls verfügbar) für UI‑Schlüssel, Platzhalter, Titel, URLs und Cross‑Locale‑Parität in Nachrichten.
  - `npm run -s test:website-i18n` → prüft Website‑Übersetzungen für jede Sprache unter `website/i18n/<lang>/...` mit einem Test pro EN‑Dokument und Sprache:
    - Übersetzungsdatei existiert (gleicher Dateiname oder `<id>.md` basierend auf EN‑Front‑Matter `id`).
    - Übersetzte Front‑Matter `id` existiert und entspricht der EN‑`id`.
    - Übersetzte `title` ist nicht leer.
    - Wenn EN `sidebar_label` hat, besitzt die Übersetzung ebenfalls eine nicht leere `sidebar_label`.

- `make pack`
  - Erstellt sowohl ATN- als auch LOCAL-ZIPs mit `distribution_zip_packer.sh`.
  - Setzt `make lint` voraus.
  - Gibt Artefakte im Repo-Root aus (`reply-with-attachments-plugin*.zip`). Artefakte nicht von Hand bearbeiten.
  - Tipp: Versionen in `sources/manifest_ATN.json` und `sources/manifest_LOCAL.json` vor dem Packaging erhöhen.

- `make commit`
  - Konventionsstarker Helfer, um typische Änderungen zu stagen und zu pushen:
    - Prettier (write + check), `make test`, `make test-i18n`.
    - Staged alle Änderungen; wenn es gestagte Diffs gibt, hängt einen Changelog-Eintrag an (`scripts/append-changelog-entry.sh`).
    - Commitet mit einer standardisierten Nachricht und pusht nach `origin/<current-branch>`.
  - Erfordert ein konfiguriertes Git-Remote und einen sauberen Repo-Status für beste Ergebnisse.

- `make docs-build`
  - Baut die Docusaurus‑Website in `website/build`.
  - Interna: `cd website && npm ci && node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build`.
  - Vor dem Prüfen oder Deployen der Doku ausführen.

- `make docs-link-check`
  - Baut die Doku (hängt von `docs-build` ab) und prüft interne Links mit `linkinator` (als devDependency im Repo-Root installiert).
  - Das Verhalten ist auf Offline‑Sicherheit ausgelegt:
    - Schreibt die GitHub-Pages‑`baseUrl` (`/Thunderbird-Reply-with-Attachments/`) für das lokale Scannen zu `/` um.
    - Überspringt alle entfernten HTTP(S)-Links außer `localhost`, um nicht von der echten Website abzuhängen.
  - Nützlich, um defekte interne Navigation vor der Veröffentlichung aufzuspüren.

- `make translation DOC=<file(s)|all> TO=<lang(s)|all>`
  - Übersetzt ein oder mehrere Dokumente aus `website/docs` in den `website/i18n/<lang>/...`-Baum.
  - Beispiele:
    - `make translation DOC=changelog.md TO=de`
    - `make translation DOC="changelog.md features.md" TO="de fr"`
    - `make translation DOC=all TO=all`
  - Hinweise:
    - Liest API‑Schlüssel/Modell aus `.env` im Repo‑Root (`OPENAI_API_KEY`, `OPENAI_MODEL`, optional `OPENAI_TEMPERATURE`).
    - Bewahrt Codeblöcke und Front‑Matter‑`id`; übersetzt `title`/`sidebar_label`.

- `make docs-deploy`
  - Baut und deployt die Website in einen lokalen `gh-pages`‑Worktree via `scripts/docs-local-deploy.sh`.
  - Konfigurierbar mit `OPTS`, zum Beispiel:
    - `make docs-deploy OPTS="--locales en --no-test --no-link-check"`
    - `make docs-deploy OPTS="--locales all --dry-run"`

Tipp: Du kannst den von Make verwendeten Paketmanager über `NPM=...` überschreiben (Standard: `npm`).

### Build & Paketierung

- ZIPs bauen: `make pack`
  - Erzeugt ATN- und LOCAL-ZIPs im Repo-Root (Artefakte nicht von Hand bearbeiten)
  - Tipp: Version sowohl in `sources/manifest_ATN.json` als auch in `sources/manifest_LOCAL.json` vor dem Packaging aktualisieren
- Manuelle Installation (Dev): Thunderbird → Extras → Add-ons und Themes → Zahnrad → Add-on aus Datei installieren… → das erstellte ZIP auswählen

### Test

- Gesamte Test-Suite: `make test` (Vitest)
- Coverage (optional):
  - `npm i -D @vitest/coverage-v8`
  - Führe `make test` aus; öffne `coverage/index.html` für den HTML-Bericht
- Nur i18n: `make test-i18n` (UI-Schlüssel/Platzhalter/Titel + Website Parität pro Locale und Dokument mit Prüfungen für id/title/sidebar_label)

### Debugging & Protokolle

- Fehlerkonsole: Extras → Entwicklerwerkzeuge → Fehlerkonsole
- Ausführliche Logs zur Laufzeit umschalten:
  - Aktivieren: `messenger.storage.local.set({ debug: true })`
  - Deaktivieren: `messenger.storage.local.set({ debug: false })`
- Logs erscheinen beim Verfassen/Senden von Antworten

### Doku (Website)

- Dev-Server: `cd website && npm run start`
- Statische Seite bauen: `cd website && npm run build`
- Make-Äquivalente: `make docs-build`, `make docs-link-check`, `make docs-deploy`
- Vor dem Veröffentlichen den offline‑sicheren Link‑Check ausführen: `make docs-link-check`.
- i18n: Englisch lebt in `website/docs/*.md`; deutsche Übersetzungen in `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Suche: Wenn Algolia DocSearch-Umgebungsvariablen in CI gesetzt sind (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), verwendet die Seite Algolia-Suche; andernfalls fällt sie auf die lokale Suche zurück. Auf der Startseite `/` oder `Ctrl+K` drücken, um die Suchbox zu öffnen.

### Sicherheits- & Konfigurationstipps

- `sources/manifest.json` nicht committen (wird temporär vom Build erzeugt)
- `browser_specific_settings.gecko.id` stabil halten, um den Update-Kanal zu erhalten

### Fehlerbehebung

- Sicherstellen, dass Thunderbird 128 ESR oder neuer ist
- Für Laufzeitprobleme die Fehlerkonsole verwenden

### CI & Coverage

- GitHub Actions (`CI — Tests`) führt Vitest mit Coverage-Schwellen aus (85% Zeilen/Funktionen/Verzweigungen/Anweisungen). Wenn die Schwellen nicht erreicht werden, schlägt der Job fehl.
- Der Workflow lädt ein Artefakt `coverage-html` mit dem HTML-Bericht hoch; lade es von der Run-Seite herunter (Actions → letzter Lauf → Artifacts).

### Mitwirken

- Siehe CONTRIBUTING.md für Branch-/Commit-/PR-Richtlinien
- Tipp: Lege ein separates Thunderbird-Entwicklungsprofil zum Testen an, um dein tägliches Profil nicht zu beeinträchtigen.

### Übersetzungen

- Große „all → all“-Übersetzungsaufträge können langsam und teuer sein. Starte mit einer Teilmenge (z. B. ein paar Dokus und 1–2 Sprachen), prüfe das Ergebnis und erweitere dann.
