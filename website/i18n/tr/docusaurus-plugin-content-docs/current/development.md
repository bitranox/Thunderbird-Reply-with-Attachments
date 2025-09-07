---
id: development
title: Geliştirme
sidebar_label: Geliştirme
---

## Geliştirme kılavuzu

### Önkoşullar

- Node.js 18+ ve npm
- Thunderbird 128 ESR veya üzeri (el ile test için)

### Proje yerleşimi (üst düzey)

- Kök: paketleme betiği `distribution_zip_packer.sh`, dokümanlar, ekran görüntüleri
- `sources/`: eklenti ana kodu (arka plan, seçenekler/pencere UI, manifestler, simgeler)
- `tests/`: Vitest paketi
- `website/`: Docusaurus dokümanları (i18n `website/i18n/de/...` altında)

### Kurulum ve araçlar

- Kök bağımlılıkları kur: `npm ci`
- Dokümanlar (isteğe bağlı): `cd website && npm ci`
- Hedefleri keşfet: `make help`

### Derleme ve paketleme

- ZIP oluştur: `make pack`
  - Depo kökünde ATN ve LOCAL ZIP üretir (çıktıları elle düzenlemeyin)
  - İpucu: paketlemeden önce hem `sources/manifest_ATN.json` hem de `sources/manifest_LOCAL.json` içindeki sürümü güncelleyin
- Manuel kurulum (geliştirme): Thunderbird → Araçlar → Eklentiler ve temalar → dişli → Dosyadan eklenti yükle… → oluşturulan ZIP’i seçin

### Test

- Tam paket: `make test` (Vitest)
- Kapsam (isteğe bağlı):
  - `npm i -D @vitest/coverage-v8`
  - `make test` çalıştırın; `coverage/index.html` raporunu açın
- Yalnızca i18n: `make test-i18n` (eşlik, yer tutucular, başlıklar)

### Hata ayıklama ve günlükler

- Hata Konsolu: Araçlar → Geliştirici Araçları → Hata Konsolu
- Çalışma zamanında ayrıntılı günlükler:
  - Etkinleştir: `messenger.storage.local.set({ debug: true })`
  - Devre dışı bırak: `messenger.storage.local.set({ debug: false })`
- Günlükler yanıtı yazarken/gönderirken görünür

### Dokümanlar (web sitesi)

- Geliştirme sunucusu: `cd website && npm run start`
- Statik site derlemesi: `cd website && npm run build`
- i18n: İngilizce `website/docs/*.md`; Almanca `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Arama: CI’da Algolia DocSearch değişkenleri ayarlıysa (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`) Algolia kullanılır; aksi halde yerel arama. Ana sayfada `/` veya `Ctrl+K`.

### Güvenlik ve yapılandırma

- `sources/manifest.json` dosyasını commit etmeyin (derleme geçici olarak oluşturur)
- Güncelleme kanalını korumak için `browser_specific_settings.gecko.id` sabit kalsın

### Sorun giderme

- Thunderbird’ın 128 ESR veya üzeri olduğundan emin olun
- Çalışma zamanı sorunları için Hata Konsolunu kullanın

### CI ve kapsam

- GitHub Actions (`CI — Tests`) vitest’i kapsam eşikleriyle (yüzde 85 satır/fonksiyon/dal/beyan) çalıştırır. Karşılanmazsa iş başarısız olur.
- İş akışı `coverage-html` artefaktını (HTML raporu) yükler; çalıştırma sayfasından indirin (Actions → son çalıştırma → Artifacts).

### Katkıda bulunma

- Branch/commit/PR yönergeleri için CONTRIBUTING.md dosyasına bakın
