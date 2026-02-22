---
id: features
title: 'Funkcijos'
sidebar_label: 'Funkcijos'
---

---

## Funkcijos {#features}

- Atsakant automatiškai prideda failus iš pradinio laiško.
- Konfigūruojamas veikimas: priedai gali būti
  - pridedami automatiškai, arba
  - pridedami tik po patvirtinimo (mažas, prieinamas dialogas). Parinktyse jūs
    galite įjungti patvirtinimą ir pasirinkti numatytąjį atsakymą (Taip/Ne).
- Failų pavadinimų juodasis sąrašas (glob šablonai) neleidžia tam tikriems failams būti
  pridėtiems automatiškai. Pavyzdžiai: `*intern*`, `*secret*`, `*passwor*`.
  Atitikimas nejautrus raidžių dydžiui ir tikrina tik failo pavadinimą; Parinktyse pateikite po vieną šabloną eilutėje.
- Juodojo sąrašo įspėjimas (neprivalomas, pagal numatytuosius įjungtas): kai failai atmetami pagal jūsų
  juodąjį sąrašą, mažas modalinis langas išvardija failą ir atitinkantį(-čius) šabloną(-us). Tinka tamsiajam
  režimui ir prieinamas klaviatūra (Enter/Esc, kad uždarytumėte).
- Veikia su Atsakyti ir Atsakyti visiems. Persiuntimo šis priedas nekeičia.
- Prideda originalus net jeigu jau ką nors pridėjote patys; vengia dublikatų pagal failo pavadinimą.
- Apsauga nuo dublikatų kiekvienoje kortelėje neleidžia dukart pridėti toje pačioje rašymo kortelėje.
- Numatytai praleidžia S/MIME sertifikatus, kad būtų išvengta nereikalingų priedų.
- Įtraukti įterptinius paveikslėlius (numatytasis: Įjungta). Įterptiniai vaizdai atkuriami tiesiogiai
  atsakymo tekste kaip base64 duomenų URI, išsaugant pradinį įterptinį išdėstymą. Išjunkite
  Parinktyse, kad visiškai praleistumėte įterptinius vaizdus.

---

## Kaip tai veikia {#how-it-works}

- Atsakant priedas išvardija pradinius priedus.
- Išfiltruoja S/MIME parašus iš failų priedų; įterptiniai vaizdai atkuriami tekste (jei neišjungta).
- Pasirinktinai paprašo patvirtinti (patogu klaviatūra).
- Prideda tinkamus failus prie rašomo laiško, vengiant dublikatų pagal failo pavadinimą.
- Dėl ribinių atvejų žr. „Kodėl priedai gali būti nepridėti“ skiltyje „Naudojimas“.

Privatumo pastaba: Visas apdorojimas vyksta vietoje, programoje Thunderbird. Priedas neatlieka jokių foninių tinklo užklausų.

---
