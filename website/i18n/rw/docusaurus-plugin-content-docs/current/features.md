---
id: features
title: 'Ibiranga'
sidebar_label: 'Ibiranga'
---

---

## Ibiranga {#features}

- Yiyomekera byikora dosiye z'ubutumwa bw'umwimerere iyo usubiza.
- Imikorere ishobora guhindurwa: inyomeko zishobora
  - kongerwa byikora, cyangwa
  - kongerwa ari uko byemejwe gusa (ikiganiro gitoya cyorohereza kugerwaho). Muri Options
    ushobora gutuma kubanza kwemeza bikora no guhitamo igisubizo mburabuzi (Yego/Oya).
- Urutonde rwo gukumira (blacklist) rw'amazina ya dosiye (glob patterns) rubuza dosiye zimwe na zimwe kwiyomekwa byikora. Ingero: `*intern*`, `*secret*`, `*passwor*`.
  Kuhuza ntibashingira ku nyuguti nkuru/nto (case‑insensitive) kandi bareba izina rya dosiye gusa; tanga icyitegererezo kimwe
  ku murongo muri Options.
- Iburira rya blacklist (ryihitamo, rikora mburabuzi): iyo dosiye zivanweho n'urwo rutonde,
  idirishya rito (modal) ryerekana dosiye n'icyitegererezo(ibyitegererezo) bihuye. Rishyigikira Dark‑mode kandi
  rigerwaho n'umwandikisho (Enter/Esc gufunga).
- Rikorana na Reply na Reply all. Forward ntihindurwa n'iyi nyongera (add‑on).
- Yongeraho inyomeko z'umwimerere n'iyo waba wiyomekeyeho ikindi; irinda gusubiramo (duplicates) hashingiwe ku izina rya dosiye.
- Ikirinda gusubiramo kuri buri tabu kibuza kongeramo kabiri muri tabo imwe yo kwandika (compose).
- Isimbuka impamyabushobozi za S/MIME mburabuzi kugira ngo hirindwe inyomeko zidakenewe.
- Ishyiramo amafoto y’imbere mu mwandiko (mburabuzi: ON). Amashusho ashyizwe imbere (embedded) asubizwa mu mubiri w’igisubizo
  nk’amasano ya base64 data URIs, bigakomeza imiterere y’imbere y’umwimerere. Bihagarike muri Options kugira ngo
  usimbuke burundu amashusho y’imbere.

---

## Uko Bikora {#how-it-works}

- Iyo usubije, iyi nyongera (add‑on) ishyira ku rutonde inyomeko z’umwimerere.
- Ikuramo S/MIME signatures mu nyomeko za dosiye; amashusho y’imbere (inline) asubizwa mu mubiri w’ubutumwa (keretse bihagaritswe).
- Ku bushake isaba kwemeza (yorohereza gukoresha umwandikisho).
- Yongeraho dosiye ziboneye mu nyandiko yawe, ikirinda gusubiramo hashingiwe ku izina rya dosiye.
- Reba “Impamvu inyomeko zishobora kutongerwa” muri Usage ku bihe by’imbibi (edge cases).

Ubusobanuro ku ibanga: Ibitunganywa byose bikorerwa mu buryo bwa lokale muri Thunderbird. Iyi nyongera (add‑on) nta busabe bwo ku muyoboro w'Internet bwa background ikora.

---
