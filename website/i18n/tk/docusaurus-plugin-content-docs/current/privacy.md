---
id: privacy
title: 'Gizlinlik'
sidebar_label: 'Gizlinlik'
---

## Gizlinlik

:::note Telemetri ýok; fon arka tor maglumatlary ýok
Bu goşmaça **tehniki maglumatlary** ýygnamamýar we **fon arka** tor görkezmelerini etmeýär. Herhangi bir tor elýeterliligi diňe siz daşarky baglanyşyga (Dokumentler, GitHub, Bagyşla) basanyňyzdan soň ýüze çykýar.
:::

Reply with Attachments tehniki maglumatlary ýa-da telemetriýa ýygnamamýar we maglumatlaryňyzy hiç ýere ibermeýär.

Goşmaçanyň ýerine ýetirýän işleri:

- Original habardan goşmaça berýänleriň maglumatlaryny we faýllaryny ýerli (Thunderbird API) okap, şolary jogaplaryňyza goşýar.
- Optiýalaryňyzy (gara san, təsdiş, standart jogap) Thunderbird’in ýerli pamygynda saklaýar.

Goşmaçanyň ýerine ýetirýän işleri däl:

- Heňklemek, tehniki maglumatlary ýygnamak, çöküş barada maglumatlary bermek ýa-da uzakdan ýazga almak ýok.
- Daşarky baglanyşyklara (Dokumentler, GitHub, Bagyşla) açmakdan başga, fon arka tor boýunça hiç hili gözegçilik, maglumat talap etmeýär.

Ähtimallara [Ähtimallar](permissions) sahypasynda goşulyşy bilen ýüz tutup bilersiňiz.

---

## Mazmuna Güwanç Beriş Politiýasy (CSP) {#content-security-policy-csp}

Saýlawlary we pop-up sahypalary inline skriptlerden gaça durýarlar. Bar bolan ähli JavaScript faýllar boýunça goşmaça bilen berilýär, şonuň üçin Thunderbird’ dachsy CSP boýunça berjaý edilýär. Eger siz dokumentlere kod kesimler girizseňiz, olar diňe mysallar bolup, goşmaça tarapyndan ýerine ýetirilmeýär.

---

## Maglumat saklamak {#data-storage}

- Ulanyjy talaplary (gara san, təsdiş açarlary, standart jogap) Thunderbird’in `storage.local` içinde bu goşmaça boýunça saklanýar.
- Goşmaça tarapyndan hiç hili bulut sinxronlaşdyrma edilmeýär.

---

## Tor {#network}

- Goşmaça hiç hili fon arka tor işini etmeýär.
- Herhangi bir tor elýeterliligi diňe siz baglanyşylara (Dokumentler, GitHub, Bagyşla) basanyňyzdan ýa-da Thunderbird öz ýolundaky işlerini ýerine ýetirenden dowamynda ýüze çykýar.

---

## Maglumat aýyrmak {#data-removal}

- Goşmaçany öçürmek onuň kodlaryny aýyrýar.
- Parametrler diňe Thunderbird’in `storage.local` içinde saklanýar we öçürilende aýrylýar; daşarky ýatda saklanma aýratynlygy goşulyşmaýar.
- Goşmaçany öçürmän parametrleri dikeltmek:
  - Optiýalar sahypasy: gara san we gara san duýduryşy üçin "Başlangyç görnüşlere dikeltmek" ulanyň.
  - Ösen: Thunderbird → Ýazgylar → Developer Tools → Debug Add‑ons, goşmaçanyň saklamasyna girip, gerek bolsa açarlary arassalaň.

---
