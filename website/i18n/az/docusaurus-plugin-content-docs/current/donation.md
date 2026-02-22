---
id: donation
title: 'İanə et'
sidebar_label: 'İanə et'
---

## İanə

import useBaseUrl from '@docusaurus/useBaseUrl';

Əgər "Reply with Attachments" əlavəsini bəyənirsinizsə və inkişafına dəstək olmaq istəyirsinizsə, buradan ianə edə bilərsiniz:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Stripe vasitəsilə ianə et" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>və ya</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="PayPal vasitəsilə ianə et" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>və ya</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Buy Me a Coffee" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Buy Me a Coffee almaq üçün skan edin"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Təşəkkürlər! Dəstəyiniz yeni Thunderbird buraxılışları ilə uyğunluğu qorumağa, əlçatanlığı və testləri yaxşılaşdırmağa və sənədləri aktual saxlamağa kömək edir.

Qeydlər

- İanə linkləri yalnız onlara kliklədikdə açılır; əlavə arxa planda heç bir şəbəkə sorğusu yerinə yetirmir.
- Müntəzəm dəstək uzunmüddətli texniki qulluq və vaxtında yeniləmələrə kömək edir, lakin tamamilə ixtiyaridir.

---

Şəkil düymələri yüklənmirsə, əvəzində bu keçidlərdən istifadə edin:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

İanələr könüllüdür; heç bir funksiya məhdudiyyəti yoxdur.

---

## İanənin görünməsi (90 günlük təxirə)

Əlavə, ianə etdikdən sonra bir müddət ianə istəklərini gizlətmək üçün rahatlıq funksiyası təqdim edir.

- Haradan tapmaq olar
  - Seçimlər → Dəstək bölməsi: “Mən ianə etdim” düyməsini və kiçik ipucu sahəsini görəcəksiniz.
  - Göndərmə‑təsdiqi dialoqu da “İanə et” düyməsini göstərir; snooze aktiv olduqda o, avtomatik olaraq gizlənir.

- Necə işləyir
  - “Mən ianə etdim” üzərinə klikləmək ianə düymələrini və əlaqəli xatırlatmaları 90 günlüyünə gizlədir.
  - Vəziyyət ipucunda “YYYY‑MM‑DD tarixinədək gizlidir” (yerli tarixinizlə) göstərilir. Görünürlüğü dərhal bərpa etmək üçün “İanəni yenidən göstər” düyməsi də var.
  - 90 gündən sonra “İanə et” düyməsi yenidən avtomatik görünür.

- Məxfilik və saxlanma
  - Əlavə təxirə müddətini yadda saxlamaq üçün Thunderbird‑ün lokal yaddaşında bir zaman nişanını saxlayır. Açar: `donateHideUntil` (epoxa millisanələri).
  - Bu tənzimləmə Thunderbird profilinizə lokaldır (buludla sinxronlaşdırılmır). Bu funksiya heç bir şəbəkə sorğusu göndərmir.

- Problemlərin həlli
  - “Mən ianə etdim”ə kliklədikdən dərhal sonra “İanə et” hələ də görünürsə, bir qədər gözləyin və ya Seçimlər səhifəsini yenidən açın; tənzimləmə saxlanılan kimi interfeys yenilənir.
  - Əlilə sıfırlamaq üçün “İanəni yenidən göstər” düyməsini klikləyin. Həmçinin ipucunda göstərilən tarix keçənədək gözləyə bilərsiniz.

Bu funksiya yalnız rahatlıq üçündür; heç vaxt əlavə funksionallığını bloklamır və heç bir şəxsi məlumat toplamır.

---
