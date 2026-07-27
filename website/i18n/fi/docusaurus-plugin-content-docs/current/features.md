---
id: features
title: 'Ominaisuudet'
sidebar_label: 'Ominaisuudet'
---

---

## Ominaisuudet {#features}

- Upotetut kuvat jätetään Thunderbirdin huoleksi: ne pysyvät vastauksen rungossa eikä
  niitä kopioida tiedostoliitteinä. Kuvaa, jossa on vain `Content-ID` ilman että siihen
  viitataan, kohdellaan tavallisena liitteenä ja se kopioidaan.

---

## Miten se toimii {#how-it-works}

- Vastattaessa lisäosa luettelee alkuperäiset liitteet.
- Suodattaa pois S/MIME-allekirjoitukset tiedostoliitteistä; upotetut kuvat palautetaan runkoon (ellei ominaisuutta ole poistettu käytöstä).
- Kysyy tarvittaessa vahvistuksen (näppäimistöystävällinen).
- Lisää kelvolliset tiedostot kirjoitettavaan viestiin ja välttää kaksoiskappaleet tiedostonimen perusteella.
- Katso kohdasta Käyttö “Miksi liitteitä ei ehkä lisätä” rajatapaukset.

Tietosuoja: Kaikki käsittely tapahtuu paikallisesti Thunderbirdissä. Lisäosa ei tee taustalla verkkopyyntöjä.

---
