---
id: usage
title: 'Ukusetyenziswa'
sidebar_label: 'Ukusetyenziswa'
---

---

## Ukusetyenziswa {#usage}

- Phendula uze isongezelelo songeze izincamatheliso zokuqala ngokuzenzekelayo — okanye sibuze kuqala, ukuba sivuliwe kuZikhetho.
- Iikopi eziphindaphindiweyo zisuswa ngokusekelwe egameni lefayile; iindawo ze-S/MIME zisoloko zitsibelwa. Imifanekiso ehlomeleyo kumyalezo wokuqala ihlala kumzimba wempendulo, apho iThunderbird iyibeka khona, kwaye ayikhutshelwa njengeefayile.
- Izincamatheliso ezikuluhlu olumnyama nazo ziyatshiywa (iipateni ze-glob ezingawahluli unobumba omkhulu nomncinci ezithelekisa amagama eefayile, hayi iindlela). Bona [Uqwalaselo](configuration#blacklist-glob-patterns).

---

### Kwenzeka ntoni xa uphendula {#what-happens}

- Fumana impendulo → dwelisa izixhumaniso zoqobo → dlula i-S/MIME nemifanekiso engxamelweyo → ukuqinisekiswa okukhethekayo → yongeza iifayile ezifanelekileyo (udlula kwezifanayo).

| Uhlobo lwenxalenye                                            | Ikhutshelwe kwimpendulo |
|---------------------------------------------------------------|------------------------:|
| Ifayile yesignesha ye-S/MIME `smime.p7s`                      | Hayi                    |
| Iintlobo ze-MIME ze-S/MIME (`application/pkcs7-*`)            | Hayi                    |
| Umfanekiso ohlonyelwe ngumzimba womyalezo nge-`cid:`          | Hayi (ikhona kumzimba)  |
| Umfanekiso ophawulwe nge-`Content-Disposition: inline`        | Hayi (ikhona kumzimba)  |
| Umfanekiso one-`Content-ID` engasoze ibhekiswe kuwo ngumzimba | Ewe                     |
| I-imeyile enamathiselweyo (`message/rfc822`) enegama lefayile | Ewe                     |
| Isihlomelo sefayile esiqhelekileyo esinegama lefayile         | Ewe                     |

Umfanekiso ubalwa njengohlonyelweyo kuphela xa umyalezo wokuqala ngokwenene ubhekisa
kuwo, okanye xa umthumeli ewuphawule ngokucacileyo nge-`Content-Disposition: inline`.
Umbhalo we-`Content-ID` odwa awonelanga: iinkonzo ezithile zeimeyile zibeka lo mbhalo
kwinxalenye nganye yomfanekiso, kubandakanywa nezihlomelo zokwenyani, ekufuneka
zikhutshelwe nokuba kunjalo.

---

### Isalathiso esinqamlezayo {#cross-reference}

- Ukuthumela phambili akuguqulwa ngokuyilwa (bona Izithintelo ngezantsi).
- Ngezizathu ezibangela ukuba uncamathiselo lungongezwa, bona “Kutheni izincamatheliso zingasongezwa”.

---

## Iinkcukacha zokuziphatha {#behavior-details}

- **Ukuthintela ukuphindaphindwa:** Isongezelelo siphawula ithebhu yokuqulunqa njengesele iqhutywe sisebenzisa ixabiso leseshoni ngethebhu nganye kunye nomgcini okwinkumbulo. Asiyi kongeza ezokuqala kabini.
- Ukuvala nokuvula kwakhona ifestile yokuqulunqa kuthathwa njenge thebhu entsha (oko kukuthi, umzamo omtsha uyavunyelwa).
- **Hlonepha izincamatheliso ezikhoyo:** Ukuba yokuqulunqa sele iqulethe ezinye izincamatheliso, ezokuqala zisongezwa kanye kuphela, kuskitywa amagama eefayile sele ekhona.
- **Izikhutsho:** Iimpahla ze-S/MIME nemifanekiso yangaphakathi ziyakhutshwa kukuncamathelisa iifayile. Ukuba akukho nto ifanelekile kudlululo lokuqala, ukubuya okukhululekileyo kuhlola kwakhona amacandelo angeyona i-S/MIME. Imifanekiso yangaphakathi iphethwe ngokwahlukeneyo: ibuyiselwa emzimbeni wempendulo njengee-URI zedata (xa ivuliwe).
  - **Amagama eefayile:** `smime.p7s`
  - **Iindidi ze-MIME:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Imifanekiso yangaphakathi:** naliphi na icandelo le `image/*` elibhekiselwa yi-Content‑ID — likhutshwe kukuncamathelisa iifayile kodwa lifakwa emzimbeni wempendulo xa "Include inline pictures" ivuliwe
  - **Ii-imeyile ezincanyathiselweyo (`message/rfc822`):** ziphathwa njengooncamathiselo abaqhelekileyo ukuba zinegama lefayile; zingongezwa (kuxhomekeke kukhangelo lokuphindaphindwa kunye noluhlu olumnyama).
- **Isilumkiso soluhlu olumnyama (ukuba sivuliwe):** Xa abakhethwayo bekhutshwa luluhlu lwakho olumnyama,
  isongezelelo sibonisa i-modal encinane edwelisa iifayile ezichaphazelekayo kunye ne
  pattern(s) ehambelanayo. Esi silumkiso sikwavela nakwiimeko apho akukho zincamatheliso ziya
  kongezwa kuba yonke into ikhutshiwe.

---

## Iindlela ezimfutshane zekhibhodi {#keyboard-shortcuts}

- Ingxoxo yokuqinisekisa: Y/J = Ewe, N/Esc = Hayi; Tab/Shift+Tab kunye namaqhosha eentolo ajikeleza ugxininiso.
  - I “Default answer” ku [Uqwalaselo](configuration#confirmation) iseta iqhosha eligxininiswe kuqala.
  - Enter ivuselela iqhosha eligxininisiweyo. Tab/Shift+Tab kunye neentolo zihambisa ugxininiso ngenxa yokufikeleleka.

### Ishiti sekhibhodi {#keyboard-cheat-sheet}

| Amaqhosha         | Isenzo                                      |
|-------------------|---------------------------------------------|
| Y / J             | Qinisekisa Ewe                              |
| N / Esc           | Qinisekisa Hayi                             |
| Enter             | Sebenzisa iqhosha eligxininisiweyo          |
| Tab / Shift+Tab   | Shukumisa ugxininiso phambili/umva          |
| Amaqhosha eentolo | Shukumisa ugxininiso phakathi kwamaqhosha   |
| Default answer    | Iseta ugxininiso lokuqala (Ewe okanye Hayi) |

---

## Izithintelo {#limitations}

- Ukuthumela phambili akuguqulwa sesi songezelelo (i-Reply ne-Reply all zixhaswa).
- Iincamatheliso ezinkulu kakhulu zinokuthotyelwa kwimida yeThunderbird okanye yomnikezeli.
  - Isongezelelo asahluli okanye sicinezele iifayile; sithembele kulawulo lukanamathiselo oluqhelekileyo lweThunderbird.
- Imiyalezo efihlakeleyo: amacandelo e-S/MIME akhutshwa ngenjongo.

---

## Kutheni izincamatheliso zingasongezwa {#why-attachments-might-not-be-added}

- Imifanekiso engxanyelwe ngumyalezo wokuqala ayikopishwa njengeefayile. Sele ikhona kumbhalo wempendulo, apho iThunderbird iyibeke khona. Jonga [Configuration](configuration#include-inline-pictures).
- Amacandelo osayino e-S/MIME akhutshiwe ngokuyilwa: amagama eefayile afana no `smime.p7s` kunye neentlobo ze-MIME ezifana no `application/pkcs7-signature` okanye `application/pkcs7-mime` ayatshiywa.
- Iipateni zoluhlu olumnyama zinokuhluza abakhethwayo: bona [Uqwalaselo](configuration#blacklist-glob-patterns); ukuthelekisa akunamsebenzi kubukhulu boonobumba kwaye kusekwe kuphela kwigama lefayile.
- Amagama eefayile aphindaphindiweyo awasongezwa kwakhona: ukuba yokuqulunqa sele iqulethe ifayile enegama elifanayo elilungelelanisiweyo, iyatshiywa.
- Amacandelo angeyofayile okanye alahlekwe ngamamagama eefayile: kuphela amacandelo afana neefayile anamagama eefayile anokusetyenziswa athathelwa ingqalelo ukongezwa.

---

Bona kwakunye

- [Uqwalaselo](configuration)
