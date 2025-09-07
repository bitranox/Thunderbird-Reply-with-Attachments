---
id: configuration
title: Konfigurasi
---

# Konfigurasi

Nota istilah: rujuk [Glossary](glossary) untuk istilah yang konsisten dalam UI dan dokumentasi.

## Buka Options dalam Thunderbird

- Thunderbird → Tools → Add‑ons and Themes → “Reply with Attachments” → Preferences/Options

### Tetapan:

#### Pengesahan

- Togol “Ask before adding attachments”.
- Jawapan lalai: Yes atau No (lalai fokus dan papan kekunci).
- Papan kekunci: Y/J = Yes; N/Esc = No; Tab/Shift+Tab dan kekunci anak panah untuk menukar fokus.

#### Senarai hitam (pola glob)

Fail dalam senarai hitam tidak akan dilampirkan secara automatik semasa membalas.

- Satu pola setiap baris; tidak peka huruf besar/kecil; padanan pada nama fail sahaja.
- Contoh: `*.png`, `smime.*`, `*.p7s`
- Token glob yang disokong: `*` (sebarang aksara kecuali `/`), `?` (satu aksara), kelas aksara seperti `[abc]`. Untuk memadankan `[` literal, gunakan `\[`. Laluan (`**/`) diabaikan — hanya nama fail dipadankan.
- Tidak disokong: negasi (`!`), brace expansion (`{..}`) dan julat kompleks. Kekalkan pola ringkas.

Petua: Nilai lalai telah diisi pada bukaan pertama dan boleh ditetapkan semula pada bila‑bila masa.

#### Amaran apabila lampiran dikecualikan oleh senarai hitam

- Togol “Warn if attachments are excluded by blacklist” (lalai: HIDUP).
- Apabila diaktifkan, modal kecil menyenaraikan fail yang dikecualikan dan pola yang sepadan. Amaran ini turut muncul jika tiada lampiran akan ditambah kerana semua calon dikecualikan.

#### Simpan tetapan anda

---

### Penormalan nama fail (pencegahan pendua)

Untuk tingkah laku konsisten merentas platform, nama fail dinormalisasi sebelum semakan pendua:

- Unicode dinormalisasi kepada NFC.
- Nama di‑case‑fold (huruf kecil).
- Titik/ruang di hujung dipotong (mesra Windows).

Ini memastikan pengesanan pendua boleh diramal untuk nama seperti `café.pdf` berbanding `café.pdf` (NFD) atau `FILE.txt.` berbanding `file.txt`.
