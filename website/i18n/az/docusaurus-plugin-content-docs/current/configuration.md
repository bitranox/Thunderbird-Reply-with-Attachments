---
id: configuration
title: 'Konfiqurasiya'
---

## Konfiqurasiya

Terminologiya qeydi: UI və sənədlərdə istifadə olunan eyni terminlər üçün [Lüğət](glossary) səhifəsinə baxın.

---

## Thunderbird-da seçimləri açın {#open-options-in-thunderbird}

- Thunderbird → Alətlər → Əlavələr və Mövzular → “Cavab et və əlavə et” tapın → Parametrlər/Seçimlər

---

### Parametrlər {#settings}

#### Təsdiq {#confirmation}

- “Açılmadan əvvəl əlavə etmək üçün soruş” seçimini aktivləşdirin
- Varsayılan cavab: Bəli və ya Xeyir (fokus və klaviatura varsayılanı)
- Klaviatura: Y/J = Bəli; N/Esc = Xeyir; Tab/Shift+Tab və Ox düymələri fokusu dövr edir
  - Klaviatura detalları üçün [İstifadə](usage#keyboard-shortcuts) səhifəsinə baxın.

---

#### Qara siyahı (glob naxışları) {#blacklist-glob-patterns}

Qara siyahıdakı fayllar cavab zamanı avtomatik olaraq əlavə olunmayacaq. “Qara siyahı (İstisna siyahısı)” üçün [Lüğət](glossary) səhifəsinə də baxın.

- Hər bir naxış üçün bir sətir; böyük/kç hərf həssas deyil; yalnız fayl adı uyğunluğu
- Nümunələr: `*intern*`, `*secret*`, `*passwor*`
- Dəstəklənən glob tokenləri: `*` (bütün simvollar `/` istisna olmaqla), `?` (bir simvol), `[abc]` kimi simvol sinifləri. Simvol `\[` istifadə edin `[` ilə uyğunlaşmaq üçün. Yollar (`**/`) uyğunlaşdırılmır, çünki yalnız fayl adları uyğunlaşdırılır.
- Dəstəklənmir: inkar (`!`), qarmaqlı genişləndirmə (`{..}`) və mürəkkəb aralıqlar. Naxışları sadələşdirin.
- Naxışlarda şərhlər dəstəklənmir. Hər bir sətir üçün yalnız naxış mətni daxil edin; `#` və ya inline şərhlər əlavə etməyin.

---

##### Naxış kitabçısı {#pattern-cookbook}

- Hər hansı bir PDF-i uyğunlaşdırın: `*.pdf`
- “Scan” ilə başlayan faylları uyğunlaşdırın: `scan*`
- Simvol sinfi: `report[0-9].txt`
- Müsadə verilmiş `[` simvolunu istifadə etmək: `\[` (bir simvolu simvol kimi uyğunlaşdırarkən faydalıdır)

---

##### Qeydlər {#blacklist-notes}

- Sıra əhəmiyyət daşımır; birinci/hər hansı uyğunluq faylı istisna edir.
- Uyğunlaşdırma yalnız fayl adı ilə (yollar/qovluqlar nəzərə alınmır).
- “Varsayılanlara qaytar” tövsiyə olunan naxışları bərpa edir və qara siyahı xəbərdarlıq seçimini aktivləşdirir.
- Niyə `*passwor*` nümunəsi? Bu, həm “şifrə”, həm də “Passwort” ailələrini uyğunlaşdırır.
- Üstünlük: əgər hər hansı bir naxış fayl adını uyğunlaşdırırsa, fayl istisna edilir (birinci/hər hansı uyğunluq — sıralama nəticəni dəyişmir).
- İpucu — naxışınızı yoxlayın: müvəqqəti bir naxış əlavə edin, uyğun bir təcrübə faylı olan bir mesaja cavab verin və onun xəbərdarlıq siyahısında istisna olduğunu təsdiqləyin.

##### Tez sınayın (təhlükəsiz test) {#blacklist-try-it}

1. Seçimlər açın → Qara siyahı.
2. `*.tmp` kimi müvəqqəti bir naxış əlavə edin və Saxla düyməsini basın.
3. `.tmp` ilə bitən bir fayla malik test poçtuna cavab verin — fayl xəbərdarlıq siyahısında görünməli və əlavə olunmamalıdır.
4. İşiniz bitdikdən sonra müvəqqəti naxışı silin və ya “Varsayılanlara qaytar” düyməsini basın.

---

#### İstisna edilmiş əlavələr üzrə xəbərdarlıq {#warning-on-excluded-attachments}

- “Qara siyahı tərəfindən istisna edilmiş əlavələr üçün xəbərdarlıq et” seçimini aktivləşdirin (varsayılan: AKTIV).
- Aktivləşdirildikdə, kiçik bir modal istisna edilmiş faylları və uyğun naxış(lar)ı göstərir. Bu xəbərdarlıq həm də heç bir şeyin əlavə olunmayacağı zaman görünür, çünki bütün namizədlər qara siyahıya alınmışdır.

---

#### Parametrlərinizi saxlayın {#save-your-settings}

Parametrlər Saxla düyməsinə basaraq saxlanılır. Fərdi sahələri əllə geri qaytara və ya ehtiyac olduqda varsayılanlara qaytara bilərsiniz.

Saxlanılan parametrlərin düzgün tətbiq olunmadığını düşünürsünüzsə, Thunderbird-i yenidən başladın və yenidən cəhd edin. (Thunderbird sessiyalar arasında vəziyyəti yaddaşda saxlaya bilər; yenidən başlama, yeni parametrlərin yüklənməsini təmin edir.)

İpucu: Parametrlərinizin tətbiq olunduğunu təsdiqləmək üçün hər hansı bir əlavə ilə bir mesaja cavab verin və təsdiqi və ya qara siyahı xəbərdarlığını yoxlayın.

---

#### Donasiya Görünürlüğü (90 günlük susdurma) {#donation-visibility}

Əlavə, bağışladıqdan sonra müəyyən bir müddət üçün bağışlama tələblərini gizlətmək üçün rahatlıq xüsusiyyətini ehtiva edir.

Harada tapılır

- Seçimlər → Dəstək bölməsi: “Bağışladım” düyməsini və kiçik bir ipucu sahəsi görəcəksiniz.
- Göndərmə təsdiqi pəncərəsi də bir Bağışla düyməsini göstərir; bu, təxirə salma aktiv olduqda avtomatik olaraq gizlənir.

Necə işləyir

- “Bağışladım” düyməsini basmaq bağışlama düymələrini və əlaqəli tələbləri 90 gün gizlədir.
- Bir status ipucu “YYYY‑MM‑DD tarixinə qədər gizli” göstərir (yerli tarixinizdə). Həmçinin, görünürlüyü dərhal bərpa etmək üçün “Bağışla yenidən göstərin” düyməsi var.
- 90 gündən sonra, Bağışla düyməsi avtomatik olaraq görünür olur.

Məxfilik və saxlama

- Əlavə, susdurma dövrünü xatırlamaq üçün Thunderbird-in yerli yaddaşında bir zaman damgası saxlayır. Açar: `donateHideUntil` (epoch millisaniyələri).
- Bu ayar sizin Thunderbird profilinizə aiddir (bulud ilə senkronizasiya edilmir). Bu xüsusiyyət hər hansı bir şəbəkə tələbi etmir.

Problemi həll etmə

- “Bağışladım” düyməsini basdıqdan dərhal sonra Bağışla düyməsi hələ görünürsə, bir qədər gözləyin və ya Seçimlər səhifəsini yenidən açın; UI parametrlər saxlanıldıqda dərhal yeniləcəyik.
- Əl ilə sıfırlamaq üçün “Bağışla yenidən göstərin” düyməsini basın. Həmçinin, ipucunda göstərilən tarix keçdikdən sonra gözləyə bilərsiniz.

Bu xüsusiyyət tamamilə rahatlıq üçündir; o, heç vaxt əlavənin funksionallığını bloklamır və heç bir şəxsi məlumat toplamır.

---

### Fayl adlarının normallaşdırılması (təkrarların qarşısını alma) {#filename-normalization-duplicates-prevention}

Platformalar arasında ardıcıllığı təmin etmək üçün fayl adları təkrar yoxlamalardan əvvəl normallaşdırılır:

- Unicode NFC-ə normallaşdırılır.
- Adlar böyük-kç hərflərlə uyğunlaşdırılır (kiçildilir).
- Son nöqtələr/boşluqlar kəsilir (Windows dostluğu).

Bu, `café.pdf` və `café.pdf` (NFD) və ya `FILE.txt.` və `file.txt` kimi adlar üçün təkrarların aşkarlanmasını proqnozlaşdırılmasını təmin edir.

---

## Təsdiq davranışı {#confirmation-behavior}

- “Varsayılan cavab” təsdiq pəncərəsində ilkin fokuslanmış düyməni təyin edir (klaviatura istifadəçiləri üçün faydalıdır).
- “Cavab ver” və “Hamısına Cavab” üçün işləyir. “İrəlilə” bu əlavədən təsirlənmir.

---

## İrəliləmiş: təkrarların aşkarlanması {#advanced-duplicate-detection}

Təkrarların qarşısını alma hər bir yazma tabı üzrə və fayl adı ilə həyata keçirilir. Özündə ətraflı izah üçün [İstifadə](usage#behavior-details) səhifəsinə baxın.

---

Baxın

- [İcazələr](permissions)
- [Məxfilik](privacy)
