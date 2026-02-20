/**
 * Firebase Admin - Server-side Firestore access
 * Used by the admin panel for full CRUD operations
 * 
 * Structure: sites/{slug}/
 *   ├── config/        -> SiteConfig
 *   ├── sections/       -> Section[]
 *   ├── services/      -> Service[]
 *   ├── messages/       -> Message[]
 *   └── media/         -> Media[]
 */

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, DocumentData } from 'firebase-admin/firestore';
import * as fs from 'fs';
import * as path from 'path';

// Try to load service account from file, fallback to env vars
function getServiceAccount(): any {
  // Try to load from file in the same directory
  try {
    const possiblePaths = [
      path.join(process.cwd(), 'firebase-service-account.json'),
      path.join(__dirname, '../../firebase-service-account.json'),
      path.join(process.cwd(), '../firebase-service-account.json'),
    ];
    
    for (const serviceAccountPath of possiblePaths) {
      if (fs.existsSync(serviceAccountPath)) {
        const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));
        return serviceAccount;
      }
    }
  } catch (e) {
    console.error('Error loading service account from file:', e);
  }
  
  // Fallback to environment variables
  return {
    project_id: process.env.FIREBASE_PROJECT_ID,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };
}

// Site slug from environment
const SITE_SLUG = process.env.NEXT_PUBLIC_SITE_SLUG || 'default';

// Initialize Firebase Admin (only once)
let db: ReturnType<typeof getFirestore> | null = null;

function getDb() {
  if (db) return db;
  
  const account = getServiceAccount();
  
  if (!account?.project_id || !account?.client_email || !account?.private_key) {
    console.error('Firebase Admin not initialized: missing credentials');
    console.log('Account:', account);
    return null;
  }
  
  try {
    const app = getApps().length === 0 
      ? initializeApp({ credential: cert(account) })
      : getApps()[0];
    db = getFirestore(app);
    console.log('Firebase Admin initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
  }
  
  return db;
}

/**
 * Get collection path for a site
 */
function getSiteCollection(collection: string): string {
  return `sites/${SITE_SLUG}/${collection}`;
}

// ============================================
// CONFIG OPERATIONS
// ============================================

export async function getSiteConfig(): Promise<DocumentData | null> {
  const firestore = getDb();
  if (!firestore) {
    console.log('Firestore not available');
    return null;
  }
  
  try {
    const doc = await firestore.collection(getSiteCollection('config')).doc('main').get();
    return doc.exists ? doc.data() : null;
  } catch (error) {
    console.error('Error getting site config:', error);
    return null;
  }
}

export async function updateSiteConfig(data: Record<string, any>): Promise<boolean> {
  const firestore = getDb();
  if (!firestore) {
    console.log('Firestore not available for update');
    return false;
  }
  
  try {
    await firestore.collection(getSiteCollection('config')).doc('main').set(data, { merge: true });
    console.log('Config updated successfully in:', getSiteCollection('config'));
    return true;
  } catch (error) {
    console.error('Error updating site config:', error);
    return false;
  }
}

// ============================================
// SECTIONS OPERATIONS
// ============================================

export async function getSections(): Promise<DocumentData[]> {
  const firestore = getDb();
  if (!firestore) return [];
  
  try {
    const snapshot = await firestore
      .collection(getSiteCollection('sections'))
      .orderBy('order')
      .get();
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting sections:', error);
    return [];
  }
}

export async function updateSection(id: string, data: Record<string, any>): Promise<boolean> {
  const firestore = getDb();
  if (!firestore) return false;
  
  try {
    await firestore.collection(getSiteCollection('sections')).doc(id).set(data, { merge: true });
    return true;
  } catch (error) {
    console.error('Error updating section:', error);
    return false;
  }
}

// ============================================
// SERVICES OPERATIONS
// ============================================

export async function getServices(): Promise<DocumentData[]> {
  const firestore = getDb();
  if (!firestore) return [];
  
  try {
    const snapshot = await firestore
      .collection(getSiteCollection('services'))
      .orderBy('order')
      .get();
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting services:', error);
    return [];
  }
}

export async function createService(data: Record<string, any>): Promise<string | null> {
  const firestore = getDb();
  if (!firestore) return null;
  
  try {
    const docRef = await firestore.collection(getSiteCollection('services')).add(data);
    return docRef.id;
  } catch (error) {
    console.error('Error creating service:', error);
    return null;
  }
}

export async function updateService(id: string, data: Record<string, any>): Promise<boolean> {
  const firestore = getDb();
  if (!firestore) return false;
  
  try {
    await firestore.collection(getSiteCollection('services')).doc(id).set(data, { merge: true });
    return true;
  } catch (error) {
    console.error('Error updating service:', error);
    return false;
  }
}

export async function deleteService(id: string): Promise<boolean> {
  const firestore = getDb();
  if (!firestore) return false;
  
  try {
    await firestore.collection(getSiteCollection('services')).doc(id).delete();
    return true;
  } catch (error) {
    console.error('Error deleting service:', error);
    return false;
  }
}

// ============================================
// MESSAGES OPERATIONS
// ============================================

export async function getMessages(): Promise<DocumentData[]> {
  const firestore = getDb();
  if (!firestore) return [];
  
  try {
    const snapshot = await firestore
      .collection(getSiteCollection('messages'))
      .orderBy('date', 'desc')
      .get();
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting messages:', error);
    return [];
  }
}

export async function markMessageAsRead(id: string): Promise<boolean> {
  const firestore = getDb();
  if (!firestore) return false;
  
  try {
    await firestore.collection(getSiteCollection('messages')).doc(id).update({ read: true });
    return true;
  } catch (error) {
    console.error('Error marking message as read:', error);
    return false;
  }
}

export async function deleteMessage(id: string): Promise<boolean> {
  const firestore = getDb();
  if (!firestore) return false;
  
  try {
    await firestore.collection(getSiteCollection('messages')).doc(id).delete();
    return true;
  } catch (error) {
    console.error('Error deleting message:', error);
    return false;
  }
}

// ============================================
// MEDIA OPERATIONS
// ============================================

export async function getMedia(): Promise<DocumentData[]> {
  const firestore = getDb();
  if (!firestore) return [];
  
  try {
    const snapshot = await firestore
      .collection(getSiteCollection('media'))
      .orderBy('order')
      .get();
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting media:', error);
    return [];
  }
}

export async function uploadMedia(data: Record<string, any>): Promise<string | null> {
  const firestore = getDb();
  if (!firestore) return null;
  
  try {
    const docRef = await firestore.collection(getSiteCollection('media')).add(data);
    return docRef.id;
  } catch (error) {
    console.error('Error uploading media:', error);
    return null;
  }
}

export async function deleteMedia(id: string): Promise<boolean> {
  const firestore = getDb();
  if (!firestore) return false;
  
  try {
    await firestore.collection(getSiteCollection('media')).doc(id).delete();
    return true;
  } catch (error) {
    console.error('Error deleting media:', error);
    return false;
  }
}
