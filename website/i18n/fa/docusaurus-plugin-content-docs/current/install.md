---
id: install
title: 'نصب'
slug: /install
sidebar_label: 'نصب'
---

---

## نصب از طریق «افزونه‌ها و تم‌های Thunderbird» {#installation-in-thunderbird-recommended}

:::important حداقل نسخهٔ Thunderbird
این افزونه از Thunderbird **128 ESR یا جدیدتر** پشتیبانی می‌کند. نسخه‌های قدیمی پشتیبانی نمی‌شوند.
:::

این روش نصب پیشنهادی است. افزونه‌هایی که از ATN (addons.thunderbird.net) نصب می‌شوند، به‌روزرسانی خودکار دریافت می‌کنند. نصب‌های LOCAL/dev به‌طور خودکار به‌روزرسانی نمی‌شوند.

- حداقل نسخهٔ Thunderbird: 128 ESR یا جدیدتر.

1. در Thunderbird به **Tools > Add-ons and Themes** بروید.
2. برای "reply with attachments" جستجو کنید.
3. افزونه را اضافه کنید.

یا صفحهٔ افزونه را مستقیماً باز کنید: [افزونه‌های Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## نصب دستی از XPI {#local-installation-in-thunderbird}

### دانلود فایل XPI {#download-the-xpi-file}

1. به [صفحهٔ افزونهٔ Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) بروید.
2. آخرین نسخهٔ افزونه را به‌صورت فایل XPI (`reply_with_attachments-x.y.z-tb.xpi`) دانلود کنید.

### نصب در Thunderbird {#install-in-thunderbird-local}

1. Thunderbird را باز کنید.
2. به **Tools > Add-ons and Themes** بروید.
3. در **Add-ons Manager**، روی آیکن چرخ‌دنده در گوشهٔ بالا-راست کلیک کنید.
4. از منو **Install Add-on From File…** را انتخاب کنید.
5. فایل `reply_with_attachments-x.y.z-tb.xpi` دانلودشده را انتخاب کنید.
6. وقتی درخواست شد، نصب را تأیید کنید.

---

## نصب برای توسعه {#installation-for-development}

### دانلود مخزن {#download-the-repository}

1. آخرین نسخهٔ مخزن GitHub را دانلود کنید.
2. برای اطلاعات بیشتر `make help` را اجرا کنید.

### نصب در Thunderbird {#install-in-thunderbird-dev}

1. Thunderbird را باز کنید.
2. به **Tools > Add-ons and Themes** بروید.
3. در **Add-ons Manager**، روی آیکن چرخ‌دنده در گوشهٔ بالا-راست کلیک کنید.
4. از منو **Install Add-on From File…** را انتخاب کنید.
5. فایل تولیدشدهٔ `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` را انتخاب کنید.
6. وقتی درخواست شد، نصب را تأیید کنید.

توجه: اگر Thunderbird در سیستم شما `.zip` را نپذیرفت، نام آن را به `.xpi` تغییر دهید و دوباره “Install Add‑on From File…” را امتحان کنید.

### کجا ZIP محلی را پیدا کنیم {#where-local-zip}

- ابتدا افزونه را بسته‌بندی کنید: در ریشهٔ مخزن `make pack` را اجرا کنید.
- پس از بسته‌بندی، فایل zip «LOCAL» را در ریشهٔ مخزن بیابید (مثلاً `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- پیش از بسته‌بندیِ مجدد برای آزمایش، نسخه‌ها را هم در `sources/manifest_ATN.json` و هم در `sources/manifest_LOCAL.json` افزایش دهید.

---

## غیرفعال‌سازی، حذف نصب، و به‌روزرسانی‌ها {#disable-uninstall-updates}

- غیرفعال‌سازی: Thunderbird → Tools → Add‑ons and Themes → افزونه را بیابید → خاموش کنید.
- حذف نصب: همان نما → منوی سه‌نقطه → Remove.
- به‌روزرسانی‌ها: نصب‌های ATN پس از تأیید نسخه‌های جدید به‌طور خودکار به‌روزرسانی می‌شوند. نصب‌های LOCAL/dev خودکار به‌روزرسانی نمی‌شوند؛ یک نسخهٔ LOCAL جدید را به‌صورت دستی دوباره نصب کنید.
- حذف کامل تنظیمات: [حریم خصوصی → حذف داده‌ها](privacy#data-removal) را ببینید.

همچنین ببینید

- [شروع سریع](quickstart)
