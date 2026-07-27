---
id: usage
title: 'Ojiji'
sidebar_label: 'Ojiji'
---

---

## Ojiji {#usage}

- Zaa ma mgbakwunye ahụ na-etinye ndị mbụ n’onwe ya — ma ọ bụ jụọ tupu ya, ma ọ bụrụ na etinyere ya na Nhọrọ.
- Ewepụrụ ndozigharị dabere na aha faịlụ; a na-ahapụ akụkụ S/MIME mgbe niile. Foto ndị e tinyere n'ime ozi mbụ na-anọgide n'ahụ nzaghachi, ebe Thunderbird na-edobe ha, ọ dịghịkwa na-edepụta ha dị ka faịlụ.
- A na-agbagharakwa ndokwụnye faịlụ nọ na ndepụta ojii (usoro glob na-echefughị obere/akapkwọ mkpụrụedemede na-adabara aha faịlụ, ọ bụghị ụzọ). Lee [Nhazi](configuration#blacklist-glob-patterns).

---

### Gịnị na-eme mgbe azaghachi {#what-happens}

- Chọpụta nzaghachi → depụta ihe mmado mbụ → hapụ S/MIME na foto agbakwunyere → nkwenye nhọrọ → tinye faịlụ ndị ruru eru (na-ahapụ ndị ọzọzọ).

| Ụdị akụkụ                                                   | Edepụtara na nzaghachi |
|-------------------------------------------------------------|-----------------------:|
| Faịlụ mbinye aka S/MIME `smime.p7s`                         | Mba                    |
| Ụdị MIME nke S/MIME (`application/pkcs7-*`)                 | Mba                    |
| Foto ahụ ozi ji `cid:` tinye                                | Mba (ọ nọ n'ahụ ozi)   |
| Foto e tinyere akara `Content-Disposition: inline`          | Mba (ọ nọ n'ahụ ozi)   |
| Foto nwere `Content-ID` nke ahụ ozi na-adịghị ezo aka na ya | Ee                     |
| Email etinyere (`message/rfc822`) nwere aha faịlụ           | Ee                     |
| Ihe mgbakwunye faịlụ nkịtị nwere aha faịlụ                  | Ee                     |

Foto na-agụ dị ka nke etinyere naanị mgbe ozi mbụ ahụ ezo aka na ya n'ezie, ma ọ bụ mgbe onye zitere ya kwuru hoo haa na ọ bụ `Content-Disposition: inline`. Naanị ihe isiokwu `Content-ID` ezughị ezu: ọtụtụ ngwa ozi email na-etinye otu n'akụkụ foto ọ bụla, gụnyere ezigbo ihe mgbakwunye, a ghaghịkwa idepụta ha.

---

### Ntụaka gafere {#cross-reference}

- A naghị agbanwe “Forward” n’ụdị imepụta (lee Oke n’okpuru).
- Maka ihe kpatara ndokwụnye nwere ike ọ gaghị etinye, lee “Gịnị kpatara ndokwụnye nwere ike ọ gaghị etinye”.

---

## Nkọwa Omume {#behavior-details}

- Mgbochi ugboro ugboro: Mgbakwunye ahụ na-ama tabụ ederede (compose) dịka e mere ya site n’iji uru nnọkọ kwa-tabụ na nche n’ime ebe nchekwa. Ọ gaghị etinye ndị mbụ ugboro abụọ.
- Imechi ma megharia windo compose a na-ele ya anya dịka tabụ ọhụrụ (ya bụ, a na-ekwe ka mgbalị ọzọ).
- Nsọpụrụ ndokwụnye dị adị: Ọ bụrụ na compose enweela ndokwụnye ụfọdụ, a ka na-etinye ndị mbụ otu ugboro, hapụ aha faịlụ ndị dị adịla.
- Nsịpụ: A na-ewepụ ihe S/MIME na onyonyo inline n’ime ndokwụnye faịlụ. Ọ bụrụ na ihe ọ bụla ekwekọghị na njem mbụ, ntughari dị nro na-enyocha akụkụ na-abụghị S/MIME ọzọ. A na-achịkọta onyonyo inline n’ụzọ dị iche: a na-weghachite ha n’ahụ nzaghachi dịka data URI (mgbe agbanyere).
  - Aha faịlụ: `smime.p7s`
  - Ụdị MIME: `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - Onyonyo inline: akụkụ `image/*` ọ bụla nke Content‑ID kọọrọ — e wepụrụ ya n’ime ndokwụnye faịlụ ma a na-etinye ya n’ahụ nzaghachi mgbe “Gụnye onyonyo inline” bụ ON
  - Emails e jikọtara (`message/rfc822`): a na-ele ha anya dịka ndokwụnye nkịtị ma ọ bụrụ na ha nwere aha faịlụ; enwere ike itinye ha (dabere na nchịkọta ndị ugboro ugboro na ndepụta ojii).
- Ịdọ aka ná ntị ndepụta ojii (mgbe agbanyere): Mgbe a na-ewepụ ndị na-akwado site na ndepụta ojii gị,
  mgbakwunye ahụ na-egosi obere modal na-egosi faịlụ emetụtara na
  usoro kwekọrọ. Ịdọ aka ná ntị a na-apụtakwa mgbe a gaghị etinye ndokwụnye ọ bụla n’ihi na a wepụpụtara ihe niile.

---

## Ụzọ mkpirisi keyboard {#keyboard-shortcuts}

- Okwu nkwenye: Y/J = Ee, N/Esc = Mba; Tab/Shift+Tab na Arrow keys na-agbagharị elekwasị anya.
  - “Azịza ndabara” dị na [Nhazi](configuration#confirmation) na-etinye bọtịnụ a lekwasịrị anya mbụ.
  - Enter na-eme bọtịnụ a lekwasịrị anya. Tab/Shift+Tab na arrows na-agagharị elekwasị anya maka nnweta.

### Akwụkwọ ntuziaka mkpirisi keyboard {#keyboard-cheat-sheet}

| Igodo           | Omume                                      |
|-----------------|--------------------------------------------|
| Y / J           | Kwenye Ee                                  |
| N / Esc         | Kwenye Mba                                 |
| Enter           | Gbanye bọtịnụ e lekwasịrị anya             |
| Tab / Shift+Tab | Gagharịa elekwasị anya n’ihu/azụ           |
| Igodo ntụgharị  | Gagharịa elekwasị anya n’etiti bọtịnụ      |
| Azịza ndabara   | Na-etinye ntinye anya mbụ (Ee ma ọ bụ Mba) |

---

## Oke {#limitations}

- A naghị agbanwe Forward site na mgbakwunye a (A na-akwado Reply na Reply all).
- Ndokwụnye faịlụ buru ibu nwere ike ịnwe oke site na Thunderbird ma ọ bụ onye na-enye ọrụ.
  - Mgbakwunye ahụ anaghị kewaa ma ọ bụ kpakọwaa faịlụ; ọ na-adabere na otú Thunderbird si ejikwa ndokwụnye nkịtị.
- Ozi e zoro ezo: A na-ewepụ akụkụ S/MIME n’echiche.

---

## Gịnị kpatara ndokwụnye nwere ike ọ gaghị etinye {#why-attachments-might-not-be-added}

- Foto ndị ozi mbụ ahụ gbakwunyere anaghị edobe ha dị ka faịlụ. Ha adịlarị n'ozi nzaghachi, ebe Thunderbird tinyere ha. Hụ [Nhazi](configuration#include-inline-pictures).
- Akụkụ mbinye aka S/MIME a na-ewepụ ya n’imepụta: aha faịlụ dịka `smime.p7s` na ụdị MIME dịka `application/pkcs7-signature` ma ọ bụ `application/pkcs7-mime` a na-agbaghara ha.
- Usoro ndepụta ojii nwere ike sịpụ ndị na-akwado: lee [Nhazi](configuration#blacklist-glob-patterns); nhazi kwekọrọ adịghị ele obere/akapkwọ mkpụrụedemede anya ma na-ele naanị aha faịlụ.
- A naghị etinye aha faịlụ nke yiri nke dị: ọ bụrụ na compose enweela faịlụ nwere aha emezigharị nke yiri nke ahụ, a na-agbaghara ya.
- Akụkụ na-abụghị faịlụ ma ọ bụ enweghị aha faịlụ: naanị akụkụ yiri faịlụ nwere aha faịlụ bara uru ka a na-atụle itinye.

---

Hụkwa

- [Nhazi](configuration)
