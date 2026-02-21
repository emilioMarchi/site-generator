# Estructura de Datos - Firestore

## Overview
Este documento define la estructura de datos genérica que se guardará en Firestore cuando se genera un sitio.

---

## Colección: `sites`

Cada documento en esta colección representa un sitio generado.

```
sites/{siteId}
```

### Estructura Genérica del Documento

```json
{
  "sitio": {
    "nombre": "string",
    "slug": "string",
    "descripcion": "string",
    "tipo": "landing | multipage | ecommerce",
    "template": "string",
    "fechaCreacion": "ISO8601",
    "ultimaActualizacion": "ISO8601"
  },
  
  "dominio": {
    "principal": "string",
    "www": "boolean",
    "ssl": "boolean"
  },
  
  "theme": {
    "colores": {
      "primary": "#hex",
      "secondary": "#hex | null",
      "accent": "#hex | null",
      "background": "#hex | null",
      "text": "#hex | null"
    },
    "fuente": "string",
    "fuenteHeadings": "string | null",
    "borderRadius": "string"
  },
  
  "business": {
    "name": "string",
    "tagline": "string | null",
    "description": "string | null",
    "history": "string | null",
    "mission": "string | null",
    "vision": "string | null",
    "values": "string[] | null",
    
    "services": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "price": "string | null",
        "priceFrom": "number | null",
        "priceTo": "number | null",
        "currency": "string",
        "duration": "string | null",
        "process": "string | null",
        "includes": "string[] | null",
        "featured": "boolean",
        "orden": "number"
      }
    ],
    
    "team": [
      {
        "id": "string",
        "name": "string",
        "role": "string",
        "bio": "string | null"
      }
    ],
    
    "contact": {
      "email": "string | null",
      "phone": "string | null",
      "whatsapp": "string | null",
      "address": "string | null",
      "city": "string | null",
      "country": "string | null",
      "schedule": "string | null"
    },
    
    "social": {
      "instagram": "string | null",
      "facebook": "string | null",
      "youtube": "string | null",
      "linkedin": "string | null"
    },
    
    "differentiators": "string[] | null",
    
    "targetAudience": {
      "ageRange": "string | null",
      "interests": "string[] | null",
      "painPoints": "string[] | null"
    }
  },
  
  "seo": {
    "tituloBase": "string",
    "metaDescription": "string",
    "metaKeywords": "string[] | null",
    "ogImage": "string | null",
    "robots": "string"
  },
  
  "integrations": {
    "firebase": {
      "projectId": "string",
      "collection": "string"
    },
    "resend": {
      "domain": "string",
      "emailFrom": "string"
    },
    "analytics": {
      "GA_MEASUREMENT_ID": "string | null"
    }
  },
  
  "secciones": {
    "inicio": "string[] | null",
    "nosotros": "string[] | null",
    "servicios": "string[] | null",
    "contacto": "string[] | null"
  },
  
  "estado": {
    "publicado": "boolean",
    "modo": "production | staging"
  }
}
```

---

## Tipos de Datos TypeScript

```typescript
interface SiteDocument {
  sitio: SitioMeta;
  dominio: DominioConfig;
  theme: ThemeConfig;
  business: BusinessData;
  seo: SeoConfig;
  integrations: IntegrationsConfig;
  secciones: SeccionesConfig | null;
  estado: EstadoConfig;
}

interface SitioMeta {
  nombre: string;
  slug: string;
  descripcion: string;
  tipo: 'landing' | 'multipage' | 'ecommerce';
  template: string;
  fechaCreacion: string;
  ultimaActualizacion: string;
}

interface DominioConfig {
  principal: string;
  www: boolean;
  ssl: boolean;
}

interface ThemeConfig {
  colores: {
    primary: string;
    secondary?: string;
    accent?: string;
    background?: string;
    text?: string;
  };
  fuente: string;
  fuenteHeadings?: string;
  borderRadius?: string;
}

interface BusinessData {
  name: string;
  tagline?: string;
  description?: string;
  history?: string;
  mission?: string;
  vision?: string;
  values?: string[];
  services?: Service[];
  team?: TeamMember[];
  contact?: ContactInfo;
  social?: SocialLinks;
  differentiators?: string[];
  targetAudience?: TargetAudience;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price?: string;
  priceFrom?: number;
  priceTo?: number;
  currency: string;
  duration?: string;
  process?: string;
  includes?: string[];
  featured: boolean;
  orden: number;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
}

interface ContactInfo {
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  city?: string;
  country?: string;
  schedule?: string;
}

interface SocialLinks {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  linkedin?: string;
}

interface TargetAudience {
  ageRange?: string;
  interests?: string[];
  painPoints?: string[];
}

interface SeoConfig {
  tituloBase: string;
  metaDescription: string;
  metaKeywords?: string[];
  ogImage?: string;
  robots?: string;
}

interface IntegrationsConfig {
  firebase: {
    projectId: string;
    collection: string;
  };
  resend?: {
    domain: string;
    emailFrom: string;
  };
  analytics?: {
    GA_MEASUREMENT_ID?: string;
  };
}

interface SeccionesConfig {
  inicio?: string[];
  nosotros?: string[];
  servicios?: string[];
  contacto?: string[];
}

interface EstadoConfig {
  publicado: boolean;
  modo: 'production' | 'staging';
}
```

---

## Notas de Implementación

1. **Separación de concerns**: 
   - `business`: Datos del negocio (nombre, servicios, equipo, etc.)
   - `sitio`: Metadatos del sitio (slug, template, estado)
   - `theme`: Configuración visual
   - `integrations`: Keys y configuraciones de servicios externos

2. **Actualización**:
   - Cuando se regenera el sitio, se actualiza el documento en Firestore
   - El sitio generado lee de Firestore, no de archivos locales

3. **Edición**:
   - El panel admin permite editar cualquier campo
   - Los cambios se guardan directamente en Firestore
