---
id: features
title: Ominaisuudet
sidebar_label: Ominaisuudet
---

## Ominaisuudet

- Liittää automaattisesti alkuperäisen sähköpostin tiedostot, kun vastaat.
- Määriteltävissä oleva toiminta: liitteet voidaan
  - lisätä automaattisesti, tai
  - lisätä vasta vahvistuksen jälkeen (pieni, saavutettava valintaikkuna). Asetuksissa voit ottaa vahvistuksen käyttöön ja valita oletusvastauksen (Kyllä/Ei).
- Tiedostonimien musta lista (glob‑kuviot) estää tiettyjä tiedostoja liittymästä automaattisesti. Esimerkit: `*intern*`, `*secret*`, `*passwor*`.
  Täsmäys ei ole kirjainkoon suhteen herkkä ja tarkistaa vain tiedostonimen; anna Asetuksissa yksi kuvio per rivi.
- Mustan listan varoitus (valinnainen, oletuksena käytössä): kun tiedostot poissuljetaan mustan listasi vuoksi, pieni modaalinen ikkuna listaa tiedoston ja täsmäävät kuviot. Tummaa tilaa tukeva ja näppäimistöllä käytettävä (Enter/Esc sulkemiseen).
- Lisää alkuperäiset liitteet silloinkin, kun olet jo lisännyt jotain itse; välttää kaksoiskappaleet tiedostonimen perusteella.
- Ohittaa SMIME‑varmenteet ja sisäiset kuvat tarpeettomien liitteiden välttämiseksi.
