# 🚀 Site Generator

Generador de sitios web a partir de archivos de configuración. Ideal para crear sitios tipo Escuela de Música, landing pages, ecommerce, etc.

## Estructura del Proyecto

```
site-generator/
├── config/
│   ├── examples/           # Archivos de configuración de ejemplo
│   │   ├── escuela-musica.json
│   │   └── landing-page.json
│   ├── queue.json         # Cola de sitios a procesar
│   └── templates.json     # Registro de plantillas disponibles
│
├── templates/             # Plantillas base para generar sitios
│   ├── README.md          # Documentación de plantillas
│   └── ...
│
├── output/                # Sitios generados (resultado)
│
├── src/
│   └── index.ts          # CLI del generador
│
├── package.json
├── tsconfig.json
└── README.md
```

## Instalación

```bash
cd site-generator
npm install
```

## Uso

### Generar un sitio directamente

```bash
npm run generate -- --config=config/examples/escuela-musica.json
```

### Usar la cola de procesamiento

1. Agregar config a la cola:
```bash
# (pendiente de implementar)
npm run queue:add -- config/examples/landing-page.json
```

2. Procesar toda la cola:
```bash
npm run queue:process
```

3. Ver estado de la cola:
```bash
npm run queue:status
```

## Archivo de Configuración

Cada sitio se define con un archivo JSON que contiene:

```json
{
  "sitio": {
    "nombre": "Nombre del Sitio",
    "slug": "mi-sitio",
    "descripcion": "Descripción del sitio",
    "tipo": "multipage",  // landing | multipage | ecommerce
    "template": "escuela-musica"  // nombre de la plantilla
  },
  
  "dominio": {
    "principal": "midominio.com.ar",
    "www": true,
    "ssl": true
  },
  
  "theme": {
    "colores": {
      "primary": "#ff6b35",
      "secondary": "#004e89",
      "accent": "#f7c59f"
    },
    "fuente": "Poppins",
    "borderRadius": "12px"
  },
  
  "contacto": {
    "email": "hola@midominio.com.ar",
    "telefono": "+54 9 11 1234-5678",
    "whatsapp": "+54 9 11 1234-5678",
    "direccion": "Dirección 123",
    "horarios": "Lun a Vie 9:00 a 18:00"
  },
  
  "redes": {
    "instagram": "miinstagram",
    "facebook": "mifacebook"
  },
  
  "servicios": {
    "firebase": {
      "coleccion": "mi-sitio-data"
    },
    "resend": {
      "dominio": "midominio.com.ar",
      "emailFrom": "noreply@midominio.com.ar"
    },
    "mercadopago": {
      "enabled": true
    }
  },
  
  "seo": {
    "tituloBase": "Mi Sitio | Título SEO",
    "metaDescription": "Descripción para Google"
  },
  
  "secciones": {
    "inicio": ["hero", "features", "contacto"]
  },
  
  "pages": [
    {
      "slug": "inicio",
      "title": "Inicio",
      "sections": [
        { "type": "hero", "content": { ... } }
      ]
    }
  ]
}
```

## Variables de Plantilla

El generador reemplaza estas variables en los archivos:

| Variable | Descripción |
|----------|-------------|
| `{{SITIO_NOMBRE}}` | Nombre del sitio |
| `{{SITIO_SLUG}}` | Slug identificador |
| `{{COLOR_PRIMARY}}` | Color primario |
| `{{COLOR_SECONDARY}}` | Color secundario |
| `{{SITIO_EMAIL}}` | Email de contacto |
| `{{SITIO_TELEFONO}}` | Teléfono |
| `{{FIREBASE_COLECCION}}` | Nombre de colección Firebase |
| `{{DOMINIO}}` | Dominio principal |

## Plantillas Disponibles

Por crear. Por ahora se usa como referencia el proyecto de la Escuela de Música en:
`d:/Emi/DESARROLLO-WEB/escuelademusica-website`

## Flujo de Trabajo

1. **Crear config**: Yo te paso el archivo JSON con la config del cliente
2. **Guardar en cola**: El config va a `config/pending/`
3. **Generar**: Ejecutás el script y se crea el sitio en `output/`
4. **Deploy**: Subís a Vercel manualmente o automatizado

## Tecnologías

- **Node.js** + **TypeScript**
- **Next.js** (para los sitios generados)
- **Firebase** (datos)
- **Mercado Pago** (pagos)
- **Resend** (emails)

---
 
### Comandos de CLI (uso rápido)

- Generar un sitio
  - npm run generate --config config/ovnicanal.json
  - npm run generate -c config/ovnicanal.json
- Generar con datos de negocio
  - npm run generate --config config/ovnicanal.json --business-data data/tu-archivo.ext
- Generar con datos de demostración
  - npm run generate --config config/ovnicanal.json --demo
- Generar y construir tras generación
  - npm run generate --config config/ovnicanal.json --build
- Despliegue a Vercel tras build
  - npm run generate --config config/ovnicanal.json --build --deploy
- Flujo completo (gen -> build -> deploy)
  - npm run generate --config config/ovnicanal.json --build --deploy
- Cola de generación
  - npm run queue:add -- config/ovnicanal.json
  - npm run queue:status
  - npm run queue:process

- Notas útiles
  - Asegúrate de tener vercel CLI instalado y autenticado si vas a desplegar.
  - Mantén credenciales fuera del repo (env y service accounts).
