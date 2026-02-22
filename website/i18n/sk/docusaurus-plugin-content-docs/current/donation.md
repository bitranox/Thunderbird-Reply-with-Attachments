---
id: donation
title: 'Prispejte'
sidebar_label: 'Prispejte'
---

---

## Prispejte

import useBaseUrl from '@docusaurus/useBaseUrl';

Ak sa vám páči „Reply with Attachments“ a chcete podporiť jeho vývoj, môžete prispieť tu:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Prispejte cez Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>alebo</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Prispejte cez PayPal" width="320" height="64"
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
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Naskenujte a kúpte mi kávu"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Ďakujeme! Vaša podpora pomáha udržiavať kompatibilitu s novými vydaniami Thunderbirdu, zlepšovať prístupnosť a testy a udržiavať dokumentáciu aktuálnu.

Poznámky

- Odkazy na príspevok sa otvoria iba po kliknutí; doplnok nevykonáva žiadne sieťové požiadavky na pozadí.
- Pravidelná podpora pomáha s dlhodobou údržbou a včasnými aktualizáciami, no je úplne dobrovoľná.

---

Ak sa obrazové tlačidlá nenačítajú, použite namiesto toho tieto odkazy:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Príspevky sú dobrovoľné; funkcie nie sú viazané na príspevok.

---

## Viditeľnosť príspevku (90‑dňové odloženie)

Doplnok obsahuje praktickú funkciu, ktorá na určitý čas skryje výzvy na príspevok po tom, čo prispejete.

- Kde to nájdete
  - Možnosti → sekcia Podpora: uvidíte tlačidlo „Prispel som“ a malú oblasť s nápovedou.
  - Dialóg s potvrdením odoslania tiež zobrazuje tlačidlo „Prispieť“; keď je odloženie aktívne, automaticky sa skryje.

- Ako to funguje
  - Kliknutie na „Prispel som“ skryje darovacie tlačidlá a súvisiace výzvy na 90 dní.
  - Stavová nápoveda zobrazí „Skryté do YYYY‑MM‑DD“ (vo vašom miestnom dátume). Je tu aj tlačidlo „Zobraziť Prispieť znova“ na okamžité obnovenie viditeľnosti.
  - Po 90 dňoch sa tlačidlo „Prispieť“ opäť automaticky zobrazí.

- Súkromie a ukladanie
  - Doplnok ukladá jednu časovú pečiatku do miestneho úložiska Thunderbirdu, aby si zapamätal obdobie odloženia. Kľúč: `donateHideUntil` (milisekundy od epochy).
  - Toto nastavenie je lokálne pre váš profil Thunderbirdu (nesynchronizuje sa cez cloud). Táto funkcia nevykonáva žiadne sieťové požiadavky.

- Riešenie problémov
  - Ak sa tlačidlo Prispieť stále zobrazuje hneď po kliknutí na „Prispel som“, chvíľu počkajte alebo znovu otvorte stránku Možnosti; rozhranie sa aktualizuje hneď po uložení nastavenia.
  - Na manuálne obnovenie kliknite na „Zobraziť Prispieť znova“. Prípadne počkajte, kým neuplynie dátum uvedený v nápovede.

Táto funkcia slúži výlučne pre pohodlie; nikdy neblokuje funkčnosť doplnku a nezhromažďuje žiadne osobné údaje.

---
