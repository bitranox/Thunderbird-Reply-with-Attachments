---
id: donation
title: 'Adományozás'
sidebar_label: 'Adományozás'
---

## Adományozás

import useBaseUrl from '@docusaurus/useBaseUrl';

Ha tetszik a "Válasz mellékletekkel" és támogatni szeretné a fejlesztését, itt adományozhat:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Adományozás Stripe-on keresztül" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>vagy</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Adományozás PayPal-on keresztül" width="320" height="64"
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
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Olvasd be, hogy vegyél nekem egy kávét"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Köszönjük! A támogatása segít fenntartani a kompatibilitást az új Thunderbird kiadásokkal, javítani az akadálymentességet és a teszteket, valamint naprakészen tartani a dokumentációt.

Megjegyzések

- Az adományozási linkek csak akkor nyílnak meg, ha megnyomja őket; a bővítmény nem végez háttérhálózati kéréseket.
- A rendszeres támogatás segíti a hosszú távú karbantartást és a időben történő frissítéseket, de teljesen opcionális.

---

Ha a képgombok nem töltenek be, kérjük használja ezeket a linkeket:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Vegyél nekem egy kávét](https://buymeacoffee.com/bitranox)

---

Az adományok önkéntesek; nincs funkciózár.

---

## Adományozás láthatóság (90 napos szünet)

A bővítmény tartalmaz egy kényelmi funkciót, amely lehetővé teszi az adományozási kérések elrejtését egy ideig, miután adományoztál.

- Hol található
  - Beállítások → Támogatás szekció: meglátja az "Adományoztam" gombot és egy kis tipp területet.
  - A Küldés megerősítése párbeszédablakban is megjelenik egy Adományozás gomb; automatikusan elrejtődik, amikor a szünet aktiválva van.

- Hogyan működik
  - Az "Adományoztam" gombra kattintva elrejti az adományozási gombokat és a kapcsolódó kéréseket 90 napig.
  - Egy állapotjelzés látható "Elrejtve eddig: YYYY‑MM‑DD" (a helyi dátumod szerint). Van egy "Mutasd meg újra az Adományozást" gomb is, amellyel azonnal visszaállíthatja a láthatóságot.
  - 90 nap elteltével az Adományozás gomb automatikusan újra láthatóvá válik.

- Adatvédelem és tárolás
  - A bővítmény egyetlen időbélyeget tárol a Thunderbird helyi tárolójában a szünet időtartamának megjegyzésére. Kulcs: `donateHideUntil` (epok milliszekundumban).
  - Ez a beállítás a Thunderbird profilhoz helyi (nem felhőben szinkronizált). Ehhez a funkcióhoz nem végeznek hálózati kéréseket.

- Hibaelhárítás
  - Ha az Adományozás gomb még mindig látható, közvetlenül az "Adományoztam" megnyomása után, várjon egy pillanatot, vagy nyissa meg újra a Beállítások oldalt; a felhasználói felület frissül, amint a beállítás elmentésre kerül.
  - A manuális visszaállításhoz kattintson a "Mutasd meg újra az Adományozást" gombra. Várhat is, amíg a tippben megjelölt dátum eltelik.

Ez a funkció tisztán a kényelemért van; soha nem akadályozza meg a bővítmény funkcionalitását, és nem gyűjt semmilyen személyes adatot.

---
