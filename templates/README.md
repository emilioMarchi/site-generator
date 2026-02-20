# Plantillas para Site Generator

Este directorio contiene las plantillas base que el generador usará para crear sitios.

## Estructura de una plantilla

```
mi-plantilla/
├── package.json          # Dependencias base
├── next.config.js        # Configuración de Next.js
├── src/
│   ├── app/
│   │   └── page.tsx     # Página principal (template)
│   └── components/       # Componentes específicos de la plantilla
└── public/               # Archivos estáticos
```

## Plantillas disponibles

- `escuela-musica` - Para escuelas de música (basado en el proyecto existente)
- `landing-basic` - Landing page básico
- `ecommerce` - Tienda online (próximamente)

## Cómo agregar una nueva plantilla

1. Crear la carpeta en `templates/`
2. Incluir los archivos necesarios de Next.js
3. El generador copiará esta carpeta y reemplazará las variables

## Variables que se reemplazan

- `{{SITIO_NOMBRE}}` - Nombre del sitio
- `{{SITIO_SLUG}}` - Slug del sitio
- `{{COLOR_PRIMARY}}` - Color primario
- `{{COLOR_SECONDARY}}` - Color secundario
- `{{SITIO_EMAIL}}` - Email de contacto
- `{{SITIO_TELEFONO}}` - Teléfono
- Y más según el config.json
