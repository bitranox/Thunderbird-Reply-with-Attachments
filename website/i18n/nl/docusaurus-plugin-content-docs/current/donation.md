---
id: donation
title: 'Doneer'
sidebar_label: 'Doneer'
---

---

## Doneer

import useBaseUrl from '@docusaurus/useBaseUrl';

Als je "Reply with Attachments" waardeert en de ontwikkeling wilt steunen, kun je hier doneren:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Doneer via Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>of</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Doneer via PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>of</div>
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
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Scan om me op een koffie te trakteren"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Dank je wel! Je steun helpt compatibiliteit met nieuwe Thunderbird-versies te behouden, de toegankelijkheid en tests te verbeteren en de documentatie up-to-date te houden.

Opmerkingen

- Donatielinks worden alleen geopend wanneer je erop klikt; de add‑on voert geen netwerkverzoeken op de achtergrond uit.
- Terugkerende steun helpt bij langetermijnonderhoud en tijdige updates, maar is volledig optioneel.

---

Als de afbeeldingsknoppen niet laden, gebruik dan in plaats daarvan deze links:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Donaties zijn vrijwillig; er worden geen functies geblokkeerd.

---

## Zichtbaarheid van donaties (90 dagen sluimeren)

De add‑on bevat een handige functie om donatieverzoeken een tijdje te verbergen nadat je hebt gedoneerd.

- Waar je het vindt
  - Opties → sectie Ondersteuning: je ziet een knop “Ik heb gedoneerd” en een klein hintgebied.
  - Het dialoogvenster voor verzendbevestiging toont ook een knop “Doneer”; die wordt automatisch verborgen wanneer de sluimering actief is.

- Hoe het werkt
  - Als je op “Ik heb gedoneerd” klikt, worden donatieknoppen en gerelateerde prompts 90 dagen verborgen.
  - Een statusmelding toont “Verborgen tot YYYY‑MM‑DD” (in je lokale datum). Er is ook een knop “Doneer opnieuw tonen” om de zichtbaarheid onmiddellijk te herstellen.
  - Na 90 dagen wordt de knop “Doneer” automatisch weer zichtbaar.

- Privacy en opslag
  - De add‑on slaat één tijdstempel op in de lokale opslag van Thunderbird om de sluimerperiode te onthouden. Sleutel: `donateHideUntil` (epoch‑milliseconden).
  - Deze instelling is lokaal voor je Thunderbird-profiel (niet cloud‑gesynchroniseerd). Door deze functie worden geen netwerkverzoeken gedaan.

- Probleemoplossing
  - Als “Doneer” direct na het klikken op “Ik heb gedoneerd” toch nog wordt weergegeven, wacht even of open de pagina Opties opnieuw; de UI werkt bij zodra de instelling is opgeslagen.
  - Om handmatig te resetten, klik op “Doneer opnieuw tonen”. Je kunt ook wachten tot de datum die in de hint staat is verstreken.

Deze functie is puur voor het gemak; ze blokkeert nooit de functionaliteit van de add‑on en verzamelt geen persoonlijke gegevens.

---
