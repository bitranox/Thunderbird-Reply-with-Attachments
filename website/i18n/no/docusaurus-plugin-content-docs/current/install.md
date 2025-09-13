---
id: install
title: 'Installasjon'
slug: /install
sidebar_label: 'Installasjon'
---

## Installasjon via "Thunderbird Tillegg og Temaer" {#installation-in-thunderbird-recommended}

:::important Minimum Thunderbird Versjon
Dette tillegget støtter Thunderbird **128 ESR eller nyere**. Eldre versjoner støttes ikke.
:::

Dette er den anbefalte installasjonsmetoden. Tillegg installert fra ATN (addons.thunderbird.net) mottar automatiske oppdateringer. LOCAL/dev-installasjoner oppdateres ikke automatisk.

- Minimum Thunderbird versjon: 128 ESR eller nyere.

1. I Thunderbird, gå til **Verktøy > Tillegg og Temaer**.
2. Søk etter "svar med vedlegg".
3. Legg til tillegget.

Eller åpne tilleggsiden direkte: [Thunderbird Tillegg (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Manuell installasjon fra XPI {#local-installation-in-thunderbird}

### Last ned XPI-filen {#download-the-xpi-file}

1. Gå til [Thunderbird Tillegg siden](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Last ned den nyeste versjonen av tillegget som en XPI-fil (`reply_with_attachments-x.y.z-tb.xpi`).

### Installer i Thunderbird {#install-in-thunderbird-local}

1. Åpne Thunderbird.
2. Gå til **Verktøy > Tillegg og Temaer**.
3. I **Tillegg Behandleren**, klikk på tannhjulikonet øverst til høyre.
4. Velg **Installer tillegg fra fil...** fra menyen.
5. Velg den nedlastede `reply_with_attachments-x.y.z-tb.xpi` filen.
6. Bekreft installasjonen når du blir bedt om det.

---

## Installasjon for utvikling {#installation-for-development}

### Last ned depotet {#download-the-repository}

1. Last ned den nyeste versjonen av GitHub-repot.
2. Kjør `make help` for mer informasjon.

### Installer i Thunderbird {#install-in-thunderbird-dev}

1. Åpne Thunderbird.
2. Gå til **Verktøy > Tillegg og Temaer**.
3. I **Tillegg Behandleren**, klikk på tannhjulikonet øverst til høyre.
4. Velg **Installer tillegg fra fil...** fra menyen.
5. Velg den genererte filen `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Bekreft installasjonen når du blir bedt om det.

Merk: Hvis Thunderbird ikke aksepterer `.zip` på ditt system, gi det et nytt navn til `.xpi` og prøv “Installer tillegg fra fil...” igjen.

### Hvor finne LOCAL ZIP {#where-local-zip}

- Først, pakk tillegget: kjør `make pack` i rotmappen til depotet.
- Etter pakking, finn “LOCAL” zip i rotmappen til depotet (f.eks., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Før repakking for testing, oppdater versjoner i både `sources/manifest_ATN.json` og `sources/manifest_LOCAL.json`.

---

## Deaktiver, Avinstaller og Oppdateringer {#disable-uninstall-updates}

- Deaktiver: Thunderbird → Verktøy → Tillegg og Temaer → finn tillegget → slå av.
- Avinstaller: samme visning → tre-prikk meny → Fjern.
- Oppdateringer: ATN-installasjoner oppdateres automatisk når nye versjoner er godkjent. LOCAL/dev-installasjoner oppdateres ikke automatisk; installer en ny LOCAL-bygg manuelt.
- Fjern innstillinger helt: se [Personvern → Datfjerning](privacy#data-removal).

Se også

- [Rask start](quickstart)
