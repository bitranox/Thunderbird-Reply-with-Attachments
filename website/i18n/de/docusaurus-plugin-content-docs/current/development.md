---
id: development
title: Entwicklung
sidebar_label: Entwicklung
---

## Entwicklerhandbuch

### Voraussetzungen
- Node.js 18+ und npm
- Thunderbird 128 ESR oder neuer (für manuelle Tests)

### Projektstruktur (Überblick)
- Root: Verpackungsskript `distribution_zip_packer.sh`, Dokus, Screenshots
- `sources/`: Add‑on‑Code (Background, Optionen/Popup‑UI, Manifeste, Icons)
- `tests/`: Vitest‑Suite
- `website/`: Docusaurus‑Doku (i18n unter `website/i18n/de/...`)

### Installation & Tools
- Abhängigkeiten installieren: `npm ci`
- Doku (optional): `cd website && npm ci`
- Ziele anzeigen: `make help`

### Build & Paket
- ZIPs bauen: `make pack`
  - Erzeugt ATN‑ und LOCAL‑ZIPs im Repo‑Root (Artefakte nicht manuell bearbeiten)
  - Hinweis: Version in `sources/manifest_ATN.json` und `sources/manifest_LOCAL.json` vor dem Packen anpassen
- Manuelle Installation (Dev): Thunderbird → Extras → Add‑ons und Themes → Zahnrad → Add‑on aus Datei installieren… → ZIP wählen

### Tests
- Komplettlauf: `make test` (Vitest)
- Coverage (optional):
  - `npm i -D @vitest/coverage-v8`
  - `make test` ausführen; `coverage/index.html` öffnen
- Nur i18n: `make test-i18n` (Parität, Platzhalter, Titel)

### Debugging & Logs
- Fehlerkonsole: Extras → Entwickler‑Werkzeuge → Fehlerkonsole
- Ausführliche Logs umschalten:
  - Aktivieren: `messenger.storage.local.set({ debug: true })`
  - Deaktivieren: `messenger.storage.local.set({ debug: false })`
- Logs erscheinen beim Verfassen/Senden

### Doku (Website)
- Dev‑Server: `cd website && npm run start`
- Statischen Build: `cd website && npm run build`
- i18n: EN unter `website/docs/*.md`; DE unter `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`

### Sicherheit & Konfiguration
- `sources/manifest.json` nicht einchecken (wird temporär erstellt)
- `browser_specific_settings.gecko.id` stabil halten (Update‑Kanal)

### Fehlerbehebung
- Stelle sicher, dass Thunderbird 128 ESR oder neuer ist
- Nutze die Fehlerkonsole für Laufzeitprobleme

### Beitrag leisten
- Siehe CONTRIBUTING.md (Branch/Commit/PR‑Regeln)

