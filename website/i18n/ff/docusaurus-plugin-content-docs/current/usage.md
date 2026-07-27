---
id: usage
title: 'Huutoraade'
sidebar_label: 'Huutugol'
---

---

## Huutorgol {#usage}

- Jaab, tee add‑on oo maa ɓeyda dokkoreeji jowe e jaajol — walla ɗaɓɓitii ko adii yo, so hurminaama e Cuɓe.
- Kôpe ɗe woni fotde ɗum ɗon ɓe ittude ɗum ɗon e innde fiilde; hedde S/MIME ɗen ko ɗen ɗon ittee sahaa fuu. Naatirɗe (images) ɗe naatinaama e ndee mbaydi jaŋtoo, ɗum ɗon heddoto e ɓataake jaabawol, ɗo Thunderbird waɗata ɗum, ɗum ɗon kôpaake wanaa fiilde.
- Dokkoreeji e blacklist ɓe kadi momtaa (jiɓirɗe glob nde ɓe huuɓi innde fiilde tan, wonaa laawol; ɗe hoolaaka mawnde/majjuɗe case). Yiy [Teelte](configuration#blacklist-glob-patterns).

---

### Hol ko waɗɗii so a jaabi {#what-happens}

- Anndu jaabawol → limtinaa ɓeydaari gadane ɗen → acor S/MIME e nate naatinaaɗe → jaɓnondiral suɓaaɗum → ɓeyda fiilde jogiiɗe si'i (accude kaɓɓe).

| Noode peccol                                            | Ina kôpee e jaabawol |
|---------------------------------------------------------|---------------------:|
| Fiilde winndannde S/MIME `smime.p7s`                    | Alaa                 |
| Nooɗe MIME S/MIME (`application/pkcs7-*`)               | Alaa                 |
| Naatirgel ɗi ɓataake naatinta e `cid:`                  | Alaa (ina e ɓataake) |
| Naatirgel maandaa `Content-Disposition: inline`         | Alaa (ina e ɓataake) |
| Naatirgel jogii `Content-ID` ɗo ɓataake meeɗaa jantaade | Eey                  |
| Iimeel ɗeɓɓinaaɗo (`message/rfc822`) jogii innde fiilde | Eey                  |
| Fiilde ɗeɓɓinaande gaddiindi jogii innde fiilde         | Eey                  |

Naatirgel ɗon jotoo teeŋtinaa ko tuma ndee mbaydi jaŋtoo janttaade ɗum on tigi,
walla tuma nulowo on maandii ɗum feeñnde `Content-Disposition: inline`. Hooréwal
`Content-ID` tan yonaaki: jaaɓɓe iimeel ɗuɗɗe ɗi waɗata ɗum e kala peccol naatirgel,
kaa e ɗeɓɓinaaɗe goonga, ɗum ɗon foti kôpaade non non.

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
|-----------------|------------------------------------------|
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

- Nate ɗe ɓataake gadanewol naatini ɗe copiraaki wa'a fiilde. Ɗe woodi ko jooni e ɓataake jaabawol, nokku Thunderbird waɗi ɗe. Yiylo [Configuration](configuration#include-inline-pictures).
- Geɗe siŋillo S/MIME ɓe momtaa ko feewi: innden fiilde wano `smime.p7s` e fannu MIME wano `application/pkcs7-signature` walla `application/pkcs7-mime` ɓe momtaa.
- Jiɓirɗe blacklist ena waawi seɗde cuɓe: yiy [Teelte](configuration#blacklist-glob-patterns); ƴeewndugol ɗee hoolaaka mawnde-mbadiɗo e innde fiilde tan.
- Innden fiilde ɓennugol wonaa ɓeydaa kadi: so compose ngol ena jogii fiilde gooto jogii innde toɗɗii, ɗuum momtaa.
- Geɗe wonaa fiilde walla innden ñakkuɗe: tan geɗe mbaylo fiilde jogii innde waawnde huutoraade ɓe ɗee ɗeɗe ɗeƴƴita nder ɓeydogol.

---

Yiy kadi

- [Teelte](configuration)
