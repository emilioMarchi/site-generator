/**
 * Admin - Site Configuration Page
 * 
 * Page to edit site configuration
 */

import { getSiteConfig, updateSiteConfig } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

export default async function AdminConfigPage() {
  const config = await getSiteConfig();
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Configuración del sitio</h1>
      
      <form action={async (formData: FormData) => {
        'use server';
        
        const data = {
          name: formData.get('name'),
          description: formData.get('description'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          whatsapp: formData.get('whatsapp'),
          address: formData.get('address'),
          schedule: formData.get('schedule'),
          active: formData.get('active') === 'on',
          updatedAt: new Date(),
        };
        
        await updateSiteConfig(data);
      }}>
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del sitio
            </label>
            <input
              type="text"
              name="name"
              defaultValue={config?.name || ''}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              name="description"
              defaultValue={config?.description || ''}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={config?.email || ''}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                defaultValue={config?.phone || ''}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp
              </label>
              <input
                type="tel"
                name="whatsapp"
                defaultValue={config?.whatsapp || ''}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección
              </label>
              <input
                type="text"
                name="address"
                defaultValue={config?.address || ''}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Horarios
            </label>
            <input
              type="text"
              name="schedule"
              defaultValue={config?.schedule || ''}
              placeholder="Lun-Vie: 9am-6pm"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="active"
              id="active"
              defaultChecked={config?.active !== false}
              className="mr-2"
            />
            <label htmlFor="active" className="text-sm text-gray-700">
              Sitio activo
            </label>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
