---
id: usage
title: 'Ulanyş'
sidebar_label: 'Ulanyş'
---

---

## Ulanylyş {#usage}

- Jogap berilýär we goşundy asyllary awtomatiki goşýar — ýa-da Sazlamalarda açyk bolsa, ilki sorag berýär.
- Faýl ady boýunça gaýtalanmalar aýrylýar; S/MIME bölekleri hemişe geçilip gidilýär. Öňünden bellenen ýagdaýda içerki (inline) suratlardyr şekiller jogabyň göwründe dikeldilýär (Sazlamalardaky "Include inline pictures" arkaly öçürip bolýar).
- Gara sanawa goşulan goşundylary hem geçýär (uly/kiçi harpa duýgynsyz, faýl atlaryna gabat gelýän glob nagyşlary; ýollara däl). [Sazlama](configuration#blacklist-glob-patterns) bölümine serediň.

---

### Jogap berilende näme bolýar {#what-happens}

- Jogapy anykla → asyl goşundylary sana → S/MIME + içerki bölekleri süz → islege bagly tassyk → laýyk faýllary goş (gaýtalanmalary geç) → içeri goýlan suratlary göwründe dikelt.

Berk we ýumşadylan geçiriliş: Goşundy ilki bilen faýl goşundylaryndan S/MIME hem-de içerki (inline) bölekleri çykarmaga synanyşýar. Hiç zat laýyk gelmese, ýene-de S/MIME/inline böleklerini çykaryp, ýöne has köp ýagdaýy kabul edýän ýumşadylan geçirilişi işletýär (Kodyň Jikme-jikligi bölümine serediň). Içerki suratlar hiç haçan faýl goşundylary hökmünde goşulmaýar; muňa derek, "Include inline pictures" açyk bolsa (bellenşi ýaly), olar jogabyň göwründe gönüden-göni base64 data URI hökmünde gömülýär.

| Böleg görnüşi                                          |                    Berk geçiriliş |              Ýumşadylan geçiriliş |
| ------------------------------------------------------ | --------------------------------: | --------------------------------: |
| S/MIME gol faýly `smime.p7s`                           |                          Aýrylýar |                          Aýrylýar |
| S/MIME MIME görnüşleri (`application/pkcs7-*`)         |                          Aýrylýar |                          Aýrylýar |
| Content‑ID arkaly salgylanan içerki surat (`image/*`)  | Aýrylýar (göwründe dikeldilýär\*) | Aýrylýar (göwründe dikeldilýär\*) |
| Faýl ady bolan birikdirilen e-poçta (`message/rfc822`) |                        Goşulmaýar |                    Goşulyp bilner |
| Faýl ady bolan adaty faýl goşundysy                    |                    Goşulyp bilner |                    Goşulyp bilner |

\* "Include inline pictures" açyk ýagdaýda (default: ON), içerki suratlar faýl goşundylary hökmünde goşulmagyň ýerine jogabyň göwründe base64 data URI görnüşinde gömülýär. [Sazlama](configuration#include-inline-pictures) bölümine serediň.

Mysal: Käbir goşundylaryň käbir başlyklar (headers) bolman biler, ýöne şonda-da olar adaty faýllardyr (içerki/S/MIME däl). Berk geçiriliş hiç birini tapmasa, ýumşadylan geçiriliş şolary kabul edip, goşup biler.

---

### Çapraz salgylanmalar {#cross-reference}

- Ugratmak (Forward) niýet boýunça üýtgedilmeýär (aşakdaky Çäklemelere serediň).
- Goşundynyň näme sebäplerden goşulman biljekdigine “Goşundylar näme üçin goşulman biler” bölüminden serediň.

---

## Hereketiň jikme-jik maglumatlary {#behavior-details}

- **Gaýtalanmalaryň öňüni almak:** Goşundy her tab boýunça sessiýa gymmaty we ýatda saklanylýan goralgy bilen ýazuw (compose) tab-yny gaýtadan işlendi diýip belleýär. Asyllary iki gezek goşmaz.
- Ýazuw penjiresini ýapyp-gaýtadan açmak täze tab hökmünde kabul edilýär (ýaňky ýaly täze synanyşyk rugsat berilýär).
- **Bar goşundylara hormat:** Eger ýazuwda eýýäm käbir goşundylary bar bolsa, asyllar hem diňe bir gezek goşular; eýýäm bar bolan faýl adlary geçilip gidiler.
- **Aýyrmalar:** S/MIME artefaktlary we içerki suratlar faýl goşundylaryndan çykarylýar. Ilki geçirilişte hiç zat laýyk gelmese, ýumşadylan ätiýaçlyk geçirilişi S/MIME däl bölekleri gaýtadan barlaýar. Içerki suratlar aýratynça gaýragoýulýar: olar jogabyň göwründe data URI hökmünde dikeldilýär (açyk bolan ýagdaýynda).
  - **Faýl atlary:** `smime.p7s`
  - **MIME görnüşleri:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Içerki suratlar:** Content‑ID arkaly salgylanan islendik `image/*` bölegi — faýl goşundylaryndan çykarylýar, ýöne "Include inline pictures" ON ýagdaýynda jogap göwrüne gömülýär
  - **Birikdirilen e-poçtalar (`message/rfc822`):** faýl ady bar bolsa, adaty goşundy hökmünde garalýar; goşulyp bilner (gaýtalama barlaglaryna we gara sanawa bagly).
- **Gara sanaw duýduryşy (açyk bolsa):** Kandidatlar gara sanawyňyz tarapyndan çykarylanda,
  goşundy täsir eden faýllary we gabat gelen nagyş(lar)y görkezýän ownuk bir modal görkezýär.
  Bu duýduryş hemme zat çykarylanlygy sebäpli hiç hili goşundy goşulmajak ýagdaýlarda hem peýda bolýar.

---

## Klawiatura gysga ýollary {#keyboard-shortcuts}

- Tassyklaýyş penjiräsi: Y/J = Hawa, N/Esc = Ýok; Tab/Shift+Tab we Ok düwmeleri fokusy aýlaýar.
  - [Sazlama](configuration#confirmation) bölümindäki “Deslapky jogap” ilki fokus edilen düwmäni kesgitleýär.
  - Enter fokus edilen düwmäni işledýär. Elýeterlilik üçin fokusy Tab/Shift+Tab we oklar üsti bilen süýşüriň.

### Klawiatura boýunça gysga nusga {#keyboard-cheat-sheet}

| Düwmeler        | Hereket                                |
| --------------- | -------------------------------------- |
| Y / J           | Hawany tassykla                        |
| N / Esc         | Ýogy tassykla                          |
| Enter           | Bellenen düwmäni işjeňleşdir           |
| Tab / Shift+Tab | Fokusy öňe/yzyna geçir                 |
| Ok düwmeleri    | Fokusy düwmeleriň arasynda geçir       |
| Deslapky jogap  | Ilkinji fokusy düzýär (Hawa ýa-da Ýok) |

---

## Çäklemeler {#limitations}

- Bu goşundy Ugratmagy (Forward) üýtgetmeýär (Jogap ber we Hemmesine jogap ber goldanýar).
- Örän uly goşundylara Thunderbird ýa-da hyzmat berijiniň çäkleri degişlidir.
  - Goşundy faýllary böleklemez ýa-da gysmaz; Thunderbird-iň adaty goşundy dolandyryşyna bil baglaýar.
- Şifrlenen hatlar: S/MIME bölekleri ýörite çykarylýar.

---

## Goşundylar näme üçin goşulman biler {#why-attachments-might-not-be-added}

- Içerki suratlar faýl goşundylary hökmünde goşulmaýar. "Include inline pictures" ON ýagdaýynda (bellenşi ýaly), olar munuň ýerine jogabyň göwründe data URI hökmünde gömülýär. Sazlama üçin serediň: [Sazlama](configuration#include-inline-pictures).
- S/MIME gol bölekleri niýet boýunça çykarylýar: `smime.p7s` ýaly faýl atlary we `application/pkcs7-signature` ýa-da `application/pkcs7-mime` ýaly MIME görnüşleri geçilip gidilýär.
- Gara sanaw nagyşlary kandidatlary süzüp biler: [Sazlama](configuration#blacklist-glob-patterns); gabat gelme harp ululygyna duýgynsyz we diňe faýl ady boýunça amala aşyrylýar.
- Gaýtalanýan faýl atlary täzeden goşulmaýar: eger ýazuwda eýýäm şol bir kadalaşdyrylan ada eýe faýl bar bolsa, ol geçilip gidilýär.
- Faýl däl bölekler ýa-da faýl adynyň ýoklygy: diňe ulanyp boljak faýl ady bolan faýl-ýaly bölekler goşmaga seredilýär.

---

Şeýle hem serediň

- [Sazlama](configuration)
