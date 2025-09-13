---
id: install
title: 'Instalacija'
slug: /install
sidebar_label: 'Instalacija'
---

## Instalacija putem "Thunderbird dodataka i tema" {#installation-in-thunderbird-recommended}

:::important Minimalna verzija Thunderbirda
Ovaj dodatak podržava Thunderbird **128 ESR ili noviji**. Starije verzije se ne podržavaju.
:::

Ovo je preporučena metoda instalacije. Dodatci instalirani iz ATN (addons.thunderbird.net) primaju automatska ažuriranja. LOKAL/dev instalacije se ne ažuriraju automatski.

- Minimalna verzija Thunderbirda: 128 ESR ili noviji.

1. U Thunderbirdu, idite na **Alati > Dodaci i teme**.
2. Pretražite "odgovori s prilozima".
3. Dodajte dodatak.

Ili otvorite stranicu dodatka izravno: [Thunderbird dodaci (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Ručna instalacija iz XPI {#local-installation-in-thunderbird}

### Preuzmite XPI datoteku {#download-the-xpi-file}

1. Idite na [stranicu dodatka Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Preuzmite najnoviju verziju dodatka kao XPI datoteku (`reply_with_attachments-x.y.z-tb.xpi`).

### Instalirajte u Thunderbird {#install-in-thunderbird-local}

1. Otvorite Thunderbird.
2. Idite na **Alati > Dodaci i teme**.
3. U **Upravitelju dodataka**, kliknite na ikonu zupčanika u gornjem desnom kutu.
4. Odaberite **Instaliraj dodatak iz datoteke…** iz izbornika.
5. Odaberite preuzetu `reply_with_attachments-x.y.z-tb.xpi` datoteku.
6. Potvrdite instalaciju kada se zatraži.

---

## Instalacija za razvoj {#installation-for-development}

### Preuzmite repozitorij {#download-the-repository}

1. Preuzmite najnoviju verziju GitHub repozitorija.
2. Pokrenite `make help` za više informacija.

### Instalirajte u Thunderbird {#install-in-thunderbird-dev}

1. Otvorite Thunderbird.
2. Idite na **Alati > Dodaci i teme**.
3. U **Upravitelju dodataka**, kliknite na ikonu zupčanika u gornjem desnom kutu.
4. Odaberite **Instaliraj dodatak iz datoteke…** iz izbornika.
5. Odaberite generiranu datoteku `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Potvrdite instalaciju kada se zatraži.

Napomena: Ako Thunderbird ne prihvaća `.zip` na vašem sustavu, preimenujte ga u `.xpi` i pokušajte ponovno s "Instaliraj dodatak iz datoteke…".

### Gdje pronaći LOKAL ZIP {#where-local-zip}

- Prvo, pakirajte dodatak: pokrenite `make pack` u korijenu repozitorija.
- Nakon pakiranja, pronađite "LOKAL" zip u korijenu repozitorija (npr., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Prije ponovnog pakiranja za testiranje, povećajte verzije u `sources/manifest_ATN.json` i `sources/manifest_LOCAL.json`.

---

## Onemogući, deinstaliraj i ažuriranja {#disable-uninstall-updates}

- Onemogućiti: Thunderbird → Alati → Dodaci i teme → pronađite dodatak → isključite.
- Deinstalirati: ista stranica → izbornik s tri točke → Ukloni.
- Ažuriranja: ATN instalacije automatski se ažuriraju kada su nove verzije odobrene. LOKAL/dev instalacije se ne ažuriraju automatski; ručno ponovno instalirajte novu LOKAL izgradnju.
- Uklonite podešavanja potpuno: pogledajte [Privatnost → Uklanjanje podataka](privacy#data-removal).

Pogledajte također

- [Brzi početak](quickstart)
