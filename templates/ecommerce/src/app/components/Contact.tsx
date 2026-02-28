interface ContactProps {
  email?: string;
  telefono?: string;
  direccion?: string;
}

export const Contact = ({ email = 'contacto@tienda.com', telefono = '+54 11 0000-0000', direccion = 'Av. Principal 123, Ciudad' }: ContactProps) => {
  return (
    <section id="contacto" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contacto</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">¿Tienes preguntas? Estamos aquí para ayudarte</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h3>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder={email}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Asunto</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Escribe tu mensaje aquí..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-colors"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Información de contacto</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Dirección</p>
                    <p className="text-gray-600">{direccion}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">{email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Teléfono</p>
                    <p className="text-gray-600">{telefono}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Horario de atención</h3>
              <div className="space-y-2">
                <p>Lunes - Viernes: 9:00 - 20:00</p>
                <p>Sábados: 10:00 - 18:00</p>
                <p>Domingos: Cerrado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
