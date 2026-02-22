---
id: install
title: 'Telepítés'
slug: /install
sidebar_label: 'Telepítés'
---

---

## Telepítés a „Thunderbird kiegészítők és témák” felületen keresztül {#installation-in-thunderbird-recommended}

:::important Minimális Thunderbird-verzió
Ez a kiegészítő a Thunderbird **128 ESR vagy újabb** verzióit támogatja. Régebbi verziók nem támogatottak.
:::

Ez az ajánlott telepítési módszer. Az ATN-ről (addons.thunderbird.net) telepített kiegészítők automatikus frissítéseket kapnak. A LOCAL/dev telepítések nem frissülnek automatikusan.

- Minimális Thunderbird-verzió: 128 ESR vagy újabb.

1. A Thunderbirdben nyissa meg az **Eszközök > Kiegészítők és témák** menüt.
2. Keressen rá erre: "reply with attachments".
3. Adja hozzá a kiegészítőt.

Vagy nyissa meg közvetlenül a kiegészítő oldalát: [Thunderbird kiegészítők (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Kézi telepítés XPI-ből {#local-installation-in-thunderbird}

### Az XPI fájl letöltése {#download-the-xpi-file}

1. Látogasson el a [Thunderbird kiegészítő oldalára](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Töltse le a kiegészítő legújabb verzióját XPI fájlként (`reply_with_attachments-x.y.z-tb.xpi`).

### Telepítés a Thunderbirdben {#install-in-thunderbird-local}

1. Nyissa meg a Thunderbirdöt.
2. Válassza az **Eszközök > Kiegészítők és témák** menüpontot.
3. A **Kiegészítőkezelőben** kattintson a jobb felső sarokban lévő fogaskerék ikonra.
4. A menüből válassza a **Kiegészítő telepítése fájlból…** lehetőséget.
5. Válassza ki a letöltött `reply_with_attachments-x.y.z-tb.xpi` fájlt.
6. A felszólításra erősítse meg a telepítést.

---

## Telepítés fejlesztéshez {#installation-for-development}

### A tároló letöltése {#download-the-repository}

1. Töltse le a GitHub-tároló legújabb verzióját.
2. További információért futtassa: `make help`.

### Telepítés a Thunderbirdben {#install-in-thunderbird-dev}

1. Nyissa meg a Thunderbirdöt.
2. Válassza az **Eszközök > Kiegészítők és témák** menüpontot.
3. A **Kiegészítőkezelőben** kattintson a jobb felső sarokban lévő fogaskerék ikonra.
4. A menüből válassza a **Kiegészítő telepítése fájlból…** lehetőséget.
5. Válassza ki az előállított `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` fájlt.
6. A felszólításra erősítse meg a telepítést.

Megjegyzés: Ha a Thunderbird nem fogadja el a `.zip` fájlt a rendszerén, nevezze át `.xpi` névre, és próbálja meg újra a „Kiegészítő telepítése fájlból…” műveletet.

### Hol található a LOCAL ZIP {#where-local-zip}

- Először csomagolja be a kiegészítőt: futtassa a `make pack` parancsot a tároló gyökerében.
- A csomagolás után a „LOCAL” zip a tároló gyökerében található (pl. `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Újracsomagolás előtti teszteléshez növelje meg a verziószámokat mind a `sources/manifest_ATN.json`, mind a `sources/manifest_LOCAL.json` fájlban.

---

## Letiltás, eltávolítás és frissítések {#disable-uninstall-updates}

- Letiltás: Thunderbird → Eszközök → Kiegészítők és témák → keresse meg a kiegészítőt → kapcsolja ki.
- Eltávolítás: ugyanitt → hárompontos menü → Eltávolítás.
- Frissítések: az ATN-ről telepítettek automatikusan frissülnek, amikor az új verziókat jóváhagyják. A LOCAL/dev telepítések nem frissülnek automatikusan; új LOCAL buildet kézzel kell újratelepíteni.
- Beállítások teljes eltávolítása: lásd [Adatvédelem → Adatok eltávolítása](privacy#data-removal).

Lásd még

- [Gyorstalpaló](quickstart)
