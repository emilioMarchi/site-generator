/**
 * Servicio de formulario de contacto
 * Maneja el envío y guardado de mensajes en Firestore
 */

import { guardarMensaje as guardarEnFirebase } from '@/lib/firebase';
import { FormData, Mensaje } from '@/types';

/**
 * Guardar un mensaje del formulario de contacto
 * @param data - Datos del formulario
 * @returns - ID del documento creado o error
 */
export async function guardarMensaje(data: FormData): Promise<{ success: boolean; id?: string; error?: string }> {
  // Usar la función de firebase.ts que maneja multi-tenant
  const resultado = await guardarEnFirebase({
    nombre: data.nombre,
    email: data.email,
    mensaje: data.mensaje
  });
  
  return resultado;
}

/**
 * Convertir documento de Firestore a tipo Mensaje
 */
export function docToMensaje(doc: QueryDocumentSnapshot<DocumentData>): Mensaje {
  const data = doc.data();
  return {
    id: doc.id,
    nombre: data.nombre,
    email: data.email,
    mensaje: data.mensaje,
    fecha: data.fecha?.toDate() || new Date(),
    leido: data.leido || false
  };
}
