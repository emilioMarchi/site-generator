/**
 * Configuración de Firebase para el cliente
 * Estructura multi-tenant: sitios/{slug}/mensajes, sitios/{slug}/servicios, etc.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy, addDoc, serverTimestamp, doc, setDoc, where } from 'firebase/firestore';

// Configuración desde variables de entorno
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Slug del sitio (definido en variables de entorno por el generador)
const SITE_SLUG = process.env.NEXT_PUBLIC_SITE_SLUG || 'default';

// Inicializar Firebase solo si hay config válida
let db: ReturnType<typeof getFirestore> | null = null;

if (typeof window !== 'undefined' && firebaseConfig.apiKey && firebaseConfig.apiKey !== 'tu_api_key') {
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
  } catch (error) {
    console.warn('Error inicializando Firebase:', error);
  }
}

export { db, SITE_SLUG };

// Tipos re-exportados para facilitar imports
export type { Servicio, ConfigNegocio, Mensaje, FormData } from '@/types';

/**
 * Obtener path de colección para el sitio (estructura multi-tenant)
 * Ejemplo: sitios/ovnicanal/mensajes
 */
function getSiteCollection(subcollection: string) {
  return `sitios/${SITE_SLUG}/${subcollection}`;
}

/**
 * Obtener servicios desde Firestore
 * Estructura: sitios/{slug}/servicios/
 */
export async function getServicios() {
  if (!db) return getDefaultServicios();
  
  try {
    const collectionPath = getSiteCollection('servicios');
    const q = query(collection(db, collectionPath), orderBy('orden', 'asc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return getDefaultServicios();
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.warn('Error fetching servicios, usando datos por defecto:', error);
    return getDefaultServicios();
  }
}

/**
 * Obtener configuración del sitio
 * Estructura: sitios/{slug}/config/
 */
export async function getConfig() {
  if (!db) return null;
  
  try {
    const collectionPath = getSiteCollection('config');
    const snapshot = await getDocs(collection(db, collectionPath));
    if (snapshot.empty) return null;
    return snapshot.docs[0].data();
  } catch (error) {
    console.warn('Error fetching config:', error);
    return null;
  }
}

/**
 * Guardar mensaje en Firestore
 * Estructura multi-tenant: sitios/{slug}/mensajes/{autoId}
 */
export async function guardarMensaje(data: { nombre: string; email: string; mensaje: string }) {
  if (!db) {
    return { success: false, error: 'Firebase no configurado' };
  }
  
  try {
    const collectionPath = getSiteCollection('mensajes');
    const docRef = await addDoc(collection(db, collectionPath), {
      ...data,
      sitioSlug: SITE_SLUG,
      fecha: serverTimestamp(),
      leido: false
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error guardando mensaje:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
  }
}

/**
 * Obtener mensajes del sitio
 * Estructura: sitios/{slug}/mensajes/
 */
export async function getMensajes() {
  if (!db) return [];
  
  try {
    const collectionPath = getSiteCollection('mensajes');
    const q = query(collection(db, collectionPath), orderBy('fecha', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.warn('Error fetching mensajes:', error);
    return [];
  }
}

// Datos por defecto cuando no hay conexión a Firebase
function getDefaultServicios() {
  return [
    { id: '1', nombre: 'Servicio 1', descripcion: 'Descripción de tu primer servicio', icono: 'star', orden: 1 },
    { id: '2', nombre: 'Servicio 2', descripcion: 'Descripción de tu segundo servicio', icono: 'star', orden: 2 },
    { id: '3', nombre: 'Servicio 3', descripcion: 'Descripción de tu tercer servicio', icono: 'star', orden: 3 },
  ];
}
