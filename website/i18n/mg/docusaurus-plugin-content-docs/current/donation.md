---
id: donation
title: 'Hanome'
sidebar_label: 'Manome'
---

---

## Manolotra fanomezana

import useBaseUrl from '@docusaurus/useBaseUrl';

Raha tianao ny "Reply with Attachments" ary te hanohana ny fampandrosoana azy, azonao atao ny manolotra fanomezana eto:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Manolotra fanomezana amin'ny alalan'ny Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>na</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Manolotra fanomezana amin'ny alalan'ny PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>na</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Mividiana kafe ho ahy" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Skanera mba hividy kafe ho ahy"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Misaotra! Ny fanohananao dia manampy hitazona ny fifanarahana amin'ireo famoahana Thunderbird vaovao, hanatsara ny fahafahana idirana sy ny fitsapana, ary hitazona ny antontan‑taratasy ho havaozina.

Fanamarihana

- Mivoha fotsiny rehefa tsindrianao ny rohy fanomezana; tsy manao fangatahana tambajotra ao ambadika ny fanitarana.
- Ny fanohanana miverimberina dia manampy amin'ny fikojakojana maharitra sy fanavaozana ara‑potoana, saingy safidy tanteraka izy io.

---

Raha tsy miseho ireo bokotra sary, azafady ampiasao ireto rohy manaraka ireto:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

An-tsitrapo ny fanomezana; tsy misy endri‑asa sakanana.

---

## Fisehon'ny fanomezana (fitsaharana 90 andro)

Misy endri‑asa manamora ao amin'ny fanitarana mba hanafenana vetivety ny tolo‑kevitra hanao fanomezana rehefa avy nanome ianao.

- Aiza no ahitanao azy
  - Options → Support section: hahita bokotra “I donated” sy faritra kely misy soso‑kevitra ianao.
  - Asehon'ny boaty fifanakalozana Send‑confirmation koa ny bokotra Donate; miafina ho azy izy io rehefa mandeha ny fitsaharana.

- Fomba fiasany
  - Ny tsindriana ny “I donated” dia manafina ny bokotra fanomezana sy ny tolo‑kevitra mifandraika aminy mandritra ny 90 andro.
  - Misy soso‑kevitra momba ny sata mampiseho hoe “Hidden until YYYY‑MM‑DD” (araka ny daty eo an‑toerana). Misy koa bokotra “Show Donate again” hanarenana avy hatrany ny fisehoana.
  - Rehefa afaka 90 andro dia hita ho azy indray ny bokotra Donate.

- Fiainana manokana sy fitahirizana
  - Ny fanitarana dia mitahiry timestamp tokana ao amin'ny fitahirizana eo an‑toeran'i Thunderbird mba hahatsiarovana ny fe‑potoana fitsaharana. Key: `donateHideUntil` (milliseconda epoch).
  - Ity fikirakirana ity dia eo an‑toeran'ny mombamomba anao ao Thunderbird (tsy ampifanarahana amin'ny rahona). Tsy misy fangatahana tambajotra ataon'ity endri‑asa ity.

- Fanamboarana olana
  - Raha mbola miseho ny Donate avy hatrany aorian'ny tsindriana “I donated”, miandrasa kely na sokafy indray ny pejy Options; havaozin'ny UI raha vao voatahiry ny fikirakirana.
  - Mba hamerenana azy amin'ny tanana, tsindrio ny “Show Donate again”. Azonao atao koa ny miandry mandra‑pahatongan'ny daty voalaza ao amin'ilay soso‑kevitra.

Endri‑asa ho an'ny fahamoranana fotsiny io; tsy manakana mihitsy ny fiasa ao amin'ny fanitarana ary tsy manangona angon‑drakitra manokana.

---
