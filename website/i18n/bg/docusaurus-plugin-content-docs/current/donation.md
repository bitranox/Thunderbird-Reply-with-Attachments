---
id: donation
title: 'Дарете'
sidebar_label: 'Дарете'
---

---

## Дарение

import useBaseUrl from '@docusaurus/useBaseUrl';

Ако харесвате "Reply with Attachments" и искате да подкрепите разработката му, можете да дарите тук:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Дарете чрез Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>или</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Дарете чрез PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>или</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Почерпете ме с кафе" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Сканирайте, за да ми купите кафе"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Благодаря! Вашата подкрепа помага за поддържане на съвместимостта с новите версии на Thunderbird, подобряване на достъпността и тестовете и поддържане на документацията актуална.

Бележки

- Връзките за дарение се отварят само когато щракнете върху тях; добавката не извършва фонови мрежови заявки.
- Периодичната подкрепа помага за дългосрочната поддръжка и навременните актуализации, но е изцяло по избор.

---

Ако бутоните-изображения не се зареждат, моля използвайте вместо тях тези връзки:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Даренията са доброволни; няма ограничаване на функционалности.

---

## Видимост на даренията (90‑дневно отлагане)

Добавката включва удобна функция за скриване на подканите за дарение за известно време, след като сте дарили.

- Къде да го намерите
  - Опции → раздел Поддръжка: ще видите бутон „Дарих“ и малка зона с подсказка.
  - Диалогът за потвърждение на изпращането също показва бутон „Дарение“; той се скрива автоматично, когато отлагането е активно.

- Как работи
  - Натискането на „Дарих“ скрива бутоните за дарение и свързаните подсказки за 90 дни.
  - Подсказка за състоянието показва „Скрито до YYYY‑MM‑DD“ (според локалната ви дата). Има и бутон „Покажи „Дарение“ отново“, за да възстановите видимостта веднага.
  - След 90 дни бутонът „Дарение“ отново става видим автоматично.

- Поверителност и съхранение
  - Добавката съхранява един времеви маркер в локалното хранилище на Thunderbird, за да запомни периода на отлагане. Ключ: `donateHideUntil` (милисекунди от епохата).
  - Тази настройка е локална за вашия профил в Thunderbird (не се синхронизира в облака). Тази функция не извършва никакви мрежови заявки.

- Отстраняване на проблеми
  - Ако „Дарение“ все още се показва веднага след натискане на „Дарих“, изчакайте малко или отворете отново страницата Опции; интерфейсът се обновява веднага щом настройката бъде записана.
  - За ръчно нулиране щракнете „Покажи „Дарение“ отново“. Можете също да изчакате да настъпи датата, посочена в подсказката.

Тази функция е само за удобство; никога не блокира функционалността на добавката и не събира лични данни.

---
