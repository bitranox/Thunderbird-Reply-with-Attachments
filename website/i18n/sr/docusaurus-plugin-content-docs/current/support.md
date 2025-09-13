---
id: support
title: 'Podrška'
sidebar_label: 'Podrška'
---

## FAQ {#faq}

### Prilozi nisu dodati — zašto?

- Uključene su slike u liniji i S/MIME delovi.
- Duplikati imena datoteka se preskoče ako već postoji ista datoteka.
- Obrazac za crnu listu može filtrirati kandidate; pogledajte [Konfiguraciju](configuration#blacklist-glob-patterns).

### Mogu li potvrditi pre nego što dodam priloge?

Da. Uključite “Pitaj pre dodavanja priloga” pod [Konfiguracija → Potvrda](configuration#confirmation). Tastatura: Y/J = Da, N/Esc = Ne.

### Da li dodatak šalje bilo kakve podatke ili prati korišćenje?

Ne. Pogledajte [Privatnost](privacy) — bez telemetrije i bez pozadinskih mrežnih zahteva.

### Prosledi ne dodaje priloge — da li je to očekivano?

Da. Samo Odgovori i Odgovori svima su izmenjeni ovim dodatkom; Prosledi ostaje nepromenjen. Pogledajte [Ograničenja](usage#limitations).

### Gde je snooze za donacije?

Opcije → Sekcija za podršku. Pogledajte [Vidljivost donacija](configuration#donation-visibility).

---

## Podrška

Trebate pomoć ili želite da prijavite grešku?

---

### Otvorite problem na GitHub-u:

- Repozitorijum: `bitranox/Thunderbird-Reply-with-Attachments`
- Problemi: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Uključite verziju Thunderbirda (npr., 128 ESR), OS i korake za reprodukciju
- Priložite relevantne logove iz Thunderbirda u Greškovoj konzoli (Alati → Razvojni alati → Greškova konzola)

- Stranica sa dodacima (ATN): Takođe možete ostaviti povratne informacije putem [stranice dodatka](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Saveti

- Osigurajte da ste na podržanoj verziji Thunderbirda (128 ESR ili novijoj).
- Proverite dokumente za Konfiguraciju i Korišćenje za uobičajena pitanja o podešavanju.
- Za razvoj/testiranje, pogledajte Vodič za razvoj.
- Ako se čini da sačuvana podešavanja ne važe ispravno, ponovo pokrenite Thunderbird i pokušajte ponovo. (Thunderbird može keširati stanje između sesija; ponovo pokretanje osigurava da se nova podešavanja učitaju.)
- Minimalno reprodukcija: pokušajte sa malim testnim mailom koji sadrži jednu ili dve jednostavne datoteke kao priloge.
- Uporedite ponašanje sa potvrdom Uključeno naspram Isključeno kako biste suzili da li je dijalog uključen.

---

### Šta uključiti u izveštaj

- Verzija Thunderbirda i OS
- Tačni koraci za reprodukciju (šta ste uradili, šta ste očekivali, šta se desilo)
- Da li je potvrda bila uključena i vaša podrazumevana postavka odgovora
- Uzorak obrazaca vaše crne liste (ako je relevantno)
- Logovi Greške u konzoli prilikom reprodukcije (Alati → Razvojni alati → Greškova konzola)
- Uključite logovanje za debagovanje (opciono):
  - Pokrenite u Greškovoj konzoli Thunderbirda: `messenger.storage.local.set({ debug: true })`
  - Ponovo reprodukujte problem i kopirajte relevantne `[RWA]` linije loga

---

### Šablon za problem (kopiraj/zalepi) {#issue-template}

- Verzija Thunderbirda i OS:
- Koraci za reprodukciju:
- Potvrda uključena? Podrazumevani odgovor:
- Uzorak obrazaca crne liste:
- Logovi Greške u konzoli (Alati → Razvojni alati → Greškova konzola):
- Bilo šta drugo relevantno:

---

### Donirajte

Ako želite da podržite ovaj projekat, razmislite o maloj donaciji na stranici [Donacije](donation). Hvala vam!
