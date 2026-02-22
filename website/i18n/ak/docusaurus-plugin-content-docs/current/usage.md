---
id: usage
title: 'Sɛnea Wɔde Di Dwuma'
sidebar_label: 'Sɛnea wɔde di dwuma'
---

---

## Sɛnea wobɛdi dwuma {#usage}

- Bu mmuae na add‑on no bɛka ntamafɔde a edi kan no ho otomatik — anaaso ɛbɛbisa kan, sɛ woahyɛ no mu wɔ Nhyɛe (Options) mu.
- Wɔpam nsɛsoɔ so fa fael‑din so; S/MIME nkyekyɛmu no da biara wɔgyae. Mfonini a wɔahyɛ mu (inline images) no wɔsan de wɔn bɔ mmuae krataa no mu teteɛ so (wobetumi adum no fa "Include inline pictures" wɔ Nhyɛe mu).
- Ntamafɔde a wode agu blacklist so no nso, wɔgyae wɔn (glob nhyehyɛe a ɛnhu akɛse/kɛse nsonsonoe; ɛde fa fael‑din pɛ, na ɛnyɛ akwan). Hwɛ [Nhyehyɛe](configuration#blacklist-glob-patterns).

---

### Nea ɛba so bere a wobu mmuae {#what-happens}

- Hu sɛ wobuu mmuae → lista ntamafɔde a edi kan → sifte S/MIME + inline → pɛnee‑ho bisaeɛ → fa fael a ɛfata ka ho (yi nsɛsoɔ) → san de mfonini a wɔahyɛ mu no bɔ mmuae no mu.

Twɛ a ɛyɛ den (strict) ne nea ɛyɛ mmerɛw (relaxed): Add‑on no di kan yi S/MIME ne inline nkyekyɛmu firi fael ntamafɔde mu. Sɛ biribiara mmfata a, ɛhyɛ twɛ a ɛyɛ mmerɛw mu a na ɛsɛe S/MIME/inline nso, nanso ɛma nsɛm pii so (hwɛ Code Details). Mfonini a wɔahyɛ mu no renka ho sɛ fael ntamafɔde da; mmom, sɛ "Include inline pictures" wɔ so (the default) a, wɔde wɔn bɛhyɛ mmuae krataa no mu pɛpɛɛpɛ te sɛ base64 data URI.

| Fã no tebea                                                |               Twɛ a ɛyɛ den |            Twɛ a ɛyɛ mmerɛw |
| ---------------------------------------------------------- | --------------------------: | --------------------------: |
| S/MIME nsain (signature) fael `smime.p7s`                  |                    Wɔpoo no |                    Wɔpoo no |
| S/MIME MIME type (`application/pkcs7-*`)                   |                    Wɔpoo no |                    Wɔpoo no |
| Mfonini a wɔahyɛ mu a Content‑ID de rekyerɛ no (`image/*`) | Wɔpoo no (wɔsan de gu mu\*) | Wɔpoo no (wɔsan de gu mu\*) |
| Email a wɔde aka ho (`message/rfc822`) a ɛwɔ fael‑din      |                    Wɔnka ho |               Betumi aka ho |
| Fael ntamafɔde a ɛwɔ fael‑din                              |               Betumi aka ho |               Betumi aka ho |

\* Sɛ "Include inline pictures" wɔ so (default: ON) a, mfonini a wɔahyɛ mu no wɔde wɔn bɛhyɛ mmuae no mu te sɛ base64 data URIs, na mmom ɛnyɛ sɛ wɔde wɔn ka ho sɛ fael ntamafɔde. Hwɛ [Nhyehyɛe](configuration#include-inline-pictures).

Nsɛmhwɛne: Ntamafɔde bi betumi asɛe atifi‑ti (headers) bi, nanso wɔyɛ fael pa ara (na ɛnyɛ inline/S/MIME). Sɛ twɛ a ɛyɛ den no nnya biara a, twɛ a ɛyɛ mmerɛw no betumi agye saa deɛ no atom na aka ho.

---

### Nsɛnkanee {#cross-reference}

- Forward nni nsakrae biara (hwɛ Ahokyere—Limitations—ase hɔ).
- Sɛ wopɛ nsɛm a enti ntamafɔde betumi nnya ho a, hwɛ “Adɛn nti na ntamafɔde betumi nnya ho”.

---

## Sɛnea ɛyɛ adwuma ho nsɛm {#behavior-details}

- **Sɛe nsɛsoɔ mmienu (duplicate) ho banbɔ:** Add‑on no hyɛ compose tab no sɛ wɔadi so de per‑tab session value ne banbɔ a ɛwɔ memri (in‑memory) di dwuma. Ɛrenka originals no ho mpɛn abien.
- Sɛ wokum na wopae compose tokuro no bio a, wɔhwɛ no sɛ tab foforo (kyerɛ sɛ wobɛtumi asɔ hwɛ bio).
- **Di ntamafɔde a ɛwɔ hɔ dada so ni:** Sɛ compose no wɔ ntamafɔde bi dada a, wɔde originals no ka ho prɛko pɛ, na wɔsiei fael‑din a ɛwɔ hɔ dada.
- **Nnɔbae a wɔyi (exclusions):** S/MIME akyinkyim ne mfonini a wɔahyɛ mu no wɔpo wɔn firi fael ntamafɔde mu. Sɛ nea edi kan no nnya biara a, twɛ a ɛyɛ mmerɛw no bɛsan ahwehwɛ nkyekyɛmu a ɛnyɛ S/MIME. Mfonini a wɔahyɛ mu no wɔhwɛ wɔn ho fa a ɛtete: wɔsan de wɔn bɔ mmuae krataa no mu te sɛ data URIs (sɛ wɔahyɛ mu).
  - **Fael‑din:** `smime.p7s`
  - **MIME type:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Mfonini a wɔahyɛ mu:** `image/*` fã biara a Content‑ID de rekyerɛ no — wɔpo no firi fael ntamafɔde mu, nanso wobɛhyɛ no mmuae no mu sɛ "Include inline pictures" Wɔ SO (ON)
  - **Email a wɔde aka ho (`message/rfc822`):** wɔhwɛ no sɛ ntamafɔde pa sɛ ɛwɔ fael‑din; wobɛtumi aka ho (ɛsɛ sɛ wosiw nsɛsoɔ ne blacklist so).
- **Blacklist kɔkɔbɔ (sɛ woahyɛ no mu):** Sɛ wo blacklist yi apo nnidisoɔ a,
  add‑on no bɛda kyerɛ modal ketewa bi a ɛkyerɛw fael a ɛka ho ne nhyehyɛe
  a ɛtɔ wɔn so. Saa kɔkɔbɔ yi nso da adi asɛm a
  ntamafɔde biara renka ho efisɛ wɔapo ade nyinaa.

---

## Keyboa ntwitwa kwan {#keyboard-shortcuts}

- Nhyehyɛe a wopenee (confirmation) dialog: Y/J = Aane, N/Esc = Daabi; Tab/Shift+Tab ne Arrow keys de sesa focus no mu.
  - “Default answer” no wɔ [Nhyehyɛe](configuration#confirmation) mu na ɛhyɛ batɔn a ɛdi kan no so.
  - Enter hyɛ batɔn a ɛwɔ focus so no ase. Tab/Shift+Tab ne arrows de yi/move focus ma accessibility.

### Keyboa Cheat Sheet {#keyboard-cheat-sheet}

| Akɛy            | Dwuma                                    |
| --------------- | ---------------------------------------- |
| Y / J           | Pene so Aane                             |
| N / Esc         | Pene so Daabi                            |
| Enter           | Sɔ batɔn a ɛwɔ focus so                  |
| Tab / Shift+Tab | Soa focus kɔ anim/akyi                   |
| Arrow keys      | Soa focus ntam batɔn no mu               |
| Default answer  | Hyehyɛ focus a ɛdi kan (Aane anaa Daabi) |

---

## Ahokyere {#limitations}

- Add‑on yi nnsesa Forward (Reply ne Reply all na wɔboa).
- Ntamafɔde kɛse paa betumi afa Thunderbird anaa wo somfo (provider) ahokyere ho.
  - Add‑on no ɛnnkyekyere anaa ɛmpia fael; ɛgye Thunderbird anammɔn ntamafɔde dwumadie so.
- Nkratoɔ a wɔabɔ ban (encrypted): S/MIME nkyekyɛmu no wɔapo wɔn pɛpɛɛpɛ.

---

## Adɛn nti na ntamafɔde betumi nnya ho {#why-attachments-might-not-be-added}

- Mfonini a wɔahyɛ mu no ɛnkɔ ho sɛ fael ntamafɔde. Sɛ "Include inline pictures" Wɔ SO (the default) a, wɔde wɔn bɛhyɛ mmuae no mu te sɛ data URIs mmom. Sɛ woahyɛ no sɛ OFF a, wɔpepa mfonini a wɔahyɛ mu no nyinaa. Hwɛ [Nhyehyɛe](configuration#include-inline-pictures).
- S/MIME nsain (signature) nkyekyɛmu no wɔpo wɔn firi adwuma ase: fael‑din te sɛ `smime.p7s` ne MIME type te sɛ `application/pkcs7-signature` anaa `application/pkcs7-mime` wɔgyae wɔn.
- Blacklist nhyehyɛe betumi asɛe nnidisoɔ: hwɛ [Nhyehyɛe](configuration#blacklist-glob-patterns); pam no yɛ case‑insensitive na ɛfa fael‑din pɛ.
- Fael‑din a ɛte pɛpɛɛpɛ menka ho bio: sɛ compose no wɔ fael bi a ne din ne nea ɛbɛka no te pɛpɛɛpɛ a, wɔgyae no.
- Nkyekyɛmu a ɛnyɛ fael anaa fael‑din a wɔahwere: fã a ɛte sɛ fael na ɛwɔ fael‑din a wobɛtumi de di dwuma nko na wɔbɛka ho.

---

Hwɛ nso

- [Nhyehyɛe](configuration)
