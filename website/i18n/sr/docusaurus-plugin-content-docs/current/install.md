---
id: install
title: 'Instalacija'
slug: /install
sidebar_label: 'Инсталација'
---

---

## Instalacija putem "Thunderbird dodataka i tema" {#installation-in-thunderbird-recommended}

:::important Minimalna verzija Thunderbirda
Ovaj dodatak podržava Thunderbird 128 ESR ili noviji. Starije verzije nisu podržane.
:::

Ovo je preporučeni način instalacije. Dodaci instalirani sa ATN (addons.thunderbird.net) dobijaju automatska ažuriranja. LOCAL/dev instalacije se ne ažuriraju automatski.

- Minimalna verzija Thunderbirda: 128 ESR ili novija.

1. U Thunderbirdu idite na **Alatke > Dodaci i teme**.
2. Potražite "reply with attachments".
3. Dodajte dodatak.

Ili otvorite stranicu dodatka direktno: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Ručna instalacija iz XPI {#local-installation-in-thunderbird}

### Preuzmite XPI datoteku {#download-the-xpi-file}

1. Idite na [Thunderbird stranicu dodatka](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Preuzmite najnoviju verziju dodatka kao XPI datoteku (`reply_with_attachments-x.y.z-tb.xpi`).

### Instalirajte u Thunderbird {#install-in-thunderbird-local}

1. Otvorite Thunderbird.
2. Idite na **Alatke > Dodaci i teme**.
3. U **Menedžeru dodataka** kliknite ikonu zupčanika u gornjem desnom uglu.
4. Izaberite **Instaliraj dodatak iz datoteke…** iz menija.
5. Izaberite preuzetu datoteku `reply_with_attachments-x.y.z-tb.xpi`.
6. Potvrdite instalaciju kada se to zatraži.

---

## Instalacija za razvoj {#installation-for-development}

### Preuzmite repozitorijum {#download-the-repository}

1. Preuzmite najnoviju verziju GitHub repozitorijuma.
2. Pokrenite `make help` za više informacija.

### Instalirajte u Thunderbird {#install-in-thunderbird-dev}

1. Otvorite Thunderbird.
2. Idite na **Alatke > Dodaci i teme**.
3. U **Menedžeru dodataka** kliknite ikonu zupčanika u gornjem desnom uglu.
4. Izaberite **Instaliraj dodatak iz datoteke…** iz menija.
5. Izaberite generisanu datoteku `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Potvrdite instalaciju kada se to zatraži.

Napomena: Ako Thunderbird ne prihvati `.zip` na vašem sistemu, preimenujte ga u `.xpi` i pokušajte ponovo „Instaliraj dodatak iz datoteke…“.

### Gde se nalazi LOCAL ZIP {#where-local-zip}

- Najpre spakujte dodatak: pokrenite `make pack` u korenu repozitorijuma.
- Nakon pakovanja, pronađite „LOCAL“ zip u korenu repozitorijuma (npr. `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Pre ponovnog pakovanja za testiranje, povećajte brojeve verzija i u `sources/manifest_ATN.json` i u `sources/manifest_LOCAL.json`.

---

## Onemogućavanje, deinstalacija i ažuriranja {#disable-uninstall-updates}

- Onemogućavanje: Thunderbird → Alatke → Dodaci i teme → pronađite dodatak → isključite prekidač.
- Deinstalacija: isti prikaz → meni sa tri tačke → Ukloni.
- Ažuriranja: ATN instalacije se automatski ažuriraju kada nove verzije budu odobrene. LOCAL/dev instalacije se ne ažuriraju automatski; ručno ponovo instalirajte novi LOCAL build.
- Potpuno uklanjanje podešavanja: pogledajte [Privatnost → Uklanjanje podataka](privacy#data-removal).

Pogledajte i

- [Brzi početak](quickstart)
