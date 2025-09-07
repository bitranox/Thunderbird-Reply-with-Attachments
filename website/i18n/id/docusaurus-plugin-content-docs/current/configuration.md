---
id: configuration
title: Konfigurasi
---

# Konfigurasi

Catatan terminologi: lihat [Glosarium](glossary) untuk istilah yang digunakan secara konsisten pada UI dan dokumentasi.

## Buka opsi di Thunderbird

- Thunderbird → Tools → Add‑ons and Themes → cari “Reply with Attachments” → Preferences/Options

### Pengaturan:

#### Konfirmasi

- Alihkan “Tanyakan sebelum menambahkan lampiran”.
- Jawaban bawaan: Ya atau Tidak (fokus & bawaan keyboard).
- Papan ketik: Y/J = Ya; N/Esc = Tidak; Tab/Shift+Tab dan tombol panah untuk pindah fokus.

#### Daftar hitam (pola glob)

Berkas yang masuk daftar hitam tidak akan dilampirkan otomatis saat membalas.

- Satu pola per baris; tidak peka huruf besar/kecil; hanya mencocokkan nama berkas.
- Contoh: `*.png`, `smime.*`, `*.p7s`.
- Token glob yang didukung: `*` (karakter apa pun kecuali `/`), `?` (satu karakter), kelas seperti `[abc]`. Gunakan `\[` untuk `[` literal. Jalur (`**/`) diabaikan karena hanya nama berkas yang dicocokkan.
- Tidak didukung: negasi (`!`), ekspansi kurung (`{..}`), dan rentang kompleks. Gunakan pola sederhana.

Tips: Nilai bawaan sudah diisi saat pertama dibuka dan bisa di‑reset kapan saja.

#### Peringatan saat lampiran dikecualikan

- Alihkan “Peringatkan jika lampiran dikecualikan oleh daftar hitam” (bawaan: AKTIF).
- Saat diaktifkan, modal kecil menampilkan berkas yang dikecualikan dan pola yang cocok. Peringatan juga muncul bila tidak ada yang akan dilampirkan karena semua kandidat dikecualikan.

#### Simpan pengaturan Anda

---

### Normalisasi nama berkas (pencegahan duplikasi)

Agar konsisten lintas platform, nama berkas dinormalisasi sebelum pengecekan duplikasi:

- Unicode dinormalisasi ke NFC.
- Nama diubah ke huruf kecil.
- Titik/spasi di akhir dihapus (ramah Windows).

Hal ini membuat deteksi duplikasi lebih andal untuk nama seperti `café.pdf` vs `café.pdf` (NFD) atau `FILE.txt.` vs `file.txt`.
