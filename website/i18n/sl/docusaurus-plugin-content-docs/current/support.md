---
id: support
title: 'Podpora'
sidebar_label: 'Podpora'
---

## FAQ {#faq}

### Priloge niso bile dodane — zakaj?

- Vse slike in S/MIME deli so načrtno izključeni.
- Podvojena imena datotek so preskočena, če ima sestava že isto datoteko.
- Seznam črnih vzorcev lahko filtrira kandidate; glej [Konfiguracijo](configuration#blacklist-glob-patterns).

### Ali lahko potrdim pred dodajanjem prilog?

Da. Omogočite „Vprašaj pred dodajanjem prilog“ pod [Konfiguracija → Potrditev](configuration#confirmation). Tipkovnica: Y/J = Da, N/Esc = Ne.

### Ali dodatek pošilja kakšne podatke ali sledi uporabi?

Ne. Glej [Zasebnost](privacy) — brez telemetrije in brez zahtevkov v ozadju.

### Posredovanje ne doda prilog — je to pričakovano?

Da. Le Odgovori in Odgovori vsem sta spremenjena s tem dodatkom; Posredovanje ostaja nespremenjeno. Glej [Omejitve](usage#limitations).

### Kje je funkcija 'Darovanje' v snooze?

Možnosti → Oddelek Podpora. Glej [Vidnost donacij](configuration#donation-visibility).

---

## Podpora

Potrebujete pomoč ali želite prijaviti napako?

---

### Odprite težavo na GitHubu:

- Repozitorij: `bitranox/Thunderbird-Reply-with-Attachments`
- Težave: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Vključite različico Thunderbirda (npr., 128 ESR), operacijski sistem in korake za reproduciranje
- Priložite ustrezne dnevnike iz napake Thunderbirda (Orodja → Orodja za razvijalce → Konzola napak)

- Stran dodatkov (ATN): Povratne informacije lahko pustite tudi preko [strani dodatka](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Nasveti

- Prepričajte se, da ste na podprti različici Thunderbirda (128 ESR ali novejši).
- Preverite dokumente o konfiguraciji in uporabi za pogosta vprašanja o nastavitvah.
- Za razvoj/testiranje si oglejte razvojnega vodnika.
- Če shranjene nastavitve ne delujejo pravilno, znova zaženite Thunderbird in poskusite znova. (Thunderbird lahko predpomni stanje med sejami; ponovni zagon zagotovi, da so naložene sveže nastavitve.)
- Minimalna reprodukcija: poskusite z majhnim testnim sporočilom, ki vsebuje eno ali dve preprosti datoteki za prilogo.
- Primerjajte vedenje s potrdilom ON proti OFF, da natančno ugotovite, ali je vključen potek dialoga.

---

### Kaj vključiti v poročilo

- Različico Thunderbirda in operacijski sistem
- Natančne korake za reproduciranje (kar ste storili, kar ste pričakovali, kar se je zgodilo)
- Ali je bilo potrditev omogočeno in vaša privzeta nastavitev odgovora
- Vzorec vaših črnih vzorcev (če relevantno)
- Dnevniki konzole napak med reproduciranjem (Orodja → Orodja za razvijalce → Konzola napak)
- Omogočite sledenje napakam (opcijsko):
  - Zaženite v konzoli napak Thunderbirda: `messenger.storage.local.set({ debug: true })`
  - Reproducirajte težavo in kopirajte ustrezne vrstice dnevnika `[RWA]`

---

### Predloga za težavo (kopiraj/prilepi) {#issue-template}

- Različica Thunderbirda in operacijski sistem:
- Koraki za reproduciranje:
- Potrditev omogočena? Privzeti odgovor:
- Vzorec črnih vzorcev:
- Dnevniki konzole napak (Orodja → Orodja za razvijalce → Konzola napak):
- Kakršne koli druge relevantne informacije:

---

### Donacija

Če želite podpreti ta projekt, razmislite o majhni prispevku na strani [Donacija](donation). Hvala!
