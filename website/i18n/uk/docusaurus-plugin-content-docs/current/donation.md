---
id: donation
title: 'Пожертвувати'
sidebar_label: 'Пожертвувати'
---

---

## Пожертвувати

import useBaseUrl from '@docusaurus/useBaseUrl';

Якщо вам подобається "Reply with Attachments" і ви хочете підтримати його розвиток, ви можете зробити пожертву тут:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Пожертвувати через Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>або</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Пожертвувати через PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>або</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Купіть мені каву" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Скануйте, щоб купити мені каву"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Дякуємо! Ваша підтримка допомагає зберігати сумісність із новими випусками Thunderbird, покращувати доступність і тести та підтримувати документацію в актуальному стані.

Примітки

- Посилання на пожертву відкриваються лише за кліком; додаток не виконує жодних фонових мережевих запитів.
- Регулярна підтримка допомагає довгостроковому супроводу та своєчасним оновленням, але є цілком необов’язковою.

---

Якщо кнопки‑зображення не завантажуються, скористайтеся цими посиланнями:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Пожертви є добровільними; доступ до функцій не обмежується.

---

## Видимість пожертв (90‑денне відкладення)

Додаток містить зручну функцію, що приховує прохання про пожертву на деякий час після того, як ви зробили внесок.

- Де знайти
  - Параметри → розділ Підтримка: ви побачите кнопку “I donated” і невелику область підказки.
  - Діалог підтвердження надсилання також показує кнопку Donate; вона автоматично ховається, коли відкладення активне.

- Як це працює
  - Натискання “I donated” приховує кнопки пожертви та пов’язані підказки на 90 днів.
  - Підказка стану показує “Hidden until YYYY‑MM‑DD” (у вашій локальній даті). Також є кнопка “Show Donate again”, щоб негайно відновити видимість.
  - Через 90 днів кнопка Donate знову стає видимою автоматично.

- Конфіденційність і зберігання
  - Додаток зберігає один часовий штамп у локальному сховищі Thunderbird, щоб запам’ятати період відкладення. Ключ: `donateHideUntil` (мілісекунди епохи).
  - Це налаштування локальне для вашого профілю Thunderbird (без хмарної синхронізації). Ця функція не здійснює жодних мережевих запитів.

- Вирішення проблем
  - Якщо Donate все ще відображається відразу після натискання “I donated”, зачекайте трохи або знову відкрийте сторінку Параметри; інтерфейс оновиться, щойно налаштування буде збережено.
  - Щоб скинути вручну, натисніть “Show Donate again”. Також можете дочекатися, поки мине дата, зазначена в підказці.

Ця функція призначена виключно для зручності; вона ніколи не блокує функціональність додатка і не збирає жодних персональних даних.

---
