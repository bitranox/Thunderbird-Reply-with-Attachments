---
id: permissions
title: 'İcazələr'
---

## İcazələr

:::note Minimal icazələr
Bu əlavə tərəfindən heç bir host (veb) icazəsi tələb edilmir. Əlavə telemetriya toplamır və arxa planda şəbəkə sorğuları etmir. [Məxfilik](privacy) səhifəsinə baxın.
:::

---

Əlavə yalnız kiçik, fokuslanmış bir icazə dəstini tələb edir. Hər birinin niyə lazım olduğu:

- `compose`: tərtibat hadisələrini izləmək, cavabınıza əlavələr siyahısı əlavə etmək.
- `messagesRead`: metadata oxumaq və orijinal mesajdan əlavə fayllarını əldə etmək.
- `scripting`: aktiv edildikdə, tərtibatda kiçik təsdiq dialoqunu inyekt etmək.
- `windows`: mesaj göndərmə uğursuz olduqda son çarə olaraq kiçik təsdiq pəncərəsini açmaq.
- `sessions`: təkrarlanan işləmənin qarşısını almaq üçün hər tab üçün bir bayraq saxlamaq.
- `storage`: seçimləri (qara siyahı, təsdiq açarı, standart cavab) davam etdirmək.
- `tabs`: təsdiq sorğuları üçün tərtibat tabına hədəflənmiş mesajlar göndərmək.

Əlavə qeydlər:

- Bu əlavə tərəfindən heç bir host icazəsi (veb kökləri) tələb edilmir.
- `tabs` icazəsi yalnız isteğe bağlı təsdiq dialoqunu koordinasiya edərkən tərtibat tabını hədəfləmək üçün istifadə olunur; tarixçəni oxumaq və ya səhifələri gəzmək üçün istifadə edilmir.

Bunlar mənbədə sənədləşdirilib və CI-də sınaqdan keçirilib. Əlavə telemetriya toplamır.

---

### Xülasə (icazələr → məqsəd) {#permissions-summary}

| İcazə            | Niyə lazım olduğu                                                                   |
| ---------------- | ----------------------------------------------------------------------------------- |
| `compose`        | Tərtibat hadisələrini izləmək; cavabınıza əlavələri siyahıya salmaq və əlavə etmək. |
| `messagesRead`   | Orijinal mesaj əlavələrini siyahıya almaq və fayl məlumatlarını əldə etmək.         |
| `scripting`      | Aktiv edildikdə, təsdiq üçün yüngül UI inyekt etmək/koordinatlaşdırmaq.             |
| `windows`        | Mesaj göndərmə uğursuz olduqda (nadir) geri dönmə pəncərəsi.                        |
| `sessions`       | Təkrarlanan işləmənin qarşısını almaq üçün hər tab üçün bir bayraq saxlamaq.        |
| `storage`        | Seçimləri (qara siyahı, təsdiq açarı, standart cavab) davam etdirmək.               |
| `tabs`           | Təsdiq sorğuları üçün tərtibat tabına hədəflənmiş mesajlar göndərmək.               |
| (host icazələri) | Heç biri — əlavə veb kökləri tələb etmir.                                           |

---

## Tələb edilməyib {#not-requested}

- `compose.save`, `compose.send` — əlavə sizin adınıza e-poçt yükləmir və ya göndermir.

Baxın: [Məxfilik](privacy) — telemetriya yoxdur, arxa planda şəbəkə yoxdur, yalnız istifadəçi tərəfindən başlanan keçidlər.

---
