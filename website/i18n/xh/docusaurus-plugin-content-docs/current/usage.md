---
id: usage
title: 'Ukusetyenziswa'
sidebar_label: 'Ukusetyenziswa'
---

---

## Ukusetyenziswa {#usage}

- Phendula uze isongezelelo songeze izincamatheliso zokuqala ngokuzenzekelayo — okanye sibuze kuqala, ukuba sivuliwe kuZikhetho.
- Kuthintelwa ukuphindaphindwa ngokwegama lefayile; amacandelo e-S/MIME ahlala etshiywa. Imifanekiso yangaphakathi ibuyiselwa emzimbeni wempendulo ngokungagqibekanga (cima nge "Include inline pictures" kuZikhetho).
- Izincamatheliso ezikuluhlu olumnyama nazo ziyatshiywa (iipateni ze-glob ezingawahluli unobumba omkhulu nomncinci ezithelekisa amagama eefayile, hayi iindlela). Bona [Uqwalaselo](configuration#blacklist-glob-patterns).

---

### Kwenzeka ntoni xa uphendula {#what-happens}

- Fumanisa impendulo → dwelisa izincamatheliso zokuqala → hlunga i-S/MIME + yangaphakathi → uqinisekiso oluzikhethelayo → yongeza iifayile ezifanelekileyo (tsiba eziphindaphindiweyo) → buyisela imifanekiso yangaphakathi emzimbeni.

Udululo olungqongqo vs. olukhululekileyo: Isongezelelo siqala sikhuphe amacandelo e-S/MIME nawangaphakathi kwizincamatheliso zefayile. Ukuba akukho nto ifanelekile, siqhuba udlululo olukhululekileyo olusa kukhupha i-S/MIME/yangaphakathi kodwa luvumela iimeko ezingakumbi (bona Iinkcukacha zeKhodi). Imifanekiso yangaphakathi ayongezwa njengooncamathiselo zefayile; endaweni yoko, xa "Include inline pictures" ivuliwe (ingeniso), zifakwa ngqo emzimbeni wempendulo njengee-URI zedata ze-base64.

| Uhlobo lwesahlulo                                               |                Udlululo olungqongqo |           Udlululo olukhululekileyo |
| --------------------------------------------------------------- | ----------------------------------: | ----------------------------------: |
| Ifayile yosayino ye-S/MIME `smime.p7s`                          |                          Ikhutshiwe |                          Ikhutshiwe |
| Iindidi ze-MIME ze-S/MIME (`application/pkcs7-*`)               |                          Ikhutshiwe |                          Ikhutshiwe |
| Umfanekiso wangaphakathi obhekiselwa yi-Content‑ID (`image/*`)  | Ikhutshiwe (ibuyiselwa emzimbeni\*) | Ikhutshiwe (ibuyiselwa emzimbeni\*) |
| I-imeyile encanyathiselweyo (`message/rfc822`) enegama lefayile |                        Ayongezwanga |                          Ingongezwa |
| Uncamathiselo lwefayile eqhelekileyo enegama lefayile           |                          Ingongezwa |                          Ingongezwa |

\* Xa "Include inline pictures" ivuliwe (default: ON), imifanekiso yangaphakathi ifakwa emzimbeni wempendulo njengee-URI zedata ze-base64 endaweni yokubane yooncamathiselo zefayile. Bona [Uqwalaselo](configuration#include-inline-pictures).

Umzekelo: Ezinye izincamatheliso zinokungabi neentloko ezithile kodwa ziseyifayile eziqhelekileyo (ezingeyongaphakathi/S/MIME). Ukuba udlululo olungqongqo alufumani nanye, olukhululekileyo lunokuzamkela ezo zize zongezwe.

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
| ----------------- | ------------------------------------------- |
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

- Imifanekiso yangaphakathi ayongezwa njengooncamathiselo zefayile. Xa "Include inline pictures" ivuliwe (ingeniso: ON), zifakwa emzimbeni wempendulo njengee-URI zedata endaweni yokongezwa njengooncamathiselo zefayile. Ukuba useto luvaliwe, imifanekiso yangaphakathi isuswa ngokupheleleyo. Bona [Uqwalaselo](configuration#include-inline-pictures).
- Amacandelo osayino e-S/MIME akhutshiwe ngokuyilwa: amagama eefayile afana no `smime.p7s` kunye neentlobo ze-MIME ezifana no `application/pkcs7-signature` okanye `application/pkcs7-mime` ayatshiywa.
- Iipateni zoluhlu olumnyama zinokuhluza abakhethwayo: bona [Uqwalaselo](configuration#blacklist-glob-patterns); ukuthelekisa akunamsebenzi kubukhulu boonobumba kwaye kusekwe kuphela kwigama lefayile.
- Amagama eefayile aphindaphindiweyo awasongezwa kwakhona: ukuba yokuqulunqa sele iqulethe ifayile enegama elifanayo elilungelelanisiweyo, iyatshiywa.
- Amacandelo angeyofayile okanye alahlekwe ngamamagama eefayile: kuphela amacandelo afana neefayile anamagama eefayile anokusetyenziswa athathelwa ingqalelo ukongezwa.

---

Bona kwakunye

- [Uqwalaselo](configuration)
