---
id: usage
title: 'Amfani'
sidebar_label: 'Amfani'
---

---

## Amfani {#usage}

- Amsa kuma ƙarin manhaja yana ƙara asalin fayiloli ta atomatik — ko kuma yana tambaya da farko, idan an kunna a Zaɓuɓɓuka.
- Ana cire kwafi ta amfani da sunan fayil; ana tsallake sassan S/MIME koyaushe. Hotunan da aka saka a cikin sakon asali suna zama a cikin jikin amsa, inda Thunderbird ke sanya su, kuma ba a kwafe su a matsayin fayiloli ba.
- Abubuwan haɗe da ke cikin jerin-hana (blacklist) ma ana tsallake su (daidaiton glob mara bambancin manya/ƙananan haruffa ga sunayen fayil kawai, ba hanyoyi). Duba [Saituna](configuration#blacklist-glob-patterns).

---

### Abin da yake faruwa lokacin amsawa {#what-happens}

- Gano amsa → lissafa abubuwan da aka makala na asali → tsallake S/MIME da hotunan da aka saka → tabbatarwa ta zaɓi → ƙara fayilolin da suka cancanta (ana tsallake kwafi).

| Nau'in sashi                                                 | An kwafe zuwa amsa    |
|--------------------------------------------------------------|----------------------:|
| Fayil na sa hannu na S/MIME `smime.p7s`                      | A'a                   |
| Nau'ikan MIME na S/MIME (`application/pkcs7-*`)              | A'a                   |
| Hoton da jikin sakon ya saka ta hanyar `cid:`                | A'a (yana cikin jiki) |
| Hoton da aka yiwa alama da `Content-Disposition: inline`     | A'a (yana cikin jiki) |
| Hoton da ke da `Content-ID` wanda jiki bai taɓa ambatarsa ba | Ee                    |
| Imel da aka haɗa (`message/rfc822`) tare da sunan fayil      | Ee                    |
| Fayil na yau da kullum da aka haɗa tare da sunan fayil       | Ee                    |

Ana ɗaukar hoto a matsayin wanda aka saka ne kawai lokacin da sakon asali ya ambace shi da gaske,
ko kuma lokacin da mai aikawa ya yiwa alama fili-fili da `Content-Disposition: inline`. Kawai
kanun `Content-ID` bai isa ba: yawancin masu amfani da imel suna sanya ɗaya a kan kowane sashin hoto,
har da kayan haɗi na gaskiya, kuma dole ne a kwafe waɗannan duk da haka.

---

### Nuni na giciye {#cross-reference}

- Tura gaba ba a canza shi ba bisa ƙira (duba Iyakoki a ƙasa).
- Don dalilan da zai sa abin haɗe bai ƙaru ba, duba “Dalilin da ya sa abubuwan haɗe na iya kasa ƙaruwa”.

---

## Cikakkun bayanin Halayya {#behavior-details}

- **Rigakafin maimaituwa:** Ƙarin manhaja yana alamar shafin rubuta saƙo an sarrafa shi ta amfani da ƙimar zaman kowane shafi da kuma katangar kariya a ƙwaƙwalwa. Ba zai ƙara asali sau biyu ba.
- Rufe da buɗe taga rubuta saƙo daga baya ana ɗaukarsa a matsayin sabon shafi (wato, ana yarda da sabon yunƙuri).
- **Girmama abin haɗe da ke akwai:** Idan shafin rubuta saƙo ya riga ya ƙunshi wasu abubuwan haɗe, har yanzu za a ƙara na asali sau ɗaya tak, ana tsallake sunayen fayil da suka riga suka wanzu.
- **Keɓewa:** Kayayyakin S/MIME da hotunan inline ana ware su daga abubuwan haɗe na fayil. Idan babu abin da ya cancanta a wucewar farko, wani madadin mai sassauci zai sake duba sassan da ba S/MIME ba. Ana kula da hotunan inline dabam: ana mayar da su a jikin amsa a matsayin data URI (idan an kunna).
  - **Sunayen fayil:** `smime.p7s`
  - **Nau'ikan MIME:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Hotunan inline:** kowanne ɓangaren `image/*` da Content‑ID ya yi nuni da shi — an ware shi daga abubuwan haɗe na fayil amma ana lulluɓe shi a jikin amsa idan "Include inline pictures" yana ON
  - **Imel da aka haɗa (`message/rfc822`):** ana ɗaukar su a matsayin abubuwan haɗe na yau da kullum idan suna da sunan fayil; ana iya ƙara su (dangane da binciken maimaituwa da jerin-hana).
- **Gargadin jerin-hana (idan an kunna):** Lokacin da aka ware 'yan takara ta jerin-hanarku,
  ƙarin manhaja yana nuna ƙaramin taga na sanarwa da ke jera fayilolin da abin ya shafa da
  tsari/tsare-tsaren da suka dace. Wannan gargadin ma yana bayyana a lokuta inda ba za a ƙara
  kowane abin haɗe ba domin an ware komai.

---

## Gajerun hanyoyin madannai {#keyboard-shortcuts}

- Tattaunawar tabbaci: Y/J = Eh, N/Esc = A'a; Tab/Shift+Tab da makullan kibiyoyi suna juyar da hankali.
  - “Amsa ta tsoho” a cikin [Saituna](configuration#confirmation) tana saita maballin da aka fara mai da hankali a kai.
  - Enter yana tayar da maballin da aka mai da hankali. Tab/Shift+Tab da kibiyoyi suna motsa hankali don samun damar shiga ga kowa.

### Takardar Taƙaitaccen Makullan {#keyboard-cheat-sheet}

| Makullan        | Aiki                               |
|-----------------|------------------------------------|
| Y / J           | Tabbatar da Eh                     |
| N / Esc         | Tabbatar da A'a                    |
| Enter           | Kunna maballin da ya sami hankali  |
| Tab / Shift+Tab | Matsar da hankali gaba/baya        |
| Makullan kibiya | Matsar da hankali tsakanin maballu |
| Amsa ta tsoho   | Saita hankalin farko (Eh ko A'a)   |

---

## Iyakoki {#limitations}

- Tura gaba ba a canza shi da wannan ƙarin manhaja (Amsa da Amsa ga kowa ana tallafawa).
- Manyan abubuwan haɗe ƙwarai na iya fuskantar iyakokin Thunderbird ko na mai ba da sabis.
  - Ƙarin manhajar ba ya raba fayiloli zuwa sassa ko matse su; yana dogara da yadda Thunderbird ke sarrafa abubuwan haɗe na yau da kullum.
- Saƙonni da aka ɓoye: Sassan S/MIME an ware su da gangan.

---

## Dalilin da ya sa abubuwan haɗe na iya kasa ƙaruwa {#why-attachments-might-not-be-added}

- Hotunan da sakon asali ya saka a ciki ba a kwafe su a matsayin fayiloli ba. Sun riga sun kasance a jikin amsar, inda Thunderbird ya sanya su. Duba [Configuration](configuration#include-inline-pictures).
- Sassan sa hannun S/MIME an ware su bisa ƙira: sunayen fayil kamar `smime.p7s` da nau'ikan MIME kamar `application/pkcs7-signature` ko `application/pkcs7-mime` ana tsallake su.
- Tsare-tsaren jerin-hana na iya tace 'yan takara: duba [Saituna](configuration#blacklist-glob-patterns); daidaitawa ba ya la'akari da manya ko ƙananan haruffa kuma ga sunan fayil kaɗai.
- Ba a ƙara sunayen fayil masu maimaituwa ba: idan shafin rubuta saƙo ya rigaya yana ƙunshe da fayil mai suna iri ɗaya da aka daidaita, ana tsallake shi.
- Sassan da ba fayil ba ko rashin sunayen fayil: ana ɗaukar kawai sassan da suka yi kama da fayil masu amfani da sunayen fayil don ƙari.

---

Duba ma

- [Saituna](configuration)
