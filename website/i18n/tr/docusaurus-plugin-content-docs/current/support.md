---
id: support
title: 'Destek'
sidebar_label: 'Destek'
---

## FAQ {#faq}

### Ekler eklenmedi — neden?

- Satır içi resimler ve S/MIME bölümleri kasıtlı olarak hariç tutulmuştur.
- Aynı dosyanın zaten eklendiği durumda, çift dosya adları atlanır.
- Kara liste desenleri adayları filtreleyebilir; [Yapılandırma](configuration#blacklist-glob-patterns) bölümüne bakın.

### Ekler eklemeden önce onay alabilir miyim?

Evet. [Yapılandırma → Onay](configuration#confirmation) altındaki "Ekler eklenmeden önce sor" seçeneğini etkinleştirin. Klavye: Y/J = Evet, N/Esc = Hayır.

### Eklenti herhangi bir veri gönderiyor veya kullanım takip ediyor mu?

Hayır. [Gizlilik](privacy) bölümüne bakın — hiç telemetri yok ve arka planda ağ istekleri yok.

### İletişim ekleri eklemiyor — bu beklenen bir durum mu?

Evet. Sadece Yanıt ve Tümüne Yanıt bu eklenti ile değiştirilmiştir; İletişim olduğu gibi bırakılmıştır. [Sınırlamalar](usage#limitations) bölümüne bakın.

### Bağış ertelemesi nerede?

Ayarlar → Destek bölümü. [Bağış Görünürlüğü](configuration#donation-visibility) bölümüne bakın.

---

## Destek

Yardım mı gerekiyor yoksa bir hata raporlamak mı istiyorsunuz?

---

### GitHub'da bir sorun açın:

- Depo: `bitranox/Thunderbird-Reply-with-Attachments`
- Sorunlar: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Thunderbird sürümünü (ör. 128 ESR), işletim sistemi ve yeniden üretme adımlarını dahil edin
- Thunderbird Hata Konsolu'ndan ilgili günlükleri ekleyin (Araçlar → Geliştirici Araçları → Hata Konsolu)

- Eklenti sitesi (ATN): [eklentinin sayfası](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) üzerinden de geri bildirim bırakabilirsiniz.

---

### İpuçları

- Desteklenen bir Thunderbird sürümünde (128 ESR veya daha yenisi) olduğunuzdan emin olun.
- Yaygın yapılandırma soruları için Yapılandırma ve Kullanım belgelerini kontrol edin.
- Geliştirme/test için, Geliştirme kılavuzuna bakın.
- Saklanan ayarların düzgün uygulanmadığını düşünüyorsanız, Thunderbird'ü yeniden başlatın ve tekrar deneyin. (Thunderbird, oturumlar arasında durumu önbelleğe alabilir; bir yeniden başlatma, taze ayarların yüklenmesini sağlar.)
- Minimal yeniden üretim: bir veya iki basit dosya eki içeren küçük bir test e-postası ile deneyin.
- Onay açıkken ve kapalıyken davranışı karşılaştırarak, diyalog akışının etkili olup olmadığını daraltın.

---

### Bir raporda neyi dahil etmelisiniz

- Thunderbird sürümü ve işletim sistemi
- Yeniden üretme için tam adımlar (ne yaptığınız, ne beklediğiniz, neler meydana geldi)
- Onay etkin miydi ve varsayılan cevap ayarınız
- Kara liste desenlerinizin bir örneği (ilgiliyse)
- Yeniden üretim sırasında Hata Konsolu günlükleri (Araçlar → Geliştirici Araçları → Hata Konsolu)
- Hata ayıklama günlüğünü etkinleştir (isteğe bağlı):
  - Thunderbird'ün Hata Konsolu'nda çalıştırın: `messenger.storage.local.set({ debug: true })`
  - Sorunu yeniden üretin ve ilgili `[RWA]` günlük satırlarını kopyalayın

---

### Sorun şablonu (kopyala/yapıştır) {#issue-template}

- Thunderbird sürümü ve işletim sistemi:
- Yeniden üretme adımları:
- Onay etkin mi? Varsayılan cevap:
- Örnek kara liste desenleri:
- Hata Konsolu günlükleri (Araçlar → Geliştirici Araçları → Hata Konsolu):
- Başka bir ilgili şey:

---

### Bağış

Bu projeyi desteklemek isterseniz, lütfen [Bağış](donation) sayfasında küçük bir katkıda bulunmayı düşünün. Teşekkürler!
