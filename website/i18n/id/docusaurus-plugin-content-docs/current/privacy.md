---
id: privacy
title: 'Privasi'
sidebar_label: 'Privasi'
---

## Privasi

:::note Tidak ada telemetry; tidak ada jaringan latar belakang
Add-on ini **tidak** mengumpulkan analitik/telemetry dan **tidak** membuat permintaan jaringan latar belakang. Akses jaringan hanya terjadi ketika Anda mengklik tautan eksternal (Docs, GitHub, Donate).
:::

Reply with Attachments tidak mengumpulkan analitik atau telemetry dan tidak mengirim data Anda ke mana pun.

Apa yang dilakukan add-on:

- Membaca metadata lampiran dan file dari pesan asli secara lokal (API Thunderbird) untuk dilampirkan pada balasan Anda.
- Menyimpan opsi Anda (daftar hitam, konfirmasi, jawaban default) dalam penyimpanan lokal Thunderbird.

Apa yang tidak dilakukan add-on:

- Tanpa pelacakan, analitik, pelaporan kecelakaan, atau pencatatan jarak jauh.
- Tidak ada permintaan jaringan latar belakang, kecuali ketika Anda secara eksplisit membuka tautan eksternal (Docs, GitHub, Donate).

Izin didokumentasikan di halaman [Permissions](permissions).

---

## Kebijakan Keamanan Konten (CSP) {#content-security-policy-csp}

Opsi dan halaman popup menghindari skrip inline. Semua JavaScript dimuat dari file yang disertakan dengan add-on untuk mematuhi CSP ketat di Thunderbird. Jika Anda menyisipkan potongan kode dalam dokumen, itu hanya contoh dan tidak dieksekusi oleh add-on.

---

## Penyimpanan data {#data-storage}

- Preferensi pengguna (daftar hitam, saklar konfirmasi, jawaban default) disimpan di `storage.local` Thunderbird untuk add-on ini.
- Tidak ada sinkronisasi cloud yang dilakukan oleh add-on.

---

## Jaringan {#network}

- Add-on ini tidak melakukan aktivitas jaringan latar belakang.
- Akses jaringan hanya terjadi ketika Anda mengklik tautan (Docs, GitHub, Donate) atau ketika Thunderbird sendiri melakukan operasi normal yang tidak terkait dengan add-on ini.

---

## Penghapusan data {#data-removal}

- Menghapus add-on akan menghapus kodenya.
- Pengaturan hanya disimpan di `storage.local` Thunderbird dan dihapus saat diuninstall; tidak ada penyimpanan eksternal yang digunakan.
- Mengatur ulang pengaturan tanpa menguninstall:
  - Halaman Opsi: gunakan “Reset to defaults” untuk daftar hitam dan peringatan daftar hitam.
  - Lanjutan: di Thunderbird → Alat → Alat Pengembang → Debug Add-ons, buka penyimpanan ekstensi dan hapus kunci jika perlu.

---
