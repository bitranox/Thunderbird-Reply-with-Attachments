---
id: development
title: அபிவிருத்தி
sidebar_label: அபிவிருத்தி
---

## அபிவிருத்தி வழிகாட்டி

### தேவைகள்

- Node.js 18+ மற்றும் npm
- Thunderbird 128 ESR அல்லது அதற்கு மேல் (கையேடு சோதனைக்காக)

### திட்ட அமைப்பு (உயர்‑நிலை)

- Root: பாக்கேஜிங் ஸ்கிரிப்ட் `distribution_zip_packer.sh`, ஆவணங்கள், திரைப்பிடிப்புகள்
- `sources/`: முக்கிய add‑on குறியீடு (background, options/popup UI, manifests, icons)
- `tests/`: Vitest suite
- `website/`: Docusaurus ஆவணங்கள் (i18n `website/i18n/de/...` கீழ்)

### நிறுவல் & உபகரணங்கள்

- Root சார்புகளை நிறுவ: `npm ci`
- ஆவணங்கள் (விருப்பம்): `cd website && npm ci`
- இலக்குகளைப் பார்க்க: `make help`

### பில்ட் & பேக்கேஜ்

- ZIP கட்டிடம்: `make pack`
  - ரீப்போ ரூட் இல் ATN மற்றும் LOCAL ZIP உருவாக்கப்படும் (ஆர்டிஃபாக்ட்களை கையேடு மாற்ற வேண்டாம்)
  - குறிப்பு: பேக்கேஜிங் முன் `sources/manifest_ATN.json` மற்றும் `sources/manifest_LOCAL.json` இல் பதிப்பை புதுப்பிக்கவும்
- கையேடு நிறுவல் (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → கட்டிய ZIP ஐத் தேர்ந்தெடுக்கவும்

### சோதனை

- முழு தொகுப்பு: `make test` (Vitest)
- கவரேஜ் (விருப்பம்):
  - `npm i -D @vitest/coverage-v8`
  - `make test` ஐ இயக்குங்கள்; HTML அறிக்கைக்கு `coverage/index.html` ஐத் திறக்கவும்
- i18n மட்டும்: `make test-i18n` (parity, placeholders, titles)

### பிழைதேடல் & பதிவுகள்

- Error Console: Tools → Developer Tools → Error Console
- இயங்கும் போது விரிவான பதிவுகளை மாற்ற:
  - Enable: `messenger.storage.local.set({ debug: true })`
  - Disable: `messenger.storage.local.set({ debug: false })`
- பதிலை எழுதும்/அனுப்பும் போது பதிவுகள் தோன்றும்

### ஆவணங்கள் (வலைத்தளம்)

- Dev server: `cd website && npm run start`
- Static site build: `cd website && npm run build`
- i18n: ஆங்கிலம் `website/docs/*.md`; ஜெர்மன் `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- தேடல்: CI இல் Algolia DocSearch மாறிகள் (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`) அமைக்கப்பட்டிருந்தால் Algolia பயன்படுத்தப்படும்; இல்லையேல் உள்ளூர் தேடல். முகப்பில் `/` அல்லது `Ctrl+K` அழுத்தவும்.

### பாதுகாப்பு & கட்டமைப்பு குறிப்புகள்

- `sources/manifest.json` ஐ commit செய்ய வேண்டாம் (build தற்காலிகமாக உருவாக்கும்)
- புதுப்பிப்பு சேனலை பராமரிக்க `browser_specific_settings.gecko.id` ஐ நிலையானதாக வைத்திருங்கள்

### சிக்கல் தீர்வு

- Thunderbird 128 ESR அல்லது அதை விட புதிய பதிப்பைப் பயன்படுத்தவும்
- இயங்கும் நேரப் பிரச்சினைகளுக்கு Error Console ஐப் பயன்படுத்தவும்

### CI & கவரேஜ்

- GitHub Actions (`CI — Tests`) vitest ஐ கவரேஜ் வரம்புகளுடன் (85% lines/functions/branches/statements) இயக்கும்; பூர்த்தி செய்யாவிட்டால் வேலை தோல்வியடையும்.
- பண்போக்கு `coverage-html` என்ற அர்டிஃபாக்டை பதிவேற்றும்; ரன் பக்கத்தில் இருந்து பதிவிறக்கவும் (Actions → latest run → Artifacts).

### பங்களிப்பு

- கிளை/கமிட்/PR வழிகாட்டுதலுக்கு CONTRIBUTING.md ஐப் பார்க்கவும்
