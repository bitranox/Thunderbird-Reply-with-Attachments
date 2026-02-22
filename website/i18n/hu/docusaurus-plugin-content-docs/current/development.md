---
id: development
title: 'Fejlesztés'
sidebar_label: 'Fejlesztés'
---

---

## Fejlesztési útmutató {#development-guide}

:::note Csak az angol verziót szerkeszd; a fordítások automatikusan frissülnek
A dokumentációt kizárólag a `website/docs` (angol) alatt frissítsd. A `website/i18n/<locale>/…` alatti fordítások generáltak, kézzel ne szerkeszd őket. Használd a fordítási feladatokat (pl. `make translate_web_docs_batch`) a lokalizált tartalom frissítéséhez.
:::

### Előfeltételek {#prerequisites}

- Node.js 22+ és npm (tesztelve Node 22-vel)
- Thunderbird 128 ESR vagy újabb (kézi teszteléshez)

---

### Projektstruktúra (magas szintű) {#project-layout-high-level}

- Gyökér: csomagolási szkript `distribution_zip_packer.sh`, dokumentáció, képernyőképek
- `sources/`: fő bővítménykód (háttér, beállítások/felugró UI, manifestek, ikonok)
- `tests/`: Vitest tesztcsomag
- `website/`: Docusaurus dokumentáció (i18n a `website/i18n/de/...` alatt)

---

### Telepítés és eszközök {#install-and-tooling}

- Gyökérfüggőségek telepítése: `npm ci`
- Dokumentáció (opcionális): `cd website && npm ci`
- Célok felfedezése: `make help`

---

### Élő fejlesztés (web‑ext run) {#live-dev-web-ext}

- Gyors ciklus Firefox Desktopon (csak UI smoke-tesztek):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Futtatás Thunderbirdben (MailExtensions esetén ajánlott):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Tippek:
- Tartsd nyitva a Thunderbird hibakonzolját (Eszközök → Fejlesztői eszközök → Hibakonzol).
- Az MV3 eseményoldalak inaktivitáskor felfüggesztésre kerülnek; kódmódosítás után töltsd újra a bővítményt, vagy hagyd, hogy a web‑ext automatikusan újratöltse.
- Néhány kizárólag Firefoxban elérhető viselkedés eltérhet; az API‑egyezőség érdekében mindig ellenőrizd Thunderbirdben is.
- Thunderbird bináris elérési utak (példák):
- Linux: `thunderbird` (pl. `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Profilizoláció: Használj külön Thunderbird-profilt a fejlesztéshez, hogy ne befolyásold a napi beállításaidat.

---

### Make célok (ábécésorrendben) {#make-targets-alphabetical}

A Makefile egységesíti a gyakori fejlesztési folyamatokat. Futtasd a `make help` parancsot bármikor az összes cél egysoros összefoglalójáért.

Tipp: ha a `make` parancsot cél nélkül futtatod, egy egyszerű Whiptail menü nyílik, ahol kiválaszthatod a célt.

| Cél                                                      | Egysoros leírás                                                                                      |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Helyi build/előnézeti artefaktumok eltávolítása (tmp/, web-local-preview/, website/build/).          |
| [`commit`](#mt-commit)                                   | Formázás, tesztek futtatása (i18n‑nel együtt), changelog frissítése, commit és push.                 |
| [`eslint`](#mt-eslint)                                   | ESLint futtatása flat konfigurációval (`npm run -s lint:eslint`).                                    |
| [`help`](#mt-help)                                       | Minden cél listázása egysoros leírással (rendezve).                                                  |
| [`lint`](#mt-lint)                                       | web‑ext lint a `sources/`-on (ideiglenes manifest; figyelmen kívül hagyja a ZIP-eket; nem végzetes). |
| [`menu`](#mt-menu)                                       | Interaktív menü cél és opcionális argumentumok kiválasztásához.                                      |
| [`pack`](#mt-pack)                                       | ATN és LOCAL ZIP-ek építése (linter futtatása; csomagolószkript hívása).                             |
| [`prettier`](#mt-prettier)                               | A repó helyben történő formázása (módosításokat ír).                                                 |
| [`prettier_check`](#mt-prettier_check)                   | Prettier ellenőrző módban (nincs írás); akkor hibázik, ha újraformázás szükséges.                    |
| [`prettier_write`](#mt-prettier_write)                   | Alias a következőhöz: `prettier`.                                                                    |
| [`test`](#mt-test)                                       | Prettier (írás), ESLint, majd Vitest (ha be van állítva, lefedettséggel).                            |
| [`test_i18n`](#mt-test_i18n)                             | Csak i18n tesztek: bővítmény helyőrzők/egyezőség + webhely-egyezőség.                                |
| [`translate_app`](#mt-translation-app)                   | Alias a következőhöz: `translation_app`.                                                             |
| [`translation_app`](#mt-translation-app)                 | Alkalmazás UI‑sztringek fordítása innen: `sources/_locales/en/messages.json`.                        |
| [`translate_web_docs_batch`](#mt-translation-web)        | Webhely-dokumentumok fordítása OpenAI Batch API-n keresztül (ajánlott).                              |
| [`translate_web_docs_sync`](#mt-translation-web)         | Webhely-dokumentumok szinkron fordítása (örökölt, nem batch).                                        |
| [`translate_web_index`](#mt-translation_web_index)       | Alias a következőhöz: `translation_web_index`.                                                       |
| [`translation_web_index`](#mt-translation_web_index)     | Kezdőlap/navigáció/lábléc UI fordítása (`website/i18n/en/code.json → .../<lang>/code.json`).         |
| [`web_build`](#mt-web_build)                             | Dokumentáció építése ide: `website/build` (támogatja: `--locales` / `BUILD_LOCALES`).                |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Offline‑biztonságos hivatkozás‑ellenőrzés (kihagyja a távoli HTTP[S]).                               |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Helyi gh‑pages előnézet; automatikus kiszolgálás 8080–8090; opcionális tesztek/link‑ellenőrzés.      |
| [`web_push_github`](#mt-web_push_github)                 | A `website/build` feltöltése a `gh-pages` ágra.                                                      |

Syntax for options

- Használd a `make <command> OPTS="…"`-t az opciók átadásához (ajánlott idézőjelek). Az alábbi célok mindegyike példát mutat a használatra.

--

-

#### Nyelvi build tippek {#locale-build-tips}

- Nyelvek egy részhalmazának építése: állítsd be `BUILD_LOCALES="en de"`-t vagy add át a `OPTS="--locales en,de"`-t a webes céloknak.
- Egy adott nyelv előnézete: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Build és csomagolás {#build-and-package}

- ZIP-ek építése: `make pack`
- ATN és LOCAL ZIP-eket hoz létre a repó gyökerében (artefaktumokat ne szerkeszd kézzel)
- Tipp: csomagolás előtt frissítsd a verziót mind a `sources/manifest_ATN.json`-ben, mind a `sources/manifest_LOCAL.json`-ben
- Kézi telepítés (fejlesztés): Thunderbird → Eszközök → Kiegészítők és témák → fogaskerék → Kiegészítő telepítése fájlból… → válaszd ki a felépített ZIP‑et

---

### Teszt {#test}

- Teljes csomag: `make test` (Vitest)
- Lefedettség (opcionális):
- `npm i -D @vitest/coverage-v8`
- Futtasd: `make test`; nyisd meg: `coverage/index.html` a HTML jelentéshez
- Csak i18n: `make test_i18n` (UI kulcsok/helyőrzők/címek + webhely nyelvenként és dokumentumonkénti egyezőség id/title/sidebar_label ellenőrzésekkel)

---

### Hibakeresés és naplók {#debugging-and-logs}

- Hibakonzol: Eszközök → Fejlesztői eszközök → Hibakonzol
- Részletes naplók kapcsolása futás közben:
- Engedélyezés: `messenger.storage.local.set({ debug: true })`
- Kikapcsolás: `messenger.storage.local.set({ debug: false })`
- A naplók az üzenetek szerkesztése/küldése közben jelennek meg

---

### Dokumentáció (webhely) {#docs-website}

- Fejlesztői szerver: `cd website && npm run start`
- Statikus webhely építése: `cd website && npm run build`
- Make megfelelői (ábécé szerint): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Használati példák:
- Csak EN, tesztek/link‑ellenőrzés kihagyása, nincs push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Minden nyelv, tesztekkel/link‑ellenőrzéssel, majd push: `make web_build_local_preview && make web_push_github`
- Közzététel előtt futtasd az offline‑biztonságos link‑ellenőrzést: `make web_build_linkcheck`.
- i18n: az angol a `website/docs/*.md` alatt található; a német fordítások a `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` alatt
- Keresés: ha az Algolia DocSearch környezeti változók be vannak állítva a CI‑ban (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), az oldal az Algolia keresőt használja; ellenkező esetben helyi keresőre esik vissza. A kezdőlapon nyomd meg a `/` vagy `Ctrl+K` billentyűt a keresőmező megnyitásához.

---

#### Adományozás átirányító útvonal {#donate-redirect}

- `website/src/pages/donate.js`
- Útvonal: `/donate` (és `/<locale>/donate`)
- Viselkedés:
- Ha az aktuális útvonal tartalmaz nyelvi kódot (pl. `/de/donate`), azt használja
- Ellenkező esetben a `navigator.languages` és a beállított nyelvek közül a legjobb egyezést választja; alapértelmezett nyelvre esik vissza
- Átirányítás ide:
- `en` → `/docs/donation`
- egyéb → `/<locale>/docs/donation`
- `useBaseUrl` használata a helyes baseUrl‑kezeléshez
- Meta frissítés + `noscript` hivatkozás tartalékmegoldásként

---

---

#### Előnézeti tippek {#preview-tips}

- Node előnézet tiszta leállítása: nyisd meg a `http://localhost:<port>/__stop` fájlt (`Local server started` után kerül kiírásra).
- Ha a képek nem töltődnek be MDX/JSX-ben, használd a `useBaseUrl('/img/...')`-t a webhely `baseUrl` tiszteletben tartásához.
- Az előnézet először indul; a link‑ellenőrzés ezután fut, és nem blokkoló (a törött külső hivatkozások nem állítják le az előnézetet).
- Példa előnézeti URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` („Local server started” után kerül kiírásra).
- Külső linkek a link‑ellenőrzésben: Egyes külső oldalak (pl. addons.thunderbird.net) blokkolják az automata feltérképezőket, és 403‑at adhatnak a link‑ellenőrzésben. Az előnézet ettől még elindul; ezeket biztonságosan figyelmen kívül hagyhatod.

---

#### A webhely fordítása {#translate-website}

Mit fordíthatsz

- Csak a webhely UI‑t: kezdőlap, navigációs sáv, lábléc és egyéb UI‑sztringek. A dokumentációs tartalom egyelőre angol marad.

Hol szerkessz

- Szerkeszd: `website/i18n/<locale>/code.json` (hivatkozásként használd: `en`). Hagyd érintetlenül az olyan helyőrzőket, mint `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}`.

Fájlok létrehozása vagy frissítése

- Hiányzó csonkok létrehozása minden nyelvhez: `npm --prefix website run i18n:stubs`
- Csonkok felülírása az angolból (új sztringek hozzáadása után): `npm --prefix website run i18n:stubs:force`
- Alternatíva egyetlen nyelvhez: `npx --prefix website docusaurus write-translations --locale <locale>`

Kezdőlap/navigáció/lábléc UI‑sztringek fordítása (OpenAI)

- Hitelesítési adatok egyszeri beállítása (shell vagy .env):
- `export OPENAI_API_KEY=sk-...`
- Opcionális: `export OPENAI_MODEL=gpt-4o-mini`
- Egylépéses (minden nyelv, en kihagyása): `make translate_web_index`
- Korlátozás megadott nyelvekre: `make translate_web_index OPTS="--locales de,fr"`
- Meglévő értékek felülírása: `make translate_web_index OPTS="--force"`

Érvényesítés és újrapróbálkozás

- A fordítószkript ellenőrzi a JSON szerkezetét, megőrzi a kapcsos zárójelű helyőrzőket, és biztosítja, hogy az URL‑ek változatlanok maradjanak.
- Érvényesítési hiba esetén visszajelzéssel együtt legfeljebb kétszer próbálkozik újra, mielőtt meghagyná a meglévő értékeket.

Saját nyelved előnézete

- Fejlesztői szerver: `npm --prefix website run start`
- Látogasd meg: `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Beküldés

- Nyiss PR‑t a szerkesztett `code.json` fájl(ok)kal. Tartsd fókuszáltan a változtatásokat, és ha lehet, mellékelj egy gyors képernyőfotót.

---

### Biztonsági és konfigurációs tippek {#security-and-configuration-tips}

- Ne commitold a `sources/manifest.json` fájlt (a build ideiglenesen hozza létre)
- Tartsd stabilan a `browser_specific_settings.gecko.id`‑t a frissítési csatorna megőrzéséhez

---

### Beállítások megőrzése {#settings-persistence}

- Tárolás: Minden felhasználói beállítás a `storage.local` alatt él, és a bővítményfrissítéseken át megmarad.
- Telepítés: Az alapértékek csak akkor alkalmazódnak, ha egy kulcs szigorúan hiányzik (undefined).
- Frissítés: A migráció csak a hiányzó kulcsokat tölti ki; meglévő értékeket soha nem ír felül.
- Sémajelző: `settingsVersion` (jelenleg: `1`).
- Kulcsok és alapértékek:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kód: lásd: `sources/background.js` → `initializeOrMigrateSettings()` és `SCHEMA_VERSION`.

Fejlesztői folyamat (új beállítás hozzáadása)

- Emeld a `SCHEMA_VERSION` értékét a `sources/background.js` fájlban.
- Add hozzá az új kulcsot + alapértéket a `DEFAULTS` objektumhoz a `initializeOrMigrateSettings()` fájlban.
- Az alapértékek bevetésénél használd az „csak-ha-undefined” szabályt; ne írd felül a meglévő értékeket.
- Ha a beállítás felhasználó számára látható, kösd be a `sources/options.js`-ben, és add hozzá a lokalizált sztringeket.
- Adj hozzá/igazíts teszteket (lásd: `tests/background.settings.migration.test.js`).

Kézi tesztelési tippek

- Friss telepítés szimulálása: töröld a kiegészítő adatkönyvtárát, vagy indíts új profillal.
- Frissítés szimulálása: állítsd `settingsVersion` értékét `0`-re a `storage.local` fájlban, majd töltsd újra; ellenőrizd, hogy a meglévő értékek változatlanok maradnak, és csak a hiányzó kulcsok kerülnek hozzáadásra.

---

### Hibaelhárítás {#troubleshooting}

- Győződj meg róla, hogy a Thunderbird 128 ESR vagy újabb
- Használd a Hibakonzolt futásidejű problémákhoz
- Ha úgy tűnik, hogy a tárolt beállítások nem alkalmazódnak megfelelően, indítsd újra a Thunderbirdöt, és próbáld újra. (A Thunderbird munkamenetek között állapotot gyorsíthatótárazhat; az újraindítás biztosítja a friss beállítások betöltését.)

---

### CI és lefedettség {#ci-and-coverage}

- A GitHub Actions (`CI — Tests`) a vitestet lefedettségi küszöbökkel futtatja (85% sorok/függvények/ágak/utasítások). Ha a küszöbök nem teljesülnek, a feladat meghiúsul.
- A workflow feltölt egy `coverage-html` artefaktumot a HTML jelentéssel; töltsd le a futás oldaláról (Actions → legutóbbi futás → Artifacts).

---

### Hozzájárulás {#contributing}

- Lásd a CONTRIBUTING.md fájlt az ág/commit/PR irányelvekért
- Tipp: Hozz létre külön Thunderbird fejlesztői profilt a teszteléshez, hogy ne befolyásold a mindennapi profilt.

---

### Fordítások

- A nagy „all → all” fordítási feladatok lassúak és költségesek lehetnek. Kezdd egy részhalmazzal (pl. néhány dokumentum és 1–2 nyelv), vizsgáld felül az eredményt, majd bővítsd.

---

- Újrapróbálási irányelv: a fordítási feladatok legfeljebb 3 újrapróbálkozást végeznek exponenciális visszavárakozással API‑hibák esetén; lásd: `scripts/translate_web_docs_batch.js` és `scripts/translate_web_docs_sync.js`.

Képernyőképek a dokumentációhoz

- Képeket a `website/static/img/` alatt tárold.
- Hivatkozz rájuk MD/MDX-ben a `useBaseUrl('/img/<filename>')` segítségével, hogy az útvonalak működjenek a webhely `baseUrl`-val.
- Miután képeket adtál hozzá vagy nevezél át a `website/static/img/` alatt, ellenőrizd, hogy minden hivatkozás továbbra is a `useBaseUrl('/img/…')`-t használja, és megjelenik helyi előnézetben.
  Favikonok

- A többméretű `favicon.ico` automatikusan generálódik minden buildútvonalon (Make + szkriptek) a `website/scripts/build-favicon.mjs` segítségével.
- Nincs szükség kézi lépésre; a `icon-*.png` frissítése elegendő.
  Ellenőrzési tipp

- Hagyd változatlanul a `id` front‑matter mezőt a fordított dokumentumokban; csak a `title` és `sidebar_label` értékét fordítsd le, ha jelen vannak.

#### clean {#mt-clean}

- Cél: helyi build/előnézeti artefaktumok eltávolítása.
- Használat: `make clean`
- Eltávolítja (ha léteznek):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Cél: formázás, tesztelés, changelog frissítése, commit és push.
- Használat: `make commit`
- Részletek: futtatja a Prettier‑t (írás), `make test`, `make test_i18n`; hozzáfűzi a changelogot, ha van stage-elt diff; push a `origin/<branch>` ágra.

---

#### eslint {#mt-eslint}

- Cél: ESLint futtatása flat konfigurációval.
- Használat: `make eslint`

---

#### help {#mt-help}

- Cél: az összes cél listázása egysoros leírással.
- Használat: `make help`

---

#### lint {#mt-lint}

- Cél: a MailExtension lintelése `web-ext` használatával.
- Használat: `make lint`
- Megjegyzések: ideiglenesen átmásolja: `sources/manifest_LOCAL.json` → `sources/manifest.json`; a felépített ZIP‑eket figyelmen kívül hagyja; a figyelmeztetések nem bukatják el a folyamatot.

---

#### menu {#mt-menu}

- Cél: interaktív menü Make cél és opcionális argumentumok kiválasztásához.
- Használat: futtasd a `make` parancsot argumentumok nélkül.
- Megjegyzések: ha a `whiptail` nem érhető el, a menü a `make help`-re esik vissza.

---

#### pack {#mt-pack}

- Cél: ATN és LOCAL ZIP‑ek építése (`lint` függőség).
- Használat: `make pack`
- Tipp: csomagolás előtt emeld a verziókat mindkét `sources/manifest_*.json`-ben.

---

#### prettier {#mt-prettier}

- Cél: a repó helyben történő formázása.
- Használat: `make prettier`

#### prettier_check {#mt-prettier_check}

- Cél: formázás ellenőrzése (írás nélkül).
- Használat: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Cél: alias a következőhöz: `prettier`.
- Használat: `make prettier_write`

---

#### test {#mt-test}

- Cél: Prettier (írás), ESLint, majd Vitest futtatása (ha telepítve, lefedettséggel).
- Használat: `make test`

#### test_i18n {#mt-test_i18n}

- Cél: i18n‑fókuszú tesztek a bővítmény sztringjeire és a webhely dokumentumaira.
- Használat: `make test_i18n`
- Futtatja: `npm run test:i18n` és `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Cél: a bővítmény UI‑sztringjeinek fordítása angolról más nyelvekre.
- Használat: `make translation_app OPTS="--locales all|de,fr"`
- Megjegyzések: megőrzi a kulcsstruktúrát és a helyőrzőket; naplózás ide: `translation_app.log`. Szkriptes forma: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Cél: a webhely dokumentumainak fordítása `website/docs/*.md` nyelvről `website/i18n/<locale>/...` nyelvekre.
- Előnyben részesített: `translate_web_docs_batch` (OpenAI Batch API)
  - Használat (flag-ek): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - A régi pozicionális forma továbbra is elfogadott: `OPTS="<doc|all> <lang|all>"`
- Működés: JSONL építése, feltöltés, 30 mp‑enkénti lekérdezés, eredmények letöltése, fájlok írása.
- Megjegyzés: egy batch feladat akár 24 óráig is eltarthat (az OpenAI batch ablakának megfelelően). A konzol minden lekérdezésnél kiírja az eltelt időt.
- Környezet: `OPENAI_API_KEY` (kötelező), opcionális: `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (alapértelmezés 24 óra), `BATCH_POLL_INTERVAL_MS`.
- Örökölt: `translate_web_docs_sync`
  - Használat (flag-ek): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - A régi pozicionális forma továbbra is elfogadott: `OPTS="<doc|all> <lang|all>"`
- Működés: szinkron, páronkénti kérések (nincs batch aggregáció).
- Megjegyzések: interaktív kérdések, ha a `OPTS` hiányzik. Mindkét mód megőrzi a kódtömböket/inline kódot, és változatlanul hagyja a front‑matter `id` értékét; naplózás ide: `translation_web_batch.log` (batch) vagy `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Cél: webhely UI‑sztringek (kezdőlap, navigáció, lábléc) fordítása `website/i18n/en/code.json` nyelvről a `website/i18n/<locale>/code.json` alatti összes nyelvre (`en` kivételével).
- Használat: `make translate_web_index` vagy `make translate_web_index OPTS="--locales de,fr [--force]"`
- Követelmények: exportáld a `OPENAI_API_KEY` változót (opcionális: `OPENAI_MODEL=gpt-4o-mini`).
- Működés: ellenőrzi a JSON szerkezetét, megőrzi a kapcsos zárójelű helyőrzőket, változatlanul hagyja az URL‑eket, és érvényesítési hibák esetén visszajelzéssel újrapróbálkozik.

---

#### web_build {#mt-web_build}

- Cél: a dokumentációs oldal felépítése ide: `website/build`.
- Használat: `make web_build OPTS="--locales en|de,en|all"` (vagy állítsd be: `BUILD_LOCALES="en de"`)
- Belső működés: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Függőségek: `npm ci` fut a `website/` alatt, csak ha a `website/node_modules/@docusaurus` hiányzik.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Cél: offline‑biztonságos hivatkozás‑ellenőrzés.
- Használat: `make web_build_linkcheck OPTS="--locales en|all"`
- Megjegyzések: ide épít: `tmp_linkcheck_web_pages`; átírja a GH Pages `baseUrl`-t erre: `/`; kihagyja a távoli HTTP(S) linkeket.

#### web_build_local_preview {#mt-web_build_local_preview}

- Cél: helyi gh‑pages előnézet opcionális tesztekkel/link‑ellenőrzéssel.
- Használat: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Működés: először a Node előnézeti szervert próbálja (`scripts/preview-server.mjs`, támogatja: `/__stop`), visszaesik erre: `python3 -m http.server`; a 8080–8090 portokon szolgál ki; PID: `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Cél: a `website/build` feltöltése a `gh-pages` ágra.
- Használat: `make web_push_github`

Tipp: állítsd be a `NPM=…` változót a Makefile által használt csomagkezelő felülírásához (alapértelmezés: `npm`).

---
