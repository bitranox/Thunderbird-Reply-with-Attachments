---
id: donation
title: 'Хайрия кунед'
sidebar_label: 'Хайрия кунед'
---

---

## Хайрия

import useBaseUrl from '@docusaurus/useBaseUrl';

Агар ба шумо "Reply with Attachments" писанд бошад ва хоҳед, ки рушди онро дастгирӣ кунед, метавонед дар ин ҷо хайрия намоед:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Хайрия тавассути Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ё</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Хайрия тавассути PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ё</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Ба ман қаҳва харед" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Барои харидани қаҳва барои ман скан кунед"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Ташаккур! Дастгирии шумо барои нигоҳ доштани мутобиқат бо нашрҳои нави Thunderbird, беҳтар кардани дастрасӣ ва санҷишҳо ва нигоҳ доштани ҳуҷҷатгузорӣ нав кӯмак мекунад.

Эзоҳҳо

- Пайвандҳои хайрия танҳо ҳангоми зер кардан кушода мешаванд; илова ягон дархости шабакавии пасзаминаро иҷро намекунад.
- Дастгирии даврӣ ба нигоҳдории дарозмуддат ва навсозии саривақтӣ кумак мекунад, аммо комилан ихтиёрӣ аст.

---

Агар тугмаҳои тасвирӣ бор нашаванд, лутфан ба ҷойи он аз ин пайвандҳо истифода баред:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Хайрияҳо ихтиёрӣ ҳастанд; ягон маҳдудияти имкониятҳо вуҷуд надорад.

---

## Намоёнияти хайрия (90‑рӯза “snooze”)

Илова хусусияти қулай дорад, ки пас аз хайрия кардан барои муддате дархостҳои хайрияро пинҳон мекунад.

- Куҷо онро ёфтан мумкин аст
  - Танзимот → қисмати Дастгирӣ: шумо тугмаи “Ман хайрия кардам” ва майдони ишораи хурдро мебинед.
  - Равзанаи тасдиқи фиристодан низ тугмаи Хайрияро нишон медиҳад; вақте ки “snooze” фаъол аст, он худкор пинҳон мешавад.

- Чӣ гуна кор мекунад
  - Зер кардани “Ман хайрия кардам” тугмаҳои хайрия ва дархостҳои марбутро барои 90 рӯз пинҳон мекунад.
  - Ишораи ҳолат “Пинҳон то YYYY‑MM‑DD” (бо санаи маҳаллии шумо) нишон медиҳад. Ҳамчунин тугмаи “Нишон додани Хайрия боз” мавҷуд аст, то фавран намоёнӣ барқарор шавад.
  - Пас аз 90 рӯз тугмаи Хайрия боз худкор намоён мегардад.

- Махфият ва захира
  - Илова як мӯҳри замонӣ (timestamp)-ро дар захираи маҳаллии Thunderbird нигоҳ медорад, то давраи “snooze”-ро дар хотир дорад. Калид: `donateHideUntil` (миллисонияҳои эпоха).
  - Ин танзим танҳо ба профили маҳаллии Thunderbird-и шумо марбут аст (бо абр ҳамоҳанг намешавад). Ин хусусият ягон дархости шабакавӣ намекунад.

- Ислоҳи мушкилот
  - Агар фавран пас аз зер кардани “Ман хайрия кардам” боз ҳам Хайрия намоён бошад, каме интизор шавед ё саҳифаи Танзимотро боз кушоед; интерфейс ҳамин ки танзим нигоҳ дошта шавад, нав ме гардад.
  - Барои барқарорсозии дастӣ, “Нишон додани Хайрия боз”-ро зер кунед. Шумо метавонед то расидани санаи зикршуда дар ишора низ интизор шавед.

Ин хусусият танҳо барои қулайӣ аст; он ҳеҷ гоҳ фаъолияти иловаи барномаро маҳкам намекунад ва ягон маълумоти шахсиро ҷамъ намекунад.

---
