---
id: configuration
title: Konfigurasi
---

# Konfigurasi

Cathetan istilah: delengen [Glossary](glossary) kanggo istilah sing konsisten ing UI lan dokumen.

## Bukak Options ing Thunderbird

- Thunderbird → Tools → Add‑ons and Themes → “Reply with Attachments” → Preferences/Options

### Setelan:

#### Konfirmasi

- Toggle “Ask before adding attachments”.
- Jawaban gawan: Yes utawa No (default fokus lan keyboard).
- Keyboard: Y/J = Yes; N/Esc = No; Tab/Shift+Tab lan tombol panah kanggo mindhah fokus.

#### Daftar ireng (pola glob)

Berkas sing ana ing daftar ireng ora bakal dilampirake otomatis nalika mbales.

- Siji pola saben baris; ora mbédakaké huruf gedhé/cilik; mung mriksa jeneng berkas.
- Tuladha: `*.png`, `smime.*`, `*.p7s`
- Token glob sing didhukung: `*` (karakter apa wae kajaba `/`), `?` (siji karakter), kelas karakter kaya `[abc]`. Kanggo cocogaké `[` literal, gunakna `\[`. Path (`**/`) diabaikan — mung jeneng berkas sing dicocogaké.
- Ora didhukung: negasi (`!`), brace expansion (`{..}`), lan rentang kompleks. Tetepna pola prasaja.

Tips: Nilai baku wis kakekèn nalika dibukak pisanan lan bisa direset kapan wae.

#### Peringatan nalika lampiran dikesampingake amarga daftar ireng

- Toggle “Warn if attachments are excluded by blacklist” (gawan: aktif).
- Nalika aktif, modal cilik nampilake berkas sing dikesampingake lan pola sing cocog. Peringatan iki uga katon yen kabeh calon dikesampingake saéngga ora ana lampiran sing ditambah.

#### Simpen setelan panjenengan

---

### Normalisasi jeneng berkas (pencegahan duplikat)

Supaya prilaku konsisten ing kabeh platform, jeneng berkas dinormalisasi sadurunge priksa duplikat:

- Unicode dinormalisasi dadi NFC.
- Jeneng di‑case‑fold (dijupuk cilik).
- Titik/spasi ing mburi dibusak (ramah Windows).

Iki njaga deteksi duplikat tetep bisa diprediksi kanggo jeneng kaya `café.pdf` vs `café.pdf` (NFD) utawa `FILE.txt.` vs `file.txt`.
