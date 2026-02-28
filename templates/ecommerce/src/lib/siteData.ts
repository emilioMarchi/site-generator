import fs from 'fs';
import path from 'path';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

export interface Category {
  name: string;
  image: string;
  count: number;
}

export interface SiteConfig {
  sitio: {
    nombre: string;
    slug: string;
    descripcion: string;
    tipo: string;
    template: string;
  };
  dominio: {
    principal: string;
    www: boolean;
    ssl: boolean;
  };
  theme: {
    colores: {
      primary: string;
      secondary: string;
      accent: string;
    };
    fuente: string;
    borderRadius: string;
  };
  contacto: {
    email: string;
    telefono: string;
    whatsapp?: string;
    direccion?: string;
    horarios?: string;
  };
  redes?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
  seo: {
    tituloBase: string;
    metaDescription: string;
  };
  secciones?: Record<string, string[]>;
  productos?: Product[];
  categorias?: Category[];
}

let cachedConfig: SiteConfig | null = null;

export function getSiteConfig(): SiteConfig {
  if (cachedConfig) return cachedConfig;
  
  try {
    const configPath = path.join(process.cwd(), 'site-config.json');
    const configFile = fs.readFileSync(configPath, 'utf-8');
    cachedConfig = JSON.parse(configFile);
    return cachedConfig!;
  } catch (error) {
    console.warn('No se pudo cargar site-config.json, usando configuración por defecto');
    return getDefaultConfig();
  }
}

function getDefaultConfig(): SiteConfig {
  return {
    sitio: {
      nombre: 'Mi Tienda',
      slug: 'mi-tienda',
      descripcion: 'Tienda online',
      tipo: 'ecommerce',
      template: 'ecommerce'
    },
    dominio: {
      principal: 'mi-tienda.com',
      www: true,
      ssl: true
    },
    theme: {
      colores: {
        primary: '#4f46e5',
        secondary: '#1e40af',
        accent: '#f59e0b'
      },
      fuente: 'Inter',
      borderRadius: '12px'
    },
    contacto: {
      email: 'contacto@tienda.com',
      telefono: '+54 11 0000-0000'
    },
    seo: {
      tituloBase: 'Mi Tienda',
      metaDescription: 'Tienda online'
    },
    productos: [],
    categorias: []
  };
}
