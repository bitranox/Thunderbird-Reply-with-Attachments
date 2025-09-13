---
id: support
title: 'Podrška'
sidebar_label: 'Podrška'
---

## FAQ {#faq}

### Prilozi nisu dodani — zašto?

- Uključene slike i S/MIME dijelovi su namjerno isključeni.
- Duplikat imena datoteka se preskoči ako je sastav već imao istu datoteku.
- Obrazac na crnoj listi može filtrirati kandidate; pogledajte [Konfiguraciju](configuration#blacklist-glob-patterns).

### Mogu li potvrditi prije dodavanja priloga?

Da. Omogućite "Pitaj prije dodavanja priloga" pod [Konfiguracija → Potvrda](configuration#confirmation). Tipkovnica: Y/J = Da, N/Esc = Ne.

### Da li dodatak šalje bilo kakve podatke ili prati korištenje?

Ne. Pogledajte [Privatnost](privacy) — nema telemetrije i nema pozadinskih mrežnih zahtjeva.

### Proslijedi ne dodaje priloge — je li to očekivano?

Da. Samo Odgovori i Odgovori svima su modificirani ovim dodatkom; Proslijedi ostaje nepromijenjeno. Pogledajte [Ograničenja](usage#limitations).

### Gdje se nalazi donacija za odgodu?

Opcije → Sekcija podrške. Pogledajte [Vidljivost donacija](configuration#donation-visibility).

---

## Podrška

Trebate pomoć ili želite prijaviti grešku?

---

### Otvorite temu na GitHub-u:

- Repozitorij: `bitranox/Thunderbird-Reply-with-Attachments`
- Problemi: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Uključite verziju Thunderbirda (npr. 128 ESR), OS i korake za reprodukciju
- Priložite relevantne logove iz Thunderbirdu" Error Console (Alati → Alati za razvoj → Error Console)

- Web stranica dodataka (ATN): Također možete ostaviti povratne informacije putem [stranice dodatka](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Savjeti

- Osigurajte da ste na podržanoj verziji Thunderbirda (128 ESR ili novijoj).
- Provjerite dokumentaciju o konfiguraciji i korištenju za uobičajena pitanja o postavkama.
- Za razvoj/testiranje, pogledajte Vodič za razvoj.
- Ako spremljene postavke ne primjenjuju ispravno, ponovo pokrenite Thunderbird i pokušajte ponovno. (Thunderbird može spremiti stanje između sesija; ponovni pokretanje osigurava da su nove postavke učitane.)
- Minimalno reprodukcija: pokušajte s malom testnom porukom koja sadrži jedan ili dva jednostavna privitka.
- Usporedite ponašanje s potvrdom ON naspram OFF da biste suzili da li je tok dijaloga uključen.

---

### Što uključiti u izvještaj

- Verzija Thunderbirda i OS
- Točni koraci za reprodukciju (što ste učinili, što ste očekivali, što se dogodilo)
- Da li je potvrda bila omogućena i vaša zadana postavka odgovora
- Uzorak vaših obrazaca na crnoj listi (ako je relevantno)
- Logovi Error Console prilikom reprodukcije (Alati → Alati za razvoj → Error Console)
- Omogućite debug logiranje (opcionalno):
  - Izvršite u Thunderbirdu" Error Console: `messenger.storage.local.set({ debug: true })`
  - Reproducirajte problem i kopirajte relevantne `[RWA]` log linije

---

### Predložak za prijavu (kopiraj/zalijepi) {#issue-template}

- Verzija Thunderbirda i OS:
- Koraci za reprodukciju:
- Omogućena potvrda? Zadani odgovor:
- Uzorak obrazaca na crnoj listi:
- Logovi Error Console (Alati → Alati za razvoj → Error Console):
- Bilo što drugo relevantno:

---

### Donirajte

Ako želite podržati ovaj projekt, molimo vas da razmotrite malu donaciju na stranici [Donirajte](donation). Hvala!
