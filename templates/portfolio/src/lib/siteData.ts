import fs from 'fs';
import path from 'path';

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  link?: string;
  featured?: boolean;
  orden: number;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  city?: string;
  country?: string;
  schedule?: string;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  linkedin?: string;
  twitter?: string;
}

export interface BusinessData {
  name: string;
  tagline?: string;
  description?: string;
  projects?: Project[];
  contact?: ContactInfo;
  social?: SocialLinks;
}

export interface ThemeConfig {
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

export interface SeoConfig {
  tituloBase: string;
  metaDescription: string;
}

export interface SitioMeta {
  nombre: string;
  slug: string;
  descripcion: string;
  tipo: string;
  template: string;
}

export interface SiteDocument {
  sitio: SitioMeta;
  theme: ThemeConfig;
  business: BusinessData;
  seo: SeoConfig;
}

let cachedData: SiteDocument | null = null;

export function getSiteData(): SiteDocument {
  if (cachedData) return cachedData;
  
  try {
    const dataPath = path.join(process.cwd(), 'site-data.json');
    const dataFile = fs.readFileSync(dataPath, 'utf-8');
    cachedData = JSON.parse(dataFile) as SiteDocument;
    return cachedData!;
  } catch (error) {
    console.warn('No se pudo cargar site-data.json, usando datos por defecto');
    return getDefaultData();
  }
}

export function getBusiness() {
  return getSiteData().business;
}

export function getProjects() {
  return getSiteData().business?.projects || [];
}

export function getFeaturedProjects() {
  return getProjects().filter(p => p.featured);
}

export function getContact() {
  return getSiteData().business?.contact;
}

export function getSocial() {
  return getSiteData().business?.social;
}

export function getSitio() {
  return getSiteData().sitio;
}

export function getTheme() {
  return getSiteData().theme;
}

export function getSeo() {
  return getSiteData().seo;
}

function getDefaultData(): SiteDocument {
  return {
    sitio: {
      nombre: 'Mi Portfolio',
      slug: 'mi-portfolio',
      descripcion: 'Portfolio de proyectos',
      tipo: 'portfolio',
      template: 'portfolio'
    },
    theme: {
      colores: {
        primary: '#2563eb',
        secondary: '#1e40af',
        accent: '#f59e0b',
        background: '#ffffff',
        text: '#1f2937'
      },
      fuente: 'Inter'
    },
    business: {
      name: 'Mi Portfolio',
      tagline: 'Proyectos destacados',
      description: 'Colección de mis trabajos',
      projects: [],
      contact: {
        email: 'contacto@portfolio.com',
        phone: '+54 11 0000-0000'
      },
      social: {}
    },
    seo: {
      tituloBase: 'Mi Portfolio',
      metaDescription: 'Portfolio de proyectos'
    }
  };
}
