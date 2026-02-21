/**
 * Firestore Service
 * 
 * Saves site data to Firestore when generating a site
 */

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Types for the Firestore document
export interface SiteDocument {
  sitio: {
    nombre: string;
    slug: string;
    descripcion: string;
    tipo: string;
    template: string;
    fechaCreacion: string;
    ultimaActualizacion: string;
  };
  dominio: {
    principal: string;
    www: boolean;
    ssl: boolean;
  };
  theme: {
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
  };
  business: {
    name: string;
    tagline?: string;
    description?: string;
    history?: string;
    mission?: string;
    vision?: string;
    values?: string[];
    services?: Array<{
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
    }>;
    team?: Array<{
      id: string;
      name: string;
      role: string;
      bio?: string;
    }>;
    contact?: {
      email?: string;
      phone?: string;
      whatsapp?: string;
      address?: string;
      city?: string;
      country?: string;
      schedule?: string;
    };
    social?: {
      instagram?: string;
      facebook?: string;
      youtube?: string;
      linkedin?: string;
    };
    differentiators?: string[];
    targetAudience?: {
      ageRange?: string;
      interests?: string[];
      painPoints?: string[];
    };
  };
  seo: {
    tituloBase: string;
    metaDescription: string;
    metaKeywords?: string[];
    ogImage?: string;
    robots?: string;
  };
  integrations: {
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
  };
  secciones?: {
    inicio?: string[];
    nosotros?: string[];
    servicios?: string[];
    contacto?: string[];
  };
  estado: {
    publicado: boolean;
    modo: 'production' | 'staging';
  };
}

/**
 * Merge config and business data into a single Firestore document
 */
export function mergeDataForFirestore(
  config: any,
  businessData: any,
  siteSlug: string
): SiteDocument {
  const now = new Date().toISOString();
  
  // Generate service IDs
  const services = (businessData.services || []).map((svc: any, index: number) => ({
    id: `servicio-${index + 1}`,
    name: svc.name || svc.nombre || 'Servicio',
    description: svc.description || svc.descripcion || '',
    price: svc.price || svc.precio || 'Consultar',
    priceFrom: svc.priceFrom || (svc.price ? parsePrice(svc.price) : undefined),
    priceTo: svc.priceTo,
    currency: 'ARS',
    duration: svc.duration || svc.duracion,
    process: svc.process || svc.proceso,
    includes: svc.includes || svc.incluye,
    featured: svc.featured || svc.destacado || index === 0,
    orden: svc.orden || index + 1
  }));
  
  // Generate team IDs
  const team = (businessData.team || []).map((member: any, index: number) => ({
    id: `miembro-${index + 1}`,
    name: member.name || member.nombre,
    role: member.role || member.cargo,
    bio: member.bio || member.biografia
  }));
  
  // Build the Firestore document
  const document: SiteDocument = {
    sitio: {
      nombre: businessData.name || config.sitio?.nombre || siteSlug,
      slug: siteSlug,
      descripcion: businessData.description || config.sitio?.descripcion || '',
      tipo: config.sitio?.tipo || 'landing',
      template: config.sitio?.template || 'landing',
      fechaCreacion: now,
      ultimaActualizacion: now
    },
    dominio: {
      principal: config.dominio?.principal || `${siteSlug}.com.ar`,
      www: config.dominio?.www ?? true,
      ssl: config.dominio?.ssl ?? true
    },
    theme: {
      colores: {
        primary: config.theme?.colores?.primary || '#2563eb',
        secondary: config.theme?.colores?.secondary,
        accent: config.theme?.colores?.accent,
        background: config.theme?.colores?.background,
        text: config.theme?.colores?.text
      },
      fuente: config.theme?.fuente || 'Inter',
      fuenteHeadings: config.theme?.fuenteHeadings,
      borderRadius: config.theme?.borderRadius || '8px'
    },
    business: {
      name: businessData.name || siteSlug,
      tagline: businessData.tagline,
      description: businessData.description,
      history: businessData.history,
      mission: businessData.mission,
      vision: businessData.vision,
      values: businessData.values,
      services,
      team,
      contact: {
        email: businessData.contact?.email || config.contacto?.email,
        phone: businessData.contact?.phone || config.contacto?.telefono,
        whatsapp: businessData.contact?.whatsapp || config.contacto?.whatsapp,
        address: businessData.contact?.address || config.contacto?.direccion,
        city: businessData.contact?.city,
        country: businessData.contact?.country,
        schedule: businessData.contact?.schedule || config.contacto?.horarios
      },
      social: {
        instagram: businessData.social?.instagram || config.redes?.instagram,
        facebook: businessData.social?.facebook || config.redes?.facebook,
        youtube: businessData.social?.youtube || config.redes?.youtube,
        linkedin: businessData.social?.linkedin || config.redes?.linkedin
      },
      differentiators: businessData.differentiators,
      targetAudience: businessData.targetAudience
    },
    seo: {
      tituloBase: config.seo?.tituloBase || `${businessData.name} - ${businessData.tagline || ''}`,
      metaDescription: config.seo?.metaDescription || businessData.description || '',
      metaKeywords: config.seo?.metaKeywords,
      ogImage: config.seo?.ogImage,
      robots: config.seo?.robots || 'index, follow'
    },
    integrations: {
      firebase: {
        projectId: config.servicios?.firebase?.proyectoId || siteSlug,
        collection: config.servicios?.firebase?.coleccion || 'contactos'
      },
      resend: config.servicios?.resend ? {
        domain: config.servicios.resend.dominio,
        emailFrom: config.servicios.resend.emailFrom
      } : undefined,
      analytics: config.servicios?.analytics
    },
    secciones: config.secciones,
    estado: {
      publicado: true,
      modo: 'production'
    }
  };
  
  return document;
}

/**
 * Save site data to a JSON file (for local development)
 * In production, this would save to Firestore
 */
export async function saveSiteData(
  outputPath: string,
  config: any,
  businessData: any,
  siteSlug: string
): Promise<void> {
  const document = mergeDataForFirestore(config, businessData, siteSlug);
  
  // Save as JSON in the output directory
  const filePath = path.join(outputPath, 'site-data.json');
  await fs.writeJson(filePath, document, { spaces: 2 });
  
  console.log(`  ✓ Saved site data to: ${path.basename(filePath)}`);
}

/**
 * Helper function to extract price number from string
 */
function parsePrice(priceStr: string): number | undefined {
  if (!priceStr) return undefined;
  
  // Extract numbers from string like "Desde $800" or "$2500-3500"
  const match = priceStr.match(/\d+/);
  if (match) {
    return parseInt(match[0], 10);
  }
  return undefined;
}

/**
 * Save to Firestore using REST API
 * Saves the site data directly to Firebase Firestore
 */
export async function saveToFirestore(
  projectId: string,
  siteSlug: string,
  document: SiteDocument,
  config?: any
): Promise<void> {
  try {
    // Try to load service account from file
    const serviceAccountPaths = [
      path.join(process.cwd(), 'firebase-service-account.json'),
      path.join(process.cwd(), 'site-generator-db-firebase-adminsdk-fbsvc-bff160769d.json'),
      path.join(__dirname, '..', 'site-generator-db-firebase-adminsdk-fbsvc-bff160769d.json')
    ];
    
    let serviceAccount = null;
    for (const saPath of serviceAccountPaths) {
      if (fs.existsSync(saPath)) {
        serviceAccount = JSON.parse(fs.readFileSync(saPath, 'utf-8'));
        break;
      }
    }
    
    if (!serviceAccount || !serviceAccount.private_key) {
      console.log(`  ⚠ No se encontró service account, guardando solo en archivo local`);
      return;
    }
    
    console.log(`  ℹ Usando service account: ${serviceAccount.client_email}`);
    
    // Get access token using JWT
    const jwt = await createSignedJWT(serviceAccount);
    if (!jwt) {
      console.log(`  ⚠ No se pudo crear JWT`);
      return;
    }
    
    // Exchange JWT for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt
      })
    });
    
    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.log(`  ⚠ Error obteniendo token: ${tokenResponse.status} - ${errorText}`);
      return;
    }
    
    const tokenData = await tokenResponse.json() as { access_token: string };
    const accessToken = tokenData.access_token;
    
    // Firestore REST API URL - use documents endpoint with document ID in path
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${serviceAccount.project_id}/databases/(default)/documents/sites/${siteSlug}`;
    
    // Prepare the document for Firestore REST API
    const firestoreDoc = {
      fields: convertToFirestoreFields(document)
    };
    
    // Make the API call - use PATCH to create or update
    const response = await fetch(firestoreUrl, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(firestoreDoc)
    });
    
    if (response.ok || response.status === 200) {
      console.log(`  ✓ Guardado en Firestore: sites/${siteSlug}`);
    } else {
      const errorText = await response.text();
      console.log(`  ⚠ Error de Firestore: ${response.status} - ${errorText}`);
      console.log(`  ℹ Los datos se guardaron solo en archivo local`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log(`  ℹ Firestore no disponible: ${errorMessage}`);
    console.log(`  ℹ Los datos se guardaron solo en archivo local`);
  }
}

/**
 * Create a signed JWT for Google OAuth
 */
async function createSignedJWT(serviceAccount: any): Promise<string | null> {
  try {
    // Dynamic import for crypto
    const crypto = await import('crypto');
    
    const now = Math.floor(Date.now() / 1000);
    const exp = now + 3600;
    
    // JWT Header
    const header = {
      alg: 'RS256',
      typ: 'JWT'
    };
    
    // JWT Payload
    const payload = {
      iss: serviceAccount.client_email,
      sub: serviceAccount.client_email,
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: exp,
      scope: 'https://www.googleapis.com/auth/cloud-platform'
    };
    
    // Base64url encode header and payload
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
    
    // Create signature input
    const signatureInput = `${encodedHeader}.${encodedPayload}`;
    
    // Sign with private key
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(signatureInput);
    
    // The private key might have escaped newlines
    const privateKey = serviceAccount.private_key.replace(/\\n/g, '\n');
    const signature = sign.sign(privateKey, 'base64url');
    
    // Complete JWT
    return `${signatureInput}.${signature}`;
  } catch (error) {
    console.log(`  ⚠ Error creando JWT: ${error}`);
    return null;
  }
}

/**
 * Convert JavaScript object to Firestore field format
 */
function convertToFirestoreFields(obj: any): any {
  const fields: any = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) {
      continue;
    }
    
    if (typeof value === 'string') {
      fields[key] = { stringValue: value };
    } else if (typeof value === 'number') {
      fields[key] = { integerValue: String(value) };
    } else if (typeof value === 'boolean') {
      fields[key] = { booleanValue: value };
    } else if (Array.isArray(value)) {
      fields[key] = {
        arrayValue: {
          values: value.map(item => convertToFirestoreFields({ value: item }).value)
        }
      };
    } else if (typeof value === 'object') {
      fields[key] = { mapValue: { fields: convertToFirestoreFields(value) } };
    }
  }
  
  return fields;
}
