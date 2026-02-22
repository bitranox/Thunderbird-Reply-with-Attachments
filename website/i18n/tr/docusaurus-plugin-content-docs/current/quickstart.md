---
id: quickstart
title: 'Hızlı Başlangıç'
sidebar_label: 'Hızlı Başlangıç'
---

---

## Hızlı Başlangıç

:::important Minimum Thunderbird Sürümü
Bu eklenti Thunderbird **128 ESR veya daha yenisini** destekler. Daha eski sürümler desteklenmez.
:::

:::note Telemetri yok; arka planda ağ yok
Eklenti analiz/telemetri toplamaz ve arka planda ağ isteği yapmaz. Ağ erişimi yalnızca harici bağlantılara tıkladığınızda gerçekleşir (Belgeler, GitHub, Bağış).
:::

---

### Kurulum

1. Eklentiyi Thunderbird Add‑ons üzerinden yükleyin.
2. İsteğe bağlı: Onayı etkinleştirin (Seçenekler → “Ekleri eklemeden önce sor”).
3. İsteğe bağlı: Kara liste uyarısını etkin bırakın (varsayılan): “Ekler kara liste nedeniyle hariç tutulursa uyar”.
4. İsteğe bağlı: Kara liste kalıpları ekleyin (satır başına bir tane), örn.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Not: Yukarıdaki “# …” bu belgede bir yorumdur; Seçenekler’e yapıştırdığınız kalıplara yorum eklemeyin. Yalnızca her satıra bir kalıp girin.

Şimdi ek içeren bir mesaja yanıt verin — orijinal ekler otomatik olarak veya hızlı bir onayın ardından eklenecektir. Kara listeniz tarafından hariç tutulan dosyalar varsa, bunları listeleyen kısa bir uyarı görürsünüz.

---

### Doğrulama {#verify}

- 1–2 ek içeren bir mesaja yanıt verin ve orijinallerin oluşturma pencerenize eklendiğini doğrulayın.
- Davranışı ayarlamak için [Yapılandırma](configuration) bölümüne bakın (onay geçişi, varsayılan yanıt, kara liste kalıpları).

---

### Kara liste uyarısını doğrulayın {#verify-blacklist-warning}

- “secret.txt” gibi bir dosya içeren bir mesaja yanıt verin.
- “Ekler kara liste nedeniyle hariç tutulursa uyar” etkinleştirildiğinde, küçük bir iletişim kutusu hariç tutulan dosyaları ve eşleşen kalıbı listeler.

Bir uyarı görmüyorsanız, kalıbın dosya adıyla tam olarak eşleştiğinden emin olun (yalnızca dosya adı, büyük/küçük harfe duyarsız). Yapılandırma → Kara liste.

---

### Klavye notu {#keyboard-note}

- Onay iletişim kutusu, Evet için Y/J ve Hayır için N/Esc tuşlarını destekler. Bazı Latin olmayan klavyelerde harf tuşları değişebilir; Enter odaktaki düğmeyi onaylar.

---
