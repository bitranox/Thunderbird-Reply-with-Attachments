---
id: usage
title: 'Iji'
sidebar_label: 'Iji'
---

## Usage {#usage}

- Zaghachi na mgbakwunye na-etinye ihe onyonyo na-akpaghị aka - ma ọ bụ na-ajụ mbụ, ma ọ bụrụ na emechara na Nhọrọ.
- A na-enyocha ya site n'aha faịlụ; S/MIME na onyonyo na-erukwa mgbe niile na-akwụgịghị.
- A na-akwụsịkarị ihe nbipụ na-aghaghị ịdị na (ụlọ ọrụ a na-edepụta aha faịlụ, ọ bụghị ụzọ). Lee [Ntọala](configuration#blacklist-glob-patterns).

---

### What happens on reply {#what-happens}

- Chọpụta nzaghachi → ịdepụta ihe nbipụ mbụ → suzọ S/MIME + inline → jide n'aka na nhọrọ → tinye faịlụ ndị kwadoro (hichapụ ntụgharị).

Enweghị vs. ntakịrị akpachapụ: Mgbakwunye na-edebanye S/MIME na akụkụ inline na mbụ. Ọ bụrụ na enweghi ihe ọ bụla kachasị, ọ na-agba mbọ ntakịrị nke na-enyocha S/MIME/inline ma jigide ihe ndị ọzọ (lee Ngwaọrụ Koodu).

| Ụdị akụkụ                                           | Ngalaba siri ike |  Ngalaba ntakịrị |
| --------------------------------------------------- | ---------------: | ---------------: |
| Faịlụ S/MIME `smime.p7s`                            |         Akwụsịrị |         Akwụsịrị |
| Ụdị MIME S/MIME (`application/pkcs7-*`)             |         Akwụsịrị |         Akwụsịrị |
| Onyonyo inline e kwuru na Content‑ID (`image/*`)    |         Akwụsịrị |         Akwụsịrị |
| Email e etinyere (`message/rfc822`) nwere aha faịlụ |     Emeghị tinye | Nwere ike itinye |
| Ụdị faịlụ nkịtị e etinyere na aha faịlụ             | Nwere ike itinye | Nwere ike itinye |

Ihe atụ: Ụfọdụ ihe nbipụ nwere ike enweghị ụfọdụ isi ma ka bụrụ faịlụ nkịtị (ọ bụghị inline/S/MIME). Ọ bụrụ na ngalaba siri ike na-ahụghị ihe, ngalaba ntakịrị nwere ike nabata ndị ahụ ma tinye ha.

---

### Cross‑reference {#cross-reference}

- A naghị eji ntinye eweghara (lee Nsogbu n'okpuru).
- Maka ihe kpatara na a na-ejighị ihe nbipụ, lee "Ihe kpatara na a na-ejighị ihe nbipụ".

---

## Behavior Details {#behavior-details}

- **Igbochi ọkwa:** Mgbakwunye na-amata taabụ edebere na-emekwa ka e tee ọnụahịa site n'iji onodu ọ bụla na ndabere na nchedo. Ọ gaghị etinye ihe nbipụ abụọ.
- Ịkwụsịghị na ịmeghe windo nhazi a na-ewere ya dị ka taabụ ọhụụ (nke bụ, a na-ahapụ mgbalị ọhụrụ).
- **Kwenyere ihe nbipụ dị ugbu a:** Ọ bụrụ na nhazi nwere ụfọdụ ihe nbipụ, a ga-etinye ihe nbipụ naanị otu, na-ahapụ aha faịlụ ndị dị ugbu a.
- **Nkwụsị:** A na-eji S/MIME na onyonyo inline. Ọ bụrụ na enweghi ihe ọ bụla maka ngalaba mbụ, a na-eme nyocha ntakịrị ọzọ na-ewere akụkụ ndị na-abụghị S/MIME.
  - **Aha faịlụ:** `smime.p7s`
  - **Ụdị MIME:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Onyonyo inline:** ọ bụla `image/*` akụkụ e kwuru na Content‑ID na body ozi
  - **Email e etinyere (`message/rfc822`):** e jiri ya tụnyere ihe nbipụ nkịtị ma ọ bụrụ na ọ nwere aha faịlụ; ha nwere ike itinye (n'echiche nchọpụta ndị ọzọ na blacklist).
- **Nkwuputa blacklist (ma ọ bụrụ na emere):** Mgbe a na-ewepụ ndị na-eme atụmatụ site na blacklist gị,
  mgbakwunye na-egosi obere modal na-egosi faịlụ ndị metụtara ya na
  usoro. A na-enwetakwa nkwupụta a na ọnọdụ ebe a ga-ejighị ihe nbipụ
  n'ihi na e tinyeworo ihe niile.

---

## Keyboard shortcuts {#keyboard-shortcuts}

- Ngwaọrụ nkwenye: Y/J = Ee, N/Esc = Mba; Tab/Shift+Tab na pụta banye na-ejikọta ịhụ.
  - “Azịza ndabara” na [Ntọala](configuration#confirmation) na-ebupụta bọtịnụ na-achọ.
  - Pịa tinye bọtịnụ. Tab/Shift+Tab na pụta banye na-ebute ihe maka inwe nkwado.

### Keyboard Cheat Sheet {#keyboard-cheat-sheet}

| Igodo            | Ihe omume                       |
| ---------------- | ------------------------------- |
| Y / J            | Kwunye Ee                       |
| N / Esc          | Kwunye Mba                      |
| Tinye            | Gbaa bọtịnụ na-achọ             |
| Tab / Shift+Tab  | Gbaa ihu n'ihu/azụ              |
| Igodo pụta banye | Gbaa atọ n'etiti bọtịnụ         |
| Azịza ndabara    | Kwatuo ihu mbụ (Ee ma ọ bụ Mba) |

---

## Limitations {#limitations}

- A naghị eji ntinye na mgbakwunye a gbanwee (Zaghachi na Zaghachiri niile na-akwado).
- Ihe nbipụ buru ibu nwere ike ịkwalite limitations nke Thunderbird ma ọ bụ ndị na-eweta.
  - Mgbakwunye a anaghị ekewa ma ọ bụ compress faịlụ; ọ dabere na nchịkwa ndabere Thunderbird.
- Ozi echekwara: A na-ewepụ akụkụ S/MIME n'ozuzu.

---

## Why attachments might not be added {#why-attachments-might-not-be-added}

- Onyonyo inline na-enyocha: akụkụ e kwuru na Content‑ID na body ozi ahụ atụghị dị ka faịlụ.
- A na-ewepụ akụkụ S/MIME signatures na-ed Constitución: aha faịlụ dị ka `smime.p7s` na Ụdị MIME dịka `application/pkcs7-signature` ma ọ bụ `application/pkcs7-mime` na-akwụsịghị.
- Usoro blacklist nwere ike ịpụta: lee [Ntọala](configuration#blacklist-glob-patterns); njikọ bụ nke enweghị isi na naanị aha faịlụ.
- A naghị etinye faịlụ ndị ọzọ: ọ bụrụ na nhazi nwere faịlụ nwere aha nke ọ maara, a na-agbapụ ya.
- Akụkụ na-abụghị faịlụ ma ọ bụ faịlụ na-enweghị aha: naanị akụkụ dịka faịlụ nwere aha a ga-atụle maka ịtinye.

---

See also

- [Ntọala](configuration)
