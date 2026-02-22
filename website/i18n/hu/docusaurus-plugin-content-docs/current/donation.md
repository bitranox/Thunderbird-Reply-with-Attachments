---
id: donation
title: 'Adományozás'
sidebar_label: 'Adományozás'
---

---

## Adományozás

import useBaseUrl from '@docusaurus/useBaseUrl';

Ha tetszik a "Reply with Attachments", és szeretnéd támogatni a fejlesztését, itt adományozhatsz:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Adományozás Stripe-on keresztül" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>vagy</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Adományozás PayPalon keresztül" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>vagy</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Vegyél nekem egy kávét" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Szkenneld be: vegyél nekem egy kávét"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Köszönjük! Támogatásod segít fenntartani az új Thunderbird-kiadásokkal való kompatibilitást, javítani az akadálymentesítést és a teszteket, valamint naprakészen tartani a dokumentációt.

Megjegyzések

- Az adományozási hivatkozások csak akkor nyílnak meg, amikor rájuk kattintasz; a kiegészítő nem végez háttérben hálózati kéréseket.
- Az ismétlődő támogatás segíti a hosszú távú karbantartást és az időszerű frissítéseket, de teljesen opcionális.

---

Ha a képes gombok nem töltődnek be, kérlek, használd helyettük ezeket a hivatkozásokat:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Az adományozás önkéntes; nincs funkciókorlátozás.

---

## Adományozási értesítések láthatósága (90 napos szüneteltetés)

A kiegészítő tartalmaz egy kényelmi funkciót, amely az adományozás után egy időre elrejti az adománykéréseket.

- Hol találod meg
  - Beállítások → Támogatás szakasz: látsz egy „Adományoztam” gombot és egy kis súgóterületet.
  - A „Küldés megerősítése” párbeszédablak is mutat egy Adományozás gombot; ez automatikusan elrejtődik, amikor a szüneteltetés aktív.

- Hogyan működik
  - Az „Adományoztam” gombra kattintva 90 napra elrejti az adománygombokat és a kapcsolódó felszólításokat.
  - Egy állapotjelzés ezt mutatja: „Eddig elrejtve: YYYY‑MM‑DD” (a helyi dátumoddal). Van egy „Adományozás ismét megjelenítése” gomb is a láthatóság azonnali visszaállításához.
  - 90 nap után az Adományozás gomb automatikusan ismét láthatóvá válik.

- Adatvédelem és tárolás
  - A kiegészítő egyetlen időbélyeget tárol a Thunderbird helyi tárolójában, hogy megjegyezze a szüneteltetés időtartamát. Kulcs: `donateHideUntil` (epoch milliszekundum).
  - Ez a beállítás a Thunderbird-profilodra helyi (nem kerül felhőben szinkronizálásra). Ez a funkció nem hajt végre hálózati kéréseket.

- Hibaelhárítás
  - Ha az Adományozás gomb még mindig látszik közvetlenül az „Adományoztam” gombra kattintás után, várj egy pillanatot, vagy nyisd meg újra a Beállítások oldalt; a felület frissül, amint a beállítás mentésre kerül.
  - Kézi visszaállításhoz kattints az „Adományozás ismét megjelenítése” gombra. Meg is várhatod, amíg a jelzésben feltüntetett dátum elérkezik.

Ez a funkció kizárólag kényelmi célú; soha nem blokkolja a kiegészítő működését, és nem gyűjt semmilyen személyes adatot.

---
