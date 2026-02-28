'use client';

interface HeroProps {
  siteName?: string;
  description?: string;
  productCount?: number;
}

export const Hero = ({ siteName = 'tu tienda', description = 'Los mejores productos' }: HeroProps) => {
  return (
    <section id="inicio" className="relative bg-gradient-to-br from-secondary via-secondary to-gray-900 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <span className="inline-block px-4 py-1 bg-primary/30 rounded-full text-white text-sm font-medium mb-6">
              Nueva Colección 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Descubre el
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Mejor {siteName}
              </span>
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-lg">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-all transform hover:scale-105 shadow-lg">
                Ver Productos
              </button>
              <button className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/30">
                Ver Categorías
              </button>
            </div>
            
            <div className="mt-12 flex items-center justify-center md:justify-start gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-gray-400 text-sm">Productos</div>
              </div>
              <div className="w-px h-12 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10k+</div>
                <div className="text-gray-400 text-sm">Clientes</div>
              </div>
              <div className="w-px h-12 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">4.9</div>
                <div className="text-gray-400 text-sm">Rating</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=400&fit=crop" 
                  alt="Producto 1"
                  className="w-full h-48 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
                <img 
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop" 
                  alt="Producto 2"
                  className="w-full h-36 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img 
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop" 
                  alt="Producto 3"
                  className="w-full h-36 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
                <img 
                  src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop" 
                  alt="Producto 4"
                  className="w-full h-48 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-accent text-white px-6 py-3 rounded-xl shadow-lg transform rotate-3 hover:rotate-6 transition-transform">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                <span className="font-bold">50% OFF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>
  );
};
