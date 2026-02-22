---
id: install
title: 'ការដំឡើង'
slug: /install
sidebar_label: 'ការដំឡើង'
---

---

## ការដំឡើងតាមរយៈ "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important កំណែអប្បបរមារបស់ Thunderbird
កម្មវិធីបន្ថែមនេះ​គាំទ្រ Thunderbird **128 ESR ឬថ្មីជាងនេះ**។ កំណែចាស់​មិនត្រូវបាន​គាំទ្រ។
:::

នេះជាវិធីដំឡើងដែលបានណែនាំ។ កម្មវិធីបន្ថែមដែលដំឡើងពី ATN (addons.thunderbird.net) នឹងទទួលបានការបច្ចុប្បន្នភាពស្វ័យប្រវត្តិ។ ការដំឡើង LOCAL/dev មិនធ្វើបច្ចុប្បន្នភាពស្វ័យប្រវត្តិទេ។

- កំណែ Thunderbird អប្បបរមា: 128 ESR ឬថ្មីជាងនេះ។

1. នៅក្នុង Thunderbird ចូលទៅកាន់ **Tools > Add-ons and Themes**។
2. ស្វែងរក "reply with attachments"។
3. បន្ថែម​កម្មវិធីបន្ថែម។

ឬ​បើក​ទំព័រ​កម្មវិធីបន្ថែម​ដោយផ្ទាល់៖ [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## ដំឡើងដោយដៃពី XPI {#local-installation-in-thunderbird}

### ទាញយក​ឯកសារ XPI {#download-the-xpi-file}

1. ទៅកាន់ [ទំព័រ Thunderbird Add‑on](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)។
2. ទាញយក​កំណែ​ចុងក្រោយ​បំផុត​របស់​កម្មវិធីបន្ថែម​ជា​ឯកសារ XPI (`reply_with_attachments-x.y.z-tb.xpi`)។

### ដំឡើងក្នុង Thunderbird {#install-in-thunderbird-local}

1. បើក Thunderbird។
2. ចូលទៅកាន់ **Tools > Add-ons and Themes**។
3. នៅ​ក្នុង **Add-ons Manager** ចុច​រូបតំណាង​គ្រាប់​ច្រេះ​នៅ​ជ្រុង​ខាងស្ដាំ​ខាងលើ។
4. ជ្រើស **Install Add-on From File…** ពីម៉ឺនុយ។
5. ជ្រើស​ឯកសារ `reply_with_attachments-x.y.z-tb.xpi` ដែល​បានទាញ​យក។
6. បញ្ជាក់​ការ​ដំឡើង​នៅ​ពេល​ត្រូវ​បាន​សួរ។

---

## ការដំឡើង​សម្រាប់​ការអភិវឌ្ឍន៍ {#installation-for-development}

### ទាញយក​ឃ្លាំងកូដ {#download-the-repository}

1. ទាញយក​កំណែ​ចុងក្រោយ​នៃ​ឃ្លាំង GitHub។
2. ដំណើរការ `make help` សម្រាប់​ព័ត៌មាន​បន្ថែម។

### ដំឡើងក្នុង Thunderbird {#install-in-thunderbird-dev}

1. បើក Thunderbird។
2. ចូលទៅកាន់ **Tools > Add-ons and Themes**។
3. នៅ​ក្នុង **Add-ons Manager** ចុច​រូបតំណាង​គ្រាប់​ច្រេះ​នៅ​ជ្រុង​ខាងស្ដាំ​ខាងលើ។
4. ជ្រើស **Install Add-on From File…** ពីម៉ឺនុយ។
5. ជ្រើស​ឯកសារ​ដែល​បាន​បង្កើត `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`។
6. បញ្ជាក់​ការ​ដំឡើង​នៅ​ពេល​ត្រូវ​បាន​សួរ។

កំណត់ចំណាំ៖ ប្រសិនបើ Thunderbird មិនទទួលយក `.zip` លើ​ប្រព័ន្ធ​របស់​អ្នក​ទេ សូមប្ដូរ​ឈ្មោះ​វា​ទៅ​ជា `.xpi` ហើយ​ព្យាយាម “Install Add‑on From File…” ម្ដង​ទៀត។

### កន្លែង​រក LOCAL ZIP {#where-local-zip}

- ដំបូង កញ្ចប់​កម្មវិធីបន្ថែម៖ ដំណើរការ `make pack` នៅ​ឫស​របស់​ឃ្លាំង។
- បន្ទាប់​ពី​កញ្ចប់ រក​ឃើញ zip “LOCAL” នៅ​ឫស​របស់​ឃ្លាំង (ឧ., `2025-..-reply-with-attachments-plugin-LOCAL.zip`)។
- មុន​ពេល​កញ្ចប់​ម្ដង​ទៀត​សម្រាប់​ការ​សាកល្បង សូម​បង្កើន​លេខ​កំណែ​ទាំង​នៅ​ក្នុង `sources/manifest_ATN.json` និង `sources/manifest_LOCAL.json` ព្រមគ្នា។

---

## បិទប្រើ បោះដំឡើងចេញ និង បច្ចុប្បន្នភាព {#disable-uninstall-updates}

- បិទ/អសកម្ម៖ Thunderbird → Tools → Add‑ons and Themes → ស្វែងរក​កម្មវិធីបន្ថែម → បិទ​ស្វ៊ីច។
- បោះដំឡើងចេញ៖ ទិដ្ឋភាព​ដូចគ្នា → ម៉ឺនុយ​ចំណុច​បី → Remove។
- បច្ចុប្បន្នភាព៖ ការដំឡើង​ពី ATN នឹង​ធ្វើ​បច្ចុប្បន្នភាព​ស្វ័យប្រវត្តិ នៅពេល​កំណែថ្មី​ត្រូវ​បាន​អនុម័ត។ ការដំឡើង LOCAL/dev មិន​ធ្វើ​បច្ចុប្បន្នភាព​ស្វ័យប្រវត្តិ​ទេ; ដំឡើងឡើងវិញ LOCAL build ថ្មី ដោយដៃ។
- លុប​ការ​កំណត់​ចោល​ទាំងស្រុង៖ សូមមើល [ភាព​ឯកជន → ការលុប​ទិន្នន័យ](privacy#data-removal)។

មើលបន្ថែម

- [ការចាប់ផ្តើមរហ័ស](quickstart)
