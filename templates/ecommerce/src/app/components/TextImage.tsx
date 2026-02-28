interface TextImageProps {
  title?: string;
  description?: string;
}

export const TextImage = ({ title = 'Productos de Calidad Premium', description = 'Nos dedicamos a ofrecerte los mejores productos' }: TextImageProps) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-xl"></div>
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=500&fit=crop"
              alt="Sobre nosotros"
              className="relative rounded-2xl shadow-2xl"
            />
          </div>
          
          <div>
            <span className="text-primary font-semibold tracking-wide uppercase text-sm">Sobre Nosotros</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
              {title}
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              {description}
            </p>
            <p className="text-gray-600 mb-8">
              Con años de experiencia en el mercado, entendemos que la satisfacción del 
              cliente es primordial. Por eso garantizamos calidad en cada producto.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Calidad Garantizada</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Envío Rápido</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Mejor Precio</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Soporte 24/7</span>
              </div>
            </div>
            
            <button className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-colors">
              Conocer Más
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
