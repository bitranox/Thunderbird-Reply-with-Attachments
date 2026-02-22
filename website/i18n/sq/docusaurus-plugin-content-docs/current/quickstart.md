---
id: quickstart
title: 'Udhëzues i shpejtë'
sidebar_label: 'Fillim i shpejtë'
---

---

## Udhëzues i shpejtë

:::important Versioni minimal i Thunderbird
Kjo shtesë mbështet Thunderbird **128 ESR ose më të ri**. Versionet më të vjetra nuk mbështeten.
:::

:::note Pa telemetri; pa rrjet në sfond
Shtesa **nuk** mbledh analiza/telemetri dhe **nuk** bën kërkesa rrjeti në sfond. Qasja në rrjet ndodh vetëm kur klikoni lidhje të jashtme (Dokumentacioni, GitHub, Dhuro).
:::

---

### Instalim

1. Instaloni shtesën nga Thunderbird Add‑ons.
2. Opsionale: Aktivizoni konfirmimin (Opsione → “Pyet para se të shtohen bashkëngjitjet”).
3. Opsionale: Lëreni të aktivizuar paralajmërimin për listën e zezë (parazgjedhje): “Paralajmëro nëse bashkëngjitjet përjashtohen nga lista e zezë”.
4. Opsionale: Shtoni modele të listës së zezë (një për rresht), p.sh.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Shënim: “# …” më sipër është një koment në këtë dokumentacion; mos përfshini komente në modelet që ngjitni te Opsionet. Futni vetëm një model për çdo rresht.

Tani përgjigjuni një mesazhi me bashkëngjitje — origjinalet do të shtohen automatikisht ose pas një konfirmimi të shpejtë. Nëse ndonjë skedar përjashtohet nga lista juaj e zezë, do të shfaqet një paralajmërim i shkurtër që i rendit ato.

---

### Verifikim {#verify}

- Përgjigjuni një mesazhi me 1–2 bashkëngjitje dhe konfirmoni që origjinalet shtohen në dritaren tuaj të hartimit.
- Për të rregulluar sjelljen, shihni [Konfigurimi](configuration) (ndërprerësi i konfirmimit, përgjigjja e parazgjedhur, modelet e listës së zezë).

---

### Verifikim i paralajmërimit të listës së zezë {#verify-blacklist-warning}

- Përgjigjuni një mesazhi që përmban një skedar si “secret.txt”.
- Me “Paralajmëro nëse bashkëngjitjet përjashtohen nga lista e zezë” të aktivizuar, një dialog i vogël i rendit skedarët e përjashtuar dhe modelin përkatës.

Nëse nuk shihni një paralajmërim, sigurohuni që modeli të përputhet saktësisht me emrin e skedarit (vetëm emri i skedarit, pa dallim shkronjash të mëdha/vogla). Shih Konfigurimi → Lista e zezë.

---

### Shënim për tastierën {#keyboard-note}

- Dialogu i konfirmimit mbështet Y/J për Po dhe N/Esc për Jo. Në disa tastiera jo-latine, tastet e shkronjave mund të ndryshojnë; Enter konfirmon butonin e fokusuar.

---
