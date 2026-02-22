---
id: usage
title: 'Ikoreshwa'
sidebar_label: 'Ikoreshwa'
---

---

## Uko bikoreshwa {#usage}

- Subiza, hanyuma inyongeramusango ikongeramwo ingereka z’inkomoko mu buryo bwikora — canke ibanze ibaze, iyo vyashizweho mu Mahitamo.
- Gusubirwamwo birakurwaho hisunzwe izina ry’idosiye; ibice vya S/MIME burundu birasimbukwa. Amasanamu y’imbere (inline) asubizwa mu mubiri w’igisubizo uko bisanzwe (guhagarika biciye kuri "Include inline pictures" mu Mahitamo).
- Ingereka ziri ku rutonde rw’irabura (blacklist) na zo nyene zirahagarikwa (amagereranyo ya glob atitaho inyuguti nkuru/nto akwiragiza amazina y’amadosiye gusa, si inzira). Raba [Igenamiterere](configuration#blacklist-glob-patterns).

---

### Ivibera mu gusubiza {#what-happens}

- Gutahura igisubizo → kurondora ingereka z’inkomoko → gusivura S/MIME + z’imbere → ugushobora kwemeza → kwongeramwo amadosiye akwiye (kureka izisubirako) → gusubizaho amasanamu y’imbere mu mubiri.

Urugendo rukomeye vs. urworuhutse: Inyongeramusango ubwa mbere ikura mu ngereka z’idosiye ibice vya S/MIME n’ivy’imbere. Nta na kimwe cemewe, ikora urugendo ruruhutse rukirinda S/MIME/ivy’imbere ariko rukihanganira izindi ngorane (raba Code Details). Amasanamu y’imbere ntazongerwa nk’ingereka z’idosiye; aho kubigira, iyo "Include inline pictures" yashizweho (ni ko bisanzwe), ashyirwa mu mubiri w’igisubizo nk’ama data URI ya base64.

| Ubwoko bw’igice                                               |                 Urugendo rukomeye |                Urugendo ruruhutse |
| ------------------------------------------------------------- | --------------------------------: | --------------------------------: |
| Idosiye y’umukono wa S/MIME `smime.p7s`                       |                         Bikuwemwo |                         Bikuwemwo |
| Ubwoko bwa MIME bwa S/MIME (`application/pkcs7-*`)            |                         Bikuwemwo |                         Bikuwemwo |
| Isanamu y’imbere yerekejwe na Content‑ID (`image/*`)          | Bikuwemwo (bisubizwa mu mubiri\*) | Bikuwemwo (bisubizwa mu mubiri\*) |
| E‑mail yafatanyijwe (`message/rfc822`) ifise izina ry’idosiye |                      Ntivyongerwa |             Birashobora kwongerwa |
| Ingereka y’idosiye isanzwe ifise izina                        |             Birashobora kwongerwa |             Birashobora kwongerwa |

\* Iyo "Include inline pictures" yashizweho (bisanzwe: ON), amasanamu y’imbere ashyirwa mu mubiri w’igisubizo nka data URI ya base64 aho kwongerwa nk’ingereka z’idosiye. Raba [Igenamiterere](configuration#include-inline-pictures).

Ingero: Zimwe mu ngereka zishobora kubura umutwe (headers) zimwe, ariko zigakomeza kuba amadosiye asanzwe (atari inline/S/MIME). Mu gihe urugendo rukomeye ntirabona n’imwe, urworuhutse rushobora kuzemera no kuziyungurura.

---

### Guhuza ivyerekezo {#cross-reference}

- Kwohereza imbere (Forward) ntibihindurwa uko vyateguwe (raba Ibingamizi hepfo).
- Ku mpamvu ingereka zotokwongerwa, raba “Impamvu ingereka zishobora kutongerwa”.

---

## Ibisobanuro vy’ukuntu bikora {#behavior-details}

- Kwirinda gusubirako: Inyongeramusango irimika ikimenyetso ko ishashura ryo kwandika ryatunganyijwe ikoresheje agaciro ka session ka buri tab n’umuzirikanyi uri imbere (in‑memory guard). Ntizongeramwo z’inkomoko kabiri.
- Gufunga no gusubira gufungura idirishya ryo kwandika bifatwa nk’isashura nshasha (ni ukuvuga ko urundi rugerageza ruremewe).
- Kwubahiriza ingereka zisanzwe: Naho mu kwandika harimwo ingereka zimwe, izo z’inkomoko zirongerwa rimwe gusa, hakasibwa amazina y’amadosiye asanzwe ahari.
- Ivyo kwigizayo: Ibipanguzi vya S/MIME n’amasanamu y’imbere bikuwemwo mu ngereka z’idosiye. Nta na kimwe cemewe ku rugendo rwa mbere, harakorwa urworuhutse rusubira gusuzuma ibice bitari S/MIME. Amasanamu y’imbere akurikiranwa ukwabyo: asubizwa mu mubiri w’igisubizo nk’ama data URI (iyo vyashizweho).
  - Amazina y’amadosiye: `smime.p7s`
  - Ubwoko bwa MIME: `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - Amasanamu y’imbere: igice ico ari co cose `image/*` cerekanywe na Content‑ID — gikuwemwo mu ngereka z’idosiye ariko gishirwa mu mubiri w’igisubizo iyo "Include inline pictures" iri ON
  - E‑mails zifatanye (`message/rfc822`): zifatwa nk’ingereka zisanzwe iyo zifise izina ry’idosiye; zirashobora kwongerwa (bishingiye ku gusuzuma ibisubirako n’urutonde rw’irabura).
- Impuruza y’urutonde rw’irabura (iyo yashizweho): Igihe abakandida bakuwemwo n’urutonde rwawe rw’irabura,
  inyongeramusango irerekana akadirisha gatoyi kerekana amadosiye akozeweko n’
  urugero(rw) ruhuye. Iyi mpuruza iraboneka no mu bihe aho ata ngereka zizongerwa
  kubera vyose vyakuwemwo.

---

## Inzira ngufi ku kibaho c’imyandikire {#keyboard-shortcuts}

- Idirishwa ryo kwemeza: Y/J = Ego, N/Esc = Oya; Tab/Shift+Tab be n’utufunguro tw’imyambi bihinduranya ivyibandwako.
  - “Inyishu y’ibanze (Default answer)” muri [Igenamiterere](configuration#confirmation) ishiraho buto yibandwako mu ntango.
  - Enter ituma buto yibandwako ikora. Tab/Shift+Tab n’imyambi bimura ivyibandwako kugira koroherezwe ukwinjira.

### Ikigufashanyo c’utufunguro tw’ihutisha {#keyboard-cheat-sheet}

| Utufunguro       | Igikorwa                                        |
| ---------------- | ----------------------------------------------- |
| Y / J            | Kwemeza Ego                                     |
| N / Esc          | Kwemeza Oya                                     |
| Enter            | Gukoresha buto yibandwako                       |
| Tab / Shift+Tab  | Kwimura ivyibandwako imbere/inyuma              |
| Imyambi          | Kwimura ivyibandwako hagati y’ububuto           |
| Inyishu y’ibanze | Ishiraho ivyibandwako vya mbere (Ego canke Oya) |

---

## Ibingamizi {#limitations}

- Kwohereza imbere (Forward) ntibihindurwa n’iyi nyongeramusango (Reply na Reply all birashigikiwe).
- Ingereka nini cane zishobora kugengwa n’imbibe za Thunderbird canke uwutanza serivisi.
  - Inyongeramusango ntiyigabura (chunk) canke ngo ihonishe (compress) amadosiye; yizera uburyo busanzwe bwa Thunderbird bwo gucungera ingereka.
- Ubutumwa bwakingiwe: ibice vya S/MIME birakuwemwo n’ukugomba.

---

## Impamvu ingereka zishobora kutongerwa {#why-attachments-might-not-be-added}

- Amasanamu y’imbere ntiyongerwa nk’ingereka z’idosiye. Iyo "Include inline pictures" iri ON (bisanzwe), ashyirwa mu mubiri w’igisubizo nka data URI. Iyo ayo mahitamo ari OFF, amasanamu y’imbere akurwaho burundu. Raba [Igenamiterere](configuration#include-inline-pictures).
- Ibice vy’umukono vya S/MIME birakuwemwo uko vyateguwe: amazina y’amadosiye nka `smime.p7s` n’ubwoko bwa MIME nka `application/pkcs7-signature` canke `application/pkcs7-mime` birasimbukwa.
- Amagereranyo yo ku rutonde rw’irabura arashobora gusiba abakandida: raba [Igenamiterere](configuration#blacklist-glob-patterns); uko bihura ntibititaho inyuguti nkuru/nto kandi bihanze ku mazina y’amadosiye gusa.
- Amazina y’amadosiye asubirako ntiyongerwa: niba mu kwandika hasanzwe harimwo idosiye ifise izina ryahuriweko risa, irasimbukwa.
- Ibice bitari amadosiye canke amazina yabuze: ibice bisa nk’amadosiye bifise amazina akoreshwa gusa ni vyo biharurwa ngo vyongerwe.

---

Raba kandi

- [Igenamiterere](configuration)
