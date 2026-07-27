---
id: changelog
title: 'Catatan Perubahan'
---

---

## Catatan perubahan

Untuk riwayat lengkap dan terperinci, lihat
[CHANGELOG.md di GitHub](https://github.com/bitranox/Thunderbird-Reply-with-Attachments/blob/master/CHANGELOG.md).

- 2.4.0: gambar tidak lagi dihapus hanya karena pengirim menambahkan `Content-ID` padanya; opsi "Include inline pictures" telah dihapus, karena Thunderbird sendiri sudah menyimpan gambar tersemat di badan balasan; tautan kini terbuka di peramban sistem; batas maksimum 50 lampiran / 100 MB per balasan, dengan setiap yang tidak disertakan dilaporkan.
- 2.3.2: "Include inline pictures" menyematkan gambar ke badan balasan sebagai URI data base64 (dihapus lagi setelah tinjauan add-ons.thunderbird.net; Thunderbird melakukannya sendiri); peningkatan kualitas kode dan cakupan pengujian yang diperluas.
- 2.3.1: Menjaga lampiran tetap ada setelah Thunderbird membuat halaman peristiwa latar belakang menjadi idle; menambahkan kait debug tertarget untuk pemecahan masalah.
- 2.3.0: Penyempurnaan deduplikasi lampiran, perluasan cakupan pengujian, dan penghapusan izin yang usang untuk memenuhi kebijakan AMO.
- 2.1.0: Dukungan internasionalisasi penuh untuk 100 bahasa teratas
- 2.0.0: Penulisan ulang menjadi versi berfitur lengkap (EN/DE)
- 1.0.1: beralih ke messages.listAttachments()
- 1.0.0: rilis awal

---

## Tanggal dan saluran {#dates-and-channels}

- Rilis ke ATN mungkin tertunda beberapa jam setelah pengemasan.
- Build LOCAL hanya untuk pengujian pengembang dan tidak didistribusikan melalui ATN.

---
