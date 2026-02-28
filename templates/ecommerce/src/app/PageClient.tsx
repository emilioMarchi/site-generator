'use client';

import { ProductCard } from './components/ProductCard';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { ProductSlider } from './components/ProductSlider';
import { TextImage } from './components/TextImage';
import { Categories } from './components/Categories';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import type { SiteConfig } from '../lib/siteData';

interface PageClientProps {
  config: SiteConfig;
}

export default function PageClient({ config }: PageClientProps) {
  const products = config.productos || [];
  const categories = config.categorias || [];
  const featuredProducts = products.slice(0, 4);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar 
        siteName={config.sitio.nombre}
        email={config.contacto.email}
        telefono={config.contacto.telefono}
      />
      
      <Hero 
        siteName={config.sitio.nombre}
        description={config.sitio.descripcion}
      />
      
      <Features />
      
      {featuredProducts.length > 0 && (
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Productos Destacados</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Descubre nuestra colección exclusiva de productos seleccionados para ti</p>
          </div>
          
          <ProductSlider products={featuredProducts} />
        </section>
      )}
      
      <TextImage 
        title="Productos de Calidad Premium"
        description={config.sitio.descripcion}
      />
      
      {categories.length > 0 && (
        <Categories categories={categories} />
      )}
      
      {products.length > 0 && (
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Todos los Productos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explora nuestro catálogo completo</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      )}
      
      <Contact 
        email={config.contacto.email}
        telefono={config.contacto.telefono}
        direccion={config.contacto.direccion}
      />
      
      <Footer 
        siteName={config.sitio.nombre}
        email={config.contacto.email}
        telefono={config.contacto.telefono}
        instagram={config.redes?.instagram}
        facebook={config.redes?.facebook}
      />
    </main>
  );
}
