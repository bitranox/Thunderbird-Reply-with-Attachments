---
id: usage
title: 'Matumizi'
sidebar_label: 'Matumizi'
---

---

## Matumizi {#usage}

- Jibu na kiendelezi kitaongeza asili kiotomatiki — au kitauliza kwanza, ikiwa imewezeshwa katika Chaguo.
- Nakala zinazofanana huondolewa kwa kutumia jina la faili; sehemu za S/MIME huruka kila wakati. Picha zilizopachikwa kwenye ujumbe asilia hubaki kwenye mwili wa jibu, mahali Thunderbird huziweka, na hazinakiliwa kama faili.
- Viambatisho vilivyo kwenye orodha nyeusi pia hurukwa (miundo ya glob isiyojali herufi kubwa/ndogo inayolingana na majina ya faili, si njia). Tazama [Usanidi](configuration#blacklist-glob-patterns).

---

### Kinachotokea unapojibu {#what-happens}

- Gundua jibu → orodhesha viambatisho asili → ruka S/MIME na picha zilizopachikwa → uthibitisho wa hiari → ongeza faili zinazostahili (ukiruka nakala zinazofanana).

| Aina ya sehemu                                                      | Imenakiliwa kwenye jibu     |
|---------------------------------------------------------------------|----------------------------:|
| Faili la sahihi la S/MIME `smime.p7s`                               | Hapana                      |
| Aina za MIME za S/MIME (`application/pkcs7-*`)                      | Hapana                      |
| Picha inayopachikwa na mwili wa ujumbe kupitia `cid:`               | Hapana (iko ndani ya mwili) |
| Picha iliyowekwa alama `Content-Disposition: inline`                | Hapana (iko ndani ya mwili) |
| Picha yenye `Content-ID` ambayo mwili haurejelei kamwe              | Ndiyo                       |
| Barua pepe iliyoambatanishwa (`message/rfc822`) yenye jina la faili | Ndiyo                       |
| Kiambatisho cha kawaida cha faili chenye jina la faili              | Ndiyo                       |

Picha huhesabiwa kuwa imepachikwa tu wakati ujumbe asilia unairejelea kwa hakika, au
wakati mtumaji ameiweka alama waziwazi `Content-Disposition: inline`. Kichwa cha
`Content-ID` peke yake hakitoshi: baadhi ya programu za barua pepe huweka kimoja kwenye
kila sehemu ya picha, ikiwemo viambatisho halisi, ambavyo bado lazima vinakiliwe.

---

### Marejeo mtambuka {#cross-reference}

- Forward hakubadilishwa kimakusudi (tazama Vikwazo hapa chini).
- Kwa sababu zinazoweza kufanya kiambatisho kisiongezwe, tazama “Kwa nini viambatisho vinaweza visiwekwe”.

---

## Maelezo ya Tabia {#behavior-details}

- **Kuzuia marudio:** Kiendelezi hutiwa alama kuwa kichupo cha uandishi (compose) kimetumika kwa kutumia thamani ya kikao kwa kila kichupo na ulinzi wa kumbukumbu ya ndani. Hakitaongeza asili mara mbili.
- Kufunga na kufungua tena dirisha la uandishi huchukuliwa kama kichupo kipya (yaani, jaribio jipya linakubaliwa).
- **Kuheshimu viambatisho vilivyopo:** Ikiwa uandishi tayari una viambatisho, vya asili vitaongezwa mara moja tu, vikikwepa majina ya faili ambayo tayari yapo.
- **Uondoaji:** Vitu vya S/MIME na picha za ndani vimeondolewa kutoka kwa viambatisho vya faili. Ikiwa hakuna kinachostahili kwenye upitishaji wa kwanza, mbadala mlegevu hukagua tena sehemu zisizo za S/MIME. Picha za ndani hushughulikiwa kando: hurudishwa kwenye mwili wa jibu kama data URI (zinapowezeshwa).
  - **Majina ya faili:** `smime.p7s`
  - **Aina za MIME:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Picha za ndani:** sehemu yoyote ya `image/*` inayorejelewa na Content‑ID — imeondolewa kutoka kwa viambatisho vya faili lakini huingizwa kwenye mwili wa jibu wakati "Jumuisha picha za ndani" imewashwa
  - **Barua pepe zilizoambatishwa (`message/rfc822`):** huchukuliwa kama viambatisho vya kawaida iwapo vina jina la faili; vinaweza kuongezwa (kutegemea ukaguzi wa marudio na orodha nyeusi).
- **Onyo la orodha nyeusi (likiwezeshwa):** Wakati wagombea wameondolewa na orodha yako nyeusi,
  kiendelezi kinaonyesha kidirisha kidogo kinachoonyesha faili zilizoathiriwa na
  muundo unaolingana. Onyo hili pia hutokea katika hali ambazo hakuna viambatisho
  vitakavyoongezwa kwa sababu kila kitu kimeondolewa.

---

## Njia za mkato za kibodi {#keyboard-shortcuts}

- Kisanduku cha uthibitisho: Y/J = Ndiyo, N/Esc = Hapana; Tab/Shift+Tab na funguo za Mishale huzungusha mkazo.
  - "Jibu chaguo-msingi" katika [Usanidi](configuration#confirmation) huweka kitufe chenye mkazo mwanzoni.
  - Enter huendesha kitufe chenye mkazo. Tab/Shift+Tab na mishale huahamisha mkazo kwa ufikikaji.

### Mwongozo wa haraka wa kibodi {#keyboard-cheat-sheet}

| Funguo             | Kitendo                                 |
|--------------------|-----------------------------------------|
| Y / J              | Thibitisha Ndiyo                        |
| N / Esc            | Thibitisha Hapana                       |
| Enter              | Amsha kitufe chenye mkazo               |
| Tab / Shift+Tab    | Hamisha mkazo mbele/nyuma               |
| Funguo za mishale  | Hamisha mkazo kati ya vitufe            |
| Jibu chaguo-msingi | Huweka mkazo wa awali (Ndiyo au Hapana) |

---

## Vikwazo {#limitations}

- Forward habadilishwa na kiendelezi hiki (Reply na Reply all vinatumika).
- Viambatisho vikubwa sana vinaweza kukabiliwa na mipaka ya Thunderbird au mtoa huduma.
  - Kiendelezi hakigawanyi vipande wala kubana faili; kinategemea utaratibu wa kawaida wa Thunderbird wa kushughulikia viambatisho.
- Ujumbe uliofichwa: sehemu za S/MIME zimeondolewa kimakusudi.

---

## Kwa nini viambatisho vinaweza visiwekwe {#why-attachments-might-not-be-added}

- Picha ambazo ujumbe asili unazipachika hazinakiliwi kama faili. Tayari ziko katika mwili wa jibu, mahali Thunderbird ilipoziweka. Angalia [Configuration](configuration#include-inline-pictures).
- Sehemu za sahihi za S/MIME zimeondolewa kimakusudi: majina ya faili kama `smime.p7s` na aina za MIME kama `application/pkcs7-signature` au `application/pkcs7-mime` hurukwa.
- Miundo ya orodha nyeusi inaweza kuchuja wagombea: tazama [Usanidi](configuration#blacklist-glob-patterns); ulinganishaji haujali herufi kubwa/ndogo na unahusu jina la faili pekee.
- Majina ya faili yaliyorudiwa hayaongezwi tena: ikiwa uandishi tayari una faili yenye jina sawa lililowekwa kawaida, huachwa.
- Sehemu zisizo za faili au majina ya faili yaliyokosekana: ni sehemu zinazofanana na faili zenye majina ya faili yanayotumika pekee ndizo zinazozingatiwa kuongezwa.

---

Tazama pia

- [Usanidi](configuration)
