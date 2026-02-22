---
id: usage
title: 'Huutoraade'
sidebar_label: 'Huutugol'
---

---

## Huutorgol {#usage}

- Jaab, tee add‑on oo maa ɓeyda dokkoreeji jowe e jaajol — walla ɗaɓɓitii ko adii yo, so hurminaama e Cuɓe.
- ɓennugol ɗiɗi momtaa ko e innde fiilde; geɗe S/MIME ɓe momtaa sahaa kala. Nataaji inline ɓe artiraa e jinnaaɗe jaabugol ko kallum (daaƴtu e "Include inline pictures" e Cuɓe).
- Dokkoreeji e blacklist ɓe kadi momtaa (jiɓirɗe glob nde ɓe huuɓi innde fiilde tan, wonaa laawol; ɗe hoolaaka mawnde/majjuɗe case). Yiy [Teelte](configuration#blacklist-glob-patterns).

---

### Hol ko waɗɗii so a jaabi {#what-happens}

- Ƴeewta jaabugol → doggol dokkoreeji jowe → seɗda S/MIME + inline → teeŋtude so aɗa yiɗi → ɓeydu fiilde cuɓaaɗe (momtu ɓennuge) → artir nataaji inline e jinnaaɗe.

Pass ɓurindi vs. pass ñalawol: add‑on oo nanndii tawo momtaa geɗe S/MIME e inline e dokkorde fiilde. So hay huunde laatoto, maa ɗowti pass ñalawol nde kadi momtaa S/MIME/inline kono waɗa faamde ɗiɗi e ko ɓurɗi balɗe (yiy Cariiɗe Code). Nataaji inline wonaa goɗɗaa ɓeydaa e ko dokkorde fiilde; wonaa ɗuum, so "Include inline pictures" hurminaama (ko kallum), ɓe mbaɗa woodude e jinnaaɗe jaabugol toowde no data URI base64.

| Fannu geɗe                                             |                  Pass ɓurindi |                  Pass ñalawol |
| ------------------------------------------------------ | ----------------------------: | ----------------------------: |
| Fiilde siŋillo S/MIME `smime.p7s`                      |                        Momtaa |                        Momtaa |
| Fannu MIME S/MIME (`application/pkcs7-*`)              |                        Momtaa |                        Momtaa |
| Nataande inline toowiraaɗo e Content‑ID (`image/*`)    | Momtaa (artiraa e jinnaaɗe\*) | Momtaa (artiraa e jinnaaɗe\*) |
| Imeel dokkiraaɗo (`message/rfc822`) jogii innde fiilde |                  Wonaa ɓeydaa |            Ena waawi ɓeydaade |
| Dokkorde fiilde loowdi jogii innde                     |            Ena waawi ɓeydaade |            Ena waawi ɓeydaade |

\* So "Include inline pictures" hurminaama (kallum: ON), nataaji inline ɓe mbaɗa woodude e jinnaaɗe jaabugol no data URI base64, wonaa ɓeydaade e dokkorde fiilde. Yiy [Teelte](configuration#include-inline-pictures).

Yimre: Dokkoreeji seeɗa ena waawi ŋakku e geɗe heɗiɗi kono aanon kadi fiilde goɗɗi (wonaa inline/S/MIME). So pass ɓurindi ngel nattii e ko woni, pass ñalawol maa jaɓi ɓe e ɓe ɓeydii.

---

### Jokkol baɗte {#cross-reference}

- Forward wonaa wayleede ko feewi (yiy Limite les ɗee).
- Ko fii ko waɗi dokkorde waawaani ɓeydanaade, yiy “Hol ko waɗi dokkoreeji waawaani ɓeydanaade”.

---

## Cariiɗe e gollal {#behavior-details}

- **Falo ɓennugol ɗiɗi:** add‑on oo maa markita tab ngel compose no gollitaama huutoraade kiisol sessioŋ per‑tab e reende e memory. Wonaa ɓeyda jowe keeriiɗe.
- Uddugol e udditgol henorde compose ko nattii kamɓe tab keso (wanoo: etaare hesere ena yamiraa).
- **Teddino dokkoreeji goodi:** So compose ngol ena jogii dokkoreeji goɗɗi, jowe maa ɓeydanaa tan e gooto, naftude innden ɗe waɗi goɗɗi ɗe jeye.
- **Momtugol:** geɗe S/MIME e nataaji inline ɓe momtaa e dokkorde fiilde. So hay huunde laatoto e passi adadu ngal, passi ñalawol maa ƴeewto kadi geɗe wonaa S/MIME. Nataaji inline ɓe toppitaa seeɓa: ɓe artiraa e jinnaaɗe jaabugol no data URI (so hurminaama).
  - **Innden fiilde:** `smime.p7s`
  - **Fannu MIME:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Nataaji inline:** geɓre kala `image/*` toowiraa e Content‑ID — momtaa e dokkorde fiilde kono mbaɗa woodude e jinnaaɗe jaabugol so "Include inline pictures" ON
  - **Imeel dokkiraaɗe (`message/rfc822`):** ɗe ƴellita ko dokkoreeji goɗɗi so ɓe jogii innde fiilde; ɓe ena waawi ɓeydaade (so ɓe roɓi e ƴeewto ɓennuge e blacklist).
- **Reentino blacklist (so hurminii):** So cuɓe ɗee momtaa e blacklist maa, add‑on oo hollita ndii modaalre ɓuutɗe, ɗe doggita fiilde ɓe ñawndii e jiɓirɗe ɓe nanndi. Ƴeewnditoore ngal kadi hollii e ɗee darnde so alaa dokkorde maa ɓeydanaa sabu kala ko momtaa.

---

## Cattiiɗe ordiiro {#keyboard-shortcuts}

- Henorde teeŋtude: Y/J = Eey, N/Esc = Alaa; Tab/Shift+Tab e toɓɓe lomtaare (arrow) ɓe riiwondira yanande.
  - “Default answer” e [Teelte](configuration#confirmation) nde ñippita butoŋ nde jeɗii adandu.
  - Enter non hurminata butoŋ nde ñippii. Tab/Shift+Tab e toɓɓe arrow ɓe dooɓata ñippugol ngam heɓooji.

### Laaɓol ndokkal ordiiro {#keyboard-cheat-sheet}

| Toɓɓe           | Golle                                    |
| --------------- | ---------------------------------------- |
| Y / J           | Teeŋtin Eey                              |
| N / Esc         | Teeŋtin Alaa                             |
| Enter           | Hurmin butoŋ nde ñippii                  |
| Tab / Shift+Tab | Dooɓu ñippugol yeeso/ɗinge               |
| Arrow keys      | Dooɓu ñippugol haa butoŋ ɓe              |
| Jaabirde kallum | Ñippita ñippugol adandu (Eey walla Alaa) |

---

## Keertine {#limitations}

- Forward wonaa wayleede e add‑on oo (Reply e Reply all ɓe tammbitaama).
- Dokkoreeji maaɗiirɗi ena waawi haɗde ko banngogol Thunderbird walla jeyaaɗo nde.
  - Add‑on oo wonaa waawde ceŋcinde walla juutinde fiilde; ko e daɗndude toppugol Thunderbird baawtol.
- Ɓatakuuji cuppitiiɗi: geɗe S/MIME ɓe momtaa no feewi.

---

## Hol ko waɗi dokkoreeji waawaani ɓeydanaade {#why-attachments-might-not-be-added}

- Nataaji inline wonaa ɓeydaa e ko dokkorde fiilde. So "Include inline pictures" ON (ko kallum), ɓe mbaɗa woodude e jinnaaɗe jaabugol no data URI. So teelte nde OFF, nataaji inline ɓe momtaa haa timmi. Yiy [Teelte](configuration#include-inline-pictures).
- Geɗe siŋillo S/MIME ɓe momtaa ko feewi: innden fiilde wano `smime.p7s` e fannu MIME wano `application/pkcs7-signature` walla `application/pkcs7-mime` ɓe momtaa.
- Jiɓirɗe blacklist ena waawi seɗde cuɓe: yiy [Teelte](configuration#blacklist-glob-patterns); ƴeewndugol ɗee hoolaaka mawnde-mbadiɗo e innde fiilde tan.
- Innden fiilde ɓennugol wonaa ɓeydaa kadi: so compose ngol ena jogii fiilde gooto jogii innde toɗɗii, ɗuum momtaa.
- Geɗe wonaa fiilde walla innden ñakkuɗe: tan geɗe mbaylo fiilde jogii innde waawnde huutoraade ɓe ɗee ɗeɗe ɗeƴƴita nder ɓeydogol.

---

Yiy kadi

- [Teelte](configuration)
