---
id: usage
title: 'Ukusetshenziswa'
sidebar_label: 'Ukusetshenziswa'
---

---

## Ukusetshenziswa {#usage}

- Phendula bese i-add-on yengeza okwangempela ngokuzenzakalela — noma ibuze kuqala, uma kuvuliwe ku-Izinketho.
- Kugwenywa ukuphindaphindwa ngokususelwa egameni lefayela; izingxenye ze-S/MIME zihlala zigwanywa. Izithombe zangaphakathi zibuyiselwa emzimbeni wempendulo ngokuzenzakalela (ungakukhubaza nge-"Include inline pictures" ku-Izinketho).
- Okunananyathiselwe okuholwe ohlwini oluvimbayo nakho kuyagwemeka (amaphethini e-glob anganaki ubukhulu/ubuncane bohlamvu afanisa amagama amafayela kuphela, hhayi izindlela). Bona [Izilungiselelo](configuration#blacklist-glob-patterns).

---

### Kwenzekani lapho uphendula {#what-happens}

- Thola impendulo → bala okunanyathiselwe kwangempela → hlunga i-S/MIME + izithombe zangaphakathi → ukuqinisekisa okuzikhethela → engeza amafayela afanelekile (weqa okuphindwe kabili) → buyisela izithombe zangaphakathi emzimbeni.

Ukudlula okuqinile vs. okuxegayo: I-add-on iqala ngokukhipha izingxenye ze-S/MIME nezangaphakathi kokunananyathiselwe kwefayela. Uma kungekho okuzofanela, isebenza ukudlula okuxegayo okusaqeda i-S/MIME/okungaphakathi kodwa kuvumele izimo eziningi (buka Imininingwane Yekhodi). Izithombe zangaphakathi azifakwa njengezinanyathiselwa zamafayela; esikhundleni salokho, uma "Include inline pictures" ivuliwe (okumisiwe), zifakwa ngqo emzimbeni wempendulo njenge-base64 data URIs.

| Uhlobo lwengxenye                                              |                 Ukudlula okuqinile |                 Ukudlula okuxegayo |
| -------------------------------------------------------------- | ---------------------------------: | ---------------------------------: |
| Ifayela losayini le-S/MIME `smime.p7s`                         |                           Kususiwe |                           Kususiwe |
| Izinhlobo ze-MIME ze-S/MIME (`application/pkcs7-*`)            |                           Kususiwe |                           Kususiwe |
| Isithombe sangaphakathi esibhekiswe nge-Content‑ID (`image/*`) | Kususiwe (kubuyiselwa emzimbeni\*) | Kususiwe (kubuyiselwa emzimbeni\*) |
| I-imeyili enanyathiselwe (`message/rfc822`) enegama lefayela   |                        Akufakwanga |                 Kungenzeka kufakwe |
| Okunananyathiselwe kwefayela okuvamile okunegama lefayela      |                 Kungenzeka kufakwe |                 Kungenzeka kufakwe |

\* Uma "Include inline pictures" ivuliwe (default: ON), izithombe zangaphakathi zifakwa emzimbeni wempendulo njenge-data URIs esikhundleni sokwengezwa njengezinanyathiselwa zamafayela. Bona [Izilungiselelo](configuration#include-inline-pictures).

Isibonelo: Okunye okunanyathiselwe kungase kungabi nezinye izihloko (headers) kodwa kuseyimifayela ejwayelekile (hhayi okungaphakathi/S/MIME). Uma ukudlula okuqinile kungatholi lutho, ukudlula okuxegayo kungakwamukela futhi kukunaneythisele.

---

### Izixhumanisi zokubhekisa {#cross-reference}

- Ukudlulisela phambili (Forward) akuguqulwa ngokuklanywa (bona Imikhawulo ngezansi).
- Ngezizathu zokuthi kungani okunananyathiselwe kungase kungangezwe, bona “Kungani okunananyathiselwe kungase kungangezwe”.

---

## Imininingwane Yokuziphatha {#behavior-details}

- Ukuvimbela ukuphindaphindwa: I-add-on imaka ithebhu yokubhala njengokucutshungulwa isebenzisa inani leseshini ngethebhu ngayinye kanye nesivikeli esisesikhumbuzini. Ayifaki okwangempela kabili.
- Ukuvala nokuvula kabusha iwindi lokubhala kubhekwa njengethebhu entsha (okungukuthi, kuvunyelwe umzamo omusha).
- Hlonipha okunanyathiselwe okukhona: Uma ukubhala sekunezinanyathiselwa, okwangempela kusenezwa kanye kuphela, kweqa amagama amafayela asevele ekhona.
- Okungafakwanga: Izingxenyana ze-S/MIME nezangaphakathi ziyasuswa ekunanyathiselweni kwamafayela. Uma kungekho okufanelekayo ekudluleni kokuqala, ukudlula okuxegayo kubuyekeza izingxenye ezingezona ze-S/MIME. Izithombe zangaphakathi ziphathwa ngokwehlukile: zibuyiselwa emzimbeni wempendulo njenge-data URIs (uma kuvuliwe).
  - Amagama amafayela: `smime.p7s`
  - Izinhlobo ze-MIME: `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - Izithombe zangaphakathi: noma iyiphi ingxenye ye-`image/*` ebhekiswe nge-Content‑ID — iyasuswa kokunananyathiselwe kwamafayela kodwa ifakwa emzimbeni wempendulo uma "Include inline pictures" ivuliwe (ON)
  - Ama-imeyili ananyathiselwe (`message/rfc822`): aphathwa njengokunananyathiselwe okuvamile uma enegama lefayela; angase afakwe (ngokuhambisana nokuhlolwa kokuphindaphindwa nohlelo lokuvimba).
- Isixwayiso sohlwini oluvimbayo (uma luvuliwe): Uma abakhethwayo bekhishwa ohlwini lwakho oluvimbayo,
  i-add-on ikhombisa iwindi elincane (modal) elibala amafayela athintekayo kanye
  nephethini(zi) elihambisanayo. Lesi sixwayiso siphinde sivele ezimweni lapho kungewona amanye amafayela azofakwa ngoba konke kukhishiwe.

---

## Izinqamuleli zekhibhodi {#keyboard-shortcuts}

- Inkulumo-mpikiswano yokuqinisekisa: Y/J = Yes, N/Esc = No; Tab/Shift+Tab kanye nokhiye bemicibisholo kushintsha ukugxila.
  - I-“Default answer” ku-[Izilungiselelo](configuration#confirmation) imisa inkinobho egxilwe kuqala.
  - Enter ivula inkinobho ezigxilile. Tab/Shift+Tab kanye nemicibisholo kushintsha ukugxila ukuze kutholakale kalula.

### Ishidi Lezinqamuleli Zekhibhodi {#keyboard-cheat-sheet}

| Okhiye                   | Isenzo                                    |
| ------------------------ | ----------------------------------------- |
| Y / J                    | Qinisekisa u-Yebo                         |
| N / Esc                  | Qinisekisa u-Cha                          |
| Enter                    | Yenza kusebenze inkinobho egxilile        |
| Tab / Shift+Tab          | Nyakazisa ukugxila phambili/emuva         |
| Okhiye bemicibisholo     | Nyakazisa ukugxila phakathi kwezinkinobho |
| Impendulo ezenzakalelayo | Imisa ukugxila kokuqala (Yebo noma Cha)   |

---

## Imikhawulo {#limitations}

- Ukudlulisela phambili (Forward) akuguqulwa yile add-on (Phendula nethi Phendula kubo bonke kusekelwa).
- Okunanyathiselwe okukhulu kakhulu kungase kubekwe imikhawulo ye-Thunderbird noma yomphakeli.
  - I-add-on ayihlukanisi (chunk) noma icindezele amafayela; incike ekuphathweni okujwayelekile kwezinanyathiselwa kwe-Thunderbird.
- Imilayezo efihliwe: izingxenye ze-S/MIME zikhishwa ngenhloso.

---

## Kungani okunananyathiselwe kungase kungangezwe {#why-attachments-might-not-be-added}

- Izithombe zangaphakathi azifakwa njengezinanyathiselwa zamafayela. Uma "Include inline pictures" ivuliwe (ON, okuzenzakalelayo), zifakwa emzimbeni wempendulo njenge-data URIs esikhundleni salokho. Uma isethingi i-OFF, izithombe zangaphakathi zisuswa ngokuphelele. Bona [Izilungiselelo](configuration#include-inline-pictures).
- Izingxenye zosayini ze-S/MIME zikhishwa ngokuklanywa: amagama amafayela afana no-`smime.p7s` kanye nezinhlobo ze-MIME ezifana no-`application/pkcs7-signature` noma `application/pkcs7-mime` ziyagwemeka.
- Amaphethini ohlwini oluvimbayo angahlunga abakhethwayo: bona [Izilungiselelo](configuration#blacklist-glob-patterns); ukufanisa akunaki ubukhulu/ubuncane bohlamvu futhi kusemagameni amafayela kuphela.
- Amagama amafayela aphindaphindiwe awafakwa futhi: uma ukubhala sekuvele kunefayela elinegama elifaniswe (normalized) elifanayo, liyakhohlwa.
- Izingxenye ezingezona amafayela noma amagama amafayela alahlekile: kuphela izingxenye ezifana nefayela ezinamagama amafayela angasetshenziswa ezicatshangelwa ukwengezwa.

---

Bheka futhi

- [Izilungiselelo](configuration)
