---
id: development
title: డెవలప్మెంట్
sidebar_label: డెవలప్మెంట్
---

## డెవలప్మెంట్ గైడ్

### ముందస్తు అవసరాలు

- Node.js 18+ మరియు npm
- Thunderbird 128 ESR లేదా కొత్తది (మాన్యువల్ టెస్టింగ్ కోసం)

### ప్రాజెక్ట్ లేఅవుట్ (హై‑లెవెల్)

- Root: ప్యాకేజింగ్ స్క్రిప్ట్ `distribution_zip_packer.sh`, డాక్స్, స్క్రీన్‌షాట్లు
- `sources/`: ప్రధాన ఆడ్‑ఆన్ కోడ్ (background, options/popup UI, manifests, icons)
- `tests/`: Vitest suite
- `website/`: Docusaurus డాక్స్ (i18n `website/i18n/de/...` కింద)

### ఇన్‌స్టాల్ & టూలింగ్

- రూట్ డిపెండెన్సీలు ఇన్‌స్టాల్: `npm ci`
- డాక్స్ (ఐచ్చికం): `cd website && npm ci`
- టార్గెట్లు చూసుకోండి: `make help`

### బిల్డ్ & ప్యాకేజ్

- ZIPలు బిల్డ్ చేయండి: `make pack`
  - రిపో రూట్‌లో ATN మరియు LOCAL ZIPలను ఉత్పత్తి చేస్తుంది (ఆర్టిఫాక్ట్‌లను చేతితో ఎడిట్ చేయవద్దు)
  - టిప్: ప్యాకేజింగ్‌కు ముందు `sources/manifest_ATN.json` మరియు `sources/manifest_LOCAL.json` లో వెర్షన్ అప్‌డేట్ చేయండి
- మాన్యువల్ ఇన్‌స్టాలేషన్ (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → బిల్డ్ చేసిన ZIP ఎంచుకోండి

### టెస్ట్

- పూర్తి సూట్: `make test` (Vitest)
- కవరేజ్ (ఐచ్చికం):
  - `npm i -D @vitest/coverage-v8`
  - `make test` నడపండి; HTML రిపోర్ట్ కోసం `coverage/index.html` తెరవండి
- కేవలం i18n: `make test-i18n` (parity, placeholders, titles)

### డీబగ్గింగ్ & లాగ్స్

- Error Console: Tools → Developer Tools → Error Console
- రన్‌టైమ్‌లో వివరమైన లాగ్‌లను టోగుల్ చేయండి:
  - Enable: `messenger.storage.local.set({ debug: true })`
  - Disable: `messenger.storage.local.set({ debug: false })`
- రిప్లై కంపోజ్/సెండ్ సమయంలో లాగ్స్ కనిపిస్తాయి

### డాక్స్ (వెబ్‌సైట్)

- డెవ్ సర్వర్: `cd website && npm run start`
- స్టాటిక్ సైట్ బిల్డ్: `cd website && npm run build`
- i18n: ఇంగ్లీష్ `website/docs/*.md`; జర్మన్ అనువాదాలు `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- సెర్చ్: CIలో Algolia DocSearch env vars (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`) సెట్ చేసి ఉంటే సైట్ Algolia ఉపయోగిస్తుంది; లేకపోతే లోకల్ సెర్చ్. హోమ్‌పేజీలో `/` లేదా `Ctrl+K` నొక్కండి.

### సెక్యూరిటీ & కన్ఫిగరేషన్ చిట్కాలు

- `sources/manifest.json` కమిట్ చేయవద్దు (బిల్డ్ తాత్కాలికంగా సృష్టిస్తుంది)
- అప్‌డేట్ ఛానెల్ నిలబెట్టడానికి `browser_specific_settings.gecko.id` స్థిరంగా ఉంచండి

### ట్రబుల్‌షూటింగ్

- Thunderbird 128 ESR లేదా కొత్తది వాడండి
- రన్‌టైమ్ ఇష్యూల కోసం Error Console వాడండి

### CI & కవరేజ్

- GitHub Actions (`CI — Tests`) vitest ను కవరేజ్ థ్రెషోల్డ్స్ (85% lines/functions/branches/statements) తో నడుపుతుంది; తీరనట్లయితే జాబ్ ఫెయిల్ అవుతుంది.
- వర్క్‌ఫ్లో `coverage-html` ఆర్టిఫాక్ట్‌ను అప్‌లోడ్ చేస్తుంది; రన్ పేజీ నుండి డౌన్‌లోడ్ చేయండి (Actions → latest run → Artifacts).

### కాంట్రిబ్యూషన్

- బ్రాంచ్/కమిట్/PR మార్గదర్శకాలకు CONTRIBUTING.md చూడండి
