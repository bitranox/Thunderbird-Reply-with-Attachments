---
id: usage
title: 'Isticmaalka'
sidebar_label: 'Isticmaalka'
---

---

## Isticmaalka {#usage}

- Ku jawaab, kadibna kordhintu (add‑on) si toos ah ayay u dari doontaa asalka — ama marka hore way ku waydiin doontaa, haddii lagu daaray Xulashooyinka (Options).
- Nuqulaha isku mid ah ee magaca faylka waa laga saaraa; qaybaha S/MIME had iyo jeer waa la boodaa. Sawirrada ku dhex jira fariinta asalka ah waxay ku sii jiraan jawaabta jidhkeeda, meesha Thunderbird ay geliyaan, mana koobiyeeyaan sida fayl.
- Lifaaqyada liiska madow ku jira sidoo kale waa la dhaafaa (qaababka glob ee aan kala soocin xarfo waaweyn/yaryar oo ku ekaada magacyada faylka, ma aha waddooyinka). Eeg [Habayn](configuration#blacklist-glob-patterns).

---

### Maxaa dhaca marka la jawaabo {#what-happens}

- Ogow jawaabta → liiskoobi lifaaqyada asalka ah → ka bood S/MIME iyo sawirrada ku dhex jira → xaqiijin ikhtiyaari ah → ku dar faylasha u qalma (iyada oo laga boodayo kuwa isku mid ah).

| Nooca qaybta                                           | Ku koobiyeeyay jawaabta      |
|--------------------------------------------------------|-----------------------------:|
| Faylka saxeexa S/MIME ee `smime.p7s`                   | Maya                         |
| Noocyada MIME ee S/MIME (`application/pkcs7-*`)        | Maya                         |
| Sawir uu jidhka fariintu ku daro `cid:`                | Maya (wuxuu ku jiraa jidhka) |
| Sawir lagu calaamadeeyay `Content-Disposition: inline` | Maya (wuxuu ku jiraa jidhka) |
| Sawir leh `Content-ID` aan jidhku weligiis tixraacin   | Haa                          |
| Iimayl lifaaqan (`message/rfc822`) oo leh magac fayl   | Haa                          |
| Lifaaqid fayl caadi ah oo leh magac fayl               | Haa                          |

Sawirku wuxuu u tiraahdaa mid ku dhex jira oo kaliya markuu fariinta asalka ahi runtii tixraacayo,
ama marka soo diriyuhu si cad ugu calaamadeeyay `Content-Disposition: inline`. Titiraale
`Content-ID` oo kaliya kuma filna: barnaamijyo iimayl badan ayaa mid ku dari qayb sawir kasta,
oo ay ku jiraan lifaaqyo dhab ah, kuwaasoo weli looga baahan yahay in la koobiyeeyo.

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
|-----------------------|---------------------------------------------|
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

- Sawirrada uu farriintii asalka ahi ku dhex geliyay lama koobiyeeyo sida faylal. Waxay horeba ugu jiraan qoraalka jawaabta, meesha Thunderbird ay geeyay. Fiiri [Configuration](configuration#include-inline-pictures).
- Qaybaha saxeexa S/MIME si ula kac ah ayaa loo reebaa: magacyada faylka sida `smime.p7s` iyo noocyada MIME sida `application/pkcs7-signature` ama `application/pkcs7-mime` waa la dhaafaa.
- Qaababka liiska madow waxay shaandhayn karaan musharrixiinta: eeg [Habayn](configuration#blacklist-glob-patterns); isku‑eegistu ma kala saarto xarfo waaweyn/yaryar oo waxay ku xaddidan tahay magaca faylka oo keliya.
- Magacyada faylalka isku midka ah lama soo celceliyo: haddii qoristu durba hayso fayl leh magac la caadiyeeyey oo isku mid ah, waa la dhaafaa.
- Qaybo aan fayl ahayn ama magacyo fayl oo maqan: keliya qaybaha u eg fayl oo leh magacyo fayl oo la adeegsan karo ayaa loo tixgeliyaa in la daro.

---

Sidoo kale eeg

- [Habayn](configuration)
