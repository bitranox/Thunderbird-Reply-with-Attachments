---
id: development
title: 'Vývoj'
sidebar_label: 'Vývoj'
---

---

## Průvodce vývojem {#development-guide}

:::note Upravujte pouze anglickou verzi; překlady se propagují
Aktualizujte dokumentaci pouze pod `website/docs` (angličtina). Překlady pod `website/i18n/<locale>/…` jsou generované a neměly by se upravovat ručně. K obnovení lokalizovaného obsahu použijte překladové úlohy (např. `make translate_web_docs_batch`).
:::

### Předpoklady {#prerequisites}

- Node.js 22+ a npm (testováno s Node 22)
- Thunderbird 128 ESR nebo novější (pro ruční testování)

---

### Struktura projektu (přehled) {#project-layout-high-level}

- Kořen: balicí skript `distribution_zip_packer.sh`, dokumentace, snímky obrazovky
- `sources/`: hlavní kód doplňku (background, UI možností/vyskakovacího okna, manifesty, ikony)
- `tests/`: sada testů Vitest
- `website/`: dokumentace Docusaurus (s i18n pod `website/i18n/de/...`)

---

### Instalace a nástroje {#install-and-tooling}

- Instalace kořenových závislostí: `npm ci`
- Dokumentace (volitelné): `cd website && npm ci`
- Zobrazení cílů: `make help`

---

### Živý vývoj (web‑ext run) {#live-dev-web-ext}

- Rychlý cyklus ve Firefoxu pro počítač (pouze kouřové testy UI):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Spustit v Thunderbirdu (preferováno pro MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Tipy:
- Nechte otevřenou Chybovou konzoli Thunderbirdu (Nástroje → Nástroje pro vývojáře → Chybová konzole).
- Stránky událostí MV3 jsou při nečinnosti uspávány; po změnách kódu doplněk znovu načtěte, nebo nechte web‑ext provést auto‑reload.
- Některá chování pouze ve Firefoxu se liší; vždy ověřte v Thunderbirdu kvůli paritě API.
- Cesty k binárkám Thunderbirdu (příklady):
- Linux: `thunderbird` (např. `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Izolace profilu: Pro vývoj používejte samostatný profil Thunderbirdu, abyste neovlivnili své denní prostředí.

---

### Cíle Make (abecedně) {#make-targets-alphabetical}

Makefile sjednocuje běžné vývojové postupy. Pusťte `make help` kdykoli pro jednořádkové shrnutí každého cíle.

Tip: spuštění `make` bez cíle otevře jednoduché menu Whiptail pro výběr cíle.

| Cíl                                                      | Jednořádkový popis                                                                                  |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Odstranit lokální artefakty buildu/preview (tmp/, web-local-preview/, website/build/).              |
| [`commit`](#mt-commit)                                   | Formátovat, spustit testy (vč. i18n), aktualizovat changelog, commit a push.                        |
| [`eslint`](#mt-eslint)                                   | Spustit ESLint přes flat config (`npm run -s lint:eslint`).                                         |
| [`help`](#mt-help)                                       | Vypsat všechny cíle s jednořádkovou dokumentací (seřazené).                                         |
| [`lint`](#mt-lint)                                       | web‑ext lint na `sources/` (dočasný manifest; ignoruje ZIPy; nefatální).                            |
| [`menu`](#mt-menu)                                       | Interaktivní menu pro výběr cíle a volitelných argumentů.                                           |
| [`pack`](#mt-pack)                                       | Sestavit ATN a LOCAL ZIPy (spustí linter; volá balicí skript).                                      |
| [`prettier`](#mt-prettier)                               | Naformátovat repozitář na místě (zapíše změny).                                                     |
| [`prettier_check`](#mt-prettier_check)                   | Prettier v režimu kontroly (bez zápisu); selže, pokud je potřeba přeformátovat.                     |
| [`prettier_write`](#mt-prettier_write)                   | Alias pro `prettier`.                                                                               |
| [`test`](#mt-test)                                       | Prettier (zápis), ESLint, poté Vitest (coverage, pokud je nastaven).                                |
| [`test_i18n`](#mt-test_i18n)                             | Pouze i18n testy: zástupné symboly/parita doplňku + parita webu.                                    |
| [`translate_app`](#mt-translation-app)                   | Alias pro `translation_app`.                                                                        |
| [`translation_app`](#mt-translation-app)                 | Přeložit řetězce UI aplikace z `sources/_locales/en/messages.json`.                                 |
| [`translate_web_docs_batch`](#mt-translation-web)        | Přeložit webovou dokumentaci přes OpenAI Batch API (preferováno).                                   |
| [`translate_web_docs_sync`](#mt-translation-web)         | Přeložit webovou dokumentaci synchronně (legacy, bez batch).                                        |
| [`translate_web_index`](#mt-translation_web_index)       | Alias pro `translation_web_index`.                                                                  |
| [`translation_web_index`](#mt-translation_web_index)     | Přeložit UI domovské stránky/navigace/patičky (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Sestavit dokumenty do `website/build` (podporuje `--locales` / `BUILD_LOCALES`).                    |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Bezpečná kontrola odkazů offline (přeskakuje vzdálené HTTP[S]).                                     |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Místní náhled gh‑pages; automaticky naslouchá na 8080–8090; volitelné testy/kontrola odkazů.        |
| [`web_push_github`](#mt-web_push_github)                 | Odeslat `website/build` do větve `gh-pages`.                                                        |

Syntaxe pro volby

- Použijte `make <command> OPTS="…"` pro předání voleb (doporučeny uvozovky). Každý cíl níže uvádí příklad použití.

--

-

#### Tipy pro build lokalizací {#locale-build-tips}

- Sestavte podmnožinu lokalizací: nastavte `BUILD_LOCALES="en de"` nebo předejte `OPTS="--locales en,de"` webovým cílům.
- Náhled konkrétní lokalizace: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Sestavení a balení {#build-and-package}

- Sestavit ZIPy: `make pack`
- Vytvoří ATN a LOCAL ZIPy v kořeni repozitáře (artefakty neupravujte ručně)
- Tip: před balením aktualizujte verzi jak v `sources/manifest_ATN.json`, tak v `sources/manifest_LOCAL.json`
- Ruční instalace (vývoj): Thunderbird → Nástroje → Doplňky a motivy → ozubené kolo → Instalovat doplněk ze souboru… → vyberte sestavený ZIP

---

### Test {#test}

- Plná sada: `make test` (Vitest)
- Coverage (volitelné):
- `npm i -D @vitest/coverage-v8`
- Spusťte `make test`; otevřete `coverage/index.html` pro HTML report
- Jen i18n: `make test_i18n` (klíče/zástupné symboly/tituly UI + parita webu za lokalitu a dokument s kontrolami id/title/sidebar_label)

---

### Ladění a logy {#debugging-and-logs}

- Chybová konzole: Nástroje → Nástroje pro vývojáře → Chybová konzole
- Přepínání podrobných logů za běhu:
- Zapnout: `messenger.storage.local.set({ debug: true })`
- Vypnout: `messenger.storage.local.set({ debug: false })`
- Logy se zobrazují při psaní/odesílání odpovědí

---

### Dokumentace (web) {#docs-website}

- Dev server: `cd website && npm run start`
- Sestavení statického webu: `cd website && npm run build`
- Ekvivalenty v Make (abecedně): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Příklady použití:
- Jen EN, přeskočit testy/kontrolu odkazů, bez push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Všechny jazyky, s testy/kontrolou odkazů, poté push: `make web_build_local_preview && make web_push_github`
- Před publikováním spusťte bezpečnou kontrolu odkazů offline: `make web_build_linkcheck`.
- i18n: Angličtina je v `website/docs/*.md`; německé překlady v `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Vyhledávání: Pokud jsou v CI nastaveny proměnné prostředí Algolia DocSearch (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), web použije vyhledávání Algolia; jinak spadne na lokální vyhledávání. Na domovské stránce stiskněte `/` nebo `Ctrl+K` pro otevření vyhledávacího pole.

---

#### Přesměrovací trasa pro darování {#donate-redirect}

- `website/src/pages/donate.js`
- Trasa: `/donate` (a `/<locale>/donate`)
- Chování:
- Pokud má aktuální trasa lokalizaci (např. `/de/donate`), použije ji
- Jinak vybere nejlepší shodu z `navigator.languages` vůči nakonfigurovaným lokalizacím; v případě potřeby spadne na výchozí lokalizaci
- Přesměrovává na:
- `en` → `/docs/donation`
- ostatní → `/<locale>/docs/donation`
- Používá `useBaseUrl` pro správné zacházení s baseUrl
- Zahrnuje meta refresh + odkaz `noscript` jako zálohu

---

---

#### Tipy pro náhled {#preview-tips}

- Čisté ukončení Node náhledu: otevřete `http://localhost:<port>/__stop` (vytištěno po `Local server started`).
- Pokud se v MDX/JSX nenačítají obrázky, použijte `useBaseUrl('/img/...')` pro respektování `baseUrl` webu.
- Náhled se spustí nejprve; kontrola odkazů běží poté a je neblokující (rozbité externí odkazy náhled nezastaví).
- Příklad URL náhledu: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (vytištěno po „Local server started“).
- Externí odkazy v kontrolách: Některé externí weby (např. addons.thunderbird.net) blokují automatické procházení a mohou v kontrolách odkazů vracet 403. Náhled se i tak spustí; tyto chyby lze ignorovat.

---

#### Překlad webu {#translate-website}

Co můžete překládat

- Pouze UI webu: domovská stránka, navigace, patička a další řetězce UI. Obsah dokumentace zatím zůstává pouze v angličtině.

Kde upravovat

- Upravte `website/i18n/<locale>/code.json` (jako referenci použijte `en`). Zástupné symboly jako `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` ponechte beze změny.

Vygenerovat nebo obnovit soubory

- Vytvořit chybějící šablony pro všechny jazyky: `npm --prefix website run i18n:stubs`
- Přepsat šablony z angličtiny (po přidání nových řetězců): `npm --prefix website run i18n:stubs:force`
- Alternativa pro jedinou lokalizaci: `npx --prefix website docusaurus write-translations --locale <locale>`

Přeložit řetězce UI domovské stránky/navigace/patičky (OpenAI)

- Nastavte přihlašovací údaje jednou (shell nebo .env):
- `export OPENAI_API_KEY=sk-...`
- Volitelné: `export OPENAI_MODEL=gpt-4o-mini`
- Jednorázově (všechny jazyky, kromě en): `make translate_web_index`
- Omezit na konkrétní jazyky: `make translate_web_index OPTS="--locales de,fr"`
- Přepsat existující hodnoty: `make translate_web_index OPTS="--force"`

Validace a opakování

- Překladový skript validuje tvar JSON, zachovává zástupné symboly v složených závorkách a zajišťuje nezměněné URL.
- Při selhání validace provede až 2 opakování s feedbackem, než ponechá stávající hodnoty.

Náhled vaší lokalizace

- Dev server: `npm --prefix website run start`
- Navštivte `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Odeslání

- Otevřete PR s upraveným(i) souborem/soubory `code.json`. Udržujte změny zaměřené a pokud možno přiložte rychlý snímek obrazovky.

---

### Tipy k zabezpečení a konfiguraci {#security-and-configuration-tips}

- Necommitujte `sources/manifest.json` (vytvořen dočasně během buildu)
- Udržujte `browser_specific_settings.gecko.id` stabilní pro zachování aktualizačního kanálu

---

### Perzistence nastavení {#settings-persistence}

- Úložiště: Všechna uživatelská nastavení jsou v `storage.local` a přetrvávají napříč aktualizacemi doplňku.
- Instalace: Výchozí hodnoty se aplikují pouze tehdy, pokud klíč striktně chybí (undefined).
- Aktualizace: Migrace doplní pouze chybějící klíče; existující hodnoty se nikdy nepřepisují.
- Značka schématu: `settingsVersion` (aktuálně `1`).
- Klíče a výchozí hodnoty:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kód: viz `sources/background.js` → `initializeOrMigrateSettings()` a `SCHEMA_VERSION`.

Vývojový postup (přidání nového nastavení)

- Zvyšte `SCHEMA_VERSION` v `sources/background.js`.
- Přidejte nový klíč + výchozí hodnotu do objektu `DEFAULTS` v `initializeOrMigrateSettings()`.
- Při seedování výchozích hodnot použijte pravidlo „only-if-undefined“; nepřepisujte existující hodnoty.
- Pokud je nastavení viditelné uživateli, zapojte jej v `sources/options.js` a přidejte lokalizované řetězce.
- Přidejte/upravte testy (viz `tests/background.settings.migration.test.js`).

Tipy pro ruční testování

- Simulace čisté instalace: vymažte datový adresář rozšíření nebo spusťte s novým profilem.
- Simulace aktualizace: nastavte `settingsVersion` na `0` v `storage.local` a znovu načtěte; ověřte, že existující hodnoty zůstaly nezměněny a byly doplněny jen chybějící klíče.

---

### Řešení problémů {#troubleshooting}

- Ujistěte se, že Thunderbird je ve verzi 128 ESR nebo novější
- Pro problémy za běhu použijte Chybovou konzoli
- Pokud se zdá, že uložená nastavení nejsou správně aplikována, restartujte Thunderbird a zkuste to znovu. (Thunderbird může mezi relacemi kešovat stav; restart zajistí načtení čerstvých nastavení.)

---

### CI a pokrytí {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) spouští vitest s prahy pokrytí (85 % řádků/funkcí/větví/výroků). Pokud nejsou prahy splněny, úloha selže.
- Workflow nahrává artefakt `coverage-html` s HTML reportem; stáhněte jej ze stránky běhu (Actions → poslední běh → Artifacts).

---

### Přispívání {#contributing}

- Viz CONTRIBUTING.md pro pravidla pro větve/commity/PR
- Tip: Pro testování si vytvořte samostatný vývojový profil Thunderbirdu, abyste neovlivnili svůj denní profil.

---

### Překlady

- Spouštění velkých překladových úloh „vše → vše“ může být pomalé a nákladné. Začněte s podmnožinou (např. pár dokumentů a 1–2 jazyky), výsledek zkontrolujte a teprve pak rozsah rozšiřte.

---

- Politika opakování: překladové úlohy provedou až 3 pokusy s exponenciálním zpožďováním při chybách API; viz `scripts/translate_web_docs_batch.js` a `scripts/translate_web_docs_sync.js`.

Snímky obrazovky pro dokumentaci

- Obrázky ukládejte pod `website/static/img/`.
- Odkazujte na ně v MD/MDX přes `useBaseUrl('/img/<filename>')`, aby cesty fungovaly s `baseUrl` webu.
- Po přidání nebo přejmenování obrázků pod `website/static/img/` ověřte, že všechny odkazy stále používají `useBaseUrl('/img/…')` a renderují se v místním náhledu.
  Favikony

- Vícevelikostní `favicon.ico` se generuje automaticky ve všech build cestách (Make + skripty) přes `website/scripts/build-favicon.mjs`.
- Není potřeba žádný ruční krok; stačí aktualizovat `icon-*.png`.
  Tip pro kontrolu

- Ponechte front‑matter `id` v přeložených dokumentech beze změny; překládejte pouze `title` a `sidebar_label`, pokud jsou přítomny.

#### clean {#mt-clean}

- Účel: odstranit lokální artefakty buildu/preview.
- Použití: `make clean`
- Odstraní (pokud existuje):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Účel: formátovat, testovat, aktualizovat changelog, commitnout a pushnout.
- Použití: `make commit`
- Podrobnosti: spustí Prettier (zápis), `make test`, `make test_i18n`; připojí záznam do changelogu, pokud jsou staged rozdíly; pushne do `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Účel: spustit ESLint přes flat config.
- Použití: `make eslint`

---

#### help {#mt-help}

- Účel: vypsat všechny cíle s jednořádkovou dokumentací.
- Použití: `make help`

---

#### lint {#mt-lint}

- Účel: lintovat MailExtension pomocí `web-ext`.
- Použití: `make lint`
- Poznámky: dočasně kopíruje `sources/manifest_LOCAL.json` → `sources/manifest.json`; ignoruje sestavené ZIPy; varování neukončí pipeline.

---

#### menu {#mt-menu}

- Účel: interaktivní menu pro výběr Make cíle a volitelných argumentů.
- Použití: spusťte `make` bez argumentů.
- Poznámky: pokud není dostupný `whiptail`, menu spadne na `make help`.

---

#### pack {#mt-pack}

- Účel: sestavit ATN a LOCAL ZIPy (závisí na `lint`).
- Použití: `make pack`
- Tip: před balením zvyšte verze v obou `sources/manifest_*.json`.

---

#### prettier {#mt-prettier}

- Účel: naformátovat repozitář na místě.
- Použití: `make prettier`

#### prettier_check {#mt-prettier_check}

- Účel: ověřit formátování (bez zápisu).
- Použití: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Účel: alias pro `prettier`.
- Použití: `make prettier_write`

---

#### test {#mt-test}

- Účel: spustit Prettier (zápis), ESLint a poté Vitest (coverage, pokud je nainstalován).
- Použití: `make test`

#### test_i18n {#mt-test_i18n}

- Účel: testy zaměřené na i18n pro řetězce doplňku a webové dokumenty.
- Použití: `make test_i18n`
- Spouští: `npm run test:i18n` a `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Účel: přeložit řetězce UI doplňku z EN do dalších lokalizací.
- Použití: `make translation_app OPTS="--locales all|de,fr"`
- Poznámky: zachovává strukturu klíčů a zástupné symboly; loguje do `translation_app.log`. Podoba skriptu: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Účel: přeložit webové dokumenty z `website/docs/*.md` do `website/i18n/<locale>/...`.
- Preferováno: `translate_web_docs_batch` (OpenAI Batch API)
  - Použití (flagy): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Stále je přijata i legacy poziční syntaxe: `OPTS="<doc|all> <lang|all>"`
- Chování: sestaví JSONL, nahraje, každých 30 s polluje, stáhne výsledky, zapíše soubory.
- Pozn.: batch úloha může trvat až 24 hodin (dle okna OpenAI batch). Konzole při každém pollu ukazuje uplynulý čas.
- Prostředí: `OPENAI_API_KEY` (povinné), volitelně `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (výchozí 24 h), `BATCH_POLL_INTERVAL_MS`.
- Legacy: `translate_web_docs_sync`
  - Použití (flagy): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Stále je přijata i legacy poziční syntaxe: `OPTS="<doc|all> <lang|all>"`
- Chování: synchronní požadavky po dvojicích (bez batch agregace).
- Poznámky: Interaktivní výzvy, pokud je vynechán `OPTS`. Oba režimy zachovávají bloky/inline kódu a ponechávají front‑matter `id` beze změny; logují do `translation_web_batch.log` (batch) nebo `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Účel: přeložit řetězce UI webu (domovská stránka, navigace, patička) z `website/i18n/en/code.json` do všech lokalizací pod `website/i18n/<locale>/code.json` (kromě `en`).
- Použití: `make translate_web_index` nebo `make translate_web_index OPTS="--locales de,fr [--force]"`
- Požadavky: exportujte `OPENAI_API_KEY` (volitelně: `OPENAI_MODEL=gpt-4o-mini`).
- Chování: validuje strukturu JSON, zachovává zástupné symboly ve složených závorkách, ponechává URL beze změny a při validačních chybách opakuje s feedbackem.

---

#### web_build {#mt-web_build}

- Účel: sestavit web s dokumentací do `website/build`.
- Použití: `make web_build OPTS="--locales en|de,en|all"` (nebo nastavte `BUILD_LOCALES="en de"`)
- Vnitřnosti: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Závislosti: spustí `npm ci` v `website/` pouze pokud chybí `website/node_modules/@docusaurus`.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Účel: bezpečná kontrola odkazů offline.
- Použití: `make web_build_linkcheck OPTS="--locales en|all"`
- Poznámky: sestaví do `tmp_linkcheck_web_pages`; přepíše GH Pages `baseUrl` na `/`; přeskakuje vzdálené HTTP(S) odkazy.

#### web_build_local_preview {#mt-web_build_local_preview}

- Účel: místní náhled gh‑pages s volitelnými testy/kontrolou odkazů.
- Použití: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Chování: nejprve se pokusí o Node preview server (`scripts/preview-server.mjs`, podporuje `/__stop`), poté spadne na `python3 -m http.server`; servíruje na 8080–8090; PID na `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Účel: odeslat `website/build` do větve `gh-pages`.
- Použití: `make web_push_github`

Tip: nastavte `NPM=…` pro přepsání správce balíčků používaného v Makefile (výchozí je `npm`).

---
