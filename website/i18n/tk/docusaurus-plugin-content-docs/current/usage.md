---
id: usage
title: 'Ulanyş'
sidebar_label: 'Ulanyş'
---

---

## Ulanylyş {#usage}

- Jogap berilýär we goşundy asyllary awtomatiki goşýar — ýa-da Sazlamalarda açyk bolsa, ilki sorag berýär.
- Faýl ady boýunça gaýtalanmalar aýrylýar; S/MIME bölekleri hemişe geçirilýär. Asyl habarda gömülen suratlar jogabyň esasy böleginde galýar, Thunderbird olary ýerleşdirýän ýerinde, we faýl hökmünde göçürilmeýär.
- Gara sanawa goşulan goşundylary hem geçýär (uly/kiçi harpa duýgynsyz, faýl atlaryna gabat gelýän glob nagyşlary; ýollara däl). [Sazlama](configuration#blacklist-glob-patterns) bölümine serediň.

---

### Jogap berilende näme bolýar {#what-happens}

- Jogaby anykla → asyl goşundylary sanawla → S/MIME we gömülen suratlary geç → islege görä tassyklama → şert laýyk gelýän faýllary goş (gaýtalananlary geçirip).

| Bölek görnüşi                                       | Jogaba göçürilendi    |
|-----------------------------------------------------|----------------------:|
| S/MIME gol faýly `smime.p7s`                        | Ýok                   |
| S/MIME MIME görnüşleri (`application/pkcs7-*`)      | Ýok                   |
| Habar esasy `cid:` arkaly gömen surat               | Ýok (ol esasynda bar) |
| `Content-Disposition: inline` diýip bellenen surat  | Ýok (ol esasynda bar) |
| Esasy hiç haçan salgylanmaýan `Content-ID`-li surat | Hawa                  |
| Faýl ady bilen goşulan e-poçta (`message/rfc822`)   | Hawa                  |
| Faýl ady bilen adaty faýl goşundysy                 | Hawa                  |

Surat diňe asyl habar oňa hakykatdanam salgylanýan wagty ýa-da ugradyjy ony açyk görnüşde
`Content-Disposition: inline` diýip belleýän wagty gömülen hasaplanýar. Ýalňyz
`Content-ID` sözbaşysy ýeterlik däl: käbir poçta müşderileri her surat bölegine ony
goýýarlar, hakyky goşundylar hem şol sanda, olar barybir göçürilmeli.

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
|-----------------|----------------------------------------|
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

- Asyl habaryň gömen suratlary faýl hökmünde göçürilmeýär. Olar eýýäm jogabyň esasy tekstinde, Thunderbird goýan ýerinde bar. Serediň [Configuration](configuration#include-inline-pictures).
- S/MIME gol bölekleri niýet boýunça çykarylýar: `smime.p7s` ýaly faýl atlary we `application/pkcs7-signature` ýa-da `application/pkcs7-mime` ýaly MIME görnüşleri geçilip gidilýär.
- Gara sanaw nagyşlary kandidatlary süzüp biler: [Sazlama](configuration#blacklist-glob-patterns); gabat gelme harp ululygyna duýgynsyz we diňe faýl ady boýunça amala aşyrylýar.
- Gaýtalanýan faýl atlary täzeden goşulmaýar: eger ýazuwda eýýäm şol bir kadalaşdyrylan ada eýe faýl bar bolsa, ol geçilip gidilýär.
- Faýl däl bölekler ýa-da faýl adynyň ýoklygy: diňe ulanyp boljak faýl ady bolan faýl-ýaly bölekler goşmaga seredilýär.

---

Şeýle hem serediň

- [Sazlama](configuration)
