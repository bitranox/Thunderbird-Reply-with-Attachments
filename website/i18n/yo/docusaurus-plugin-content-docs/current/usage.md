---
id: usage
title: 'Ìlò'
sidebar_label: 'Ìlò'
---

---

## Ìlò {#usage}

- Fèsì, kí àfikún náà sì fi àwọn atilẹba kún laifọwọyi — tàbí kó béèrè kọ́kọ́, bí a bá ti muu ṣiṣẹ́ nínú Àṣàyàn.
- A ń yọ awọn ẹda-jijọ kuro gẹgẹ bi orukọ faili; awọn apakan S/MIME ni a máa ń fori gbagbe nigbagbogbo. Awọn aworan ti a fi sinu ifiranṣẹ atilẹba wa ninu ara ìdáhùn náà, ibi ti Thunderbird ti ń gbe wọn si, wọn kì í sì í daakọ gẹgẹ bi faili.
- Àwọn amúgbámu tó wà lórí àtòkọ́ dídẹ́kun náà a kọjá sílẹ̀ (àpẹrẹ glob tí kò fara mọ́ kíṣìín lẹ́tà, tó bá orúkọ fáìlì mu, kì í ṣe ọ̀nà). Wo [Ìṣètò](configuration#blacklist-glob-patterns).

---

### Kí ló ṣẹlẹ̀ nígbà ìfèsì {#what-happens}

- Ṣàwárí ìdáhùn → ṣe àkọsílẹ̀ àwọn àfikún ìpilẹ̀ → fò kọjá S/MIME àti àwòrán tí a fi sínú → ìjẹ́rìísí àṣàyàn → fi àwọn fáìlì tí ó yẹ kún (bí a ṣe ń fò kọjá àwọn tí ó jọra).

| Iru apakan                                             | Ṣe a daakọ sinu ìdáhùn           |
|--------------------------------------------------------|---------------------------------:|
| Faili ìforúkọsílẹ̀ S/MIME `smime.p7s`                  | Rárá                             |
| Awọn iru MIME S/MIME (`application/pkcs7-*`)           | Rárá                             |
| Aworan ti ara ifiranṣẹ fi sii nipasẹ `cid:`            | Rárá (ó ti wà nínú ara ifiranṣẹ) |
| Aworan ti a ti fi àmì `Content-Disposition: inline` si | Rárá (ó ti wà nínú ara ifiranṣẹ) |
| Aworan ti o ni `Content-ID` ti ara kò tọ́ka sí rí      | Bẹẹni                            |
| Imeeli ti a so mọ (`message/rfc822`) pẹlu orukọ faili  | Bẹẹni                            |
| Ohun àsomọ faili lasan pẹlu orukọ faili                | Bẹẹni                            |

Aworan kan kà sí eyi ti a fi sii nikan nigbati ifiranṣẹ atilẹba ba tọ́ka sí i ní ti gidi,
tabi nigbati olùránṣẹ́ ba fi àmì rẹ̀ hàn ní kedere gẹgẹ bi `Content-Disposition: inline`.
Orí-ọrọ `Content-ID` nikan kò to: ọ̀pọ̀ àwọn eto imeeli máa ń fi eyi si gbogbo apakan
aworan, pẹlu àwọn àsomọ tòótọ́, èyí tí ó yẹ kí a tún daakọ síbẹ̀.

---

### Ìtọ́kasí kọjá {#cross-reference}

- Fọ́wọ́ọ̀du kì í jẹ́ kí a yí i padà ní ìmọ̀-àpẹrẹ (wo Àwọn Ìdíwọ̀n ní isalẹ).
- Fún ìdí tí amúgbámu lè má ṣe kún, wo “Kí nìdí tí amúgbámu lè má ṣe kún”.

---

## Àlàyé ìhùwàsí {#behavior-details}

- **Ìdènà ẹ̀dá-kejì:** Àfikún náà ń samì taabu ìkọ̀wé gẹ́gẹ́ bí ohun tí a ti ṣiṣẹ́ tan nípasẹ̀ ìyọ̀nda ìpẹ̀yà taabu-kọọkan àti olùbójú tó wà nínú ìrántí. Kò ní fi awọn atilẹba kún lẹ́ẹ̀mejì.
- Pípà taabu ìkọ̀wé kan tí a sì tún ṣí i ni a kà sí taabu tuntun (ìyẹn ni pé ìsapẹẹrẹ tuntun ni a gba).
- **Ìbọ̀wọ̀ fún amúgbámu tó wà tẹ́lẹ̀:** Bí ìkọ̀wé bá ti ní diẹ̀ ninu amúgbámu, a ṣi fi awọn atilẹba kún lẹ́ẹ̀kan ṣoṣo, a sì fo orúkọ fáìlì tó ti wà tẹ́lẹ̀.
- **Ìyọkúrò:** Àwọn ohun-èlò S/MIME àti àwọn àwòrán inline ni a yọ kúrò nínú amúgbámu fáìlì. Bí kò bá sí ohun tó yẹ ní ìgbésẹ̀ àkọ́kọ́, ìbáyọ rọrùn tún ṣàyẹ̀wò àwọn apá tí kì í ṣe S/MIME. Àwọn àwòrán inline ni a ń tọjú lọ́tọ̀: a tún fi wọ́n hàn nínú ara ìfèsì gẹ́gẹ́ bí data URI (nígbà tí a bá ti muu iṣẹ́).
  - **Orúkọ fáìlì:** `smime.p7s`
  - **Ìrú MIME:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Àwòrán inline:** ẹ̀yà `image/*` kankan tí Content‑ID tọ́ka sí — a yọ kúrò lórí amúgbámu fáìlì ṣùgbọ́n a fi sínú ara ìfèsì nígbà tí "Include inline pictures" bá wà ní ON
  - **Ìmeèlì tí a so mọ́ (`message/rfc822`):** a gba wọn gẹ́gẹ́ bí amúgbámu deede bí wọ́n bá ní orúkọ fáìlì; ó ṣeé ṣe kí a fi kún (lẹ́gbẹ̀ẹ́ ìṣàyẹ̀wò ẹ̀dá-kejì àti àtòkọ́ dídẹ́kun).
- **Ìkìlọ̀ àtòkọ́ dídẹ́kun (bí a bá ti muu ṣiṣẹ́):** Nígbà tí àtòkọ́ dídẹ́kun rẹ bá yọ àwọn olùdíje kúrò,
  àfikún náà máa fi àpótí aláparọ̀ kékeré hàn tó ń ṣe àkójọ àwọn fáìlì tí ó kan àti
  àpẹẹrẹ tó bá wọn mu. Ìkìlọ̀ yìí tún hàn nígbà tí kò sí amúgbámu kankan tí yóò
  jẹ́ kó kún nítorí pé a yọ gbogbo rẹ̀ kúrò.

---

## Àwọn títẹ bọ́tìnnì kíákíá {#keyboard-shortcuts}

- Ọ̀rọ̀ ìmúlẹ̀rìí: Y/J = Bẹ́ẹ̀ni, N/Esc = Rárá; Tab/Shift+Tab àti àwọn bọ́tìnnì Ọfà ń yí ìfọkànsin padà ká.
  - “Idahun Aiyipada” nínú [Ìṣètò](configuration#confirmation) ni ó ṣètò bọ́tìnnì tí ìfọkànsin kọ́kọ́ wà lórí rẹ̀.
  - Enter ń ṣiṣẹ̀ bọ́tìnnì tó wà ní ìfọkànsin. Tab/Shift+Tab àti àwọn ọfà ń yí ìfọkànsin pa dà fún iraye-si.

### Àkọsílẹ̀ Kíkà-Kíákíá Keyboard {#keyboard-cheat-sheet}

| Bọ́tìnnì        | Ìṣe                                        |
|-----------------|--------------------------------------------|
| Y / J           | Múlẹ̀ Bẹ́ẹ̀ni                              |
| N / Esc         | Múlẹ̀ Rárá                                 |
| Enter           | Mú bọ́tìnnì tó wà ní ìfọkànsin ṣiṣẹ́       |
| Tab / Shift+Tab | Gbé ìfọkànsin síwájú/sẹ́yìn                |
| Arrow keys      | Gbé ìfọkànsin láàrín àwọn bọ́tìnnì         |
| Ìdáhùn aiyídá   | Ṣètò ìfọkànsin ìbẹ̀rẹ̀ (Bẹ́ẹ̀ni tàbí Rárá) |

---

## Àwọn Ìdíwọ̀n {#limitations}

- Àfikún yìí kì í yí Fọ́wọ́ọ̀du padà (Fèsì àti Fèsì fún Gbogbo wọn ló jẹ́ mímú ṣiṣẹ́).
- Àwọn amúgbámu tó tóbi gan-an lè fara mọ́ ìdíwọ̀n Thunderbird tàbí ti olùpèsè.
  - Àfikún náà kì í pín fáìlì sí apá tàbí di wọn kù; ó gbẹ́kẹ̀lé bí Thunderbird ṣe ń bójú tó amúgbámu ní ìṣe déédé.
- Ìfiránṣẹ́ tí a ti parọkọ: Àwọn apá S/MIME ni a yọ ní ìmọ̀lára.

---

## Kí nìdí tí amúgbámu lè má ṣe kún {#why-attachments-might-not-be-added}

- Àwọn àwòrán tí ìhìn ìpilẹ̀ fi sínú kò ní di ẹ̀dà gẹ́gẹ́ bí fáìlì. Wọ́n ti wà nínú ara ìdáhùn tẹ́lẹ̀, níbi tí Thunderbird ti fi wọ́n sí. Wo [Configuration](configuration#include-inline-pictures).
- Àwọn apá ìbuwọlu S/MIME ni a yọ ní ìmọ̀lára: àwọn orúkọ fáìlì bíi `smime.p7s` àti awọn ìrú MIME gẹ́gẹ́ bí `application/pkcs7-signature` tàbí `application/pkcs7-mime` ni a kọjá sílẹ̀.
- Àwọn àpẹrẹ àtòkọ́ dídẹ́kun lè fìlítà àwọn olùdíje: wo [Ìṣètò](configuration#blacklist-glob-patterns); fífi bà a mu kò fara mọ́ lẹ́tà ńlá/kékèké, orúkọ fáìlì nìkan ni a ka.
- A kì í tún fi orúkọ fáìlì tó jọra kún: bí ìkọ̀wé bá ti ní fáìlì kan pẹ̀lú orúkọ tí a ti dọ́gba síi, a fo o.
- Àwọn apá tí kì í ṣe fáìlì tàbí tí orúkọ fáìlì kò sí: àwọ̀n apá bí-fáìlì tó ní orúkọ fáìlì tó lè lo nìkan ni a ka sí mímú kún.

---

Wo pẹ̀lú

- [Ìṣètò](configuration)
