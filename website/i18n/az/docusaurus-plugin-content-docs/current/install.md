---
id: install
title: 'Quraşdırma'
slug: /install
sidebar_label: 'Quraşdırma'
---

---

## “Thunderbird Add-ons and Themes” vasitəsilə quraşdırma {#installation-in-thunderbird-recommended}

:::important Minimal Thunderbird versiyası
Bu əlavə Thunderbird **128 ESR və ya daha yenisini** dəstəkləyir. Köhnə versiyalar dəstəklənmir.
:::

Bu, tövsiyə olunan quraşdırma üsuludur. ATN-dən (addons.thunderbird.net) quraşdırılmış əlavələr avtomatik yenilənmələr alır. LOCAL/dev quraşdırmaları avtomatik yenilənmir.

- Minimal Thunderbird versiyası: 128 ESR və ya daha yenisi.

1. Thunderbird-də **Tools > Add-ons and Themes** bölməsinə keçin.
2. "reply with attachments" üçün axtarın.
3. Əlavəni quraşdırın.

Və ya əlavənin səhifəsini birbaşa açın: [Thunderbird Əlavələri (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI-dən əl ilə quraşdırma {#local-installation-in-thunderbird}

### XPI faylını endirin {#download-the-xpi-file}

1. [Thunderbird Əlavə səhifəsinə](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) keçin.
2. Əlavənin ən son versiyasını XPI faylı (`reply_with_attachments-x.y.z-tb.xpi`) kimi endirin.

### Thunderbird-də quraşdırın {#install-in-thunderbird-local}

1. Thunderbird-i açın.
2. **Tools > Add-ons and Themes** bölməsinə keçin.
3. **Add-ons Manager**-də yuxarı sağdakı dişli işarəsinə klikləyin.
4. Menyudan **Install Add-on From File…** seçin.
5. Yüklənmiş `reply_with_attachments-x.y.z-tb.xpi` faylını seçin.
6. Soruşulduqda quraşdırmanı təsdiqləyin.

---

## İnkişaf üçün quraşdırma {#installation-for-development}

### Repositoriyanı endirin {#download-the-repository}

1. GitHub repositoriyasının ən son versiyasını endirin.
2. Daha çox məlumat üçün `make help` işə salın.

### Thunderbird-də quraşdırın {#install-in-thunderbird-dev}

1. Thunderbird-i açın.
2. **Tools > Add-ons and Themes** bölməsinə keçin.
3. **Add-ons Manager**-də yuxarı sağdakı dişli işarəsinə klikləyin.
4. Menyudan **Install Add-on From File…** seçin.
5. Yaradılmış `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` faylını seçin.
6. Soruşulduqda quraşdırmanı təsdiqləyin.

Qeyd: Thunderbird sisteminizdə `.zip` faylını qəbul etmirsə, onu `.xpi` olaraq adlandırın və “Install Add‑on From File…” əməliyyatını yenidən sınayın.

### LOCAL ZIP-i haradan tapmalı {#where-local-zip}

- Əvvəlcə əlavəni paketləyin: repositoriyanın kök qovluğunda `make pack` işə salın.
- Paketləmədən sonra “LOCAL” zip faylını repositoriyanın kök qovluğunda tapın (məs., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Test üçün yenidən paketləməzdən əvvəl versiyaları həm `sources/manifest_ATN.json`, həm də `sources/manifest_LOCAL.json` daxilində artırın.

---

## Deaktiv etmə, Silmə və Yeniləmələr {#disable-uninstall-updates}

- Deaktiv et: Thunderbird → Tools → Add‑ons and Themes → əlavəni tapın → keçidi söndürün.
- Sil: eyni görünüş → üç nöqtəli menyu → Remove.
- Yeniləmələr: ATN quraşdırmaları yeni versiyalar təsdiqləndikdə avtomatik yenilənir. LOCAL/dev quraşdırmaları avtomatik yenilənmir; yeni LOCAL yığımanı əl ilə yenidən quraşdırın.
- Parametrləri tam silmək: [Məxfilik → Məlumatların silinməsi](privacy#data-removal) bölməsinə baxın.

Həmçinin baxın

- [Sürətli başlanğıc](quickstart)
