---
id: donation
title: 'Donera'
sidebar_label: 'Donera'
---

---

## Donera

import useBaseUrl from '@docusaurus/useBaseUrl';

Om du gillar "Reply with Attachments" och vill stödja dess utveckling kan du donera här:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Donera via Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>eller</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Donera via PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>eller</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Buy Me a Coffee" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Skanna för att bjuda mig på en kaffe"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Tack! Ditt stöd hjälper till att behålla kompatibiliteten med nya Thunderbird‑versioner, förbättra tillgänglighet och tester samt hålla dokumentationen uppdaterad.

Obs

- Donationslänkar öppnas bara när du klickar på dem; tillägget gör inga nätverksförfrågningar i bakgrunden.
- Återkommande stöd hjälper långsiktigt underhåll och snabba uppdateringar, men är helt frivilligt.

---

Om bildknapparna inte laddas, använd dessa länkar i stället:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Donationer är frivilliga; det finns ingen funktionslåsning.

---

## Donationssynlighet (90‑dagars paus)

Tillägget innehåller en bekvämlighetsfunktion för att dölja donationsuppmaningar en tid efter att du har donerat.

- Var du hittar det
  - Alternativ → avsnittet Support: du ser en knapp "Jag har donerat" och ett litet tipsområde.
  - Dialogrutan för sändningsbekräftelse visar också en Donera‑knapp; den döljs automatiskt när pausen är aktiv.

- Så här fungerar det
  - Att klicka på "Jag har donerat" döljer donationsknappar och relaterade uppmaningar i 90 dagar.
  - En statusindikering visar "Dold till YYYY‑MM‑DD" (i ditt lokala datum). Det finns också en knapp "Visa Donera igen" för att återställa synligheten omedelbart.
  - Efter 90 dagar blir Donera‑knappen automatiskt synlig igen.

- Integritet och lagring
  - Tillägget lagrar en enda tidsstämpel i Thunderbirds lokala lagring för att komma ihåg pausperioden. Nyckel: `donateHideUntil` (epok‑millisekunder).
  - Denna inställning är lokal för din Thunderbird‑profil (inte molnsynkad). Ingen nätverksförfrågan görs av denna funktion.

- Felsökning
  - Om Donera fortfarande visas direkt efter att du klickat på "Jag har donerat", vänta en stund eller öppna sidan Alternativ igen; gränssnittet uppdateras så snart inställningen har sparats.
  - För att återställa manuellt, klicka på "Visa Donera igen". Du kan också vänta tills datumet som anges i tipset har passerat.

Denna funktion är enbart för bekvämlighet; den blockerar aldrig tilläggets funktioner och samlar inte in några personuppgifter.

---
