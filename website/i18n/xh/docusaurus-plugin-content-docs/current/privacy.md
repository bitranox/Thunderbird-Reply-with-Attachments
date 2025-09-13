---
id: privacy
title: 'Ubumfihlo'
sidebar_label: 'Ubumfihlo'
---

## Privacy

:::note Akukho telemetry; akukho nethiwekhi yangemuva
Le add-on **ayiqhubi** ukuqokelela i-analytics/telemetry kwaye ayenze **n**ezenzo ze-nethiwekhi yangemuva. Nombolo ye-nethiwekhi ifumaneka kuphela xa ucofa kwi-link yangaphandle (Docs, GitHub, Donate).
:::

Reply with Attachments ayiqokeleli i-analytics okanye i-telemetry kwaye ayithumeli idata yakho naphina.

Okukodwa owenza ngako le add-on:

- Funda i-metadata yokuhlanganisa kunye neefayile kumyalezo wokuqala endaweni (Thunderbird API) ukuze uzixhume kwi-mpendulo yakho.
- Gcina iikhetho zakho (blacklist, ukuq подтверждение, impendulo Okwangoku) kwi-local storage ye-Thunderbird.

Okungafanelwanga ngako le add-on:

- Akukho tracking, analytics, ukubika ukungaphumeleli, okanye ukurekhoda kude.
- Akukho nethiwekhi yangemuva, ngaphandle kokuba uvule i-link yangaphandle (Docs, GitHub, Donate).

Imvume ibhalwe kwi [Permissions](permissions) iphepha.

---

## Umgaqo wokuQinisa uBumfihlo (CSP) {#content-security-policy-csp}

Iinketho kunye nemigqaliselo ye-popup ziqinisekisa ukuba azikho ii-script ze-inline. Onke amaJavaScript alayishwa kwiifayile ezithunyelwa kunye le add-on ukuze kuhlangatshezwane nemigaqo eqinileyo ye-CSP kwi-Thunderbird. Ukuba ufaka umgca wekhodi kwi-docs, bahlala bejolise kuphela kwaye abaqhutywanga le add-on.

---

## Ukugcina idatha {#data-storage}

- Ukhetho lomsebenzisi (blacklist, ukungena kwe-confirmation, impendulo Okwangoku) kugcinwa kwi-`storage.local` ye-Thunderbird ye-add-on.
- Akukho kuhlanganyelwa kwefu okwenziwa le add-on.

---

## Nethiwekhi {#network}

- Le add-on ayenze nethiwekhi yangemuva.
- Nombolo ye-nethiwekhi ifumaneka kuphela xa ucofa kwiilinki (Docs, GitHub, Donate) okanye xa i-Thunderbird uqobo yenze imisebenzi ejoliswe kumsebenzi ongeyomsebenzi.

---

## Ukususwa kwedatha {#data-removal}

- Ukususa le add-on kususa ikhodi yayo.
- Iziqhosha zigcinwa kuphela kwi-`storage.local` ye-Thunderbird kwaye zisuswa xa ususa; akukho ukugcina ngaphandle kokusebenzisa.
- Phinda usete iindawo ngaphandle kokususa:
  - Iphepha leekhetho: sebenzisa "Phinda ubuyisele kwi-defaults" ye-blacklist kunye ne-warning ye-blacklist.
  - Ngaphezulu: kwi-Thunderbird → Izixhobo → Izixhobo zabaThuthukisi → Phonononga iiAdd-on, vula umgca ocinga futhi uqwhere iikhi ukuze ufumane umphumo.
