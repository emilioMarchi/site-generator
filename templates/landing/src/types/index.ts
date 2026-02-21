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
// BUSINESS PROFILE
// ============================================

export interface BusinessProfile {
  // Identity
  name: string;
  tagline?: string;
  description?: string;
  history?: string;
  mission?: string;
  vision?: string;
  values?: string[];
  
  // Services (detailed)
  services?: BusinessService[];
  
  // Team
  team?: TeamMember[];
  
  // Testimonials
  testimonials?: Testimonial[];
  
  // Contact (extended)
  contact?: BusinessContact;
  
  // Communication
  communication?: CommunicationConfig;
  
  // Social media (extended)
  social?: SocialMedia;
  
  // Target audience
  targetAudience?: TargetAudience;
  
  // Differentiators
  differentiators?: string[];
  
  // Certifications & Awards
  certifications?: string[];
  awards?: string[];
  
  // Pricing
  pricing?: PricingConfig;
  
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BusinessService {
  id: string;
  name: string;
  description: string;
  process?: string;
  duration?: string;
  price?: string;
  includes?: string[];
  faq?: FAQ[];
  featured?: boolean;
  order?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photo?: string;
  order?: number;
}

export interface Testimonial {
  id: string;
  client: string;
  text: string;
  rating?: number;
  date?: string;
  visible?: boolean;
}

export interface BusinessContact {
  email: string;
  phone: string;
  whatsapp?: string;
  address?: string;
  schedule?: string;
  responseTime?: string;
}

export interface CommunicationConfig {
  preferredChannel: 'whatsapp' | 'email' | 'phone';
  responseTime: string;
  language: string;
  tone: 'formal' | 'informal' | 'amigable';
  faq?: FAQ[];
}

export interface TargetAudience {
  ageRange?: string;
  interests?: string[];
  painPoints?: string[];
}

export interface PricingConfig {
  currency: string;
  paymentMethods?: string[];
  plans?: PricingPlan[];
}

export interface PricingPlan {
  id: string;
  name: string;
  description?: string;
  price: string;
  features?: string[];
  featured?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
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
