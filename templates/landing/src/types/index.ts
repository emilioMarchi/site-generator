/**
 * Types for Multi-tenant Data Structure
 * 
 * Firestore Structure:
 * sites/{slug}/
 *   ├── config/        -> SiteConfig
 *   ├── sections/       -> Section[]
 *   ├── services/      -> Service[]
 *   ├── messages/       -> Message[]
 *   └── media/         -> Media[]
 */

// ============================================
// SITE CONFIG
// ============================================

export interface SiteConfig {
  name: string;
  description: string;
  email: string;
  phone: string;
  whatsapp?: string;
  address?: string;
  schedule?: string;
  social?: SocialMedia;
  theme?: ThemeConfig;
  seo?: SEOConfig;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SocialMedia {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  linkedin?: string;
  twitter?: string;
}

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
    success?: string;
    error?: string;
  };
  font: string;
  borderRadius: string;
}

export interface SEOConfig {
  title: string;
  metaDescription: string;
  robots?: string;
  ogImage?: string;
}

// ============================================
// SECTIONS
// ============================================

export interface Section {
  id: string;
  type: SectionType;
  title?: string;
  subtitle?: string;
  content: Record<string, any>;
  order: number;
  visible: boolean;
}

export type SectionType = 
  | 'hero' 
  | 'features' 
  | 'services' 
  | 'testimonials' 
  | 'contact' 
  | 'faq' 
  | 'gallery' 
  | 'cta'
  | 'location';

// ============================================
// SERVICES / PRODUCTS
// ============================================

export interface Service {
  id: string;
  name: string;
  description: string;
  price?: number;
  icon?: string;
  image?: string;
  featured: boolean;
  order: number;
  active: boolean;
}

// ============================================
// MESSAGES / CONTACTS
// ============================================

export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  date: Date;
  read: boolean;
  replied: boolean;
}

// ============================================
// MEDIA / FILES
// ============================================

export interface Media {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size?: number;
  alt?: string;
  order: number;
  uploadedAt: Date;
}

// ============================================
// FORM DATA
// ============================================

export interface FormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// ============================================
// API RESPONSES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ListResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}
