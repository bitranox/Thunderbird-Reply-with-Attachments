---
id: donation
title: 'Donér'
sidebar_label: 'Donér'
---

---

## Donér

import useBaseUrl from '@docusaurus/useBaseUrl';

Hvis du kan lide "Reply with Attachments" og vil støtte udviklingen, kan du donere her:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Donér via Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>eller</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Donér via PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>eller</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Køb en kaffe til mig" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Scan for at købe en kaffe til mig"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Tak! Din støtte hjælper med at opretholde kompatibilitet med nye Thunderbird-udgivelser, forbedre tilgængeligheden og testene samt holde dokumentationen ajour.

Bemærkninger

- Doneringslinks åbnes kun, når du klikker på dem; udvidelsen foretager ingen netværksforespørgsler i baggrunden.
- Tilbagevendende støtte hjælper med langsigtet vedligeholdelse og rettidige opdateringer, men er helt valgfrit.

---

Hvis billedknapperne ikke indlæses, brug venligst disse links i stedet:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Donationer er frivillige; der er ingen funktionsbegrænsning.

---

## Donationssynlighed (90 dages udsættelse)

Udvidelsen indeholder en praktisk funktion til at skjule donationshenvisninger i et stykke tid, efter at du har doneret.

- Hvor findes den
  - Indstillinger → Afsnittet Support: Du ser en “Jeg har doneret”-knap og et lille statusfelt.
  - Dialogen til sendebekræftelse viser også en Donér-knap; den skjules automatisk, når udsættelsen er aktiv.

- Sådan fungerer det
  - Når du klikker på “Jeg har doneret”, skjules donér-knapper og relaterede meddelelser i 90 dage.
  - En statusnote viser “Skjult indtil YYYY‑MM‑DD” (i dit lokale datoformat). Der er også en “Vis Donér igen”-knap til straks at gøre den synlig igen.
  - Efter 90 dage bliver Donér-knappen automatisk synlig igen.

- Privatliv og lagring
  - Udvidelsen gemmer ét tidsstempel i Thunderbirds lokale lagring for at huske udsættelsesperioden. Nøgle: `donateHideUntil` (epoch-millisekunder).
  - Denne indstilling er lokal for din Thunderbird-profil (ikke synkroniseret i skyen). Denne funktion foretager ingen netværksforespørgsler.

- Fejlfinding
  - Hvis Donér stadig vises lige efter, at du har klikket på “Jeg har doneret”, så vent et øjeblik eller genåbn siden Indstillinger; brugerfladen opdateres, så snart indstillingen er gemt.
  - For at nulstille manuelt skal du klikke på “Vis Donér igen”. Du kan også vente, til datoen angivet i noten er passeret.

Denne funktion er udelukkende for bekvemmelighed; den blokerer aldrig for udvidelsens funktionalitet og indsamler ingen personoplysninger.

---
