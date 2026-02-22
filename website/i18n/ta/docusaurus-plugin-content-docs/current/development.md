---
id: development
title: 'உருவாக்கம்'
sidebar_label: 'அபிவிருத்தி'
---

---

## வளர்ச்சி வழிகாட்டி {#development-guide}

:::note ஆங்கிலத்தை மட்டுமே திருத்தவும்; மொழிபெயர்ப்புகள் பரவப்படும்
ஆவணங்களை `website/docs` (ஆங்கிலம்) கீழ் மட்டுமே புதுப்பிக்கவும். `website/i18n/<locale>/…` கீழுள்ள மொழிபெயர்ப்புகள் தானியங்கியாக உருவாக்கப்படுகின்றன; அவற்றை கையால் திருத்த வேண்டாம். உள்ளூர்மயமான உள்ளடக்கத்தைப் புதுப்பிக்க மொழிபெயர்ப்பு பணிகளை (எ.கா., `make translate_web_docs_batch`) பயன்படுத்தவும்.
:::

### முன் தேவைகள் {#prerequisites}

- Node.js 22+ மற்றும் npm (Node 22 உடன் சோதிக்கப்பட்டது)
- Thunderbird 128 ESR அல்லது புதியது (கைமுறை சோதனைக்காக)

---

### திட்ட வடிவமைப்பு (உயர் நிலை) {#project-layout-high-level}

- Root: பொருத்துதல் ஸ்கிரிப்ட் `distribution_zip_packer.sh`, docs, screenshots
- `sources/`: முதன்மை add‑on குறியீடு (background, options/popup UI, manifests, icons)
- `tests/`: Vitest தொகுப்பு
- `website/`: Docusaurus docs (i18n `website/i18n/de/...` கீழ்)

---

### நிறுவல் & கருவிகள் {#install-and-tooling}

- Root சார்புகளை நிறுவ: `npm ci`
- Docs (விருப்பமானது): `cd website && npm ci`
- இலக்குகளை கண்டறிதல்: `make help`

---

### நேரடி மேம்பாடு (web‑ext run) {#live-dev-web-ext}

- Firefox Desktop-இல் விரைவு சுற்று (UI smoke‑tests மட்டும்):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird-இல் இயக்கவும் (MailExtensions-க்கு விருப்பமானது):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- குறிப்புகள்:
- Thunderbird இன் Error Console-ஐ திறந்தவாறே வைத்திருக்கவும் (Tools → Developer Tools → Error Console).
- MV3 event பக்கங்கள் செயலற்றபோது இடைநிறுத்தப்படும்; குறியீட்டு மாற்றங்களுக்குப் பிறகு add‑on-ஐ மீளேற்று, அல்லது web‑ext தானாக மீளேற்ற அனுமதிக்கவும்.
- சில Firefox‑க்கு மட்டுமே உள்ள நடத்தை மாறுபடலாம்; API சமமா என்பதை எப்போதும் Thunderbird-இல் சரிபார்க்கவும்.
- Thunderbird பைனரி பாதைகள் (உதாரணங்கள்):
- Linux: `thunderbird` (உ.தா., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Profile isolation: உங்கள் தினசரி அமைவை பாதிக்காமல் இருக்க, மேம்பாட்டுக்கு தனிப்பட்ட Thunderbird profile ஐ பயன்படுத்தவும்.

---

### Make இலக்குகள் (அகரவரிசை) {#make-targets-alphabetical}

Makefile பொதுவான dev ஓட்டங்களை ஒரே மாதிரியாக்குகிறது. ஒவ்வொரு இலக்கிற்குமான ஒரு வரி சுருக்கத்தைக் காண எந்த நேரமும் `make help` ஐ இயக்கவும்.

குறிப்பு: எந்த இலக்கையும் கொடுக்காமல் `make` ஐ இயக்கினால், இலக்கைத் தேர்வதற்கான எளிய Whiptail மெனு திறக்கும்.

| இலக்கு                                                   | ஒரு வரிச் சுருக்கம்                                                                             |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | உள்ளூர் build/preview பொருட்களை அகற்று (tmp/, web-local-preview/, website/build/).              |
| [`commit`](#mt-commit)                                   | வடிவமை, சோதனைகள் இயக்கு (i18n உட்பட), changelog புதுப்பி, commit & push.                        |
| [`eslint`](#mt-eslint)                                   | Flat config (`npm run -s lint:eslint`) மூலம் ESLint ஐ இயக்கு.                                   |
| [`help`](#mt-help)                                       | அனைத்து இலக்குகளையும் ஒரு வரிச் விளக்கத்துடன் பட்டியலிடு (வரிசைப்படுத்தப்பட்ட).                 |
| [`lint`](#mt-lint)                                       | `sources/` மீது web‑ext lint (தற்காலிக manifest; ZIP-களை புறக்கணிக்கிறது; non‑fatal).           |
| [`menu`](#mt-menu)                                       | இலக்கு மற்றும் விருப்ப arguments-ஐத் தேர்வதற்கான தொடர்பாடல் மெனு.                               |
| [`pack`](#mt-pack)                                       | ATN & LOCAL ZIP-களை உருவாக்கு (linter இயக்கும்; packer script ஐ அழைக்கும்).                     |
| [`prettier`](#mt-prettier)                               | Repository-ஐ உடனடியாக வடிவமை (மாற்றங்களை எழுதும்).                                              |
| [`prettier_check`](#mt-prettier_check)                   | Prettier check mode (எழுதாது); மறுவடிவமைப்பு தேவைப்பட்டால் தோல்வி.                              |
| [`prettier_write`](#mt-prettier_write)                   | `prettier` க்கு Alias.                                                                          |
| [`test`](#mt-test)                                       | Prettier (write), ESLint, பின்னர் Vitest (அமைக்கப்பட்டால் coverage).                            |
| [`test_i18n`](#mt-test_i18n)                             | i18n‑மட்டும் சோதனைகள்: add‑on placeholders/parity + website parity.                             |
| [`translate_app`](#mt-translation-app)                   | `translation_app` க்கு Alias.                                                                   |
| [`translation_app`](#mt-translation-app)                 | பயன்பாட்டு UI strings-ஐ `sources/_locales/en/messages.json` இலிருந்து மொழிபெயರ்க்கவும்.         |
| [`translate_web_docs_batch`](#mt-translation-web)        | Website docs-ஐ OpenAI Batch API மூலம் மொழிபெயர்க்கவும் (விருப்பமானது).                          |
| [`translate_web_docs_sync`](#mt-translation-web)         | Website docs-ஐ synchronous-ஆக மொழிபெயர்க்கவும் (பழமையானது, non-batch).                          |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index` க்கு Alias.                                                             |
| [`translation_web_index`](#mt-translation_web_index)     | Homepage/navbar/footer UI-ஐ மொழிபெயர்த்து (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Docs-ஐ `website/build` க்கு build செய் (`--locales` / `BUILD_LOCALES` ஐ ஆதரிக்கிறது).           |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Offline‑safe link check (தொலை HTTP[S] தவிர்க்கிறது).                                            |
| [`web_build_local_preview`](#mt-web_build_local_preview) | உள்ளூர் gh‑pages preview; 8080–8090-ல் auto‑serve; விருப்பமான tests/link‑check.                 |
| [`web_push_github`](#mt-web_push_github)                 | `website/build` ஐ `gh-pages` கிளைக்கு push செய்.                                                |

விருப்பங்களுக்கான இலக்கணம்

- விருப்பங்களை அனுப்ப `make <command> OPTS="…"` ஐப் பயன்படுத்தவும் (இருகோட்டுகள் பரிந்துரைக்கப்படுகிறது). கீழே உள்ள ஒவ்வொரு இலக்கும் எடுத்துக்காட்டு பயன்பாட்டைக் காட்டுகிறது.

--

-

#### Locale build குறிப்புகள் {#locale-build-tips}

- சில உள்ளூர்மொழிகளுக்கே build செய்ய: `BUILD_LOCALES="en de"` வை அமைக்கவோ அல்லது web இலக்குகளுக்கு `OPTS="--locales en,de"` ஐ அனுப்பவோ செய்யவும்.
- குறிப்பிட்ட ஒரு உள்ளூர்மொழியை preview செய்ய: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Build & Package {#build-and-package}

- ZIP-களை build செய்: `make pack`
- Repo root-இல் ATN மற்றும் LOCAL ZIP-களை உருவாக்கும் (பொருட்களை கையால் திருத்த வேண்டாம்)
- குறிப்பு: package செய்வதற்கு முன் `sources/manifest_ATN.json` மற்றும் `sources/manifest_LOCAL.json` இரண்டிலும் பதிப்பை புதுப்பிக்கவும்
- கைமுறை நிறுவல் (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → உருவாக்கப்பட்ட ZIP-ஐத் தேர்வு செய்க

---

### சோதனை {#test}

- முழு தொகுப்பு: `make test` (Vitest)
- Coverage (விருப்பமானது):
- `npm i -D @vitest/coverage-v8`
- `make test` ஐ இயக்கவும்; HTML அறிக்கைக்காக `coverage/index.html` ஐத் திறக்கவும்
- i18n மட்டும்: `make test_i18n` (UI keys/placeholders/titles + website-இல் ஒவ்வொரு உள்ளூர்மொழி/ஒவ்வொரு ஆவணத்திற்குமான parity, id/title/sidebar_label சரிபார்ப்புகளுடன்)

---

### பிழைத்திருத்தம் & பதிவுகள் {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- இயக்கநேரத்தில் verbose பதிவுகளை மாற்ற:
- Enable: `messenger.storage.local.set({ debug: true })`
- Disable: `messenger.storage.local.set({ debug: false })`
- பதிவுகள் பதில்களை உருவாக்கும்போது/அனுப்பும்போது தோன்றும்

---

### Docs (website) {#docs-website}

- Dev server: `cd website && npm run start`
- நிலைத் தளம் Build: `cd website && npm run build`
- Make சமமானவை (அகரவரிசை): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- பயன்பாட்டு எடுத்துக்காட்டுகள்:
- EN மட்டும், tests/link‑check தவிர்த்து, push இல்லை: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- அனைத்து உள்ளூர்மொழிகளும், tests/link‑check உடன், பின்னர் push: `make web_build_local_preview && make web_push_github`
- வெளியிடுவதற்கு முன், offline‑safe link check ஐ இயக்கவும்: `make web_build_linkcheck`.
- i18n: ஆங்கிலம் `website/docs/*.md` இல் உள்ளது; ஜெர்மன் மொழிபெயர்ப்புகள் `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` இல்
- Search: Algolia DocSearch சூழல் மாறிகள் CI-யில் அமைக்கப்பட்டிருந்தால் (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), தளம் Algolia தேடலைப் பயன்படுத்தும்; இல்லையெனில் local search-க்கு மாறும். முகப்புப் பக்கத்தில், தேடல் பெட்டியைத் திறக்க `/` அல்லது `Ctrl+K` ஐ அழுத்தவும்.

---

#### நன்கொடை மாற்றுவழி {#donate-redirect}

- `website/src/pages/donate.js`
- வழி: `/donate` (மற்றும் `/<locale>/donate`)
- நடத்தை:
- நடப்பு வழியில் locale இருந்தால் (உ.தா., `/de/donate`), அதையே பயன்படுத்தவும்
- இல்லையெனில், `navigator.languages` மற்றும் கட்டமைக்கப்பட்ட locales உள்ளவற்றில் சிறந்த பொருத்தத்தைத் தேர்ந்தெடுக்கவும்; இயல்புநிலை locale-க்கு fallback செய்க
- Redirect செய்யும் இடங்கள்:
- `en` → `/docs/donation`
- மற்றவை → `/<locale>/docs/donation`
- சரியான baseUrl கையாளுதலுக்காக `useBaseUrl` ஐ பயன்படுத்துகிறது
- மாற்று வழியாக meta refresh + `noscript` இணைப்பை உட்படுத்துகிறது

---

---

#### Preview குறிப்புகள் {#preview-tips}

- Node preview-ஐ சுத்தமாக நிறுத்த: `http://localhost:<port>/__stop` ஐத் திறக்கவும் (`Local server started` அச்சிடப்பட்ட பின்).
- MDX/JSX இல் படங்கள் ஏறவில்லை என்றால், தள `baseUrl` ஐ மதிக்க `useBaseUrl('/img/...')` ஐப் பயன்படுத்தவும்.
- Preview முதலில் தொடங்கும்; பின்னர் link check இயங்கும் மற்றும் அது non‑blocking (உடைந்த வெளிப்புற இணைப்புகள் preview-ஐ நிறுத்தாது).
- Preview URL எடுத்துக்காட்டு: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started” அச்சிடப்பட்ட பின்).
- link‑check இல் வெளிப்புற இணைப்புகள்: சில வெளிப்புற தளங்கள் (உ.தா., addons.thunderbird.net) தானியங்கிக் கிராலர்களைத் தடுக்கின்றன; link checks இல் 403 காட்டலாம். Preview இவ்வாறே தொடங்கும்; இவை புறக்கணிக்க பாதுகாப்பானவை.

---

#### வலைத்தளத்தை மொழிபெயர்க்கவும் {#translate-website}

நீங்கள் மொழிபெயர்க்கக்கூடியவை

- Website UI மட்டும்: homepage, navbar, footer மற்றும் பிற UI strings. Docs உள்ளடக்கம் இப்போது ஆங்கிலமாகவே இருக்கும்.

எங்கே திருத்துவது

- `website/i18n/<locale>/code.json` ஐத் திருத்தவும் (`en` ஐ முன்மாதிரியாகப் பயன்படுத்தவும்). `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` போன்ற placeholders-ஐ மாற்றாமல் வைத்திருக்கவும்.

கோப்புகளை உருவாக்க/புதுப்பிக்க

- அனைத்து locales க்கும் இல்லாத stubs-ஐ உருவாக்கவும்: `npm --prefix website run i18n:stubs`
- ஆங்கிலத்திலிருந்து stubs-ஐ மீட்டெழுதவும் (புதிய strings சேர்த்த பின்): `npm --prefix website run i18n:stubs:force`
- மாற்று (ஒரு locale க்கு மட்டும்): `npx --prefix website docusaurus write-translations --locale <locale>`

Homepage/navbar/footer UI strings-ஐ மொழிபெயர்ப்பு (OpenAI)

- சான்றுகள் ஒருமுறை அமைக்கவும் (shell அல்லது .env):
- `export OPENAI_API_KEY=sk-...`
- விருப்பமானது: `export OPENAI_MODEL=gpt-4o-mini`
- One‑shot (அனைத்து locales, en தவிர்த்து): `make translate_web_index`
- குறிப்பிட்ட locales-களுக்கு மட்டுப்படுத்து: `make translate_web_index OPTS="--locales de,fr"`
- ஏற்கனவே உள்ள மதிப்புகளை மீட்டெழுது: `make translate_web_index OPTS="--force"`

செல்லுபடியாக்கல் & மீள் முயற்சிகள்

- மொழிபெயர்ப்பு script JSON வடிவத்தைச் சரிபார்க்கிறது, curly‑brace placeholders-ஐக் காக்கிறது, மற்றும் URLs மாற்றமில்லாமல் இருப்பதை உறுதி செய்கிறது.
- செல்லுபடியாக்கல் தோல்வியடைந்தால், உள்ள feedback உடன் அதிகபட்சம் 2 முறை மீண்டும் முயறும்; பின்னர் இருக்கும் மதிப்புகளை வைத்திருக்கிறது.

உங்கள் locale-ஐ preview செய்யவும்

- Dev server: `npm --prefix website run start`
- `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/` ஐப் பார்வையிடவும்

சமர்ப்பித்தல்

- திருத்தப்பட்ட `code.json` கோப்பு(கள்) உடன் PR ஒன்றைத் திறக்கவும். மாற்றங்களைத் திரட்டமாக வைத்திருக்கவும்; இயன்றால் ஒரு விரைவு screenshot ஐச் சேர்க்கவும்.

---

### பாதுகாப்பு & கட்டமைப்பு குறிப்புகள் {#security-and-configuration-tips}

- `sources/manifest.json` ஐ commit செய்ய வேண்டாம் (build தற்காலிகமாக உருவாக்குகிறது)
- Update channel-ஐப் பாதுகாக்க `browser_specific_settings.gecko.id` ஐ நிலையாக வைத்திருங்கள்

---

### அமைப்புகள் நிலைத்தன்மை {#settings-persistence}

- சேமிப்பு: அனைத்து பயனர் அமைப்புகளும் `storage.local` இல் இருப்பதும் add‑on புதுப்பிப்புகளுக்குப் பொறுத்துப் பாதுகாக்கப்படுவதுமாகும்.
- Install: ஒரு key முற்றிலும் இல்லாதபோது (undefined) மட்டுமே இயல்புகள் பயன்படுத்தப்படும்.
- Update: Migration காணாமல் போன keys-ஐ மட்டும் நிரப்பும்; ஏற்கனவே உள்ள மதிப்புகள் ஒருபோதும் மீட்டெழுதப்படாது.
- Schema marker: `settingsVersion` (தற்போது `1`).
- Keys மற்றும் இயல்புகள்:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- குறியீடு: `sources/background.js` → `initializeOrMigrateSettings()` மற்றும் `SCHEMA_VERSION` ஐப் பார்க்கவும்.

Dev பணிச்சுற்று (புதிய அமைப்பைச் சேர்த்தல்)

- `sources/background.js` இல் `SCHEMA_VERSION` ஐ உயர்த்தவும்.
- `initializeOrMigrateSettings()` இல் `DEFAULTS` பொருளில் புதிய key + default ஐச் சேர்க்கவும்.
- இயல்புகளை seed செய்யும்போது "only‑if‑undefined" விதியைப் பயன்படுத்தவும்; ஏற்கனவே உள்ள மதிப்புகளை மீட்டெழுத வேண்டாம்.
- அந்த அமைப்பு பயனருக்கு தெரியும் ஒன்று என்றால், `sources/options.js` இல் அதை இணைத்து உள்ளூர்மயமான strings சேர்க்கவும்.
- சோதனைகளைச் சேர்க்க/சரிசெய்யவும் (`tests/background.settings.migration.test.js` ஐப் பார்க்கவும்).

கைமுறை சோதனை குறிப்புகள்

- புதிய நிறுவலை உருவகப்படுத்த: extension இன் data dir ஐ சுத்தப்படுத்தவும் அல்லது புதிய profile-இல் தொடங்கவும்.
- புதுப்பிப்பை உருவகப்படுத்த: `storage.local` இல் `settingsVersion` ஐ `0` ஆக அமைத்து, மீளேற்றவும்; உள்ள மதிப்புகள் மாற்றமின்றி உள்ளனவா, காணாமல் போன keys மட்டுமே சேர்க்கப்பட்டுள்ளனவா என்பதை உறுதி செய்யவும்.

---

### சிக்கல் தீர்ப்பு {#troubleshooting}

- Thunderbird 128 ESR அல்லது புதியது என்பதை உறுதி செய்யவும்
- இயக்கநேர பிரச்சினைகளுக்கு Error Console-ஐப் பயன்படுத்தவும்
- சேமிக்கப்பட்ட அமைப்புகள் சரியாக அமலாகவில்லை என்று தோன்றினால், Thunderbird ஐ மறுதொடக்கம் செய்து மீண்டும் முயற்சிக்கவும். (Thunderbird அமர்வுகளுக்கு இடையில் நிலையை cache செய்து வைத்திருக்கலாம்; மறுதொடக்கம் புதிய அமைப்புகள் ஏற்றப்படுவதை உறுதி செய்கிறது.)

---

### CI & கவரேஜ் {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) vitest-ஐ coverage உச்சவரம்புகளுடன் (85% lines/functions/branches/statements) இயக்குகிறது. உச்சவரம்புகள் பூர்த்தியாகாவிட்டால், வேலை தோல்வியடையும்.
- Workflow HTML அறிக்கையுடன் `coverage-html` எனும் artifact-ஐ பதிவேற்றுகிறது; run பக்கத்திலிருந்து அதை பதிவிறக்கவும் (Actions → latest run → Artifacts).

---

### பங்களிப்பு {#contributing}

- கிளை/commit/PR வழிகாட்டலுக்காக CONTRIBUTING.md ஐப் பார்க்கவும்
- குறிப்பு: உங்கள் தினசரி profile-ஐ பாதிக்காமல் இருக்க சோதனைக்காக தனித்த Thunderbird மேம்பாட்டு profile ஒன்றை உருவாக்கவும்.

---

### மொழிபெயர்ப்புகள்

- பெரிய “all → all” மொழிபெயர்ப்பு பணிகள் மெதுவாகவும் செலவானவகையும் இருக்கலாம். சில ஆவணங்கள் மற்றும் 1–2 உள்ளூர்மொழிகளுடன் தொடங்குங்கள், விளைவை மதிப்பாய்வு செய்து, பின்னர் விரிவாக்குங்கள்.

---

- Retry கொள்கை: மொழிபெயர்ப்பு பணிகள் API பிழைகளில் அதிகபட்சம் 3 retries வரை (exponential backoff உடன்) செய்யும்; `scripts/translate_web_docs_batch.js` மற்றும் `scripts/translate_web_docs_sync.js` ஐப் பார்க்கவும்.

ஆவணங்களுக்கு screenshots

- படங்களை `website/static/img/` கீழ் சேமிக்கவும்.
- பாதைகள் தள `baseUrl` உடன் வேலை செய்ய `useBaseUrl('/img/<filename>')` வழியாக MD/MDX இல் அவற்றை குறிப்பிடவும்.
- `website/static/img/` கீழ் படங்களைச் சேர்த்ததற்குப் பிறகு அல்லது பெயர் மாற்றம் செய்த பிறகு, அனைத்து குறிப்புகளும் இன்னும் `useBaseUrl('/img/…')` ஐப் பயன்படுத்துகின்றனவா மற்றும் உள்ளூர் preview-இல் render ஆகின்றனவா என்று உறுதி செய்யவும்.
  Favicons

- பல‑அளவு `favicon.ico` அனைத்து build பாதைகளிலும் (Make + scripts) `website/scripts/build-favicon.mjs` மூலம் தானாக உருவாக்கப்படுகிறது.
- எந்த கைமுறை படியும் தேவையில்லை; `icon-*.png` ஐப் புதுப்பிப்பது போதுமானது.
  Review tip

- மொழிபெயர்க்கப்பட்ட docs இல் front‑matter `id` மாற்றமின்றி இருக்கட்டும்; இருந்தால் `title` மற்றும் `sidebar_label` மட்டுமே மொழிபெயர்க்கவும்.

#### clean {#mt-clean}

- நோக்கம்: உள்ளூர் build/preview பொருட்களை அகற்று.
- பயன்பாடு: `make clean`
- அகற்றும் (இருந்தால்):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- நோக்கம்: வடிவமை, சோதனை, changelog புதுப்பி, commit மற்றும் push செய்.
- பயன்பாடு: `make commit`
- விவரங்கள்: Prettier (write), `make test`, `make test_i18n` ஐ இயக்குகிறது; staged diffs இருந்தால் changelog ஐச் சேர்க்கிறது; `origin/<branch>` க்கு push செய்கிறது.

---

#### eslint {#mt-eslint}

- நோக்கம்: Flat config மூலம் ESLint ஐ இயக்கு.
- பயன்பாடு: `make eslint`

---

#### help {#mt-help}

- நோக்கம்: அனைத்து இலக்குகளையும் ஒரு வரிச் சுருக்கத்துடன் பட்டியலிடு.
- பயன்பாடு: `make help`

---

#### lint {#mt-lint}

- நோக்கம்: `web-ext` ஐப் பயன்படுத்தி MailExtension-ஐ lint செய்.
- பயன்பாடு: `make lint`
- குறிப்புகள்: தற்காலிகமாக `sources/manifest_LOCAL.json` → `sources/manifest.json` ஆக நகலெடுக்கிறது; build செய்யப்பட்ட ZIP-களைப் புறக்கணிக்கிறது; எச்சரிக்கைகள் pipeline-ஐ தோல்வியடையச் செய்யாது.

---

#### menu {#mt-menu}

- நோக்கம்: Make இலக்கு மற்றும் விருப்ப arguments தேர்வுக்கான தொடர்பாடல் மெனு.
- பயன்பாடு: arguments இன்றி `make` ஐ இயக்கவும்.
- குறிப்புகள்: `whiptail` கிடைக்காவிட்டால், மெனு `make help` க்கு fallback செய்கிறது.

---

#### pack {#mt-pack}

- நோக்கம்: ATN மற்றும் LOCAL ZIP-களை build செய் (`lint` மீது பொறுத்துள்ளது).
- பயன்பாடு: `make pack`
- குறிப்பு: package செய்வதற்கு முன் இரண்டிலும் பதிப்புகளை உயர்த்தவும் `sources/manifest_*.json`.

---

#### prettier {#mt-prettier}

- நோக்கம்: repo-வை உடனடியாக வடிவமை.
- பயன்பாடு: `make prettier`

#### prettier_check {#mt-prettier_check}

- நோக்கம்: formatting-ஐ உறுதிப்படுத்து (எழுதாது).
- பயன்பாடு: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- நோக்கம்: `prettier` க்கான alias.
- பயன்பாடு: `make prettier_write`

---

#### test {#mt-test}

- நோக்கம்: Prettier (write), ESLint, பின்னர் Vitest (நிறுவப்பட்டால் coverage).
- பயன்பாடு: `make test`

#### test_i18n {#mt-test_i18n}

- நோக்கம்: add‑on strings மற்றும் website docs க்கான i18n‑க்கு மையப்படுத்தப்பட்ட சோதனைகள்.
- பயன்பாடு: `make test_i18n`
- இயக்குகிறது: `npm run test:i18n` மற்றும் `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- நோக்கம்: EN இலிருந்து பிற locales க்கு add‑on UI strings-ஐ மொழிபெயர்க்கவும்.
- பயன்பாடு: `make translation_app OPTS="--locales all|de,fr"`
- குறிப்புகள்: key அமைப்பும் placeholders-உம் காக்கப்படும்; `translation_app.log` இல் பதிவுகள். Script வடிவம்: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- நோக்கம்: website docs-ஐ `website/docs/*.md` இலிருந்து `website/i18n/<locale>/...` ஆக மொழிபெயர்க்கவும்.
- விருப்பமானது: `translate_web_docs_batch` (OpenAI Batch API)
  - பயன்பாடு (flags): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - பழமையான positional இன்னும் ஏற்றுக்கொள்ளப்படும்: `OPTS="<doc|all> <lang|all>"`
- நடத்தை: JSONL உருவாக்கும், பதிவேற்றும், ஒவ்வொரு 30s க்கும் poll செய்கிறது, முடிவுகளைப் பதிவிறக்கம் செய்கிறது, கோப்புகளை எழுதுகிறது.
- குறிப்பு: ஒரு batch job முடிவடைய அதிகபட்சம் 24 மணி நேரம் எடுத்துக்கொள்ளலாம் (OpenAI இன் batch window படி). ஒவ்வொரு poll இலும் console elapsed நேரத்தை காட்டும்.
- Env: `OPENAI_API_KEY` (தேவை), விருப்பமான `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (இயல்பு 24h), `BATCH_POLL_INTERVAL_MS`.
- பழமையானது: `translate_web_docs_sync`
  - பயன்பாடு (flags): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - பழமையான positional இன்னும் ஏற்றுக்கொள்ளப்படும்: `OPTS="<doc|all> <lang|all>"`
- நடத்தை: synchronous per‑pair கோரிக்கைகள் (batch aggregation இல்லை).
- குறிப்புகள்: `OPTS` விடுபட்டால் தொடர்பாடல் prompts. இரு முறைகளும் code blocks/inline code-ஐக் காக்கின்றன மற்றும் front‑matter `id` மாற்றமின்றி இருக்கும்; `translation_web_batch.log` (batch) அல்லது `translation_web_sync.log` (sync) இல் பதிவுகள்.

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- நோக்கம்: website UI strings (homepage, navbar, footer) ஐ `website/i18n/en/code.json` இலிருந்து `website/i18n/<locale>/code.json` கீழ் உள்ள அனைத்து locales க்கும் ( `en` தவிர) மொழிபெயர்க்கவும்.
- பயன்பாடு: `make translate_web_index` அல்லது `make translate_web_index OPTS="--locales de,fr [--force]"`
- தேவைகள்: `OPENAI_API_KEY` ஐ export செய்யவும் (விருப்பமானது: `OPENAI_MODEL=gpt-4o-mini`).
- நடத்தை: JSON அமைப்பைச் சரிபார்க்கிறது, curly‑brace placeholders-ஐக் காக்கிறது, URLs மாற்றமின்றி இருக்கும், மற்றும் validation பிழைகளில் feedback உடன் மீண்டும் முயற்சிக்கிறது.

---

#### web_build {#mt-web_build}

- நோக்கம்: docs தளத்தை `website/build` க்கு build செய்.
- பயன்பாடு: `make web_build OPTS="--locales en|de,en|all"` (அல்லது `BUILD_LOCALES="en de"` ஐ அமைக்கவும்)
- உள்ளமைவு: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- சார்புகள்: `website/node_modules/@docusaurus` இல்லை என்றால் மட்டுமே `website/` இல் `npm ci` ஐ இயக்கும்.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- நோக்கம்: offline‑safe link check.
- பயன்பாடு: `make web_build_linkcheck OPTS="--locales en|all"`
- குறிப்புகள்: `tmp_linkcheck_web_pages` க்கு build செய்கிறது; GH Pages `baseUrl` ஐ `/` ஆக மறுஎழுதுகிறது; தொலை HTTP(S) இணைப்புகளைத் தவிர்க்கிறது.

#### web_build_local_preview {#mt-web_build_local_preview}

- நோக்கம்: விருப்பமான tests/link‑check உடன் உள்ளூர் gh‑pages preview.
- பயன்பாடு: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- நடத்தை: முதலில் Node preview server ஐ முயற்சிக்கிறது (`scripts/preview-server.mjs`, `/__stop` ஐ ஆதரிக்கிறது), பின்னர் `python3 -m http.server` க்கு fallback செய்கிறது; 8080–8090-ல் சேவை செய்கிறது; PID `web-local-preview/.server.pid` இல்.

#### web_push_github {#mt-web_push_github}

- நோக்கம்: `website/build` ஐ `gh-pages` கிளைக்கு push செய்.
- பயன்பாடு: `make web_push_github`

குறிப்பு: Makefile பயன்படுத்தும் package manager-ஐ override செய்ய `NPM=…` ஐ அமைக்கவும் (இயல்புநிலை `npm`).
