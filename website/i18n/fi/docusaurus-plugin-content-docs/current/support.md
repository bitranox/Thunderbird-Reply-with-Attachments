---
id: support
title: 'Tuki'
sidebar_label: 'Tuki'
---

## FAQ {#faq}

### Liitteitä ei lisätty — miksi?

- Inline-kuvat ja S/MIME-osat on tarkoituksella jätetty pois.
- Duplikaattitiedostojen nimet ohitetaan, jos kirjoitushetkellä on jo sama tiedosto.
- Mustalistamallit saattavat suodattaa ehdokkaita; katso [Konfiguraatio](configuration#blacklist-glob-patterns).

### Voinko vahvistaa ennen liitteiden lisäämistä?

Kyllä. Ota käyttöön "Kysy ennen liitteiden lisäämistä" kohdasta [Konfiguraatio → Vahvistus](configuration#confirmation). Näppäimistö: Y/J = Kyllä, N/Esc = Ei.

### Lähetettäköön lisäosa mitään tietoa tai seuraa käyttöä?

Ei. Katso [Tietosuoja](privacy) — ei telemetryä eikä taustaverkkopyyntöjä.

### Edistäminen ei lisää liitteitä — onko se odotettua?

Kyllä. Vain Vastaa ja Vastaa kaikille -toiminnot on muutettu tässä lisäosassa; Edistämistä ei muuteta. Katso [Rajoitukset](usage#limitations).

### Missä on Lahjoita-snooze?

Valinnat → Tuki-osio. Katso [Lahjoitusnäkymä](configuration#donation-visibility).

---

## Tuki

Tarvitsetko apua tai haluatko ilmoittaa virheestä?

---

### Avaa ongelma GitHubissa:

- Varasto: `bitranox/Thunderbird-Reply-with-Attachments`
- Ongelmat: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Ilmoita Thunderbirdin versio (esim. 128 ESR), käyttöjärjestelmä ja toimenpiteet toistamiseen
- Liitä asiaankuuluvat lokit Thunderbirdin Virhe-konsolista (Työkalut → Kehittäjätyökalut → Virhe-konsoli)

- Lisäosien sivusto (ATN): Voit myös jättää palautetta [lisäosan sivun](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) kautta.

---

### Vinkit

- Varmista, että olet tuetussa Thunderbird-versiossa (128 ESR tai uudempi).
- Tarkista Konfiguration ja Käyttö-dokumentit yleisiä asetuskysymyksiä varten.
- Kehitys/testausta varten katso Kehitysohjeet.
- Jos tallennetut asetukset eivät näytä pätevän kunnolla, käynnistä Thunderbird uudelleen ja yritä uudelleen. (Thunderbird saattaa välimuistittaa tilan istuntojen välillä; uudelleenkäynnistys varmistaa, että uudet asetukset ladataan.)
- Minimirepr.: kokeile pienen testisähköpostin kanssa, joka sisältää yhden tai kaksi yksinkertaista tiedostoliitettä.
- Vertaa käyttäytymistä vahvistus ON vs. OFF supistaaksesi, onko dialogivirta mukana.

---

### Mitä sisällyttää raporttiin

- Thunderbirdin versio ja käyttöjärjestelmä
- Tarkat toimenpiteet toistamiseen (mitä teit, mitä odotit, mitä tapahtui)
- Oliko vahvistus käytössä ja oletusvastausasetuksesi
- Esimerkki mustalistamalleista (jos relevanttia)
- Virhekonsoleita lokit toistamisen aikana (Työkalut → Kehittäjätyökalut → Virhe-konsoli)
- Ota käyttöön virhelokitus (valinnainen):
  - Suorita Thunderbirdin Virhe-konsolissa: `messenger.storage.local.set({ debug: true })`
  - Toista ongelma ja kopioi asiaankuuluvat `[RWA]` lokirivit

---

### Ongelmapohja (kopioi/liitä) {#issue-template}

- Thunderbirdin versio ja käyttöjärjestelmä:
- Toimenpiteet toistamiseen:
- Vahvistus käytössä? Oletusvastaus:
- Esimerkki mustalistamalleista:
- Virhekonsoleita lokit (Työkalut → Kehittäjätyökalut → Virhe-konsoli):
- Muuta asiaankuuluvaa:

---

### Lahjoittaa

Jos haluaisit tukea tätä projektia, harkitse pientä kontribuutiota [Lahjoita](donation) -sivulla. Kiitos!
