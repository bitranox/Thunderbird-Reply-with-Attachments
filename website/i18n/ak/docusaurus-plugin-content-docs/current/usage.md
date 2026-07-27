---
id: usage
title: 'Sɛnea Wɔde Di Dwuma'
sidebar_label: 'Sɛnea wɔde di dwuma'
---

---

## Sɛnea wobɛdi dwuma {#usage}

- Bu mmuae na add‑on no bɛka ntamafɔde a edi kan no ho otomatik — anaaso ɛbɛbisa kan, sɛ woahyɛ no mu wɔ Nhyɛe (Options) mu.
- Wɔhwɛ din a wɔde too fael no so na woyi nea ɛyɛ pɛ; S/MIME akyɛde nyinaa, wɔpo daa. Mfonini a ɛwɔ nkrasɛm no mu ankasa no gyina reply no mu, faako a Thunderbird de si, na wɔnkyɛ no sɛ fael.
- Ntamafɔde a wode agu blacklist so no nso, wɔgyae wɔn (glob nhyehyɛe a ɛnhu akɛse/kɛse nsonsonoe; ɛde fa fael‑din pɛ, na ɛnyɛ akwan). Hwɛ [Nhyehyɛe](configuration#blacklist-glob-patterns).

---

### Nea ɛba so bere a wobu mmuae {#what-happens}

- Hu mmuae → yi tsetse attachment a edi kan no ho nsɛm → firi S/MIME ne mfonini a wɔde ahyɛ mu ho → sɛ ɛho hia a, hyɛ ho nkyerasɛ → fa attachment a ɛfata no bata ho (firi wɔn a wɔyɛ pɛ no).

| Akyɛde su                                                    | Wɔkyɛ kɔ reply no mu     |
|--------------------------------------------------------------|-------------------------:|
| S/MIME nsɛnkyerɛnne fael `smime.p7s`                         | Dabi                     |
| S/MIME MIME nsusuwii (`application/pkcs7-*`)                 | Dabi                     |
| Mfonini a nkrasɛm no de `cid:` de hyɛ mu                     | Dabi (ɛwɔ nkrasɛm no mu) |
| Mfonini a wɔahyɛ no `Content-Disposition: inline`            | Dabi (ɛwɔ nkrasɛm no mu) |
| Mfonini a `Content-ID` wɔ ho a nkrasɛm no nnkyerɛ ho asɛm da | Aane                     |
| Email a wɔde bɔɔ mu (`message/rfc822`) a fael din wɔ ho      | Aane                     |
| Fael a wɔde bɔɔ mu wɔ ɔkwan pa so a fael din wɔ ho           | Aane                     |

Mfonini bu sɛ wɔde ahyɛ mu bere a nkrasɛm ankasa no kyerɛ ho asɛm ampa,
anaasɛ ɔsomafo no ada no adi pefee sɛ `Content-Disposition: inline`. `Content-ID` header a
ɛnkyerɛ hwee nnɔɔso: email dwumadi bebree de baako gu mfonini akyɛde biara so,
a akyɛde ankasa ka ho, na ɛsɛ sɛ wɔkyɛ eyinom nyinaa.

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
|-----------------|------------------------------------------|
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

- Mfonini a nkrasɛm titiriw no de ahyɛ mu no, wɔmfa nyɛ fael mmata ho. Ɛwɔ mmuae no mu dedaw, faako a Thunderbird de asi hɔ. Hwɛ [Configuration](configuration#include-inline-pictures).
- S/MIME nsain (signature) nkyekyɛmu no wɔpo wɔn firi adwuma ase: fael‑din te sɛ `smime.p7s` ne MIME type te sɛ `application/pkcs7-signature` anaa `application/pkcs7-mime` wɔgyae wɔn.
- Blacklist nhyehyɛe betumi asɛe nnidisoɔ: hwɛ [Nhyehyɛe](configuration#blacklist-glob-patterns); pam no yɛ case‑insensitive na ɛfa fael‑din pɛ.
- Fael‑din a ɛte pɛpɛɛpɛ menka ho bio: sɛ compose no wɔ fael bi a ne din ne nea ɛbɛka no te pɛpɛɛpɛ a, wɔgyae no.
- Nkyekyɛmu a ɛnyɛ fael anaa fael‑din a wɔahwere: fã a ɛte sɛ fael na ɛwɔ fael‑din a wobɛtumi de di dwuma nko na wɔbɛka ho.

---

Hwɛ nso

- [Nhyehyɛe](configuration)
