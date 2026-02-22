---
id: donation
title: 'Doner'
sidebar_label: 'Doner'
---

---

## Doner

import useBaseUrl from '@docusaurus/useBaseUrl';

Hvis du liker "Reply with Attachments" og vil støtte utviklingen, kan du donere her:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Doner via Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>eller</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Doner via PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>eller</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Kjøp en kaffe til meg" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Skann for å kjøpe en kaffe til meg"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Takk! Din støtte bidrar til å opprettholde kompatibilitet med nye Thunderbird-versjoner, forbedre tilgjengelighet og tester, og holde dokumentasjonen oppdatert.

Merknader

- Donasjonslenker åpnes bare når du klikker dem; utvidelsen utfører ingen nettverksforespørsler i bakgrunnen.
- Gjentakende støtte hjelper med langsiktig vedlikehold og tidsriktige oppdateringer, men er helt valgfritt.

---

Hvis bildeknappene ikke lastes inn, bruk disse lenkene i stedet:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Donasjoner er frivillige; det er ingen funksjonslåsing.

---

## Donasjonsynlighet (90 dagers utsettelse)

Utvidelsen inneholder en praktisk funksjon for å skjule donasjonsoppfordringer en stund etter at du har donert.

- Hvor du finner den
  - Alternativer → Støtte-delen: du vil se en “Jeg har donert”-knapp og et lite hintområde.
  - Dialogen for sendebekreftelse viser også en Doner-knapp; den skjules automatisk når utsettelsen er aktiv.

- Slik fungerer det
  - Når du klikker “Jeg har donert”, skjules donasjonsknapper og relaterte oppfordringer i 90 dager.
  - Et statushint viser “Skjult til YYYY‑MM‑DD” (i din lokale dato). Det finnes også en “Vis Doner på nytt”-knapp for å gjenopprette synligheten umiddelbart.
  - Etter 90 dager blir Doner-knappen synlig igjen automatisk.

- Personvern og lagring
  - Utvidelsen lagrer ett enkelt tidsstempel i Thunderbirds lokale lagring for å huske utsettelsesperioden. Nøkkel: `donateHideUntil` (epoch millisekunder).
  - Denne innstillingen er lokal for Thunderbird-profilen din (ikke sky-synkronisert). Denne funksjonen gjør ingen nettverksforespørsler.

- Feilsøking
  - Hvis Doner fortsatt vises rett etter at du har klikket “Jeg har donert”, vent et øyeblikk eller åpne Alternativer-siden på nytt; brukergrensesnittet oppdateres så snart innstillingen er lagret.
  - For å tilbakestille manuelt, klikk “Vis Doner på nytt”. Du kan også vente til datoen som står i hintet, er passert.

Denne funksjonen er kun for bekvemmelighet; den blokkerer aldri utvidelsens funksjonalitet og samler ikke inn personopplysninger.

---
