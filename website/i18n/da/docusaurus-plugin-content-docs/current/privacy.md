---
id: privacy
title: 'Privatliv'
sidebar_label: 'Privatliv'
---

## Privatliv

:::note Ingen telemetri; ingen baggrundsnetværk
Dette add-on indsamler **ikke** analyse/telemetri og foretage **ingen** baggrundsnetværksanmodninger. Enhver netværksadgang sker kun, når du klikker på et eksternt link (Docs, GitHub, Donér).
:::

Reply with Attachments indsamler ikke analyse eller telemetri og sender ikke dine data noget sted hen.

Hvad add-on gør:

- Læser vedhæftede metadata og filer fra den oprindelige besked lokalt (Thunderbird API) for at vedhæfte dem til dit svar.
- Gemmer dine indstillinger (blacklist, bekræftelse, standard svar) i Thunderbirds lokale opbevaring.

Hvad add-on ikke gør:

- Ingen tracking, analyse, fejloplysninger eller fjernlogging.
- Ingen baggrundsnetværksanmodninger, undtagen når du eksplicit åbner eksterne links (Docs, GitHub, Donér).

Tilladelser er dokumenteret på [Tilladelser](permissions)-siden.

---

## Indholdssikkerhedspolitik (CSP) {#content-security-policy-csp}

Indstillingerne og popupsiderne undgår inline scripts. Al JavaScript indlæses fra filer, der følger med add-on'en for at overholde strenge CSP i Thunderbird. Hvis du indsætter kodeeksempler i dokumenter, er de kun eksempler og udføres ikke af add-on'en.

---

## Dataplacering {#data-storage}

- Brugerpræferencer (blacklist, bekræftelse, standard svar) opbevares i Thunderbirds `storage.local` for dette add-on.
- Ingen cloud synkronisering udføres af add-on'en.

---

## Netværk {#network}

- Add-on'en udfører ingen baggrundsnetværksaktivitet.
- Enhver netværksadgang sker kun, når du klikker på links (Docs, GitHub, Donér) eller når Thunderbird selv udfører normale operationer, der ikke er relateret til dette add-on.

---

## Datafjernelse {#data-removal}

- Afinstallerer du add-on'en, fjernes dens kode.
- Indstillinger opbevares kun i Thunderbirds `storage.local` og fjernes ved afinstallation; ingen ekstern opbevaring bruges.
- Gendan indstillinger uden at afinstallere:
  - Indstillingssiden: brug “Nulstil til standard” for blacklist og blacklist advarsel.
  - Avanceret: i Thunderbird → Værktøjer → Udviklerværktøjer → Debug Add-ons, åbn udvidelsens opbevaring og rydde nøgler, hvis nødvendigt.

---
