---
id: features
title: 'Aýratynlyklar'
sidebar_label: 'Aýratynlyklar'
---

---

## Aýratynlyklar {#features}

- Jogap bereniňizde asyl e-poçtadaky faýllary awtomatiki goşýar.
- Sazlap bolýan hereket: goşundylary
  - awtomatiki goşup biler ýa-da
  - diňe tassyklamadan soň goşup biler (kiçi, elýeterli dialog). Options bölüminde
    tassyklamany açyp, deslapky jogaby (Hawa/Ýok) saýlap bilersiňiz.
- Faýl atlarynyň gara sanawy (glob nagyşlary) belli faýllaryň
  awtomatiki goşulmagynyň öňüni alýar. Mysallar: `*intern*`, `*secret*`, `*passwor*`.
  Gabat gelme uly-kiçi harp tapawudyna duýgur däl we diňe faýl adyny barlaýar; Options bölüminde
  her setire bir nagyş beriň.
- Gara sanaw duýduryşy (islege görä, deslapky ýagdaýda açyk): faýllar siziň
  gara sanawyňyz sebäpli çykarylanyňda, kiçi modal penjiräde faýly we gabat gelen nagyşlary görkezýär. Gara tema
  bilen amatly we klawiatura arkaly elýeterli (ýapmak üçin Enter/Esc).
- Reply we Reply all bilen işleýär. Forward bu goşmanyň tarapyndan üýtgedilmeýär.
- Özüňiz bir zat goşan bolsaňyz hem, asyllary goşýar; faýl ady boýunça gaýtalanmalardan gaça durýar.
- Tab boýunça gaýtalanma goragy, şol bir düzmek tabynda iki gezek goşulmagynyň öňüni alýar.
- Gereksiz goşundylardan gaça durmak üçin, deslapky ýagdaýda S/MIME şahadatnamalaryny taşlaýar.
- Içki (inline) suratlary goşýar (adaty ýagdaýda: ON). Gömülen suratlar jogap
  göwresinde asyl içki düzülşi saklap, gönüden-göni base64 data URIs hökmünde dikeldilýär. Inline suratlary
  doly geçmek üçin Options bölüminde öçüriň.

---

## Nädip işleýär {#how-it-works}

- Jogap berilende, goşmaça asyl goşundylary sanap görkezýär.
- Faýl goşundylaryndan S/MIME gol goýmalaryny süzýär; içki suratlar (inline) bedeninde täzeden dikeldilýär (öçürilmedik bolsa).
- Islege görä tassyklama soraýar (klawiatura üçin amatly).
- Faýl ady boýunça gaýtalanmalardan gaça durup, laýyk faýllary ýazýan hatyňyza goşýar.
- Çet halatlar üçin Ulanylyş bölüminiň “Goşundylaryň näme üçin goşulman biler” bölümine serediň.

Gizlinlik belligi: Ähli gaýtadan işlemek Thunderbird içinde ýerli ýagdaýda bolýar. Goşmaça arkaplanda hiç hili ulgam haýyşlaryny etmýär.

---
