---
id: usage
title: 'Matumizi'
sidebar_label: 'Matumizi'
---

---

## Matumizi {#usage}

- Jibu na kiendelezi kitaongeza asili kiotomatiki — au kitauliza kwanza, ikiwa imewezeshwa katika Chaguo.
- Uduplikishaji huondolewa kwa mujibu wa jina la faili; sehemu za S/MIME hurukwa kila wakati. Picha za ndani hurudishwa kwenye mwili wa jibu kwa chaguo-msingi (zima kupitia "Jumuisha picha za ndani" katika Chaguo).
- Viambatisho vilivyo kwenye orodha nyeusi pia hurukwa (miundo ya glob isiyojali herufi kubwa/ndogo inayolingana na majina ya faili, si njia). Tazama [Usanidi](configuration#blacklist-glob-patterns).

---

### Kinachotokea unapojibu {#what-happens}

- Tambua jibu → orodhesha viambatisho asili → chuja S/MIME + vya ndani → thibitisha (hiari) → ongeza faili zinazostahiki (ruka vilivyojirudia) → rejesha picha za ndani kwenye mwili.

Upitishaji mkali dhidi ya mlegevu: Kiendelezi kwanza huondoa sehemu za S/MIME na za ndani kutoka kwa viambatisho vya faili. Ikiwa hakuna kinachostahili, hufanya upitishaji mlegevu ambao bado huondoa S/MIME/vya ndani lakini huruhusu visa zaidi (tazama Maelezo ya Msimbo). Picha za ndani haziongezwi kamwe kama viambatisho vya faili; badala yake, wakati "Jumuisha picha za ndani" imewezeshwa (chaguo-msingi), huingizwa moja kwa moja kwenye mwili wa jibu kama data URI za base64.

| Aina ya sehemu                                                    |                       Upitishaji mkali |                     Upitishaji mlegevu |
| ----------------------------------------------------------------- | -------------------------------------: | -------------------------------------: |
| Faili ya sahihi ya S/MIME `smime.p7s`                             |                              Imetengwa |                              Imetengwa |
| Aina za MIME za S/MIME (`application/pkcs7-*`)                    |                              Imetengwa |                              Imetengwa |
| Picha ya ndani iliyorejelewa na Content‑ID (`image/*`)            | Imetengwa (inarejeshwa kwenye mwili\*) | Imetengwa (inarejeshwa kwenye mwili\*) |
| Barua pepe iliyoambatishwa (`message/rfc822`) yenye jina la faili |                             Haiongezwi |                      Huenda ikaongezwa |
| Kiambatisho cha faili cha kawaida chenye jina la faili            |                     Huenda kikaongezwa |                     Huenda kikaongezwa |

\* Wakati "Jumuisha picha za ndani" imewezeshwa (chaguo-msingi: IMEWASHWA), picha za ndani huingizwa kwenye mwili wa jibu kama data URI za base64 badala ya kuongezwa kama viambatisho vya faili. Tazama [Usanidi](configuration#include-inline-pictures).

Mfano: Baadhi ya viambatisho vinaweza kukosa vichwa fulani lakini bado vikawa faili za kawaida (si za ndani/S/MIME). Ikiwa upitishaji mkali haupati chochote, upitishaji mlegevu unaweza kuvipokea na kuviambatisha.

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
| ------------------ | --------------------------------------- |
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

- Picha za ndani haziwekwi kama viambatisho vya faili. Wakati "Jumuisha picha za ndani" imewashwa (chaguo-msingi), huingizwa kwenye mwili wa jibu kama data URI badala yake. Ikiwa kiseti kimezimwa, picha za ndani huondolewa kabisa. Tazama [Usanidi](configuration#include-inline-pictures).
- Sehemu za sahihi za S/MIME zimeondolewa kimakusudi: majina ya faili kama `smime.p7s` na aina za MIME kama `application/pkcs7-signature` au `application/pkcs7-mime` hurukwa.
- Miundo ya orodha nyeusi inaweza kuchuja wagombea: tazama [Usanidi](configuration#blacklist-glob-patterns); ulinganishaji haujali herufi kubwa/ndogo na unahusu jina la faili pekee.
- Majina ya faili yaliyorudiwa hayaongezwi tena: ikiwa uandishi tayari una faili yenye jina sawa lililowekwa kawaida, huachwa.
- Sehemu zisizo za faili au majina ya faili yaliyokosekana: ni sehemu zinazofanana na faili zenye majina ya faili yanayotumika pekee ndizo zinazozingatiwa kuongezwa.

---

Tazama pia

- [Usanidi](configuration)
