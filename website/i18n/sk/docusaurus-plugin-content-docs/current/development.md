---
id: development
title: 'Vývoj'
sidebar_label: 'Vývoj'
---

---

## Príručka pre vývojárov {#development-guide}

:::note Upravujte iba anglickú verziu; preklady sa propagujú
Aktualizujte dokumentáciu **len** pod `website/docs` (angličtina). Preklady pod `website/i18n/<locale>/…` sú generované a nemali by sa upravovať manuálne. Na obnovenie lokalizovaného obsahu použite prekladové úlohy (napr. `make translate_web_docs_batch`).
:::

### Predpoklady {#prerequisites}

- Node.js 22+ a npm (testované s Node 22)
- Thunderbird 128 ESR alebo novší (na manuálne testovanie)

---

### Rozloženie projektu (vysoká úroveň) {#project-layout-high-level}

- Koreňový adresár: baliaci skript `distribution_zip_packer.sh`, dokumentácia, snímky obrazovky
- `sources/`: hlavný kód doplnku (pozadie, UI nastavení/vyskakovacieho okna, manifesty, ikony)
- `tests/`: sada Vitest
- `website/`: dokumentácia Docusaurus (s i18n pod `website/i18n/de/...`)

---

### Inštalácia a nástroje {#install-and-tooling}

- Nainštalovať koreňové závislosti: `npm ci`
- Dokumentácia (voliteľné): `cd website && npm ci`
- Zistiť dostupné ciele: `make help`

---

### Živý vývoj (web‑ext run) {#live-dev-web-ext}

- Rýchly cyklus vo Firefox Desktop (iba smoke testy UI):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Spustiť v Thunderbirde (uprednostnené pre MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Tipy:
- Majte otvorenú Chybovú konzolu Thunderbirdu (Nástroje → Vývojárske nástroje → Chybová konzola).
- Stránky udalostí MV3 sa pri nečinnosti pozastavujú; po zmenách kódu doplnok znovu načítajte alebo nechajte web‑ext automaticky reštartovať.
- Niektoré správania špecifické pre Firefox sa líšia; vždy overte v Thunderbirde kvôli parite API.
- Cesty k binárkam Thunderbirdu (príklady):
- Linux: `thunderbird` (napr. `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Izolácia profilu: Použite samostatný profil Thunderbirdu na vývoj, aby ste neovplyvnili svoje bežné nastavenie.

---

### Ciele Make (abecedne) {#make-targets-alphabetical}

Makefile štandardizuje bežné vývojové postupy. Spustite `make help` kedykoľvek pre jedno‑riadkový prehľad každého cieľa.

Tip: spustením `make` bez cieľa sa otvorí jednoduché menu Whiptail na výber cieľa.

| Cieľ                                                     | Jednoriadkový popis                                                                               |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Odstráni lokálne artefakty build/preview (tmp/, web-local-preview/, website/build/).              |
| [`commit`](#mt-commit)                                   | Formátuje, spustí testy (vrátane i18n), aktualizuje changelog, urobí commit a push.               |
| [`eslint`](#mt-eslint)                                   | Spustí ESLint cez flat config (`npm run -s lint:eslint`).                                         |
| [`help`](#mt-help)                                       | Vypíše všetky cieľe s jednoriadkovými popismi (zoradené).                                         |
| [`lint`](#mt-lint)                                       | web‑ext lint na `sources/` (dočasný manifest; ignoruje ZIPy; nefatálne).                          |
| [`menu`](#mt-menu)                                       | Interaktívne menu na výber cieľa a voliteľných argumentov.                                        |
| [`pack`](#mt-pack)                                       | Zostaví ATN a LOCAL ZIPy (spustí linter; zavolá baliaci skript).                                  |
| [`prettier`](#mt-prettier)                               | Formátuje repozitár na mieste (zapíše zmeny).                                                     |
| [`prettier_check`](#mt-prettier_check)                   | Prettier v režime kontroly (bez zápisu); zlyhá, ak je potrebné preformátovanie.                   |
| [`prettier_write`](#mt-prettier_write)                   | Alias pre `prettier`.                                                                             |
| [`test`](#mt-test)                                       | Prettier (zápis), ESLint, potom Vitest (pokrývanie, ak je nakonfigurované).                       |
| [`test_i18n`](#mt-test_i18n)                             | Testy len i18n: zástupné znaky/parita doplnku + parita webu.                                      |
| [`translate_app`](#mt-translation-app)                   | Alias pre `translation_app`.                                                                      |
| [`translation_app`](#mt-translation-app)                 | Preloží reťazce UI aplikácie z `sources/_locales/en/messages.json`.                               |
| [`translate_web_docs_batch`](#mt-translation-web)        | Preloží dokumenty webu cez OpenAI Batch API (preferované).                                        |
| [`translate_web_docs_sync`](#mt-translation-web)         | Preloží dokumenty webu synchronne (legacy, bez batch).                                            |
| [`translate_web_index`](#mt-translation_web_index)       | Alias pre `translation_web_index`.                                                                |
| [`translation_web_index`](#mt-translation_web_index)     | Preloží UI domovskej stránky/navigácie/päty (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Zostaví dokumenty do `website/build` (podporuje `--locales` / `BUILD_LOCALES`).                   |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Kontrola odkazov bezpečná offline (preskakuje vzdialené HTTP[S]).                                 |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Lokálny náhľad gh‑pages; automatické servovanie na 8080–8090; voliteľné testy/kontrola odkazov.   |
| [`web_push_github`](#mt-web_push_github)                 | Push `website/build` do vetvy `gh-pages`.                                                         |

Syntax pre voľby

- Použite `make <command> OPTS="…"` na odovzdanie volieb (odporúčané úvodzovky). Každý cieľ nižšie ukazuje príklad použitia.

--

-

#### Tipy pre zostavenie lokalizácií {#locale-build-tips}

- Zostavte len podmnožinu lokalít: nastavte `BUILD_LOCALES="en de"` alebo prepnite `OPTS="--locales en,de"` pre webové ciele.
- Náhľad konkrétnej lokality: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Zostavenie a balenie {#build-and-package}

- Zostaviť ZIPy: `make pack`
- Vytvorí ATN a LOCAL ZIPy v koreňovom adresári repozitára (neupravujte artefakty ručne)
- Tip: pred balením aktualizujte verziu v `sources/manifest_ATN.json` aj `sources/manifest_LOCAL.json`
- Manuálna inštalácia (vývoj): Thunderbird → Nástroje → Doplnky a témy → ozubené koliesko → Inštalovať doplnok zo súboru… → vyberte vytvorený ZIP

---

### Testovanie {#test}

- Celá sada: `make test` (Vitest)
- Pokrývanie (voliteľné):
- `npm i -D @vitest/coverage-v8`
- Spustite `make test`; otvorte `coverage/index.html` pre HTML report
- Len i18n: `make test_i18n` (UI kľúče/zástupné znaky/názvy + parita webu na úrovni lokality a dokumentu s kontrolami id/title/sidebar_label)

---

### Ladenie a logy {#debugging-and-logs}

- Chybová konzola: Nástroje → Vývojárske nástroje → Chybová konzola
- Prepínať podrobné logy za behu:
- Povoliť: `messenger.storage.local.set({ debug: true })`
- Zakázať: `messenger.storage.local.set({ debug: false })`
- Logy sa zobrazujú počas písania/odosielania odpovedí

---

### Dokumentácia (web) {#docs-website}

- Vývojový server: `cd website && npm run start`
- Build statickej stránky: `cd website && npm run build`
- Ekvivalenty Make (abecedne): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Príklady použitia:
- Len EN, preskočiť testy/kontrolu odkazov, bez push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Všetky lokality, s testami/kontrolou odkazov, potom push: `make web_build_local_preview && make web_push_github`
- Pred publikovaním spustite kontrolu odkazov bezpečnú offline: `make web_build_linkcheck`.
- i18n: angličtina je v `website/docs/*.md`; nemecké preklady v `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Vyhľadávanie: Ak sú v CI nastavené premenné prostredia Algolia DocSearch (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), stránka používa vyhľadávanie Algolia; inak sa použije lokálne vyhľadávanie. Na domovskej stránke stlačte `/` alebo `Ctrl+K` na otvorenie vyhľadávacieho poľa.

---

#### Trasa presmerovania darovania {#donate-redirect}

- `website/src/pages/donate.js`
- Trasa: `/donate` (a `/<locale>/donate`)
- Správanie:
- Ak aktuálna trasa obsahuje lokalitu (napr. `/de/donate`), použije sa
- Inak sa vyberie najlepšia zhoda z `navigator.languages` oproti nakonfigurovaným lokalitám; v prípade zlyhania sa použije predvolená lokalita
- Presmeruje na:
- `en` → `/docs/donation`
- ostatné → `/<locale>/docs/donation`
- Používa `useBaseUrl` na správne spracovanie baseUrl
- Obsahuje meta refresh + odkaz `noscript` ako zálohu

---

---

#### Tipy pre náhľad {#preview-tips}

- Ukončite náhľad Node čistým spôsobom: otvorte `http://localhost:<port>/__stop` (vypíše sa po `Local server started`).
- Ak sa obrázky v MDX/JSX nenačítajú, použite `useBaseUrl('/img/...')`, aby sa rešpektovalo `baseUrl` webu.
- Náhľad sa spustí najprv; kontrola odkazov beží následne a neblokuje (nefunkčné externé odkazy náhľad nezastavia).
- Príklad URL náhľadu: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (vypíše sa po „Local server started“).
- Externé odkazy v kontrole: Niektoré externé stránky (napr. addons.thunderbird.net) blokujú automatických crawlerov a v kontrolách odkazov môžu vracať 403. Náhľad sa aj tak spustí; tieto je bezpečné ignorovať.

---

#### Preklad webu {#translate-website}

Čo môžete prekladať

- Len UI webu: domovskú stránku, navigáciu, pätu a ďalšie UI reťazce. Obsah dokumentácie zatiaľ ostáva iba v angličtine.

Kde upravovať

- Upravte `website/i18n/<locale>/code.json` (ako referenciu použite `en`). Zachovajte nezmenené zástupné znaky ako `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}`.

Generovať alebo obnoviť súbory

- Vytvoriť chýbajúce stuby pre všetky lokality: `npm --prefix website run i18n:stubs`
- Prepísať stuby z angličtiny (po pridaní nových reťazcov): `npm --prefix website run i18n:stubs:force`
- Alternatíva pre jednu lokalitu: `npx --prefix website docusaurus write-translations --locale <locale>`

Preložiť reťazce UI domovskej stránky/navigácie/päty (OpenAI)

- Nastavte prihlasovacie údaje raz (shell alebo .env):
- `export OPENAI_API_KEY=sk-...`
- Voliteľné: `export OPENAI_MODEL=gpt-4o-mini`
- Jednorazovo (všetky lokality, bez en): `make translate_web_index`
- Obmedziť na konkrétne lokality: `make translate_web_index OPTS="--locales de,fr"`
- Prepísať existujúce hodnoty: `make translate_web_index OPTS="--force"`

Validácia a opakovania

- Prekladový skript validuje tvar JSONu, zachováva zástupné znaky v zložených zátvorkách a zabezpečuje, že URL ostanú nezmenené.
- Pri zlyhaní validácie skúsi s odozvou až 2 opakovania, potom ponechá existujúce hodnoty.

Náhľad vašej lokality

- Vývojový server: `npm --prefix website run start`
- Navštívte `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Odoslanie

- Otvorte PR s upraveným(i) súborom(i) `code.json`. Udržte zmeny zamerané a ak je to možné, priložte rýchly snímok obrazovky.

---

### Tipy k zabezpečeniu a konfigurácii {#security-and-configuration-tips}

- Nekomitujte `sources/manifest.json` (dočasne vytvorené buildom)
- Udržujte `browser_specific_settings.gecko.id` stabilné, aby sa zachoval kanál aktualizácií

---

### Perzistencia nastavení {#settings-persistence}

- Úložisko: Všetky používateľské nastavenia sú v `storage.local` a pretrvávajú naprieč aktualizáciami doplnku.
- Inštalácia: Predvolené hodnoty sa použijú len vtedy, keď kľúč striktne chýba (undefined).
- Aktualizácia: Migrácia doplní iba chýbajúce kľúče; existujúce hodnoty sa nikdy neprepisujú.
- Značka schémy: `settingsVersion` (aktuálne `1`).
- Kľúče a predvoľby:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kód: pozrite `sources/background.js` → `initializeOrMigrateSettings()` a `SCHEMA_VERSION`.

Vývojový postup (pridanie nového nastavenia)

- Zvýšte `SCHEMA_VERSION` v `sources/background.js`.
- Pridajte nový kľúč + predvolenú hodnotu do objektu `DEFAULTS` v `initializeOrMigrateSettings()`.
- Pri seedovaní predvolieb použite pravidlo „iba ak je undefined“; neprepisujte existujúce hodnoty.
- Ak je nastavenie viditeľné pre používateľa, napojte ho v `sources/options.js` a pridajte lokalizované reťazce.
- Pridajte/upravte testy (pozri `tests/background.settings.migration.test.js`).

Tipy na manuálne testovanie

- Simulujte čistú inštaláciu: vymažte adresár dát rozšírenia alebo spustite s novým profilom.
- Simulujte aktualizáciu: nastavte `settingsVersion` na `0` v `storage.local` a znovu načítajte; overte, že existujúce hodnoty zostali nezmenené a boli pridané iba chýbajúce kľúče.

---

### Riešenie problémov {#troubleshooting}

- Uistite sa, že Thunderbird je 128 ESR alebo novší
- Na problémy za behu použite Chybovú konzolu
- Ak sa zdá, že uložené nastavenia sa neaplikujú správne, reštartujte Thunderbird a skúste znova. (Thunderbird môže medzi reláciami kešovať stav; reštart zaistí načítanie čerstvých nastavení.)

---

### CI a pokrytie {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) spúšťa vitest s prahmi pokrytia (85 % riadkov/funkcií/vetiev/výrokov). Ak prahy nie sú splnené, úloha zlyhá.
- Workflow nahrá artefakt `coverage-html` s HTML reportom; stiahnite si ho zo stránky behu (Actions → posledný beh → Artifacts).

---

### Prispievanie {#contributing}

- Pozrite CONTRIBUTING.md pre pokyny k vetvám/commitom/PR
- Tip: Na testovanie si vytvorte samostatný vývojový profil Thunderbirdu, aby ste neovplyvnili svoj každodenný profil.

---

### Preklady

- Spúšťanie veľkých prekladov „všetko → všetko“ môže byť pomalé a nákladné. Začnite s podmnožinou (napr. pár dokumentov a 1–2 lokality), skontrolujte výsledok a potom rozšírte.

---

- Politika opakovaní: prekladové úlohy vykonajú až 3 pokusy s exponenciálnym oneskorením pri chybách API; pozri `scripts/translate_web_docs_batch.js` a `scripts/translate_web_docs_sync.js`.

Snímky obrazovky pre dokumentáciu

- Ukladajte obrázky pod `website/static/img/`.
- Odkazujte na ne v MD/MDX cez `useBaseUrl('/img/<filename>')`, aby cesty fungovali so `baseUrl` webu.
- Po pridaní alebo premenovaní obrázkov pod `website/static/img/` potvrďte, že všetky odkazy stále používajú `useBaseUrl('/img/…')` a zobrazujú sa v lokálnom náhľade.
  Favikony

- Viacveľkostný `favicon.ico` sa generuje automaticky vo všetkých build cestách (Make + skripty) cez `website/scripts/build-favicon.mjs`.
- Nie je potrebný žiadny manuálny krok; stačí aktualizovať `icon-*.png`.
  Tip na kontrolu

- V preložených dokumentoch ponechajte front‑matter `id` nezmenený; prekladajte len `title` a `sidebar_label`, ak sú prítomné.

#### clean {#mt-clean}

- Účel: odstrániť lokálne artefakty build/preview.
- Použitie: `make clean`
- Odstraňuje (ak sú prítomné):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Účel: formátovať, testovať, aktualizovať changelog, commitnúť a pushnúť.
- Použitie: `make commit`
- Podrobnosti: spustí Prettier (zápis), `make test`, `make test_i18n`; pridá záznam do changelogu, keď sú pripravené rozdiely; pushne do `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Účel: spustiť ESLint cez flat config.
- Použitie: `make eslint`

---

#### help {#mt-help}

- Účel: vypísať všetky ciele s jednoriadkovými popismi.
- Použitie: `make help`

---

#### lint {#mt-lint}

- Účel: lintovať MailExtension pomocou `web-ext`.
- Použitie: `make lint`
- Poznámky: dočasne kopíruje `sources/manifest_LOCAL.json` → `sources/manifest.json`; ignoruje vytvorené ZIPy; varovania nezlyhajú pipeline.

---

#### menu {#mt-menu}

- Účel: interaktívne menu na výber Make cieľa a voliteľných argumentov.
- Použitie: spustite `make` bez argumentov.
- Poznámky: ak `whiptail` nie je dostupný, menu sa vráti k `make help`.

---

#### pack {#mt-pack}

- Účel: zostaviť ATN a LOCAL ZIPy (závisí od `lint`).
- Použitie: `make pack`
- Tip: zvýšte verzie v oboch `sources/manifest_*.json` pred balením.

---

#### prettier {#mt-prettier}

- Účel: formátovať repozitár na mieste.
- Použitie: `make prettier`

#### prettier_check {#mt-prettier_check}

- Účel: overiť formátovanie (bez zápisu).
- Použitie: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Účel: alias pre `prettier`.
- Použitie: `make prettier_write`

---

#### test {#mt-test}

- Účel: spustiť Prettier (zápis), ESLint a potom Vitest (pokrývanie, ak je nainštalované).
- Použitie: `make test`

#### test_i18n {#mt-test_i18n}

- Účel: testy zamerané na i18n pre reťazce doplnku a dokumenty webu.
- Použitie: `make test_i18n`
- Spúšťa: `npm run test:i18n` a `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Účel: preložiť UI reťazce doplnku z EN do iných lokalít.
- Použitie: `make translation_app OPTS="--locales all|de,fr"`
- Poznámky: zachováva štruktúru kľúčov a zástupné znaky; loguje do `translation_app.log`. Skriptová forma: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Účel: preložiť dokumenty webu z `website/docs/*.md` do `website/i18n/<locale>/...`.
- Preferované: `translate_web_docs_batch` (OpenAI Batch API)
  - Použitie (flagy): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Stále je akceptované staršie pozičné: `OPTS="<doc|all> <lang|all>"`
- Správanie: zostaví JSONL, nahrá, polluje každých 30 s, stiahne výsledky, zapíše súbory.
- Poznámka: dávková úloha môže trvať až 24 hodín (podľa batch okna OpenAI). Konzola pri každom polli zobrazuje uplynutý čas.
- Prostredie: `OPENAI_API_KEY` (povinné), voliteľné `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (predvolene 24 h), `BATCH_POLL_INTERVAL_MS`.
- Staršie: `translate_web_docs_sync`
  - Použitie (flagy): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Stále je akceptované staršie pozičné: `OPTS="<doc|all> <lang|all>"`
- Správanie: synchronné požiadavky po pároch (bez dávkovej agregácie).
- Poznámky: Interaktívne výzvy, keď je `OPTS` vynechané. Obe režimy zachovávajú bloky kódu/inline kód a ponechávajú front‑matter `id` nezmenené; loguje do `translation_web_batch.log` (batch) alebo `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Účel: preložiť UI reťazce webu (domovská stránka, navigácia, päta) z `website/i18n/en/code.json` do všetkých lokalít pod `website/i18n/<locale>/code.json` (s výnimkou `en`).
- Použitie: `make translate_web_index` alebo `make translate_web_index OPTS="--locales de,fr [--force]"`
- Požiadavky: exportovať `OPENAI_API_KEY` (voliteľné: `OPENAI_MODEL=gpt-4o-mini`).
- Správanie: validuje štruktúru JSON, zachováva zástupné znaky v zložených zátvorkách, ponecháva URL nezmenené a pri chybách validácie opakuje s odozvou.

---

#### web_build {#mt-web_build}

- Účel: zostaviť stránku dokumentácie do `website/build`.
- Použitie: `make web_build OPTS="--locales en|de,en|all"` (alebo nastavte `BUILD_LOCALES="en de"`)
- Vnútornosti: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Závislosti: spúšťa `npm ci` v `website/` len ak chýba `website/node_modules/@docusaurus`.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Účel: kontrola odkazov bezpečná offline.
- Použitie: `make web_build_linkcheck OPTS="--locales en|all"`
- Poznámky: zostavuje do `tmp_linkcheck_web_pages`; prepisuje GH Pages `baseUrl` na `/`; preskakuje vzdialené HTTP(S) odkazy.

#### web_build_local_preview {#mt-web_build_local_preview}

- Účel: lokálny náhľad gh‑pages s voliteľnými testami/kontrolou odkazov.
- Použitie: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Správanie: najprv skúša Node preview server (`scripts/preview-server.mjs`, podporuje `/__stop`), v prípade zlyhania prejde na `python3 -m http.server`; servuje na 8080–8090; PID v `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Účel: pushnúť `website/build` do vetvy `gh-pages`.
- Použitie: `make web_push_github`

Tip: nastavte `NPM=…` na zmenu správcu balíkov používaného Makefile (predvolene `npm`).

---
