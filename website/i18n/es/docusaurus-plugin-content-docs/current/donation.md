---
id: donation
title: 'Donar'
sidebar_label: 'Donar'
---

---

## Donar

import useBaseUrl from '@docusaurus/useBaseUrl';

Si te gusta "Reply with Attachments" y quieres apoyar su desarrollo, puedes donar aquí:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Donate via Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>or</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Donate via PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>or</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Buy me a coffee" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Scan to buy me a coffee"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

¡Gracias! Tu apoyo ayuda a mantener la compatibilidad con las nuevas versiones de Thunderbird, a mejorar la accesibilidad y las pruebas, y a mantener la documentación actualizada.

Notas

- Los enlaces de donación solo se abren cuando haces clic en ellos; el complemento no realiza ninguna solicitud de red en segundo plano.
- El apoyo recurrente ayuda al mantenimiento a largo plazo y a las actualizaciones puntuales, pero es completamente opcional.

---

Si los botones de imagen no se cargan, utiliza estos enlaces en su lugar:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Las donaciones son voluntarias; no hay funciones bloqueadas.

---

## Visibilidad de donaciones (posponer 90 días)

El complemento incluye una función práctica para ocultar los avisos de donación durante un tiempo después de que hayas donado.

- Dónde encontrarlo
  - Opciones → sección Soporte: verás un botón “He donado” y un área pequeña con indicaciones.
  - El diálogo de confirmación de envío también muestra un botón Donar; se oculta automáticamente cuando el aplazamiento está activo.

- Cómo funciona
  - Al hacer clic en “He donado” se ocultan los botones de donación y los avisos relacionados durante 90 días.
  - Un aviso de estado muestra “Oculto hasta YYYY‑MM‑DD” (en tu fecha local). También hay un botón “Mostrar Donar de nuevo” para restaurar la visibilidad inmediatamente.
  - Después de 90 días, el botón Donar vuelve a ser visible automáticamente.

- Privacidad y almacenamiento
  - El complemento guarda una única marca de tiempo en el almacenamiento local de Thunderbird para recordar el periodo de aplazamiento. Clave: `donateHideUntil` (milisegundos desde la época).
  - Este ajuste es local para tu perfil de Thunderbird (no se sincroniza en la nube). Esta función no realiza solicitudes de red.

- Solución de problemas
  - Si Donar sigue apareciendo justo después de hacer clic en “He donado”, espera un momento o vuelve a abrir la página de Opciones; la interfaz se actualiza en cuanto se guarda el ajuste.
  - Para restablecerlo manualmente, haz clic en “Mostrar Donar de nuevo”. También puedes esperar hasta que pase la fecha indicada en el aviso.

Esta función es únicamente por comodidad; nunca bloquea la funcionalidad del complemento y no recopila ningún dato personal.

---
