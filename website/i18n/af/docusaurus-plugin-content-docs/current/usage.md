---
id: usage
title: 'Gebruik'
sidebar_label: 'Gebruik'
---

---

## Gebruik {#usage}

- Antwoord, en die byvoeging voeg oorspronklikes outomaties by — of vra eers, indien in Opsies geaktiveer.
- Ontdubbel volgens lêernaam; S/MIME-dele word altyd oorgeslaan. Beelde wat in die oorspronklike boodskap ingebed is, bly in die antwoordliggaam, waar Thunderbird dit plaas, en word nie as lêers gekopieer nie.
- Aanhegsels op die swartlys word ook oorgeslaan (hoofletterongevoelige glob‑patrone wat by lêername pas, nie paaie nie). Sien [Konfigurasie](configuration#blacklist-glob-patterns).

---

### Wat gebeur wanneer jy antwoord {#what-happens}

- Bespeur antwoord → lys die oorspronklike aanhegsels → slaan S/MIME en ingebedde beelde oor → opsionele bevestiging → voeg die geskikte lêers by (duplikate word oorgeslaan).

| Deeltipe                                                      | Na die antwoord gekopieer   |
|---------------------------------------------------------------|----------------------------:|
| S/MIME-handtekeninglêer `smime.p7s`                           | Nee                         |
| S/MIME MIME-tipes (`application/pkcs7-*`)                     | Nee                         |
| Beeld wat die boodskapliggaam by `cid:` inbed                 | Nee (dit is in die liggaam) |
| Beeld gemerk `Content-Disposition: inline`                    | Nee (dit is in die liggaam) |
| Beeld met 'n `Content-ID` waarna die liggaam nooit verwys nie | Ja                          |
| Aangehegte e-pos (`message/rfc822`) met 'n lêernaam           | Ja                          |
| Gewone lêeraanhegsel met 'n lêernaam                          | Ja                          |

'n Beeld tel slegs as ingebed wanneer die oorspronklike boodskap werklik daarna verwys,
of wanneer die sender dit uitdruklik as `Content-Disposition: inline` gemerk het. 'n Blote
`Content-ID`-opskrif is nie genoeg nie: verskeie e-posprogramme plaas een op elke beelddeel,
insluitend werklike aanhegsels, en dié moet steeds gekopieer word.

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
|-----------------|------------------------------------|
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

- Beelde wat die oorspronklike boodskap inbed, word nie as lêers gekopieer nie. Hulle is reeds in die antwoordinhoud, waar Thunderbird hulle geplaas het. Sien [Konfigurasie](configuration#include-inline-pictures).
- S/MIME‑handtekeningdele word doelbewus uitgesluit: lêername soos `smime.p7s` en MIME‑tipes soos `application/pkcs7-signature` of `application/pkcs7-mime` word oorgeslaan.
- Swartlys‑patrone kan kandidate filtreer: sien [Konfigurasie](configuration#blacklist-glob-patterns); passing is hoofletterongevoelig en slegs op lêernaam.
- Duplikaat‑lêername word nie weer bygevoeg nie: as die opstel reeds ’n lêer met dieselfde genormaliseerde naam bevat, word dit oorgeslaan.
- Nie‑lêerdeles of ontbrekende lêername: slegs lêeragtige dele met bruikbare lêername word oorweeg om by te voeg.

---

Sien ook

- [Konfigurasie](configuration)
