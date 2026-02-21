# Guía para Notas de Negocio

Para generar un sitio web automáticamente, las notas del negocio deben incluir:

## Datos Obligatorios del Negocio

### Básicos
- **Nombre del negocio**: ej. "Sabor y Raíz"
- **Tagline**: frase corta (máx 10 palabras)
- **Descripción**: 2-3 oraciones sobre el negocio
- **Historia**: cómo nació el negocio

### Servicios/Productos
Para cada servicio:
- Nombre del servicio
- Descripción
- Precio (o "Consultar")
- Duración típica (opcional)
- Proceso (opcional)

### Datos de Contacto
- Teléfono / WhatsApp
- Email
- Dirección física
- Horarios de atención

### Redes Sociales
- Instagram (handle)
- Facebook (página)
- LinkedIn (opcional)
- YouTube (opcional)

---

## Datos de Configuración del Sitio

Estos datos se necesitan para el despliegue:

### Dominio
- Dominio principal: ej. "saboryraiz.com.ar"
- ¿Usar www? (sí/no)
- ¿SSL? (sí - por defecto)

### Firebase (para formularios)
- Proyecto ID de Firebase: ej. "sabor-y-raiz"
- Nombre de colección: ej. "contactos"

### Resend (para emails)
- Dominio verificado: ej. "saboryraiz.com.ar"
- Email remitente: ej. "noreply@saboryraiz.com.ar"

### Colores (opcional)
- Color primario (hex): ej. "#8B4513" (marrón café)
- Color secundario (hex): ej. "#D2691E" (chocolate)
- Color acento (hex): ej. "#F5DEB3" (trigo)

---

## Ejemplo de Notas Completas

```
NOTAS PARA "Sabor y Raíz" - Café & Biströ

De qué trata el negocio:
Café de especialidad con almuerzos orgánicos. 
Ambiente tranquilo para trabajar.

Datos de contacto:
- Tel: +54 9 11 5555-1234
- Email: info@saboryraiz.com
- Dirección: Calle Las Orquídeas 450, Barrio Norte
- Horarios: Lun-Dom 8am-8pm
- Instagram: @SaborYRaiz_Cafe

Servicios:
1. Café de especialidad - desde $800
2. Brunch - $2500-3500
3. Catas semanales - $3500 por persona

Configuración:
- Dominio: saboryraiz.com.ar
- Firebase: proyecto-sabor-y-raiz
- Email: noreply@saboryraiz.com.ar
- Colores: marrón, dorado
```

---

## Notas Adicionales

- El dominio debe ser el que vas a usar en producción
- El proyecto de Firebase debe estar creado previamente en firebase.google.com
- El dominio de Resend debe estar verificado en Resend.com
