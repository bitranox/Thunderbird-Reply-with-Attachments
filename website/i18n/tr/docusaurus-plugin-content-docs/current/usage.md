---
id: usage
title: Kullanım
sidebar_label: Kullanım
---

## Kullanım

- Yanıtlayın; eklenti özgün ekleri otomatik ekler — veya Seçenekler’de etkinse önce sorar.
- Dosya adına göre yinelenenler kaldırılır; SMIME ve satır içi görseller her zaman atlanır.
- Kara listedeki ekler de atlanır (büyük/küçük harf duyarsız, glob desenleri).

---

## Davranış ayrıntıları

- Yinelenenleri önleme: Eklenti, sekme başına oturum değeri ve bellek içi bir koruma ile yazım sekmesini işlenmiş olarak işaretler; özgünler iki kez eklenmez.
- Mevcut ekleri gözetme: Yazımda zaten ekler varsa, özgünler yine de yalnızca bir kez eklenir ve mevcut dosya adları atlanır.
- Hariçler: SMIME öğeleri (örn. `smime.p7s`, `application/pkcs7-signature`/`x-pkcs7-signature`/`pkcs7-mime`) ve satır içi görseller yok sayılır. İlk geçişte aday yoksa, daha esnek bir geri dönüş yolu SMIME dışı kısımları yeniden denetler.
- Kara liste uyarısı (etkinse): Adaylar kara listeniz tarafından hariç tutulduğunda, eklenti küçük bir pencerede etkilenen dosyaları ve eşleşen desen(ler)i listeler; her şey hariç tutulmuşsa ve hiçbir şey eklenmeyecekse de görünür.
