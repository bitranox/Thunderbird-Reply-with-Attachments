---
id: usage
title: 'Ikoreshwa'
sidebar_label: 'Ikoreshwa'
---

---

## Uko bikoreshwa {#usage}

- Subiza, hanyuma inyongeramusango ikongeramwo ingereka z’inkomoko mu buryo bwikora — canke ibanze ibaze, iyo vyashizweho mu Mahitamo.
- Ibisubiramwo birakurwaho hakurikijwe izina rya dosiye; ibice bya S/MIME birasimburwa buri gihe. Amashusho yashizwe mu butumwa nyakuri asigara mu mubiri w'inyishu, aho Thunderbird ayashira, kandi ntayandukurwa nk'amadosiye.
- Ingereka ziri ku rutonde rw’irabura (blacklist) na zo nyene zirahagarikwa (amagereranyo ya glob atitaho inyuguti nkuru/nto akwiragiza amazina y’amadosiye gusa, si inzira). Raba [Igenamiterere](configuration#blacklist-glob-patterns).

---

### Ivibera mu gusubiza {#what-happens}

- Kumenya inyishu → gutondeka ivyomatanyijwe nyakuri → gusubira inyuma S/MIME n'amashusho yashizwemo → kwemeza (bitegetswe) → kongeramwo amadosiye abereye (twirinda ibisubiramo).

| Ubwoko bw'igice                                              | Yandukurwa mu nyishu |
|--------------------------------------------------------------|---------------------:|
| Idosiye y'umukono wa S/MIME `smime.p7s`                      | Oya                  |
| Ubwoko bwa MIME bwa S/MIME (`application/pkcs7-*`)           | Oya                  |
| Ishusho umubiri w'ubutumwa ushize hifashishijwe `cid:`       | Oya (iri mu mubiri)  |
| Ishusho yashizweho akamenyetso `Content-Disposition: inline` | Oya (iri mu mubiri)  |
| Ishusho ifise `Content-ID` umubiri utigeze werekanaho        | Yego                 |
| Imeyili yometseko (`message/rfc822`) ifise izina rya dosiye  | Yego                 |
| Icomekwa c'idosiye isanzwe gifise izina rya dosiye           | Yego                 |

Ishusho ibarwa nk'iyashizwemwo gusa igihe ubutumwa nyakuri buyerekanaho vy'ukuri, canke igihe uwarungitse yashizeho
neza akamenyetso `Content-Disposition: inline`. Umutwe wa `Content-ID` gusa ntibihagije: abakoresha porogaramu za imeyili
benshi bashira iki kimenyetso ku gice cose c'ishusho, harimwo n'ivyometswe vy'ukuri, kandi ivyo bigomba kwandukurwa.

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
|------------------|-------------------------------------------------|
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

- Amashusho ubutumwa nyakuri yashizemo ntabwo akoporwa nk'amadosiye. Asanzwe ari mu mubiri w'inyishu, aho Thunderbird yayashize. Raba [Configuration](configuration#include-inline-pictures).
- Ibice vy’umukono vya S/MIME birakuwemwo uko vyateguwe: amazina y’amadosiye nka `smime.p7s` n’ubwoko bwa MIME nka `application/pkcs7-signature` canke `application/pkcs7-mime` birasimbukwa.
- Amagereranyo yo ku rutonde rw’irabura arashobora gusiba abakandida: raba [Igenamiterere](configuration#blacklist-glob-patterns); uko bihura ntibititaho inyuguti nkuru/nto kandi bihanze ku mazina y’amadosiye gusa.
- Amazina y’amadosiye asubirako ntiyongerwa: niba mu kwandika hasanzwe harimwo idosiye ifise izina ryahuriweko risa, irasimbukwa.
- Ibice bitari amadosiye canke amazina yabuze: ibice bisa nk’amadosiye bifise amazina akoreshwa gusa ni vyo biharurwa ngo vyongerwe.

---

Raba kandi

- [Igenamiterere](configuration)
