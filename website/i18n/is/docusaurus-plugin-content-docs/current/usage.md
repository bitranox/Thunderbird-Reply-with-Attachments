---
id: usage
title: 'Notkun'
sidebar_label: 'Notkun'
---

## Usage {#usage}

- Svara og viðbótin bætir upprunalegum skrám sjálfkrafa við — eða spyr fyrst, ef það er virkjuð í valkostum.
- Duplicated eftir skráarheiti; S/MIME og inline myndir eru alltaf slepptar.
- Blacklist-aðar viðhengi eru einnig sleppt (case-insensitive glob mynstur sem passa skráarheiti, ekki slóðir). Sjá [Configuration](configuration#blacklist-glob-patterns).

---

### What happens on reply {#what-happens}

- Skilgreina svar → lista upprunaleg viðhengi → sía S/MIME + inline → valkvæð staðfesting → bæta við hæfu skjölum (sleppa dublikat).

Strict vs. relaxed pass: Viðbótin útilokar fyrst S/MIME og inline hlutar. Ef ekkert uppfyllir skilyrðin, framkvæmir hún afslappaðara skimun sem útilokar enn S/MIME/inline en þolir fleiri tilvik (sjá Code Details).

| Part type                                         |  Strict pass | Relaxed pass |
| ------------------------------------------------- | -----------: | -----------: |
| S/MIME signature file `smime.p7s`                 |     Excluded |     Excluded |
| S/MIME MIME types (`application/pkcs7-*`)         |     Excluded |     Excluded |
| Inline image referenced by Content‑ID (`image/*`) |     Excluded |     Excluded |
| Attached email (`message/rfc822`) with a filename |    Not added | May be added |
| Regular file attachment with a filename           | May be added | May be added |

Dæmi: Sum viðhengi gætu skort ákveðin fyrirsagnir en eru samt reglulegar skrár (ekki inline/S/MIME). Ef strangt skimun finnur engin, getur afslappað skimun samþykkt þau og bætt þeim við.

---

### Cross‑reference {#cross-reference}

- Framleiðsla er ekki breytt með áformi (sjá Takmarkanir hér að neðan).
- Fyrir ástæður sem viðhengi gæti ekki verið bætt, sjá "Af hverju viðhengi gæti ekki verið bætt".

---

## Behavior Details {#behavior-details}

- **Forvarnir gegn dublikat:** Viðbótin merkir samansetningartöflu sem unnið hefur verið með gildi í sértækum tólf á hverju blaði og í minni vörn. Hún mun ekki bæta upprunalegum skráum við tvisvar.
- Að loka og opna aftur samsetningar glugga er meðhöndlað sem nýtt blað (þ.e., nýr tilraun er leyfð).
- **Virða núverandi viðhengi:** Ef samsetningin inniheldur nú þegar einhver viðhengi, þá eru upprunalegu skrárnar enn bætt við einu sinni, sleppa skráarheiti sem þegar eru til.
- **Aukaskilyrði:** S/MIME hlutir og inline myndir eru ekki teknir með. Ef ekkert uppfyllir skilyrðin í fyrstu skimun, skoðar afslappað fallback aftur þá hluta sem ekki eru S/MIME.
  - **Skráarheiti:** `smime.p7s`
  - **MIME tegundir:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Inline myndir:** hvaða `image/*` hlut sem vísað er í með Content‑ID í skilaboðunum
  - **Viðhengið emails (`message/rfc822`):** meðhöndlað sem venjuleg viðhengi ef þau hafa skráarheiti; þau gætu verið bætt (háð dublikat eftirliti og blacklist).
- **Blacklist viðvörun (ef virkjuð):** Þegar frambjóðendur eru útilokaðir af blacklist-inni,
  sýnir viðbótin lítið glugga sem listar viðkomandi skrár og samsvarandi
  mynstur. Þessi viðvörun kemur einnig fram þegar engin viðhengi verða
  bætt vegna þess að allt var útilokað.

---

## Keyboard shortcuts {#keyboard-shortcuts}

- Staðfestingargluggi: Y/J = Já, N/Esc = Nei; Tab/Shift+Tab og örvustýringar hringja í fókus.
  - "Sjálfgefna svarið" í [Configuration](configuration#confirmation) stillir upphaflega fokusaða hnappinn.
  - Enter kveikir á fókusarhnappar. Tab/Shift+Tab og örvar færa fókus fyrir aðgengi.

### Keyboard Cheat Sheet {#keyboard-cheat-sheet}

| Keys            | Action                                 |
| --------------- | -------------------------------------- |
| Y / J           | Staðfesta Já                           |
| N / Esc         | Staðfesta Nei                          |
| Enter           | Virkja fókusarhnappinn                 |
| Tab / Shift+Tab | Færa fókus áfram/bak                   |
| Arrow keys      | Færa fókus á milli hnappara            |
| Default answer  | Stillir upphaflegan fókus (Já eða Nei) |

---

## Limitations {#limitations}

- Framleiðsla er ekki breytt af þessari viðbót (Svara og Svara öllum eru stutt).
- Mjög stór viðhengi gætu verið háð takmörkunum frá Thunderbird eða þjónustuaðila.
  - Viðbótin skiptir ekki upp eða þjöppar skrám; hún treystir á venjulega meðhöndlun viðhengja frá Thunderbird.
- Dulkóðuð skilaboð: S/MIME hlutar eru með ásettu útilokaðir.

---

## Why attachments might not be added {#why-attachments-might-not-be-added}

- Inline myndir eru ekki teknar með: hlutar sem vísað er í með Content‑ID í skilaboðunum eru ekki bætt sem skrár.
- S/MIME undirskriftir eru útilokaðar með ásettu: skráarheiti eins og `smime.p7s` og MIME tegundir eins og `application/pkcs7-signature` eða `application/pkcs7-mime` eru slepptar.
- Blacklist mynstur geta síað frambjóðendur: sjá [Configuration](configuration#blacklist-glob-patterns); samsvörun er case-insensitive og aðeins skráarheiti.
- Dublikat skráarheiti eru ekki bætt aftur: ef samsetningin inniheldur nú þegar skrá með sama normalízeruðu nafni, þá er hún sleppt.
- Óskráarskrá hlutar eða skráarheiti vanti: aðeins skráarhlutir með nothæfum skráarheitum eru taldir við bætur.

---

Sjá einnig

- [Configuration](configuration)
