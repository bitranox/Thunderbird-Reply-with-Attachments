---
id: install
title: 'Installation'
slug: /install
sidebar_label: 'Installation'
---

---

## Installation via "Thunderbird Tilføjelser og temaer" {#installation-in-thunderbird-recommended}

:::important Mindste Thunderbird-version
Denne tilføjelse understøtter Thunderbird **128 ESR eller nyere**. Ældre versioner understøttes ikke.
:::

Dette er den anbefalede installationsmetode. Tilføjelser installeret fra ATN (addons.thunderbird.net) modtager automatiske opdateringer. Lokale/dev-installationer opdateres ikke automatisk.

- Mindste Thunderbird-version: 128 ESR eller nyere.

1. I Thunderbird skal du gå til **Værktøjer > Tilføjelser og temaer**.
2. Søg efter "reply with attachments".
3. Tilføj tilføjelsen.

Eller åbn tilføjelsessiden direkte: [Thunderbird-tilføjelser (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Manuel installation fra XPI {#local-installation-in-thunderbird}

### Download XPI-filen {#download-the-xpi-file}

1. Gå til [Thunderbird-tilføjelsessiden](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Download den seneste version af tilføjelsen som en XPI-fil (`reply_with_attachments-x.y.z-tb.xpi`).

### Installer i Thunderbird {#install-in-thunderbird-local}

1. Åbn Thunderbird.
2. Gå til **Værktøjer > Tilføjelser og temaer**.
3. I **Tilføjelsesadministratoren** skal du klikke på tandhjulsikonet øverst til højre.
4. Vælg **Installer tilføjelse fra fil…** i menuen.
5. Vælg den downloadede fil `reply_with_attachments-x.y.z-tb.xpi`.
6. Bekræft installationen, når du bliver bedt om det.

---

## Installation til udvikling {#installation-for-development}

### Download repositoryet {#download-the-repository}

1. Download den seneste version af GitHub-repositoryet.
2. Kør `make help` for flere oplysninger.

### Installer i Thunderbird {#install-in-thunderbird-dev}

1. Åbn Thunderbird.
2. Gå til **Værktøjer > Tilføjelser og temaer**.
3. I **Tilføjelsesadministratoren** skal du klikke på tandhjulsikonet øverst til højre.
4. Vælg **Installer tilføjelse fra fil…** i menuen.
5. Vælg den genererede fil `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Bekræft installationen, når du bliver bedt om det.

Bemærk: Hvis Thunderbird ikke accepterer `.zip` på dit system, så omdøb den til `.xpi` og prøv “Installer tilføjelse fra fil…” igen.

### Hvor finder du LOCAL-ZIP'en {#where-local-zip}

- Pak først tilføjelsen: kør `make pack` i roden af repositoryet.
- Efter pakning finder du “LOCAL”-zippen i roden af repositoryet (f.eks. `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Før du pakker igen til test, skal du hæve versionerne i både `sources/manifest_ATN.json` og `sources/manifest_LOCAL.json`.

---

## Deaktiver, afinstaller og opdateringer {#disable-uninstall-updates}

- Deaktiver: Thunderbird → Værktøjer → Tilføjelser og temaer → find tilføjelsen → slå fra.
- Afinstaller: samme visning → trepunktsmenuen → Fjern.
- Opdateringer: ATN-installationer opdateres automatisk, når nye versioner er godkendt. LOCAL/dev-installationer opdateres ikke automatisk; geninstaller en ny LOCAL-build manuelt.
- Fjern indstillinger helt: se [Privatliv → Datafjernelse](privacy#data-removal).

Se også

- [Hurtig start](quickstart)
