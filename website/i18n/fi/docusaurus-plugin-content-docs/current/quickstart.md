---
id: quickstart
title: 'Pikaopas'
sidebar_label: 'Pikaopas'
---

---

## Pika-aloitus

:::important Vähimmäisversio Thunderbirdille
Tämä lisäosa tukee Thunderbirdin versiota **128 ESR tai uudempaa**. Vanhempia versioita ei tueta.
:::

:::note Ei telemetriaa; ei taustaverkkoyhteyksiä
Lisäosa ei kerää analytiikkaa/telemetriaa eikä tee taustalla verkkopyyntöjä. Verkkoyhteyttä käytetään vain, kun napsautat ulkoisia linkkejä (Dokumentaatio, GitHub, Lahjoita).
:::

---

### Asennus

1. Asenna lisäosa Thunderbird Add‑ons -sivustolta.
2. Valinnainen: Ota vahvistus käyttöön (Asetukset → “Kysy ennen liitteiden lisäämistä”).
3. Valinnainen: Jätä estolistan varoitus käyttöön (oletus): “Varoita, jos liitteet on suljettu pois estolistalla”.
4. Valinnainen: Lisää estolistaan kuviot (yksi per rivi), esim.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Huom.: Yllä oleva “# …” on tämän dokumentaation kommentti; älä lisää kommentteja kuvioihin, jotka liität Asetuksiin. Syötä vain yksi kuvio per rivi.

Vastaa nyt viestiin, jossa on liitteitä — alkuperäiset lisätään automaattisesti tai nopean vahvistuksen jälkeen. Jos estolistasi sulkee pois tiedostoja, näet lyhyen varoituksen, joka luettelee ne.

---

### Tarkista {#verify}

- Vastaa viestiin, jossa on 1–2 liitettä, ja varmista, että alkuperäiset lisätään kirjoitusikkunaasi.
- Käyttäytymisen säätämiseksi katso [Asetukset](configuration) (vahvistuksen kytkin, oletusvastaus, estolistan kuviot).

---

### Tarkista estolistan varoitus {#verify-blacklist-warning}

- Vastaa viestiin, joka sisältää esimerkiksi tiedoston “secret.txt”.
- Kun “Varoita, jos liitteet on suljettu pois estolistalla” on käytössä, pieni valintaikkuna luettelee poissuljetut tiedostot ja vastaavan kuvion.

Jos et näe varoitusta, varmista, että kuvio vastaa tiedostonimeä täsmälleen (vain tiedostonimi, kirjainkoosta riippumaton). Katso Asetukset → Estolista.

---

### Näppäimistöhuomautus {#keyboard-note}

- Vahvistusikkuna tukee Y/J vastaukselle Kyllä ja N/Esc vastaukselle Ei. Joissakin ei‑latinalaisissa näppäimistöissä kirjainnäppäimet voivat vaihdella; Enter vahvistaa kohdistetun painikkeen.

---
