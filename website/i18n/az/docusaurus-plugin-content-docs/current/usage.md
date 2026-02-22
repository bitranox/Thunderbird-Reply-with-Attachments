---
id: usage
title: 'İstifadə'
sidebar_label: 'İstifadə'
---

---

## İstifadə {#usage}

- Cavab verin və əlavə orijinal qoşmaları avtomatik əlavə etsin — yaxud Seçimlərdə aktivdirsə əvvəlcə soruşsun.
- Fayl adına görə təkrarlanmalar aradan qaldırılır; S/MIME hissələri həmişə ötürülür. Sətirdaxili şəkillər standart olaraq cavab mətnində bərpa olunur ("Seçimlər"də "Sətirdaxili şəkilləri daxil et" vasitəsilə söndürmək olar).
- Qara siyahıya salınmış qoşmalar da ötürülür (yollar deyil, fayl adlarına uyğun gələn, böyük‑kiçik hərfə həssas olmayan glob nümunələri). Bax: [Konfiqurasiya](configuration#blacklist-glob-patterns).

---

### Cavab zamanı nə baş verir {#what-happens}

- Cavabı aşkar et → orijinal qoşmaları siyahıla → S/MIME + sətirdaxili olanları filtrlə → istəyə bağlı təsdiq → uyğun faylları əlavə et (dublikatları ötür) → sətirdaxili şəkilləri mətndə bərpa et.

Sərt və yumşaq keçid: Əlavə əvvəlcə fayl qoşmalarından S/MIME və sətirdaxili hissələri kənarlaşdırır. Heç nə uyğun gəlməzsə, S/MIME/sətirdaxilini yenə istisna edən, amma daha çox halı qəbul edən yumşaq keçid işə düşür (Kod Təfərrüatlarına baxın). Sətirdaxili şəkillər heç vaxt fayl qoşması kimi əlavə edilmir; əvəzində, "Sətirdaxili şəkilləri daxil et" aktiv olduqda (defolt: AÇIQ), onlar birbaşa cavab mətninə base64 data URI kimi yerləşdirilir.

| Hissə növü                                                  |                              Sərt keçid |                            Yumşaq keçid |
| ----------------------------------------------------------- | --------------------------------------: | --------------------------------------: |
| S/MIME imza faylı `smime.p7s`                               |                         Kənarlaşdırılır |                         Kənarlaşdırılır |
| S/MIME MIME tipləri (`application/pkcs7-*`)                 |                         Kənarlaşdırılır |                         Kənarlaşdırılır |
| Content‑ID ilə istinad edilən sətirdaxili şəkil (`image/*`) | Kənarlaşdırılır (mətndə bərpa olunur\*) | Kənarlaşdırılır (mətndə bərpa olunur\*) |
| Fayl adı olan qoşulmuş e‑poçt (`message/rfc822`)            |                           Əlavə edilmir |                       Əlavə oluna bilər |
| Fayl adı olan adi fayl qoşması                              |                       Əlavə oluna bilər |                       Əlavə oluna bilər |

\* "Sətirdaxili şəkilləri daxil et" aktiv olduqda (defolt: AÇIQ), sətirdaxili şəkillər fayl qoşması kimi əlavə olunmaq əvəzinə cavab mətninə base64 data URI kimi yerləşdirilir. Bax: [Konfiqurasiya](configuration#include-inline-pictures).

Nümunə: Bəzi qoşmalarda müəyyən başlıqlar çatışmaya bilər, lakin onlar yenə də adi fayllardır (sətirdaxili/S/MIME deyil). Sərt keçid heç nə tapmasa, yumşaq keçid onları qəbul edib qoşa bilər.

---

### Çarpaz istinad {#cross-reference}

- İrəli yönləndirmə dizayn etibarilə dəyişdirilmir (aşağıdakı Məhdudiyyətlərə baxın).
- Qoşmanın niyə əlavə olunmaya biləcəyinin səbəbləri üçün “Niyə qoşmalar əlavə olunmaya bilər” bölməsinə baxın.

---

## Davranış təfərrüatları {#behavior-details}

- **Dublikatların qarşısının alınması:** Əlavə hər vərəq üçün sessiya dəyəri və yaddaşdaxili qoruyucu istifadə edərək yazma (compose) vərəqini emal olunmuş kimi işarələyir. Orijinalları iki dəfə əlavə etməyəcək.
- Yazma pəncərəsini bağlayıb yenidən açmaq yeni vərəq kimi qəbul edilir (yəni, yeni cəhdə icazə verilir).
- **Mövcud qoşmalara hörmət:** Yazmada artıq bəzi qoşmalar varsa, orijinallar yenə də məhz bir dəfə əlavə olunur, artıq mövcud olan fayl adları ötürülür.
- **İstisnalar:** S/MIME artefaktları və sətirdaxili şəkillər fayl qoşmalarından çıxarılır. Birinci keçiddə heç nə uyğun gəlməzsə, yumşaq ehtiyat keçid S/MIME olmayan hissələri yenidən yoxlayır. Sətirdaxili şəkillər ayrıca idarə olunur: (aktiv olduqda) cavab mətnində data URI kimi bərpa edilirlər.
  - **Fayl adları:** `smime.p7s`
  - **MIME tipləri:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Sətirdaxili şəkillər:** Content‑ID ilə istinad edilən istənilən `image/*` hissəsi — fayl qoşmalarından çıxarılır, lakin "Sətirdaxili şəkilləri daxil et" AÇIQ ikən cavab mətninə yerləşdirilir
  - **Qoşulmuş e‑poçtlar (`message/rfc822`):** fayl adı olduqda adi qoşma kimi qəbul edilir; əlavə oluna bilər (dublikat yoxlamaları və qara siyahıya tabedir).
- **Qara siyahı xəbərdarlığı (aktivdirsə):** Namizədlər qara siyahınız tərəfindən istisna edildikdə,
  əlavə təsirə məruz qalan faylları və uyğunlaşan
  nümunə(lər)i göstərən kiçik bir modal pəncərə açır. Bu xəbərdarlıq, hər şey istisna edildiyi üçün heç bir qoşma əlavə olunmayacağı hallarda da görünür.

---

## Klaviatura qısayolları {#keyboard-shortcuts}

- Təsdiq dialoqu: Y/J = Bəli, N/Esc = Xeyr; Tab/Shift+Tab və Ox düymələri fokusun dövri keçidini təmin edir.
  - [Konfiqurasiya](configuration#confirmation) bölməsindəki “Default answer” başlanğıcda fokuslanan düyməni təyin edir.
  - Enter fokuslanmış düyməni işə salır. Tab/Shift+Tab və oxlar əlçatanlıq üçün fokusu hərəkət etdirir.

### Klaviatura üçün qısa bələdçi {#keyboard-cheat-sheet}

| Düymələr        | Fəaliyyət                                 |
| --------------- | ----------------------------------------- |
| Y / J           | Bəli‑ni təsdiqlə                          |
| N / Esc         | Xeyr‑i təsdiqlə                           |
| Enter           | Fokuslanmış düyməni aktivləşdir           |
| Tab / Shift+Tab | Fokusu irəli/geri hərəkət etdir           |
| Ox düymələri    | Fokusu düymələr arasında hərəkət etdir    |
| Default answer  | İlkin fokusu təyin edir (Bəli və ya Xeyr) |

---

## Məhdudiyyətlər {#limitations}

- İrəli yönləndirmə bu əlavə tərəfindən dəyişdirilmir (Cavabla və Hamısına cavab dəstəklənir).
- Çox böyük qoşmalar Thunderbird və ya provayder məhdudiyyətlərinə tabe ola bilər.
  - Əlavə faylları parçalara ayırmır və ya sıxmır; Thunderbird‑ün adi qoşma emalına güvənir.
- Şifrələnmiş mesajlar: S/MIME hissələri qəsdən istisna edilir.

---

## Niyə qoşmalar əlavə olunmaya bilər {#why-attachments-might-not-be-added}

- Sətirdaxili şəkillər fayl qoşması kimi əlavə edilmir. "Sətirdaxili şəkilləri daxil et" AÇIQ olduqda (defolt), onlar əvəzində cavab mətninə data URI kimi yerləşdirilir. Ayar SÖNÜK olarsa, sətirdaxili şəkillər tamamilə çıxarılır. Bax: [Konfiqurasiya](configuration#include-inline-pictures).
- S/MIME imza hissələri dizayn etibarilə istisna edilir: `smime.p7s` kimi fayl adları və `application/pkcs7-signature` və ya `application/pkcs7-mime` kimi MIME tipləri ötürülür.
- Qara siyahı nümunələri namizədləri filtrləyə bilər: bax [Konfiqurasiya](configuration#blacklist-glob-patterns); uyğunlaşdırma böyük‑kiçik hərfə həssas deyil və yalnız fayl adına görədir.
- Dublikat fayl adları yenidən əlavə edilmir: yazmada eyni normallaşdırılmış ada malik fayl artıq varsa, o, ötürülür.
- Fayl olmayan hissələr və ya çatışmayan fayl adları: yalnız istifadə oluna bilən fayl adına malik fayl‑tipli hissələr əlavə olunmaq üçün nəzərə alınır.

---

Həmçinin baxın

- [Konfiqurasiya](configuration)
