---
id: usage
title: 'Naudojimas'
sidebar_label: 'Naudojimas'
---

---

## Naudojimas {#usage}

- Atsakykite ir priedas automatiškai pridės originalus — arba pirmiausia paklaus, jei taip nustatyta Parinktyse.
- Dublikatai šalinami pagal failo pavadinimą; S/MIME dalys visada praleidžiamos. Numatyta, kad įterptieji vaizdai atkuriami atsakymo tekste (galite išjungti per „Include inline pictures“ Parinktyse).
- Juodojo sąrašo priedai taip pat praleidžiami (didžiosiomis/mažosiomis neskiriami glob šablonai, atitinkantys failų pavadinimus, o ne kelius). Žr. [Konfigūracija](configuration#blacklist-glob-patterns).

---

### Kas nutinka atsakant {#what-happens}

- Aptikti atsakymą → išvardyti originalius priedus → filtruoti S/MIME + įterptuosius → neprivalomas patvirtinimas → pridėti tinkamus failus (praleisti dublikatus) → atkurti įterptuosius vaizdus tekste.

Griežtas vs. laisvesnis praėjimas: Priedas pirmiausia iš failų priedų pašalina S/MIME ir įterptąsias dalis. Jei niekas netinka, vykdomas laisvesnis praėjimas, kuris vis dar atmeta S/MIME/įterptuosius, bet toleruoja daugiau atvejų (žr. Kodo detales). Įterptieji vaizdai niekada nepridedami kaip failų priedai; vietoje to, kai įjungta „Include inline pictures“ (numatyta), jie įterpiami tiesiai į atsakymo tekstą kaip base64 duomenų URI.

| Dalies tipas                                                |           Griežtas praėjimas |         Laisvesnis praėjimas |
| ----------------------------------------------------------- | ---------------------------: | ---------------------------: |
| S/MIME parašo failas `smime.p7s`                            |                      Atmesta |                      Atmesta |
| S/MIME MIME tipai (`application/pkcs7-*`)                   |                      Atmesta |                      Atmesta |
| Įterptasis vaizdas, į kurį nurodo Content‑ID (`image/*`)    | Atmesta (atkuriama tekste\*) | Atmesta (atkuriama tekste\*) |
| Pridėtas el. laiškas (`message/rfc822`) su failo pavadinimu |                  Nepridedama |            Gali būti pridėta |
| Įprastas failo priedas su failo pavadinimu                  |            Gali būti pridėta |            Gali būti pridėta |

\* Kai „Include inline pictures“ įjungta (numatyta: ĮJUNGTA), įterptieji vaizdai įterpiami į atsakymo tekstą kaip base64 duomenų URI, o ne pridedami kaip failų priedai. Žr. [Konfigūracija](configuration#include-inline-pictures).

Pavyzdys: Kai kuriems priedams gali trūkti tam tikrų antraščių, bet jie vis tiek yra įprasti failai (ne įterptieji/S/MIME). Jei griežtas praėjimas nieko neranda, laisvesnis praėjimas gali juos priimti ir pridėti.

---

### Kryžminės nuorodos {#cross-reference}

- Persiuntimas pagal sumanymą nėra keičiamas (žr. apribojimus toliau).
- Dėl priežasčių, kodėl priedas gali būti nepridėtas, žr. „Kodėl priedai gali būti nepridėti“.

---

## Veikimo detalės {#behavior-details}

- Dublikatų prevencija: Priedas pažymi rašymo kortelę kaip apdorotą, naudodamas kiekvienai kortelei skirtą sesijos reikšmę ir atmintyje laikomą apsaugą. Originalai nebus pridėti du kartus.
- Rašymo lango uždarymas ir atidarymas laikomas nauja kortele (t. y. leidžiamas naujas bandymas).
- Esamų priedų paisymas: Jei rašomame laiške jau yra priedų, originalai vis tiek pridedami tik vieną kartą, praleidžiant jau egzistuojančius failų pavadinimus.
- Išimtys: S/MIME artefaktai ir įterptieji vaizdai neįtraukiami į failų priedus. Jei per pirmąjį praėjimą niekas netinka, laisvesnis atsarginis tikrinimas dar kartą peržiūri ne S/MIME dalis. Įterptieji vaizdai tvarkomi atskirai: jie atkuriami atsakymo tekste kaip duomenų URI (kai įjungta).
  - Failų pavadinimai: `smime.p7s`
  - MIME tipai: `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - Įterptieji vaizdai: bet kuri `image/*` dalis, į kurią nurodo Content‑ID — neįtraukiama į failų priedus, bet įterpiama į atsakymo tekstą, kai „Include inline pictures“ yra ĮJUNGTA
  - Pridėti el. laiškai (`message/rfc822`): laikomi įprastais priedais, jei turi failo pavadinimą; jie gali būti pridėti (atsižvelgiant į dublikatų patikrą ir juodąjį sąrašą).
- Įspėjimas apie juodąjį sąrašą (jei įjungta): Kai kandidatai atmetami pagal jūsų juodąjį sąrašą,
  priedas parodo mažą modalinį langą su paveiktų failų sąrašu ir atitinkančiais
  šablonais. Šis įspėjimas taip pat rodomas tais atvejais, kai priedai nebus
  pridėti, nes viskas buvo atmesta.

---

## Klaviatūros spartieji klavišai {#keyboard-shortcuts}

- Patvirtinimo dialogas: Y/J = Taip, N/Esc = Ne; Tab/Shift+Tab ir rodyklių klavišai keičia fokusą ratu.
  - „Default answer“ [Konfigūracijoje](configuration#confirmation) nustato pradinį sufokusuotą mygtuką.
  - Enter suaktyvina sufokusuotą mygtuką. Tab/Shift+Tab ir rodyklės perkelia fokusą dėl prieinamumo.

### Klaviatūros atmintinė {#keyboard-cheat-sheet}

| Klavišai           | Veiksmas                              |
| ------------------ | ------------------------------------- |
| Y / J              | Patvirtinti Taip                      |
| N / Esc            | Patvirtinti Ne                        |
| Enter              | Suaktyvinti sufokusuotą mygtuką       |
| Tab / Shift+Tab    | Perkelti fokusą pirmyn/atgal          |
| Rodyklių klavišai  | Perkelti fokusą tarp mygtukų          |
| Numatytoji reikšmė | Nustato pradinį fokusą (Taip arba Ne) |

---

## Apribojimai {#limitations}

- Persiuntimo šis priedas nekeičia (palaikomi Atsakyti ir Atsakyti visiems).
- Labai dideliems priedams gali būti taikomi Thunderbird ar tiekėjo apribojimai.
  - Priedas neskaido ir nesuspaudžia failų; jis remiasi įprastu Thunderbird priedų tvarkymu.
- Šifruoti laiškai: S/MIME dalys sąmoningai neįtraukiamos.

---

## Kodėl priedai gali būti nepridėti {#why-attachments-might-not-be-added}

- Įterptieji vaizdai nepridedami kaip failų priedai. Kai „Include inline pictures“ yra ĮJUNGTA (numatyta), jie įterpiami į atsakymo tekstą kaip duomenų URI. Jei nustatymas IŠJUNGTA, įterptieji vaizdai visiškai pašalinami. Žr. [Konfigūracija](configuration#include-inline-pictures).
- S/MIME parašo dalys pagal sumanymą neįtraukiamos: tokie failų pavadinimai kaip `smime.p7s` ir tokie MIME tipai kaip `application/pkcs7-signature` ar `application/pkcs7-mime` praleidžiami.
- Juodojo sąrašo šablonai gali filtruoti kandidatus: žr. [Konfigūracija](configuration#blacklist-glob-patterns); atitikimas neskiria didžiųjų/mažųjų ir taikomas tik failo pavadinimui.
- Pasikartojantys failų pavadinimai neperpridedami: jei rašomame laiške jau yra failas tuo pačiu normalizuotu pavadinimu, jis praleidžiamas.
- Ne failo dalys arba trūkstami failų pavadinimai: pridėjimui svarstomos tik į failus panašios dalys su tinkamais failų pavadinimais.

---

Taip pat žiūrėkite

- [Konfigūracija](configuration)
