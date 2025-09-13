---
id: privacy
title: 'Kuvanzika'
sidebar_label: 'Kuvanzika'
---

## Kuvanzika

:::note Hapana telemetry; hapana network yekumashure
Iyi add-on **haichatevedzeri** analytics/telemetry uye **haigamuchiri** mikumbiro yenetwork yekumashure. Chero kupinda kwemagetsi kunoitika chete kana uchikclicka pane chinongedzo chekunze (Docs, GitHub, Donate).
:::

Reply with Attachments haichatevedzeri analytics kana telemetry uye haitumiri data rako kupi.

Zvinoitwa neiyo add-on:

- Inoverenga metadata yeattachments nemafaira kubva kumashoko ekutanga kum local (Thunderbird API) kuti iwedzere kune yako mhinduro.
- Inochengeta sarudzo dzako (blacklist, chibvumirano, mhinduro yekutanga) mu local storage yeThunderbird.

Zvinoitwa neiyo add-on:

- Hapana kutarisa, analytics, kuburitswa kwekudzokorora, kana kuremote logging.
- Hapana mikumbiro yenetwork yekumashure, kunze kwekunge uchivhura chinongedzo chekunze pachena (Docs, GitHub, Donate).

Mvumo dzakatemwa pa [Permissions](permissions) peji.

---

## Content Security Policy (CSP) {#content-security-policy-csp}

Sarudzo nemapeji epopup anodzivirira inline scripts. JavaScript yese inotakurwa kubva kumafaira anouya neiyo add-on kuti iwirirane ne strict CSP muThunderbird. Kana ukaisa code snippets mumadokumendi, iwo anongova mienzaniso uye haaitwa neiyo add-on.

---

## Kuchengetwa kwedata {#data-storage}

- Zvinodiwa nemushandisi (blacklist, chibvumirano chekudzora, mhinduro yekutanga) zviri kuchengetwa mu `storage.local` yeThunderbird yeiyi add-on.
- Hapana cloud sync inoitwa neiyo add-on.

---

## Network {#network}

- Iyo add-on haina kumashure network Activity.
- Chero kupinda kwemagetsi kunoitika chete kana uchikclicka pane zvinongedzo (Docs, GitHub, Donate) kana kana Thunderbird pachezvayo ichiitazve zviito zvakaenzana zvisingabatani neiyi add-on.

---

## Kubvisa data {#data-removal}

- Kubvisa iyi add-on kunobvisa kodhi yayo.
- Zvirongwa zvinoramba mu `storage.local` yeThunderbird uye zvinobviswa pakubvisa; hapana kuchengetedzwa kwekunze kunoshandiswa.
- Reset zvirongwa pasina kubvisa:
  - Peji rezsarudzo: shandisa “Reset to defaults” ye blacklist uye blacklist warning.
  - Advanced: muThunderbird → Tools → Developer Tools → Debug Add-ons, vhura storage yeextension uye bvisa makiyi kana zvichidikanwa.

---
