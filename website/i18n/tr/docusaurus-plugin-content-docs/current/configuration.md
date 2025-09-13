---
id: configuration
title: 'Yapılandırma'
---

## Configuration

Terminoloji notu: UI ve belgelerde kullanılan tutarlı terimler için [Sözlük](glossary) sayfasını inceleyin.

---

## Open options in Thunderbird {#open-options-in-thunderbird}

- Thunderbird → Araçlar → Eklentiler ve Temalar → “Eklentiler ile Yanıtla”yı bulun → Tercihler/Seçenekler

---

### Settings {#settings}

#### Confirmation {#confirmation}

- “Eklentileri eklemeden önce sor” seçeneğini etkinleştir
- Varsayılan yanıt: Evet veya Hayır (odak ve klavye varsayılanı)
- Klavye: Y/J = Evet; N/Esc = Hayır; Tab/Shift+Tab ve Ok tuşları odak döngüsü
  - Klavye detayları için [Kullanım](usage#keyboard-shortcuts) sayfasına bakın.

---

#### Blacklist (glob patterns) {#blacklist-glob-patterns}

Karalistelenmiş dosyalar otomatik olarak yanıtta eklenmeyecek. “Kara Liste (Hariç tutma listesi)” terimi için [Sözlük](glossary) sayfasını da görebilirsiniz.

- Her satıra bir desen; büyük/küçük harf duyarsız; yalnızca dosya adı eşleşmesi
- Örnekler: `*intern*`, `*secret*`, `*passwor*`
- Desteklenen glob token’ları: `*` (herhangi bir karakter `/` hariç), `?` (bir karakter), `[abc]` gibi karakter sınıfları. `\[` kullanarak `[` ile tam eşleşme yapın. Yalnızca dosya adlarının eşleştiğinden, yollar (`**/`) göz ardı edilir.
- Desteklenmiyor: olumsuzlama (`!`), küme genişlemesi (`{..}`) ve karmaşık aralıklar. Desenleri basit tutun.
- Desenlerde yorumlar desteklenmiyor. `#` veya satır içi yorumlar eklemeyin; her satıra yalnızca desen metnini girin.

---

##### Pattern cookbook {#pattern-cookbook}

- Herhangi bir PDF'yi eşle: `*.pdf`
- “tarama” ile başlayan dosyaları eşle: `scan*`
- Karakter sınıfı: `report[0-9].txt`
- Bir `[` literalını kaçır: `\[` (bir karakter olarak bir parantezi eşleştirirken yararlıdır)

---

##### Notes {#blacklist-notes}

- Sıralamanın önemi yoktur; ilk veya herhangi bir eşleşme dosyayı hariç tutar.
- Eşleştirme yalnızca dosya adıyla yapılır (yollar/klasörler göz ardı edilir).
- “Varsayılanlara sıfırlama”, önerilen desenleri ve kara liste uyarısı geçişini geri yükler.
- Neden `*passwor*` örneği? Hem “password” hem de “Passwort” ailelerini eşleştirir.
- Öncelik: herhangi bir desen bir dosya adını eşleştirirse, dosya hariç tutulur (ilk/ herhangi bir eşleşme — sıra sonucu değiştirmez).
- İpucu — deseninizi test edin: geçici bir desen ekleyin, eşleşen bir名称 ile bir dosya içeren bir mesajı yanıtlayın ve uyarı listesinin dışına çıktığını onaylayın.

##### Quick try‑it (safe test) {#blacklist-try-it}

1. Seçenekler → Kara Listeyi açın.
2. `*.tmp` gibi geçici bir desen ekleyin ve Kaydet'i tıklayın.
3. `.tmp` ile biten bir dosyaya sahip bir test e-postasına yanıt verin — dosya uyarı listesinde görünmeli ve eklenmemelidir.
4. İşiniz bittiğinde geçici deseni kaldırın veya “Varsayılanlara sıfırla” seçeneğine tıklayın.

---

#### Warning on excluded attachments {#warning-on-excluded-attachments}

- “Kara liste ile hariç tutulan ekler hakkında uyar” seçeneğini etkinleştirin (varsayılan: AÇIK).
- Etkin olduğunda, küçük bir modal hariç tutulan dosyaları ve eşleşen desen(ler)i listeler.
  Ayrıca tüm adayların kara listeye alındığı durumlarda hiçbir şeyin eklenmeyeceği uyarısı da görünür.

---

#### Save your settings {#save-your-settings}

Ayarlar, Kaydet butonuna basarak kaydedilir. Gerekirse belirli alanları manuel olarak geri alabilir veya varsayılanları sıfırlayabilirsiniz.

Kaydedilen ayarlar düzgün görünmüyorsa, Thunderbird'ü yeniden başlatın ve tekrar deneyin. (Thunderbird, oturumlar arasında durumunu önbelleğe alabilir; yeniden başlama, taze ayarların yüklenmesini sağlar.)

İpucu: Ayarlarınızın etkili olduğunu doğrulamak için, bir ek ile herhangi bir mesaja yanıt verin ve onay veya kara liste uyarısını kontrol edin.

---

#### Donation Visibility (90‑day snooze) {#donation-visibility}

Eklenti, bağış yaptıktan sonra bir süreliğine bağış istemlerini gizlemek için bir kullanım kolaylığı özelliği içerir.

Nerede bulabilirsiniz

- Seçenekler → Destek bölümü: “Ben bağış yaptım” butonunu ve küçük bir ipucu alanını göreceksiniz.
- Gönderme-onay iletişim kutusu ayrıca bir Bağış butonu gösterir; bu, uyku aktif olduğunda otomatik olarak gizlenir.

Nasıl çalışır

- “Ben bağış yaptım” butonuna tıklamak, 90 gün boyunca bağış butonlarını ve ilgili istemleri gizler.
- Bir durum ipucu “YYYY-MM-DD tarihine kadar gizli” ifadesini gösterir (yerel tarihinizde). Ayrıca görünürlüğü hemen geri kazandırmak için bir “Bağış'ı tekrar göster” butonu da vardır.
- 90 gün sonra, Bağış butonu otomatik olarak tekrar görünür hale gelecektir.

Gizlilik ve depolama

- Eklenti, uyku süresini hatırlamak için Thunderbird'ün yerel depolamasında tek bir zaman damgası saklar. Anahtar: `donateHideUntil` (epoch milisaniyeleri).
- Bu ayar yalnızca Thunderbird profilinize özgüdür (bulut senkronizasyonu yoktur). Bu özellik ile ağ istekleri yapılmaz.

Sorun Giderme

- “Ben bağış yaptım” butonuna tıkladıktan hemen sonra Bağış hâlâ görünüyorsa, bir süre bekleyin veya Seçenekler sayfasını yeniden açın; UI ayar kaydedildiği anda güncellenir.
- Manuel sıfırlamak için “Bağış'ı tekrar göster” butonuna tıklayın. Ayrıca ipucunda listelenen tarihin geçmesini bekleyebilirsiniz.

Bu özellik tamamen kullanım kolaylığı içindir; eklenti işlevselliğini engellemez ve hiçbir kişisel veri toplamaz.

---

### Filename normalization (duplicates prevention) {#filename-normalization-duplicates-prevention}

Farklı platformlarda tutarlı davranmak için, dosya adları kopya kontrollerinden önce normalleştirilir:

- Unicode NFC'ye normalleştirilir.
- İsimler küçük harfle yazılır (lowercased).
- Kalan noktalar/boşluklar kesilir (Windows uyumluluğu).

Bu, `café.pdf` ile `café.pdf` (NFD) veya `FILE.txt.` ile `file.txt` gibi isimler için kopya algılamayı tahmin edilebilir kılar.

---

## Confirmation behavior {#confirmation-behavior}

- “Varsayılan yanıt”, onay iletişim kutusundaki başlangıçta odaklanan düğmeyi ayarlar (klavye kullanıcıları için yararlıdır).
- Hem “Yanıtla” hem de “Hepsine Yanıtla” için çalışır. “İlet” bu eklenti tarafından değiştirilmez.

---

## Advanced: duplicate detection {#advanced-duplicate-detection}

Kopya önleme, her bir yazma sekmesi ve dosya adına göre uygulanır. Detaylı açıklama için [Kullanım](usage#behavior-details) sayfasına bakın.

---

See also

- [Permissions](permissions)
- [Privacy](privacy)
