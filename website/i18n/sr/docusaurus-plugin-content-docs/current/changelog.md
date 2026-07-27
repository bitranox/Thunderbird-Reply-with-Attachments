---
id: changelog
title: 'Дневник промена'
---

---

## Dnevnik izmena

Za potpunu, detaljnu istoriju pogledajte
[CHANGELOG.md na GitHubu](https://github.com/bitranox/Thunderbird-Reply-with-Attachments/blob/master/CHANGELOG.md).

- 2.4.0: слике се више не одбацују само зато што је пошиљалац поставио `Content-ID`; опција "Include inline pictures" је уклоњена, пошто Thunderbird сам чува уграђене слике у телу одговора; везе се сада отварају у системском прегледачу; ограничење од 50 прилога / 100 MB по одговору, а све што је изостављено се пријављује.
- 2.3.2: "Include inline pictures" је уграђивала слике у тело одговора као base64 data URI-је (поново уклоњено након прегледа на add-ons.thunderbird.net; Thunderbird то ради сам); побољшања квалитета кода и проширено покривање тестовима.
- 2.3.1: Zadržava priloge nakon što Thunderbird prebaci pozadinsku stranicu događaja u mirovanje; dodaje ciljane kuke za otklanjanje problema (debug).
- 2.3.0: Doterana deduplikacija priloga, proširena pokrivenost testovima i uklonjene zastarele dozvole radi usklađivanja sa smernicama AMO.
- 2.1.0: Potpuna podrška za internacionalizaciju za 100 najzastupljenijih jezika
- 2.0.0: prepisivanje u potpuno funkcionalnu verziju (EN/DE)
- 1.0.1: prebačeno na messages.listAttachments()
- 1.0.0: prvo izdanje

---

## Datumi i kanali {#dates-and-channels}

- Objave na ATN mogu kasniti nekoliko sati nakon pakovanja.
- LOCAL buildovi su namenjeni isključivo testiranju od strane programera i ne distribuiraju se putem ATN-a.

---
