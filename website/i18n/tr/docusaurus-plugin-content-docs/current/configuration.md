---
id: configuration
title: Yapılandırma
---

# Yapılandırma

Terimler notu: Arayüz ve belgelerde tutarlı kullanım için [Sözlüğe](glossary) bakın.

## Thunderbird’da seçenekleri açma

- Thunderbird → Araçlar → Eklentiler ve temalar → “Reply with Attachments” → Tercihler/Seçenekler

### Ayarlar:

#### Onay

- “Ekleri eklemeden önce sor” seçeneğini açıp kapatın.
- Varsayılan yanıt: Evet veya Hayır (odak ve klavye varsayılanı).
- Klavye: Y/J = Evet; N/Esc = Hayır; Tab/Shift+Tab ve ok tuşlarıyla odak değişir.

#### Kara liste (glob desenleri)

Kara listedeki dosyalar yanıtlarken otomatik olarak eklenmez.

- Satır başına bir desen; büyük/küçük harf duyarsız; yalnızca dosya adında eşleşir.
- Örnekler: `*.png`, `smime.*`, `*.p7s`.
- Desteklenen glob belirteçleri: `*` ( `/` hariç herhangi bir karakter), `?` (tek karakter), `[abc]` gibi sınıflar. `[` karakterini aynen eşlemek için `\[` kullanın. Sadece dosya adı eşleştiğinden yollar (`**/`) yok sayılır.
- Desteklenmez: olumsuzlama (`!`), süslü parantez genişletme (`{..}`) ve karmaşık aralıklar. Desenleri basit tutun.

İpucu: İlk açılışta varsayılanlar doldurulur ve istenildiğinde sıfırlanabilir.

#### Hariç tutulan ekler için uyarı

- “Ekler kara liste nedeniyle çıkarılırsa uyar” seçeneğini açın (varsayılan: AÇIK).
- Etkinleştirildiğinde küçük bir pencere, çıkarılan dosyaları ve eşleşen desen(ler)i listeler. Tüm adaylar çıkarılmışsa ve hiçbir şey eklenmeyecekse de bu uyarı görünür.

#### Ayarlarınızı kaydedin

---

### Dosya adı normalleştirme (yinelenenleri önleme)

Platformlar arasında tutarlı davranmak için, yinelenenleri kontrol etmeden önce dosya adları normalleştirilir:

- Unicode NFC’ye dönüştürülür.
- Adlar küçük harfe indirilir.
- Sondaki nokta/boşluklar kırpılır (Windows uyumluluğu).

Bu sayede `café.pdf` ve `café.pdf` (NFD) ya da `FILE.txt.` ve `file.txt` gibi adlarda yinelenenleri öngörülebilir şekilde tespit eder.
