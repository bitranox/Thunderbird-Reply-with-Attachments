---
id: donation
title: 'Tanga inkunga'
sidebar_label: 'Tanga inkunga'
---

---

## Tanga inkunga

import useBaseUrl from '@docusaurus/useBaseUrl';

Nimba ukunda "Reply with Attachments" kandi wipfuza gushigikira iterambere ryayo, urashobora gutanga inkunga hano:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Tanga inkunga ukoresheje Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>canke</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Tanga inkunga ukoresheje PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>canke</div>
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
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Sikana ugure ikawa" width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Urakoze cane! Inkunga yawe ifasha gukomeza guhuza n’amasohoka mashasha ya Thunderbird, kunoza accessibility n’igeragezwa, no kugumiza inyandiko zivuguruye.

Ibisobanuro

- Amahuliro yo gutanga inkunga aruguruka gusa iyo uyakandaguye; umwongerezo (add‑on) ntiwongera gukora ibisabwa na internet (network) mu nyuma (background).
- Inkunga yisubirako ifasha kubungabunga igihe kirekire no kuvugurura ku gihe, ariko si ngombwa na gato.

---

Nimba utubonero twa mashusho tutaduga, koresha aya mahuriro aho kubindi:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Inkunga itangwa ku bushake; nta na kimwe mu bikorwa gifungirwa inyuma y’ukutayitanga.

---

## Ukugaragara kw’inkunga (gusinziza iminsi 90)

Umwongerezo urimwo igice corohereza gihisha uduhamagarira gutanga inkunga mu kiringo gito umaze gutanga.

- Aho wobisanga
  - Options → igice Support: ubona akabuto “I donated” hamwe n’agace gatoya k’inyibutsa.
  - Ikiganiro c’ukwemeza kurungika (Send‑confirmation) na co kirerekana akabuto Donate; karihisha ubwako iyo gusinziza (snooze) gukora.

- Ingene gikora
  - Gukanda “I donated” bihisha udufato duto tw’inkunga n’utundi duhamagarira bijanye na two mu minsi 90.
  - Inyibutsa y’ukugene vyifashe (status hint) yerekana “Hidden until YYYY‑MM‑DD” (itariki y’iwanyu). Hariho kandi akabuto “Show Donate again” ko gusubizaho ukugaragara ako kanya.
  - Haciye iminsi 90, akabuto Donate kigaragara ubwako ukundi.

- Ubuzima bw’ibanga n’ububiko
  - Umwongerezo ubika isaha imwe (timestamp) mu bubiko bwo kuri uno mukoresha bwa Thunderbird kugira wibuke igihe co gusinziza. Urufunguzo: `donateHideUntil` (milisegonda za epoch).
  - Iri shirwaho riraguma muri porofayiro yawe ya Thunderbird (ntirisinkronizwa na cloud). Nta masabwe ya network akorwa n’iki gice.

- Gukemura ingorane
  - Nimba Donate iguma yerekana ako kanya umaze gukanda “I donated”, rinda akanya canke wongere ugure urupapuro rwa Options; UI ivugurura ako kanya iyo ishirwaho (setting) ibitswe.
  - Gusubizaho n’ukuboko, kanda “Show Donate again”. Ushobora kandi kurindira gushika itariki irimwo inyibutsa ihita.

Iki gice ni ico korohereza gusa; ntikigahagarika na rimwe imikorere y’umwongerezo kandi ntikitororokanya amakuru y’umuntu.

---
