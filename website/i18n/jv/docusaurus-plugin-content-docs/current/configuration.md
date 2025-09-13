---
id: configuration
title: 'Konfigurasi'
---

## Konfigurasi

Terminologi cathetan: delengen [Glosarium](glossary) kanggo istilah sing konsisten sing digunakake ing UI lan dokumen.

---

## Mbukak pilihan ing Thunderbird {#open-options-in-thunderbird}

- Thunderbird → Alat → Tambahan lan Tema → golek “Balas karo Lampiran” → Preferensi/Opsi

---

### Setelan {#settings}

#### Konfirmasi {#confirmation}

- Ganti “Takon sadurunge nambah lampiran”
- Jawaban standar: Ya utawa Ora (fokus & standar keyboard)
- Keyboard: Y/J = Ya; N/Esc = Ora; Tab/Shift+Tab lan kunci panah ngubengi fokus
  - Delengen rincian keyboard ing [Penggunaan](usage#keyboard-shortcuts).

---

#### Daftar ireng (pola glob) {#blacklist-glob-patterns}

Berkas sing di blacklist ora bakal ditambahake kanthi otomatis nalika balesan. Delengen uga [Glosarium](glossary) kanggo “Daftar Ireng (Daftar Eksekusi)”.

- Siji pola saben baris; ora sensitif kasus; cocok mung nama berkas
- Conto: `*intern*`, `*secret*`, `*passwor*`
- Token glob sing didhukung: `*` (saben karakter kecuali `/`), `?` (siji karakter), kelas karakter kaya `[abc]`. Gunakake `\[` kanggo nyocok karo `[` literal. Jalur (`**/`) diabaikan amarga mung nama berkas di cocogake.
- Ora didhukung: negasi (`!`), ekspansi kurung (`{..}`), lan rentang kompleks. Jaga pola tetep sederhana.
- Komentar ora didhukung ing pola. Aja kalebu `#` utawa komentar inline; mung lebokake teks pola saben baris.

---

##### Buku masak pola {#pattern-cookbook}

- Cocogake PDF apa wae: `*.pdf`
- Cocogake berkas sing diwiwiti nganggo “scan”: `scan*`
- Kelas karakter: `report[0-9].txt`
- Ngindhari `[` literal: `\[` (mangfaate nalika nyocokake kurung minangka karakter)

---

##### Cathetan {#blacklist-notes}

- Urutan ora penting; cocogake kaping pisan/apa wae nolak berkas kasebut.
- Cocogake mung kanggo nama berkas (jalur/folder diabaikan).
- “Reset menyang standar” mbalekake pola sing disaranake lan toggle peringatan daftar ireng.
- Napa conto `*passwor*`? Iki cocogake kulawarga “password” lan “Passwort”.
- Prioritas: yen pola apa wae cocog karo nama berkas, berkas kasebut ditolak (pola pisanan/apa wae — urutan ora ngganti hasil).
- Tips — coba pola sampeyan: tambahake pola sementara, bales pesen sing ngemot berkas kanthi nama sing cocog, lan konfirmasi manawa iku ditolak ing daftar peringatan.

##### Coba cepet (uji coba aman) {#blacklist-try-it}

1. Mbukak Pilihan → Daftar Ireng.
2. Tambahake pola sementara kaya `*.tmp` lan klik Simpan.
3. Bales email uji coba sing wis ana berkas sing diakhiri nganggo `.tmp` — berkas kasebut kudu muncul ing daftar peringatan lan ora dilampirake.
4. Copot pola sementara nalika rampung, utawa klik “Reset menyang standar”.

---

#### Peringatan nalika lampiran dipateni {#warning-on-excluded-attachments}

- Ganti “Peringat yen lampiran dipateni dening daftar ireng” (standar: ON).
- Nalika aktif, modal cilik nampilake berkas sing dipateni lan pola sing cocog. Peringatan uga muncul nalika ora ana sing bakal dilampirake amarga kabeh calon dipateni.

---

#### Simpen setelan sampeyan {#save-your-settings}

Setelan disimpen kanthi mencet tombol Simpan. Sampeyan bisa mbalekake lapangan individu kanthi manual utawa reset standar sesuai kebutuhan.

Yen setelan sing disimpen katon ora diterapkan kanthi bener, mulai ulang Thunderbird lan coba maneh. (Thunderbird bisa nyimpen status antarane sesi; miwiti ulang mesthekake setelan anyar dimuat.)

Tips: Kanggo konfirmasi setelan sampeyan ditrapake, bales pesen apa wae kanthi lampiran dan periksa konfirmasi utawa peringatan daftar ireng.

---

#### Visibilitas Donasi (90-hari tunda) {#donation-visibility}

Tambahan iki nyakup fitur kenyamanan kanggo ndhelikake permintaan donasi kanggo sawetara wektu sawise sampeyan wis nyumbang.

Ngendi sampeyan bisa nemokake

- Pilihan → bagian Dukungan: sampeyan bakal ndeleng tombol “Aku nyumbang” lan area petunjuk cilik.
- Dialog Konfirmasi-Kirim uga nuduhake tombol Donasi; iki otomatis didhelikake nalika tunda aktif.

Carane kerjane

- Mencet “Aku nyumbang” ndhelikake tombol donasi lan permintaan sing gegandhengan nganti 90 dina.
- Petunjuk status nuduhake “Didhelikake nganti YYYY-MM-DD” (ing tanggal lokal sampeyan). Ana uga tombol “Tampilake Donasi maneh” kanggo ngembalikan visibilitas kanthi cepet.
- Sawise 90 dina, tombol Donasi bakal dadi terlihat kanthi otomatis maneh.

Privasi & panyimpanan

- Tambahan iki nyimpen siji timestamp ing panyimpenan lokal Thunderbird kanggo ngelingi periode tunda. Kunci: `donateHideUntil` (epoch milliseconds).
- Setelan iki lokal kanggo profil Thunderbird sampeyan (ora disinkronisasi awan). Ora ana permintaan jaringan sing digawe dening fitur iki.

Nglampahi masalah

- Yen Donasi isih muncul sawise mencet “Aku nyumbang”, enteni sakedhik utawa mbukak maneh kaca Pilihan; UI bakal dianyari sakdurunge setelan disimpen.
- Kanggo ngreset manual, klik “Tampilake Donasi maneh”. Sampeyan uga bisa nunggu nganti tanggal sing tertera ing petunjuk/lichnya liwat.

Fitur iki terpisah kanggo kenyamanan; iki ora pernah ngeblok fungsionalitas tambahan lan ora ngumpulake data pribadi.

---

### Normalisasi nama berkas (pencegahan duplikat) {#filename-normalization-duplicates-prevention}

Kanggo tumindak konsisten ing platform, nama berkas dinormalisasi sadurunge pengecekan duplikat:

- Unicode dinormalisasi menyang NFC.
- Nama dipotong kasus (dijadikan huruf kecil).
- Titik/spasi ing mburi dipangkas (ramah Windows).

Iki njaga deteksi duplikat sing bisa ditebak kanggo nama kaya `café.pdf` vs `café.pdf` (NFD) utawa `FILE.txt.` vs `file.txt`.

---

## Perilaku konfirmasi {#confirmation-behavior}

- “Jawaban standar” nyetel tombol sing fokus di dialog konfirmasi (migunani kanggo pangguna keyboard).
- Bisa digunakake kanggo “Bales” lan “Bales kabeh”. “Terusake” ora dimodifikasi dening tambahan iki.

---

## Tingkat lanjut: deteksi duplikat {#advanced-duplicate-detection}

Pencegahan duplikat diimplementasikake saben tab nulis lan miturut nama berkas. Delengen [Penggunaan](usage#behavior-details) kanggo penjelasan rinci.

---

Delengen uga

- [Izin](permissions)
- [Privasi](privacy)
