---
id: configuration
title: 'Konfigūracija'
---

## Konfigūracija

Terminologijos pastaba: žr. [Žodyną](glossary) nuosekliems terminams, naudojamiems UI ir dokumentuose.

---

## Atidaryti parinktis Thunderbird {#open-options-in-thunderbird}

- Thunderbird → Įrankiai → Papildiniai ir temos → rasti „Atsakyti su priedais“ → Nustatymai/Parinktys

---

### Nustatymai {#settings}

#### Patvirtinimas {#confirmation}

- Perjungti „Klausti prieš pridedant priedus“
- Numatyta atsakymo: Taip arba Ne (dėmesio ir klaviatūros numatyta)
- Klaviatūra: Y/J = Taip; N/Esc = Ne; Tab/Shift+Tab ir rodyklių klavišai cikliškai keičia dėmesį
  - Žr. klaviatūros detales [Naudojime](usage#keyboard-shortcuts).

---

#### Juodoji lista (glob modeliai) {#blacklist-glob-patterns}

Juodajai liste esantys failai automatiškai nebus pridėti atsakant. Taip pat žr. [Žodyną](glossary) „Juodoji lista (išskyrimo sąrašas)“.

- Vienas modelis vienoje eilutėje; nediskriminacinis; failo pavadinimo atitikimas
- Pavyzdžiai: `*intern*`, `*secret*`, `*passwor*`
- Palaikomi glob simboliai: `*` (bet kurie simboliai, išskyrus `/`), `?` (vienas simbolis), simbolių klasės tokios kaip `[abc]`. Naudokite `\[`, kad atitiktų literalų `[`. Takai (`**/`) ignoruojami, kadangi traukiami tik failų pavadinimai.
- Nepalaikoma: neigimas (`!`), skliaustelių išplėtimas (`{..}`) ir sudėtingos intervalų schemos. Laikykite modelius paprastus.
- Komentarai modeliuose nėra palaikomi. Nepateikite `#` ar įterptinių komentarų; įveskite tik modelio tekstą kiekvienoje eilutėje.

---

##### Modelių kulinarinis vadovas {#pattern-cookbook}

- Atitikti bet kurį PDF: `*.pdf`
- Atitikti failus, prasidedančius „scan“: `scan*`
- Simbolių klasė: `report[0-9].txt`
- Išspręsti literalų `[`: `\[` (naudinga, kai atitinka skliaustą kaip simbolį)

---

##### Pastabos {#blacklist-notes}

- Tvarka neturi reikšmės; pirmas/bet kuris atitikimas išskiria failą.
- Atitikimas yra tik failo pavadinimo (takai/katalogai ignoruojami).
- „Atkurti numatytuosius nustatymus“ atkuria rekomenduojamus modelius ir juodosios listos įspėjimo perjungimą.
- Kodėl pavyzdys `*passwor*`? Jis atitinka tiek „password“, tiek „Passwort“ šeimas.
- Prioritetas: jei bet kuris modelis atitinka failo pavadinimą, failas yra išskiriamas (pirmas/bet kuris atitikimas — tvarka nekeičia rezultato).
- Patarimas — išbandykite savo modelį: pridėkite laikino modelio, atsakykite į žinutę, kurioje yra failas su atitinkančiu pavadinimu, ir patikrinkite, ar jis išskirtas įspėjimo sąraše.

##### Greita išbandykite (saugus bandymas) {#blacklist-try-it}

1. Atidarykite Parinktis → Juodoji lista.
2. Pridėkite laikino modelio, tokio kaip `*.tmp`, ir spustelėkite Išsaugoti.
3. Atsakykite į testinį laišką, kuriame yra failas, baigiasi `.tmp` — failas turėtų pasirodyti įspėjimo sąraše ir neturėtų būti prijungtas.
4. Pašalinkite laikino modelio, kai baigsite, arba spustelėkite „Atkurti numatytuosius nustatymus“.

---

#### Įspėjimas dėl išskirtų priedų {#warning-on-excluded-attachments}

- Perjungti „Įspėti, jei priedai yra išskirti juodojoje listoje“ (numatyta: ĮJUNGTA).
- Kai įjungta, mažame modaliniame lange pateikiami išskirti failai ir atitinkami modeliai. Įspėjimas taip pat pasirodo, kai niekas nebus pridėta, nes visi kandidatai buvo juodai įrašyti.

---

#### Išsaugokite savo nustatymus {#save-your-settings}

Nustatymai išsaugomi paspaudus Išsaugoti mygtuką. Galite rankiniu būdu grąžinti atskirus laukus arba atkurti numatytuosius nustatymus, jei reikia.

Jei išsaugoti nustatymai atrodo, kad neaktualizuojami, perkraukite Thunderbird ir bandykite dar kartą. (Thunderbird gali saugoti būseną tarp sesijų; perkrovimas užtikrina, kad būtų įkelti nauji nustatymai.)

Patarimas: kad patikslintumėte, ar jūsų nustatymai įsigaliojo, atsakykite į bet kurią žinutę su priedu ir patikrinkite patvirtinimo arba juodosios listos įspėjimą.

---

#### Aukos matomumas (90 dienų atidėjimas) {#donation-visibility}

Papildinys apima patogią funkciją, leidžiančią paslėpti aukų užklausas kurį laiką po to, kai paaukojote.

Kur jį rasti

- Parinktys → Pagalbos skyrius: pamatysite mygtuką „Aš paaukojau“ ir mažą užuominų sritį.
- Išsiuntimo patvirtinimo dialoge taip pat rodomas mygtukas Donate; jis automatiškai paslepia, kai atidėjimas yra aktyvus.

Kaip tai veikia

- Paspaudus „Aš paaukojau“, paslepia aukų mygtukus ir su jomis susijusius klausimus 90 dienų.
- Būsenos užuomina rodo „Paslėpta iki YYYY‑MM‑DD“ (jūsų vietos data). Taip pat yra mygtukas „Rodyti aukojimą vėl“, kad iš karto atkurtumėte matomumą.
- Po 90 dienų, Donate mygtukas automatiškai vėl tampa matomas.

Privatumas ir saugojimas

- Papildinys saugo vieną laiko žymę Thunderbird vietinėje saugykloje, kad prisimintų atidėjimo laikotarpį. Raktas: `donateHideUntil` (epoch milisekundžių).
- Šis nustatymas yra lokalus jūsų Thunderbird profiliui (nesinchronizuojamas debesyje). Ši funkcija nesukelia jokių tinklo užklausų.

Problemos sprendimas

- Jei Donate vis dar matomas iškart po to, kai paspaudėte „Aš paaukojau“, palaukite šiek tiek arba pakartotinai atidarykite Parinkčių puslapį; sąsaja atnaujinama, kai tik nustatymas yra išsaugotas.
- Norėdami atkurti rankiniu būdu, spustelėkite „Rodyti aukojimą vėl“. Taip pat galite palaukti, kol praeis data, nurodyta užuominoje.

Ši funkcija yra grynai patogumo labui; ji niekada neužblokuoja papildinio funkcionalumo ir nerenka jokių asmeninių duomenų.

---

### Failo pavadinimo normalizavimas (duplicatų prevencija) {#filename-normalization-duplicates-prevention}

Kad elgtųsi nuosekliai visose platformose, failo pavadinimai normalizuojami prieš dukto patikrinimus:

- Unicode yra normalizuojamas į NFC.
- Pavadinimai yra požiūrio (mažintos).
- Galuose esantys taškai/erdvės yra nupjaunami (Windows draugiškumui).

Tai garantuoja, kad dukto aptikimas yra prognozuojamas pavadinimams kaip `café.pdf` vs `café.pdf` (NFD) arba `FILE.txt.` vs `file.txt`.

---

## Patvirtinimo elgsena {#confirmation-behavior}

- „Numatyta atsakymo“ nustato iš pradžių spustelėto mygtuko patvirtinimo dialoge (naudinga klaviatūros naudotojams).
- Veikia tiek „Atsakyti“, tiek „Atsakyti visiems“. „Peradresuoti“ šis papildinys nepakelia.

---

## Pažangus: dukto aptikimas {#advanced-duplicate-detection}

Dukto prevencija yra įgyvendinta pagal sudarymo skirtuką ir failo pavadinimą. Žr. [Naudojime](usage#behavior-details) išsamesniam paaiškinimui.

---

Žr. taip pat

- [Teisės](permissions)
- [Privatumas](privacy)
