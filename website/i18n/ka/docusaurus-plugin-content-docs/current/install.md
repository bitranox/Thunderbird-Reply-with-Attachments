---
id: install
title: 'ინსტალაცია'
slug: /install
sidebar_label: 'დაყენება'
---

---

## დაყენება "Thunderbird Add-ons and Themes"-ის საშუალებით {#installation-in-thunderbird-recommended}

:::important მინიმალური Thunderbird-ის ვერსია
ეს დამატება მხარს უჭერს Thunderbird-ის **128 ESR ან უფრო ახალს**. ძველი ვერსიები მხარდაჭერილი არ არის.
:::

ეს არის რეკომენდებული დაყენების მეთოდი. ATN-დან (addons.thunderbird.net) დაყენებული დამატებები იღებს ავტომატურ განახლებებს. LOCAL/dev დაყენებები ავტომატურად არ ახლდება.

- მინიმალური Thunderbird-ის ვერსია: 128 ESR ან უფრო ახალი.

1. Thunderbird-ში გადადით **ხელსაწყოები > დამატებები და თემები**.
2. მოძებნეთ "reply with attachments".
3. დაამატეთ დამატება.

ან გახსენით დამატების გვერდი პირდაპირ: [Thunderbird-ის დამატებები (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## ხელით დაყენება XPI-დან {#local-installation-in-thunderbird}

### XPI ფაილის ჩამოტვირთვა {#download-the-xpi-file}

1. გადადით [Thunderbird-ის დამატების გვერდზე](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. ჩამოტვირთეთ დამატების უახლესი ვერსია XPI ფაილად (`reply_with_attachments-x.y.z-tb.xpi`).

### დაყენება Thunderbird-ში {#install-in-thunderbird-local}

1. გახსენით Thunderbird.
2. გადადით **ხელსაწყოები > დამატებები და თემები**.
3. **დამატებების მენეჯერში** დააწკაპუნეთ ზედა მარჯვენა კუთხეში არსებულ კბილანას ხატულაზე.
4. მენიუდან აირჩიეთ **Install Add-on From File…**.
5. აირჩიეთ ჩამოტვირთული ფაილი `reply_with_attachments-x.y.z-tb.xpi`.
6. მოთხოვნისას დაადასტურეთ დაყენება.

---

## დაყენება განვითარებისთვის {#installation-for-development}

### რეპოზიტორიის ჩამოტვირთვა {#download-the-repository}

1. ჩამოტვირთეთ GitHub-ის რეპოზიტორიის უახლესი ვერსია.
2. გაუშვით `make help` დამატებითი ინფორმაციისთვის.

### დაყენება Thunderbird-ში {#install-in-thunderbird-dev}

1. გახსენით Thunderbird.
2. გადადით **ხელსაწყოები > დამატებები და თემები**.
3. **დამატებების მენეჯერში** დააწკაპუნეთ ზედა მარჯვენა კუთხეში არსებულ კბილანას ხატულაზე.
4. მენიუდან აირჩიეთ **Install Add-on From File…**.
5. აირჩიეთ გენერირებული ფაილი `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. მოთხოვნისას დაადასტურეთ დაყენება.

შენიშვნა: თუ Thunderbird თქვენს სისტემაზე `.zip` არ მიიღებს, გადაარქვით მას სახელი `.xpi` და სცადეთ “Install Add‑on From File…” კვლავ.

### სად ვიპოვოთ LOCAL ZIP {#where-local-zip}

- ჯერ, შეფუთეთ დამატება: გაუშვით `make pack` რეპოზიტორიის ფესვში.
- შეფუთვის შემდეგ, იპოვეთ „LOCAL“ ZIP რეპოზიტორიის ფესვში (მაგალითად, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- ტესტირებისთვის ხელახლა შეფუთვამდე, გაზარდეთ ვერსიები ორივეში: `sources/manifest_ATN.json` და `sources/manifest_LOCAL.json`.

---

## გამორთვა, წაშლა და განახლებები {#disable-uninstall-updates}

- გამორთვა: Thunderbird → ხელსაწყოები → დამატებები და თემები → იპოვეთ დამატება → გამორთეთ გადამრთველი.
- წაშლა: იგივე ხედში → სამწერტილიანი მენიუ → Remove.
- განახლებები: ATN-დან დაყენებები ავტომატურად ახლდება, როდესაც ახალი ვერსიები დამტკიცდება. LOCAL/dev დაყენებები ავტომატურად არ ახლდება; დააყენეთ ხელახლა ახალი LOCAL აგებული ვერსია ხელით.
- პარამეტრების სრული მოცილება: იხილეთ [კონფიდენციალურობა → მონაცემების წაშლა](privacy#data-removal).

ასევე იხილეთ

- [სწრაფი დაწყება](quickstart)
