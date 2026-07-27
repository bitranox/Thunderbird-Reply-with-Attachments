---
id: changelog
title: 'Dnevnik promjena'
---

---

## Dnevnik izmjena

Za potpunu, detaljnu historiju, pogledajte
[CHANGELOG.md na GitHubu](https://github.com/bitranox/Thunderbird-Reply-with-Attachments/blob/master/CHANGELOG.md).

- 2.4.0: slike se više ne odbacuju samo zato što je pošiljalac na njih stavio `Content-ID`; opcija "Include inline pictures" je uklonjena, jer Thunderbird sam čuva ugrađene slike u tijelu odgovora; linkovi se sada otvaraju u sistemskom pregledniku; ograničenje od 50 priloga / 100 MB po odgovoru, uz izvještaj o svemu što je izostavljeno.
- 2.3.2: "Include inline pictures" je ugrađivala slike u tijelo odgovora kao base64 data URI-je (ponovo uklonjeno nakon recenzije na add-ons.thunderbird.net; Thunderbird to radi sam); poboljšanja kvaliteta koda i proširena pokrivenost testovima.
- 2.3.1: Zadržava priloge nakon što Thunderbird uspava pozadinsku stranicu događaja; dodaje ciljane debug hookove za otklanjanje poteškoća.
- 2.3.0: Unaprijeđena deduplikacija priloga, prošireno pokrivanje testovima i uklonjene zastarjele dozvole radi usklađivanja s politikama AMO-a.
- 2.1.0: Potpuna podrška internacionalizaciji za 100 najkorištenijih jezika
- 2.0.0: Prepravljeno u potpuno funkcionalnu verziju (EN/DE)
- 1.0.1: Prešlo na messages.listAttachments()
- 1.0.0: Početno izdanje

---

## Datumi i kanali {#dates-and-channels}

- Izdanja na ATN-u mogu kasniti nekoliko sati nakon pakovanja.
- LOCAL buildovi su namijenjeni isključivo za testiranje od strane programera i ne distribuiraju se putem ATN-a.

---
