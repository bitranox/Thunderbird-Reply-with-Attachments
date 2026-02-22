---
id: donation
title: 'შემოწირეთ'
sidebar_label: 'შემოწირეთ'
---

---

## შემოწირულობა

import useBaseUrl from '@docusaurus/useBaseUrl';

თუ თქვენ მოგწონთ „Reply with Attachments“ და გსურთ მისი განვითარების მხარდაჭერა, შეგიძლიათ აქ გააკეთოთ შემოწირულობა:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="შემოწირულობა Stripe-ის საშუალებით" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ან</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="შემოწირულობა PayPal-ის საშუალებით" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ან</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="შემიძინეთ ჩემთვის ყავა" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="დაასკანერეთ, რომ შემიძინოთ ყავა"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

გმადლობთ! თქვენი მხარდაჭერა გვეხმარება ახალი Thunderbird-ის გამოცემებთან თავსებადობის შენარჩუნებაში, ხელმისაწვდომობისა და ტესტების გაუმჯობესებაში და დოკუმენტაციის აქტუალურად შენარჩუნებაში.

შენიშვნები

- შემოწირულობის ბმულები იხსნება მხოლოდ მაშინ, როცა დააწკაპუნებთ; დამატება ფონის ქსელურ მოთხოვნებს არ ასრულებს.
- განმეორებადი მხარდაჭერა უწყობს ხელს გრძელვადიან მოვლასა და დროულ განახლებებს, თუმცა სრულიად ნებაყოფლობითია.

---

თუ სურათის ღილაკები არ იტვირთა, გთხოვთ გამოიყენოთ შემდეგი ბმულები:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

შემოწირულობები ნებაყოფლობითია; ფუნქციებზე წვდომა არ იზღუდება.

---

## შემოწირულობის ხილვადობა (90‑დღიანი გადადება)

დამატებას აქვს მოსახერხებელი ფუნქცია, რომელიც გარკვეული ხნით მალავს შემოწირულობის მოწოდებებს მას შემდეგ, რაც შემოწირულობას გააკეთებთ.

- სად ვიპოვოთ
  - პარამეტრები → მხარდაჭერის განყოფილება: დაინახავთ „მე გავაკეთე შემოწირულობა“ ღილაკს და მცირე მინიშნების ზონას.
  - გაგზავნის დადასტურების დიალოგშიც ჩანს „შემოწირულობა“ ღილაკი; ის ავტომატურად დაიმალება, როდესაც გადადება აქტიურია.

- როგორ მუშაობს
  - „მე გავაკეთე შემოწირულობა“-ზე დაჭერა 90 დღით მალავს შემოწირულობის ღილაკებსა და დაკავშირებულ მინიშნებებს.
  - სტატუსის მინიშნება აჩვენებს „დამალულია თარიღამდე YYYY‑MM‑DD“ (თქვენს ადგილობრივ თარიღში). არსებობს აგრეთვე „თავიდან აჩვენე შემოწირულობა“ ღილაკი, რათა ხილვადობა დაუყოვნებლივ აღდგეს.
  - 90 დღის შემდეგ „შემოწირულობა“ ღილაკი კვლავ ავტომატურად გამოჩნდება.

- კონფიდენციებლობა და შენახვა
  - დამატება ინახავს ერთ დროშტამპს Thunderbird-ის ადგილობრივ საცავში გადადების პერიოდის დასამახსოვრებლად. გასაღები: `donateHideUntil` (ეპოქის მილიწამებში).
  - ეს პარამეტრი ლოკალურია თქვენს Thunderbird-ის პროფილში (ღრუბელთან არ სინქრონირდება). ამ ფუნქციას ქსელური მოთხოვნები არ გააჩნია.

- პრობლემების გადაწყვეტა
  - თუ „მე გავაკეთე შემოწირულობა“-ზე დაწკაპუნებისთანავე „შემოწირულობა“ მაინც ჩანს, დაელოდეთ წამს ან ხელახლა გახსენით პარამეტრების გვერდი; ინტერფეისი განახლდება, როგორც კი პარამეტრი შეინახება.
  - ხელით გადასაყენებლად დააწკაპუნეთ „თავიდან აჩვენე შემოწირულობა“. ასევე შეგიძლიათ უბრალოდ დაელოდოთ მინიშნებაში მითითებული თარიღის დადგომას.

ეს ფუნქცია მხოლოდ მოსახერხებლობისთვისაა; ის არასოდეს ბლოკავს დამატების ფუნქციონალს და არ აგროვებს რაიმე პერსონალურ მონაცემებს.

---
