---
id: features
title: 'Características'
sidebar_label: 'Características'
---

---

## Funciones {#features}

- Las imágenes incrustadas se dejan en manos de Thunderbird: permanecen en el cuerpo de
  la respuesta y no se copian como archivos adjuntos. Una imagen que solo lleva un
  `Content-ID` sin estar referenciada se trata como un adjunto normal y se copia.

---

## Cómo funciona {#how-it-works}

- Al responder, el complemento muestra los archivos adjuntos originales.
- Filtra las firmas S/MIME de los adjuntos; las imágenes en línea se restauran en el cuerpo (a menos que se desactive).
- Opcionalmente solicita confirmación (compatible con el teclado).
- Añade los archivos aptos a su ventana de redacción, evitando duplicados por nombre de archivo.
- Vea “Por qué es posible que no se agreguen los adjuntos” en Uso para casos límite.

Nota de privacidad: Todo el procesamiento ocurre localmente en Thunderbird. El complemento no realiza solicitudes de red en segundo plano.

---
