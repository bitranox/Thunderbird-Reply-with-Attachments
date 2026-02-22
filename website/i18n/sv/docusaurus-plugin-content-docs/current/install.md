---
id: install
title: 'Installation'
slug: /install
sidebar_label: 'Installation'
---

---

## Installation via "Thunderbird-tillägg och teman" {#installation-in-thunderbird-recommended}

:::important Lägsta Thunderbird-version
Detta tillägg stöder Thunderbird **128 ESR eller nyare**. Äldre versioner stöds inte.
:::

Detta är den rekommenderade installationsmetoden. Tillägg som installeras från ATN (addons.thunderbird.net) får automatiska uppdateringar. LOCAL/dev‑installationer uppdateras inte automatiskt.

- Lägsta Thunderbird-version: 128 ESR eller nyare.

1. I Thunderbird, gå till **Verktyg > Tillägg och teman**.
2. Sök efter "reply with attachments".
3. Lägg till tillägget.

Eller öppna tilläggets sida direkt: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Manuell installation från XPI {#local-installation-in-thunderbird}

### Ladda ner XPI-filen {#download-the-xpi-file}

1. Gå till [Thunderbird Add‑on-sidan](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Ladda ner den senaste versionen av tillägget som en XPI-fil (`reply_with_attachments-x.y.z-tb.xpi`).

### Installera i Thunderbird {#install-in-thunderbird-local}

1. Öppna Thunderbird.
2. Gå till **Verktyg > Tillägg och teman**.
3. I **Tilläggshanteraren**, klicka på kugghjulsikonen uppe till höger.
4. Välj **Installera tillägg från fil…** i menyn.
5. Välj den nedladdade filen `reply_with_attachments-x.y.z-tb.xpi`.
6. Bekräfta installationen när du uppmanas.

---

## Installation för utveckling {#installation-for-development}

### Ladda ner förrådet {#download-the-repository}

1. Ladda ner den senaste versionen av GitHub‑förrådet.
2. Kör `make help` för mer information.

### Installera i Thunderbird {#install-in-thunderbird-dev}

1. Öppna Thunderbird.
2. Gå till **Verktyg > Tillägg och teman**.
3. I **Tilläggshanteraren**, klicka på kugghjulsikonen uppe till höger.
4. Välj **Installera tillägg från fil…** i menyn.
5. Välj den genererade filen `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Bekräfta installationen när du uppmanas.

Obs! Om Thunderbird inte accepterar `.zip` på ditt system, byt namn på den till `.xpi` och försök ”Installera tillägg från fil…” igen.

### Var hittar du LOCAL ZIP {#where-local-zip}

- Paketera först tillägget: kör `make pack` i förrådets rot.
- Efter paketering hittar du ”LOCAL”-zippen i förrådets rot (t.ex. `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Innan du paketerar om för testning, höj versionerna i både `sources/manifest_ATN.json` och `sources/manifest_LOCAL.json`.

---

## Inaktivera, avinstallera och uppdateringar {#disable-uninstall-updates}

- Inaktivera: Thunderbird → Verktyg → Tillägg och teman → hitta tillägget → stäng av.
- Avinstallera: samma vy → meny med tre punkter → Ta bort.
- Uppdateringar: Installationer från ATN uppdateras automatiskt när nya versioner godkänns. LOCAL/dev‑installationer uppdateras inte automatiskt; installera om ett nytt LOCAL‑bygge manuellt.
- Ta bort inställningar helt: se [Integritet → Borttagning av data](privacy#data-removal).

Se även

- [Snabbstart](quickstart)
