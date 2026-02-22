---
id: donation
title: 'Skenk'
sidebar_label: 'Skenk'
---

---

## Skenk

import useBaseUrl from '@docusaurus/useBaseUrl';

As jy van "Reply with Attachments" hou en die ontwikkeling daarvan wil ondersteun, kan jy hier skenk:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Skenk via Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>of</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Skenk via PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>of</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Koop vir my ’n koffie" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Skandeer om vir my ’n koffie te koop"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Dankie! Jou ondersteuning help om verenigbaarheid met nuwe Thunderbird-vrystellings te behou, toeganklikheid en toetse te verbeter, en dokumentasie op datum te hou.

Notas

- Skenk-skakels open net wanneer jy daarop klik; die byvoeging doen geen agtergrond-netwerkversoeke nie.
- Herhalende steun help met langtermyn-onderhoud en tydige opdaterings, maar is heeltemal opsioneel.

---

As die beeldknoppies nie laai nie, gebruik asseblief eerder hierdie skakels:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Koop vir my ’n koffie](https://buymeacoffee.com/bitranox)

---

Skenkings is vrywillig; geen funksies word beperk nie.

---

## Skenkingsigbaarheid (90‑dae‑sluimer)

Die byvoeging sluit ’n geriefsfunksie in om skenking‑aanwysings vir ’n ruk te versteek nadat jy geskenk het.

- Waar om dit te vind
  - Opsies → Ondersteuning‑afdeling: jy sal ’n “Ek het geskenk”‑knoppie en ’n klein wenkgebied sien.
  - Die Stuurbevestiging‑dialoog wys ook ’n Skenk‑knoppie; dit versteek outomaties wanneer die sluimer aktief is.

- Hoe dit werk
  - Deur op “Ek het geskenk” te klik, word skenkingknoppies en verwante aanwysings vir 90 dae versteek.
  - ’n Statuswenk wys “Versteek tot YYYY‑MM‑DD” (in jou plaaslike datum). Daar is ook ’n “Wys Skenk weer”‑knoppie om sigbaarheid onmiddellik te herstel.
  - Na 90 dae word die Skenk‑knoppie weer outomaties sigbaar.

- Privaatheid en berging
  - Die byvoeging stoor ’n enkele tydstempel in Thunderbird se plaaslike berging om die sluimerperiode te onthou. Sleutel: `donateHideUntil` (epog‑millisekondes).
  - Hierdie instelling is plaaslik tot jou Thunderbird‑profiel (nie wolk‑gesinkroniseer nie). Geen netwerkversoeke word deur hierdie funksie gemaak nie.

- Probleemoplossing
  - As Skenk steeds vertoon net nadat jy op “Ek het geskenk” geklik het, wag ’n oomblik of heropen die Opsies‑bladsy; die UI werk by sodra die instelling gestoor is.
  - Om handmatig te herstel, klik “Wys Skenk weer”. Jy kan ook wag totdat die datum wat in die wenk gelys is, verby is.

Hierdie funksie is uitsluitlik vir gerief; dit blokkeer nooit die byvoeging se funksionaliteit nie en versamel geen persoonlike data nie.

---
