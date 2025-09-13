---
id: quickstart
title: 'Hiter začetek'
sidebar_label: 'Hiter začetek'
---

## Hiter začetek

:::important Minimalna različica Thunderbirda
Ta dodatek podpira Thunderbird **128 ESR ali novejšo**. Starejše različice niso podprte.
:::

:::note Brez telemetrije; brez omrežnega dostopa v ozadju
Dodatek **ne** zbira analitike/telemetrije in ne opravlja **nobenih** omrežnih zahtevkov v ozadju. Dostop do omrežja se zgodi le, ko kliknete zunanje povezave (Dokumenti, GitHub, Doniraj).
:::

---

### Namestitev

1. Namestite dodatek iz Thunderbirda Add‑ons.
2. Neobvezno: Omogočite potrditev (Možnosti → "Vprašaj pred dodajanjem priponk").
3. Neobvezno: Ohranite opozorilo o črni listi omogočeno (privzeto): "Opozori, če so priponke izključene s črno listo".
4. Neobvezno: Dodajte vzorce črne liste (enega na vrstico), npr.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Opomba: "# ..." zgoraj je komentar v tej dokumentaciji; ne vključujte komentarjev v vzorce, ki jih prilepite v Možnosti. Vnesite en vzorec na vrstico.

Sedaj odgovorite na sporočilo s priponkami — izvirniki bodo dodani samodejno ali po hitrem potrditvi. Če so kateri koli datoteki izključeni iz vaše črne liste, boste videli kratko opozorilo, ki jih našteva.

---

### Preveri {#verify}

- Odgovorite na sporočilo z 1–2 priponkami in potrdite, da so izvirniki dodani v vaše okno za sestavo.
- Za prilagoditev obnašanja si oglejte [Konfiguracijo](configuration) (preklic potrditev, privzeti odgovor, vzorci črne liste).

---

### Preveri opozorilo o črni listi {#verify-blacklist-warning}

- Odgovorite na sporočilo, ki vsebuje datoteko, kot je "secret.txt".
- Z omogočenim "Opozori, če so priponke izključene s črno listo" se prikaže majhen pogovor, ki našteva izključene datoteke in ustrezen vzorec.

Če ne vidite opozorila, preverite, ali vzorec natančno ustreza imenu datoteke (samo ime datoteke, brez razlikovanja med velikimi in malimi črkami). Oglejte si Konfiguracijo → Črna lista.

---

### Opomba o tipkovnici {#keyboard-note}

- Pogovor o potrditvi podpira Y/J za Da in N/Esc za Ne. Na nekaterih nekiratskih tipkovnicah se lahko črke razlikujejo; Enter potrdi izbrano gumb.
