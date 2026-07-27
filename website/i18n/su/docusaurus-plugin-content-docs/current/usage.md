---
id: usage
title: 'Pamakéan'
sidebar_label: 'Pamakéan'
---

---

## Pamakéan {#usage}

- Bales sarta add‑on nambahkeun nu aslina sacara otomatis — atawa nanya heula, lamun diaktipkeun dina Opsi.
- Anu duplikat dihapus dumasar kana ngaran file; bagian S/MIME salawasna dilewat. Gambar anu diselapkeun dina pesen asli tetep aya dina awak balesan, dimana Thunderbird nempatkeunana, sarta henteu dikopi jadi file.
- Lampiran anu diasupkeun kana daptar hideung ogé diliwatan (pola glob teu peka hurup gede‑leutik nu nyocogkeun kana ngaran payil, lain jalur). Tingali [Konfigurasi](configuration#blacklist-glob-patterns).

---

### Naon anu kajadian nalika ngabales {#what-happens}

- Deteksi balesan → daptarkeun lampiran aslina → liwatan S/MIME jeung gambar anu ditempelkeun → konfirmasi opsional → tambahkeun file nu layak (ngaliwatan nu duplikat).

| Jenis bagian                                                     | Dikopi kana balesan    |
|------------------------------------------------------------------|-----------------------:|
| File tanda tangan S/MIME `smime.p7s`                             | Henteu                 |
| Jenis MIME S/MIME (`application/pkcs7-*`)                        | Henteu                 |
| Gambar anu diselapkeun ku awak pesen ngaliwatan `cid:`           | Henteu (aya dina awak) |
| Gambar anu ditandaan `Content-Disposition: inline`               | Henteu (aya dina awak) |
| Gambar kalayan `Content-ID` anu teu kungsi dirujuk ku awak pesen | Enya                   |
| Email anu dilampirkeun (`message/rfc822`) kalayan ngaran file    | Enya                   |
| Lampiran file biasa kalayan ngaran file                          | Enya                   |

Hiji gambar dianggap diselapkeun ngan lamun pesen asli leres-leres ngarujuk kana eta,
atawa lamun nu ngirim sacara eksplisit nandaan `Content-Disposition: inline`. Ngan
header `Content-ID` teu cukup: sababaraha klien email masang eta dina unggal bagian
gambar, kaasup lampiran anu saenyana, anu tetep kudu dikopi.

---

### Rujukan silang {#cross-reference}

- Neruskeun (Forward) teu dirobih ku rarancangna (tempo Watesan di handap).
- Pikeun alesan kunaon lampiran bisa jadi teu ditambahkeun, tingali “Naha lampiran bisa jadi teu ditambahkeun”.

---

## Rincian Paripolah {#behavior-details}

- **Nyegah duplikat:** Add‑on nandaan tab nyusun (compose) geus diprosés ngagunakeun nilai sési per‑tab jeung pangjaga dina mémori. Moal nambahkeun nu aslina dua kali.
- Nutup lajeng muka deui jandéla nyusun dianggap salaku tab anyar (nyaéta, usaha anyar diidinan).
- **Ngahargaan lampiran anu geus aya:** Lamun dina nyusun geus aya sababaraha lampiran, nu aslina tetep ditambahkeun sakali wungkul, bari ngalangkungan ngaran payil anu geus aya.
- **Pangecualian:** Artefak S/MIME jeung gambar inline dikaluarkeun tina lampiran payil. Lamun teu aya anu layak dina léngkah kahiji, fallback longgar bakal mariksa deui bagian non‑S/MIME. Gambar inline diurus misah: dipulihkeun dina awak balesan salaku data URI (lamun diaktipkeun).
  - **Ngaran payil:** `smime.p7s`
  - **Tipe MIME:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Gambar inline:** sakabéh bagian `image/*` nu dirujuk ku Content‑ID — dikaluarkeun tina lampiran payil tapi dipasangan dina awak balesan nalika "Include inline pictures" HURUNG
  - **Surélék anu dilampirkeun (`message/rfc822`):** diperlakukeun salaku lampiran biasa lamun miboga ngaran payil; bisa ditambahkeun (gumantung kana pamariksaan duplikat jeung daptar hideung).
- **Peringatan daptar hideung (lamun diaktipkeun):** Lamun calon dikaluarkeun ku daptar hideung anjeun,
  add‑on bakal némbongkeun modal leutik anu daptar payil nu kapangaruhan jeung
  pola anu nyocogkeun. Peringatan ieu ogé mucunghul dina kasus teu aya lampiran anu bakal
  ditambahkeun lantaran sagalana dikaluarkeun.

---

## Pintasan kibor {#keyboard-shortcuts}

- Dialog konfirmasi: Y/J = Enya, N/Esc = Henteu; Tab/Shift+Tab jeung konci Panah ngider fokus.
  - “Waleran baku” dina [Konfigurasi](configuration#confirmation) netepkeun tombol anu awalna difokuskeun.
  - Enter micu tombol nu keur difokuskeun. Tab/Shift+Tab jeung panah mindahkeun fokus pikeun akséssibilitas.

### Pituduh ringkes kibor {#keyboard-cheat-sheet}

| Konci           | Aksi                                     |
|-----------------|------------------------------------------|
| Y / J           | Konfirmasi Enya                          |
| N / Esc         | Konfirmasi Henteu                        |
| Enter           | Ngaktipkeun tombol nu difokuskeun        |
| Tab / Shift+Tab | Mindahkeun fokus maju/mundur             |
| Konci panah     | Mindahkeun fokus antara tombol           |
| Waleran baku    | Netepkeun fokus awal (Enya atawa Henteu) |

---

## Watesan {#limitations}

- Forward teu dirobih ku ieu add‑on (Reply jeung Reply all didukung).
- Lampiran anu pohara gede bisa kabeungkeut ku wates Thunderbird atawa panyadia.
  - Add‑on ieu teu mecah atawa mampatkeun payil; ngandelkeun panangtayungan lampiran normal Thunderbird.
- Pesen énkripsi: bagian S/MIME sengaja dikaluarkeun.

---

## Naha lampiran bisa jadi teu ditambahkeun {#why-attachments-might-not-be-added}

- Gambar anu ditempelkeun ku pesen aslina henteu dikopi salaku file. Éta geus aya dina awak balesan, di tempat Thunderbird nempatkeunana. Tempo [Configuration](configuration#include-inline-pictures).
- Bagian tanda‑tangan S/MIME dikaluarkeun sacara rancangan: ngaran payil saperti `smime.p7s` jeung tipe MIME saperti `application/pkcs7-signature` atawa `application/pkcs7-mime` diliwatan.
- Pola daptar hideung bisa nyaring calon: tingali [Konfigurasi](configuration#blacklist-glob-patterns); cocogna teu peka kana gedé‑leutikna hurup sarta ngan dumasar kana ngaran payil.
- Ngaran payil duplikat teu ditambahkeun deui: lamun dina nyusun geus aya payil kalayan ngaran anu dinormalkeun sarua, éta bakal diliwatan.
- Bagian anu lain payil atawa teu boga ngaran payil: ngan bagian kawas payil anu miboga ngaran anu bisa dianggo nu bakal dipertimbangkeun pikeun ditambahkeun.

---

Tingali ogé

- [Konfigurasi](configuration)
