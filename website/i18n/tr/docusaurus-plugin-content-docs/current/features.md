---
id: features
title: 'Özellikler'
sidebar_label: 'Özellikler'
---

---

## Özellikler {#features}

- Yanıt verirken orijinal e-postadaki dosyaları otomatik olarak ekler.
- Yapılandırılabilir davranış: ekler
  - otomatik olarak eklenebilir veya
  - yalnızca onaydan sonra eklenebilir (küçük, erişilebilir bir iletişim kutusu). Seçenekler'de
    onayı etkinleştirip varsayılan yanıtı (Evet/Hayır) seçebilirsiniz.
- Dosya adlarının kara listesi (glob desenleri), belirli dosyaların
  otomatik olarak eklenmesini engeller. Örnekler: `*intern*`, `*secret*`, `*passwor*`.
  Eşleştirme büyük/küçük harfe duyarsızdır ve yalnızca dosya adını kontrol eder; Seçenekler'de
  satır başına bir desen belirtin.
- Kara liste uyarısı (isteğe bağlı, varsayılan olarak etkin): dosyalar kara listeniz
  tarafından hariç tutulduğunda, küçük bir modal pencere dosyayı ve eşleşen desen(ler)i listeler. Karanlık mod
  uyumlu ve klavye ile erişilebilirdir (kapatmak için Enter/Esc).
- Yanıtla ve Tümünü Yanıtla ile çalışır. İlet, bu eklenti tarafından değiştirilmez.
- Siz zaten bir şey eklemiş olsanız bile orijinal ekleri ekler; dosya adına göre yinelenenleri önler.
- Sekme başına yinelenme koruması, aynı oluşturma sekmesinde iki kez eklemeyi önler.
- Gereksiz ekleri önlemek için varsayılan olarak S/MIME sertifikalarını atlar.
- Satır içi resimleri dahil et (varsayılan: AÇIK). Gömülü görüntüler,
  orijinal satır içi yerleşimi koruyarak yanıt gövdesinde doğrudan base64 veri URI’leri olarak geri yüklenir. Seçenekler'den
  satır içi görüntüleri tamamen atlamak için devre dışı bırakabilirsiniz.

---

## Nasıl Çalışır {#how-it-works}

- Yanıtlarken, eklenti orijinal ekleri listeler.
- Dosya eklerinden S/MIME imzalarını süzer; satır içi görüntüler (devre dışı bırakılmadıkça) gövdede geri yüklenir.
- İsteğe bağlı olarak onay ister (klavye dostudur).
- Uygun dosyaları oluşturmanıza ekler, dosya adına göre yinelenenleri önler.
- Uç durumlar için Kullanım bölümündeki “Ekler neden eklenmeyebilir” başlığına bakın.

Gizlilik notu: Tüm işlemler Thunderbird içinde yerel olarak gerçekleşir. Eklenti arka planda ağ isteği yapmaz.

---
