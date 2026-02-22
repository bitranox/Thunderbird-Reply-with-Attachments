---
id: features
title: 'Eiginleikar'
sidebar_label: 'Eiginleikar'
---

---

## Eiginleikar {#features}

- Hengir sjálfkrafa skrár úr upprunalega tölvupóstinum við þegar þú svarar.
- Hægt er að stilla hegðun: viðhengi geta verið
  - bætt við sjálfkrafa, eða
  - bætt við aðeins eftir staðfestingu (lítill, aðgengilegur gluggi). Í Valkostum
    geturðu virkjað staðfestingu og valið sjálfgefna svarið (Já/Nei).
- Svartlisti skráarheita (glob-mynstur) kemur í veg fyrir að tilteknar skrár séu
  hengdar við sjálfkrafa. Dæmi: `*intern*`, `*secret*`, `*passwor*`.
  Samsvörun er óháð há- og lágstöfum og athugar aðeins skráarheitið; settu eitt mynstur
  á línu í Valkostum.
- Aðvörun vegna svartlista (valkvætt, virkt sjálfgefið): þegar skrám er sleppt samkvæmt
  svartlistanum þínum, birtir lítill gluggi skrána og samsvarandi mynstur. Vinalegt í
  dökkham og aðgengilegt með lyklaborði (Enter/Esc til að loka).
- Virkar með Svara og Svara öllum. Áframsenda er ekki breytt af þessari viðbót.
- Bætir við upprunalegum viðhengjum jafnvel þó þú hafir þegar bætt einhverju við; forðast
  tvíteknar skrár eftir skráarheiti.
- Endurtekningarvörn á hverjum flipa kemur í veg fyrir tvíbætingu í sama ritflipa.
- Sleppir S/MIME-vottorðum sjálfgefið til að forðast óþarfa viðhengi.
- Taka með innfelldar myndir (sjálfgefið: Á). Innfelldum myndum er skilað beint inn í
  svartextann sem base64 data URI, þannig að upprunaleg framsetning í línu varðveitist.
  Slökktu á þessu í Valkostum til að sleppa innfelldum myndum alveg.

---

## Hvernig þetta virkar {#how-it-works}

- Þegar svarað er, listar viðbótin upp upprunaleg viðhengi.
- Síar burt S/MIME-undirskriftir úr viðhengjum; innfelldar myndir eru endurheimtar í meginmál (nema óvirkt).
- Getur beðið um staðfestingu (lyklaborðsvænt).
- Bætir hæfum skrám við ritgluggann þinn og forðast tvíteknar skrár eftir skráarheiti.
- Sjá “Af hverju viðhengi gætu ekki verið bætt við” í Notkun fyrir jaðartilfelli.

Athugasemd um persónuvernd: Öll vinnsla fer fram staðbundið í Thunderbird. Viðbótin gerir engar bakgrunnsnetbeiðnir.

---
