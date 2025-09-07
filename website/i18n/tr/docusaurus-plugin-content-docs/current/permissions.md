---
id: permissions
title: İzinler
---

Eklenti yalnızca küçük ve hedefe yönelik bir izin kümesi ister. Her birinin nedeni:

- compose: yazım olaylarını izlemek, yanıtta ekleri listelemek/eklemek.
- messagesRead: orijinal iletiden meta verileri okumak ve ek dosyaları almak.
- scripting: etkinse yazım içinde küçük onay iletişim kutusu eklemek.
- windows: iletişim başarısız olursa son çare olarak küçük bir onay penceresi açmak.
- sessions: yinelenen işlemeyi önlemek için sekme başına bayrak saklamak.
- storage: seçenekleri kalıcı kılmak (kara liste, onay anahtarı, varsayılan yanıt).
- tabs: onay istekleri için yazım sekmesine hedefli mesaj göndermek.

Bunlar kaynakta belgelenmiştir ve CI’da test edilir. Eklenti telemetri toplamaz.
