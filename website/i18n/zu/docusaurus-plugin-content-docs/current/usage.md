---
id: usage
title: 'Ukusetshenziswa'
sidebar_label: 'Ukusetshenziswa'
---

---

## Ukusetshenziswa {#usage}

- Phendula bese i-add-on yengeza okwangempela ngokuzenzakalela — noma ibuze kuqala, uma kuvuliwe ku-Izinketho.
- Amakhophi aphindiwe asuswa ngokusekelwe egameni lefayela; izingxenye ze-S/MIME zihlala ziyekwa. Izithombe ezifakiwe emlayezweni wokuqala zihlala emzimbeni wempendulo, lapho i-Thunderbird ezibeka khona, futhi azikhophishwa njengamafayela.
- Okunananyathiselwe okuholwe ohlwini oluvimbayo nakho kuyagwemeka (amaphethini e-glob anganaki ubukhulu/ubuncane bohlamvu afanisa amagama amafayela kuphela, hhayi izindlela). Bona [Izilungiselelo](configuration#blacklist-glob-patterns).

---

### Kwenzekani lapho uphendula {#what-happens}

- Thola impendulo → hlela uhlu lwezithasiselo zoqobo → yeqa i-S/MIME nezithombe ezifakwe ngaphakathi → ukuqinisekiswa okukhethekayo → engeza amafayela afanelekile (uyeqa amafayela aphindiwe).

| Uhlobo lwengxenye                                            | Ikhophishwe empendulweni  |
|--------------------------------------------------------------|--------------------------:|
| Ifayela lesignesha le-S/MIME `smime.p7s`                     | Cha                       |
| Izinhlobo ze-MIME ze-S/MIME (`application/pkcs7-*`)          | Cha                       |
| Isithombe umzimba womlayezo osifaka nge-`cid:`               | Cha (sesikhona emzimbeni) |
| Isithombe esiphawulwe ngokuthi `Content-Disposition: inline` | Cha (sesikhona emzimbeni) |
| Isithombe esine-`Content-ID` umzimba ongawuboni neze         | Yebo                      |
| I-imeyili enamathiselwe (`message/rfc822`) enegama lefayela  | Yebo                      |
| Isengezo sefayela esivamile esinegama lefayela               | Yebo                      |

Isithombe sibalwa njengesifakiwe kuphela lapho umlayezo wokuqala ngempela usibhekisela
kuso, noma lapho umthumeli esiphawule ngokusobala ngokuthi
`Content-Disposition: inline`. Ikhanda le-`Content-ID` kuphela alanele: amanye ama-app
emeyili afaka leli khanda kuzo zonke izingxenye zezithombe, kuhlanganise nezithasiselo
zangempela, okusafanele zikhophishwe.

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
|--------------------------|-------------------------------------------|
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

- Izithombe umlayezo wokuqala ozifakayo azikopishwa njengamafayela. Sezikhona emzimbeni wempendulo, lapho uThunderbird azibeke khona. Bheka [Configuration](configuration#include-inline-pictures).
- Izingxenye zosayini ze-S/MIME zikhishwa ngokuklanywa: amagama amafayela afana no-`smime.p7s` kanye nezinhlobo ze-MIME ezifana no-`application/pkcs7-signature` noma `application/pkcs7-mime` ziyagwemeka.
- Amaphethini ohlwini oluvimbayo angahlunga abakhethwayo: bona [Izilungiselelo](configuration#blacklist-glob-patterns); ukufanisa akunaki ubukhulu/ubuncane bohlamvu futhi kusemagameni amafayela kuphela.
- Amagama amafayela aphindaphindiwe awafakwa futhi: uma ukubhala sekuvele kunefayela elinegama elifaniswe (normalized) elifanayo, liyakhohlwa.
- Izingxenye ezingezona amafayela noma amagama amafayela alahlekile: kuphela izingxenye ezifana nefayela ezinamagama amafayela angasetshenziswa ezicatshangelwa ukwengezwa.

---

Bheka futhi

- [Izilungiselelo](configuration)
