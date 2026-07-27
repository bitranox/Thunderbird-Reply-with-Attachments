---
id: changelog
title: 'Dnevnik sprememb'
---

---

## Dnevnik sprememb

Za celotno, podrobno zgodovino glejte v repozitoriju
[CHANGELOG.md na GitHubu](https://github.com/bitranox/Thunderbird-Reply-with-Attachments/blob/master/CHANGELOG.md).

- 2.4.0: slike se ne izpuščajo več samo zato, ker je pošiljatelj nanje postavil `Content-ID`; možnost "Include inline pictures" je odstranjena, saj Thunderbird sam ohranja vdelane slike v telesu odgovora; povezave se zdaj odpirajo v sistemskem brskalniku; omejitev 50 priponk / 100 MB na odgovor, vse izpuščeno pa je sporočeno.
- 2.3.2: "Include inline pictures" je vdelala slike v telo odgovora kot base64 podatkovne URI (ponovno odstranjena po pregledu na add-ons.thunderbird.net; Thunderbird to naredi sam); izboljšave kakovosti kode in razširjena pokritost s testi.
- 2.3.1: Ohrani priloge potem, ko Thunderbird postavi ozadinsko stran dogodkov v mirovanje; doda ciljno usmerjene razhroščevalne kljuke za odpravljanje težav.
- 2.3.0: Izpopolnjeno odpravljanje dvojnikov prilog, razširjeno pokritje testov in odstranjena zastarela dovoljenja za skladnost s pravili AMO.
- 2.1.0: Popolna podpora za internacionalizacijo za 100 najbolj razširjenih jezikov
- 2.0.0: prepisano v polno funkcionalno različico (EN/DE)
- 1.0.1: preklopljeno na messages.listAttachments()
- 1.0.0: začetna izdaja

---

## Datumi in kanali {#dates-and-channels}

- Objave na ATN lahko zaostajajo nekaj ur po pakiranju.
- Gradnje LOCAL so namenjene le razvijalskemu testiranju in se ne distribuirajo prek ATN.

---
