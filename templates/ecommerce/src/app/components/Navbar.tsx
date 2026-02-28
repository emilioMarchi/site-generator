interface NavbarProps {
  siteName?: string;
  email?: string;
  telefono?: string;
}

export const Navbar = ({ siteName = 'TIENDA' }: NavbarProps) => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-primary">{siteName.toUpperCase()}</a>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-gray-700 hover:text-primary transition-colors">Inicio</a>
            <a href="#productos" className="text-gray-700 hover:text-primary transition-colors">Productos</a>
            <a href="#categorias" className="text-gray-700 hover:text-primary transition-colors">Categorías</a>
            <a href="#contacto" className="text-gray-700 hover:text-primary transition-colors">Contacto</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-primary transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 text-gray-600 hover:text-primary transition-colors relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">0</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
