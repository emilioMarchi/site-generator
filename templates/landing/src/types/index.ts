/**
 * Tipos unificados para la aplicación
 * Consolida site-data.json y tipos de formulario
 */

// ============================================
// SITE DATA (site-data.json)
// ============================================

export interface SiteDocument {
  sitio: SitioMeta;
  dominio: DominioConfig;
  theme: ThemeConfig;
  business: BusinessData;
  seo: SeoConfig;
  integrations: IntegrationsConfig;
  estado: EstadoConfig;
}

export interface SitioMeta {
  nombre: string;
  slug: string;
  descripcion: string;
  tipo: 'landing' | 'multipage' | 'ecommerce';
  template: string;
  fechaCreacion: string;
  ultimaActualizacion: string;
}

export interface DominioConfig {
  principal: string;
  www: boolean;
  ssl: boolean;
}

export interface ThemeConfig {
  colores: {
    primary: string;
    secondary?: string;
    accent?: string;
    background?: string;
    text?: string;
    success?: string;
    error?: string;
  };
  fuente: string;
  fuenteHeadings?: string;
  borderRadius?: string;
}

export interface BusinessData {
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

export interface Service {
  id: string;
  name: string;
  description: string;
  price?: string;
  priceFrom?: number;
  priceTo?: number;
  currency?: string;
  duration?: string;
  process?: string;
  includes?: string[];
  featured?: boolean;
  orden: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photo?: string;
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

export interface TargetAudience {
  ageRange?: string;
  interests?: string[];
  painPoints?: string[];
}

export interface SeoConfig {
  tituloBase: string;
  metaDescription: string;
  metaKeywords?: string[];
  ogImage?: string;
  robots?: string;
}

export interface IntegrationsConfig {
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

export interface EstadoConfig {
  publicado: boolean;
  modo: 'production' | 'staging';
}

// ============================================
// FORM DATA (Contact Form)
// ============================================

export interface FormData {
  nombre: string;
  email: string;
  telefono?: string;
  mensaje: string;
}

export interface Mensaje {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  mensaje: string;
  fecha: Date;
  leido: boolean;
  sitioSlug?: string;
}

// ============================================
// API RESPONSES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
