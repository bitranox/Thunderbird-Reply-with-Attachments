---
id: install
title: 'Installatie'
slug: /install
sidebar_label: 'Installatie'
---

---

## Installatie via "Thunderbird Add-ons en thema's" {#installation-in-thunderbird-recommended}

:::important Minimale Thunderbird-versie
Deze add‑on ondersteunt Thunderbird **128 ESR of nieuwer**. Oudere versies worden niet ondersteund.
:::

Dit is de aanbevolen installatiemethode. Add‑ons die vanaf ATN (addons.thunderbird.net) zijn geïnstalleerd, ontvangen automatische updates. LOCAL/dev‑installaties worden niet automatisch bijgewerkt.

- Minimale Thunderbird‑versie: 128 ESR of nieuwer.

1. Ga in Thunderbird naar **Extra > Add-ons en thema's**.
2. Zoek naar "reply with attachments".
3. Voeg de add‑on toe.

Of open de add‑onpagina direct: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Handmatige installatie via XPI {#local-installation-in-thunderbird}

### Download het XPI-bestand {#download-the-xpi-file}

1. Ga naar de [pagina van de Thunderbird‑add‑on](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Download de nieuwste versie van de add‑on als een XPI‑bestand (`reply_with_attachments-x.y.z-tb.xpi`).

### Installeren in Thunderbird {#install-in-thunderbird-local}

1. Open Thunderbird.
2. Ga naar **Extra > Add-ons en thema's**.
3. Klik in de **Add‑onbeheerder** op het tandwielpictogram rechtsboven.
4. Kies **Add‑on installeren vanuit bestand…** in het menu.
5. Selecteer het gedownloade bestand `reply_with_attachments-x.y.z-tb.xpi`.
6. Bevestig de installatie wanneer daarom wordt gevraagd.

---

## Installatie voor ontwikkeling {#installation-for-development}

### De repository downloaden {#download-the-repository}

1. Download de nieuwste versie van de GitHub‑repository.
2. Voer `make help` uit voor meer informatie.

### Installeren in Thunderbird {#install-in-thunderbird-dev}

1. Open Thunderbird.
2. Ga naar **Extra > Add-ons en thema's**.
3. Klik in de **Add‑onbeheerder** op het tandwielpictogram rechtsboven.
4. Kies **Add‑on installeren vanuit bestand…** in het menu.
5. Selecteer het gegenereerde bestand `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Bevestig de installatie wanneer daarom wordt gevraagd.

Opmerking: als Thunderbird de `.zip` op je systeem niet accepteert, hernoem deze dan naar `.xpi` en probeer “Add‑on installeren vanuit bestand…” opnieuw.

### Waar vind je de LOCAL ZIP {#where-local-zip}

- Verpak eerst de add‑on: voer `make pack` uit in de hoofdmap van de repository.
- Na het verpakken vind je de “LOCAL”-zip in de hoofdmap van de repository (bijv. `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Verhoog vóór het opnieuw verpakken voor testen de versies in zowel `sources/manifest_ATN.json` als `sources/manifest_LOCAL.json`.

---

## Uitschakelen, verwijderen en updates {#disable-uninstall-updates}

- Uitschakelen: Thunderbird → Extra → Add‑ons en thema's → zoek de add‑on → schakel uit.
- Verwijderen: dezelfde weergave → menu met drie puntjes → Verwijderen.
- Updates: ATN‑installaties werken automatisch bij zodra nieuwe versies zijn goedgekeurd. LOCAL/dev‑installaties worden niet automatisch bijgewerkt; installeer handmatig een nieuwe LOCAL‑build.
- Instellingen volledig verwijderen: zie [Privacy → Gegevensverwijdering](privacy#data-removal).

Zie ook

- [Snelstart](quickstart)
