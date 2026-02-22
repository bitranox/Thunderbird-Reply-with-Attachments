---
id: usage
title: 'Fayyadama'
sidebar_label: 'Fayyadama'
---

---

## Fayyadama {#usage}

- Deebisi, dabalataan immoo asxaa duraanii ofumaan ida'a — yookaan jalqaba gaafata, yoo Filannoowwan keessatti dandeessifame.
- Irra‑deddeebi'insa maqaa faayiliin to'ata; kutaan S/MIME yeroo hunda ni dhiifama. Suuraaleen inline bifa durtiiin qaama deebii keessatti deebi'u (Filannoowwan keessatti "Include inline pictures" dhaamsuun ni danda'ama).
- Maxxansoonni tarree ugguraatti galan akkuma kanaan ni dhiifamu (foormaati glob sensitiivii‑qubee miti kan maqaa faayilii waliin walsimu, karaa miti). [Qindaa'ina](configuration#blacklist-glob-patterns) ilaali.

---

### Yeroo deebitan maal ta'a {#what-happens}

- Deebii argi → maxxansoota duraanii tarreessi → S/MIME + inline haqi → mirkaneessa filannoo qabu → faayiloota malan ida'i (waan irra‑deddeebi'u dhiisi) → suuraaleen inline qaama barruu keessatti deebisi.

Darbuu cimaa fi laafaa: Dabalataan jalqabatti kutaa S/MIME fi inline faayiloota maxxanfaman keessaa ni baasaa. Homtuu yoo hin mijanne, darbuu laafaa raawwata kan amma iyyuu S/MIME/inline alatti baasuu itti fufu garuu haala dabalataa fudhatu (Ibsa Koodii ilaali). Suuraaleen inline yommuu ta'u faayila maxxanfamaa ta'anii hin ida'aman; bakka sana, yommuu "Include inline pictures" dandeessifame (bifa durtii), isaan qaama deebii keessatti akka base64 data URItti qindaa'anii ni kaa'amu.

| Part type                                                     |                                  Strict pass |                                 Relaxed pass |
| ------------------------------------------------------------- | -------------------------------------------: | -------------------------------------------: |
| Faayila mallattoo S/MIME `smime.p7s`                          |                               Alatti baafame |                               Alatti baafame |
| Gosoota MIME S/MIME (`application/pkcs7-*`)                   |                               Alatti baafame |                               Alatti baafame |
| Suuraa inline kan Content‑ID tiin waamame (`image/*`)         | Alatti baafame (qaama keessatti deebifame\*) | Alatti baafame (qaama keessatti deebifame\*) |
| Imeelii maxxanfame (`message/rfc822`) kan maqaa faayilii qabu |                                 Hin ida'amne |                              Ida'amu danda'a |
| Faayila maxxanfamaa sirrii kan maqaa faayilii qabu            |                              Ida'amu danda'a |                              Ida'amu danda'a |

\* Yommuu "Include inline pictures" dandeessifame (bifa durtii: ON), suuraaleen inline qaama deebii keessatti akka base64 data URItti ni kaa'amu; faayila maxxanfamaa ta'anii hin ida'aman. [Qindaa'ina](configuration#include-inline-pictures) ilaali.

Fakkeenya: Maxxansoonni muraasni mata‑duree muraasa dhabuu danda'u; garuu amma iyyuu faayiloota sirrii (inline/S/MIME miti). Darbuu cimaa keessatti homtuu hin argamne yoo ta'e, darbuu laafaan isaan fudhachuu fi maxxansu danda'a.

---

### Walitti‑hidhata {#cross-reference}

- Forward kallattiidhaan hin jijjiiramu (Daangawwan gadi aanaa ilaali).
- Sababoota maxxansi hin ida'amiin danda'uuf, “Maaliif maxxansoonni hin ida'amin ta'uu danda'u” ilaali.

---

## Ibsaa Hojii {#behavior-details}

- Ittisa irra‑deddeebi'uu: Dabalataan taba qopheessuu akka hojjetame mallatteessuuf gatii session tabi‑tokkoon fi eegduu in‑memory fayyadama. Asxaa duraanii lammata hin ida'u.
- Baniinsa qopheessuu cufuun fi irra deebi'ee banuun taba haaraa fakkaata (fakkeenyaaf, carraa haaraa ni hayyama).
- Maxxansoota jiran kabaju: Yoo qopheessaa keessatti duraanuu maxxansi jiraateyyuu, asxaa duraanii yeroo tokkicha qofa ni ida'ama; maqaan faayilii duraan jiru walfakkaataa yoo ta'e ni dhiifama.
- Haquu: Kutaaleen S/MIME fi suuraaleen inline faayiloota maxxanfaman keessaa ni baasamu. Homtuu darbuu jalqabaa irratti yoo hin mijanne, bakkabuusaan laafaan kutaa S/MIME miti ta'an irra deebi'ee ilaala. Suuraaleen inline addaan qoodamu: yommuu dandeessifame qaama deebii keessatti akka data URItti ni deebifamu.
  - Maqaa faayilii: `smime.p7s`
  - Gosa MIME: `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - Suuraaleen inline: kutaa `image/*` kamiyyuu kan Content‑ID tiin waamame — faayila maxxanfamaa irraa alatti baafama garuu qaama deebii keessatti yommuu "Include inline pictures" ON ta'e ni maxxanfama
  - Imeeloota maxxanfaman (`message/rfc822`): maqaa faayilii yoo qaban akka maxxansoota sirriitti ilaalamu; ida'amu danda'u (sakatta'iinsa irra‑deddeebi'uu fi tarree ugguraa jala).
- Akeekkachiisa tarree ugguraa (yoo dandeessifame): Filatamtoonni tarree ugguraan yoo haquaman,
  dabalataan moddalii xiqqaa agarsiisa kan faayiloota miidhamanii fi paatternii
  walsimuu tarreessu. Akeekkachiisni kunis yeroo maxxansi kamiyyuu hin ida'amne ta'ees
  mul'ata sababiin isaas wantoota hunda haquu ta'uu isaati.

---

## Gabaabina Kiiboordii {#keyboard-shortcuts}

- Ijoo mirkaneessaa: Y/J = Eeyyee, N/Esc = Lakki; Tab/Shift+Tab fi furtuuwwan Arrow xiyyeeffannoo keessa naanna'u.
  - “Default answer” kan [Qindaa'ina](configuration#confirmation) keessa jiru bantiin jalqaba irratti xiyyeeffannoo qabu akka ta'u ni saaxila.
  - Enter bantiin irratti xiyyeeffannoon jiru akka hojjetu kakaasa. Tab/Shift+Tab fi arrows saaxilamummaaaf xiyyeeffannoo ni sochoosu.

### Gabatee Gabaabaa Kiiboordii {#keyboard-cheat-sheet}

| Furtuuwwan      | Gocha                                               |
| --------------- | --------------------------------------------------- |
| Y / J           | Eeyyee mirkaneessi                                  |
| N / Esc         | Lakki mirkaneessi                                   |
| Enter           | Bantii irratti xiyyeeffannoo qabu kakaasi           |
| Tab / Shift+Tab | Xiyyeeffannoo gara fuulduraatti/dachaatii sochoosi  |
| Arrow keys      | Xiyyeeffannoo bantiwwan gidduutti sochoosi          |
| Default answer  | Xiyyeeffannoo jalqabaa saagi (Eeyyee yookaan Lakki) |

---

## Daangawwan {#limitations}

- Forward dabalataan kuniin hin jijjiiramu (Reply fi Reply all ni deggaramu).
- Maxxansoonni baay'ee guddaan daangaa Thunderbird yookaan tajaajilaa jala ta'uu danda'u.
  - Dabalataan faayiloota gara kutaa‑kutaa hin qoode yookaan hin cufsiisu; qunnamtii maxxansaa sirrii Thunderbird irratti ni hirkata.
- Ergaalee iccitii‑qabamoo: kutaaleen S/MIME qindoominaan alatti baafamu.

---

## Maaliif maxxansoonni hin ida'amin ta'uu danda'u {#why-attachments-might-not-be-added}

- Suuraaleen inline faayila maxxanfamaa ta'anii hin ida'aman. Yommuu "Include inline pictures" ON (bifa durtii) ta'u, bakka bu'utti qaama deebii keessatti akka data URItti ni kaa'amu. Sana OFF yoo taasifame, suuraaleen inline guutumaan guutuutti ni haqamu. [Qindaa'ina](configuration#include-inline-pictures) ilaali.
- Kutaaleen mallattoo S/MIME yaadamee alatti baafamu: maqaa faayilii akka `smime.p7s` fi gosa MIME akka `application/pkcs7-signature` yookaan `application/pkcs7-mime` jiran ni dhiifamu.
- Paatterniin tarree ugguraa filatamtoota faffacaasu danda'a: [Qindaa'ina](configuration#blacklist-glob-patterns) ilaali; walsimsiisni sensitiivii‑qubee miti, maqaa faayilii qofaan.
- Maqaan faayilii irra‑deddeebi'u irra deebi'anii hin ida'aman: yoo qopheessaa keessatti maqaa sirreessamee walfakkaataa qabu faayilli duraan jiru, ni dhiifama.
- Kutaaleen faayila miti yookaan maqaa faayilii dhabuu: qofa kutaan faayila fakkaatu kan maqaa faayilii hojiirra oolu qabu ida'uu irratti ni ilaalama.

---

Isaanis ilaali

- [Qindaa'ina](configuration)
