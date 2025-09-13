---
id: support
title: 'Pagalba'
sidebar_label: 'Pagalba'
---

## FAQ {#faq}

### Prikabinti failai nebuvo pridėti — kodėl?

- Inline paveikslėliai ir S/MIME dalys yra sąmoningai neįtraukiamos.
- Dubliuojami failų pavadinimai yra praleidžiami, jei sudaryti jau turi tą patį failą.
- Juodųjų sąrašų šablonai gali filtruoti kandidatus; žr. [Konfigūracija](configuration#blacklist-glob-patterns).

### Ar galiu patvirtinti prieš pridėdamas priedus?

Taip. Įjunkite „Klausyti prieš pridėdami priedus“ po [Konfigūracija → Patvirtinimas](configuration#confirmation). Klaviatūra: Y/J = Taip, N/Esc = Ne.

### Ar priedas siunčia kokius nors duomenis arba seka naudojimą?

Ne. Žr. [Privatumas](privacy) — jokių telemetrijos duomenų ir jokių fono tinklo užklausų.

### Persiunčiant neįtraukiami priedai — ar tai tikėtina?

Taip. Tik Atsakyti ir Atsakyti visiems yra modifikuoti šio priedo; Persiųsti paliekama nepakitusi. Žr. [Apribojimai](usage#limitations).

### Kur yra Aukoti funkcija?

Parinktys → Pagalbos skyrius. Žr. [Aukojimo matomumą](configuration#donation-visibility).

---

## Pagalba

Reikia pagalbos arba norite pranešti apie klaidą?

---

### Atidarykite problemą GitHub:

- Saugykla: `bitranox/Thunderbird-Reply-with-Attachments`
- Problemos: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Įtraukite Thunderbird versiją (pvz., 128 ESR), OS ir veiksmus, kaip atkurti
- Prikabinkite atitinkamus žurnalus iš Thunderbird Klaidų konsolės (Įrankiai → Kūrėjų įrankiai → Klaidų konsolė)

- Pridėjimų svetainė (ATN): taip pat galite palikti atsiliepimų per [priedo puslapį](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Patarimai

- Įsitikinkite, kad esate naudojamoje Thunderbird versijoje (128 ESR ar naujesnėje).
- Patikrinkite Konfigūracijos ir Naudojimo dokumentus dėl dažniausiai pasitaikančių konfigūracijos klausimų.
- Kūrimo/bandomosios veiklos atveju, žr. Kūrimo gaires.
- Jei saugomi nustatymai atrodo, kad netaikomi tinkamai, perkraukite Thunderbird ir pabandykite dar kartą. (Thunderbird gali talpinti būseną tarp sesijų; perkrovimas užtikrina, kad būtų įkelti nauji nustatymai.)
- Minimalus reprodukavimas: pabandykite su mažu bandomuoju el. laišku, kuriame yra vienas ar du paprasti failų priedai.
- Palyginkite elgesį su patvirtinimu ĮJUNGTU ir IŠJUNGTU, kad sužinotumėte, ar dialogo srautas yra susijęs.

---

### Ką įtraukti į ataskaitą

- Thunderbird versija ir OS
- Tikslūs žingsniai, kaip atkurti (ką padarėte, ko tikėjotės, kas įvyko)
- Ar patvirtinimas buvo įjungtas ir jūsų numatyto atsakymo nustatymas
- Jūsų juodųjų sąrašų šablonų pavyzdys (jei aktualu)
- Klaidos konsolės žurnalai reprodukuojant (Įrankiai → Kūrėjų įrankiai → Klaidų konsolė)
- Įjunkite debug žurnalaus rašymą (pasirinktinai):
  - Paleiskite Thunderbird Klaidų konsolėje: `messenger.storage.local.set({ debug: true })`
  - Atkurkite problemą ir nukopijuokite atitinkamus `[RWA]` žurnalo įrašus

---

### Problemos šablonas (kopijuoti/įklijuoti) {#issue-template}

- Thunderbird versija ir OS:
- Žingsniai, kaip atkurti:
- Ar patvirtinimas įjungtas? Numatytojo atsakymo nustatymas:
- Juodųjų sąrašų pavyzdžiai:
- Klaidos konsolės žurnalai (Įrankiai → Kūrėjų įrankiai → Klaidų konsolė):
- Ar yra kažkas dar svarbaus:

---

### Aukoti

Jei norėtumėte paremti šį projektą, prašome apsvarstyti galimybę prisidėti mažai suma pagal [Aukokite](donation) puslapį. Ačiū!
