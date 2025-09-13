---
id: install
title: 'Instalacija'
slug: /install
sidebar_label: 'Instalacija'
---

## Instalacija putem "Thunderbird dodataka i tema" {#installation-in-thunderbird-recommended}

:::important Minimalna verzija Thunderbirda
Ovaj dodatak podržava Thunderbird **128 ESR ili noviji**. Starije verzije nisu podržane.
:::

Ovo je preporučena metoda instalacije. Dodaci instalirani iz ATN (addons.thunderbird.net) primaju automatske nadogradnje. LOCAL/dev instalacije se ne nadograđuju automatski.

- Minimalna verzija Thunderbirda: 128 ESR ili noviji.

1. U Thunderbirdu, idite na **Alati > Dodaci i teme**.
2. Potražite "odgovori sa prilozima".
3. Dodajte dodatak.

Ili otvorite stranicu dodatka direktno: [Thunderbird dodaci (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Ručna instalacija iz XPI {#local-installation-in-thunderbird}

### Preuzmite XPI datoteku {#download-the-xpi-file}

1. Idite na [stranicu Thunderbirda](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Preuzmite najnoviju verziju dodatka kao XPI datoteku (`reply_with_attachments-x.y.z-tb.xpi`).

### Instalirajte u Thunderbird {#install-in-thunderbird-local}

1. Otvorite Thunderbird.
2. Idite na **Alati > Dodaci i teme**.
3. U **Upravljaču dodacima**, kliknite na ikonu zupčanika u gornjem desnom uglu.
4. Izaberite **Instaliraj dodatak iz datoteke…** iz menija.
5. Odaberite preuzetu `reply_with_attachments-x.y.z-tb.xpi` datoteku.
6. Potvrdite instalaciju kada se to zatraži.

---

## Instalacija za razvoj {#installation-for-development}

### Preuzmite repozitorij {#download-the-repository}

1. Preuzmite najnoviju verziju GitHub repozitorijuma.
2. Pokrenite `make help` za više informacija.

### Instalirajte u Thunderbird {#install-in-thunderbird-dev}

1. Otvorite Thunderbird.
2. Idite na **Alati > Dodaci i teme**.
3. U **Upravljaču dodacima**, kliknite na ikonu zupčanika u gornjem desnom uglu.
4. Izaberite **Instaliraj dodatak iz datoteke…** iz menija.
5. Odaberite generisanu datoteku `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Potvrdite instalaciju kada se to zatraži.

Napomena: Ako Thunderbird ne prihvata `.zip` na vašem sistemu, preimenujte ga u `.xpi` i ponovo pokušajte "Instaliraj dodatak iz datoteke…".

### Gde pronaći LOCAL ZIP {#where-local-zip}

- Prvo, spakujte dodatak: pokrenite `make pack` u korenu repozitorijuma.
- Nakon pakovanja, pronađite "LOCAL" zip u korenu repozitorijuma (npr., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Pre ponovnog pakovanja za testiranje, povećajte verzije u `sources/manifest_ATN.json` i `sources/manifest_LOCAL.json`.

---

## Onemogući, deinstaliraj i nadogradnje {#disable-uninstall-updates}

- Onemogući: Thunderbird → Alati → Dodaci i teme → pronađite dodatak → isključite.
- Deinstaliraj: ista stranica → meni sa tri tačke → Ukloni.
- Nadogradnje: ATN instalacije se automatski nadograđuju kada su nove verzije odobrene. LOCAL/dev instalacije ne nadograđuju se automatski; ponovo instalirajte novu LOCAL verziju ručno.
- Potpuno uklonite postavke: pogledajte [Privatnost → Uklanjanje podataka](privacy#data-removal).

Pogledajte i

- [Brzi start](quickstart)
