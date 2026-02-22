---
id: usage
title: 'Úsáid'
sidebar_label: 'Úsáid'
---

---

## Úsáid {#usage}

- Nuair a thugtar freagra, cuireann an breiseán na buncheangaltáin leis go huathoibríoch — nó iarrann sé cead ar dtús, más cumasaithe sna Roghanna.
- Baintear dúbailtí de réir ainm comhaid; ní chuirtear páirteanna S/MIME san áireamh riamh. Athchóirítear íomhánna inlíne i gcorp an fhreagra de réir réamhshocraithe (díchumasaigh trí "Include inline pictures" i Roghanna).
- Scipeáiltear ceangaltáin ar an liosta dubh freisin (patrúin glob neamhíogaire don chás a mheaitseálann ainmneacha comhaid, ní cosáin). Féach [Cumraíocht](configuration#blacklist-glob-patterns).

---

### Cad a tharlaíonn ar fhreagairt {#what-happens}

- Braith freagra → liostaigh na bunchiangaltáin → scag S/MIME + inlíne → deimhniú roghnach → cuir na comhaid incháilithe leis (scipeáil dúbailtí) → athchóirigh íomhánna inlíne sa chorp.

Pas docht vs. pas scaoilte: Cuireann an breiseán páirteanna S/MIME agus inlíne as an áireamh ó cheangaltáin chomhaid ar dtús. Mura gcáilíonn faic, ritheann sé pas níos scaoilte a chuireann S/MIME/inlíne as an áireamh fós ach a cheadaíonn tuilleadh cásanna (féach Mionsonraí Cóid). Ní chuirtear íomhánna inlíne leis mar cheangaltáin chomhaid riamh; ina ionad sin, nuair a bhíonn "Include inline pictures" cumasaithe (an réamhshocrú), leabhaítear iad go díreach i gcorp an fhreagra mar URIanna sonraí base64.

| Cineál páirte                                             |                         Pas docht |                      Pas scaoilte |
| --------------------------------------------------------- | --------------------------------: | --------------------------------: |
| Comhad sínithe S/MIME `smime.p7s`                         |                           Eisiata |                           Eisiata |
| Cineálacha MIME S/MIME (`application/pkcs7-*`)            |                           Eisiata |                           Eisiata |
| Íomhá inlíne a ndéanann Content‑ID tagairt di (`image/*`) | Eisiata (athchóirithe sa chorp\*) | Eisiata (athchóirithe sa chorp\*) |
| R-phost ceangailte (`message/rfc822`) le hainm comhaid    |                 Ní chuirtear leis |               Féadfar a chur leis |
| Gnáthcheangaltán comhaid le hainm comhaid                 |               Féadfar a chur leis |               Féadfar a chur leis |

\* Nuair a bhíonn "Include inline pictures" cumasaithe (réamhshocrú: ON), leabhaítear íomhánna inlíne i gcorp an fhreagra mar URIanna sonraí base64 seachas iad a chur leis mar cheangaltáin chomhaid. Féach [Cumraíocht](configuration#include-inline-pictures).

Sampla: D’fhéadfadh roinnt ceangaltán a bheith in easnamh ar cheanntásca áirithe ach is comhaid ghnáthacha iad fós (ní inlíne/S/MIME iad). Mura n-aimsíonn an pas docht aon cheann, féadfaidh an pas scaoilte iad sin a ghlacadh agus a cheangal.

---

### Tras‑tagairt {#cross-reference}

- Ní mhodhnaítear Forward de réir dearadh (féach Teorainneacha thíos).
- Le cúiseanna nach bhféadfaí ceangaltán a chur leis, féach “Cén fáth nach bhféadfaí ceangaltáin a chur leis”.

---

## Mionsonraí Iompraíochta {#behavior-details}

- **Cosc dúbailtí:** Marcálann an breiseán an cluaisín cumadóireachta mar phróiseáilte ag úsáid luach seisiúin in aghaidh cluaisín agus cosantóir i gcuimhne. Ní chuirfidh sé na buncheangaltáin leis faoi dhó.
- Meastar gur cluaisín nua é fuinneog chumadóireachta a dhúnadh agus a athoscailt (is é sin, ceadaítear iarracht nua).
- **Meas ar cheangaltáin atá ann:** Má tá roinnt ceangaltán sa chumadóireacht cheana féin, cuirtear na buncheangaltáin leis go díreach uair amháin fós, agus déantar aon ainmneacha comhaid atá ann cheana a scipeáil.
- **Eisiaimh:** Cuirtear déantáin S/MIME agus íomhánna inlíne as an áireamh ó cheangaltáin chomhaid. Mura gcáilíonn faic ar an gcéad phas, déanann cúlshocrú níos scaoilte athsheiceáil ar chodanna neamh‑S/MIME. Déileáiltear le híomhánna inlíne ar leith: athchóirítear iad i gcorp an fhreagra mar URIanna sonraí (nuair a bhíonn sé cumasaithe).
  - **Ainmneacha comhaid:** `smime.p7s`
  - **Cineálacha MIME:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Íomhánna inlíne:** aon chuid `image/*` a ndéanann Content‑ID tagairt di — cuirtear as an áireamh ó cheangaltáin chomhaid í ach leabhaítear í i gcorp an fhreagra nuair atá "Include inline pictures" ar ON
  - **Ríomhphoist cheangailte (`message/rfc822`):** déileáiltear leo mar ghnáthcheangaltáin má tá ainm comhaid acu; féadfar iad a chur leis (faoi réir seiceálacha dúbailtí agus liosta dubh).
- **Rabhadh liosta dubh (má tá cumasaithe):** Nuair a dhéantar iarrthóirí a eisiamh de bharr do liosta dubh,
  taispeánann an breiseán módal beag ag liostú na gcomhad lena mbaineann agus na bpatrún
  comhoiriúnaithe. Taispeántar an rabhadh seo freisin i gcásanna nach gcuirfear aon cheangaltáin leis
  toisc gur eisiadh gach rud.

---

## Aicearraí méarchláir {#keyboard-shortcuts}

- Dialóg deimhnithe: Y/J = Tá, N/Esc = Níl; rothlaíonn Tab/Shift+Tab agus na saigheadeochracha an fócas.
  - Socraíonn an “Freagra réamhshocraithe” i [Cumraíocht](configuration#confirmation) an cnaipe a fhaigheann an fócas ar dtús.
  - Spreagann Enter an cnaipe faoi fhócas. Bogann Tab/Shift+Tab agus saigheadeochracha an fócas ar mhaithe le hinrochtaineacht.

### Bileog Chuimhne Méarchláir {#keyboard-cheat-sheet}

| Eochracha               | Gníomh                                 |
| ----------------------- | -------------------------------------- |
| Y / J                   | Deimhnigh Tá                           |
| N / Esc                 | Deimhnigh Níl                          |
| Enter                   | Gníomhachtaigh an cnaipe faoi fhócas   |
| Tab / Shift+Tab         | Bog an fócas ar aghaidh/ar gcúl        |
| Saigheadeochracha       | Bog an fócas idir cnaipí               |
| Freagra réamhshocraithe | Socraíonn an fócas tosaigh (Tá nó Níl) |

---

## Teorainneacha {#limitations}

- Ní mhodhnaíonn an breiseán seo Forward (tacaítear le Reply agus Reply all).
- D’fhéadfadh teorainneacha Thunderbird nó an tsoláthraí a bheith i bhfeidhm ar cheangaltáin an‑mhóra.
  - Ní dhéanann an breiseán roinnt ina phíosaí ná comhbhrú ar chomhaid; braitheann sé ar ghnáthláimhseáil ceangaltán Thunderbird.
- Teachtaireachtaí criptithe: cuirtear páirteanna S/MIME as an áireamh d’aon turas.

---

## Cén fáth nach bhféadfaí ceangaltáin a chur leis {#why-attachments-might-not-be-added}

- Ní chuirtear íomhánna inlíne leis mar cheangaltáin chomhaid. Nuair a bhíonn "Include inline pictures" ar ON (an réamhshocrú), leabhaítear iad i gcorp an fhreagra mar URIanna sonraí ina ionad sin. Má tá an socrú ar OFF, baintear íomhánna inlíne go hiomlán. Féach [Cumraíocht](configuration#include-inline-pictures).
- Cuirtear páirteanna sínithe S/MIME as an áireamh de réir dearadh: scipeáiltear ainmneacha comhaid cosúil le `smime.p7s` agus cineálacha MIME ar nós `application/pkcs7-signature` nó `application/pkcs7-mime`.
- Is féidir le patrúin liosta dubh iarrthóirí a scagadh: féach [Cumraíocht](configuration#blacklist-glob-patterns); tá an comhoiriúnú neamhíogaire don chás agus dírithe ar ainm comhaid amháin.
- Ní chuirtear ainmneacha comhaid dúblacha leis arís: má tá comhad leis an ainm céanna caighdeánaithe sa chumadóireacht cheana féin, scipeáiltear é.
- Páirteanna nach comhaid iad nó ainmneacha comhaid ar iarraidh: ní chuirtear san áireamh ach codanna cosúil le comhad a bhfuil ainmneacha comhaid in‑úsáidte acu.

---

Féach freisin

- [Cumraíocht](configuration)
