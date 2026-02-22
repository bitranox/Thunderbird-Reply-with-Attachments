---
id: donation
title: 'Қайырымдылық жасау'
sidebar_label: 'Қайырымдылық жасау'
---

---

## Демеу

import useBaseUrl from '@docusaurus/useBaseUrl';

Егер сізге "Reply with Attachments" ұнаса және оның дамуын қолдағыңыз келсе, мұнда демеу жасай аласыз:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Stripe арқылы демеу жасау" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>немесе</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="PayPal арқылы демеу жасау" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>немесе</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Маған кофе сатып алыңыз" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Маған кофе сатып алу үшін сканерлеңіз"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Рахмет! Сіздің қолдауыңыз жаңа Thunderbird шығарылымдарымен үйлесімділікті қолдауға, қолжетімділікті және сынақтарды жақсартуға, сондай-ақ құжаттаманы уақтылы жаңартып отыруға көмектеседі.

Ескертпелер

- Демеу сілтемелері тек оларды басқанда ғана ашылады; қосымша ешқандай фондық желілік сұраулар орындамайды.
- Тұрақты қолдау ұзақ мерзімді қолдауға және дер кезінде жаңартуларға көмектеседі, бірақ бұл толықтай ерікті.

---

Егер кескін түймелері жүктелмесе, оның орнына осы сілтемелерді пайдаланыңыз:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Демеу ерікті; мүмкіндіктерді шектеу жоқ.

---

## Демеуді көрсету (90 күнге кідірту)

Қосымшада сіз демеу жасағаннан кейін біраз уақытқа демеуге шақыруларды жасыруға арналған ыңғайлы мүмкіндік бар.

- Қайдан табуға болады
  - Параметрлер → Қолдау бөлімі: мұнда “I donated” түймесін және шағын кеңес аймағын көресіз.
  - Жіберуді растау сұхбатында да Donate түймесі көрсетіледі; кідірту белсенді болғанда ол автоматты түрде жасырылып тұрады.

- Қалай жұмыс істейді
  - “I donated” түймесін басқан кезде демеу түймелері мен оған қатысты шақырулар 90 күнге жасырлады.
  - Күйге қатысты кеңес “Hidden until YYYY‑MM‑DD” (жергілікті күніңізде) деп көрсетіледі. Сондай‑ақ, көрінуді бірден қалпына келтіру үшін “Show Donate again” түймесі бар.
  - 90 күннен кейін Donate түймесі қайтадан автоматты түрде көрінетін болады.

- Құпиялық және сақтау
  - Қосымша кідірту кезеңін есте сақтау үшін Thunderbird жергілікті сақтауында бір уақыт белгісін ғана сақтайды. Кілт: `donateHideUntil` (epoch миллисекунд).
  - Бұл баптау сіздің Thunderbird профиліңізге ғана жергілікті (бұлтпен синхрондалмайды). Бұл мүмкіндік ешқандай желілік сұраулар жібермейді.

- Ақауларды жою
  - Егер “I donated” түймесін басқаннан кейін де Donate көрсетілсе, сәл күтіңіз немесе Параметрлер бетін қайта ашыңыз; баптау сақталған бойда интерфейс жаңартылады.
  - Қолмен қалпына келтіру үшін “Show Donate again” түймесін басыңыз. Сондай‑ақ, кеңесте көрсетілген күн өткенше күтсеңіз болады.

Бұл мүмкіндік тек ыңғайлылық үшін; ол ешқашан қосымшаның функционалын бұғаттамайды және ешқандай жеке деректер жинамайды.

---
