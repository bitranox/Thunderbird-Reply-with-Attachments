---
id: privacy
title: 'Confidențialitate'
sidebar_label: 'Confidențialitate'
---

## Confidențialitate

:::note Nu există telemetrie; nu există rețele de fond
Această extensie **nu** colectează analize/telemetrie și nu face **nici** cereri de rețea în fundal. Orice acces la rețea se întâmplă doar când dai clic pe un link extern (Docs, GitHub, Donează).
:::

Reply with Attachments nu colectează analize sau telemetrie și nu îți trimite datele nicăieri.

Ce face extensia:

- Citește metadatele atașamentelor și fișierele din mesajul original local (API Thunderbird) pentru a le atașa la răspunsul tău.
- Stochează opțiunile tale (listă neagră, confirmare, răspuns implicit) în stocarea locală a Thunderbird.

Ce nu face extensia:

- Nicio urmărire, analize, raportare de erori sau jurnalizare de la distanță.
- Nicio cerere de rețea în fundal, cu excepția cazului în care deschizi explicit linkuri externe (Docs, GitHub, Donează).

Permisiunile sunt documentate pe pagina [Permisiuni](permissions).

---

## Politica de Securitate a Conținutului (CSP) {#content-security-policy-csp}

Opțiunile și paginile pop-up evită scripturile integrate. Tot JavaScript-ul este încărcat din fișiere livrate împreună cu extensia pentru a respecta CSP strict în Thunderbird. Dacă încadrezi fragmente de cod în documente, acestea sunt doar exemple și nu sunt executate de extensie.

---

## Stocarea datelor {#data-storage}

- Preferințele utilizatorului (listă neagră, comutare de confirmare, răspuns implicit) sunt stocate în `storage.local` al Thunderbird pentru această extensie.
- Nicio sincronizare în cloud nu este efectuată de extensie.

---

## Rețea {#network}

- Extensia nu efectuează activitate de rețea în fundal.
- Orice acces la rețea se întâmplă doar când dai clic pe linkuri (Docs, GitHub, Donează) sau când Thunderbird în sine efectuează operațiuni normale nelegate de această extensie.

---

## Eliminarea datelor {#data-removal}

- Dezinstalarea extensiei elimină codul acesteia.
- Setările sunt păstrate doar în `storage.local` al Thunderbird și sunt eliminate la dezinstalare; nu se folosește stocare externă.
- Resetează setările fără a dezinstala:
  - Pagina de opțiuni: folosește „Resetează la valorile implicite” pentru lista neagră și avertizarea listei negre.
  - Avansat: în Thunderbird → Instrumente → Instrumente pentru dezvoltatori → Depanare extensii, deschide stocarea extensiei și șterge cheile dacă este necesar.

---
