---
id: donation
title: 'Doneer'
sidebar_label: 'Doneer'
---

## Doneer

import useBaseUrl from '@docusaurus/useBaseUrl';

Als je "Antwoorden met Bijlagen" leuk vindt en de ontwikkeling wilt ondersteunen, kun je hier doneren:

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
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Koop me een koffie" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Scan om me een koffie te kopen"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Bedankt! Jouw steun helpt bij het behoud van compatibiliteit met nieuwe Thunderbird-releases, het verbeteren van toegankelijkheid en tests, en het up-to-date houden van de documentatie.

Notities

- Donatielinks openen alleen wanneer je erop klikt; de add-on voert geen achtergrond netwerkverzoeken uit.
- Terugkerende steun helpt bij de lange termijn onderhoud en tijdige updates, maar is volledig optioneel.

---

Als de afbeeldingsknoppen niet laden, gebruik dan deze links in plaats daarvan:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Koop me een Koffie](https://buymeacoffee.com/bitranox)

---

Donaties zijn vrijwillig; er is geen functie-afscherming.

---

## Donatiezichtbaarheid (90-dagen uitstel)

De add-on bevat een handige functie om donatie-aanvragen tijdelijk te verbergen nadat je hebt gedoneerd.

- Waar te vinden
  - Opties → Ondersteuningssectie: je ziet een “Ik heb gedoneerd” knop en een klein hintgebied.
  - De Verzend-bevestiging dialoog toont ook een Doneren knop; deze verbergt zichzelf automatisch wanneer het uitstel actief is.

- Hoe het werkt
  - Klikken op “Ik heb gedoneerd” verbergt donatieknoppen en gerelateerde aanvragen voor 90 dagen.
  - Een statushint toont “Verborgen tot YYYY-MM-DD” (in jouw lokale datum). Er is ook een “Toon Doneren opnieuw” knop om de zichtbaarheid onmiddellijk te herstellen.
  - Na 90 dagen wordt de Doneren knop automatisch weer zichtbaar.

- Privacy & opslag
  - De add-on slaat een enkele tijdstempel op in de lokale opslag van Thunderbird om de uitstelperiode te onthouden. Sleutel: `donateHideUntil` (epoch milliseconden).
  - Deze instelling is lokaal voor jouw Thunderbird-profiel (niet cloud-gesynchroniseerd). Er worden geen netwerkverzoeken gedaan door deze functie.

- Probleemoplossing
  - Als Doneren nog steeds verschijnt direct na het klikken op “Ik heb gedoneerd”, wacht een moment of heropen de pagina Opties; de UI werkt bij zodra de instelling is opgeslagen.
  - Om handmatig te resetten, klik op “Toon Doneren opnieuw”. Je kunt ook wachten tot de datum die in de hint staat verstrijkt.

Deze functie is puur voor gemak; het blokkeert nooit de functionaliteit van de add-on en verzamelt geen persoonlijke gegevens.

---
