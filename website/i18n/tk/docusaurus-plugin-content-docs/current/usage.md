---
id: usage
title: 'Ulanyş'
sidebar_label: 'Ulanyş'
---

## Usage {#usage}

- Jawap beriň we goşmaça öz-özüni aňladyp berer — ýa-da ilkinji gezek sorar, Eltip bermekde mümkinçiligi açyk bolsa.
- Faýl ady boýunça gaýtalanmaýar; S/MIME we düýpli şekiller hemişe geçilýär.
- Garamaýan goşmaçalar hem geçilýär (faýl adlary bilen deňeşdirilýän, ýalňyş degişli glob nusgalary). [Konfigurasiýa](configuration#blacklist-glob-patterns) görüň.

---

### What happens on reply {#what-happens}

- Jawap detekçirlenýär → asl goşmaçalar sanawyna alynýar → S/MIME + düýpli şekilleri filtrle → islege görä tassykla → degişli faýllary goş (gaýtalanmalardan geç).

Gaty çäklendirilen we rahat geçiş: Goşmaça ilkinji nobatda S/MIME we düýpli bölekleri dışlamaly. Eger hiç hili ýaramly bolsa, oňa ýumşak geçiş edilýär, bu S/MIME/inline geçirmese-de has köp ýagdaýlary kabul edýär (Kod Detallaryny görüň).

| Pati türü                                             |    Gaty geçiş |   Rahat geçiş |
| ----------------------------------------------------- | ------------: | ------------: |
| S/MIME ýagdaý faýly `smime.p7s`                       |       Geçildi |       Geçildi |
| S/MIME MIME görnüşleri (`application/pkcs7-*`)        |       Geçildi |       Geçildi |
| Düýpli şekil, Mazmun-ID arkaly görkezilen (`image/*`) |       Geçildi |       Geçildi |
| Garalan email (`message/rfc822`) faýl ady bilen       |    Goşulmaýar | Goşulyp biler |
| Adatça faýl goşmasy faýl ady bilen                    | Goşulyp biler | Goşulyp biler |

Mysal: Käbir goşmaçalar käbir baş ýazgylardan mahrum bolup biler, ýöne henizem adatça faýllardyr (düýpli/S/MIME däl). Eger gaty geçiş hiç hili tapmasa, rahat geçiş şolary kabul edip, goşup biler.

---

### Cross‑reference {#cross-reference}

- Ilkiňi üýtgedilmeýär (aşakdaky Çäkler üçin görüň).
- Goşmaçanyň goşulmazlygynyň sebäpleri üçin, “Goşmaçalar näme üçin goşulmaz” -a göz ýetiriň.

---

## Behavior Details {#behavior-details}

- **Gaýtalanmalary öňüni almak:** Goşmaça amal gepleşigi işleýär we her bülbül üçin sessiýa bahasy we ýadylda howpsuzlyk nyşanyny ulanyp işjelini belleyýär. Şoň bilen asl goşmaçalar iki gezek goşulmaz.
- Geçiriji gapany ýapmak we gaýtadan açmak täze bülbül aýdylypdyr (yani täze synanyşmaga mümkinçilik berilýär).
- **Yşşyl goşmaçalar:** Eger gepleşigiň içinde käbir goşmaçalar bar bolsa, asl goşmaçalar bir gezek amala aşyrylýar, eýsem bar bolan faýl adlaryny geçýär.
- **Geçirmeler:** S/MIME serişdeleri we düýpli şekiller görmezlikde çykýarlar. Eger ilkinji geçişde hiç hili ýaramly bolsa, ýumşak gaýtadan gözden geçiriş S/MIME däl bölekleri gaýtadan gözden geçirýär.
  - **Faýl adlary:** `smime.p7s`
  - **MIME görnüşleri:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Düýpli şekiller:** E-poçta başyndaky Mazmun-ID arkaly görkezilen herhangi bir `image/*` bölegi
  - **Garalan e-mailler (`message/rfc822`):** faýl ady bilen berk goşmaçalar hökmünde kabul edilýär; goşup biler (gaýtalanma ýygydynyň we gara lista görä).
- **Geçiriji duýduryşy (eğer açyk bolsa):** Eger başdan geçirmede gözden geçirilmese, goşma geçiriji
  goşulan faýllaryň we laýyk
  nusgalaryň sanawyny görkezýän kiçi modal görkezýär. Bu duýduryş, hiç hili goşmaçanyň goşulmazlygy sebäpli hiç hili goşma geçirmese hem peýda bolýar.

---

## Keyboard shortcuts {#keyboard-shortcuts}

- Tassyklama dialogy: Y/J = Hawa, N/Esc = Hawa däl; Tab/Shift+Tab we Yönlendirme düwmesine üçüri.
  - “Awtomatiki jogap” [Konfigurasiýa](configuration#confirmation) başlangyç üns berýän düwme üpjün etmelidir.
  - Enter üns berýän düwmäni işledýär. Tab/Shift+Tab we tarapy üns berýän düwmeleriň arasynda hereket etdirýär.

### Keyboard Cheat Sheet {#keyboard-cheat-sheet}

| Düwme                 | İşlem                                     |
| --------------------- | ----------------------------------------- |
| Y / J                 | Hawa tassyklap geçiň                      |
| N / Esc               | Hawa däl tassyklap geçiň                  |
| Enter                 | Üns berýän düwmäni işledýär               |
| Tab / Shift+Tab       | Üns berme(n) öňe/gatarda hereket etdiriň  |
| Yönlendirme düwmeleri | Düwmeler arasyndaky üns bermegi geçirýär  |
| Başlanjyç jogap       | Başlangyç üns berme (Hawa ýa-da Hawa däl) |

---

## Limitations {#limitations}

- Goşmaça hiç hili üýtgedilmeýär (Jawap we Jawaplar birikmesi goldanýar).
- Çoň goşa goşmaçalar Thunderbird ýa-da üpjün ediji çäklendirmek bilen baglanyşykly bolup biler.
  - Goşmaça faýllary birikdirmeýär ýa-da gurşaklamaz; Meta oňa Thunderbird‑iň adatça goşmaçalara garamagy bilen baglanyşýar.
- Şifrlenen habarlar: S/MIME bölekleri öz-özüne geçilýär.

---

## Why attachments might not be added {#why-attachments-might-not-be-added}

- Düýpli şekiller geçilýär: habarda Mazmun-ID arkaly görkezilen bölekler faýllar hökmünde goşulmaýar.
- S/MIME nyşan bölekleri öz-özüne geçilýär: ady `smime.p7s` ýaly faýllar we MIME görnüşleri `application/pkcs7-signature` ýa-da `application/pkcs7-mime` ýaly geçýär.
- Garamaýan nusgalar kandidatlary süzgün eder: [Konfigurasiýa](configuration#blacklist-glob-patterns) görüň; uygunlykdan geçmek ýüze çykarylmaýar we faýl adyna geçýärler.
- Gaýtalanýan faýl adlary goşulmaýar: eğer gepleşige öňden bar bolan faýl ady bilen kesgitlenendigi ýüze çykmasa, o geçilýär.
- Faýl däl bölekler ýa-da ýok faýl adlary: diňe peýdalanyş faýllara degişli bolan bölekler goşmak üçin göz öňüne tutulýar.

---

See also

- [Konfigurasiýa](configuration)
