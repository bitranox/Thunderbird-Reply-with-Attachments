---
id: privacy
title: 'Personvern'
sidebar_label: 'Personvern'
---

## Privacy

:::note Ingen telemetri; ingen bakgrunnsnettverk
Dette tillegget samler **ikke** inn analyser/telemetri og gjør **ingen** bakgrunnsnettverksforespørsel. All nettverkstilgang skjer kun når du klikker på en ekstern lenke (Dokumenter, GitHub, Doner).
:::

Reply with Attachments samler ikke inn analyser eller telemetri og sender ikke dataene dine noe sted.

Hva tillegget gjør:

- Leser vedlegg metadata og filer fra den opprinnelige meldingen lokalt (Thunderbird API) for å legge dem ved svaret ditt.
- Lagrer alternativene dine (svarteliste, bekreftelse, standard svar) i Thunderbirds lokale lagring.

Hva tillegget **ikke** gjør:

- Ingen sporing, analyser, krasjrapportering eller fjernlogging.
- Ingen bakgrunnsnettverksforespørsel, bortsett fra når du eksplisitt åpner eksterne lenker (Dokumenter, GitHub, Doner).

Tillatelser er dokumentert på [Tillatelser](permissions) siden.

## Content Security Policy (CSP) {#content-security-policy-csp}

Alternativene og popup-sidene unngår inline-skript. All JavaScript lastes fra filer som følger med tillegget for å overholde streng CSP i Thunderbird. Hvis du legger inn kodesnutter i dokumentene, er de kun eksempler og ikke utført av tillegget.

## Data storage {#data-storage}

- Brukerpreferanser (svarteliste, bekreftelsesbryter, standard svar) lagres i Thunderbirds `storage.local` for dette tillegget.
- Ingen sky-synkronisering utføres av tillegget.

## Network {#network}

- Tillegget utfører ingen bakgrunnsnettverksaktiviteter.
- All nettverkstilgang skjer kun når du klikker på lenker (Dokumenter, GitHub, Doner) eller når Thunderbird selv utfører normale operasjoner som ikke er relatert til dette tillegget.

## Data removal {#data-removal}

- Avinstallering av tillegget fjerner koden.
- Innstillinger beholdes bare i Thunderbirds `storage.local` og fjernes ved avinstallering; ingen ekstern lagring benyttes.
- Tilbakestill innstillinger uten å avinstallere:
  - Alternativer siden: bruk “Tilbakestill til standard” for svartelisten og svartelistevarsel.
  - Avansert: i Thunderbird → Verktøy → Utviklerverktøy → Feilsøk Tillegg, åpne utvidelsens lagring og tøm nøkler hvis nødvendig.
