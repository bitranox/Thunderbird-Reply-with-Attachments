---
id: changelog
title: 'Muudatuste logi'
---

---

## Muudatuste logi

Täieliku, üksikasjaliku ajaloo leiad repositooriumist
[CHANGELOG.md GitHubis](https://github.com/bitranox/Thunderbird-Reply-with-Attachments/blob/master/CHANGELOG.md).

- 2.4.0: pilte enam ei jäeta kõrvale ainult seetõttu, et saatja pani neile `Content-ID`; valik "Include inline pictures" on eemaldatud, sest Thunderbird hoiab manustatud pilte vastuse sisus juba ise; lingid avanevad nüüd süsteemi brauseris; ülempiir 50 manust / 100 MB vastuse kohta, kõigest väljajäetust teavitatakse.
- 2.3.2: "Include inline pictures" manustas pildid vastuse sisusse base64 andme-URI-dena (eemaldati uuesti pärast add-ons.thunderbird.net'i ülevaatust; Thunderbird teeb seda ise); koodikvaliteedi parandused ja laiendatud testikate.
- 2.3.1: Säilitab manused ka pärast seda, kui Thunderbird jätab taustal oleva sündmuste lehe jõude; lisab sihitud silumiskonksud tõrkeotsinguks.
- 2.3.0: Täiustatud manuste deduplitseerimine, laiendatud testkatvus ning eemaldatud vananenud õigused, et vastata AMO poliitikatele.
- 2.1.0: Täielik rahvusvahelistamise tugi sajale populaarsemale keelele
- 2.0.0: ümberkirjutus täisfunktsionaalseks versiooniks (EN/DE)
- 1.0.1: läks üle messages.listAttachments() kasutamisele
- 1.0.0: esialgne väljalase

---

## Kuupäevad ja kanalid {#dates-and-channels}

- Väljalasked ATN-i võivad pärast pakkimist mõne tunni võrra hilineda.
- LOCAL-ehitused on mõeldud ainult arendajate testimiseks ega levitata ATN-i kaudu.

---
