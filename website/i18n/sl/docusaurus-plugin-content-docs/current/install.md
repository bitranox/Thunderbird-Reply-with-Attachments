---
id: install
title: 'Namestitev'
slug: /install
sidebar_label: 'Namestitev'
---

---

## Namestitev prek "Dodatki in teme v Thunderbirdu" {#installation-in-thunderbird-recommended}

:::important Najmanjša različica Thunderbirda
Ta dodatek podpira Thunderbird **128 ESR ali novejši**. Starejše različice niso podprte.
:::

To je priporočeni način namestitve. Dodatki, nameščeni iz ATN (addons.thunderbird.net), prejemajo samodejne posodobitve. Namestitve LOCAL/dev se ne posodabljajo samodejno.

- Najmanjša različica Thunderbirda: 128 ESR ali novejša.

1. V Thunderbirdu odprite **Orodja > Dodatki in teme**.
2. Poiščite "reply with attachments".
3. Dodajte dodatek.

Ali odprite stran dodatka neposredno: [Dodatki za Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Ročna namestitev iz XPI {#local-installation-in-thunderbird}

### Prenos datoteke XPI {#download-the-xpi-file}

1. Pojdite na [stran dodatka za Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Prenesite najnovejšo različico dodatka kot datoteko XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Namestitev v Thunderbird {#install-in-thunderbird-local}

1. Odprite Thunderbird.
2. Pojdite na **Orodja > Dodatki in teme**.
3. V **Upravitelju dodatkov** kliknite ikono zobnika v zgornjem desnem kotu.
4. V meniju izberite **Namesti dodatek iz datoteke…**.
5. Izberite preneseno datoteko `reply_with_attachments-x.y.z-tb.xpi`.
6. Ko boste pozvani, potrdite namestitev.

---

## Namestitev za razvoj {#installation-for-development}

### Prenos repozitorija {#download-the-repository}

1. Prenesite najnovejšo različico repozitorija na GitHubu.
2. Za več informacij zaženite `make help`.

### Namestitev v Thunderbird {#install-in-thunderbird-dev}

1. Odprite Thunderbird.
2. Pojdite na **Orodja > Dodatki in teme**.
3. V **Upravitelju dodatkov** kliknite ikono zobnika v zgornjem desnem kotu.
4. V meniju izberite **Namesti dodatek iz datoteke…**.
5. Izberite ustvarjeno datoteko `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Ko boste pozvani, potrdite namestitev.

Opomba: Če Thunderbird na vašem sistemu ne sprejme `.zip`, ga preimenujte v `.xpi` in znova poskusite možnost »Namesti dodatek iz datoteke…«.

### Kje najti LOCAL ZIP {#where-local-zip}

- Najprej zapakirajte dodatek: v korenu repozitorija zaženite `make pack`.
- Po pakiranju v korenu repozitorija poiščite arhiv »LOCAL« (npr. `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Pred ponovnim pakiranjem za testiranje povečajte številke različice v `sources/manifest_ATN.json` in `sources/manifest_LOCAL.json`.

---

## Onemogočanje, odstranitev in posodobitve {#disable-uninstall-updates}

- Onemogoči: Thunderbird → Orodja → Dodatki in teme → poiščite dodatek → preklopite stikalo na izklopljeno.
- Odstrani: isti pogled → meni s tremi pikami → Odstrani.
- Posodobitve: Namestitve iz ATN se samodejno posodabljajo, ko so nove različice odobrene. Namestitve LOCAL/dev se ne posodabljajo samodejno; novo različico LOCAL znova namestite ročno.
- Popolna odstranitev nastavitev: glejte [Zasebnost → Odstranitev podatkov](privacy#data-removal).

Glej tudi

- [Hiter začetek](quickstart)
