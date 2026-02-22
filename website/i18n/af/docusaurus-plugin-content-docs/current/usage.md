---
id: usage
title: 'Gebruik'
sidebar_label: 'Gebruik'
---

---

## Gebruik {#usage}

- Antwoord, en die byvoeging voeg oorspronklikes outomaties by — of vra eers, indien in Opsies geaktiveer.
- Ontdubbel volgens lêernaam; S/MIME‑dele word altyd oorgeslaan. Inlynbeelde word standaard in die antwoordliggaam herstel (deaktiveer via "Sluit inlynprente in" in Opsies).
- Aanhegsels op die swartlys word ook oorgeslaan (hoofletterongevoelige glob‑patrone wat by lêername pas, nie paaie nie). Sien [Konfigurasie](configuration#blacklist-glob-patterns).

---

### Wat gebeur wanneer jy antwoord {#what-happens}

- Bespeur antwoord → lys oorspronklike aanhegsels → filtreer S/MIME + inlyn → opsionele bevestiging → voeg kwalifiserende lêers by (slaan duplikate oor) → herstel inlynbeelde in die liggaam.

Streng vs. ontspanne deurloop: Die byvoeging sluit eers S/MIME- en inlyndele uit van lêeraanhegsels. As niks kwalifiseer nie, loop dit ’n ontspanne deurloop wat steeds S/MIME/inlyn uitsluit maar meer gevalle toelaat (sien Koodbesonderhede). Inlynbeelde word nooit as lêeraanhegsels bygevoeg nie; in plaas daarvan, wanneer "Sluit inlynprente in" geaktiveer is (die verstek), word hulle direk in die antwoordliggaam ingebed as base64 data‑URI's.

| Onderdeeltipe                                             |                   Streng deurloop |                Ontspanne deurloop |
| --------------------------------------------------------- | --------------------------------: | --------------------------------: |
| S/MIME-handtekeninglêer `smime.p7s`                       |                        Uitgesluit |                        Uitgesluit |
| S/MIME MIME‑tipes (`application/pkcs7-*`)                 |                        Uitgesluit |                        Uitgesluit |
| Inlynbeeld waarna deur Content‑ID verwys word (`image/*`) | Uitgesluit (in liggaam herstel\*) | Uitgesluit (in liggaam herstel\*) |
| Aangehegte e-pos (`message/rfc822`) met ’n lêernaam       |                  Nie bygevoeg nie |                 Kan bygevoeg word |
| Gewone lêeraanhegsel met ’n lêernaam                      |                 Kan bygevoeg word |                 Kan bygevoeg word |

\* Wanneer "Sluit inlynprente in" geaktiveer is (verstek: AAN), word inlynbeelde in die antwoordliggaam as base64 data‑URI's ingebed eerder as om as lêeraanhegsels bygevoeg te word. Sien [Konfigurasie](configuration#include-inline-pictures).

Voorbeeld: Sommige aanhegsels mag sekere kopvelde ontbreek, maar is steeds gewone lêers (nie inlyn/S/MIME nie). As die streng deurloop geen vind nie, kan die ontspanne deurloop daardie gevalle aanvaar en aanbeg.

---

### Kruisverwysing {#cross-reference}

- Aanstuur word doelbewus nie gewysig nie (sien Beperkings hieronder).
- Vir redes waarom ’n aanhegsel dalk nie bygevoeg word nie, sien “Waarom aanhegsels dalk nie bygevoeg word nie”.

---

## Gedragsbesonderhede {#behavior-details}

- **Voorkoming van duplikate:** Die byvoeging merk die opstel‑oortjie as verwerk deur ’n per‑oortjie sessiewaarde en ’n in‑geheue wag te gebruik. Dit sal nie oorspronklikes twee keer byvoeg nie.
- Om ’n opstelvenster te sluit en weer oop te maak, word as ’n nuwe oortjie behandel (d.w.s. ’n nuwe poging word toegelaat).
- **Respekteer bestaande aanhegsels:** As die opstel reeds aanhegsels bevat, word oorspronklikes steeds presies een keer bygevoeg, en lêername wat reeds bestaan, word oorgeslaan.
- **Uitsluitings:** S/MIME‑artefakte en inlynbeelde word van lêeraanhegsels uitgesluit. As niks op die eerste deurloop kwalifiseer nie, herkontroleer ’n ontspanne terugval nie‑S/MIME‑dele. Inlynbeelde word afsonderlik hanteer: hulle word in die antwoordliggaam as data‑URI's herstel (wanneer geaktiveer).
  - **Lêername:** `smime.p7s`
  - **MIME‑tipes:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Inlynbeelde:** enige `image/*`‑deel waarna deur Content‑ID verwys word — uitgesluit van lêeraanhegsels maar in die antwoordliggaam ingebed wanneer "Sluit inlynprente in" AAN is
  - **Aangehegte e‑posse (`message/rfc822`):** word as gewone aanhegsels behandel indien hulle ’n lêernaam het; hulle kan bygevoeg word (onderhewig aan duplikaatkontroles en swartlys).
- **Swartlyswaarskuwing (indien geaktiveer):** Wanneer kandidate deur jou swartlys uitgesluit word, vertoon die byvoeging ’n klein modale venster wat die betrokke lêers en die ooreenstemmende patroon(ne) lys. Hierdie waarskuwing verskyn ook in gevalle waar geen aanhegsels bygevoeg sal word nie omdat alles uitgesluit is.

---

## Sleutelbordkortpaaie {#keyboard-shortcuts}

- Bevestigingsdialoog: Y/J = Yes, N/Esc = No; Tab/Shift+Tab en Pyltjies siklus deur fokus.
  - Die “Verstekantwoord” in [Konfigurasie](configuration#confirmation) stel die aanvanklik gefokusde knoppie.
  - Enter aktiveer die gefokusde knoppie. Tab/Shift+Tab en pyltjies verskuif fokus vir toeganklikheid.

### Sleutelbord-spiekblad {#keyboard-cheat-sheet}

| Sleutels        | Aksie                              |
| --------------- | ---------------------------------- |
| Y / J           | Bevestig Ja                        |
| N / Esc         | Bevestig Nee                       |
| Enter           | Aktiveer gefokusde knoppie         |
| Tab / Shift+Tab | Skuif fokus vorentoe/agtertoe      |
| Pyltjies        | Skuif fokus tussen knoppies        |
| Verstekantwoord | Stel aanvanklike fokus (Ja of Nee) |

---

## Beperkings {#limitations}

- Aanstuur word nie deur hierdie byvoeging gewysig nie (Antwoord en Antwoord almal word ondersteun).
- Baie groot aanhegsels kan aan Thunderbird‑ of verskafferbeperkings onderhewig wees.
  - Die byvoeging segmenteer of komprimeer nie lêers nie; dit steun op Thunderbird se normale hantering van aanhegsels.
- Geënkripteerde boodskappe: S/MIME‑dele word doelbewus uitgesluit.

---

## Waarom aanhegsels dalk nie bygevoeg word nie {#why-attachments-might-not-be-added}

- Inlynbeelde word nie as lêeraanhegsels bygevoeg nie. Wanneer "Sluit inlynprente in" AAN is (die verstek), word hulle in plaas daarvan in die antwoordliggaam as data‑URI's ingebed. As die instelling AF is, word inlynbeelde volledig verwyder. Sien [Konfigurasie](configuration#include-inline-pictures).
- S/MIME‑handtekeningdele word doelbewus uitgesluit: lêername soos `smime.p7s` en MIME‑tipes soos `application/pkcs7-signature` of `application/pkcs7-mime` word oorgeslaan.
- Swartlys‑patrone kan kandidate filtreer: sien [Konfigurasie](configuration#blacklist-glob-patterns); passing is hoofletterongevoelig en slegs op lêernaam.
- Duplikaat‑lêername word nie weer bygevoeg nie: as die opstel reeds ’n lêer met dieselfde genormaliseerde naam bevat, word dit oorgeslaan.
- Nie‑lêerdeles of ontbrekende lêername: slegs lêeragtige dele met bruikbare lêername word oorweeg om by te voeg.

---

Sien ook

- [Konfigurasie](configuration)
