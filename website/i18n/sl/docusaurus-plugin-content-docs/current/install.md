---
id: install
title: 'Namestitev'
slug: /install
sidebar_label: 'Namestitev'
---

## Namestitev preko "Thunderbird Razširitev in Tem" {#installation-in-thunderbird-recommended}

:::important Minimalna različica Thunderbirda
Ta razširitev podpira Thunderbird **128 ESR ali novejšo**. Starejše različice niso podprte.
:::

To je priporočena metoda namestitve. Razširitve nameščene iz ATN (addons.thunderbird.net) prejemajo samodejna posodobitve. LOCAL/dev namestitve se ne posodabljajo samodejno.

- Minimalna različica Thunderbirda: 128 ESR ali novejša.

1. V Thunderbirdu pojdite na **Orodja > Razširitve in Temi**.
2. Iščite "odgovori z priponkami".
3. Dodajte razširitev.

Ali odprite stran razširitve neposredno: [Thunderbird Razširitve (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Ročna namestitev iz XPI {#local-installation-in-thunderbird}

### Prenesi XPI datoteko {#download-the-xpi-file}

1. Pojdite na [Thunderbird stran z Razširitvami](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Prenesite najnovejšo različico razširitve kot XPI datoteko (`reply_with_attachments-x.y.z-tb.xpi`).

### Namestitev v Thunderbird {#install-in-thunderbird-local}

1. Odprite Thunderbird.
2. Pojdite na **Orodja > Razširitve in Temi**.
3. V **Upravitelju Razširitev** kliknite ikono zobnika v zgornjem desnem kotu.
4. Izberite **Namesti razširitev iz datoteke…** iz menija.
5. Izberite preneseno datoteko `reply_with_attachments-x.y.z-tb.xpi`.
6. Potrdite namestitev, ko vas pozove.

---

## Namestitev za razvoj {#installation-for-development}

### Prenesite repozitorij {#download-the-repository}

1. Prenesite najnovejšo različico GitHub repozitorija.
2. Za več informacij zaženite `make help`.

### Namestitev v Thunderbird {#install-in-thunderbird-dev}

1. Odprite Thunderbird.
2. Pojdite na **Orodja > Razširitve in Temi**.
3. V **Upravitelju Razširitev** kliknite ikono zobnika v zgornjem desnem kotu.
4. Izberite **Namesti razširitev iz datoteke…** iz menija.
5. Izberite ustvarjeno datoteko `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Potrdite namestitev, ko vas pozove.

Opomba: Če Thunderbird ne sprejme `.zip` na vašem sistemu, ga preimenujte v `.xpi` in poskusite “Namesti razširitev iz datoteke…” znova.

### Kje najti LOCAL ZIP {#where-local-zip}

- Najprej pakirajte razširitev: zaženite `make pack` v korenu repozitorija.
- Po pakiranju najdite “LOCAL” zip v korenu repozitorija (npr. `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Pred prepakiranjem za testiranje posodobite različice v `sources/manifest_ATN.json` in `sources/manifest_LOCAL.json`.

---

## Onemogočanje, Uninstalliranje in Posodobitve {#disable-uninstall-updates}

- Onemogočite: Thunderbird → Orodja → Razširitve in Temi → poiščite razširitev → izklopite.
- Odstranite: ista vista → meni s tremi pikami → Odstrani.
- Posodobitve: ATN namestitve se samodejno posodabljajo, ko so nove različice potrjene. LOCAL/dev namestitve se ne posodabljajo samodejno; ročno namestite novo LOCAL različico.
- Popolnoma odstranite nastavitve: glejte [Zasebnost → Odstranitev podatkov](privacy#data-removal).

Glejte tudi

- [Hitri začetek](quickstart)
