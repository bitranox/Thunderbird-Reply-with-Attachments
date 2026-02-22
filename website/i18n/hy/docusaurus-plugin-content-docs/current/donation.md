---
id: donation
title: 'Նվիրաբերել'
sidebar_label: 'Նվիրաբերել'
---

---

## Նվիրատվություն

import useBaseUrl from '@docusaurus/useBaseUrl';

Եթե ձեզ դուր է գալիս "Reply with Attachments"-ը և ցանկանում եք աջակցել դրա զարգացմանը, կարող եք նվիրաբերել այստեղ.

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Նվիրատվություն Stripe-ի միջոցով" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>կամ</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Նվիրատվություն PayPal-ի միջոցով" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>կամ</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Գնել ինձ սուրճ" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Սկանավորեք՝ ինձ սուրճ գնելու համար"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Շնորհակալություն։ Ձեր աջակցությունն օգնում է պահպանել նոր Thunderbird թողարկումների հետ համապատասխանությունը, բարելավել հասանելիությունը և թեստերը, ինչպես նաև փաստաթղթավորումն արդիական պահել։

Նշումներ

- Նվիրատվության հղումները բացվում են միայն սեղմելու դեպքում. հավելումը ֆոնային ցանցային հարցումներ չի կատարում։
- Շարունակական աջակցությունը օգնում է երկարաժամկետ սպասարկմանը և ժամանակին թարմացումներին, սակայն ամբողջովին կամավոր է։

---

Եթե պատկերային կոճակները չեն բեռնվում, խնդրում ենք փոխարենը օգտվել այս հղումներից.

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Նվիրատվությունները կամավոր են. ֆունկցիաների արգելափակում չկա։

---

## Նվիրատվության տեսանելիություն (90‑օրյա հետաձգում)

Հավելումը ներառում է հարմարության հնարավորություն՝ նվիրատվությունից հետո որոշ ժամանակով թաքցնելու նվիրատվության հուշումները։

- Որտեղ գտնել
  - Կարգավորումներ → Աջակցություն բաժին. կտեսնեք “I donated” կոճակը և փոքր հուշման հատված։
  - Ուղարկման հաստատման երկխոսության պատուհանում նույնպես ցուցադրվում է Donate կոճակը. այն ինքնաբերաբար թաքցվում է, երբ հետաձգումն ակտիվ է։

- Ինչպես է աշխատում
  - “I donated” սեղմելը 90 օրով թաքցնում է նվիրատվության կոճակներն ու հարակից հուշումները։
  - Կարգավիճակի հուշումն ցույց է տալիս “Hidden until YYYY‑MM‑DD” (ձեր տեղական ամսաթվով)։ Կա նաև “Show Donate again” կոճակը՝ տեսանելիությունը անմիջապես վերականգնելու համար։
  - 90 օր անց Donate կոճակը կրկին ինքնաբար դառնում է տեսանելի։

- Գաղտնիություն և պահում
  - Հավելումը snooze ժամանակահատվածը հիշելու համար Thunderbird-ի տեղային պահեստում պահում է մեկ ժամանակադիր։ Բանալի՝ `donateHideUntil` (էպոխայից միլիվայրկյաններ)։
  - Այս կարգավորումը տեղային է ձեր Thunderbird-ի պրոֆիլի համար (ամպի հետ չի համաժամացվում)։ Այս հնարավորությունը żad ցանցային հարցում չի կատարում։

- Խափանումների վերացում
  - Եթե “I donated”-ը սեղմելուց հետո Donate-ը դեռ ցուցադրվում է, սպասեք մի պահ կամ կրկին բացեք Կարգավորումներ էջը. միջերեսը թարմացվում է, sobald կարգավորումը պահպանվի։
  - Ձեռքով վերականգնելու համար սեղմեք “Show Donate again”։ Կարող եք նաև սպասել, մինչև հուշման մեջ նշված ամսաթիվը անցնի։

Այս հնարավորությունն ամբողջապես հարմարության համար է. այն երբեք չի արգելափակում հավելման ֆունկցիոնալությունը և որևէ անձնական տվյալ չի հավաքում։

---
