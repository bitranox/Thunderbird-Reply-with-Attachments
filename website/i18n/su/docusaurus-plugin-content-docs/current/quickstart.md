---
id: quickstart
title: 'Mimitian Gancang'
sidebar_label: 'Mimitian Gancang'
---

---

## Pituduh Gancang

:::important Vérsi Thunderbird Minimum
Add‑on ieu ngadukung Thunderbird **128 ESR atawa nu leuwih anyar**. Vérsi nu leuwih heubeul teu didukung.
:::

:::note Tanpa télémetri; tanpa jaringan latar tukang
Add‑on ieu henteu ngumpulkeun analitik/télémetri sarta henteu nyieun paménta jaringan di latar tukang. Aksés jaringan ngan kajadian nalika anjeun ngaklik tumbu luar (Dokumén, GitHub, Sumbangan).
:::

---

### Pasang

1. Pasang add‑on tina Thunderbird Add‑ons.
2. Pilihan: Hurungkeun konfirmasi (Options → “Naros saméméh nambahkeun lampiran”).
3. Pilihan: Tinggalkeun pangingetan blacklist dina kaayaan hurung (bawaan): “Ngélingan lamun lampiran dikecualikeun ku blacklist”.
4. Pilihan: Tambahkeun pola blacklist (hiji per baris), contona:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Catetan: “# …” di luhur téh koméntar dina dokuméntasi ieu; ulah ngalebetkeun koméntar dina pola anu anjeun témpélkeun kana Options. Lebetkeun ngan hiji pola per baris waé.

Ayeuna bales pesen nu boga lampiran — nu aslina bakal ditambahkeun otomatis atawa sanggeus konfirmasi gancang. Lamun aya payil anu dikecualikeun ku blacklist anjeun, anjeun bakal ningali pangingetan pondok nu ngadaptarkeun éta payil.

---

### Pariksa {#verify}

- Bales kana pesen jeung 1–2 lampiran sarta pastikeun nu aslina ditambahkeun kana jandéla nyusun anjeun.
- Pikeun nyaluyukeun paripolahna, tingali [Konfigurasi](configuration) (togél konfirmasi, jawaban bawaan, pola blacklist).

---

### Pariksa pangingetan blacklist {#verify-blacklist-warning}

- Bales ka pesen anu ngandung payil saperti “secret.txt”.
- Kalayan “Ngélingan lamun lampiran dikecualikeun ku blacklist” dihurungkeun, dialog leutik bakal mintonkeun daptar payil anu dikecualikeun jeung polana nu nyocogkeun.

Lamun anjeun teu ningali pangingetan, pastikeun polana luyu pisan jeung ngaran payilna (ngaran payil wungkul, teu sénsitip kana hurup gedé/leutik). Tingali Konfigurasi → Blacklist.

---

### Catetan papan ketik {#keyboard-note}

- Dialog konfirmasi ngarojong Y/J pikeun Enya jeung N/Esc pikeun Henteu. Dina sababaraha papan ketik non‑Latin, tombol hurupna bisa rupa‑rupa; Enter ngonfirmasi tombol anu keur difokuskeun.

---
