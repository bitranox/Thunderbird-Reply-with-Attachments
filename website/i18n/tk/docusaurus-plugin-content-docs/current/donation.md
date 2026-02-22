---
id: donation
title: 'Bagyş et'
sidebar_label: 'Bagyş et'
---

---

## Bagyş etmek

import useBaseUrl from '@docusaurus/useBaseUrl';

Eger "Reply with Attachments" hoşunuza gelse we onuň ösüşini goldamak isleseňiz, bu ýerde bagyş edip bilersiňiz:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Stripe arkaly bagyş et" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ýa-da</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="PayPal arkaly bagyş et" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ýa-da</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Maña kofe satyn alyň" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Maña kofe satyn almak üçin skan ediň"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Sag boluň! Siziň goldawyňyz täze Thunderbird çykarylyşlary bilen gabat gelmegi saklamaga, elýeterliligi we synaglary gowulandyrmaga, hem-de dokumentasiýany döwrebap saklamaga kömek edýär.

Bellikler

- Bagyşlama baglanyşyklary diňe olaryň üstüne basanyňyzda açylýar; goşundy aňyrdan tor boýunça hiç hili haýyşy etmýär.
- Yzygiderli goldaw uzak möhletli hyzmaty we wagtynda täzelenmeleri goldaýar, ýöne düýbünden meýletindir.

---

Eger suratly düwmeler ýüklenmese, munuň ýerine şu baglanyşyklary ulanyň:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Bagyşlar meýletindir; aýratynlyklaryň petiklenmesi ýok.

---

## Bagyş görünýänligi (90‑günlik wagtlaýyn gizlemek)

Goşundyda, bagyş edeniňizden soň, bir müddetlige bagyşlama tekliplerini gizlemek üçin amatlylyk aýratynlygy bar.

- Niräde tapmaly
  - Sazlamalar → Goldaw bölümi: “Men bagyş etdim” düwmesini we kiçi bellik meýdanyny görersiňiz.
  - Ugratmagy tassyklaýyş dialogy-da “Bagyş et” düwmesini görkezýär; wagtlaýyn gizlemek işjeň wagtynda ol awtomatiki ýagdaýda gizlenýär.

- Nädip işleýär
  - “Men bagyş etdim” düwmesine basmak, bagyş düwmelerini we degişli teklipleri 90 günläp gizleýär.
  - Ýagdaý boýunça bellik “YYYY‑MM‑DD çenli gizlendi” (ýerli senäňiz boýunça) diýip görkezýär. Şol bir wagtyň özünde bada-bat görünmegi dikeltmek üçin “Bagyş et” düwmesini ýene görkez” düwmesi bar.
  - 90 gün geçenden soň, “Bagyş et” düwmesi ýene awtomatiki görnüşde görünýär.

- Gizlinlik we saklama
  - Goşundy wagtlaýyn gizlemek döwrüni ýatda saklamak üçin Thunderbird-iň ýerli saklaýjysynda bir wagt belligini saklaýar. Açar: `donateHideUntil` (epoha millisekuntlar).
  - Bu sazlama Thunderbird profilňiz üçin ýerli (bulut bilen sinhronlanmaýar). Bu aýratynlyk hiç hili tor haýyşlaryny etmýär.

- Näsazlyklary aradan aýyrmak
  - “Men bagyş etdim” basylandan soň hem “Bagyş et” henizem görünýän bolsa, birsalym garaşyň ýa-da Sazlamalar sahypasyny täzeden açyň; sazlama saklanan badyna interfeýs täzelenýär.
  - El bilen täzeden dikeltmek üçin “Bagyş et” düwmesini ýene görkez” düwmesine basyň. Şeýle hem bellikde görkezilen sene geçýänçä garaşyp bilersiňiz.

Bu aýratynlyk diňe amatlylyk üçin; ol goşundynyň mümkinçiliklerini hiç haçan petikleýär we hiç hili şahsy maglumat ýygnamaýar.

---
