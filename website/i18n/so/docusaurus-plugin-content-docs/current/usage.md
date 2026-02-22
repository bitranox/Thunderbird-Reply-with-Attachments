---
id: usage
title: 'Isticmaalka'
sidebar_label: 'Isticmaalka'
---

---

## Isticmaalka {#usage}

- Ku jawaab, kadibna kordhintu (add‑on) si toos ah ayay u dari doontaa asalka — ama marka hore way ku waydiin doontaa, haddii lagu daaray Xulashooyinka (Options).
- Is‑ku‑celcelis waxaa laga saaraa magaca faylka; qaybaha S/MIME mar walba waa la dhaafaa. Sawirrada inline waxaa caadi ahaan dib loogu soo celinayaa jidhka jawaabta (waxaad damin kartaa adigoo ka damiya "Ku dar sawirrada inline" ee Xulashooyinka).
- Lifaaqyada liiska madow ku jira sidoo kale waa la dhaafaa (qaababka glob ee aan kala soocin xarfo waaweyn/yaryar oo ku ekaada magacyada faylka, ma aha waddooyinka). Eeg [Habayn](configuration#blacklist-glob-patterns).

---

### Maxaa dhaca marka la jawaabo {#what-happens}

- Ogaansho jawaab → tax lifaaqyadii asalka ahaa → shaandhee S/MIME + inline → xaqiijin ikhtiyaari ah → ku dar faylasha u qalma (ka bood kuwa soo noqnoqda) → ku soo celi sawirrada inline jidhka.

Wareeg adag vs. wareeg dabacsan: Kordhintu marka hore waxay ka reebtaa fayl‑lifaaqyada qaybaha S/MIME iyo kuwa inline. Haddii waxba u qalmin, waxay ordaa wareeg dabacsan oo weli ka reeba S/MIME/inline balse u dulqaata xaalado dheeraad ah (eeg Faahfaahinta Koodhka). Sawirrada inline waligood looma daro sidii fayl‑lifaaqyo; taa beddelkeeda, marka "Ku dar sawirrada inline" la daaray (caadiga), waxaa si toos ah loogu xidhaa jidhka jawaabta iyagoo ah base64 data URI‑yo.

| Nooca qaybta                                           |                                 Wareeg adag |                             Wareeg dabacsan |
| ------------------------------------------------------ | ------------------------------------------: | ------------------------------------------: |
| Fayl saxeex S/MIME `smime.p7s`                         |                                 Laga reebay |                                 Laga reebay |
| Noocyada MIME ee S/MIME (`application/pkcs7-*`)        |                                 Laga reebay |                                 Laga reebay |
| Sawir inline oo lagu tixraacay Content‑ID (`image/*`)  | Laga reebay (dib loogu soo celiyo jidhka\*) | Laga reebay (dib loogu soo celiyo jidhka\*) |
| Email la lifaaqay (`message/rfc822`) oo leh magac fayl |                                   Lama daro |                Waxaa laga yaabaa in la daro |
| Lifaaq fayl caadi ah oo leh magac                      |                Waxaa laga yaabaa in la daro |                Waxaa laga yaabaa in la daro |

\* Marka "Ku dar sawirrada inline" la daaray (default: ON), sawirrada inline waxaa lagu dhex beeraa jidhka jawaabta iyagoo ah base64 data URI‑yo halkii lagu dari lahaa fayl‑lifaaqyo ahaan. Eeg [Habayn](configuration#include-inline-pictures).

Tusaale: Lifaaqyo qaarkood waxaa ka maqan qaar ka mid ah cinwaanada (headers) hase yeeshee weli waa faylal caadi ah (ma aha inline/S/MIME). Haddii wareegga adag uusan wax helin, wareegga dabacsan ayaa aqbali kara kuwaas oo ku lifaaqi kara.

---

### Is‑tixraac {#cross-reference}

- Gudbinta (Forward) si ula kac ah looma beddelo (eeg Xaddidaadaha hoose).
- Sababaha lifaaq laga yaabo inaan la darin, eeg “Sababaha lifaaqyada laga yaabo inaan la darin”.

---

## Faahfaahinta Hab‑dhaqanka {#behavior-details}

- Ka‑hortagga nuqul labo‑laab ah: Kordhintu waxay calaamadeysaa tab‑ka qorista inuu la shaqeeyey iyadoo adeegsanaysa qiime kal‑fadhi tab‑kasta ah iyo ilaaliye ku jira xusuusta. Marnaba ma dari doonto asalka laba jeer.
- Xiridda iyo dib‑furitaanka daaqadda qorista waxaa loola dhaqmaa sidii tab cusub (tusaale, isku day cusub waa la oggol yahay).
- Ixtiraam lifaaqyada jira: Haddii qoristu durba leedahay lifaaqyo, kuwa asalka ah weli hal mar oo keliya ayaa lagu daraa, iyadoo laga boodayo magacyada faylasha hore u jira.
- Ka‑reebitaanno: Qalabyada S/MIME iyo sawirrada inline waxaa laga reebaa fayl‑lifaaqyada. Haddii waxba u qalmin wareegga koowaad, wareeg dabacsan ayaa dib u hubiya qaybaha aan S/MIME ahayn. Sawirrada inline si gooni ah ayaa loo maareeyaa: waxaa dib loogu soo celinayaa jidhka jawaabta iyagoo ah data URI‑yo (marka la daaray).
  - Magacyada faylka: `smime.p7s`
  - Noocyada MIME: `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - Sawirrada inline: qayb kasta oo `image/*` ah oo lagu tixraacay Content‑ID — laga reebay fayl‑lifaaqyada balse lagu dhex beeray jidhka jawaabta marka "Ku dar sawirrada inline" ay ON tahay
  - Emayllada la lifaaqay (`message/rfc822`): waxaa loola dhaqmaa sidii lifaaqyo caadi ah haddii ay leeyihiin magac fayl; waa la dari karaa (iyada oo la tixgelinayo hubinta nuqul iyo liiska madow).
- Digniinta liiska madow (haddii la daaray): Marka musharrixiinta lagu reebo liiskaaga madow,
  kordhintu waxay soo bandhigtaa daaqad yar oo taxaysa faylasha saameeyay iyo qaabka/qaababka u dhigma.
  Digniintan sidoo kale way muuqataa marka wax lifaaq ah aan la dari doonin sababtoo ah wax walba waa la reebay.

---

## Furayaasha gaagaaban {#keyboard-shortcuts}

- Daaqadda xaqiijinta: Y/J = Haa, N/Esc = Maya; Tab/Shift+Tab iyo furayaasha fallaaraha ayaa wareejiya diiradda.
  - “Jawaabta caadiga ah” ee [Habayn](configuration#confirmation) ayaa dejisa badhanka hore loo diiradda saaro.
  - Enter wuxuu dhaqaajiyaa badhanka diiradda saaranyahay. Tab/Shift+Tab iyo fallaaraha waxay dhaqaajiyaan diiradda si loo helo marin u helitaan.

### Xaashida kooban ee furayaasha {#keyboard-cheat-sheet}

| Furayaasha            | Fal                                         |
| --------------------- | ------------------------------------------- |
| Y / J                 | Xaqiiji Haa                                 |
| N / Esc               | Xaqiiji Maya                                |
| Enter                 | Dhaqaaji badhanka diiradda saaranyahay      |
| Tab / Shift+Tab       | Dhaqaaji diiradda hore/dambe                |
| Furayaasha fallaaraha | Dhaqaaji diiradda inta u dhexeysa badhamada |
| Jawaabta caadiga ah   | Deji diiradda bilowga (Haa ama Maya)        |

---

## Xaddidaado {#limitations}

- Gudbinta (Forward) kani ma beddelo (Reply iyo Reply all waa la taageeraa).
- Lifaaqyo aad u waaweyn waxaa saameyn kara xaddidaadaha Thunderbird ama adeeg‑bixiyaha.
  - Kordhintu ma kala jarjarayso ama ma cadaadinayso faylasha; waxay ku tiirsan tahay maaraynta lifaaqyada ee caadiga ah ee Thunderbird.
- Farriimaha la siray: qaybaha S/MIME si ula kac ah ayaa loo reebaa.

---

## Sababaha lifaaqyada laga yaabo inaan la darin {#why-attachments-might-not-be-added}

- Sawirrada inline looma darin fayl‑lifaaqyo ahaan. Marka "Ku dar sawirrada inline" ay ON tahay (caadiga), taa beddelkeeda waxaa lagu dhex beeraa jidhka jawaabta iyagoo ah data URI‑yo. Haddii dejintu OFF tahay, sawirrada inline si buuxda ayaa loo qaadaa. Eeg [Habayn](configuration#include-inline-pictures).
- Qaybaha saxeexa S/MIME si ula kac ah ayaa loo reebaa: magacyada faylka sida `smime.p7s` iyo noocyada MIME sida `application/pkcs7-signature` ama `application/pkcs7-mime` waa la dhaafaa.
- Qaababka liiska madow waxay shaandhayn karaan musharrixiinta: eeg [Habayn](configuration#blacklist-glob-patterns); isku‑eegistu ma kala saarto xarfo waaweyn/yaryar oo waxay ku xaddidan tahay magaca faylka oo keliya.
- Magacyada faylalka isku midka ah lama soo celceliyo: haddii qoristu durba hayso fayl leh magac la caadiyeeyey oo isku mid ah, waa la dhaafaa.
- Qaybo aan fayl ahayn ama magacyo fayl oo maqan: keliya qaybaha u eg fayl oo leh magacyo fayl oo la adeegsan karo ayaa loo tixgeliyaa in la daro.

---

Sidoo kale eeg

- [Habayn](configuration)
