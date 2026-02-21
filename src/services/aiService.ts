/**
 * AI Service - Google Gemini Integration
 * 
 * Reads business documents and structures data using AI
 */

import fs from 'fs-extra';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Types
export interface BusinessData {
  name: string;
  tagline?: string;
  description?: string;
  history?: string;
  mission?: string;
  vision?: string;
  values?: string[];
  services?: Array<{
    name: string;
    description: string;
    price?: string;
    process?: string;
    duration?: string;
    includes?: string[];
  }>;
  team?: Array<{
    name: string;
    role: string;
    bio?: string;
  }>;
  contact?: {
    email?: string;
    phone?: string;
    whatsapp?: string;
    address?: string;
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
}

// Gemini API response types
interface GeminiCandidate {
  content: {
    parts: Array<{
      text: string;
    }>;
  };
}

interface GeminiResponse {
  candidates?: GeminiCandidate[];
}

// Prompt for Gemini
const STRUCTURE_PROMPT = `Eres un asistente experto en estructurar información de negocios para sitios web.

Tu tarea es analizar el siguiente texto (notas del negocio) y transformarlo en un JSON estructurado con la siguiente estructura:

{
  "name": "Nombre del negocio",
  "tagline": "Frase breve que resuma el negocio (máx 10 palabras)",
  "description": "Descripción de 2-3 oraciones del negocio",
  "history": "Historia breve del negocio",
  "mission": "Misión del negocio",
  "vision": "Visión del negocio",
  "values": ["valor1", "valor2", "valor3"],
  "services": [
    {
      "name": "Nombre del servicio",
      "description": "Descripción del servicio",
      "price": "Precio (ej: $5000 o desde $5000)",
      "process": "Cómo es el proceso de este servicio",
      "duration": "Duración típica",
      "includes": ["qué incluye este servicio"]
    }
  ],
  "team": [
    {
      "name": "Nombre del miembro",
      "role": "Rol o cargo",
      "bio": "Breve biografía"
    }
  ],
  "contact": {
    "email": "email@email.com",
    "phone": "+54 9 11 1234-5678",
    "whatsapp": "+54 9 11 1234-5678",
    "address": "Dirección completa",
    "schedule": "Horarios de atención"
  },
  "social": {
    "instagram": "@usuario",
    "facebook": "usuario",
    "youtube": "canal",
    "linkedin": "empresa"
  },
  "differentiators": [
    "Por qué elegir este negocio 1",
    "Por qué elegir este negocio 2"
  ],
  "targetAudience": {
    "ageRange": "Rango de edad",
    "interests": ["interés1", "interés2"],
    "painPoints": ["problema que resuelve1", "problema que resuelve2"]
  }
}

INSTRUCCIONES IMPORTANTES:
1. Solo retorna JSON válido, sin texto adicional
2. Usa null si no hay información para un campo
3. Para "services", identifica todos los servicios mencionados
4. Para "values", deduce los valores del negocio basándote en la descripción
5. Para "differentiators", identifica ventajas competitivas mencionadas
6. El idioma del contenido debe ser ESPAÑOL
7. NO inventes información que no esté en el texto

Texto del negocio:
`;

/**
 * Extract text from various document formats
 */
async function extractTextFromDocument(filePath: string): Promise<string> {
  const ext = path.extname(filePath).toLowerCase();
  
  if (ext === '.txt' || ext === '.md') {
    return fs.readFile(filePath, 'utf-8');
  }
  
  if (ext === '.docx') {
    const mammoth = await import('mammoth');
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  }
  
  if (ext === '.pdf') {
    const pdfParse = await import('pdf-parse');
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse.default(dataBuffer);
    return data.text;
  }
  
  throw new Error(`Unsupported file format: ${ext}`);
}

/**
 * Call Gemini API to structure business data
 */
async function callGemini(content: string): Promise<BusinessData> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured');
  }
  
  // Use the official Google library
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-lite-001'
  });
  
  const result = await model.generateContent(STRUCTURE_PROMPT + content);
  const text = result.response.text();
  
  if (!text) {
    throw new Error('No response from Gemini');
  }
  
  // Parse JSON (handle potential markdown code blocks)
  const jsonStr = text.replace(/```json|```/g, '').trim();
  return JSON.parse(jsonStr);
}

/**
 * Parse business data from text using rule-based extraction
 * This is a fallback when AI is not available
 */
function parseBusinessDataFromText(content: string): BusinessData {
  const data: BusinessData = {
    name: 'Mi Negocio'
  };
  
  // Extract business name - look for patterns like "NOTAS PARA" or business name
  const nameMatch = content.match(/(?:NOTAS PARA(?: EL)?|Negocio:|Empresa:)\s*["']?([^"'\n-]+)["']?/i);
  if (nameMatch) {
    data.name = nameMatch[1].trim();
  }
  
  // Extract description - look for "De qué trata" or similar
  const descMatch = content.match(/(?:De qué trata|Qué es|Descripción):?\s*([^\n.]{20,200})/i);
  if (descMatch) {
    data.description = descMatch[1].trim();
    data.tagline = data.description.substring(0, 60);
  }
  
  // Extract mission
  const missionMatch = content.match(/(?:Misión|我们的使命):?\s*([^\n.]{10,200})/i);
  if (missionMatch) {
    data.mission = missionMatch[1].trim();
  }
  
  // Extract services - look for numbered lists or bullet points
  const services: BusinessData['services'] = [];
  const servicePatterns = [
    /(\d+)[.)\-]\s*([^\n-]{3,50})[–\-:]\s*([^\n.]{5,150})/gi,
    /[-•]\s*([^\n-]{3,50})[–\-:]\s*([^\n.]{5,150})/gi
  ];
  
  for (const pattern of servicePatterns) {
    const matches = [...content.matchAll(pattern)];
    for (const match of matches) {
      const name = match[2] || match[1];
      const desc = match[3] || '';
      
      // Look for price nearby
      const priceMatch = content.match(new RegExp(`${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^\\n]*?\\$?\\d+[,.]?\\d*`, 'i'));
      const price = priceMatch ? priceMatch[0].match(/\$[\d,]+/)?.[0] : undefined;
      
      services.push({
        name: name.trim(),
        description: desc.trim(),
        price: price || 'Consultar'
      });
    }
  }
  
  if (services.length > 0) {
    data.services = services;
  }
  
  // Extract contact info
  const phoneMatch = content.match(/(?:Tel|Phone|Wapp|WhatsApp):?\s*(\+?[\d\s\-()]+)/i);
  const emailMatch = content.match(/Email[:\s]*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i);
  const addressMatch = content.match(/(?:Dirección|Address|Ubicación):?\s*([^\n]{10,100})/i);
  
  data.contact = {};
  if (phoneMatch) {
    data.contact.phone = phoneMatch[1].trim();
    data.contact.whatsapp = phoneMatch[1].trim();
  }
  if (emailMatch) {
    data.contact.email = emailMatch[1].trim();
  }
  if (addressMatch) {
    data.contact.address = addressMatch[1].trim();
  }
  
  // Extract social media
  const instagramMatch = content.match(/Instagram[:\s]*@?([a-zA-Z0-9._]+)/i);
  const facebookMatch = content.match(/Facebook[:\s]*([a-zA-Z0-9._-]+)/i);
  
  data.social = {};
  if (instagramMatch) {
    data.social.instagram = '@' + instagramMatch[1].replace('@', '');
  }
  if (facebookMatch) {
    data.social.facebook = facebookMatch[1];
  }
  
  // Extract differentiators - look for key phrases
  data.differentiators = [];
  const diffPatterns = [
    /calidad/gi,
    /local/gi,
    /orgánico/gi,
    /especialidad/gi,
    /apoyo/gi,
    /transparencia/gi,
    /comunidad/gi
  ];
  
  for (const pattern of diffPatterns) {
    const matches = content.match(pattern);
    if (matches && !data.differentiators?.includes(matches[0])) {
      data.differentiators.push(matches[0]);
    }
  }
  
  // Default values if nothing found
  if (!data.name) data.name = 'Mi Negocio';
  if (!data.tagline) data.tagline = 'Especialistas en lo que hacemos';
  if (!data.description) data.description = 'Un negocio dedicado a ofrecer productos y servicios de calidad.';
  
  return data;
}

/**
 * Process business document and return structured data
 */
export async function processBusinessDocument(documentPath?: string): Promise<BusinessData | null> {
  // If no document, return null (caller will use demo data)
  if (!documentPath || !fs.existsSync(documentPath)) {
    return null;
  }
  
  console.log(`  📄 Processing document: ${path.basename(documentPath)}`);
  
  // Check if it's a JSON file - use it directly
  const ext = path.extname(documentPath).toLowerCase();
  
  if (ext === '.json') {
    console.log(`  ✓ Using pre-processed JSON data`);
    const jsonContent = await fs.readJson(documentPath);
    return jsonContent as BusinessData;
  }
  
  // For text/PDF/DOCX files, try to use AI
  try {
    // Extract text from document
    const content = await extractTextFromDocument(documentPath);
    
    // Send to Gemini
    const structuredData = await callGemini(content);
    
    return structuredData;
  } catch (error) {
    console.log(`  ⚠ AI processing failed, trying local parser...`);
    
    // Try to find a corresponding JSON file
    const baseName = documentPath.replace(/\.[^/.]+$/, '');
    const jsonPath = `${baseName}-business.json`;
    
    if (fs.existsSync(jsonPath)) {
      console.log(`  ✓ Found pre-processed JSON: ${path.basename(jsonPath)}`);
      const jsonContent = await fs.readJson(jsonPath);
      return jsonContent as BusinessData;
    }
    
    // Try local parser as last resort
    console.log(`  ⚡ Using local parser to extract data...`);
    const content = await extractTextFromDocument(documentPath);
    const parsedData = parseBusinessDataFromText(content);
    
    // Save parsed data for future use
    const outputPath = `${baseName}-business.json`;
    await fs.writeJson(outputPath, parsedData, { spaces: 2 });
    console.log(`  ✓ Saved parsed data to: ${path.basename(outputPath)}`);
    
    return parsedData;
  }
}

/**
 * Generate demo business data (used when no document is provided)
 */
export function getDemoBusinessData(siteName: string = 'Demo Business'): BusinessData {
  return {
    name: siteName,
    tagline: 'Calidad y profesionalismo a tu servicio',
    description: `Bienvenido a ${siteName}. Nos especializamos en ofrecer productos y servicios de alta calidad para satisfacer las necesidades de nuestros clientes.`,
    history: 'Una empresa dedicada a ofrecer la mejor experiencia a sus clientes.',
    mission: 'Brindar soluciones de calidad que superen las expectativas de nuestros clientes.',
    vision: 'Ser referente en nuestro sector, innovando constantemente.',
    values: ['Calidad', 'Compromiso', 'Innovación', 'Atención al cliente'],
    services: [
      {
        name: 'Servicio Principal',
        description: 'Nuestro servicio principal enfocado en la satisfacción del cliente.',
        price: 'Consultar',
        process: 'Contacto inicial -> Evaluación -> Propuesta -> Ejecución',
        duration: 'Según proyecto',
        includes: ['Atención personalizada', 'Soporte post-servicio']
      },
      {
        name: 'Consultoría',
        description: 'Asesoría profesional para tu negocio o proyecto.',
        price: 'Desde $5000',
        process: 'Diagnóstico -> Plan de acción -> Implementación',
        duration: '1-4 semanas',
        includes: ['Análisis completo', 'Informe detallado', 'Recomendaciones']
      }
    ],
    team: [
      {
        name: 'Equipo Demo',
        role: 'Profesionales dedicados',
        bio: 'Nuestro equipo está comprometido con la excelencia.'
      }
    ],
    contact: {
      email: 'contacto@demobusiness.com',
      phone: '+54 9 11 0000-0000',
      whatsapp: '+54 9 11 0000-0000',
      address: 'Dirección demo 123, Ciudad',
      schedule: 'Lun-Vie: 9am-6pm'
    },
    social: {
      instagram: '@demobusiness',
      facebook: 'demobusiness'
    },
    differentiators: [
      'Atención personalizada a cada cliente',
      'Equipo profesional y experimentado',
      'Compromiso con la calidad'
    ],
    targetAudience: {
      ageRange: '25-55',
      interests: ['Calidad', 'Profesionalismo', 'Confianza'],
      painPoints: ['Necesitan soluciones rápidas', 'Buscan confiabilidad']
    }
  };
}
