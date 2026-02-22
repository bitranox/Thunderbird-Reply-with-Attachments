---
id: usage
title: 'Ikoreshwa'
sidebar_label: 'Uko ikoreshwa'
---

---

## Uko ikoreshwa {#usage}

- Subiza hanyuma umugereka wongeramo inyomeko z’umwimerere ku buryo bwikora — cyangwa ubanze abaze, niba byakozwe muri Amahitamo.
- Kwirinda gusubiramo hashingiwe ku izina ry’ifayilo; ibice bya S/MIME birasimbukwa buri gihe. Amashusho yinjijwe mu mubiri (inline) asubizwa mu mubiri w’igisubizo ku buryo mburabuzi (bihagarikwe binyuze muri "Include inline pictures" muri Amahitamo).
- Inyomeko ziri ku rutonde rwabujijwe (blacklist) na zo zirirengagizwa (imiterere ya glob idatandukanya inyuguti nkuru/nto ihuza amazina y’amafayilo, atari inzira). Reba [Igenamiterere](configuration#blacklist-glob-patterns).

---

### Ibyibera mu gusubiza {#what-happens}

- Kumenya ko ari igisubizo → gutondeka inyomeko z’umwimerere → gusukura S/MIME + byinjijwe (inline) → kwemeza niba bikenewe → kongeramo amafayilo akwemerwa (gusimbuka abisanze) → gusubiza amashusho yinjijwe mu mubiri.

Kugenzura rukaze ugereranyije n’ururuhutse: Umugereka ubanza gukuramo ibice bya S/MIME n’ibyinjijwe (inline) mu nyomeko z’amafayilo. Nta na kimwe kibashije, ukora urugendo ruruhutse rwemera ibindi bibayeho nubwo rukomeza gukuramo S/MIME/inline (reba Ibisobanuro by’Amabwiriza). Amashusho yinjijwe ntabwo yongerwa nk’inyomeko z’amafayilo; ahubwo, iyo "Include inline pictures" ikinguye (mburabuzi), ashyirwa mu mubiri w’igisubizo nk’adata ya base64 (data URI).

| Ubwoko bw’igice                                         |                   Kugenzura rukaze |                Kugenzura ruruhutse |
| ------------------------------------------------------- | ---------------------------------: | ---------------------------------: |
| Ifayilo y’isinyature ya S/MIME `smime.p7s`              |                          Byakuweho |                          Byakuweho |
| Ubwoko bwa MIME bwa S/MIME (`application/pkcs7-*`)      |                          Byakuweho |                          Byakuweho |
| Ishusho yinjijwe yerekejwe na Content‑ID (`image/*`)    | Ihagaritswe (isubizwa mu mubiri\*) | Ihagaritswe (isubizwa mu mubiri\*) |
| Imeli yomekwa (`message/rfc822`) ifite izina ry’ifayilo |                          Ntongerwa |                  Ishobora kongerwa |
| Inyomeko isanzwe y’ifayilo ifite izina                  |                  Ishobora kongerwa |                  Ishobora kongerwa |

\* Iyo "Include inline pictures" ikinguye (mburabuzi: ON), amashusho yinjijwe ashyirwa mu mubiri w’igisubizo nk’adata za base64 URI aho kongerwa nk’inyomeko z’ifayilo. Reba [Igenamiterere](configuration#include-inline-pictures).

Urugero: Bimwe mu byomeko bishobora kubura bimwe mu mitwe (headers) nyamara bikaba amafayilo asanzwe (atari inline/S/MIME). Niba kugenzura rukaze ntacyo kibona, kugenzura ruruhutse gishobora kubyemera kandi kikabyomeka.

---

### Ihuza {#cross-reference}

- Kohereza mbere (Forward) ntihindurwa nk’uko byateguwe (reba Ibingamizi hepfo).
- Ku mpamvu inyomeko ishobora kudongerwa, reba “Impamvu inyomeko zishobora kutongerwa”.

---

## Ibisobanuro by’imikorere {#behavior-details}

- **Kwirinda ko habaho ebyiri (duplicates):** Umugereka ugaragaza isimbuka (tab) yo kwandika nk’yarangijwe ukoresheje agaciro ka sesiyo kuri buri sambi (per‑tab) n’umurinzi ubitswe muri memory. Ntuzongera kongeramo umwimerere kabiri.
- Gufunga no kongera gufungura idirishya ryo kwandika bifatwa nk’isimbuka (tab) nshya (ni ukuvuga ko undi mugerageza wemerewe).
- **Kubaha inyomeko zisanzwe zihari:** Niba idirishya ryo kwandika risanganywe inyomeko zimwe, iz’umwimerere zirongerwaho rimwe gusa, ariko amazina y’amafayilo asanzweho akirengagizwa.
- **Ibyo gukuramo:** Ibikoresho bya S/MIME n’amashusho yinjijwe (inline) bikurwa mu nyomeko z’amafayilo. Nta na kimwe kibonekeje mu rugendo rwa mbere, hasubirwamo mu buryo buruhutse hasuzumwa ibice bitari S/MIME. Amashusho yinjijwe akorwa ukwabyo: asubizwa mu mubiri w’igisubizo nka data URI (iyo byashyizweho).
  - **Amazina y’amafayilo:** `smime.p7s`
  - **Ubwoko bwa MIME:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Amashusho yinjijwe (inline):** igice cya `image/*` cyerekejwe na Content‑ID — gikurwa mu nyomeko z’amafayilo ariko kigashyirwa mu mubiri w’igisubizo iyo "Include inline pictures" iri ON
  - **Imeli zomekwa (`message/rfc822`):** zifatwa nk’inyomeko zisanzwe niba zifite izina ry’ifayilo; zishobora kongerwa (hashingiwe ku igenzura ry’ibisanze no ku rutonde rwabujijwe).
- **Iburira ry’ururondabwizwa (blacklist) (iyo ryashyizweho):** Igihe abakandida bakuwemo n’ururondabwizwa rwawe, umugereka werekana akadirishya gato (modal) karimo urutonde rw’amafayilo byagizeho ingaruka hamwe n’imiterere (pattern) zihuye. Iri burira riranagaragara mu bihe aho nta nyomeko zizongerwa kuko byose byakuweho.

---

## Inzira ngufi za keyboard {#keyboard-shortcuts}

- Idirishya ryo kwemeza: Y/J = Yego, N/Esc = Oya; Tab/Shift+Tab n’imyambi bizunguruka aho focus iri.
  - “Default answer” muri [Igenamiterere](configuration#confirmation) ishyiraho butoni ibanzaho.
  - Enter ikurura butoni ibanzwemo. Tab/Shift+Tab n’imyambi bimura focus kugira ngo byorohereze ubushobozi bwo kugerwaho.

### Umufasha wihuse wa keyboard {#keyboard-cheat-sheet}

| Imfunguzo       | Igikorwa                                    |
| --------------- | ------------------------------------------- |
| Y / J           | Emeza Yego                                  |
| N / Esc         | Emeza Oya                                   |
| Enter           | Kakaza butoni yibanzweho                    |
| Tab / Shift+Tab | Hindura focus imbere/inyuma                 |
| Arrow keys      | Hindura focus hagati y’amabutoni            |
| Default answer  | Ishyiraho focus ya mbere (Yego cyangwa Oya) |

---

## Ibingamizi {#limitations}

- Kohereza mbere (Forward) ntibihindurwa n’uyu mugereka (Gusubiza na Gusubiza bose birashyigikiwe).
- Inyomeko nini cyane zishobora kugirirwa ingaruka n’imipaka ya Thunderbird cyangwa iya utanga serivisi.
  - Umugereka ntiwacagagura cyangwa ngo usunike (compress) amafayilo; wiringira uburyo busanzwe bwa Thunderbird bwo gutunganya inyomeko.
- Ubutumwa buhishe (Encrypted): ibice bya S/MIME bikurwamo ku bushake.

---

## Impamvu inyomeko zishobora kutongerwa {#why-attachments-might-not-be-added}

- Amashusho yinjijwe (inline) ntongerwa nk’inyomeko z’amafayilo. Iyo "Include inline pictures" iri ON (mburabuzi), ashyirwa mu mubiri w’igisubizo nk’adata ya URI aho kongerwa nk’inyomeko. Niba iryo genamiterere riri OFF, amashusho yinjijwe akurwaho burundu. Reba [Igenamiterere](configuration#include-inline-pictures).
- Ibice by’isinyature ya S/MIME bikurwamo nkana: amazina y’amafayilo nka `smime.p7s` n’ubwoko bwa MIME nka `application/pkcs7-signature` cyangwa `application/pkcs7-mime` birasimbukwa.
- Imiterere y’ururondabwizwa (blacklist patterns) ishobora gusohora abakandida: reba [Igenamiterere](configuration#blacklist-glob-patterns); guhuzwa ni nta tandukaniro ry’inyuguti nkuru/nto kandi bishingiye ku mazina y’amafayilo gusa.
- Amazina y’amafayilo yisubiramo ntiyongera kongerwa: niba idirishya ryo kwandika risanganywe ifayilo ifite izina rihwanye ryahinduwe mu buryo busanzwe, irirengagizwa.
- Ibice bitari amafayilo cyangwa kubura amazina y’amafayilo: gusa ibice bisa n’amafayilo bifite amazina ikoreshwa nibyo bitekerezwa kongerwaho.

---

Reba kandi

- [Igenamiterere](configuration)
