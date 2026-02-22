---
id: features
title: 'Ominaisuudet'
sidebar_label: 'Ominaisuudet'
---

---

## Ominaisuudet {#features}

- Liittää alkuperäisen viestin tiedostot automaattisesti vastattaessa.
- Muokattavissa oleva toiminta: liitteet voidaan
  - lisätä automaattisesti, tai
  - lisätä vasta vahvistuksen jälkeen (pieni, saavutettava valintaikkuna). Asetuksissa
    voit ottaa vahvistuksen käyttöön ja valita oletusvastauksen (Kyllä/Ei).
- Tiedostonimien estolista (glob-kuviot) estää tiettyjen tiedostojen
  automaattisen liittämisen. Esimerkkejä: `*intern*`, `*secret*`, `*passwor*`.
  Täsmäytys on kirjainkoosta riippumaton ja tarkistaa vain tiedostonimen; anna yksi malli
  per rivi Asetuksissa.
- Estolistan varoitus (valinnainen, oletuksena käytössä): kun estolistasi
  sulkee pois tiedostoja, pieni modaalinen ikkuna luettelee tiedoston ja vastaavan(t) mallin(t). Tumman tilan
  kanssa toimiva ja näppäimistöystävällinen (Enter/Esc sulkemiseen).
- Toimii Vastaa- ja Vastaa kaikille -toiminnoissa. Välitä-toimintoon tämä lisäosa ei tee muutoksia.
- Lisää alkuperäiset liitteet, vaikka olisit jo liittänyt jotain itse; välttää kaksoiskappaleet tiedostonimen perusteella.
- Välilehtikohtainen kaksoislisäyksen esto estää tuplalisäyksen samassa kirjoitusvälilehdessä.
- Ohittaa oletuksena S/MIME-varmenteet tarpeettomien liitteiden välttämiseksi.
- Sisällytä upotetut kuvat (oletus: PÄÄLLÄ). Upotetut kuvat palautetaan suoraan
  vastausrunkoon base64-data-URI-muodossa, jolloin alkuperäinen upotettu asettelu säilyy. Poista käytöstä
  Asetuksissa, jos haluat ohittaa upotetut kuvat kokonaan.

---

## Miten se toimii {#how-it-works}

- Vastattaessa lisäosa luettelee alkuperäiset liitteet.
- Suodattaa pois S/MIME-allekirjoitukset tiedostoliitteistä; upotetut kuvat palautetaan runkoon (ellei ominaisuutta ole poistettu käytöstä).
- Kysyy tarvittaessa vahvistuksen (näppäimistöystävällinen).
- Lisää kelvolliset tiedostot kirjoitettavaan viestiin ja välttää kaksoiskappaleet tiedostonimen perusteella.
- Katso kohdasta Käyttö “Miksi liitteitä ei ehkä lisätä” rajatapaukset.

Tietosuoja: Kaikki käsittely tapahtuu paikallisesti Thunderbirdissä. Lisäosa ei tee taustalla verkkopyyntöjä.

---
