---
id: quickstart
title: 'Pandhuan Cepet'
sidebar_label: 'Pandhuan Cepet'
---

## Pandhuan Cepet

:::important Minimum Thunderbird Version
Add-on iki ndhukung Thunderbird **128 ESR utawa anyar**. Versi lawas ora didhukung.
:::

:::note No telemetry; no background network
Add-on iki **ora** ngumpulake analitik/telemetry lan ora nggawe **ora** panjalukan jaringan latar mburi. Akses jaringan mung kedadeyan nalika sampeyan ngeklik pranala eksternal (Docs, GitHub, Donasi).
:::

---

### Instal

1. Instal add-on saka Thunderbird Add‑ons.
2. Opsional: Aktifake konfirmasi (Pilihan → “Takon sadurunge nambah lampiran”).
3. Opsional: Tinggalake peringatan dhaptar ireng diaktifake (standar): “Peringatan yen lampiran dikecualikan dening dhaptar ireng”.
4. Opsional: Tambah pola dhaptar ireng (siji saben baris), contone:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Catatan: “# …” ing ndhuwur yaiku komentar ing dokumentasi iki; aja kalebu komentar ing pola sing sampeyan tempel ing Pilihan. Lebokake siji pola saben baris wae.

Saiki bales pesen nganggo lampiran — asli bakal ditambahake kanthi otomatis utawa sawise konfirmasi cepet. Yen ana file sing dikecualikan dening dhaptar ireng sampeyan, sampeyan bakal ndeleng peringatan cekak sing ndhaptar.

---

### Verifikasi {#verify}

- Bales pesen kanthi 1–2 lampiran lan konfirmasi yen asli wis ditambahake ing jendhela nulis sampeyan.
- Kanggo nyetel perilaku, deleng [Konfigurasi](configuration) (togol konfirmasi, jawaban standar, pola dhaptar ireng).

---

### Verifikasi peringatan dhaptar ireng {#verify-blacklist-warning}

- Bales pesen sing ngemot file kaya “secret.txt”.
- Kanthi “Peringatan yen lampiran dikecualikan dening dhaptar ireng” diaktifake, dialog cilik ndhaptar file sing dikecualikan lan pola sing cocog.

Yen sampeyan ora ndeleng peringatan, priksa manawa pola cocog persis karo jeneng file (mung jeneng file, ora sensitif terhadap huruf). Deleng Konfigurasi → Dhaptar Ireng.

---

### Cathetan keyboard {#keyboard-note}

- Dialog konfirmasi ndhukung Y/J kanggo Ya lan N/Esc kanggo Ora. Ing sawetara keyboard non-Latin, tombol huruf bisa uga beda; Enter konfirmasi tombol sing difokusake.

---
