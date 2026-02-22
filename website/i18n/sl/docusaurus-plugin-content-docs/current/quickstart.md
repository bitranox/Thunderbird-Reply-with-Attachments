---
id: quickstart
title: 'Hitri začetek'
sidebar_label: 'Hitri začetek'
---

---

## Hitri začetek

:::important Najmanjša različica Thunderbirda
Ta dodatek podpira Thunderbird **128 ESR ali novejši**. Starejše različice niso podprte.
:::

:::note Brez telemetrije; brez omrežja v ozadju
Dodatek **ne** zbira analitike/telemetrije in **ne** izvaja omrežnih zahtevkov v ozadju. Dostop do omrežja se zgodi le, ko kliknete zunanje povezave (Dokumentacija, GitHub, Donacije).
:::

---

### Namestitev

1. Namestite dodatek iz Thunderbird Add‑ons.
2. Neobvezno: omogočite potrditev (Možnosti → “Vprašaj pred dodajanjem prilog”).
3. Neobvezno: pustite opozorilo o črnem seznamu omogočeno (privzeto): “Opozori, če so priloge izključene s črnim seznamom”.
4. Neobvezno: dodajte vzorce črnega seznama (enega na vrstico), npr.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Opomba: “# …” zgoraj je komentar v tej dokumentaciji; v vzorce, ki jih prilepite v Možnosti, ne vključujte komentarjev. Vnesite le en vzorec na vrstico.

Zdaj odgovorite na sporočilo s prilogami — izvirniki bodo dodani samodejno ali po hitri potrditvi. Če so kakšne datoteke izključene zaradi vašega črnega seznama, boste videli kratko opozorilo s seznamom.

---

### Preverjanje {#verify}

- Odgovorite na sporočilo z 1–2 prilogama in potrdite, da so izvirniki dodani v vaše okno za sestavljanje.
- Za prilagoditev obnašanja glejte [Konfiguracija](configuration) (preklop potrditve, privzet odgovor, vzorci črnega seznama).

---

### Preverjanje opozorila črnega seznama {#verify-blacklist-warning}

- Odgovorite na sporočilo, ki vsebuje datoteko, kot je “secret.txt”.
- Z omogočeno možnostjo “Opozori, če so priloge izključene s črnim seznamom” majhno pogovorno okno navede izključene datoteke in ujemajoči se vzorec.

Če opozorila ne vidite, zagotovite, da se vzorec natančno ujema z imenom datoteke (samo ime datoteke, neobčutljivo na velikost črk). Glejte Konfiguracija → Črni seznam.

---

### Opomba o tipkovnici {#keyboard-note}

- Potrditveno pogovorno okno podpira Y/J za Da in N/Esc za Ne. Na nekaterih nelatiničnih tipkovnicah se lahko črkovne tipke razlikujejo; Enter potrdi izbrani gumb.

---
