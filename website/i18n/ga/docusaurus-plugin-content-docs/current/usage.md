---
id: usage
title: 'Úsáid'
sidebar_label: 'Úsáid'
---

---

## Úsáid {#usage}

- Nuair a thugtar freagra, cuireann an breiseán na buncheangaltáin leis go huathoibríoch — nó iarrann sé cead ar dtús, más cumasaithe sna Roghanna.
- Baintear macasamhla de réir ainm comhaid; fágtar as an áireamh i gcónaí codanna S/MIME. Fanann íomhánna atá leabaithe sa teachtaireacht bhunaidh i gcorp an fhreagra, san áit a gcuireann Thunderbird iad, agus ní chóipeáiltear iad mar chomhaid.
- Scipeáiltear ceangaltáin ar an liosta dubh freisin (patrúin glob neamhíogaire don chás a mheaitseálann ainmneacha comhaid, ní cosáin). Féach [Cumraíocht](configuration#blacklist-glob-patterns).

---

### Cad a tharlaíonn ar fhreagairt {#what-happens}

- Braith an freagra → liostaigh na hiatáin bhunaidh → ná bac le S/MIME agus íomhánna leabaithe → deimhniú roghnach → cuir na comhaid incháilithe leis (ag scipeáil dhúblach).

| Cineál coda                                                               | Cóipeáilte chuig an bhfreagra |
|---------------------------------------------------------------------------|------------------------------:|
| Comhad sínithe S/MIME `smime.p7s`                                         | Níl                           |
| Cineálacha MIME S/MIME (`application/pkcs7-*`)                            | Níl                           |
| Íomhá a leabaíonn corp na teachtaireachta trí `cid:`                      | Níl (tá sí sa chorp)          |
| Íomhá atá marcáilte mar `Content-Disposition: inline`                     | Níl (tá sí sa chorp)          |
| Íomhá a bhfuil `Content-ID` uirthi nach ndéanann an corp tagairt riamh di | Tá                            |
| Ríomhphost ceangailte (`message/rfc822`) a bhfuil ainm comhaid air        | Tá                            |
| Gnáth-cheangaltán comhaid a bhfuil ainm comhaid air                       | Tá                            |

Ní chomhairítear íomhá mar leabaithe ach amháin nuair a dhéanann an teachtaireacht bhunaidh tagairt di go firinneach,
nó nuair a mharcáil an seoltóir go sonrach í mar `Content-Disposition: inline`. Ní leor
ceanntásc `Content-ID` amháin: cuireann go leor cliant ríomhphoist ceann ar gach cuid íomhá,
lena n-áirítear fíor-cheangaltáin, agus ní mór iad sin a chóipeáil fós.

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
|-------------------------|----------------------------------------|
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

- Ní dhéantar íomhánna a leabaíonn an teachtaireacht bhunaidh a chóipeáil mar chomhaid. Tá siad cheana féin i gcorp an fhreagra, san áit ar chuir Thunderbird iad. Féach [Cumraíocht](configuration#include-inline-pictures).
- Cuirtear páirteanna sínithe S/MIME as an áireamh de réir dearadh: scipeáiltear ainmneacha comhaid cosúil le `smime.p7s` agus cineálacha MIME ar nós `application/pkcs7-signature` nó `application/pkcs7-mime`.
- Is féidir le patrúin liosta dubh iarrthóirí a scagadh: féach [Cumraíocht](configuration#blacklist-glob-patterns); tá an comhoiriúnú neamhíogaire don chás agus dírithe ar ainm comhaid amháin.
- Ní chuirtear ainmneacha comhaid dúblacha leis arís: má tá comhad leis an ainm céanna caighdeánaithe sa chumadóireacht cheana féin, scipeáiltear é.
- Páirteanna nach comhaid iad nó ainmneacha comhaid ar iarraidh: ní chuirtear san áireamh ach codanna cosúil le comhad a bhfuil ainmneacha comhaid in‑úsáidte acu.

---

Féach freisin

- [Cumraíocht](configuration)
