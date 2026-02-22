---
id: donation
title: 'Кайрымдуулук кылуу'
sidebar_label: 'Кайрымдуулук кылуу'
---

---

## Кайрымдуулук

import useBaseUrl from '@docusaurus/useBaseUrl';

Эгерде сизге "Reply with Attachments" жакса жана анын өнүгүүсүн колдогуңуз келсе, бул жерден кайрымдуулук кыла аласыз:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Stripe аркылуу кайрымдуулук кылуу" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>же</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="PayPal аркылуу кайрымдуулук кылуу" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>же</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Мага кофе алып бериңиз" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Кофе алып берүү үчүн сканерлөө"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Рахмат! Сиздин колдооңуз Thunderbird’дин жаңы чыгарылыштары менен шайкештикти сактоого, жеткиликтүүлүктү жана тесттерди жакшыртууга, ошондой эле документацияны өз убагында жаңыртып турууга жардам берет.

Эскертмелер

- Кайрымдуулук шилтемелери сиз аларды басканда гана ачылат; кошумча эч кандай фондук тармактык сурамдарды аткарбайт.
- Мезгил-мезгили менен колдоо узак мөөнөттүү тейлөөгө жана өз учурунда жаңыртууларга көмөктөшөт, бирок бул толугу менен ыктыярдуу.

---

Эгер сүрөт баскычтары жүктөлбөсө, анын ордуна ушул шилтемелерди колдонуңуз:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Кайрымдуулуктар ыктыярдуу; функцияларга кирүүнү чектөө жок.

---

## Кайрымдуулук көрүнүшү (90 күнгө убактылуу жашыруу)

Кошумча кайрымдуулук кылгандан кийин кайрымдуулук сурамдарын бир аз убакытка жашыруу үчүн ыңгайлуу функцияны камтыйт.

- Кайдан табууга болот
  - Параметрлер → Колдоо бөлүмү: “Мен кайрымдуулук кылдым” баскычы жана кичинекей кеңеш аймагы көрүнөт.
  - Жөнөтүүнү ырастауу диалогунда да Кайрымдуулук баскычы көрсөтүлөт; убактылуу жашыруу активдүү болгондо ал автоматтык түрдө жашырылат.

- Кантип иштейт
  - “Мен кайрымдуулук кылдым” дегенди басканда кайрымдуулук баскычтары жана тиешелүү эскертмелер 90 күнгө жашырылат.
  - Абал боюнча кеңеш “YYYY‑MM‑DD чейин жашырылган” (жергиликтүү күнүңүздө) деп көрсөтөт. Көрүнүштү дароо калыбына келтирүү үчүн “Кайрымдуулукту кайра көрсөт” баскычы да бар.
  - 90 күн өткөндөн кийин, Кайрымдуулук баскычы кайра автоматтык түрдө көрүнөт.

- Купуялуулук жана сактоо
  - Кошумча убактылуу жашыруу мөөнөтүн эстеп калуу үчүн Thunderbird’дүн жергиликтүү сактагычына бир убакыт мөөрүн сактайт. Ачкыч: `donateHideUntil` (эпоханын миллисекунддары).
  - Бул орнотуу сиздин Thunderbird профилиңизге гана тиешелүү (булут менен синхрондоштурулбайт). Бул функция эч кандай тармактык сурамдарды жасабайт.

- Мүчүлүштүктөрдү оңдоо
  - Эгер “Мен кайрымдуулук кылдым” дегенди баскандан кийин дароо эле Кайрымдуулук дагы эле көрүнүп турса, бир аз күтө туруңуз же Параметрлер бетин кайра ачыңыз; параметр сакталган замат интерфейс жаңыланат.
  - Кол менен баштапкы абалга келтирүү үчүн “Кайрымдуулукту кайра көрсөт” дегенди басыңыз. Ошондой эле кеңештеги көрсөтүлгөн дата өткөнгө чейин күтсөңүз болот.

Бул функция толугу менен ыңгайлуулук үчүн; ал эч качан кошумчанын функционалдуулугун бөгөттебейт жана эч кандай жеке маалыматтарды чогултпайт.

---
