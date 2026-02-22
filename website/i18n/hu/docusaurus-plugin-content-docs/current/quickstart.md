---
id: quickstart
title: 'Gyors kezdés'
sidebar_label: 'Gyorstalpaló'
---

---

## Gyors kezdés

:::important Minimális Thunderbird-verzió
Ez a kiegészítő a Thunderbird **128 ESR vagy újabb** verzióját támogatja. Régebbi verziók nem támogatottak.
:::

:::note Nincs telemetria; nincs háttérhálózati forgalom
A kiegészítő **nem** gyűjt analitikát/telemetriát, és **nem** kezdeményez háttérhálózati kéréseket. Hálózati hozzáférés csak akkor történik, amikor külső hivatkozásokra kattint (Dokumentáció, GitHub, Adomány).
:::

---

### Telepítés

1. Telepítse a kiegészítőt a Thunderbird Add‑ons webhelyről.
2. Opcionális: Engedélyezze a megerősítést (Beállítások → „Mellékletek hozzáadása előtt kérdezzen rá”).
3. Opcionális: Hagyja bekapcsolva a feketelista-figyelmeztetést (alapértelmezett): „Figyelmeztessen, ha a mellékleteket a feketelista kizárja”.
4. Opcionális: Adjon hozzá feketelista-mintákat (soronként egyet), pl.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Megjegyzés: A fenti „# …” ebben a dokumentációban megjegyzés; ne tegyen megjegyzéseket a Beállításokba beillesztett minták közé. Soronként csak egy mintát adjon meg.

Most válaszoljon egy mellékleteket tartalmazó üzenetre — az eredetik automatikusan, vagy egy gyors megerősítés után lesznek hozzáadva. Ha a feketelistája bármely fájlt kizár, egy rövid figyelmeztetés jelenik meg, amely felsorolja őket.

---

### Ellenőrzés {#verify}

- Válaszoljon egy 1–2 mellékletet tartalmazó üzenetre, és erősítse meg, hogy az eredetiek hozzáadódnak a szerkesztőablakhoz.
- A működés beállításához lásd: [Konfiguráció](configuration) (megerősítés kapcsoló, alapértelmezett válasz, feketelista-minták).

---

### Feketelista-figyelmeztetés ellenőrzése {#verify-blacklist-warning}

- Válaszoljon egy olyan üzenetre, amely egy „secret.txt” nevű fájlt tartalmaz.
- A „Figyelmeztessen, ha a mellékleteket a feketelista kizárja” opció engedélyezése esetén egy kis párbeszédablak felsorolja a kizárt fájlokat és az egyező mintát.

Ha nem lát figyelmeztetést, győződjön meg róla, hogy a minta pontosan egyezik a fájlnévvel (csak fájlnév, kis- és nagybetűk nem számítanak). Lásd: Konfiguráció → Feketelista.

---

### Billentyűzeti megjegyzés {#keyboard-note}

- A megerősítő párbeszédablak az Igenre az Y/J, a Nemre az N/Esc billentyűket támogatja. Egyes nem latin billentyűzeteken a betűbillentyűk eltérhetnek; az Enter a fókuszban lévő gombot erősíti meg.

---
