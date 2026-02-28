interface FooterProps {
  siteName?: string;
  email?: string;
  telefono?: string;
  instagram?: string;
  facebook?: string;
}

export const Footer = ({ siteName = 'MI TIENDA', email = 'contacto@tienda.com', telefono = '+54 11 0000-0000', instagram, facebook }: FooterProps) => {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">{siteName.toUpperCase()}</h3>
            <p className="text-gray-400 mb-6">
              Tu tienda online de confianza con los mejores productos y precios competitivos.
            </p>
            <div className="flex gap-4">
              {instagram && (
                <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              {facebook && (
                <a href={`https://facebook.com/${facebook}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.271c0-3.065 1.892-4.788 4.687-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Inicio</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Productos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Categorías</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Ayuda</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Envíos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Devoluciones</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Política de Privacidad</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Suscríbete para recibir ofertas exclusivas</p>
            <form className="flex">
              <input
                type="email"
                placeholder={email}
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-l-lg focus:outline-none focus:border-primary"
              />
              <button className="px-6 py-3 bg-primary text-white rounded-r-lg hover:opacity-90 transition-colors">
                OK
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2026 {siteName}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
