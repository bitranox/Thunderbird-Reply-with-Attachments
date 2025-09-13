---
id: quickstart
title: 'Pengenalan Pantas'
sidebar_label: 'Pengenalan Pantas'
---

## Pengenalan Pantas

:::important Minimum Thunderbird Version
Add-on ini menyokong Thunderbird **128 ESR atau lebih baru**. Versi yang lebih lama tidak disokong.
:::

:::note No telemetry; no background network
Add-on ini **tidak** mengumpul analitik/telemetri dan tidak membuat permintaan rangkaian latar belakang. Akses rangkaian hanya berlaku apabila anda mengklik pautan luar (Dokumen, GitHub, Derma).
:::

---

### Pasang

1. Pasang add-on dari Thunderbird Add-ons.
2. Pilihan: Aktifkan pengesahan (Pilihan → “Tanya sebelum menambah lampiran”).
3. Pilihan: Tinggalkan amaran senarai hitam diaktifkan (default): “Amaran jika lampiran dikecualikan oleh senarai hitam”.
4. Pilihan: Tambah pola senarai hitam (satu setiap baris), contohnya:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Nota: “# …” di atas adalah komen dalam dokumentasi ini; jangan sertakan komen dalam pola yang anda tampal ke dalam Pilihan. Masukkan satu pola setiap baris sahaja.

Sekarang balas kepada mesej dengan lampiran — asal akan ditambah secara automatik atau selepas pengesahan cepat. Jika ada fail yang dikecualikan oleh senarai hitam anda, anda akan melihat amaran pendek yang menyenaraikannya.

---

### Sahkan {#verify}

- Balas kepada mesej dengan 1–2 lampiran dan sahkan bahawa asal ditambah ke tetingkap compose anda.
- Untuk menyesuaikan tingkah laku, lihat [Konfigurasi](configuration) (toggel pengesahan, jawapan default, pola senarai hitam).

---

### Sahkan amaran senarai hitam {#verify-blacklist-warning}

- Balas kepada mesej yang mengandungi fail seperti “secret.txt”.
- Dengan “Amaran jika lampiran dikecualikan oleh senarai hitam” diaktifkan, dialog kecil menyenaraikan fail yang dikecualikan dan pola yang sepadan.

Jika anda tidak melihat amaran, pastikan pola tersebut sepadan dengan nama fail tepat (hanya nama fail, tidak sensitif kepada kes). Lihat Konfigurasi → Senarai Hitam.

---

### Nota papan kekunci {#keyboard-note}

- Dialog pengesahan menyokong Y/J untuk Ya dan N/Esc untuk Tidak. Pada beberapa papan kekunci bukan Latin, huruf kunci mungkin berbeza; Enter mengesahkan butang yang difokuskan.
