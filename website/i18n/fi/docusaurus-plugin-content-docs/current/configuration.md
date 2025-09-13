---
id: configuration
title: 'Konfiguraatio'
---

## Konfiguraatio

Terminologian huomautus: katso [Sanasto](glossary) johdonmukaisista termeistä, joita käytetään käyttöliittymässä ja asiakirjoissa.

---

## Avaa asetukset Thunderbirdissä {#open-options-in-thunderbird}

- Thunderbird → Työkalut → Laajennukset ja teemat → etsi “Vastaa liitteiden kanssa” → Asetukset/Vaihtoehdot

---

### Asetukset {#settings}

#### Vahvistus {#confirmation}

- Kytke “Kysy ennen liitteiden lisäämistä”
- Oletusvastaus: Kyllä tai Ei (fokus & näppäimistön oletus)
- Näppäimistö: Y/J = Kyllä; N/Esc = Ei; Tab/Shift+Tab ja nuolinäppäimet kiertävät fokusta
  - Katso näppäimistötiedot kohdasta [Käyttö](usage#keyboard-shortcuts).

---

#### Mustalla lista (glob-mallit) {#blacklist-glob-patterns}

Musta lista ei automaattisesti lisää liitettyjä tiedostoja vastauksissa. Katso myös [Sanasto](glossary) termille “Musta lista (Poissulku lista)”.

- Yksi malli per rivi; kirjainkoolla ei ole merkitystä; vain tiedostonimet vastaavat
- Esimerkkejä: `*intern*`, `*secret*`, `*passwor*`
- Tuetut glob-tokenit: `*` (mitkä tahansa merkit paitsi `/`), `?` (yksi merkki), merkkiluokat kuten `[abc]`. Käytä `\[` vastataksesi kirjaimelliseen `[`:aan. Polut (`**/`) ignoroidaan, koska vain tiedostonnimiä vastataan.
- Ei tueta: negaatiota (`!`), kaarilajittelua (`{..}`), ja monimutkaisia alueita. Pidä mallit yksinkertaisina.
- Kommentteja ei tueta malleissa. Älä sisällytä `#` tai rivikohtaisia kommentteja; syötä vain malliteksti per rivi.

---

##### Malli keittokirja {#pattern-cookbook}

- Vasta api PDF: `*.pdf`
- Vasta tiedostot, jotka alkavat “scan”: `scan*`
- Merkkiluokka: `report[0-9].txt`
- Paeta kirjaimellista `[`: `\[` (käytännöllinen, kun halutaan vastata sulkumerkki uhkana)

---

##### Huomiot {#blacklist-notes}

- Tila ei ole tärkeä; ensimmäinen/mikään vastaus poistaa tiedoston.
- Vastaus on vain tiedostonimeen liittyvä (polkuja/kansioita ei oteta huomioon).
- “Palauta oletuksiin” palauttaa suositellut mallit ja mustan listan varoituksen kytkimen.
- Miksi esimerkki `*passwor*`? Se vastaa sekä “salasana” että “Passwort” -perheitä.
- Etusija: jos mikään malli vastaa tiedostonimeä, tiedosto poistetaan (ensimmäinen/mikään vastaus — tila ei muuta tulosta).
- Vinkki — testaa malli: lisää väliaikainen malli, vastaa viestiin, joka sisältää tiedoston, jolla on vastaava nimi, ja varmista, että se on poistettu varoituslistasta.

##### Nopeasti kokeile (turvallinen testi) {#blacklist-try-it}

1. Avaa Asetukset → Musta lista.
2. Lisää väliaikainen malli kuten `*.tmp` ja napsauta Tallenna.
3. Vastaa testisähköpostiin, jossa on tiedosto, jonka pääte on `.tmp` — tiedoston pitäisi näkyä varoituslistalla eikä liitettynä.
4. Poista väliaikainen malli, kun olet valmis, tai napsauta “Palauta oletuksiin”.

---

#### Varotus poistetuille liitteille {#warning-on-excluded-attachments}

- Kytke “Varoita, jos liitteet on poistettu mustasta listasta” (oletus: PÄÄLLÄ).
- Kun se on käytössä, pieni modaalinen ikkuna näyttää poistetut tiedostot ja vastaavat mallit. Varoitus näkyy myös, kun mitään ei liitetä, koska kaikki ehdokkaat on poistettu.

---

#### Tallenna asetuksesi {#save-your-settings}

Asetukset tallennetaan painamalla Tallenna-painiketta. Voit palauttaa yksittäiset kentät manuaalisesti tai palauttaa oletukset tarpeen mukaan.

Jos tallennetut asetukset näyttävät, etteivät ne päde oikein, käynnistä Thunderbird uudelleen ja yritä uudelleen. (Thunderbird voi väliaikaisesti tallentaa tilan istuntojen välillä; uudelleenkäynnistys varmistaa, että tuoreet asetukset ladataan.)

Vinkki: Vahvista, että asetuksesi ovat astuneet voimaan, vastaamalla mihin tahansa viestiin liitteen kanssa ja tarkistamalla vahvistus tai mustan listan varoitus.

---

#### Lahjoituksen näkyvyys (90 päivän snooze) {#donation-visibility}

Laajennus sisältää kätevän ominaisuuden lahjoituskehotteiden piilottamiseksi tietyn aikaa sen jälkeen, kun olet lahjoittanut.

Mistä sen löytää

- Asetukset → Tuki-osio: näet “Olen lahjoittanut” -painikkeen ja pienen vihjealueen.
- Lähetä-vahvistusdialogi näyttää myös Lahjoita-painikkeen; se piiloutuu automaattisesti, kun snooze on aktiivinen.

Kuinka se toimii

- Napsauttamalla “Olen lahjoittanut” piilotat lahjoituspainikkeet ja niihin liittyvät kehotteet 90 päiväksi.
- Tila vihje näyttää “Piilotettu YYYY-MM-DD asti” (omassa paikallisessa päivämäärässäsi). Saatat myös nähdä “Näytä lahjoitukset uudelleen” -painikkeen, joka palauttaa näkyvyyden heti.
- 90 päivän kuluttua Lahjoita-painike tulee automaattisesti näkyviin uudelleen.

Yksityisyys & tallennus

- Laajennus tallentaa yhden aikaleiman Thunderbirdin paikalliseen tallennustilaan muistaakseen snooze-ajan. Avain: `donateHideUntil` (epoch-millisekunnit).
- Tämä asetus on paikallinen Thunderbird-profiilisi (ei pilvisynkattu). Tämän ominaisuuden vuoksi ei tehdä verkkopyyntöjä.

Vianetsintä

- Jos Lahjoita näkyy edelleen heti napsautettuasi “Olen lahjoittanut”, odota hetki tai avaa Asetukset-sivu uudelleen; käyttöliittymä päivittyy heti, kun asetus on tallennettu.
- Palauttaaksesi manuaalisesti napsauta “Näytä lahjoita uudelleen”. Voit myös odottaa, kunnes vihjeessä mainittu päivä on ohi.

Tämä ominaisuus on täysin kätevä; se ei koskaan estä laajennuksen toimintaa eikä kerää henkilökohtaisia tietoja.

---

### Tiedostonimen normalisointi (kopioiden estäminen) {#filename-normalization-duplicates-prevention}

Toimiakseen johdonmukaisesti eri alustoilla, tiedostonimet normalisoidaan ennen kopioiden tarkistamista:

- Unicode normalisoidaan NFC:hen.
- Nimet ovat kirjainkuormitettuja (pieniksi kirjaimiksi).
- Loppupisteet/tilat poistetaan (Windows-ystävällisyys).

Tämä tekee kopioiden havaitsemisesta ennustettavaa nimille kuten `café.pdf` vs `café.pdf` (NFD) tai `FILE.txt.` vs `file.txt`.

---

## Vahvistuskäyttäytyminen {#confirmation-behavior}

- “Oletusvastaus” asettaa alun perin keskitysnäppäimen vahvistusdialogissa (kätevä näppäimistön käyttäjille).
- Toimii sekä “Vastaus” että “Vastaus kaikille” -tiloissa. “Välitä” ei muutu tämän laajennuksen myötä.

---

## Edistyksellinen: kopioiden havaitseminen {#advanced-duplicate-detection}

Kopioiden estäminen toteutetaan jokaisen kirjoitusvälilehden ja tiedostonimen mukaan. Katso [Käyttö](usage#behavior-details) yksityiskohtaiselle selitykselle.

---

Katso myös

- [Oikeudet](permissions)
- [Yksityisyys](privacy)
