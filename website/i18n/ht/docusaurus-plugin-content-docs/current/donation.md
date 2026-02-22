---
id: donation
title: 'Fè don'
sidebar_label: 'Fè don'
---

---

## Fè don

import useBaseUrl from '@docusaurus/useBaseUrl';

Si ou renmen "Reply with Attachments" epi ou vle sipòte devlopman li, ou ka fè don isit la:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Fè don atravè Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>oswa</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Fè don atravè PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>oswa</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Achte m yon kafe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Eskane pou achte m yon kafe"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Mèsi! Sipò ou ede kenbe konpatibilite ak nouvo vèsyon Thunderbird yo, amelyore aksè/aksesibilite ak tès yo, epi kenbe dokiman yo ajou.

Nòt

- Lyen don yo louvri sèlman lè ou klike sou yo; ekstansyon an pa fè okenn demann rezo an background.
- Sipò ki repete ede antretyen alontèm ak mizajou a tan, men li nètman opsyonèl.

---

Si bouton imaj yo pa chaje, tanpri itilize lyen sa yo olye:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Achte m yon kafe](https://buymeacoffee.com/bitranox)

---

Don yo se volontè; pa gen okenn fonksyon ki fèmen dèyè don.

---

## Vizibilite Don (pòz 90 jou)

Ekstansyon an genyen yon fonksyon pratik pou kache rapèl don pandan kèk tan apre ou fin bay.

- Kote pou jwenn li
  - Opsyon → seksyon Sipò: w ap wè yon bouton “Mwen te bay” ak yon ti zòn endikasyon.
  - Dyalòg Konfimasyon Voye a montre tou yon bouton Don; li kache otomatikman lè pòz la aktif.

- Kijan li mache
  - Lè w klike “Mwen te bay”, sa kache bouton don yo ak rapèl ki gen rapò pou 90 jou.
  - Yon endikasyon estati montre “Kache jiska YYYY‑MM‑DD” (nan dat lokal ou). Genyen tou yon bouton “Montre Don ankò” pou retabli vizibilite imedyatman.
  - Apre 90 jou, bouton Don an vin vizib ankò otomatikman.

- Vi prive ak depo
  - Ekstansyon an sere yon sèl anprent tan nan depo lokal Thunderbird la pou sonje peryòd pòz la. Kle: `donateHideUntil` (milisèkond epòk).
  - Paramèt sa a lokal pou pwofil Thunderbird ou (pa senkronize nan nwaj). Fonksyon sa a pa fè okenn demann rezo.

- Rezoud pwoblèm
  - Si Don toujou parèt imedyatman apre ou klike “Mwen te bay”, tann yon ti moman oswa relouvri paj Opsyon yo; entèfas la ap mete ajou le pli vit ke paramèt la sove.
  - Pou reyajiste manyèlman, klike “Montre Don ankò”. Ou ka tou tann jiskaske dat ki make nan endikasyon an pase.

Fonksyon sa a se sèlman pou konvenyans; li pa janm bloke fonksyonalite ekstansyon an epi li pa ranmase okenn done pèsonèl.

---
