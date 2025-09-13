---
id: support
title: 'Podrška'
sidebar_label: 'Podrška'
---

## FAQ {#faq}

### Privici nisu dodani — zašto?

- Inline slike i S/MIME dijelovi su namjerno isključeni.
- Duplikati imena datoteka se preskoče ako kompozicija već ima istu datoteku.
- Obrasci na crnoj listi mogu filtrirati kandidate; pogledajte [Konfiguraciju](configuration#blacklist-glob-patterns).

### Mogu li potvrditi prije dodavanja privitaka?

Da. Omogućite “Pitaj prije dodavanja privitaka” pod [Konfiguracija → Potvrda](configuration#confirmation). Tastatura: Y/J = Da, N/Esc = Ne.

### Da li dodatak šalje bilo kakve podatke ili prati upotrebu?

Ne. Pogledajte [Privatnost](privacy) — nema telemetrije i nema pozadinskih mrežnih zahtjeva.

### Prosljeđivanje ne dodaje privitke — da li je to očekivano?

Da. Samo Odgovori i Odgovori svima su modificirani ovim dodatkom; Prosljeđivanje ostaje nepromijenjeno. Pogledajte [Ograničenja](usage#limitations).

### Gdje je odgoda Donacije?

Opcije → Sekcija Podrška. Pogledajte [Vidljivost Donacije](configuration#donation-visibility).

---

## Podrška

Treba vam pomoć ili želite prijaviti grešku?

---

### Otvorite problem na GitHub-u:

- Repozitorij: `bitranox/Thunderbird-Reply-with-Attachments`
- Problemi: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Uključite verziju Thunderbirda (npr., 128 ESR), OS, i korake za reprodukciju
- Priložite relevantne logove iz Thunderbirdove Greške konzole (Alati → Razvojni alati → Greška konzola)

- Stranica dodataka (ATN): Također možete ostaviti povratne informacije putem [stranice dodatka](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Savjeti

- Osigurajte da ste na podržanoj verziji Thunderbirda (128 ESR ili novijoj).
- Provjerite dokumente Konfiguracije i Upotrebe za uobičajena pitanja o postavljanju.
- Za razvoj/testiranje, pogledajte Vodič za razvoj.
- Ako se čini da pohranjene postavke ne primjenjuju ispravno, ponovo pokrenite Thunderbird i pokušajte ponovo. (Thunderbird može keširati stanje između sesija; ponovni start osigurava da se učitaju svježe postavke.)
- Minimalna reprodukcija: pokušajte sa malom testnom e-poštom koja sadrži jednu ili dvije jednostavne datoteke kao privitke.
- Uporedite ponašanje sa potvrdom Uključenom vs. Isključenom kako biste suzili da li je dijalog uključen.

---

### Šta uključiti u prijavu

- Verzija Thunderbirda i OS
- Tačni koraci za reprodukciju (šta ste radili, šta ste očekivali, šta se dogodilo)
- Da li je potvrda bila omogućena i vaše podešavanje za podrazumijevani odgovor
- Uzorak vaših obrazaca na crnoj listi (ako je relevantno)
- Logovi Greške konzole tokom reprodukcije (Alati → Razvojni alati → Greška konzola)
- Omogućite logiranje za otklanjanje grešaka (opcionalno):
  - Pokrenite u Thunderbirdovoj Grešci konzoli: `messenger.storage.local.set({ debug: true })`
  - Ponovo reprodukujte problem i kopirajte relevantne `[RWA]` linije loga

---

### Šablon za prijavu (kopiraj/zalijepi) {#issue-template}

- Verzija Thunderbirda i OS:
- Koraci za reprodukciju:
- Da li je potvrda omogućena? Podrazumijevani odgovor:
- Uzorak obrazaca na crnoj listi:
- Logovi Greške konzole (Alati → Razvojni alati → Greška konzola):
- Bilo šta drugo relevantno:

---

### Donirajte

Ako želite podržati ovaj projekat, razmotrite malu donaciju na stranici [Donirajte](donation). Hvala vam!
