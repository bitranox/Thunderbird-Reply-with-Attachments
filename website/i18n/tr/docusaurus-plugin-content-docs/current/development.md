---
id: development
title: 'Geliştirme'
sidebar_label: 'Geliştirme'
---

---

## Geliştirme Kılavuzu {#development-guide}

:::note Yalnızca İngilizceyi düzenleyin; çeviriler yayılır
Belgeleri yalnızca `website/docs` (İngilizce) altında güncelleyin. `website/i18n/<locale>/…` altındaki çeviriler otomatik üretilir ve elle düzenlenmemelidir. Yerelleştirilmiş içeriği yenilemek için çeviri görevlerini (örn. `make translate_web_docs_batch`) kullanın.
:::

### Önkoşullar {#prerequisites}

- Node.js 22+ ve npm (Node 22 ile test edildi)
- Thunderbird 128 ESR veya daha yeni (manuel test için)

---

### Proje Düzeni (üst düzey) {#project-layout-high-level}

- Kök dizin: paketleme betiği `distribution_zip_packer.sh`, dokümanlar, ekran görüntüleri
- `sources/`: ana eklenti kodu (arka plan, seçenekler/açılır UI, manifestler, simgeler)
- `tests/`: Vitest paketi
- `website/`: Docusaurus belgeleri (`website/i18n/de/...` altında i18n ile)

---

### Kurulum ve Araçlar {#install-and-tooling}

- Kök bağımlılıkları kur: `npm ci`
- Dokümanlar (isteğe bağlı): `cd website && npm ci`
- Hedefleri keşfet: `make help`

---

### Canlı Geliştirme (web‑ext run) {#live-dev-web-ext}

- Firefox Desktop’ta hızlı döngü (yalnızca UI smoke testleri):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird’de çalıştır (MailExtensions için tercih edilen):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- İpuçları:
- Thunderbird’ün Hata Konsolunu açık tutun (Araçlar → Geliştirici Araçları → Hata Konsolu).
- MV3 etkinlik sayfaları boşta iken askıya alınır; kod değişikliklerinden sonra eklentiyi yeniden yükleyin veya web‑ext’in otomatik yeniden yüklemesine izin verin.
- Yalnızca Firefox’a özgü bazı davranışlar farklı olabilir; API eşliği için her zaman Thunderbird’de doğrulayın.
- Thunderbird ikili dosya yolları (örnekler):
- Linux: `thunderbird` (örn. `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Profil izolasyonu: Günlük kurulumunuzu etkilememek için geliştirme amacıyla ayrı bir Thunderbird profili kullanın.

---

### Make Hedefleri (Alfabetik) {#make-targets-alphabetical}

Makefile yaygın geliştirme akışlarını standartlaştırır. Her hedefin tek satırlık özetini görmek için istediğiniz zaman `make help` çalıştırın.

İpucu: `make` komutunu bir hedef belirtmeden çalıştırmak, hedef seçmek için basit bir Whiptail menüsü açar.

| Hedef                                                    | Tek satırlık açıklama                                                                           |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Yerel derleme/önizleme artifaktlarını kaldır (tmp/, web-local-preview/, website/build/).        |
| [`commit`](#mt-commit)                                   | Biçimlendir, testleri çalıştır (i18n dâhil), değişiklik günlüğünü güncelle, commit ve push yap. |
| [`eslint`](#mt-eslint)                                   | Düz (flat) yapılandırma ile ESLint çalıştır (`npm run -s lint:eslint`).                         |
| [`help`](#mt-help)                                       | Tüm hedefleri tek satırlık dokümanlarıyla (sıralı) listele.                                     |
| [`lint`](#mt-lint)                                       | `sources/` üzerinde web‑ext lint (geçici manifest; ZIP’leri yok sayar; ölümcül değildir).       |
| [`menu`](#mt-menu)                                       | Bir hedefi ve isteğe bağlı argümanları seçmek için etkileşimli menü.                            |
| [`pack`](#mt-pack)                                       | ATN ve LOCAL ZIP’leri derle (lint çalıştırır; paketleyici betiğini çağırır).                    |
| [`prettier`](#mt-prettier)                               | Depoyu yerinde biçimlendir (değişiklik yazar).                                                  |
| [`prettier_check`](#mt-prettier_check)                   | Prettier kontrol kipinde (yazma yok); yeniden biçimlendirme gerekirse başarısız olur.           |
| [`prettier_write`](#mt-prettier_write)                   | `prettier` için takma ad.                                                                       |
| [`test`](#mt-test)                                       | Prettier (yaz), ESLint ve ardından Vitest (yapılandırıldıysa kapsam).                           |
| [`test_i18n`](#mt-test_i18n)                             | Yalnızca i18n testleri: eklenti yer tutucuları/eşlik + web sitesi eşliği.                       |
| [`translate_app`](#mt-translation-app)                   | `translation_app` için takma ad.                                                                |
| [`translation_app`](#mt-translation-app)                 | Uygulama UI dizelerini `sources/_locales/en/messages.json` kaynağından çevirin.                 |
| [`translate_web_docs_batch`](#mt-translation-web)        | Web sitesi dokümanlarını OpenAI Batch API ile çevir (tercih edilen).                            |
| [`translate_web_docs_sync`](#mt-translation-web)         | Web sitesi dokümanlarını eşzamanlı çevir (eski, batch olmayan).                                 |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index` için takma ad.                                                          |
| [`translation_web_index`](#mt-translation_web_index)     | Ana sayfa/menü/altbilgi UI’sini çevir (`website/i18n/en/code.json → .../<lang>/code.json`).     |
| [`web_build`](#mt-web_build)                             | Dokümanları `website/build` konumuna derle (`--locales` / `BUILD_LOCALES` destekler).           |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Çevrimdışı güvenli bağlantı kontrolü (uzak HTTP[S] atlanır).                                    |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Yerel gh‑pages önizlemesi; 8080–8090’da otomatik sunum; isteğe bağlı testler/bağlantı kontrolü. |
| [`web_push_github`](#mt-web_push_github)                 | `website/build` ögesini `gh-pages` dalına it (push).                                            |

Seçeneklerin söz dizimi

- Seçenek geçirmek için `make <command> OPTS="…"` kullanın (tırnak önerilir). Aşağıdaki her hedef örnek kullanım gösterir.

--

-

#### Yerel yapı ipuçları {#locale-build-tips}

- Yerellerin bir alt kümesini derleyin: `BUILD_LOCALES="en de"` ayarlayın veya web hedeflerine `OPTS="--locales en,de"` geçin.
- Belirli bir yereli önizleme: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Derleme ve Paketleme {#build-and-package}

- ZIP’leri derle: `make pack`
- Depo kökünde ATN ve LOCAL ZIP’leri üretir (artifaktları elle düzenlemeyin)
- İpucu: paketlemeden önce hem `sources/manifest_ATN.json` hem de `sources/manifest_LOCAL.json` içindeki sürümü güncelleyin
- Manuel kurulum (geliştirme): Thunderbird → Araçlar → Eklentiler ve Temalar → dişli → Dosyadan Eklenti Yükle… → oluşturulan ZIP’i seçin

---

### Test {#test}

- Tam paket: `make test` (Vitest)
- Kapsam (isteğe bağlı):
- `npm i -D @vitest/coverage-v8`
- `make test` çalıştırın; HTML raporu için `coverage/index.html` dosyasını açın
- Yalnızca i18n: `make test_i18n` (UI anahtarları/yer tutucular/başlıklar + web sitesi için yerel/kişi başına doküman eşliği; id/title/sidebar_label kontrolleri)

---

### Hata Ayıklama ve Günlükler {#debugging-and-logs}

- Hata Konsolu: Araçlar → Geliştirici Araçları → Hata Konsolu
- Çalışma zamanında ayrıntılı günlükleri aç/kapat:
- Etkinleştir: `messenger.storage.local.set({ debug: true })`
- Devre dışı bırak: `messenger.storage.local.set({ debug: false })`
- Günlükler yanıt oluşturma/gönderme sırasında görünür

---

### Dokümanlar (web sitesi) {#docs-website}

- Geliştirme sunucusu: `cd website && npm run start`
- Statik site derle: `cd website && npm run build`
- Make eşdeğerleri (alfabetik): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Kullanım örnekleri:
- Yalnızca EN, test/bağlantı kontrolü yok, push yok: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Tüm yereller, test/bağlantı kontrolü ile ve ardından push: `make web_build_local_preview && make web_push_github`
- Yayımlamadan önce, çevrimdışı güvenli bağlantı kontrolünü çalıştırın: `make web_build_linkcheck`.
- i18n: İngilizce `website/docs/*.md` içinde; Almanca çeviriler `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` içinde
- Arama: Algolia DocSearch ortam değişkenleri CI’da (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`) ayarlıysa site Algolia aramasını kullanır; aksi takdirde yerel aramaya geri döner. Ana sayfada, arama kutusunu açmak için `/` veya `Ctrl+K` tuşlarına basın.

---

#### Bağış yönlendirme rotası {#donate-redirect}

- `website/src/pages/donate.js`
- Rota: `/donate` (ve `/<locale>/donate`)
- Davranış:
- Geçerli rotada bir yerel varsa (örn. `/de/donate`), onu kullan
- Aksi halde `navigator.languages` ile yapılandırılmış yereller arasında en iyi eşleşmeyi seç; varsayılan yerele geri dön
- Şuraya yönlendirir:
- `en` → `/docs/donation`
- diğerleri → `/<locale>/docs/donation`
- Doğru baseUrl işleme için `useBaseUrl` kullanır
- Geri dönüş olarak meta yenileme + `noscript` bağlantısı içerir

---

---

#### Önizleme İpuçları {#preview-tips}

- Node önizlemesini temiz şekilde durdur: `http://localhost:<port>/__stop` dosyasını açın (`Local server started` sonrası yazdırılır).
- MDX/JSX içinde görseller yüklenmiyorsa, site `baseUrl` değerine saygı göstermek için `useBaseUrl('/img/...')` kullanın.
- Önce önizleme başlar; bağlantı kontrolü daha sonra ve engelleyici olmayan şekilde çalışır (bozuk harici bağlantılar önizlemeyi durdurmaz).
- Örnek önizleme URL’si: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started” sonrasında yazdırılır).
- Bağlantı kontrolündeki harici bağlantılar: Bazı harici siteler (örn. addons.thunderbird.net) otomatik tarayıcıları engeller ve bağlantı kontrolünde 403 gösterebilir. Önizleme yine de başlar; bunlar yok sayılabilir.

---

#### Web Sitesini Çevirin {#translate-website}

Neleri çevirebilirsiniz

- Yalnızca web sitesi UI’si: ana sayfa, menü, altbilgi ve diğer UI dizeleri. Doküman içeriği şimdilik yalnızca İngilizce kalır.

Nerede düzenlenir

- `website/i18n/<locale>/code.json` dosyasını düzenleyin (referans olarak `en` kullanın). `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` gibi yer tutucuları değiştirmeden bırakın.

Dosyaları oluşturun veya yenileyin

- Tüm yereller için eksik şablonları oluştur: `npm --prefix website run i18n:stubs`
- İngilizceden şablonları üzerine yaz (yeni dizeler ekledikten sonra): `npm --prefix website run i18n:stubs:force`
- Tek bir yerel için alternatif: `npx --prefix website docusaurus write-translations --locale <locale>`

Ana sayfa/menü/altbilgi UI dizelerini çevir (OpenAI)

- Kimlik bilgilerini bir kez ayarlayın (kabuk veya .env):
- `export OPENAI_API_KEY=sk-...`
- İsteğe bağlı: `export OPENAI_MODEL=gpt-4o-mini`
- Tek seferlik (tüm yereller, en hariç): `make translate_web_index`
- Belirli yerellerle sınırla: `make translate_web_index OPTS="--locales de,fr"`
- Mevcut değerlerin üzerine yaz: `make translate_web_index OPTS="--force"`

Doğrulama ve yeniden denemeler

- Çeviri betiği JSON şeklini doğrular, süslü ayraç yer tutucularını korur ve URL’lerin değişmediğini garanti eder.
- Doğrulama başarısız olursa, mevcut değerleri korumadan önce geri bildirimle en fazla 2 kez yeniden dener.

Yerelinizi önizleyin

- Geliştirme sunucusu: `npm --prefix website run start`
- `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/` adresini ziyaret edin

Gönderim

- Düzenlediğiniz `code.json` dosya(ları) ile bir PR açın. Değişiklikleri odaklı tutun ve mümkünse hızlı bir ekran görüntüsü ekleyin.

---

### Güvenlik ve Yapılandırma İpuçları {#security-and-configuration-tips}

- `sources/manifest.json` (derleme tarafından geçici olarak oluşturulur) dosyasını commit etmeyin
- Güncelleme kanalını korumak için `browser_specific_settings.gecko.id` sabit kalsın

---

### Ayarların Kalıcılığı {#settings-persistence}

- Depolama: Tüm kullanıcı ayarları `storage.local` içinde bulunur ve eklenti güncellemeleri arasında korunur.
- Yükleme: Varsayılanlar yalnızca bir anahtar kesin olarak yoksa (undefined) uygulanır.
- Güncelleme: Bir geçiş (migration) yalnızca eksik anahtarları doldurur; mevcut değerlerin üzerine asla yazılmaz.
- Şema işaretçisi: `settingsVersion` (şu anda `1`).
- Anahtarlar ve varsayılanlar:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kod: bkz. `sources/background.js` → `initializeOrMigrateSettings()` ve `SCHEMA_VERSION`.

Geliştirme iş akışı (yeni bir ayar ekleme)

- `sources/background.js` içinde `SCHEMA_VERSION` sürümünü artırın.
- Yeni anahtarı + varsayılanı `initializeOrMigrateSettings()` içindeki `DEFAULTS` nesnesine ekleyin.
- Varsayılanları tohumlarken “only-if-undefined” kuralını kullanın; mevcut değerlerin üzerine yazmayın.
- Ayar kullanıcıya görünürse, `sources/options.js` içinde bağlayın ve yerelleştirilmiş dizeler ekleyin.
- Test ekleyin/ayarlayın (bkz. `tests/background.settings.migration.test.js`).

Manuel test ipuçları

- Tertemiz kurulum simüle edin: eklentinin veri dizinini temizleyin veya yeni bir profille başlayın.
- Güncelleme simüle edin: `storage.local` içinde `settingsVersion` değerini `0` olarak ayarlayın ve yeniden yükleyin; mevcut değerlerin değişmediğini ve yalnızca eksik anahtarların eklendiğini doğrulayın.

---

### Sorun Giderme {#troubleshooting}

- Thunderbird’ün 128 ESR veya daha yeni olduğundan emin olun
- Çalışma zamanı sorunları için Hata Konsolunu kullanın
- Kayıtlı ayarlar düzgün uygulanmıyor gibi görünüyorsa Thunderbird’ü yeniden başlatın ve tekrar deneyin. (Thunderbird oturumlar arasında durumu önbelleğe alabilir; yeniden başlatma taze ayarların yüklenmesini sağlar.)

---

### CI ve Kapsam {#ci-and-coverage}

- GitHub Actions (`CI — Tests`), kapsama eşikleriyle (satırlar/fonksiyonlar/dallar/ifadeler %85) vitest çalıştırır. Eşikler karşılanmazsa iş başarısız olur.
- İş akışı, HTML raporu içeren `coverage-html` artifaktını yükler; bunu çalıştırma sayfasından indirin (Actions → son çalıştırma → Artifacts).

---

### Katkıda Bulunma {#contributing}

- Dal/commit/PR yönergeleri için CONTRIBUTING.md dosyasına bakın
- İpucu: Günlük profilinizi etkilememek için testlerde ayrı bir Thunderbird geliştirme profili oluşturun.

---

### Çeviriler

- Büyük “tümü → tümü” çeviri işleri yavaş ve maliyetli olabilir. Önce bir alt kümeyle (örn. birkaç doküman ve 1–2 yerel) başlayın, sonucu gözden geçirin, ardından genişletin.

---

- Yeniden deneme ilkesi: çeviri işleri API hatalarında üstel geri çekilme ile en fazla 3 yeniden deneme yapar; bkz. `scripts/translate_web_docs_batch.js` ve `scripts/translate_web_docs_sync.js`.

Dokümanlar için ekran görüntüleri

- Görselleri `website/static/img/` altında saklayın.
- MD/MDX içinde yolların site `baseUrl` değeriyle çalışması için `useBaseUrl('/img/<filename>')` üzerinden referans verin.
- `website/static/img/` altında görsel ekledikten veya yeniden adlandırdıktan sonra, tüm referansların hâlâ `useBaseUrl('/img/…')` kullandığını ve yerel önizlemede render edildiğini doğrulayın.
  Favikonlar

- Çok boyutlu `favicon.ico`, `website/scripts/build-favicon.mjs` aracılığıyla tüm derleme yollarında (Make + betikler) otomatik olarak oluşturulur.
- Herhangi bir manuel adım gerekmez; `icon-*.png` güncellenmesi yeterlidir.
  İnceleme ipucu

- Çevrilmiş dokümanlarda front‑matter içindeki `id` alanını değiştirmeyin; varsa yalnızca `title` ve `sidebar_label` alanlarını çevirin.

#### clean {#mt-clean}

- Amaç: yerel derleme/önizleme artifaktlarını kaldırmak.
- Kullanım: `make clean`
- Kaldırılanlar (varsa):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Amaç: biçimlendir, test et, değişiklik günlüğünü güncelle, commit ve push yap.
- Kullanım: `make commit`
- Ayrıntılar: Prettier (yaz), `make test`, `make test_i18n` çalıştırır; sahnelenmiş farklar varsa değişiklik günlüğüne ekler; `origin/<branch>` dalına push yapar.

---

#### eslint {#mt-eslint}

- Amaç: düz (flat) yapılandırma ile ESLint çalıştırmak.
- Kullanım: `make eslint`

---

#### help {#mt-help}

- Amaç: tüm hedefleri tek satırlık dokümanlarla listelemek.
- Kullanım: `make help`

---

#### lint {#mt-lint}

- Amaç: `web-ext` kullanarak MailExtension’ı lint’lemek.
- Kullanım: `make lint`
- Notlar: `sources/manifest_LOCAL.json` → `sources/manifest.json` geçici kopyaları; oluşturulan ZIP’leri yok sayar; uyarılar hattı başarısız etmez.

---

#### menu {#mt-menu}

- Amaç: bir Make hedefi ve isteğe bağlı argümanları seçmek için etkileşimli menü.
- Kullanım: `make` komutunu argümansız çalıştırın.
- Notlar: `whiptail` mevcut değilse menü `make help`’a geri döner.

---

#### pack {#mt-pack}

- Amaç: ATN ve LOCAL ZIP’leri derlemek (`lint` bağımlıdır).
- Kullanım: `make pack`
- İpucu: paketlemeden önce her ikisinde de sürümü artırın `sources/manifest_*.json`.

---

#### prettier {#mt-prettier}

- Amaç: depoyu yerinde biçimlendirmek.
- Kullanım: `make prettier`

#### prettier_check {#mt-prettier_check}

- Amaç: biçimlendirmeyi doğrulamak (yazma yok).
- Kullanım: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Amaç: `prettier` için takma ad.
- Kullanım: `make prettier_write`

---

#### test {#mt-test}

- Amaç: Prettier (yaz), ESLint ve ardından Vitest’i çalıştırmak (yüklüyse kapsam).
- Kullanım: `make test`

#### test_i18n {#mt-test_i18n}

- Amaç: eklenti dizeleri ve web sitesi dokümanları için i18n odaklı testler.
- Kullanım: `make test_i18n`
- Çalıştırır: `npm run test:i18n` ve `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Amaç: eklenti UI dizelerini EN’den diğer yerellere çevirmek.
- Kullanım: `make translation_app OPTS="--locales all|de,fr"`
- Notlar: anahtar yapısını ve yer tutucuları korur; `translation_app.log` dosyasına günlük yazar. Betik biçimi: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Amaç: web sitesi dokümanlarını `website/docs/*.md` dilinden `website/i18n/<locale>/...` dillerine çevirmek.
- Tercih edilen: `translate_web_docs_batch` (OpenAI Batch API)
  - Kullanım (bayraklar): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Eski konumsal hâlâ kabul edilir: `OPTS="<doc|all> <lang|all>"`
- Davranış: JSONL oluşturur, yükler, her 30 sn’de yoklar, sonuçları indirir, dosyaları yazar.
- Not: bir batch işi (OpenAI’nin batch penceresine göre) 24 saate kadar sürebilir. Konsol her yoklamada geçen süreyi gösterir.
- Ortam: `OPENAI_API_KEY` (zorunlu), isteğe bağlı `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (varsayılan 24s), `BATCH_POLL_INTERVAL_MS`.
- Eski: `translate_web_docs_sync`
  - Kullanım (bayraklar): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Eski konumsal hâlâ kabul edilir: `OPTS="<doc|all> <lang|all>"`
- Davranış: eşzamanlı çift başına istekler (batch toplanması yok).
- Notlar: `OPTS` atlandığında etkileşimli istemler. Her iki mod da kod bloklarını/satır içi kodu korur ve front‑matter içindeki `id` alanını değiştirmez; günlükler `translation_web_batch.log` (batch) veya `translation_web_sync.log` (eşzamanlı) dosyasına yazılır.

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Amaç: web sitesi UI dizelerini (ana sayfa, menü, altbilgi) `website/i18n/en/code.json` dilinden `website/i18n/<locale>/code.json` altındaki tüm yerellere çevirmek (`en` hariç).
- Kullanım: `make translate_web_index` veya `make translate_web_index OPTS="--locales de,fr [--force]"`
- Gereksinimler: `OPENAI_API_KEY` değişkenini dışa aktarın (isteğe bağlı: `OPENAI_MODEL=gpt-4o-mini`).
- Davranış: JSON yapısını doğrular, süslü ayraç yer tutucularını korur, URL’leri değiştirmez ve doğrulama hatalarında geri bildirimle yeniden dener.

---

#### web_build {#mt-web_build}

- Amaç: dokümanlar sitesini `website/build` konumuna derlemek.
- Kullanım: `make web_build OPTS="--locales en|de,en|all"` (veya `BUILD_LOCALES="en de"` ayarla)
- İç detaylar: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Bağımlılıklar: `website/node_modules/@docusaurus` eksikse yalnızca `website/` içinde `npm ci` çalıştırır.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Amaç: çevrimdışı güvenli bağlantı kontrolü.
- Kullanım: `make web_build_linkcheck OPTS="--locales en|all"`
- Notlar: `tmp_linkcheck_web_pages` konumuna derler; GH Pages `baseUrl` değerini `/` olarak yeniden yazar; uzak HTTP(S) bağlantılarını atlar.

#### web_build_local_preview {#mt-web_build_local_preview}

- Amaç: isteğe bağlı test/bağlantı kontrolü ile yerel gh‑pages önizlemesi.
- Kullanım: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Davranış: önce Node önizleme sunucusunu dener (`scripts/preview-server.mjs`, `/__stop` destekler), `python3 -m http.server`’a geri döner; 8080–8090’da sunar; PID `web-local-preview/.server.pid` konumundadır.

#### web_push_github {#mt-web_push_github}

- Amaç: `website/build` ögesini `gh-pages` dalına itmek.
- Kullanım: `make web_push_github`

İpucu: Makefile tarafından kullanılan paket yöneticisini geçersiz kılmak için `NPM=…` ayarlayın (varsayılan `npm`).
