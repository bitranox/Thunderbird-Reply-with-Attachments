---
id: donation
title: 'Tanga inkunga'
sidebar_label: 'Tanga inkunga'
---

---

## Tanga inkunga

import useBaseUrl from '@docusaurus/useBaseUrl';

Niba ukunda "Reply with Attachments" kandi wifuza gushyigikira iterambere ryayo, ushobora gutanga inkunga hano:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Tanga inkunga binyuze kuri Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>cyangwa</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Tanga inkunga binyuze kuri PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>cyangwa</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Ungurire ikawa" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Skanisha kugira ngo ungurire ikawa"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Urakoze! Ubufasha bwawe bufasha gukomeza guhuza n'ibisohoka bishya bya Thunderbird, kunoza uburyo bwo kwemerera buri wese gukoresha (accessibility) no igerageza, no gukomeza inyandiko zijyanye n’igihe.

Ibyitonderwa

- Amahuzanyo yo gutanga inkunga arifunguka gusa iyo uyakandagiye; uwo mugereka (add‑on) ntukora ibisabwa kuri murandasi mu buryo bukorerwa inyuma (background).
- Ubufasha buhoraho bufasha kubungabunga igihe kirekire no kuvugurura ku gihe, ariko ni ubushake gusa.

---

Niba buto z'amashusho zitapakiye, nyamuneka koresha aya mahuzanyo akurikira aho kubyo hejuru:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Imfashanyo zitangwa ku bushake; nta bice by’imikorere bifungirwa inyuma y’inkunga.

---

## Kugaragara kw’inkunga (kucecekesha iminsi 90)

Uwo mugereka ugira uburyo bworoshye bwo guhisha ubutumwa bwo gusaba inkunga mu gihe runaka nyuma yo gutanga inkunga.

- Aho kubusanga
  - Options → igice cya Support: urabona buto “I donated” n’agace gato k’inyibutsa.
  - Idirishya ry’iyemezabikorwa ryo kohereza (Send‑confirmation dialog) nanone rigaragaza buto Donate; rihita rihishwa iyo kucecekesha (snooze) gukora.

- Uko bikora
  - Gukanda “I donated” bihisha amabuto yo gutanga inkunga n’ubutumwa bijyanye na byo mu minsi 90.
  - Ubutumwa bw’imitere bwerekana “Hidden until YYYY‑MM‑DD” (mu itariki y’iwanyu). Hari kandi buto “Show Donate again” yo gusubizaho kugaragara ako kanya.
  - Nyuma y’iminsi 90, buto ya Donate yongera kugaragara mu buryo bwikora.

- Ibanga n’ububiko
  - Uwo mugereka ubika isaha imwe (timestamp) mu bubiko bw’aho bwa Thunderbird kugira ngo wibuke igihe cyo kucecekesha. Urufunguzo: `donateHideUntil` (milliseconds za epoch).
  - Iyi miterere ireba gusa umwirondoro wawe wa Thunderbird (ntihuzwa muri cloud). Nta busabe bwa murandasi bukorwa n’iyi mikorere.

- Gukemura ibibazo
  - Niba Donate igikigaragara ako kanya nyuma yo gukanda “I donated”, tegereza akanya cyangwa fungura nanone ipaji ya Options; UI ivugururwa ako kanya imiterere imaze kubikwa.
  - Kugira ngo usubize ku busanzwe intoki, kanda “Show Donate again”. Ushobora kandi gutegereza kugeza itariki iri mu nyibutsa igeze.

Iyi mikorere ni iyo korohereza gusa; ntibangamira na rimwe imikorere y'umugereka kandi ntikusanya amakuru yihariye y’abakoresha.

---
