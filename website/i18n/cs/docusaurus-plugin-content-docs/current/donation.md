---
id: donation
title: 'Přispět'
sidebar_label: 'Přispět'
---

---

## Přispět

import useBaseUrl from '@docusaurus/useBaseUrl';

Pokud se vám líbí "Reply with Attachments" a chcete podpořit jeho vývoj, můžete přispět zde:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Přispět přes Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>nebo</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Přispět přes PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>nebo</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Kupte mi kávu" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Naskenujte a kupte mi kávu"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Děkujeme! Vaše podpora pomáhá udržovat kompatibilitu s novými vydáními Thunderbirdu, zlepšovat přístupnost a testy a udržovat dokumentaci aktuální.

Poznámky

- Odkazy na darování se otevřou pouze po kliknutí; doplněk neprovádí žádné síťové požadavky na pozadí.
- Pravidelná podpora pomáhá s dlouhodobou údržbou a včasnými aktualizacemi, ale je zcela dobrovolná.

---

Pokud se obrazová tlačítka nenačtou, použijte prosím místo nich tyto odkazy:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Příspěvky jsou dobrovolné; žádné funkce nejsou uzamčené.

---

## Viditelnost darování (90denní odložení)

Doplněk obsahuje praktickou funkci, která po darování na nějakou dobu skryje výzvy k darování.

- Kde to najdete
  - Options → sekce Support: uvidíte tlačítko “I donated” a malou oblast s nápovědou.
  - Dialog potvrzení odeslání také zobrazuje tlačítko Donate; automaticky se skryje, když je odložení aktivní.

- Jak to funguje
  - Kliknutím na “I donated” skryjete na 90 dní tlačítka pro darování a související výzvy.
  - Stavová nápověda ukazuje “Hidden until YYYY‑MM‑DD” (ve vašem místním datu). Je zde také tlačítko “Show Donate again” pro okamžité obnovení viditelnosti.
  - Po 90 dnech se tlačítko Donate znovu automaticky zobrazí.

- Soukromí a úložiště
  - Doplněk ukládá jediné časové razítko do místního úložiště Thunderbirdu, aby si pamatoval dobu odložení. Klíč: `donateHideUntil` (milisekundy od epochy).
  - Toto nastavení je místní pro váš profil Thunderbirdu (nesynchronizuje se do cloudu). Tato funkce neprovádí žádné síťové požadavky.

- Řešení potíží
  - Pokud se Donate zobrazuje i hned po kliknutí na “I donated”, chvíli počkejte nebo znovu otevřete stránku Možnosti; rozhraní se aktualizuje, jakmile se nastavení uloží.
  - Chcete-li to resetovat ručně, klikněte na “Show Donate again”. Můžete také počkat, až uplyne datum uvedené v nápovědě.

Tato funkce slouží pouze pro vaše pohodlí; nikdy neblokuje funkce doplňku a neshromažďuje žádné osobní údaje.

---
