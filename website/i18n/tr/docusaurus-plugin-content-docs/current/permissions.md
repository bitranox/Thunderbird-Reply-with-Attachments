---
id: permissions
title: 'İzinler'
---

## İzinler

:::note Minimum izinler
Bu eklenti tarafından herhangi bir anahtar (web) izni talep edilmez. Eklenti, telemetri toplamaz veya arka planda ağ istekleri yapmaz. [Gizlilik](privacy) bölümüne bakın.
:::

---

Eklenti, yalnızca küçük ve odaklanmış bir izin seti talep etmektedir. Her birinin neden gerekli olduğu:

- `compose`: kompozisyon olaylarını gözlemlemek, yanıtınızdaki ekleri listelemek ve eklemek için.
- `messagesRead`: meta veriyi okumak ve orijinal mesajdan ek dosyalarını almak için.
- `scripting`: etkinleştirildiğinde küçük bir kompozisyon içi onay iletişim kutusunu yerleştirmek için.
- `windows`: mesajlaşmanın başarısız olduğu son çare olarak küçük bir onay açılır penceresi açmak için.
- `sessions`: tekrar eden işlemleri önlemek için bir sekme başına bayrak depolamak için.
- `storage`: seçenekleri (kara liste, onay geçişi, varsayılan yanıt) kalıcı hale getirmek için.
- `tabs`: onay talepleri için kompozisyon sekmesine hedeflenmiş mesajlaşma yapmak için.

Ek notlar:

- Bu eklenti tarafından herhangi bir ana izin (web kaynakları) talep edilmez.
- `tabs` izni yalnızca isteğe bağlı onay iletişim kutusunu koordine etmek için kompozisyon sekmesine ulaşmak için kullanılır; geçmişi okumak veya sayfalarda gezinmek için kullanılmaz.

Bunlar kaynakta belgelenmiştir ve CI'de test edilmiştir. Eklenti telemetri toplamaz.

---

### Özeti (izinler → amaç) {#permissions-summary}

| İzin           | Neden gerekli                                                                           |
| -------------- | --------------------------------------------------------------------------------------- |
| `compose`      | Kompozisyon olaylarını gözlemlemek; yanıtınızdaki ekleri listelemek ve eklemek için.    |
| `messagesRead` | Orijinal mesaj eklerini listelemek ve dosya verilerini almak için.                      |
| `scripting`    | Etkinleştirildiğinde onay için hafif bir kullanıcı arayüzü eklemek/koordine etmek için. |
| `windows`      | Mesajlaşma başarısız olursa (nadir) yedek açılır pencere.                               |
| `sessions`     | Tekrar eden işlemleri önlemek için bir sekme başına bayrak depolamak.                   |
| `storage`      | Seçenekleri kalıcı hale getirmek (kara liste, onay geçişi, varsayılan yanıt).           |
| `tabs`         | Onay talepleri için kompozisyon sekmesine hedeflenmiş mesajlaşma yapmak.                |
| (ana izinler)  | Yok — eklenti web kaynakları talep etmez.                                               |

---

## Talep edilmedi {#not-requested}

- `compose.save`, `compose.send` — eklenti sizin adınıza mail kaydetmez veya göndermez.

Ayrıca bakınız: [Gizlilik](privacy) — telemetri yok, arka planda ağ yok, yalnızca kullanıcı tarafından başlatılan bağlantılar.

---
