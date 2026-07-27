---
id: usage
title: 'Kullanım'
sidebar_label: 'Kullanım'
---

---

## Kullanım {#usage}

- Yanıtla ve eklenti orijinalleri otomatik olarak ekler — veya Seçenekler'de etkinse önce sorar.
- Dosya adına göre yinelenenler ayıklanır; S/MIME parçaları her zaman atlanır. Orijinal mesaja gömülü görseller, Thunderbird'ün onları yerleştirdiği yerde, yanıtın gövdesinde kalır ve dosya olarak kopyalanmaz.
- Kara listeye alınmış ekler de atlanır (büyük/küçük harfe duyarsız glob desenleri dosya adlarıyla eşleşir, yollarla değil). Bkz. [Yapılandırma](configuration#blacklist-glob-patterns).

---

### Yanıtta ne olur {#what-happens}

- Yanıtı algıla → orijinal ekleri listele → S/MIME ve gömülü resimleri atla → isteğe bağlı onay → uygun dosyaları ekle (yinelenenleri atlayarak).

| Parça türü                                               | Yanıta kopyalandı mı      |
|----------------------------------------------------------|--------------------------:|
| S/MIME imza dosyası `smime.p7s`                          | Hayır                     |
| S/MIME MIME türleri (`application/pkcs7-*`)              | Hayır                     |
| Mesaj gövdesinin `cid:` ile gömdüğü görsel               | Hayır (gövdede zaten var) |
| `Content-Disposition: inline` olarak işaretlenmiş görsel | Hayır (gövdede zaten var) |
| Gövdenin hiç başvurmadığı `Content-ID`'li görsel         | Evet                      |
| Dosya adı olan ekli e-posta (`message/rfc822`)           | Evet                      |
| Dosya adı olan sıradan dosya eki                         | Evet                      |

Bir görsel yalnızca orijinal mesaj ona gerçekten başvurduğunda, ya da gönderen onu
açıkça `Content-Disposition: inline` olarak işaretlediğinde gömülü sayılır. Yalnızca
bir `Content-ID` başlığı yeterli değildir: bazı e-posta istemcileri bunu, gerçek ekler
dahil her görsel parçasına koyar; bunların yine de kopyalanması gerekir.

---

### Çapraz başvuru {#cross-reference}

- İletme tasarım gereği değiştirilmez (aşağıdaki Sınırlamalar bölümüne bakın).
- Bir ekin neden eklenmeyebileceği için bkz. “Ekler neden eklenmeyebilir”.

---

## Davranış Ayrıntıları {#behavior-details}

- **Çoğaltmayı önleme:** Eklenti, sekme başına oturum değeri ve bellek içi bir koruyucu kullanarak yazma sekmesini işlendi olarak işaretler. Orijinalleri iki kez eklemez.
- Bir yazma penceresini kapatıp yeniden açmak yeni bir sekme olarak kabul edilir (yani yeni bir denemeye izin verilir).
- **Mevcut eklere saygı:** Yazma penceresi zaten bazı ekler içeriyorsa, orijinaller yine de tam olarak bir kez eklenir; hâlihazırda mevcut olan dosya adları atlanır.
- **Dışlamalar:** S/MIME artıkları ve satır içi görseller dosya eklerinden hariç tutulur. İlk geçişte hiçbir şey uygun değilse, esnek bir geri dönüş S/MIME olmayan parçaları yeniden kontrol eder. Satır içi görseller ayrı ele alınır: etkinleştirildiğinde yanıt gövdesinde veri URI'leri olarak geri yüklenir.
  - **Dosya adları:** `smime.p7s`
  - **MIME türleri:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Satır içi görseller:** Content‑ID tarafından referans verilen herhangi bir `image/*` parçası — dosya eklerinden hariç tutulur ancak "Include inline pictures" AÇIK olduğunda yanıt gövdesine gömülür
  - **Ekli e-postalar (`message/rfc822`):** bir dosya adları varsa normal ek gibi değerlendirilir; eklenebilirler (kopya denetimleri ve kara listeye tabidir).
- **Kara liste uyarısı (etkinse):** Adaylar kara listeniz tarafından dışlandığında,
  eklenti etkilenen dosyaları ve eşleşen desen(ler)i listeleyen küçük bir modal gösterir.
  Her şey dışlandığı için hiçbir ekin eklenmeyeceği durumlarda da bu uyarı görünür.

---

## Klavye kısayolları {#keyboard-shortcuts}

- Onay iletişim kutusu: Y/J = Evet, N/Esc = Hayır; Tab/Shift+Tab ve yön tuşları odağı dolaştırır.
  - [Yapılandırma](configuration#confirmation) içindeki “Default answer” başlangıçta odaklanacak düğmeyi ayarlar.
  - Enter odaktaki düğmeyi tetikler. Erişilebilirlik için Tab/Shift+Tab ve oklar odağı taşır.

### Klavye Kısa Başvurusu {#keyboard-cheat-sheet}

| Tuşlar          | Eylem                                        |
|-----------------|----------------------------------------------|
| Y / J           | Evet'i onayla                                |
| N / Esc         | Hayır'ı onayla                               |
| Enter           | Odaklanmış düğmeyi etkinleştir               |
| Tab / Shift+Tab | Odağı ileri/geri taşı                        |
| Arrow keys      | Odağı düğmeler arasında taşı                 |
| Default answer  | Başlangıç odağını belirler (Evet veya Hayır) |

---

## Sınırlamalar {#limitations}

- İletme bu eklenti tarafından değiştirilmez (Yanıtla ve Tümünü yanıtla desteklenir).
- Çok büyük ekler Thunderbird veya sağlayıcı sınırlarına tabi olabilir.
  - Eklenti dosyaları bölmez veya sıkıştırmaz; Thunderbird’ün normal ek işleme özelliğine dayanır.
- Şifreli iletiler: S/MIME parçaları bilerek hariç tutulur.

---

## Ekler neden eklenmeyebilir {#why-attachments-might-not-be-added}

- Orijinal mesajın gömdüğü resimler dosya olarak kopyalanmaz. Bunlar zaten Thunderbird'in yerleştirdiği yerde, yanıt gövdesinde bulunur. Bkz. [Configuration](configuration#include-inline-pictures).
- S/MIME imza parçaları tasarım gereği hariç tutulur: `smime.p7s` gibi dosya adları ve `application/pkcs7-signature` veya `application/pkcs7-mime` gibi MIME türleri atlanır.
- Kara liste desenleri adayları filtreleyebilir: bkz. [Yapılandırma](configuration#blacklist-glob-patterns); eşleştirme büyük/küçük harfe duyarsızdır ve yalnızca dosya adına göredir.
- Yinelenen dosya adları yeniden eklenmez: yazma penceresi zaten aynı normalize adla bir dosya içeriyorsa atlanır.
- Dosya olmayan parçalar veya eksik dosya adları: yalnızca kullanılabilir dosya adlarına sahip dosya benzeri parçalar eklemek için dikkate alınır.

---

Bkz. ayrıca

- [Yapılandırma](configuration)
