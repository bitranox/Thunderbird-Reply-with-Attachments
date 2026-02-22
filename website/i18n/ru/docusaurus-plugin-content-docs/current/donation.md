---
id: donation
title: 'Пожертвовать'
sidebar_label: 'Пожертвовать'
---

---

## Пожертвования

import useBaseUrl from '@docusaurus/useBaseUrl';

Если вам нравится "Reply with Attachments" и вы хотите поддержать его разработку, вы можете сделать пожертвование здесь:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Пожертвовать через Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>или</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Пожертвовать через PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>или</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Угостите меня кофе" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Сканируйте, чтобы угостить меня кофе"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Спасибо! Ваша поддержка помогает поддерживать совместимость с новыми выпусками Thunderbird, улучшать доступность и тесты и держать документацию в актуальном состоянии.

Примечания

- Ссылки для пожертвований открываются только по клику; дополнение не выполняет фоновых сетевых запросов.
- Регулярная поддержка помогает в долгосрочном обслуживании и своевременных обновлениях, но она полностью необязательна.

---

Если кнопки‑изображения не загрузились, воспользуйтесь этими ссылками:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Пожертвования добровольны; доступ к функциям не ограничивается.

---

## Видимость пожертвований (90‑дневная пауза)

В дополнении есть удобная функция, позволяющая на время скрыть напоминания о пожертвованиях после того, как вы сделали взнос.

- Где это найти
  - Параметры → раздел «Поддержка»: вы увидите кнопку «Я пожертвовал(а)» и небольшую область с подсказкой.
  - В диалоге подтверждения отправки также показывается кнопка «Пожертвовать»; она автоматически скрывается, когда пауза активна.

- Как это работает
  - Нажатие «Я пожертвовал(а)» скрывает кнопки пожертвования и связанные подсказки на 90 дней.
  - Подсказка состояния показывает «Скрыто до YYYY‑MM‑DD» (в вашей локальной дате). Также есть кнопка «Показать «Пожертвовать» снова» для немедленного восстановления видимости.
  - Через 90 дней кнопка «Пожертвовать» снова становится видимой автоматически.

- Конфиденциальность и хранение
  - Дополнение сохраняет единственную метку времени в локальном хранилище Thunderbird, чтобы запомнить период паузы. Ключ: `donateHideUntil` (миллисекунды эпохи).
  - Эта настройка локальна для вашего профиля Thunderbird (не синхронизируется через облако). Эта функция не выполняет сетевых запросов.

- Устранение неполадок
  - Если сразу после нажатия «Я пожертвовал(а)» кнопка «Пожертвовать» всё ещё отображается, подождите немного или откройте страницу параметров заново; интерфейс обновится, как только настройка будет сохранена.
  - Чтобы сбросить вручную, нажмите «Показать «Пожертвовать» снова». Можно также подождать, пока не наступит дата, указанная в подсказке.

Эта функция предназначена исключительно для удобства; она никогда не блокирует функциональность дополнения и не собирает никаких персональных данных.

---
