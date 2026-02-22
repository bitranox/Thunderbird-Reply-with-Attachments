---
id: donation
title: 'Bağış Yap'
sidebar_label: 'Bağış Yap'
---

---

## Bağış

import useBaseUrl from '@docusaurus/useBaseUrl';

Eğer "Reply with Attachments" hoşunuza gidiyorsa ve geliştirilmesini desteklemek istiyorsanız, buradan bağış yapabilirsiniz:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Stripe üzerinden bağış yapın" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>veya</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="PayPal üzerinden bağış yapın" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>veya</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Bana bir kahve ısmarla" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Bana bir kahve ısmarlamak için tarayın"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Teşekkürler! Desteğiniz, yeni Thunderbird sürümleriyle uyumluluğun korunmasına, erişilebilirliğin ve testlerin iyileştirilmesine ve belgelerin güncel tutulmasına yardımcı olur.

Notlar

- Bağış bağlantıları yalnızca onlara tıkladığınızda açılır; eklenti arka planda hiçbir ağ isteği gerçekleştirmez.
- Düzenli destek uzun vadeli bakımı ve zamanında güncellemeleri destekler, ancak tamamen isteğe bağlıdır.

---

Görüntü düğmeleri yüklenmiyorsa, lütfen bunun yerine şu bağlantıları kullanın:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Bağışlar gönüllüdür; herhangi bir özellik kısıtlaması yoktur.

---

## Bağış Görünürlüğü (90 günlük erteleme)

Eklenti, bağış yaptıktan sonra bir süre bağış istemlerini gizlemeye yarayan bir kolaylık özelliği içerir.

- Nerede bulabilirsiniz
  - Seçenekler → Destek bölümü: “Bağış yaptım” düğmesini ve küçük bir ipucu alanını göreceksiniz.
  - Gönderim onayı iletişim kutusu da bir Bağış Yap düğmesi gösterir; erteleme etkin olduğunda otomatik olarak gizlenir.

- Nasıl çalışır
  - “Bağış yaptım”a tıklamak, bağış düğmelerini ve ilgili istemleri 90 gün süreyle gizler.
  - Bir durum ipucu, yerel tarihinizde “Hidden until YYYY‑MM‑DD” ifadesini gösterir. Görünürlüğü hemen geri yüklemek için “Bağışı tekrar göster” düğmesi de vardır.
  - 90 gün sonra, Bağış Yap düğmesi kendiliğinden yeniden görünür hale gelir.

- Gizlilik ve depolama
  - Eklenti, erteleme süresini hatırlamak için Thunderbird’ün yerel depolamasında tek bir zaman damgası saklar. Anahtar: `donateHideUntil` (epoch milisaniye).
  - Bu ayar Thunderbird profilinize özeldir (bulutla eşitlenmez). Bu özellik herhangi bir ağ isteği yapmaz.

- Sorun giderme
  - “Bağış yaptım”a tıkladıktan hemen sonra Bağış hâlâ görünüyorsa, bir an bekleyin veya Seçenekler sayfasını yeniden açın; ayar kaydedilir kaydedilmez arayüz güncellenir.
  - Elle sıfırlamak için “Bağışı tekrar göster”e tıklayın. Ayrıca, ipucunda belirtilen tarihin geçmesini de bekleyebilirsiniz.

Bu özellik yalnızca kolaylık içindir; eklenti işlevselliğini asla engellemez ve hiçbir kişisel veri toplamaz.

---
