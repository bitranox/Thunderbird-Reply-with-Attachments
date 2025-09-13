---
id: donation
title: 'Donera'
sidebar_label: 'Donera'
---

## Donera

import useBaseUrl from '@docusaurus/useBaseUrl';

Om du gillar "Reply with Attachments" och vill stödja dess utveckling, kan du donera här:

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
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Köp mig en kaffe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Skanna för att köpa mig en kaffe"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Tack! Ditt stöd hjälper till att bibehålla kompatibilitet med nya Thunderbird-versioner, förbättra tillgänglighet och tester, samt hålla dokumentationen uppdaterad.

Noteringar

- Donera-länkar öppnas endast när du klickar på dem; tillägget gör inga bakgrundsnätverksanrop.
- Återkommande stöd hjälper långsiktig underhåll och punktliga uppdateringar, men är helt valfritt.

---

Om bildknapparna inte laddas, vänligen använd dessa länkar istället:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Köp mig en Kaffe](https://buymeacoffee.com/bitranox)

---

Donationer är frivilliga; det finns ingen funktionslåsning.

---

## Synlighet för donationer (90-dagars paus)

Tillägget inkluderar en bekvämlighetsfunktion för att dölja donationsuppmaningar under en tid efter att du har donerat.

- Var du hittar den
  - Alternativ → Stödsektion: du kommer att se en "Jag donerade" knapp och ett litet hintområde.
  - Dialogrutan för att bekräfta skick visar också en Donera-knapp; den döljs automatiskt när pausen är aktiv.

- Hur det fungerar
  - Genom att klicka på "Jag donerade" döljs donationsknappar och relaterade uppmaningar i 90 dagar.
  - En statushint visar "Dold tills YYYY-MM-DD" (i ditt lokala datum). Det finns också en "Visa Donera igen" knapp för att återställa synligheten omedelbart.
  - Efter 90 dagar blir Donera-knappen automatiskt synlig igen.

- Integritet & lagring
  - Tillägget lagrar en enda tidsstämpel i Thunderbirds lokala lagring för att komma ihåg pausperioden. Nyckel: `donateHideUntil` (epoch millisekunder).
  - Denna inställning är lokal för din Thunderbird-profil (inte moln-synkroniserad). Inga nätverksanrop görs av denna funktion.

- Felsökning
  - Om Donera fortfarande visas direkt efter att ha klickat på "Jag donerade", vänta en stund eller återöppna Alternativsidan; gränssnittet uppdateras så snart inställningen är sparad.
  - För att återställa manuellt, klicka på "Visa Donera igen". Du kan också vänta tills det datum som anges i hintet passerar.

Denna funktion är enbart för bekvämlighet; den blockerar aldrig tilläggsfunktionalitet och samlar inte in några personuppgifter.

---
