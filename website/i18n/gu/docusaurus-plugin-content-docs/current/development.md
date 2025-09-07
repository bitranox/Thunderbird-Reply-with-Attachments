---
id: development
title: વિકાસ
sidebar_label: વિકાસ
---

## વિકાસ માર્ગદર્શિકા

### પૂર્વઆવશ્યકતાઓ

- Node.js 18+ અને npm
- Thunderbird 128 ESR અથવા નવું (મેન્યુઅલ ટેસ્ટિંગ માટે)

### પ્રોજેક્ટ લેઆઉટ (ઉચ્ચ‑સ્તર)

- Root: પેકેજિંગ સ્ક્રિપ્ટ `distribution_zip_packer.sh`, દસ્તાવેજો, સ્ક્રીનશોટ્સ
- `sources/`: મુખ્ય add‑on કોડ (background, options/popup UI, manifests, icons)
- `tests/`: Vitest suite
- `website/`: Docusaurus દસ્તાવેજો (i18n `website/i18n/de/...` હેઠળ)

### ઇન્સ્ટોલ અને ટૂલિંગ

- Root અવલંબિતાઓ ઇન્સ્ટોલ કરો: `npm ci`
- દસ્તાવેજો (વૈકલ્પિક): `cd website && npm ci`
- ટાર્ગેટ જુઓ: `make help`

### બિલ્ડ અને પેકેજ

- ZIP બનાવો: `make pack`
  - રીપો રૂટમાં ATN અને LOCAL ZIP બનાવે છે (આર્ટિફેક્ટ્સ હાથથી સંપાદિત ન કરો)
  - ટીપ: પેકેજિંગ પહેલાં `sources/manifest_ATN.json` અને `sources/manifest_LOCAL.json` માં વર્ઝન અપડેટ કરો
- મેન્યુઅલ ઇન્સ્ટોલ (dev): Thunderbird → Tools → Add‑ons and Themes → ગિયર → Install Add‑on From File… → બિલ્ડ થયેલ ZIP પસંદ કરો

### ટેસ્ટ

- સંપૂર્ણ સ્યુટ: `make test` (Vitest)
- કવરેજ (વૈકલ્પિક):
  - `npm i -D @vitest/coverage-v8`
  - `make test` ચલાવો; HTML રીપોર્ટ માટે `coverage/index.html` ખોલો
- ફક્ત i18n: `make test-i18n` (parity, placeholders, titles)

### ડિબગિંગ અને લોગ્સ

- Error Console: Tools → Developer Tools → Error Console
- રનટાઇમ વખતે verbose લોગ્સ ટોગલ કરો:
  - Enable: `messenger.storage.local.set({ debug: true })`
  - Disable: `messenger.storage.local.set({ debug: false })`
- જવાબ તૈયાર/મોકલતી વખતે લોગ્સ દેખાશે

### દસ્તાવેજો (વેબસાઇટ)

- Dev server: `cd website && npm run start`
- Static site build: `cd website && npm run build`
- i18n: અંગ્રેજી `website/docs/*.md`; જર્મન `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- શોધ: CI માં Algolia DocSearch env vars (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`) સેટ હોય તો સાઇટ Algolia વાપરે છે; નહિ તો લોકલ શોધ. હોમપેજ પર `/` અથવા `Ctrl+K` દબાવો.

### સુરક્ષા અને રૂપરેખાંકન સૂચનો

- `sources/manifest.json` કમિટ ન કરો (બિલ્ડ સમયસર બનાવે છે)
- અપડેટ ચેનલ જાળવવા `browser_specific_settings.gecko.id` સ્થિર રાખો

### ત્રુટિ નિવારણ

- Thunderbird 128 ESR અથવા નવું વાપરો
- રનટાઇમ સમસ્યાઓ માટે Error Console વાપરો

### CI અને કવરેજ

- GitHub Actions (`CI — Tests`) vitest ને કવરેજ થ્રેશોલ્ડ સાથે ચલાવે છે (85% lines/functions/branches/statements). પૂર્ણ ન થાય તો કામ નિષ્ફળ જશે.
- વર્કફ્લો `coverage-html` આર્ટિફેક્ટ અપલોડ કરે છે; રન પેજ પરથી ડાઉનલોડ કરો (Actions → latest run → Artifacts).

### યોગદાન

- બ્રાન્ચ/કમિટ/PR માર્ગદર્શિકાઓ માટે CONTRIBUTING.md જુઓ
