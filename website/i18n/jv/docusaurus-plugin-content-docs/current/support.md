---
id: support
title: 'Dhukungan'
sidebar_label: 'Dhukungan'
---

## FAQ {#faq}

### Lampiran ora ditambahake — kenapa?

- Gambar inline lan bagian S/MIME sacara sengaja dikecualikan.
- Filename ganda dilewati yen komposisi wis duwe file sing padha.
- Pola blacklist bisa nyaring kandidat; deleng [Konfigurasi](configuration#blacklist-glob-patterns).

### Apa aku bisa konfirmasi sadurunge nambahake lampiran?

Ya. Aktifake "Takon sadurunge nambahake lampiran" ing [Konfigurasi → Konfirmasi](configuration#confirmation). Keyboard: Y/J = Ya, N/Esc = Ora.

### Apa add-on ngirim data utawa nglacak panggunaan?

Ora. Deleng [Privasi](privacy) — ora ana telemetry lan ora ana permintaan jaringan latar mburi.

### Terusake ora nambahake lampiran — apa iki kaya sing diarepake?

Ya. Mung Reply lan Reply all sing dimodifikasi dening add-on iki; Terusake ora diowahi. Deleng [Keterbatasan](usage#limitations).

### Ngendi Snooze Donasi?

Pilihan → Bagian Dhukungan. Deleng [Visibilitas Donasi](configuration#donation-visibility).

---

## Dhukungan

Butuh bantuan utawa pengin laporan bug?

---

### Bukak masalah ing GitHub:

- Repository: `bitranox/Thunderbird-Reply-with-Attachments`
- Masalah: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Kalebu versi Thunderbird (contone, 128 ESR), OS, lan langkah-langkah kanggo ngasilake
- Lampirake log relevan saka Konsol Kesalahan Thunderbird (Alat → Alat Pangembang → Konsol Kesalahan)

- Situs add-on (ATN): Sampeyan uga bisa menehi umpan balik liwat [halaman add-on](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Tips

- Priksa manawa sampeyan nggunakake versi Thunderbird sing didhukung (128 ESR utawa luwih anyar).
- Priksa dokumen Konfigurasi lan Penggunaan kanggo pitakonan setup umum.
- Kanggo pangembangan/testing, deleng pandhuan Pangembangan.
- Yen setelan sing disimpen katon ora ditrapake kanthi bener, restart Thunderbird lan coba maneh. (Thunderbird bisa nyimpen status antar sesi; restart mesthekake setelan anyar dimuat.)
- Minimal repro: coba karo email tes cilik sing ngemot siji utawa loro lampiran file sederhana.
- Bandingake perilaku karo konfirmasi ON vs. OFF kanggo nyuda manawa alur dialog terlibat.

---

### Apa sing kudu dilebokake ing laporan

- Versi Thunderbird lan OS
- Langkah-langkah eksak kanggo ngasilake (apa sing sampeyan lakoni, apa sing sampeyan diarepake, apa sing kedadeyan)
- Apa konfirmasi diaktifake lan setelan jawaban default sampeyan
- Conto pola blacklist sampeyan (yen relevan)
- Log Konsol Kesalahan nalika ngasilake (Alat → Alat Pangembang → Konsol Kesalahan)
- Aktifake logging debug (opsional):
  - Mlaku ing Konsol Kesalahan Thunderbird: `messenger.storage.local.set({ debug: true })`
  - Ngulang masalah kasebut lan salin baris log `[RWA]` sing relevan

---

### Template masalah (salin/tempel) {#issue-template}

- Versi Thunderbird lan OS:
- Langkah-langkah kanggo ngasilake:
- Konfirmasi diaktifake? Jawaban default:
- Conto pola blacklist:
- Log Konsol Kesalahan (Alat → Alat Pangembang → Konsol Kesalahan):
- Apa ana sing relevan liyane:

---

### Donasi

Yen sampeyan pengin ndhukung proyek iki, please consider a small contribution on the [Donate](donation) page. Thank you!

---
