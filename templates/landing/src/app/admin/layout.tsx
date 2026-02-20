/**
 * Admin Panel Layout
 * 
 * Layout wrapper for all admin pages
 * Includes sidebar navigation
 */

import { ReactNode } from 'react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white">
        <div className="p-6">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <p className="text-sm text-gray-400">Site Manager</p>
        </div>
        
        <nav className="mt-6">
          <ul className="space-y-1">
            <li>
              <Link 
                href="/admin" 
                className="block px-6 py-2 hover:bg-gray-800"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/config" 
                className="block px-6 py-2 hover:bg-gray-800"
              >
                Configuración
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/sections" 
                className="block px-6 py-2 hover:bg-gray-800"
              >
                Secciones
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/services" 
                className="block px-6 py-2 hover:bg-gray-800"
              >
                Servicios
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/messages" 
                className="block px-6 py-2 hover:bg-gray-800"
              >
                Mensajes
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/media" 
                className="block px-6 py-2 hover:bg-gray-800"
              >
                Media
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 w-full p-6 border-t border-gray-800">
          <Link 
            href="/" 
            className="text-sm text-gray-400 hover:text-white"
          >
            ← Volver al sitio
          </Link>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
