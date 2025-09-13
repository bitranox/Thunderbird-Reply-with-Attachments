---
id: donation
title: 'Darujte'
sidebar_label: 'Darujte'
---

## Darujte

import useBaseUrl from '@docusaurus/useBaseUrl';

Ak sa vám páči "Odpovedať s prílohami" a chcete podporiť jeho vývoj, môžete darovať tu:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Darujte cez Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>alebo</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Darujte cez PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>alebo</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Kúpte mi kávu" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Naskenujte, aby ste mi kúpili kávu"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Ďakujeme! Vaša podpora pomáha udržiavať kompatibilitu s novými vydaniami Thunderbirdu, zlepšovať prístupnosť a testy, a udržiavať dokumentáciu aktuálnu.

Poznámky

- Odkazy na darovanie sa otvárajú iba v prípade, že na ne kliknete; doplnok nevykonáva žiadne pozadia sieťové požiadavky.
- Opakujúca sa podpora pomáha dlhodobej údržbe a včasným aktualizáciám, ale je úplne voliteľná.

---

Ak sa tlačidlá s obrázkami nenačítajú, použite namiesto toho tieto odkazy:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Kúpte mi kávu](https://buymeacoffee.com/bitranox)

---

Dary sú dobrovoľné; žiadne funkcie nie sú zablokované.

---

## Viditeľnosť darovania (90-dňové pozastavenie)

Doplnok obsahuje funkciu pohodlia, ktorá skrýva výzvy na darovanie na určitý čas po tom, čo ste darovali.

- Kde ju nájsť
  - Možnosti → Podporiť sekcia: uvidíte tlačidlo “Daroval/a som” a malú náhľadovú oblasť.
  - Dialógové okno Potvrdiť odoslanie tiež zobrazuje tlačidlo Darovať; automaticky sa skrýva, keď je pozastavenie aktívne.

- Ako to funguje
  - Kliknutím na “Daroval/a som” sa skrývajú tlačidlá a súvisiace výzvy na darovanie na 90 dní.
  - Indikátor stavu zobrazuje “Skryté do YYYY-MM-DD” (vo vašom miestnom dátume). K dispozícii je aj tlačidlo “Znova zobraziť Darovať”, aby ste okamžite obnovili viditeľnosť.
  - Po 90 dňoch sa tlačidlo Darovať automaticky znovu zobrazuje.

- Ochrana osobných údajov a úložisko
  - Doplnok ukladá jediný časový údaj do miestneho úložiska Thunderbirdu, aby si zapamätal obdobie pozastavenia. Kľúč: `donateHideUntil` (epoch milliseconds).
  - Toto nastavenie je lokálne pre váš profil Thunderbirdu (nie je synchronizované v cloude). Tento funkcia nevykonáva žiadne sieťové požiadavky.

- Riešenie problémov
  - Ak sa tlačidlo Darovať stále zobrazuje hneď po kliknutí na “Daroval/a som”, počkajte chvíľu alebo znovu otvorte stránku Možnosti; používateľské rozhranie sa aktualizuje hneď, ako sa nastavenie uloží.
  - Ak chcete resetovať manuálne, kliknite na “Znova zobraziť Darovať”. Môžete tiež počkať, kým uplynie dátum uvedený v naznačení.

Táto funkcia je čisto pre pohodlie; nikdy neblokuje funkčnosť doplnku a nezbiera žiadne osobné údaje.
