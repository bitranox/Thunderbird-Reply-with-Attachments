---
id: development
title: विकास
sidebar_label: विकास
---

## विकास मार्गदर्शक

### पूर्वअट

- Node.js 18+ आणि npm
- Thunderbird 128 ESR किंवा नंतरचा (मॅन्युअल टेस्टिंगसाठी)

### प्रकल्प मांडणी (उच्च‑पातळी)

- Root: पॅकेजिंग स्क्रिप्ट `distribution_zip_packer.sh`, दस्तऐवज, स्क्रीनशॉट्स
- `sources/`: मुख्य add‑on कोड (background, options/popup UI, manifests, icons)
- `tests/`: Vitest suite
- `website/`: Docusaurus दस्तऐवज (i18n `website/i18n/de/...` अंतर्गत)

### इंस्टॉल आणि टूलिंग

- Root अवलंबित्वे इंस्टॉल करा: `npm ci`
- Docs (पर्यायी): `cd website && npm ci`
- उद्दिष्टे पाहा: `make help`

### बिल्ड आणि पॅकेज

- ZIP तयार करा: `make pack`
  - रेपॉझिटरी रूटमध्ये ATN आणि LOCAL ZIP तयार होतात (आर्टिफॅक्ट्स हाताने संपादित करू नका)
  - टिप: पॅकेजिंगपूर्वी `sources/manifest_ATN.json` आणि `sources/manifest_LOCAL.json` मध्ये आवृत्ती अपडेट करा
- मॅन्युअल इंस्टॉल (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → तयार ZIP निवडा

### टेस्ट

- पूर्ण संच: `make test` (Vitest)
- कव्हरेज (पर्यायी):
  - `npm i -D @vitest/coverage-v8`
  - `make test` चालवा; HTML अहवालासाठी `coverage/index.html` उघडा
- फक्त i18n: `make test-i18n` (parity, placeholders, titles)

### डीबगिंग आणि लॉग्स

- Error Console: Tools → Developer Tools → Error Console
- रनटाइमवर verbose लॉग टॉगल करा:
  - Enable: `messenger.storage.local.set({ debug: true })`
  - Disable: `messenger.storage.local.set({ debug: false })`
- उत्तर लिहिताना/पाठवताना लॉग दिसतील

### Docs (वेबसाइट)

- Dev server: `cd website && npm run start`
- स्टॅटिक साइट बिल्ड: `cd website && npm run build`
- i18n: इंग्रजी `website/docs/*.md`; जर्मन `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- शोध: CI मध्ये Algolia DocSearch env vars (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`) सेट असल्यास साइट Algolia वापरते; अन्यथा स्थानिक शोध. मुख्यपृष्ठावर `/` किंवा `Ctrl+K` दाबा.

### सुरक्षा आणि संरचना टिपा

- `sources/manifest.json` कमिट करू नका (बिल्ड तात्पुरते तयार करते)
- अपडेट चॅनेल टिकवण्यासाठी `browser_specific_settings.gecko.id` स्थिर ठेवा

### समस्या निवारण

- Thunderbird 128 ESR किंवा नंतरचा वापरा
- रनटाइम समस्यांसाठी Error Console वापरा

### CI आणि कव्हरेज

- GitHub Actions (`CI — Tests`) vitest कव्हरेज थ्रेसहोल्डसह (85% lines/functions/branches/statements) चालवते; पूर्ण न झाल्यास जॉब फेल होते.
- वर्कफ्लो `coverage-html` आर्टिफॅक्ट अपलोड करते; Run पेजवरून डाउनलोड करा (Actions → latest run → Artifacts).

### योगदान

- ब्रँच/कमिट/PR मार्गदर्शकांसाठी CONTRIBUTING.md पहा
