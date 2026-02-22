---
id: quickstart
title: 'Mula Cepat'
sidebar_label: 'Mula Cepat'
---

---

## Panduan Pantas

:::important Versi Minimum Thunderbird
Pengaya ini menyokong Thunderbird **128 ESR atau lebih baharu**. Versi terdahulu tidak disokong.
:::

:::note Tiada telemetri; tiada rangkaian latar belakang
Pengaya ini **tidak** mengumpul analitik/telemetri dan **tidak** membuat permintaan rangkaian latar belakang. Akses rangkaian hanya berlaku apabila anda mengklik pautan luaran (Dokumentasi, GitHub, Derma).
:::

---

### Pasang

1. Pasang pengaya daripada Pengaya Thunderbird.
2. Pilihan: Dayakan pengesahan (Pilihan → “Tanya sebelum menambah lampiran”).
3. Pilihan: Biarkan amaran senarai hitam didayakan (lalai): “Amaran jika lampiran dikecualikan oleh senarai hitam”.
4. Pilihan: Tambah corak senarai hitam (satu setiap baris), cth:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Nota: “# …” di atas ialah komen dalam dokumentasi ini; jangan sertakan komen dalam corak yang anda tampal ke dalam Pilihan. Masukkan satu corak bagi setiap baris sahaja.

Sekarang balas mesej yang mempunyai lampiran — yang asal akan ditambah secara automatik atau selepas pengesahan ringkas. Jika ada fail yang dikecualikan oleh senarai hitam anda, anda akan melihat amaran ringkas yang menyenaraikannya.

---

### Sahkan {#verify}

- Balas mesej dengan 1–2 lampiran dan sahkan bahawa lampiran asal ditambah pada tetingkap gubahan anda.
- Untuk melaras tingkah laku, lihat [Konfigurasi](configuration) (togol pengesahan, jawapan lalai, corak senarai hitam).

---

### Sahkan amaran senarai hitam {#verify-blacklist-warning}

- Balas mesej yang mengandungi fail seperti “secret.txt”.
- Dengan “Amaran jika lampiran dikecualikan oleh senarai hitam” didayakan, dialog kecil akan menyenaraikan fail yang dikecualikan dan corak yang sepadan.

Jika anda tidak melihat amaran, pastikan corak sepadan dengan nama fail dengan tepat (nama fail sahaja, tidak peka huruf besar/kecil). Lihat Konfigurasi → Senarai hitam.

---

### Nota papan kekunci {#keyboard-note}

- Dialog pengesahan menyokong Y/J untuk Ya dan N/Esc untuk Tidak. Pada sesetengah papan kekunci bukan Latin, kekunci huruf mungkin berbeza; Enter mengesahkan butang yang difokuskan.

---
