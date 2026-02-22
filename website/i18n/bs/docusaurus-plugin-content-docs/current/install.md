---
id: install
title: 'Instalacija'
slug: /install
sidebar_label: 'Instalacija'
---

---

## Instalacija putem "Thunderbird dodataka i tema" {#installation-in-thunderbird-recommended}

:::important Minimalna verzija Thunderbirda
Ovaj dodatak podržava Thunderbird **128 ESR ili noviji**. Starije verzije nisu podržane.
:::

Ovo je preporučeni način instalacije. Dodaci instalirani s ATN‑a primaju automatska ažuriranja. LOCAL/dev instalacije se ne ažuriraju automatski.

- Minimalna verzija Thunderbirda: 128 ESR ili noviji.

1. U Thunderbirdu idite na **Alati > Dodaci i teme**.
2. Potražite "reply with attachments".
3. Dodajte dodatak.

Ili otvorite stranicu dodatka direktno: [Thunderbird dodaci (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Ručna instalacija iz XPI {#local-installation-in-thunderbird}

### Preuzmite XPI datoteku {#download-the-xpi-file}

1. Idite na [stranicu dodatka za Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Preuzmite najnoviju verziju dodatka kao XPI datoteku (`reply_with_attachments-x.y.z-tb.xpi`).

### Instalirajte u Thunderbirdu {#install-in-thunderbird-local}

1. Otvorite Thunderbird.
2. Idite na **Alati > Dodaci i teme**.
3. U **Upravitelju dodataka** kliknite ikonu zupčanika u gornjem desnom uglu.
4. Izaberite iz menija **Instaliraj dodatak iz datoteke…**.
5. Odaberite preuzetu datoteku `reply_with_attachments-x.y.z-tb.xpi`.
6. Potvrdite instalaciju kada se to zatraži.

---

## Instalacija za razvoj {#installation-for-development}

### Preuzmite repozitorij {#download-the-repository}

1. Preuzmite najnoviju verziju GitHub repozitorija.
2. Pokrenite `make help` za više informacija.

### Instalirajte u Thunderbirdu {#install-in-thunderbird-dev}

1. Otvorite Thunderbird.
2. Idite na **Alati > Dodaci i teme**.
3. U **Upravitelju dodataka** kliknite ikonu zupčanika u gornjem desnom uglu.
4. Izaberite iz menija **Instaliraj dodatak iz datoteke…**.
5. Odaberite generisanu datoteku `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Potvrdite instalaciju kada se to zatraži.

Napomena: Ako Thunderbird ne prihvata `.zip` na vašem sistemu, preimenujte ga u `.xpi` i pokušajte ponovo s “Instaliraj dodatak iz datoteke…”.

### Gdje pronaći LOCAL ZIP {#where-local-zip}

- Prvo, spakujte dodatak: pokrenite `make pack` u korijenu repozitorija.
- Nakon pakovanja, pronađite “LOCAL” zip u korijenu repozitorija (npr. `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Prije ponovnog pakovanja za testiranje, povećajte verzije i u `sources/manifest_ATN.json` i u `sources/manifest_LOCAL.json`.

---

## Onemogućavanje, deinstalacija i ažuriranja {#disable-uninstall-updates}

- Onemogućavanje: Thunderbird → Alati → Dodaci i teme → pronađite dodatak → isključite prekidač.
- Deinstalacija: isti prikaz → meni s tri tačke → Ukloni.
- Ažuriranja: Instalacije s ATN‑a se automatski ažuriraju kada nove verzije budu odobrene. LOCAL/dev instalacije se ne ažuriraju automatski; ručno ponovo instalirajte novo LOCAL izdanje.
- Potpuno uklonite postavke: pogledajte [Privatnost → Uklanjanje podataka](privacy#data-removal).

Vidi također

- [Brzi početak](quickstart)
