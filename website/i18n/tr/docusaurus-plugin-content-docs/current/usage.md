---
id: usage
title: 'Kullanım'
sidebar_label: 'Kullanım'
---

---

## Kullanım {#usage}

- Yanıtla ve eklenti orijinalleri otomatik olarak ekler — veya Seçenekler'de etkinse önce sorar.
- Dosya adına göre yinelenenler kaldırılır; S/MIME parçaları her zaman atlanır. Satır içi görseller varsayılan olarak yanıt gövdesinde geri yüklenir (Seçenekler'de "Include inline pictures" üzerinden devre dışı bırakılabilir).
- Kara listeye alınmış ekler de atlanır (büyük/küçük harfe duyarsız glob desenleri dosya adlarıyla eşleşir, yollarla değil). Bkz. [Yapılandırma](configuration#blacklist-glob-patterns).

---

### Yanıtta ne olur {#what-happens}

- Yanıtı algıla → özgün ekleri listele → S/MIME + satır içini filtrele → isteğe bağlı onay → uygun dosyaları ekle (yinelenenleri atla) → gövdede satır içi görselleri geri yükle.

Sıkı ve esnek geçiş: Eklenti önce dosya eklerinden S/MIME ve satır içi parçaları hariç tutar. Hiçbir şey uygun değilse, S/MIME/satır içini yine hariç tutan ancak daha fazla duruma tolerans gösteren esnek bir geçiş çalıştırır (bkz. Kod Ayrıntıları). Satır içi görseller asla dosya eki olarak eklenmez; bunun yerine "Include inline pictures" etkinleştirildiğinde (varsayılan), doğrudan yanıt gövdesine base64 veri URI'leri olarak gömülür.

| Parça türü                                                          |                              Sıkı geçiş |                             Esnek geçiş |
| ------------------------------------------------------------------- | --------------------------------------: | --------------------------------------: |
| S/MIME imza dosyası `smime.p7s`                                     |                           Hariç tutulur |                           Hariç tutulur |
| S/MIME MIME türleri (`application/pkcs7-*`)                         |                           Hariç tutulur |                           Hariç tutulur |
| Content‑ID tarafından referans verilen satır içi görsel (`image/*`) | Hariç tutulur (gövdede geri yüklenir\*) | Hariç tutulur (gövdede geri yüklenir\*) |
| Dosya adı olan ekli e-posta (`message/rfc822`)                      |                                Eklenmez |                             Eklenebilir |
| Dosya adına sahip normal dosya eki                                  |                             Eklenebilir |                             Eklenebilir |

\* "Include inline pictures" etkinleştirildiğinde (varsayılan: AÇIK), satır içi görseller dosya eki olarak eklenmek yerine yanıt gövdesine base64 veri URI'leri olarak gömülür. Bkz. [Yapılandırma](configuration#include-inline-pictures).

Örnek: Bazı eklerde belirli başlıklar eksik olabilir ancak bunlar yine de normal dosyalardır (satır içi/S/MIME değil). Sıkı geçiş hiçbirini bulamazsa, esnek geçiş bunları kabul edip ekleyebilir.

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
| --------------- | -------------------------------------------- |
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

- Satır içi görseller dosya eki olarak eklenmez. "Include inline pictures" AÇIK olduğunda (varsayılan), bunun yerine yanıt gövdesine veri URI'leri olarak gömülürler. Ayar KAPALI ise satır içi görseller tamamen kaldırılır. Bkz. [Yapılandırma](configuration#include-inline-pictures).
- S/MIME imza parçaları tasarım gereği hariç tutulur: `smime.p7s` gibi dosya adları ve `application/pkcs7-signature` veya `application/pkcs7-mime` gibi MIME türleri atlanır.
- Kara liste desenleri adayları filtreleyebilir: bkz. [Yapılandırma](configuration#blacklist-glob-patterns); eşleştirme büyük/küçük harfe duyarsızdır ve yalnızca dosya adına göredir.
- Yinelenen dosya adları yeniden eklenmez: yazma penceresi zaten aynı normalize adla bir dosya içeriyorsa atlanır.
- Dosya olmayan parçalar veya eksik dosya adları: yalnızca kullanılabilir dosya adlarına sahip dosya benzeri parçalar eklemek için dikkate alınır.

---

Bkz. ayrıca

- [Yapılandırma](configuration)
