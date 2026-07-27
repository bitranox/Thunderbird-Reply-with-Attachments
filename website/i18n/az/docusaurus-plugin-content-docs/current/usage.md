---
id: usage
title: 'İstifadə'
sidebar_label: 'İstifadə'
---

---

## İstifadə {#usage}

- Cavab verin və əlavə orijinal qoşmaları avtomatik əlavə etsin — yaxud Seçimlərdə aktivdirsə əvvəlcə soruşsun.
- Fayl adına görə təkrarlar aradan qaldırılır; S/MIME hissələri həmişə keçilir. Orijinal mesajda daxil edilmiş şəkillər cavabın gövdəsində qalır, Thunderbird onları harada yerləşdirirsə, və fayl kimi kopyalanmır.
- Qara siyahıya salınmış qoşmalar da ötürülür (yollar deyil, fayl adlarına uyğun gələn, böyük‑kiçik hərfə həssas olmayan glob nümunələri). Bax: [Konfiqurasiya](configuration#blacklist-glob-patterns).

---

### Cavab zamanı nə baş verir {#what-happens}

- Cavabı aşkarla → orijinal əlavələri siyahıya al → S/MIME və daxil edilmiş şəkilləri keç → istəyə bağlı təsdiq → uyğun faylları əlavə et (dublikatları keçərək).

| Hissə növü                                                     | Cavaba kopyalanır |
|----------------------------------------------------------------|------------------:|
| S/MIME imza faylı `smime.p7s`                                  | Xeyr              |
| S/MIME MIME növləri (`application/pkcs7-*`)                    | Xeyr              |
| Mesaj gövdəsinin `cid:` ilə daxil etdiyi şəkil                 | Xeyr (gövdədədir) |
| `Content-Disposition: inline` kimi işarələnmiş şəkil           | Xeyr (gövdədədir) |
| Gövdənin heç vaxt istinad etmədiyi `Content-ID`-yə malik şəkil | Bəli              |
| Fayl adı olan əlavə edilmiş e-poçt (`message/rfc822`)          | Bəli              |
| Fayl adı olan adi fayl əlavəsi                                 | Bəli              |

Şəkil yalnız orijinal mesaj ona faktiki olaraq istinad etdikdə,
və ya göndərən onu açıq şəkildə `Content-Disposition: inline` kimi işarələdikdə daxil edilmiş sayılır. Sadəcə
`Content-ID` başlığı kifayət deyil: bir çox poçt proqramları hər şəkil hissəsinə onu qoyur,
əsl əlavələr də daxil olmaqla, və onlar yenə də kopyalanmalıdır.

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
|-----------------|-------------------------------------------|
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

- Orijinal mesajın daxil etdiyi şəkillər fayl kimi kopyalanmır. Onlar artıq Thunderbird-in yerləşdirdiyi cavabın mətnindədir. Bax: [Configuration](configuration#include-inline-pictures).
- S/MIME imza hissələri dizayn etibarilə istisna edilir: `smime.p7s` kimi fayl adları və `application/pkcs7-signature` və ya `application/pkcs7-mime` kimi MIME tipləri ötürülür.
- Qara siyahı nümunələri namizədləri filtrləyə bilər: bax [Konfiqurasiya](configuration#blacklist-glob-patterns); uyğunlaşdırma böyük‑kiçik hərfə həssas deyil və yalnız fayl adına görədir.
- Dublikat fayl adları yenidən əlavə edilmir: yazmada eyni normallaşdırılmış ada malik fayl artıq varsa, o, ötürülür.
- Fayl olmayan hissələr və ya çatışmayan fayl adları: yalnız istifadə oluna bilən fayl adına malik fayl‑tipli hissələr əlavə olunmaq üçün nəzərə alınır.

---

Həmçinin baxın

- [Konfiqurasiya](configuration)
