---
id: donation
title: 'Ахвяраваць'
sidebar_label: 'Ахвяраваць'
---

---

## Ахвяраваць

import useBaseUrl from '@docusaurus/useBaseUrl';

Калі вам падабаецца «Reply with Attachments» і вы хочаце падтрымаць яго распрацоўку, вы можаце ахвяраваць тут:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Ахвяраваць праз Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ці</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Ахвяраваць праз PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ці</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Купіць мне каву" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Адскануйце, каб купіць мне каву"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Дзякуй! Ваша падтрымка дапамагае захоўваць сумяшчальнасць з новымі выпускамі Thunderbird, паляпшаць даступнасць і тэсты, а таксама падтрымліваць дакументацыю актуальнай.

Заўвагі

- Спасылкі на ахвяраванні адчыняюцца толькі пры націску; дадатак не выконвае ніякіх фонавых сеткавых запытаў.
- Паўторная падтрымка дапамагае доўгатэрміноваму суправаджэнню і своечасовым абнаўленням, але цалкам неабавязковая.

---

Калі кнопкі з выявамі не загружаюцца, скарыстайцеся замест іх гэтымі спасылкамі:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Купіце мне каву](https://buymeacoffee.com/bitranox)

---

Ахвяраванні добраахвотныя; няма ніякага блакавання функцый.

---

## Бачнасць ахвяраванняў (адклад на 90 дзён)

Дадатак утрымлівае зручную функцыю, якая дазваляе на некаторы час схаваць запыты на ахвяраванне пасля таго, як вы ахвяравалі.

- Дзе знайсці
  - Параметры → раздзел «Падтрымка»: вы ўбачыце кнопку «Я ахвяраваў(ла)» і невялікую вобласць падказкі.
  - У дыялогавым акне пацвярджэння адпраўкі таксама ёсць кнопка «Ахвяраваць»; яна аўтаматычна хаваецца, калі адклад актываваны.

- Як гэта працуе
  - Націсканне «Я ахвяраваў(ла)» хавае кнопкі ахвяравання і адпаведныя падказкі на 90 дзён.
  - У падказцы стану паказваецца «Схавана да YYYY‑MM‑DD» (паводле вашай лакальнай даты). Таксама ёсць кнопка «Паказаць “Ахвяраваць” зноў», каб адразу аднавіць бачнасць.
  - Праз 90 дзён кнопка «Ахвяраваць» зноў аўтаматычна становіцца бачнай.

- Прыватнасць і захоўванне
  - Дадатак захоўвае адзін часавы штамп у лакальным сховішчы Thunderbird, каб памятаць перыяд адкладу. Ключ: `donateHideUntil` (мілісекунды эпохі).
  - Гэта налада лакальная для вашага профілю Thunderbird (не сінхранізуецца ў воблаку). Гэтая функцыя не выконвае сеткавых запытаў.

- Ухіленне непаладак
  - Калі пасля націскання «Я ахвяраваў(ла)» «Ахвяраваць» усё яшчэ паказваецца, пачакайце крыху або пераадкрыйце старонку Параметраў; інтэрфейс абнаўляецца адразу пасля захавання налады.
  - Каб скінуць уручную, націсніце «Паказаць “Ахвяраваць” зноў». Вы таксама можаце пачакаць, пакуль не настане дата, паказаная ў падказцы.

Гэтая функцыя прызначаная выключна для зручнасці; яна ніколі не блакуе функцыянальнасць дадатку і не збірае ніякіх персанальных дадзеных.

---
