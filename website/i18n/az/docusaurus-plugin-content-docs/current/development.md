---
id: development
title: 'İnkişaf'
sidebar_label: 'Tərtibat'
---

---

## İnkişaf Bələdçisi {#development-guide}

:::note Yalnız İngilis dilini redaktə edin; tərcümələr yayılır
Sənədləri yalnız `website/docs` (İngilis dili) altında yeniləyin. `website/i18n/<locale>/…` altındakı tərcümələr avtomatik yaradılır və əl ilə redaktə edilməməlidir. Lokallaşdırılmış məzmunu yeniləmək üçün tərcümə tapşırıqlarından (məs., `make translate_web_docs_batch`) istifadə edin.
:::

### Ön şərtlər {#prerequisites}

- Node.js 22+ və npm (Node 22 ilə sınaqdan keçirilib)
- Thunderbird 128 ESR və ya daha yenisi (əl ilə sınaq üçün)

---

### Layihə Strukturu (yüksək səviyyəli) {#project-layout-high-level}

- Kök: paketləmə skripti `distribution_zip_packer.sh`, sənədlər, skrinşotlar
- `sources/`: əsas əlavənin kodu (arxa plan, seçimlər/popup UI, manifestlər, ikonlar)
- `tests/`: Vitest dəsti
- `website/`: Docusaurus sənədləri (i18n `website/i18n/de/...` altında)

---

### Quraşdırma və Alətlər {#install-and-tooling}

- Kök asılılıqları quraşdırın: `npm ci`
- Sənədlər (istəyə görə): `cd website && npm ci`
- Hədəfləri tapın: `make help`

---

### Canlı İnkişaf (web‑ext run) {#live-dev-web-ext}

- Firefox Desktop-da sürətli dövr (yalnız UI smoke testləri):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird-də işə salın (MailExtensions üçün üstünlük verilir):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Məsləhətlər:
- Thunderbird-in Xəta Konsolunu açıq saxlayın (Alətlər → İnkişaf Alətləri → Xəta Konsolu).
- MV3 hadisə səhifələri boş olduqda dayandırılır; kod dəyişikliklərindən sonra əlavəni yenidən yükləyin və ya web‑ext-in avtomatik yenidən yükləməsinə icazə verin.
- Yalnız Firefox-a xas bəzi davranışlar fərqlənir; API uyğunluğu üçün həmişə Thunderbird-də yoxlayın.
- Thunderbird icra faylı yolları (nümunələr):
- Linux: `thunderbird` (məs., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Profil izolyasiyası: gündəlik quruluşunuza təsir etməmək üçün inkişaf üçün ayrıca Thunderbird profili istifadə edin.

---

### Make Hədəfləri (Alfabetik) {#make-targets-alphabetical}

Makefile ümumi inkişaf axınlarını standartlaşdırır. Hər hədəf üçün bir sətirlik xülasə almaq üçün istənilən vaxt `make help` çalışdırın.

Məsləhət: `make` hədəfsiz işlədildikdə hədəf seçmək üçün sadə Whiptail menyusu açılır.

| Hədəf                                                    | Bir sətirlik təsvir                                                                               |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Yerli build/preview artifaktlarını sil (tmp/, web-local-preview/, website/build/).                |
| [`commit`](#mt-commit)                                   | Formatla, testləri işə sal (i18n daxil), dəyişiklik jurnalını yenilə, commit et və push et.       |
| [`eslint`](#mt-eslint)                                   | ESLint-i flat konfiq vasitəsilə işə sal (`npm run -s lint:eslint`).                               |
| [`help`](#mt-help)                                       | Bütün hədəfləri bir sətirlik izahla siyahıla (sıralanmış).                                        |
| [`lint`](#mt-lint)                                       | `sources/` üzərində web‑ext lint (müvəqqəti manifest; ZIP-ləri yox sayır; kritik deyil).          |
| [`menu`](#mt-menu)                                       | Hədəf və ixtiyari arqumentləri seçmək üçün interaktiv menyu.                                      |
| [`pack`](#mt-pack)                                       | ATN və LOCAL ZIP-lərini qur (linter çalışdırır; packer skriptini çağırır).                        |
| [`prettier`](#mt-prettier)                               | Repozitoriyanı yerində formatla (dəyişiklikləri yazır).                                           |
| [`prettier_check`](#mt-prettier_check)                   | Prettier yoxlama rejimində (yazı yoxdur); yenidən format lazım olsa, uğursuz olur.                |
| [`prettier_write`](#mt-prettier_write)                   | `prettier` üçün təxəllüs.                                                                         |
| [`test`](#mt-test)                                       | Prettier (yazı), ESLint, sonra Vitest (əhatə quraşdırılıbsa).                                     |
| [`test_i18n`](#mt-test_i18n)                             | Yalnız i18n testləri: əlavə placeholder/paritet + sayt pariteti.                                  |
| [`translate_app`](#mt-translation-app)                   | `translation_app` üçün təxəllüs.                                                                  |
| [`translation_app`](#mt-translation-app)                 | Tətbiq UI sətrlərini `sources/_locales/en/messages.json` mənbəyindən tərcümə et.                  |
| [`translate_web_docs_batch`](#mt-translation-web)        | Vebsayt sənədlərini OpenAI Batch API ilə tərcümə et (üstünlük verilən).                           |
| [`translate_web_docs_sync`](#mt-translation-web)         | Vebsayt sənədlərini sinxron tərcümə et (irsi, batch deyil).                                       |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index` üçün təxəllüs.                                                            |
| [`translation_web_index`](#mt-translation_web_index)     | Əsas səhifə/navbar/footer UI-ni tərcümə et (`website/i18n/en/code.json → .../<lang>/code.json`).  |
| [`web_build`](#mt-web_build)                             | Sənədləri `website/build`-ə qur (`--locales` / `BUILD_LOCALES` dəstəklənir).                      |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Oflayn‑təhlükəsiz keçid yoxlaması (uzaq HTTP[S]-i ötürür).                                        |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Yerli gh‑pages önbaxışı; 8080–8090 portlarında avtomatik xidmət; ixtiyari testlər/link‑yoxlaması. |
| [`web_push_github`](#mt-web_push_github)                 | `website/build`-i `gh-pages` budağına push et.                                                    |

Seçimlər üçün sintaksis

- Seçimləri ötürmək üçün `make <command> OPTS="…"` istifadə edin (dırnaqlar tövsiyə olunur). Aşağıdakı hər hədəf nümunə istifadəsini göstərir.

--

-

#### Lokal quruluş məsləhətləri {#locale-build-tips}

- Lokalların alt dəstini qurun: `BUILD_LOCALES="en de"` təyin edin və ya veb hədəflərə `OPTS="--locales en,de"` ötürün.
- Müəyyən lokalı önbaxış edin: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Qur və Paketlə {#build-and-package}

- ZIP-ləri qur: `make pack`
- Repo kökündə ATN və LOCAL ZIP-ləri yaradır (artifaktları əl ilə redaktə etməyin)
- Məsləhət: paketləmədən əvvəl versiyanı həm `sources/manifest_ATN.json`, həm də `sources/manifest_LOCAL.json` daxilində yeniləyin
- Əl ilə quraşdırma (dev): Thunderbird → Alətlər → Əlavələr və Mövzular → dişli → Fayldan Əlavə Quraşdır… → qurulmuş ZIP-i seçin

---

### Test {#test}

- Tam dəst: `make test` (Vitest)
- Əhatə (istəyə görə):
- `npm i -D @vitest/coverage-v8`
- `make test` işlədin; HTML hesabat üçün `coverage/index.html` açın
- Yalnız i18n: `make test_i18n` (UI açarları/placeholder-ları/başlıqları + saytda lokala görə sənəd pariteti id/title/sidebar_label yoxlamaları ilə)

---

### Sazlama və Jurnallar {#debugging-and-logs}

- Xəta Konsolu: Alətlər → İnkişaf Alətləri → Xəta Konsolu
- İcra vaxtında ətraflı jurnalları dəyişin:
- Aktiv et: `messenger.storage.local.set({ debug: true })`
- Deaktiv et: `messenger.storage.local.set({ debug: false })`
- Cavabları tərtib/göndərərkən jurnallar görünür

---

### Sənədlər (vebsayt) {#docs-website}

- İnkişaf serveri: `cd website && npm run start`
- Statik sayt qur: `cd website && npm run build`
- Make ekvivalentləri (əlifba sırası ilə): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- İstifadə nümunələri:
- Yalnız EN, testləri/link-yoxlamasını keç, push etmə: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Bütün lokallar, testlər/link‑yoxlaması ilə, sonra push: `make web_build_local_preview && make web_push_github`
- Dərc etməzdən əvvəl, oflayn‑təhlükəsiz link yoxlanışını işə salın: `make web_build_linkcheck`.
- i18n: İngiliscə `website/docs/*.md` içindədir; Alman tərcümələri `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` daxilindədir
- Axtarış: Əgər CI-də Algolia DocSearch mühit dəyişənləri (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`) qurulubsa, sayt Algolia axtarışından istifadə edir; əks halda lokal axtarışa qayıdır. Əsas səhifədə axtarış qutusunu açmaq üçün `/` və ya `Ctrl+K` düymələrini basın.

---

#### Ianə yönləndirmə marşrutu {#donate-redirect}

- `website/src/pages/donate.js`
- Marşrut: `/donate` (və `/<locale>/donate`)
- Davranış:
- Əgər cari marşrutda lokal varsa (məs., `/de/donate`), onu istifadə et
- Əks halda, `navigator.languages` ilə konfiqurasiya olunmuş lokallar arasında ən yaxşı uyğunluğu seç; susmaya görə lokala qayıt
- Yönləndirilir:
- `en` → `/docs/donation`
- digərləri → `/<locale>/docs/donation`
- Düzgün baseUrl işlənməsi üçün `useBaseUrl` istifadə edir
- Ehtiyat kimi meta yenilənmə + `noscript` linkini daxil edir

---

---

#### Önbaxış Məsləhətləri {#preview-tips}

- Node önbaxışını təmiz dayandırın: `http://localhost:<port>/__stop` açın (`Local server started` sonra çap olunur).
- Əgər şəkillər MDX/JSX-də yüklənmirsə, saytın `baseUrl`-nə hörmət etmək üçün `useBaseUrl('/img/...')` istifadə edin.
- Önbaxış əvvəl başlayır; link yoxlanışı sonra işləyir və bloklamır (qırıq xarici linklər önbaxışı dayandırmayacaq).
- Nümunə önbaxış URL-i: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started”dan sonra çap olunur).
- Link-yoxlamasında xarici keçidlər: Bəzi xarici saytlar (məs., addons.thunderbird.net) avtomatlaşdırılmış tarayıcıları bloklayır və link-yoxlamasında 403 göstərə bilər. Önbaxış yenə də başlayır; bunları görməzlikdən gəlmək təhlükəsizdir.

---

#### Saytı Tərcümə edin {#translate-website}

Nələri tərcümə edə bilərsiniz

- Yalnız saytın UI-si: əsas səhifə, navbar, footer və digər UI sətrləri. Sənəd məzmunu hələlik yalnız İngiliscə qalır.

Harada redaktə etməli

- `website/i18n/<locale>/code.json` faylını redaktə edin (`en` sənədini istinad kimi istifadə edin). `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` kimi placeholder-ları dəyişməyin.

Faylları yaradın və ya yeniləyin

- Bütün lokallar üçün çatışmayan şablonları yaradın: `npm --prefix website run i18n:stubs`
- İngiliscədən şablonları üstələyin (yeni sətirlər əlavə etdikdən sonra): `npm --prefix website run i18n:stubs:force`
- Tək bir lokal üçün alternativ: `npx --prefix website docusaurus write-translations --locale <locale>`

Əsas səhifə/navbar/footer UI sətirlərini tərcümə edin (OpenAI)

- Məlumatları bir dəfə qurun (shell və ya .env):
- `export OPENAI_API_KEY=sk-...`
- İxtiyari: `export OPENAI_MODEL=gpt-4o-mini`
- Bir dəfəlik (bütün lokallar, en keçilsin): `make translate_web_index`
- Müəyyən lokallarla məhdudlaşdırın: `make translate_web_index OPTS="--locales de,fr"`
- Mövcud dəyərlərin üzərindən yazın: `make translate_web_index OPTS="--force"`

Doğrulama və yenidən cəhdlər

- Tərcümə skripti JSON formasını yoxlayır, curly‑brace placeholder-ları qoruyur və URL-lərin dəyişmədiyini təmin edir.
- Doğrulama uğursuz olarsa, mövcud dəyərləri saxlamazdan əvvəl 2 dəfəədək geribildirimlə yenidən cəhd edir.

Lokalınızı önbaxış edin

- İnkişaf serveri: `npm --prefix website run start`
- `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/` ünvanına daxil olun

Təqdim etmə

- Redaktə edilmiş `code.json` fayl(lar)ı ilə PR açın. Dəyişiklikləri fokuslanmış saxlayın və mümkün olduqda qısa ekran görüntüsü əlavə edin.

---

### Təhlükəsizlik və Konfiqurasiya Məsləhətləri {#security-and-configuration-tips}

- `sources/manifest.json` faylını commit etməyin (build tərəfindən müvəqqəti yaradılır)
- Yeniləmə kanalını qorumaq üçün `browser_specific_settings.gecko.id` sabit saxlayın

---

### Ayarların Davamlılığı {#settings-persistence}

- Saxlama: Bütün istifadəçi ayarları `storage.local` daxilindədir və əlavə yeniləmələri boyunca qorunur.
- Quraşdırma: Susmaya görə dəyərlər yalnız açar tamamilə yoxdursa (undefined) tətbiq olunur.
- Yeniləmə: Miqrasiya yalnız çatışmayan açarları doldurur; mövcud dəyərlərin üzərinə heç vaxt yazılmır.
- Sxem göstəricisi: `settingsVersion` (hazırda `1`).
- Açarlar və susmaya görə dəyərlər:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kod: bax `sources/background.js` → `initializeOrMigrateSettings()` və `SCHEMA_VERSION`.

İnkişaf iş axını (yeni ayar əlavə etmək)

- `sources/background.js` daxilində `SCHEMA_VERSION` dəyərini artırın.
- Yeni açarı + susmaya görə dəyəri `initializeOrMigrateSettings()` içindəki `DEFAULTS` obyektinə əlavə edin.
- Susmaya görə dəyərləri toxumlayarkən “yalnız undefined olduqda” qaydasından istifadə edin; mövcud dəyərlərin üzərinə yazmayın.
- Ayar istifadəçiyə görünürdüsə, onu `sources/options.js` daxilində qoşun və lokallaşdırılmış sətrlər əlavə edin.
- Testlər əlavə edin/düzəldin (bax `tests/background.settings.migration.test.js`).

Əl ilə sınaq məsləhətləri

- Təmiz quraşdırmanı simulyasiya edin: genişlənmənin məlumat qovluğunu təmizləyin və ya yeni profillə başlayın.
- Yeniləməni simulyasiya edin: `storage.local` daxilində `settingsVersion` dəyərini `0` olaraq təyin edin və yenidən yükləyin; mövcud dəyərlərin dəyişmədiyini və yalnız çatışmayan açarların əlavə olunduğunu təsdiqləyin.

---

### Problemlərin həlli {#troubleshooting}

- Thunderbird-in 128 ESR və ya daha yeni olduğundan əmin olun
- İcra zamanı problemlər üçün Xəta Konsolundan istifadə edin
- Əgər saxlanılan ayarlar düzgün tətbiq olunmur kimi görünürsə, Thunderbird-i yenidən başladın və yenidən cəhd edin. (Thunderbird sessiyalar arasında vəziyyəti keşləyə bilər; yenidən başlatma təzə ayarların yüklənməsini təmin edir.)

---

### CI və Əhatə {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) vitest-i əhatə hədləri ilə işə salır (85% sətirlər/funksiyalar/budaqlar/bəyanatlar). Hədlər ödənilməzsə, iş uğursuz olur.
- İş axını HTML hesabatı ilə `coverage-html` artifaktını yükləyir; onu run səhifəsindən endirin (Actions → son run → Artifacts).

---

### Töhfə {#contributing}

- Budaq/commit/PR qaydaları üçün CONTRIBUTING.md sənədinə baxın
- Məsləhət: gündəlik profilinizə təsir etməmək üçün sınaq üçün ayrıca Thunderbird inkişaf profili yaradın.

---

### Tərcümələr

- Böyük “hamı → hamı” tərcümə işləri yavaş və baha başa gələ bilər. Əvvəlcə alt dəstdən başlayın (məs., bir neçə sənəd və 1–2 lokal), nəticəni nəzərdən keçirin, sonra genişləndirin.

---

- Təkrar cəhd siyasəti: tərcümə işləri API xətalarında eksponential geri çəkilmə ilə 3 dəfəədək yenidən cəhd edir; bax `scripts/translate_web_docs_batch.js` və `scripts/translate_web_docs_sync.js`.

Sənədlər üçün ekran görüntüləri

- Şəkilləri `website/static/img/` altında saxlayın.
- Onlara MD/MDX-də `useBaseUrl('/img/<filename>')` vasitəsilə istinad edin ki, yollar saytın `baseUrl` ilə işləsin.
- `website/static/img/` altında şəkillər əlavə etdikdən və ya adını dəyişdikdən sonra, bütün istinadların hələ də `useBaseUrl('/img/…')` istifadə etdiyini və yerli önbaxışda göstərildiyini təsdiq edin.
  Favikonlar

- Çox ölçülü `favicon.ico` bütün build yollarında (Make + skriptlər) `website/scripts/build-favicon.mjs` vasitəsilə avtomatik yaradılır.
- Əl ilə addım tələb olunmur; `icon-*.png` yeniləmək kifayətdir.
  Baxış məsləhəti

- Tərcümə olunmuş sənədlərdə ön-məlumat `id` dəyişməz saxlayın; yalnız varsa `title` və `sidebar_label` sahələrini tərcümə edin.

#### clean {#mt-clean}

- Məqsəd: yerli build/preview artifaktlarını silmək.
- İstifadə: `make clean`
- Silir (əgər mövcuddursa):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Məqsəd: formatlamaq, test etmək, dəyişiklik jurnalını yeniləmək, commit və push etmək.
- İstifadə: `make commit`
- Ətraflı: Prettier (yazı), `make test`, `make test_i18n` çalışdırır; səhnələnmiş fərqlər olduqda changelog-a əlavə edir; `origin/<branch>`-a push edir.

---

#### eslint {#mt-eslint}

- Məqsəd: ESLint-i flat konfiq ilə işə salmaq.
- İstifadə: `make eslint`

---

#### help {#mt-help}

- Məqsəd: bütün hədəfləri bir sətirlik izahla siyahılamak.
- İstifadə: `make help`

---

#### lint {#mt-lint}

- Məqsəd: MailExtension-u `web-ext` istifadə edərək lint etmək.
- İstifadə: `make lint`
- Qeydlər: `sources/manifest_LOCAL.json` → `sources/manifest.json` müvəqqəti surətlənir; qurulmuş ZIP-lər yox sayılır; xəbərdarlıqlar boru xəttini uğursuz etmir.

---

#### menu {#mt-menu}

- Məqsəd: Make hədəfini və ixtiyari arqumentləri seçmək üçün interaktiv menyu.
- İstifadə: `make` arqumentsiz işə salın.
- Qeydlər: əgər `whiptail` əlçatan deyilsə, menyu `make help`-ə qayıdır.

---

#### pack {#mt-pack}

- Məqsəd: ATN və LOCAL ZIP-lərini qurmaq (`lint` asılıdır).
- İstifadə: `make pack`
- Məsləhət: paketləmədən əvvəl versiyaları hər iki `sources/manifest_*.json` daxilində artırın.

---

#### prettier {#mt-prettier}

- Məqsəd: repozitoriyanı yerində formatlamaq.
- İstifadə: `make prettier`

#### prettier_check {#mt-prettier_check}

- Məqsəd: formatlamanı yoxlamaq (yazı yoxdur).
- İstifadə: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Məqsəd: `prettier` üçün təxəllüs.
- İstifadə: `make prettier_write`

---

#### test {#mt-test}

- Məqsəd: Prettier (yazı), ESLint, sonra Vitest (əhatə quraşdırılıbsa) işlətmək.
- İstifadə: `make test`

#### test_i18n {#mt-test_i18n}

- Məqsəd: əlavə sətirləri və sayt sənədləri üçün i18n‑mərkəzli testlər.
- İstifadə: `make test_i18n`
- İşlədir: `npm run test:i18n` və `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Məqsəd: əlavənin UI sətirlərini EN-dən digər lokallara tərcümə etmək.
- İstifadə: `make translation_app OPTS="--locales all|de,fr"`
- Qeydlər: açar strukturunu və placeholder-ları qoruyur; `translation_app.log` faylına jurnallayır. Skript forması: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Məqsəd: vebsayt sənədlərini `website/docs/*.md`-dən `website/i18n/<locale>/...`-a tərcümə etmək.
- Üstünlük verilən: `translate_web_docs_batch` (OpenAI Batch API)
  - İstifadə (fləqlər): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - İrsi pozisional hələ də qəbul olunur: `OPTS="<doc|all> <lang|all>"`
- Davranış: JSONL qurur, yükləyir, hər 30 saniyədə sorğu edir, nəticələri endirir, faylları yazır.
- Qeyd: batch işi tamamlanmaq üçün 24 saata qədər çəkə bilər (OpenAI-nin batch pəncərəsinə görə). Konsol hər sorğuda keçən vaxtı göstərir.
- Mühit: `OPENAI_API_KEY` (tələb olunur), əlavə olaraq `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (susma 24s), `BATCH_POLL_INTERVAL_MS`.
- İrsi: `translate_web_docs_sync`
  - İstifadə (fləqlər): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - İrsi pozisional hələ də qəbul olunur: `OPTS="<doc|all> <lang|all>"`
- Davranış: hər cütlük üçün sinxron sorğular (batch aqreqasiyası yoxdur).
- Qeydlər: `OPTS` buraxıldıqda interaktiv sorğular. Hər iki rejim kod bloklarını/inline kodu qoruyur və ön‑məlumat `id` dəyişməz saxlayır; jurnallar `translation_web_batch.log` (batch) və ya `translation_web_sync.log` (sync) faylına yazılır.

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Məqsəd: vebsaytın UI sətrlərini (əsas səhifə, navbar, footer) `website/i18n/en/code.json`-dən `website/i18n/<locale>/code.json` altındakı bütün lokallara tərcümə etmək (`en` istisna olmaqla).
- İstifadə: `make translate_web_index` və ya `make translate_web_index OPTS="--locales de,fr [--force]"`
- Tələblər: `OPENAI_API_KEY` eksport edin (ixtiyari: `OPENAI_MODEL=gpt-4o-mini`).
- Davranış: JSON strukturunu yoxlayır, curly‑brace placeholder-ları saxlayır, URL-ləri dəyişməz saxlayır və doğrulama xətalarında geribildirimlə yenidən cəhd edir.

---

#### web_build {#mt-web_build}

- Məqsəd: sənədlər saytını `website/build`-ə qurmaq.
- İstifadə: `make web_build OPTS="--locales en|de,en|all"` (və ya `BUILD_LOCALES="en de"` təyin edin)
- Daxili: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Asılılıqlar: `website/node_modules/@docusaurus` yoxdursa yalnız `website/` daxilində `npm ci` işə salınır.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Məqsəd: oflayn‑təhlükəsiz keçid yoxlaması.
- İstifadə: `make web_build_linkcheck OPTS="--locales en|all"`
- Qeydlər: `tmp_linkcheck_web_pages`-ə qurur; GH Pages `baseUrl`-ni `/` olaraq yenidən yazır; uzaq HTTP(S) keçidlərini ötürür.

#### web_build_local_preview {#mt-web_build_local_preview}

- Məqsəd: ixtiyari testlər/link‑yoxlaması ilə yerli gh‑pages önbaxışı.
- İstifadə: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Davranış: əvvəlcə Node önbaxış serverini sınayır (`scripts/preview-server.mjs`, `/__stop` dəstəkləyir), `python3 -m http.server`-a qayıdır; 8080–8090 portlarında xidmət edir; PID `web-local-preview/.server.pid` faylındadır.

#### web_push_github {#mt-web_push_github}

- Məqsəd: `website/build`-i `gh-pages` budağına push etmək.
- İstifadə: `make web_push_github`

Məsləhət: Makefile tərəfindən istifadə olunan paket menecerini ləğv etmək üçün `NPM=…` təyin edin (susma olaraq `npm`).

---
