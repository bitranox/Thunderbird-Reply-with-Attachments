---
id: features
title: 'Kenmerke'
sidebar_label: 'Kenmerke'
---

---

## Kenmerke {#features}

- Heg outomaties lêers van die oorspronklike e-pos aan wanneer jy antwoord.
- Konfigureerbare gedrag: aanhegsels kan
  - outomaties bygevoeg word, of
  - slegs ná bevestiging bygevoeg word (’n klein, toeganklike dialoog). In Opsies
    kan jy die bevestiging aktiveer en die verstekantwoord kies (Ja/Nee).
- Swartlys van lêername (glob-patrone) verhoed dat spesifieke lêers
  outomaties aangeheg word. Voorbeelde: `*intern*`, `*secret*`, `*passwor*`.
  Ooreenstemming is hoofletterongevoelig en kontroleer slegs die lêernaam; voorsien een patroon
  per reël in Opsies.
- Swartlys‑waarskuwing (opsioneel, by verstek geaktiveer): wanneer lêers deur jou
  swartlys uitgesluit word, lys ’n klein modale venster die lêer en die ooreenstemmende patroon(ne). Donker‑modus
  vriendelik en toetsbordtoeganklik (Enter/Esc om toe te maak).
- Werk met Beantwoord en Beantwoord almal. Aanstuur word nie deur hierdie byvoeging verander nie.
- Voeg oorspronklikes by selfs al het jy reeds self iets aangeheg; vermy duplikate volgens lêernaam.
- Per‑oortjie duplikaatbeskerming verhoed dubbel‑byvoeging in dieselfde opstel‑oortjie.
- Slaan S/MIME‑sertifikate by verstek oor om onnodige aanhegsels te vermy.
- Sluit inlynprente in (verstek: AAN). Ingebedde beelde word direk in die
  antwoordliggaam as base64‑data‑URI’s herstel, wat die oorspronklike inlynuitleg behou. Deaktiveer in
  Opsies om inlynbeelde heeltemal oor te slaan.

---

## Hoe dit werk {#how-it-works}

- By antwoord lys die byvoeging die oorspronklike aanhegsels.
- Filter S/MIME‑handtekeninge uit lêeraanhegsels; inlynbeelde word in die liggaam herstel (tensy gedeaktiveer).
- Vra opsioneel vir bevestiging (toetsbordvriendelik).
- Voeg geskikte lêers by jou opstel, en vermy duplikate volgens lêernaam.
- Sien “Waarom aanhegsels dalk nie bygevoeg word nie” in Gebruik vir randgevalle.

Privaatheidsnota: Alle verwerking vind plaaslik in Thunderbird plaas. Die byvoeging maak geen agtergrond‑netwerkversoeke nie.

---
