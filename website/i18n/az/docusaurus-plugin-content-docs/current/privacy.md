---
id: privacy
title: 'Məxfilik'
sidebar_label: 'Məxfilik'
---

## Məxfilik

:::note Telemetriya yoxdur; arxa plan şəbəkəsi yoxdur
Bu əlavənin **heç bir** analitik/telemetriya toplamadığı və **heç bir** arxa plan şəbəkə tələb etmədiyi. Hər hansı bir şəbəkə girişi yalnız xarici əlaqəni kliklədiyiniz zaman baş verir (Dokumentlər, GitHub, Bağışlamaq).
:::

Reply with Attachments analitik və ya telemetriya toplamır və məlumatlarınızı heç bir yerə göndermir.

Əlavənin nə etdiyinə dair:

- Cavabınıza əlavə etmək üçün orijinal mesajdan əlavə məlumatları və faylları yerli olaraq (Thunderbird API) oxuyur.
- Seçimlərinizi (qara siyahı, təsdiq, standart cavab) Thunderbird-in yerli saxlama sistemində saxlayır.

Əlavənin nə etmir:

- Heç bir izləmə, analitik, çöküş bildirişi və ya uzaq qeydiyyat.
- Yalnız xarici bağlantıları (Dokumentlər, GitHub, Bağışlamaq) açdığınız zaman istisna olmaqla, heç bir arxa plan şəbəkə tələbi yoxdur.

İcazələr [İcazələr](permissions) səhifəsində sənədləşdirilmişdir.

---

## Məzmunun Təhlükəsizlik Siyasəti (CSP) {#content-security-policy-csp}

Seçim və pop-up səhifələri inline skriptlərdən qaçır. Bütün JavaScript əlavənin tərkibində olan fayllardan yüklənir ki, bu da Thunderbird-də sərt CSP-yə riayət etsin. Əgər sənədlərdə kod parçaları əlavə edirsinizsə, bunlar yalnız nümunələrdir və əlavə tərəfindən icra edilmir.

---

## Məlumatların saxlanması {#data-storage}

- İstifadəçi seçimləri (qara siyahı, təsdiq açarı, standart cavab) Thunderbird-in `storage.local`-da bu əlavə üçün saxlanılır.
- Əlavə tərəfindən heç bir bulud sinxronizasiyası həyata keçirilmir.

---

## Şəbəkə {#network}

- Əlavə arxa plan şəbəkə fəaliyyəti həyata keçirmir.
- Hər hansı bir şəbəkə girişi yalnız bağlantılara (Dokumentlər, GitHub, Bağışlamaq) kliklədiyiniz zaman və ya Thunderbird özü bu əlavəyə aid olmayan normal əməliyyatları yerinə yetirdiyi zaman baş verir.

---

## Məlumatların silinməsi {#data-removal}

- Əlavəni silmək onun kodunu aradan qaldırır.
- Parametrlər yalnız Thunderbird-in `storage.local`-də saxlanılır və silindiyi zaman silinir; heç bir xarici saxlama istifadə edilmir.
- Silmədən parametrləri sıfırlamaq:
  - Seçim səhifəsi: qara siyahı və qara siyahı xəbərdarlığı üçün "Standartlara geri sıfırla" istifadə edin.
  - İrəliləmiş: Thunderbird → Alətlər → İnkişafçı alətləri → Debug Add-ons, genişləndirilmiş saxlayıcıya daxil olun və lazım olarsa açarları təmizləyin.
