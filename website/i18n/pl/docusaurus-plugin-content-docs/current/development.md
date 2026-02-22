---
id: development
title: 'Rozwój'
sidebar_label: 'Rozwój'
---

---

## Przewodnik programistyczny {#development-guide}

:::note Edytuj tylko angielski; tłumaczenia się propagują
Aktualizuj dokumentację wyłącznie pod `website/docs` (angielski). Tłumaczenia pod `website/i18n/<locale>/…` są generowane i nie powinny być edytowane ręcznie. Użyj zadań tłumaczeń (np. `make translate_web_docs_batch`), aby odświeżyć zlokalizowaną treść.
:::

### Wymagania wstępne {#prerequisites}

- Node.js 22+ i npm (testowane z Node 22)
- Thunderbird 128 ESR lub nowszy (do testów ręcznych)

---

### Struktura projektu (wysoki poziom) {#project-layout-high-level}

- Katalog główny: skrypt pakowania `distribution_zip_packer.sh`, dokumentacja, zrzuty ekranu
- `sources/`: główny kod dodatku (skrypt w tle, UI opcji/popupu, manifesty, ikony)
- `tests/`: zestaw testów Vitest
- `website/`: dokumentacja Docusaurusa (z i18n w `website/i18n/de/...`)

---

### Instalacja i narzędzia {#install-and-tooling}

- Zainstaluj zależności w katalogu głównym: `npm ci`
- Dokumentacja (opcjonalnie): `cd website && npm ci`
- Wyświetl cele: `make help`

---

### Tryb deweloperski na żywo (web‑ext run) {#live-dev-web-ext}

- Szybka pętla w Firefox Desktop (tylko smoke testy UI):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Uruchom w Thunderbirdzie (zalecane dla MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Wskazówki:
- Trzymaj otwartą Konsolę błędów Thunderbirda (Narzędzia → Narzędzia deweloperskie → Konsola błędów).
- Strony zdarzeń MV3 są wstrzymywane w bezczynności; przeładuj dodatek po zmianach w kodzie albo pozwól web‑ext na automatyczny reload.
- Niektóre zachowania specyficzne dla Firefoksa różnią się; zawsze weryfikuj w Thunderbirdzie, aby zachować zgodność API.
- Ścieżki do binariów Thunderbirda (przykłady):
- Linux: `thunderbird` (np. `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Izolacja profilu: Używaj osobnego profilu Thunderbirda do developmentu, aby nie wpływać na codzienną konfigurację.

---

### Cele Make (alfabetycznie) {#make-targets-alphabetical}

Makefile standaryzuje typowe przepływy developerskie. Uruchom `make help` w dowolnym momencie, aby zobaczyć jednolinijkowe podsumowanie każdego celu.

Wskazówka: uruchomienie `make` bez celu otwiera proste menu Whiptail do wyboru celu.

| Cel                                                      | Jednolinijkowy opis                                                                                        |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Usuń lokalne artefakty build/preview (tmp/, web-local-preview/, website/build/).                           |
| [`commit`](#mt-commit)                                   | Sformatuj, uruchom testy (w tym i18n), zaktualizuj changelog, commit i push.                               |
| [`eslint`](#mt-eslint)                                   | Uruchom ESLint przez flat config (`npm run -s lint:eslint`).                                               |
| [`help`](#mt-help)                                       | Wypisz wszystkie cele z jednolinijkowymi opisami (posortowane).                                            |
| [`lint`](#mt-lint)                                       | web‑ext lint na `sources/` (tymczasowy manifest; ignoruje pliki ZIP; niekrytyczne).                        |
| [`menu`](#mt-menu)                                       | Interaktywne menu do wyboru celu i opcjonalnych argumentów.                                                |
| [`pack`](#mt-pack)                                       | Zbuduj ZIPy ATN i LOCAL (uruchamia linter; wywołuje skrypt pakujący).                                      |
| [`prettier`](#mt-prettier)                               | Sformatuj repozytorium w miejscu (zapisuje zmiany).                                                        |
| [`prettier_check`](#mt-prettier_check)                   | Prettier w trybie sprawdzania (bez zapisów); kończy się błędem, jeśli wymagane jest przeformatowanie.      |
| [`prettier_write`](#mt-prettier_write)                   | Alias dla `prettier`.                                                                                      |
| [`test`](#mt-test)                                       | Prettier (zapis), ESLint, potem Vitest (pokrycie, jeśli skonfigurowane).                                   |
| [`test_i18n`](#mt-test_i18n)                             | Testy tylko i18n: placeholdery/parytet dodatku + parytet strony.                                           |
| [`translate_app`](#mt-translation-app)                   | Alias dla `translation_app`.                                                                               |
| [`translation_app`](#mt-translation-app)                 | Przetłumacz ciągi UI aplikacji z `sources/_locales/en/messages.json`.                                      |
| [`translate_web_docs_batch`](#mt-translation-web)        | Tłumacz dokumenty strony przez OpenAI Batch API (zalecane).                                                |
| [`translate_web_docs_sync`](#mt-translation-web)         | Tłumacz dokumenty strony synchronicznie (legacy, bez batcha).                                              |
| [`translate_web_index`](#mt-translation_web_index)       | Alias dla `translation_web_index`.                                                                         |
| [`translation_web_index`](#mt-translation_web_index)     | Przetłumacz UI strony głównej/paska nawigacji/stopki (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Zbuduj dokumentację do `website/build` (obsługuje `--locales` / `BUILD_LOCALES`).                          |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Bezpieczne offline sprawdzanie linków (pomija zdalne HTTP[S]).                                             |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Lokalny podgląd gh‑pages; automatyczny serwer na 8080–8090; opcjonalne testy/sprawdzanie linków.           |
| [`web_push_github`](#mt-web_push_github)                 | Wypchnij `website/build` na gałąź `gh-pages`.                                                              |

Składnia opcji

- Użyj `make <command> OPTS="…"` do przekazywania opcji (zalecane cudzysłowy). Każdy cel poniżej pokazuje przykładowe użycie.

--

-

#### Wskazówki dla budowania lokalizacji {#locale-build-tips}

- Buduj podzbiór lokalizacji: ustaw `BUILD_LOCALES="en de"` lub przekaż `OPTS="--locales en,de"` do celów webowych.
- Podgląd konkretnej lokalizacji: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Budowanie i pakowanie {#build-and-package}

- Zbuduj ZIPy: `make pack`
- Tworzy ZIPy ATN i LOCAL w katalogu głównym repo (nie edytuj artefaktów ręcznie)
- Wskazówka: zaktualizuj wersję zarówno w `sources/manifest_ATN.json`, jak i w `sources/manifest_LOCAL.json` przed pakowaniem
- Instalacja ręczna (dev): Thunderbird → Narzędzia → Dodatki i Motywy → koło zębate → Zainstaluj dodatek z pliku… → wybierz zbudowany ZIP

---

### Test {#test}

- Pełny zestaw: `make test` (Vitest)
- Pokrycie (opcjonalnie):
- `npm i -D @vitest/coverage-v8`
- Uruchom `make test`; otwórz `coverage/index.html` po raport HTML
- Tylko i18n: `make test_i18n` (klucze UI/placeholdery/tytuły + parytet strony per‑locale per‑doc z kontrolą id/title/sidebar_label)

---

### Debugowanie i logi {#debugging-and-logs}

- Konsola błędów: Narzędzia → Narzędzia deweloperskie → Konsola błędów
- Przełącz szczegółowe logi w czasie działania:
- Włącz: `messenger.storage.local.set({ debug: true })`
- Wyłącz: `messenger.storage.local.set({ debug: false })`
- Logi pojawiają się podczas komponowania/wysyłania odpowiedzi

---

### Dokumentacja (strona) {#docs-website}

- Serwer deweloperski: `cd website && npm run start`
- Zbuduj statyczną stronę: `cd website && npm run build`
- Odpowiedniki Make (alfabetycznie): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Przykłady użycia:
- Tylko EN, pomiń testy/sprawdzanie linków, bez push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Wszystkie lokalizacje, z testami/sprawdzaniem linków, potem push: `make web_build_local_preview && make web_push_github`
- Przed publikacją uruchom bezpieczne offline sprawdzanie linków: `make web_build_linkcheck`.
- i18n: angielski znajduje się w `website/docs/*.md`; niemieckie tłumaczenia w `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Wyszukiwanie: Jeśli w CI ustawiono zmienne środowiskowe Algolia DocSearch (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), strona używa wyszukiwarki Algolia; w przeciwnym razie korzysta z wyszukiwania lokalnego. Na stronie głównej naciśnij `/` lub `Ctrl+K`, aby otworzyć pole wyszukiwania.

---

#### Trasa przekierowania darowizn {#donate-redirect}

- `website/src/pages/donate.js`
- Trasa: `/donate` (oraz `/<locale>/donate`)
- Zachowanie:
- Jeśli bieżąca trasa ma locale (np. `/de/donate`), użyj go
- W przeciwnym razie wybierz najlepsze dopasowanie z `navigator.languages` względem skonfigurowanych lokalizacji; w razie potrzeby użyj domyślnej lokalizacji
- Przekierowuje do:
- `en` → `/docs/donation`
- pozostałe → `/<locale>/docs/donation`
- Używa `useBaseUrl` do poprawnej obsługi baseUrl
- Zawiera meta refresh + link `noscript` jako awaryjny

---

---

#### Wskazówki dot. podglądu {#preview-tips}

- Zatrzymaj podgląd Node w sposób czysty: otwórz `http://localhost:<port>/__stop` (wypisywane po `Local server started`).
- Jeśli obrazy nie ładują się w MDX/JSX, użyj `useBaseUrl('/img/...')`, aby uwzględnić `baseUrl` witryny.
- Podgląd startuje najpierw; sprawdzanie linków uruchamia się później i nie blokuje (zepsute linki zewnętrzne nie zatrzymają podglądu).
- Przykładowy URL podglądu: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (wypisywany po „Local server started”).
- Linki zewnętrzne w kontroli linków: Niektóre zewnętrzne serwisy (np. addons.thunderbird.net) blokują automatyczne crawlery i mogą zwracać 403 podczas sprawdzania linków. Podgląd i tak się uruchamia; można to zignorować.

---

#### Przetłumacz stronę {#translate-website}

Co możesz tłumaczyć

- Tylko interfejs strony: strona główna, pasek nawigacyjny, stopka i inne ciągi UI. Treść dokumentów pozostaje na razie tylko po angielsku.

Gdzie edytować

- Edytuj `website/i18n/<locale>/code.json` (użyj `en` jako odniesienia). Zachowaj bez zmian placeholdery takie jak `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}`.

Generuj lub odśwież pliki

- Utwórz brakujące stuby dla wszystkich lokalizacji: `npm --prefix website run i18n:stubs`
- Nadpisz stuby z angielskiego (po dodaniu nowych ciągów): `npm --prefix website run i18n:stubs:force`
- Alternatywa dla pojedynczej lokalizacji: `npx --prefix website docusaurus write-translations --locale <locale>`

Przetłumacz ciągi UI strony głównej/paska nawigacji/stopki (OpenAI)

- Ustaw poświadczenia raz (shell lub .env):
- `export OPENAI_API_KEY=sk-...`
- Opcjonalnie: `export OPENAI_MODEL=gpt-4o-mini`
- Jednorazowo (wszystkie lokalizacje, pomiń en): `make translate_web_index`
- Ogranicz do konkretnych lokalizacji: `make translate_web_index OPTS="--locales de,fr"`
- Nadpisz istniejące wartości: `make translate_web_index OPTS="--force"`

Walidacja i ponowienia

- Skrypt tłumaczenia weryfikuje kształt JSON, zachowuje placeholdery w klamrach i upewnia się, że adresy URL są niezmienione.
- W razie niepowodzenia walidacji ponawia z informacją zwrotną do 2 razy, zanim pozostawi istniejące wartości.

Podejrzyj swoją lokalizację

- Serwer deweloperski: `npm --prefix website run start`
- Odwiedź `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Wysyłanie zmian

- Otwórz PR z edytowanym(i) plikiem(ami) `code.json`. Zachowaj skupiony zakres zmian i jeśli to możliwe, dołącz szybki zrzut ekranu.

---

### Wskazówki dotyczące bezpieczeństwa i konfiguracji {#security-and-configuration-tips}

- Nie commituj `sources/manifest.json` (tworzony tymczasowo przez build)
- Utrzymuj `browser_specific_settings.gecko.id` stabilny, aby zachować kanał aktualizacji

---

### Trwałość ustawień {#settings-persistence}

- Przechowywanie: Wszystkie ustawienia użytkownika znajdują się w `storage.local` i przetrwają aktualizacje dodatku.
- Instalacja: Wartości domyślne są stosowane tylko wtedy, gdy klucza ściśle brakuje (undefined).
- Aktualizacja: Migracja uzupełnia tylko brakujące klucze; istniejące wartości nigdy nie są nadpisywane.
- Znacznik schematu: `settingsVersion` (obecnie `1`).
- Klucze i wartości domyślne:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kod: zobacz `sources/background.js` → `initializeOrMigrateSettings()` oraz `SCHEMA_VERSION`.

Przepływ dev (dodawanie nowego ustawienia)

- Zwiększ `SCHEMA_VERSION` w `sources/background.js`.
- Dodaj nowy klucz + domyślną wartość do obiektu `DEFAULTS` w `initializeOrMigrateSettings()`.
- Stosuj zasadę „only-if-undefined” podczas nadawania domyślnych wartości; nie nadpisuj istniejących wartości.
- Jeśli ustawienie jest widoczne dla użytkownika, podłącz je w `sources/options.js` i dodaj zlokalizowane ciągi.
- Dodaj/dostosuj testy (zob. `tests/background.settings.migration.test.js`).

Wskazówki do testów ręcznych

- Symuluj świeżą instalację: wyczyść katalog danych rozszerzenia lub zacznij od nowego profilu.
- Symuluj aktualizację: ustaw `settingsVersion` na `0` w `storage.local` i przeładuj; potwierdź, że istniejące wartości pozostają niezmienione, a dodawane są tylko brakujące klucze.

---

### Rozwiązywanie problemów {#troubleshooting}

- Upewnij się, że Thunderbird ma wersję 128 ESR lub nowszą
- Używaj Konsoli błędów do problemów w czasie działania
- Jeśli zapisane ustawienia wydają się nie stosować poprawnie, uruchom ponownie Thunderbirda i spróbuj ponownie. (Thunderbird może buforować stan między sesjami; restart zapewnia wczytanie świeżych ustawień.)

---

### CI i pokrycie {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) uruchamia vitest z progami pokrycia (85% linii/funkcji/gałęzi/instrukcji). Jeśli progi nie są spełnione, zadanie kończy się niepowodzeniem.
- Workflow przesyła artefakt `coverage-html` z raportem HTML; pobierz go ze strony uruchomienia (Actions → najnowsze uruchomienie → Artifacts).

---

### Wkład {#contributing}

- Zobacz CONTRIBUTING.md, aby poznać wytyczne dotyczące branchy/commitów/PR
- Wskazówka: Utwórz osobny profil deweloperski Thunderbirda do testów, aby nie wpływać na codzienny profil.

---

### Tłumaczenia

- Uruchamianie dużych zadań tłumaczeń „all → all” może być wolne i kosztowne. Zacznij od podzbioru (np. kilka dokumentów i 1–2 lokalizacje), przejrzyj wynik, a następnie rozszerz.

---

- Polityka ponowień: zadania tłumaczeń wykonują do 3 ponowień z wykładniczym opóźnieniem przy błędach API; zob. `scripts/translate_web_docs_batch.js` i `scripts/translate_web_docs_sync.js`.

Zrzuty ekranu do dokumentacji

- Przechowuj obrazy w `website/static/img/`.
- Odwołuj się do nich w MD/MDX poprzez `useBaseUrl('/img/<filename>')`, aby ścieżki działały z `baseUrl` witryny.
- Po dodaniu lub zmianie nazw obrazów w `website/static/img/` potwierdź, że wszystkie odwołania nadal używają `useBaseUrl('/img/…')` i renderują się w lokalnym podglądzie.
  Favikony

- Wielorozmiarowy `favicon.ico` jest generowany automatycznie we wszystkich ścieżkach builda (Make + skrypty) przez `website/scripts/build-favicon.mjs`.
- Nie jest wymagany żaden krok ręczny; wystarczy zaktualizować `icon-*.png`.
  Wskazówka dot. przeglądu

- Pozostaw `id` w front‑matter bez zmian w tłumaczonych dokumentach; tłumacz tylko `title` i `sidebar_label`, jeśli występują.

#### clean {#mt-clean}

- Cel: usuń lokalne artefakty build/preview.
- Użycie: `make clean`
- Usuwa (jeśli istnieje):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Cel: formatowanie, testy, aktualizacja changeloga, commit i push.
- Użycie: `make commit`
- Szczegóły: uruchamia Prettier (zapis), `make test`, `make test_i18n`; dopisuje changelog, gdy są zindeksowane zmiany; wypycha na `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Cel: uruchom ESLint przez flat config.
- Użycie: `make eslint`

---

#### help {#mt-help}

- Cel: wypisz wszystkie cele z jednolinijkowymi opisami.
- Użycie: `make help`

---

#### lint {#mt-lint}

- Cel: lint MailExtension przy użyciu `web-ext`.
- Użycie: `make lint`
- Uwagi: tymczasowo kopiuje `sources/manifest_LOCAL.json` → `sources/manifest.json`; ignoruje zbudowane ZIPy; ostrzeżenia nie powodują niepowodzenia potoku.

---

#### menu {#mt-menu}

- Cel: interaktywne menu do wyboru celu Make i opcjonalnych argumentów.
- Użycie: uruchom `make` bez argumentów.
- Uwagi: jeśli `whiptail` nie jest dostępne, menu używa `make help` jako zapasowego.

---

#### pack {#mt-pack}

- Cel: zbuduj ZIPy ATN i LOCAL (zależy od `lint`).
- Użycie: `make pack`
- Wskazówka: podnieś wersje w obu `sources/manifest_*.json` przed pakowaniem.

---

#### prettier {#mt-prettier}

- Cel: sformatuj repozytorium w miejscu.
- Użycie: `make prettier`

#### prettier_check {#mt-prettier_check}

- Cel: zweryfikuj formatowanie (bez zapisów).
- Użycie: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Cel: alias dla `prettier`.
- Użycie: `make prettier_write`

---

#### test {#mt-test}

- Cel: uruchom Prettier (zapis), ESLint, a następnie Vitest (pokrycie, jeśli zainstalowane).
- Użycie: `make test`

#### test_i18n {#mt-test_i18n}

- Cel: testy skupione na i18n dla ciągów dodatku i dokumentacji strony.
- Użycie: `make test_i18n`
- Uruchamia: `npm run test:i18n` i `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Cel: przetłumacz ciągi UI dodatku z EN na inne lokalizacje.
- Użycie: `make translation_app OPTS="--locales all|de,fr"`
- Uwagi: zachowuje strukturę kluczy i placeholdery; loguje do `translation_app.log`. Forma skryptu: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Cel: przetłumacz dokumenty strony z `website/docs/*.md` na `website/i18n/<locale>/...`.
- Preferowane: `translate_web_docs_batch` (OpenAI Batch API)
  - Użycie (flagi): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Starsza składnia pozycyjna jest nadal akceptowana: `OPTS="<doc|all> <lang|all>"`
- Zachowanie: buduje JSONL, wysyła, odpytuje co 30 s, pobiera wyniki, zapisuje pliki.
- Uwaga: zadanie wsadowe może zająć do 24 godzin (zgodnie z oknem wsadowym OpenAI). Konsola pokazuje upływ czasu przy każdym odpytywaniu.
- Zmienne środowiskowe: `OPENAI_API_KEY` (wymagane), opcjonalne `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (domyślnie 24 h), `BATCH_POLL_INTERVAL_MS`.
- Legacy: `translate_web_docs_sync`
  - Użycie (flagi): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Starsza składnia pozycyjna jest nadal akceptowana: `OPTS="<doc|all> <lang|all>"`
- Zachowanie: synchroniczne żądania per‑para (bez agregacji wsadowej).
- Uwagi: Interaktywne pytania, gdy pominięto `OPTS`. Oba tryby zachowują bloki kodu/kod inline i pozostawiają `id` w front‑matter bez zmian; logują do `translation_web_batch.log` (batch) lub `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Cel: przetłumacz ciągi UI strony (strona główna, pasek nawigacji, stopka) z `website/i18n/en/code.json` na wszystkie lokalizacje pod `website/i18n/<locale>/code.json` (z wyłączeniem `en`).
- Użycie: `make translate_web_index` lub `make translate_web_index OPTS="--locales de,fr [--force]"`
- Wymagania: wyeksportuj `OPENAI_API_KEY` (opcjonalnie: `OPENAI_MODEL=gpt-4o-mini`).
- Zachowanie: weryfikuje strukturę JSON, zachowuje placeholdery w klamrach, utrzymuje niezmienione adresy URL i ponawia z informacją zwrotną przy błędach walidacji.

---

#### web_build {#mt-web_build}

- Cel: zbuduj stronę dokumentacji do `website/build`.
- Użycie: `make web_build OPTS="--locales en|de,en|all"` (lub ustaw `BUILD_LOCALES="en de"`)
- Wewnątrz: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Zależności: uruchamia `npm ci` w `website/` tylko jeśli brakuje `website/node_modules/@docusaurus`.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Cel: bezpieczne offline sprawdzanie linków.
- Użycie: `make web_build_linkcheck OPTS="--locales en|all"`
- Uwagi: buduje do `tmp_linkcheck_web_pages`; przepisuje `baseUrl` GH Pages na `/`; pomija zdalne linki HTTP(S).

#### web_build_local_preview {#mt-web_build_local_preview}

- Cel: lokalny podgląd gh‑pages z opcjonalnymi testami/sprawdzaniem linków.
- Użycie: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Zachowanie: najpierw próbuje serwera podglądu Node (`scripts/preview-server.mjs`, obsługuje `/__stop`), w razie potrzeby przełącza się na `python3 -m http.server`; serwuje na 8080–8090; PID w `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Cel: wypchnij `website/build` na gałąź `gh-pages`.
- Użycie: `make web_push_github`

Wskazówka: ustaw `NPM=…`, aby nadpisać menedżera pakietów używanego przez Makefile (domyślnie `npm`).

---
