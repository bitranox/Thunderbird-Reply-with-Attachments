---
id: changelog
title: 'Muutosloki'
---

---

## Muutosloki

Katso täydellinen, yksityiskohtainen historia arkiston
[CHANGELOG.md-tiedostosta GitHubissa](https://github.com/bitranox/Thunderbird-Reply-with-Attachments/blob/master/CHANGELOG.md).

- 2.4.0: kuvia ei enää jätetä pois pelkästään siksi, että lähettäjä laittoi niihin `Content-ID`:n; "Include inline pictures" -asetus on poistettu, koska Thunderbird säilyttää upotetut kuvat vastauksen rungossa jo itse; linkit avautuvat nyt järjestelmän selaimessa; yläraja 50 liitettä / 100 Mt vastausta kohti, ja kaikesta pois jätetystä ilmoitetaan.
- 2.3.2: "Include inline pictures" upotti kuvat vastauksen runkoon base64-data-URI:na (poistettu uudelleen add-ons.thunderbird.net-arvioinnin jälkeen; Thunderbird tekee tämän itse); koodin laatuparannuksia ja laajennettu testikattavuus.
- 2.3.1: Säilyttää liitteet senkin jälkeen, kun Thunderbird asettaa taustatapahtumasivun lepotilaan; lisää kohdennettuja virheenjäljityskoukkuja vianmääritystä varten.
- 2.3.0: Täsmennetty liitteiden deduplikointia, laajennettu testikattavuutta ja poistettu vanhentuneita oikeuksia AMO-käytäntöjen täyttämiseksi.
- 2.1.0: Täysi kansainvälistämistuki 100 yleisimmälle kielelle
- 2.0.0: Uudelleenkirjoitettu täysiveriseksi versioksi (EN/DE)
- 1.0.1: siirryttiin käyttämään messages.listAttachments()
- 1.0.0: ensimmäinen julkaisu

---

## Julkaisupäivät ja kanavat {#dates-and-channels}

- Julkaisut ATN:ään voivat viivästyä muutamia tunteja paketoinnin jälkeen.
- LOCAL-koontiversiot on tarkoitettu vain kehittäjätestaukseen eikä niitä jaella ATN:n kautta.

---
