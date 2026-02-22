---
id: donation
title: 'Хандивлах'
sidebar_label: 'Хандивлах'
---

---

## Хандив

import useBaseUrl from '@docusaurus/useBaseUrl';

Хэрэв танд "Reply with Attachments" таалагддаг бөгөөд хөгжүүлэлтийг нь дэмжихийг хүсвэл энд хандив өргөж болно:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Stripe-ээр хандив өгөх" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>эсвэл</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="PayPal-ээр хандив өгөх" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>эсвэл</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Надад кофе авч өгөх" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Кофе авч өгөхөд скан хийнэ үү"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Баярлалаа! Таны дэмжлэг нь Thunderbird-ийн шинэ хувилбаруудтай нийцтэй байдлыг хадгалах, хүртээмж ба туршилтыг сайжруулах, мөн баримтжуулалтыг шинэчилж байхэд тусалдаг.

Тэмдэглэл

- Хандивын холбоосууд зөвхөн та товшсон үед нээгдэнэ; өргөтгөл нь ямар ч ар талын сүлжээний хүсэлт ажиллуулдаггүй.
- Давтамжтай дэмжлэг нь урт хугацааны засвар үйлчилгээ, цаг тухайд нь шинэчлэл хийхэд тус болдог ч бүрэн сайн дурын юм.

---

Хэрэв зурган товчнууд ачаалагдахгүй бол дараах холбоосуудыг оронд нь ашиглана уу:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Хандив нь сайн дурын; ямар нэгэн функц хязгаарлах зүйл байхгүй.

---

## Хандивын харагдах байдал (90 өдрийн түр нуух)

Та хандивласны дараа тодорхой хугацаанд хандивын сануулгыг нуух тохиромжтой боломж өргөтгөлд бий.

- Хаанаас олох вэ
  - Options → Support хэсэгт: “I donated” товч ба жижиг сануулгын хэсгийг харна.
  - Send‑confirmation цонх мөн Donate товчийг харуулна; snooze идэвхтэй үед энэ нь автоматаар нуугдана.

- Хэрхэн ажилладаг вэ
  - “I donated” товчийг дарснаар хандивын товчууд болон холбоотой сануулгууд 90 хоног нуугдана.
  - Төлөвийн сануулгад “Hidden until YYYY‑MM‑DD” (таны орон нутгийн огноогоор) гэж гарна. Шууд дахин харагдуулъя гэвэл “Show Donate again” товч байна.
  - 90 хоногийн дараа Donate товч автоматаар дахин харагдана.

- Нууцлал ба хадгалалт
  - Snooze хугацааг сануулахын тулд өргөтгөл нь Thunderbird‑ийн локал хадгалалтанд ганц цаг тэмдэглэгээ хадгална. Түлхүүр: `donateHideUntil` (epoch миллисекунд).
  - Энэ тохиргоо нь таны Thunderbird профайлын түвшинд локал (үүлтэй синкдэхгүй). Энэ боломж ямар ч сүлжээний хүсэлт явуулдаггүй.

- Алдааг олж засварлах
  - Хэрэв “I donated”‑ыг дарсны дараа ч Donate харагдсаар байвал түр хүлээгээд эсвэл Options хуудсыг дахин нээгээд үзнэ үү; тохиргоо хадгалагмагц UI шинэчлэгдэнэ.
  - Гараар дахин тохируулахын тулд “Show Donate again”‑ыг дарна уу. Мөн сануулгад бичигдсэн огноо өнгөртөл хүлээж болно.

Энэ боломж нь зөвхөн хэрэглэгчийн тав тухын төлөөх; өргөтгөлийн үйл ажиллагааг хэзээ ч хаахгүй, ямар ч хувийн мэдээлэл цуглуулахгүй.

---
