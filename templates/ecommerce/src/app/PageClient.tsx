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

interface PageClientProps {
  data: any;
}

export default function PageClient({ data }: PageClientProps) {
  const products = data.business?.services?.map((s: any, idx: number) => ({
    id: idx + 1,
    title: s.name,
    name: s.name,
    description: s.description,
    price: s.price || 'Consultar',
    image: s.image || '',
    category: s.category,
    featured: s.featured
  })) || [];
  
  const featuredProducts = products.filter((p: any) => p.featured);
  const categories: any[] = [];
  const sitio = data.sitio;
  const contacto = data.business?.contact;
  const social = data.business?.social;
  
  const displayFeatured = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar 
        siteName={sitio.nombre}
        email={contacto?.email || ''}
        telefono={contacto?.phone}
      />
      
      <Hero 
        siteName={sitio.nombre}
        description={sitio.descripcion}
      />
      
      <Features />
      
      {displayFeatured.length > 0 && (
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Productos Destacados</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Descubre nuestra colección exclusiva de productos seleccionados para ti</p>
          </div>
          
          <ProductSlider products={displayFeatured} />
        </section>
      )}
      
      <TextImage 
        title="Productos de Calidad Premium"
        description={sitio.descripcion}
      />
      
      {products.length > 0 && (
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Todos los Productos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explora nuestro catálogo completo</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      )}
      
      <Contact 
        email={contacto?.email || ''}
        telefono={contacto?.phone}
        direccion={contacto?.address}
      />
      
      <Footer 
        siteName={sitio.nombre}
        email={contacto?.email || ''}
        telefono={contacto?.phone}
        instagram={social?.instagram}
        facebook={social?.facebook}
      />
    </main>
  );
}
