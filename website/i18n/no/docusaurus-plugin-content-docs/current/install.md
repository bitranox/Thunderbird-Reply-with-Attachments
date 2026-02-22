---
id: install
title: 'Installasjon'
slug: /install
sidebar_label: 'Installasjon'
---

---

## Installasjon via "Thunderbird-tillegg og temaer" {#installation-in-thunderbird-recommended}

:::important Minimum Thunderbird-versjon
Dette tillegget støtter Thunderbird 128 ESR eller nyere. Eldre versjoner støttes ikke.
:::

Dette er den anbefalte installasjonsmetoden. Tillegg installert fra ATN (addons.thunderbird.net) mottar automatiske oppdateringer. LOCAL/dev-installasjoner oppdateres ikke automatisk.

- Minimum Thunderbird-versjon: 128 ESR eller nyere.

1. I Thunderbird går du til **Verktøy > Tillegg og temaer**.
2. Søk etter "reply with attachments".
3. Legg til tillegget.

Eller åpne tilleggssiden direkte: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Manuell installasjon fra XPI {#local-installation-in-thunderbird}

### Last ned XPI-filen {#download-the-xpi-file}

1. Gå til [Thunderbird Add‑on page](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Last ned den nyeste versjonen av tillegget som en XPI-fil (`reply_with_attachments-x.y.z-tb.xpi`).

### Installer i Thunderbird {#install-in-thunderbird-local}

1. Åpne Thunderbird.
2. Gå til **Verktøy > Tillegg og temaer**.
3. I **Tilleggsbehandleren** klikker du på tannhjulikonet øverst til høyre.
4. Velg **Installer tillegg fra fil …** fra menyen.
5. Velg den nedlastede `reply_with_attachments-x.y.z-tb.xpi`-filen.
6. Bekreft installasjonen når du blir bedt om det.

---

## Installasjon for utvikling {#installation-for-development}

### Last ned repositoriet {#download-the-repository}

1. Last ned den nyeste versjonen av GitHub-repositoriet.
2. Kjør `make help` for mer informasjon.

### Installer i Thunderbird {#install-in-thunderbird-dev}

1. Åpne Thunderbird.
2. Gå til **Verktøy > Tillegg og temaer**.
3. I **Tilleggsbehandleren** klikker du på tannhjulikonet øverst til høyre.
4. Velg **Installer tillegg fra fil …** fra menyen.
5. Velg den genererte filen `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Bekreft installasjonen når du blir bedt om det.

Merk: Hvis Thunderbird ikke godtar `.zip` på systemet ditt, gi den nytt navn til `.xpi` og prøv "Installer tillegg fra fil …" på nytt.

### Hvor finner du LOCAL ZIP {#where-local-zip}

- Pakk først tillegget: kjør `make pack` i repositoriets rot.
- Etter pakking finner du "LOCAL"-zip i repositoriets rot (f.eks. `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Før du pakker på nytt for testing, øk versjonene i både `sources/manifest_ATN.json` og `sources/manifest_LOCAL.json`.

---

## Deaktivere, avinstallere og oppdatere {#disable-uninstall-updates}

- Deaktiver: Thunderbird → Verktøy → Tillegg og temaer → finn tillegget → slå av.
- Avinstaller: samme visning → menyen med tre prikker → Fjern.
- Oppdateringer: ATN-installasjoner får automatisk oppdatering når nye versjoner er godkjent. LOCAL/dev-installasjoner oppdateres ikke automatisk; installer en ny LOCAL-build manuelt.
- Fjern innstillinger fullstendig: se [Personvern → Fjerning av data](privacy#data-removal).

Se også

- [Hurtigstart](quickstart)
