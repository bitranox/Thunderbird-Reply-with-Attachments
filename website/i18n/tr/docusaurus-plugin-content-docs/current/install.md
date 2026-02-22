---
id: install
title: 'Kurulum'
slug: /install
sidebar_label: 'Kurulum'
---

---

## "Thunderbird Eklentiler ve Temalar" üzerinden kurulum {#installation-in-thunderbird-recommended}

:::important Minimum Thunderbird Sürümü
Bu eklenti Thunderbird **128 ESR veya daha yeni** sürümleri destekler. Daha eski sürümler desteklenmez.
:::

Bu, önerilen kurulum yöntemidir. ATN’den (addons.thunderbird.net) yüklenen eklentiler otomatik güncellemeler alır. LOCAL/dev kurulumları otomatik güncellenmez.

- Minimum Thunderbird sürümü: 128 ESR veya daha yeni.

1. Thunderbird’de **Araçlar > Eklentiler ve Temalar** menüsüne gidin.
2. "reply with attachments" ifadesini arayın.
3. Eklentiyi ekleyin.

Veya eklenti sayfasını doğrudan açın: [Thunderbird Eklentileri (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI’den manuel kurulum {#local-installation-in-thunderbird}

### XPI dosyasını indirin {#download-the-xpi-file}

1. [Thunderbird eklenti sayfasına](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) gidin.
2. Eklentinin en son sürümünü XPI dosyası (`reply_with_attachments-x.y.z-tb.xpi`) olarak indirin.

### Thunderbird’da yükleme {#install-in-thunderbird-local}

1. Thunderbird’i açın.
2. **Araçlar > Eklentiler ve Temalar** menüsüne gidin.
3. **Eklenti Yöneticisi**’nde, sağ üst köşedeki dişli simgesine tıklayın.
4. Menüden **Dosyadan Eklenti Yükle…** öğesini seçin.
5. İndirilen `reply_with_attachments-x.y.z-tb.xpi` dosyasını seçin.
6. İstendiğinde kurulumu onaylayın.

---

## Geliştirme için kurulum {#installation-for-development}

### Depoyu indirin {#download-the-repository}

1. GitHub deposunun en son sürümünü indirin.
2. Daha fazla bilgi için `make help` komutunu çalıştırın.

### Thunderbird’da yükleme {#install-in-thunderbird-dev}

1. Thunderbird’i açın.
2. **Araçlar > Eklentiler ve Temalar** menüsüne gidin.
3. **Eklenti Yöneticisi**’nde sağ üst köşedeki dişli simgesine tıklayın.
4. Menüden **Dosyadan Eklenti Yükle…** öğesini seçin.
5. Oluşturulan dosya `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` öğesini seçin.
6. İstendiğinde kurulumu onaylayın.

Not: Thunderbird sisteminizde `.zip` dosyasını kabul etmiyorsa, adını `.xpi` olarak değiştirin ve “Dosyadan Eklenti Yükle…” seçeneğini yeniden deneyin.

### LOCAL ZIP nerede bulunur {#where-local-zip}

- Önce eklentiyi paketleyin: depo kök dizininde `make pack` komutunu çalıştırın.
- Paketlemeden sonra “LOCAL” zip dosyasını depo kökünde bulun (örn. `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Test için yeniden paketlemeden önce hem `sources/manifest_ATN.json` hem de `sources/manifest_LOCAL.json` içinde sürüm numaralarını artırın.

---

## Devre dışı bırakma, kaldırma ve güncellemeler {#disable-uninstall-updates}

- Devre dışı bırak: Thunderbird → Araçlar → Eklentiler ve Temalar → eklentiyi bulun → kapatın.
- Kaldır: aynı görünüm → üç nokta menüsü → Kaldır.
- Güncellemeler: ATN’den yüklenenler, yeni sürümler onaylandığında otomatik güncellenir. LOCAL/dev kurulumları otomatik güncellenmez; yeni bir LOCAL derlemeyi elle yeniden yükleyin.
- Ayarları tamamen kaldırma: bkz. [Gizlilik → Veri kaldırma](privacy#data-removal).

Ayrıca bkz.

- [Hızlı başlangıç](quickstart)
