---
id: usage
title: 'Pamakéan'
sidebar_label: 'Pamakéan'
---

---

## Pamakéan {#usage}

- Bales sarta add‑on nambahkeun nu aslina sacara otomatis — atawa nanya heula, lamun diaktipkeun dina Opsi.
- Duplikat dipiceun dumasar kana ngaran payil; bagian S/MIME sok diliwatan. Gambar inline dipulihkeun deui dina awak balesan sacara standar (pareuman via "Include inline pictures" dina Opsi).
- Lampiran anu diasupkeun kana daptar hideung ogé diliwatan (pola glob teu peka hurup gede‑leutik nu nyocogkeun kana ngaran payil, lain jalur). Tingali [Konfigurasi](configuration#blacklist-glob-patterns).

---

### Naon anu kajadian nalika ngabales {#what-happens}

- Ndeteksi balesan → daptar lampiran aslina → saring S/MIME + inline → konfirmasi (opsional) → nambahkeun payil nu layak (ngaliwatkeun duplikat) → mulangkeun gambar inline dina awak.

Léngkah ketat vs. longgar: Add‑on mimiti ngaluarkeun bagian S/MIME jeung inline tina lampiran payil. Lamun euweuh anu layak, éta ngajalankeun léngkah longgar anu tetep ngaluarkeun S/MIME/inline tapi leuwih toleran kana sababaraha kasus (tempo Rincian Kode). Gambar inline teu kungsi ditambahkeun minangka lampiran payil; sabalikna, lamun "Include inline pictures" diaktipkeun (bawaan), éta dipasangan langsung dina awak balesan minangka data URI base64.

| Jinis bagian                                                 |                          Léngkah ketat |                        Léngkah longgar |
| ------------------------------------------------------------ | -------------------------------------: | -------------------------------------: |
| Payil tanda‑tangan S/MIME `smime.p7s`                        |                           Dikaluarkeun |                           Dikaluarkeun |
| Tipe MIME S/MIME (`application/pkcs7-*`)                     |                           Dikaluarkeun |                           Dikaluarkeun |
| Gambar inline nu dirujuk ku Content‑ID (`image/*`)           | Dikaluarkeun (dipulihkeun dina awak\*) | Dikaluarkeun (dipulihkeun dina awak\*) |
| Surélék dilampirkeun (`message/rfc822`) kalayan ngaran payil |                       Teu ditambahkeun |                      Bisa ditambahkeun |
| Lampiran payil biasa kalayan ngaran payil                    |                      Bisa ditambahkeun |                      Bisa ditambahkeun |

\* Lamun "Include inline pictures" diaktipkeun (bawaan: HURUNG), gambar inline dipasangan dina awak balesan salaku data URI base64 tibatan ditambahkeun minangka lampiran payil. Tempo [Konfigurasi](configuration#include-inline-pictures).

Conto: Sababaraha lampiran bisa waé kakurangan sababaraha header tapi tetep mangrupa payil biasa (henteu inline/S/MIME). Lamun léngkah ketat teu manggihan nanaon, léngkah longgar bisa narima éta sarta ngalampirkeunana.

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
| --------------- | ---------------------------------------- |
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

- Gambar inline teu ditambahkeun minangka lampiran payil. Lamun "Include inline pictures" HURUNG (bawaan), éta dipasangan dina awak balesan salaku data URI sabalikna. Lamun setélanana PAREUM, gambar inline dileungitkeun sakabéhna. Tempo [Konfigurasi](configuration#include-inline-pictures).
- Bagian tanda‑tangan S/MIME dikaluarkeun sacara rancangan: ngaran payil saperti `smime.p7s` jeung tipe MIME saperti `application/pkcs7-signature` atawa `application/pkcs7-mime` diliwatan.
- Pola daptar hideung bisa nyaring calon: tingali [Konfigurasi](configuration#blacklist-glob-patterns); cocogna teu peka kana gedé‑leutikna hurup sarta ngan dumasar kana ngaran payil.
- Ngaran payil duplikat teu ditambahkeun deui: lamun dina nyusun geus aya payil kalayan ngaran anu dinormalkeun sarua, éta bakal diliwatan.
- Bagian anu lain payil atawa teu boga ngaran payil: ngan bagian kawas payil anu miboga ngaran anu bisa dianggo nu bakal dipertimbangkeun pikeun ditambahkeun.

---

Tingali ogé

- [Konfigurasi](configuration)
