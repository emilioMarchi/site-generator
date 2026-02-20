/**
 * Admin Dashboard
 * 
 * Main admin page showing overview of the site
 */

import { getSiteConfig, getMessages, getServices } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Fetch data from Firestore
  const [config, messages, services] = await Promise.all([
    getSiteConfig(),
    getMessages(),
    getServices(),
  ]);

  const unreadMessages = messages.filter((m: any) => !m.read).length;
  const totalServices = services.length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Mensajes sin leer</h3>
          <p className="text-3xl font-bold text-blue-600">{unreadMessages}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Servicios</h3>
          <p className="text-3xl font-bold text-green-600">{totalServices}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Estado del sitio</h3>
          <p className="text-3xl font-bold text-purple-600">
            {config?.active ? 'Activo' : 'Inactivo'}
          </p>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Acciones rápidas</h2>
        <div className="flex gap-4">
          <a 
            href="/admin/config" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Editar configuración
          </a>
          <a 
            href="/admin/services" 
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Gestionar servicios
          </a>
          <a 
            href="/admin/messages" 
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Ver mensajes
          </a>
        </div>
      </div>
    </div>
  );
}
