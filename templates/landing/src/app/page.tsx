import ContactForm from '@/components/ContactForm';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-secondary/10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {{SITIO_NOMBRE}}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {{SITIO_DESCRIPCION}}
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="#contacto"
              className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              Contactanos
            </a>
            <a 
              href="#servicios"
              className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary/5 transition"
            >
              Ver más
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="servicios" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Nuestros Servicios
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-primary/10 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Servicio 1</h3>
              <p className="text-gray-600">Descripción de tu primer servicio o característica principal.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 10.29 9 11.3.824 622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Servicio 2</h3>
              <p className="text-gray-600">Descripción de tu segundo servicio o característica.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-accent/10 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Servicio 3</h3>
              <p className="text-gray-600">Descripción de tu tercer servicio o característica.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Usa el componente con Firebase */}
      <section id="contacto" className="py-20 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Contactanos
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Escribinos y te respondemos a la brevedad
          </p>
          
          <ContactForm />
          
          <div className="mt-8 text-center text-gray-600">
            <p>📞 {'{{SITIO_TELEFONO}}'}</p>
            <p>📧 {'{{SITIO_EMAIL}}'}</p>
            <p>📍 {'{{SITIO_DIRECCION}}'}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">© 2024 {'{{SITIO_NOMBRE}}'}. Todos los derechos reservados.</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href={'https://instagram.com/{{SITIO_INSTAGRAM}}'} className="text-gray-400 hover:text-white">Instagram</a>
            <a href={'https://facebook.com/{{SITIO_FACEBOOK}}'} className="text-gray-400 hover:text-white">Facebook</a>
            <a href={'https://youtube.com/{{SITIO_YOUTUBE}}'} className="text-gray-400 hover:text-white">YouTube</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
