---
id: usage
title: 'Käyttö'
sidebar_label: 'Käyttö'
---

---

## Käyttö {#usage}

- Vastaa ja lisäosa lisää alkuperäiset automaattisesti — tai kysyy ensin, jos asetus on otettu käyttöön Asetuksissa.
- Duplikaatit poistetaan tiedostonimen perusteella; S/MIME‑osat ohitetaan aina. Upotetut kuvat palautetaan oletuksena vastauksen runkoon (poista käytöstä kohdasta "Include inline pictures" Asetuksissa).
- Mustalistatut liitteet ohitetaan myös (kirjainkoosta riippumattomat glob‑kuviot, jotka täsmäävät tiedostonimiin, eivät polkuihin). Katso [Määritykset](configuration#blacklist-glob-patterns).

---

### Mitä tapahtuu vastattaessa {#what-happens}

- Tunnista vastaus → luetteloi alkuperäiset liitteet → suodata S/MIME + upotetut → valinnainen vahvistus → lisää kelpaavat tiedostot (ohita duplikaatit) → palauta upotetut kuvat runkoon.

Tiukka vs. sallivampi läpikäynti: Lisäosa sulkee ensin S/MIME‑ ja upotetut osat pois tiedostoliitteistä. Jos mikään ei täytä ehtoja, se suorittaa sallivamman läpikäynnin, joka yhä sulkee pois S/MIME/inline‑osat mutta sietää useampia tapauksia (katso Koodin yksityiskohdat). Upotettuja kuvia ei koskaan lisätä tiedostoliitteiksi; sen sijaan, kun "Include inline pictures" on käytössä (oletus), ne upotetaan suoraan vastauksen runkoon base64‑data‑URI:na.

| Osatyyppi                                                     |                    Tiukka läpikäynti |                Sallivampi läpikäynti |
| ------------------------------------------------------------- | -----------------------------------: | -----------------------------------: |
| S/MIME‑allekirjoitustiedosto `smime.p7s`                      |                         Poissuljettu |                         Poissuljettu |
| S/MIME MIME‑tyypit (`application/pkcs7-*`)                    |                         Poissuljettu |                         Poissuljettu |
| Sisäinen kuva, johon viitataan Content‑ID:llä (`image/*`)     | Poissuljettu (palautetaan runkoon\*) | Poissuljettu (palautetaan runkoon\*) |
| Liitteenä oleva sähköposti (`message/rfc822`) tiedostonimellä |                            Ei lisätä |                     Saatetaan lisätä |
| Tavallinen tiedostoliite, jolla on tiedostonimi               |                     Saatetaan lisätä |                     Saatetaan lisätä |

\* Kun "Include inline pictures" on käytössä (oletus: PÄÄLLÄ), upotetut kuvat upotetaan vastauksen runkoon base64‑data‑URI:na sen sijaan, että ne lisättäisiin tiedostoliitteiksi. Katso [Määritykset](configuration#include-inline-pictures).

Esimerkki: Joiltakin liitteiltä voi puuttua tiettyjä otsakkeita, mutta ne ovat silti tavallisia tiedostoja (eivät upotettuja/S/MIME). Jos tiukka läpikäynti ei löydä yhtään, sallivampi läpikäynti voi hyväksyä ne ja liittää ne.

---

### Ristiviittaukset {#cross-reference}

- Välitä‑toimintoa ei muuteta suunnitellusti (katso Rajoitukset alla).
- Syyhin, miksi liitettä ei ehkä lisätä, katso “Miksi liitteitä ei ehkä lisätä”.

---

## Toiminnan yksityiskohdat {#behavior-details}

- Päällekkäisyyksien estäminen: Lisäosa merkitsee viestin kirjoitusvälilehden käsitellyksi välilehtikohtaisella istuntoarvolla ja muistiin tallennetulla suojauksella. Se ei lisää alkuperäisiä kahdesti.
- Kirjoitusikkunan sulkeminen ja avaaminen uudelleen käsitellään uutena välilehtenä (eli uusi yritys sallitaan).
- Nykyisten liitteiden huomioiminen: Jos kirjoitettava viesti sisältää jo liitteitä, alkuperäiset lisätään silti tasan kerran, ohittaen jo olemassa olevat tiedostonimet.
- Poissulut: S/MIME‑artifaktit ja upotetut kuvat suljetaan pois tiedostoliitteistä. Jos ensimmäisellä kierroksella mikään ei kelpaa, sallivampi varakierros tarkistaa uudelleen ei‑S/MIME‑osat. Upotettuja kuvia käsitellään erikseen: ne palautetaan vastauksen runkoon data‑URI:na (kun käytössä).
  - Tiedostonimet: `smime.p7s`
  - MIME‑tyypit: `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - Upotetut kuvat: mikä tahansa `image/*`‑osa, johon viitataan Content‑ID:llä — suljetaan pois tiedostoliitteistä mutta upotetaan vastauksen runkoon, kun "Include inline pictures" on PÄÄLLÄ
  - Liitetyt sähköpostit (`message/rfc822`): käsitellään tavallisina liitteinä, jos niillä on tiedostonimi; ne voidaan lisätä (edellyttäen duplikaattitarkistuksia ja mustalistaa).
- Mustalista‑varoitus (jos käytössä): Kun ehdokkaat suljetaan pois mustalistasi vuoksi, lisäosa näyttää pienen modaalin, jossa luetellaan vaikutuksen saaneet tiedostot ja vastaavat kuviot. Tämä varoitus näkyy myös tilanteissa, joissa liitteitä ei lisätä lainkaan, koska kaikki suljettiin pois.

---

## Pikanäppäimet {#keyboard-shortcuts}

- Vahvistusikkuna: Y/J = Yes, N/Esc = No; Sarkain/Shift+Sarkain ja Nuolinäppäimet kierrättävät kohdistusta.
  - “Default answer” kohdassa [Määritykset](configuration#confirmation) asettaa aluksi kohdistetun painikkeen.
  - Enter aktivoi kohdistetun painikkeen. Sarkain/Shift+Sarkain ja nuolet siirtävät kohdistusta saavutettavuuden vuoksi.

### Pikanäppäinmuistilista {#keyboard-cheat-sheet}

| Näppäimet       | Toiminto                                         |
| --------------- | ------------------------------------------------ |
| Y / J           | Vahvista Kyllä                                   |
| N / Esc         | Vahvista Ei                                      |
| Enter           | Aktivoi kohdistettu painike                      |
| Tab / Shift+Tab | Siirrä kohdistusta eteen/taakse                  |
| Arrow keys      | Siirrä kohdistusta painikkeiden välillä          |
| Default answer  | Asettaa alkuperäisen kohdistuksen (Kyllä tai Ei) |

---

## Rajoitukset {#limitations}

- Välitä‑toimintoa tämä lisäosa ei muuta (Vastaa ja Vastaa kaikille ovat tuettuja).
- Hyvin suuria liitteitä voivat koskea Thunderbirden tai palveluntarjoajan rajoitukset.
  - Lisäosa ei paloita eikä pakkaa tiedostoja; se tukeutuu Thunderbirden normaaliin liitekäsittelyyn.
- Salatut viestit: S/MIME‑osat jätetään tarkoituksella pois.

---

## Miksi liitteitä ei ehkä lisätä {#why-attachments-might-not-be-added}

- Upotettuja kuvia ei lisätä tiedostoliitteinä. Kun "Include inline pictures" on PÄÄLLÄ (oletus), ne upotetaan vastauksen runkoon data‑URI:na. Jos asetus on POIS, upotetut kuvat poistetaan kokonaan. Katso [Määritykset](configuration#include-inline-pictures).
- S/MIME‑allekirjoitusosat jätetään tarkoituksella pois: tiedostonimet kuten `smime.p7s` ja MIME‑tyypit kuten `application/pkcs7-signature` tai `application/pkcs7-mime` ohitetaan.
- Mustalistan kuviot voivat suodattaa ehdokkaita: katso [Määritykset](configuration#blacklist-glob-patterns); täsmäys on kirjainkoosta riippumaton ja koskee vain tiedostonimeä.
- Päällekkäisiä tiedostonimiä ei lisätä uudelleen: jos kirjoitettava viesti sisältää jo tiedoston, jolla on sama normalisoitu nimi, se ohitetaan.
- Ei‑tiedostomaiset osat tai puuttuvat tiedostonimet: vain tiedoston kaltaiset osat, joilla on käyttökelpoinen tiedostonimi, otetaan lisättäviksi.

---

Katso myös

- [Määritykset](configuration)
