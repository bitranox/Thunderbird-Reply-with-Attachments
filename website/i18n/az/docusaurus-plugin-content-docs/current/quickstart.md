---
id: quickstart
title: 'Tez Başlanğıc'
sidebar_label: 'Sürətli Başlanğıc'
---

---

## Sürətli başlanğıc

:::important Minimal Thunderbird versiyası
Bu əlavə Thunderbird **128 ESR və ya daha yenisini** dəstəkləyir. Köhnə versiyalar dəstəklənmir.
:::

:::note Telemetriya yoxdur; arxa fonda şəbəkə yoxdur
Əlavə **analitika/telemetriya toplamır** və **arxa planda** şəbəkə sorğuları etmir. Şəbəkə çıxışı yalnız siz xarici keçidlərə kliklədikdə baş verir (Sənədlər, GitHub, İanə).
:::

---

### Quraşdırma

1. Əlavəni Thunderbird Add‑ons‑dan quraşdırın.
2. İstəyə bağlı: Təsdiqi aktivləşdirin (Seçimlər → “Qoşmaları əlavə etməzdən əvvəl soruş”).
3. İstəyə bağlı: Qara siyahı xəbərdarlığını aktiv saxlayın (standart): “Qoşmalar qara siyahıya görə istisna edilərsə xəbərdar et”.
4. İstəyə bağlı: Qara siyahı nümunələri əlavə edin (hər sətirdə bir), məsələn:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Qeyd: Yuxarıdakı “# …” bu sənədlərdə şərhdir; Seçimlərə yapışdırdığınız nümunələrə şərhlər daxil etməyin. Hər sətrə yalnız bir nümunə daxil edin.

İndi qoşmaları olan bir mesaja cavab verin — orijinallar avtomatik olaraq və ya sürətli təsdiqdən sonra əlavə olunacaq. Qara siyahınız tərəfindən istisna edilən fayllar varsa, onları sadalayan qısa bir xəbərdarlıq görəcəksiniz.

---

### Yoxlayın {#verify}

- 1–2 qoşmalı bir mesaja cavab verin və orijinalların yazı pəncərənizə əlavə olunduğunu təsdiqləyin.
- Davranışı tənzimləmək üçün [Konfiqurasiya](configuration) bölməsinə baxın (təsdiq keçidi, standart cavab, qara siyahı nümunələri).

---

### Qara siyahı xəbərdarlığını yoxlayın {#verify-blacklist-warning}

- “secret.txt” kimi fayl olan bir mesaja cavab verin.
- “Qoşmalar qara siyahıya görə istisna edilərsə xəbərdar et” aktiv olduqda, kiçik bir dialoq pəncərəsi istisna edilən faylları və uyğun nümunəni siyahıya alacaq.

Əgər xəbərdarlıq görmürsünüzsə, nümunənin fayl adına tam uyğun gəldiyindən əmin olun (yalnız fayl adı, böyük‑kiçik hərfə həssas deyil). Konfiqurasiya → Qara siyahı bölməsinə baxın.

---

### Klaviatura qeydi {#keyboard-note}

- Təsdiq dialoqu Bəli üçün Y/J və Xeyr üçün N/Esc düymələrini dəstəkləyir. Bəzi qeyri‑latın klaviaturalarda hərf düymələri fərqli ola bilər; Enter fokuslanmış düyməni təsdiq edir.

---
