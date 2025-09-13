---
id: quickstart
title: 'Aloitusopas'
sidebar_label: 'Aloitusopas'
---

## Aloitusopas

:::important Vähimmäisversio Thunderbirditä
Tämä lisäosa tukee Thunderbirditä **128 ESR tai uudempi**. Vanhempia versioita ei tueta.
:::

:::note Ei telemetriaa; ei taustaverkkoyhteyttä
Lisäosa **ei** kerää analytiikkaa/telemetriaa eikä tee **ei** taustaverkkopyyntöjä. Verkkoyhteys tapahtuu vain, kun napsautat ulkoisia linkkejä (Docs, GitHub, Lahjoita).
:::

---

### Asenna

1. Asenna lisäosa Thunderbird-lisäosista.
2. Valinnainen: Ota käyttöön vahvistus (Asetukset → “Kysy ennen liitteiden lisäämistä”).
3. Valinnainen: Jätä mustaluetteloilmoitus päälle (oletusarvo): “Varoita, jos liitteet jätetään huomiotta mustaluettelon vuoksi”.
4. Valinnainen: Lisää mustaluettelomalleja (yksi per rivi), esim.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Huom: Yllä oleva “# …” on kommentti tässä asiakirjassa; älä lisää kommentteja malleihin, jotka liität Asetuksiin. Syötä vain yksi malli per rivi.

Nyt vastaa viestiin, jossa on liitteitä — alkuperäiset lisätään automaattisesti tai nopean vahvistuksen jälkeen. Jos mustaluetteloosi on jätetty pois tiedostoja, näet lyhyen varoituksen, joka luettelee ne.

---

### Vahvista {#verify}

- Vastaa viestiin, jossa on 1–2 liitettä, ja varmista, että alkuperäiset on lisätty kirjoitusikkunaasi.
- Jos haluat säätää toimintaa, katso [Konfiguraatio](configuration) (vahvistusvaihtoehto, oletusvastaus, mustaluettelomallit).

---

### Vahvista mustaluetteloilmoitus {#verify-blacklist-warning}

- Vastaa viestiin, jossa on tiedosto, kuten “secret.txt”.
- Kun “Varoita, jos liitteet jätetään huomiotta mustaluettelon vuoksi” on otettu käyttöön, pieni keskusteluikkuna luettelee jätetyt tiedostot ja vastaavan mallin.

Jos et näe varoitusta, varmista, että malli vastaa tiedoston nimeä tarkasti (vain tiedoston nimi, kirjainkooltaan huomiota vaille). Katso Konfiguraatio → Mustaluettelo.

---

### Näppäimistöhuomio {#keyboard-note}

- Vahvistusdialogi tukee Y/J Yes-näppäimiä ja N/Esc No-näppäimiä. Joillakin ei-latinalaisilla näppäimistöillä kirjainten näppäimet voivat vaihdella; Enter vahvistaa kohdistetun painikkeen.
