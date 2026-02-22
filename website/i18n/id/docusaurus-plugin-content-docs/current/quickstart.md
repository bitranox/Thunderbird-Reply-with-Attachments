---
id: quickstart
title: 'Mulai Cepat'
sidebar_label: 'Mulai Cepat'
---

---

## Mulai Cepat

:::important Versi Minimum Thunderbird
Add-on ini mendukung Thunderbird **128 ESR atau yang lebih baru**. Versi yang lebih lama tidak didukung.
:::

:::note Tanpa telemetri; tanpa jaringan latar belakang
Add-on ini **tidak** mengumpulkan analitik/telemetri dan **tidak** membuat permintaan jaringan latar belakang. Akses jaringan hanya terjadi ketika Anda mengeklik tautan eksternal (Dokumentasi, GitHub, Donasi).
:::

---

### Instal

1. Instal add-on dari Thunderbird Add-ons.
2. Opsional: Aktifkan konfirmasi (Opsi → “Tanyakan sebelum menambahkan lampiran”).
3. Opsional: Biarkan peringatan daftar blokir tetap diaktifkan (bawaan): “Peringatkan jika lampiran dikecualikan oleh daftar blokir”.
4. Opsional: Tambahkan pola daftar blokir (satu per baris), misalnya:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Catatan: “# …” di atas adalah komentar dalam dokumentasi ini; jangan sertakan komentar dalam pola yang Anda tempelkan ke Opsi. Masukkan satu pola per baris saja.

Sekarang balas sebuah pesan dengan lampiran — yang asli akan ditambahkan secara otomatis atau setelah konfirmasi cepat. Jika ada berkas yang dikecualikan oleh daftar blokir Anda, Anda akan melihat peringatan singkat yang mencantumkannya.

---

### Verifikasi {#verify}

- Balas sebuah pesan dengan 1–2 lampiran dan pastikan lampiran aslinya ditambahkan ke jendela penulisan Anda.
- Untuk menyesuaikan perilaku, lihat [Konfigurasi](configuration) (pengalih konfirmasi, jawaban bawaan, pola daftar blokir).

---

### Verifikasi peringatan daftar blokir {#verify-blacklist-warning}

- Balas sebuah pesan yang berisi berkas seperti “secret.txt”.
- Dengan “Peringatkan jika lampiran dikecualikan oleh daftar blokir” diaktifkan, sebuah dialog kecil akan menampilkan daftar berkas yang dikecualikan dan pola yang cocok.

Jika Anda tidak melihat peringatan, pastikan polanya cocok dengan nama berkas secara tepat (hanya nama berkas, tidak peka huruf besar/kecil). Lihat Konfigurasi → Daftar blokir.

---

### Catatan papan ketik {#keyboard-note}

- Dialog konfirmasi mendukung Y/J untuk Ya dan N/Esc untuk Tidak. Pada beberapa keyboard non‑Latin, tombol huruf dapat bervariasi; Enter mengonfirmasi tombol yang difokuskan.

---
