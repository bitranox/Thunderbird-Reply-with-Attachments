---
id: development
title: Sviluppo
sidebar_label: Sviluppo
---

## Guida allo sviluppo

### Prerequisiti

- Node.js 18+ e npm
- Thunderbird 128 ESR o successivo (per test manuali)

### Struttura del progetto (alto livello)

- Radice: script di packaging `distribution_zip_packer.sh`, documenti, screenshot
- `sources/`: codice principale (background, UI opzioni/popup, manifest, icone)
- `tests/`: suite Vitest
- `website/`: documentazione Docusaurus (i18n in `website/i18n/de/...`)

### Installazione e strumenti

- Installa dipendenze root: `npm ci`
- Docs (opzionale): `cd website && npm ci`
- Scopri i target: `make help`

### Build e packaging

- Crea gli ZIP: `make pack`
  - Produce ZIP ATN e LOCAL nella radice del repo (non modificare a mano)
  - Suggerimento: aggiorna la versione in `sources/manifest_ATN.json` e `sources/manifest_LOCAL.json` prima del packaging
- Installazione manuale (dev): Thunderbird → Strumenti → Componenti aggiuntivi e temi → ingranaggio → Installa componente da file… → seleziona lo ZIP

### Test

- Suite completa: `make test` (Vitest)
- Copertura (opzionale):
  - `npm i -D @vitest/coverage-v8`
  - Esegui `make test`; apri `coverage/index.html` per il report HTML
- Solo i18n: `make test-i18n` (parità, placeholder, titoli)

### Debug e log

- Console errori: Strumenti → Strumenti di sviluppo → Console errori
- Abilita/disabilita i log verbosi a runtime:
  - Abilita: `messenger.storage.local.set({ debug: true })`
  - Disabilita: `messenger.storage.local.set({ debug: false })`
- I log appaiono durante la composizione/l’invio

### Documentazione (sito)

- Server di sviluppo: `cd website && npm run start`
- Build del sito statico: `cd website && npm run build`
- i18n: Inglese in `website/docs/*.md`; Tedesco in `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Ricerca: se le variabili Algolia DocSearch sono impostate in CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), il sito usa Algolia; altrimenti ricerca locale. Nella home, premi `/` o `Ctrl+K`.

### Sicurezza e configurazione

- Non fare commit di `sources/manifest.json` (creato temporaneamente dalla build)
- Mantieni `browser_specific_settings.gecko.id` stabile per preservare il canale di aggiornamento

### Risoluzione dei problemi

- Assicurati che Thunderbird sia 128 ESR o successivo
- Usa la Console errori per problemi a runtime

### CI e copertura

- GitHub Actions (`CI — Tests`) esegue vitest con soglie di copertura (85% linee/funzioni/rami/istruzioni). Se non raggiunte, il job fallisce.
- Il workflow carica l’artefatto `coverage-html` con il report HTML; scaricalo dalla pagina della run (Actions → ultima run → Artifacts).

### Contribuire

- Consulta CONTRIBUTING.md per le linee guida su branch/commit/PR
