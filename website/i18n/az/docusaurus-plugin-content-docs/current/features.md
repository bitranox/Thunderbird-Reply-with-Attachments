---
id: features
title: 'Xüsusiyyətlər'
sidebar_label: 'Xüsusiyyətlər'
---

---

## Xüsusiyyətlər {#features}

- Cavab verərkən orijinal e-poçtdakı faylları avtomatik qoşur.
- Tənzimlənən davranış: qoşmalar
  - avtomatik əlavə oluna bilər, və ya
  - yalnız təsdiqdən sonra əlavə oluna bilər (kiçik, əlçatan dialoq). Seçimlərdə siz
    təsdiqi aktivləşdirə və standart cavabı (Bəli/Xeyr) seçə bilərsiniz.
- Fayl adlarının qara siyahısı (glob şablonları) konkret faylların
  avtomatik qoşulmasının qarşısını alır. Nümunələr: `*intern*`, `*secret*`, `*passwor*`.
  Uyğunluq registrdən asılı deyil və yalnız fayl adını yoxlayır; Seçimlərdə
  hər sətrə bir şablon verin.
- Qara siyahı xəbərdarlığı (ixtiyari, susmaya görə aktivdir): qara siyahınız
  faylları istisna etdikdə, kiçik bir modal pəncərə faylı və uyğun şablon(lar)ı göstərir. Tünd rejimə
  uyğun və klaviatura ilə əlçatan (bağlamaq üçün Enter/Esc).
- “Cavabla” və “Hamısına cavabla” ilə işləyir. Bu əlavə “Yönləndir” funksiyasına dəyişiklik etmir.
- Özünüz artıq nəsə qoşmuş olsanız belə, orijinalları əlavə edir; fayl adına görə dublikatların qarşısını alır.
- Hər vərəq üzrə dublikat qoruyucusu eyni yazma vərəqində ikiqat əlavə etmənin qarşısını alır.
- Susmaya görə lazımsız qoşmalardan qaçmaq üçün S/MIME sertifikatlarını ötürür.
- Daxili şəkilləri daxil et (standart: AÇIQ). Gömülü şəkillər orijinal daxili düzülüşü qoruyaraq
  cavab mətninə base64 data URI-ləri kimi birbaşa bərpa olunur. Daxili şəkilləri tamamilə
  ötürmək üçün Seçimlərdə söndürün.

---

## Necə işləyir {#how-it-works}

- Cavab verilərkən əlavə orijinal qoşmaları siyahıya alır.
- Fayl qoşmalarından S/MIME imzalarını süzgəcdən çıxarır; daxili şəkillər (söndürülməyibsə) mətndə bərpa olunur.
- İstəyə bağlı təsdiq istəyir (klaviatura-dostudur).
- Uyğun faylları yazma pəncərənizə əlavə edir, fayl adına görə dublikatlardan qaçır.
- Kənar hallar üçün İstifadə bölməsində “Niyə qoşmalar əlavə olunmaya bilər” bölməsinə baxın.

Məxfilik qeydi: Bütün emal Thunderbird-də lokal olaraq baş verir. Əlavə arxa fonda heç bir şəbəkə sorğusu etmir.

---
