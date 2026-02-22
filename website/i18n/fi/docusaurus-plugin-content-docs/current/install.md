---
id: install
title: 'Asennus'
slug: /install
sidebar_label: 'Asennus'
---

---

## Asennus kohdasta "Thunderbirdin lisäosat ja teemat" {#installation-in-thunderbird-recommended}

:::important Thunderbirdin vähimmäisversio
Tämä lisäosa tukee Thunderbirdin versiota **128 ESR tai uudempaa**. Vanhempia versioita ei tueta.
:::

Tämä on suositeltu asennustapa. ATN:stä (addons.thunderbird.net) asennetut lisäosat saavat automaattiset päivitykset. LOCAL/dev-asennukset eivät päivity automaattisesti.

- Thunderbirdin vähimmäisversio: 128 ESR tai uudempi.

1. Thunderbirdissä siirry kohtaan **Työkalut > Lisäosat ja teemat**.
2. Hae "reply with attachments".
3. Lisää lisäosa.

Tai avaa lisäosan sivu suoraan: [Thunderbirdin lisäosat (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Manuaalinen asennus XPI-tiedostosta {#local-installation-in-thunderbird}

### Lataa XPI-tiedosto {#download-the-xpi-file}

1. Siirry [Thunderbird-lisäosan sivulle](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Lataa uusin versio lisäosasta XPI-tiedostona (`reply_with_attachments-x.y.z-tb.xpi`).

### Asenna Thunderbirdiin {#install-in-thunderbird-local}

1. Avaa Thunderbird.
2. Siirry kohtaan **Työkalut > Lisäosat ja teemat**.
3. **Lisäosien hallinnassa** napsauta hammasrataskuvaketta oikeassa yläkulmassa.
4. Valitse valikosta **Asenna lisäosa tiedostosta…**.
5. Valitse ladattu tiedosto `reply_with_attachments-x.y.z-tb.xpi`.
6. Vahvista asennus kehotettaessa.

---

## Asennus kehitystä varten {#installation-for-development}

### Lataa tietovarasto {#download-the-repository}

1. Lataa GitHub-repositorion uusin versio.
2. Suorita `make help` lisätietoja varten.

### Asenna Thunderbirdiin {#install-in-thunderbird-dev}

1. Avaa Thunderbird.
2. Siirry kohtaan **Työkalut > Lisäosat ja teemat**.
3. **Lisäosien hallinnassa** napsauta hammasrataskuvaketta oikeassa yläkulmassa.
4. Valitse valikosta **Asenna lisäosa tiedostosta…**.
5. Valitse luotu tiedosto `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Vahvista asennus kehotettaessa.

Huomautus: Jos Thunderbird ei hyväksy järjestelmässäsi tiedostoa `.zip`, nimeä se muotoon `.xpi` ja yritä ”Asenna lisäosa tiedostosta…” uudelleen.

### Mistä löydät LOCAL ZIP -paketin {#where-local-zip}

- Pakkaa ensin lisäosa: suorita `make pack` repositorion juuressa.
- Pakkaamisen jälkeen löydät “LOCAL”-zipin repositorion juuresta (esim. `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Ennen uudelleenpakkaamista testausta varten, korota versiot molemmissa: `sources/manifest_ATN.json` ja `sources/manifest_LOCAL.json`.

---

## Poista käytöstä, poista asennus ja päivitykset {#disable-uninstall-updates}

- Poista käytöstä: Thunderbird → Työkalut → Lisäosat ja teemat → etsi lisäosa → kytke pois päältä.
- Poista asennus: sama näkymä → kolmen pisteen valikko → Poista.
- Päivitykset: ATN-asennukset päivittyvät automaattisesti, kun uudet versiot on hyväksytty. LOCAL/dev-asennukset eivät päivity automaattisesti; asenna uusi LOCAL-koonti manuaalisesti.
- Poista asetukset kokonaan: katso [Tietosuoja → Tietojen poisto](privacy#data-removal).

Katso myös

- [Pika-aloitus](quickstart)
