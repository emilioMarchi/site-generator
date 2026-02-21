import ContactForm from '@/components/ContactForm';
import { getSiteData, getServices, getContact, getSocial } from '@/lib/siteData';

export default function Home() {
  const siteData = getSiteData();
  const services = getServices();
  const contact = getContact();
  const social = getSocial();
  
  // Get theme colors for dynamic styling
  const colors = siteData.theme?.colores || {};
  const primary = colors.primary || '#2563eb';
  const secondary = colors.secondary || '#1e40af';
  const accent = colors.accent || '#f59e0b';

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-br py-20 px-6"
        style={{ 
          background: `linear-gradient(to bottom right, ${primary}15, ${secondary}10)` 
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {siteData.business?.name || siteData.sitio?.nombre}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {siteData.business?.tagline || siteData.sitio?.descripcion}
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="#contacto"
              className="px-8 py-4 rounded-lg font-semibold transition"
              style={{ backgroundColor: primary, color: 'white' }}
            >
              Contactanos
            </a>
            <a 
              href="#servicios"
              className="border-2 px-8 py-4 rounded-lg font-semibold transition"
              style={{ borderColor: primary, color: primary }}
            >
              Ver más
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {services.length > 0 && (
        <section id="servicios" className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Nuestros Servicios
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {services.slice(0, 6).map((service) => (
                <div key={service.id} className="p-6 bg-gray-50 rounded-xl">
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  {service.price && (
                    <p className="font-semibold" style={{ color: primary }}>
                      {service.price}
                    </p>
                  )}
                  {service.duration && (
                    <p className="text-sm text-gray-500 mt-2">
                      ⏱️ {service.duration}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {siteData.business?.description && (
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Sobre Nosotros
            </h2>
            <p className="text-lg text-gray-600">
              {siteData.business.description}
            </p>
            {siteData.business.mission && (
              <div className="mt-8 p-6 bg-white rounded-xl">
                <h3 className="text-xl font-semibold mb-2">Nuestra Misión</h3>
                <p className="text-gray-600">{siteData.business.mission}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Differentiators Section */}
      {siteData.business?.differentiators && siteData.business.differentiators.length > 0 && (
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              ¿Por qué elegirnos?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {siteData.business.differentiators.map((diff, index) => (
                <div key={index} className="flex items-start gap-3 p-4">
                  <span className="text-2xl">✓</span>
                  <p className="text-gray-700">{diff}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
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
            {contact?.phone && <p>📞 {contact.phone}</p>}
            {contact?.email && <p>📧 {contact.email}</p>}
            {contact?.address && <p>📍 {contact.address}</p>}
            {contact?.schedule && <p>🕐 {contact.schedule}</p>}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {siteData.business?.name}. Todos los derechos reservados.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            {social?.instagram && (
              <a 
                href={`https://instagram.com/${social.instagram.replace('@', '')}`} 
                className="text-gray-400 hover:text-white"
              >
                Instagram
              </a>
            )}
            {social?.facebook && (
              <a 
                href={`https://facebook.com/${social.facebook}`} 
                className="text-gray-400 hover:text-white"
              >
                Facebook
              </a>
            )}
            {social?.youtube && (
              <a 
                href={`https://youtube.com/${social.youtube}`} 
                className="text-gray-400 hover:text-white"
              >
                YouTube
              </a>
            )}
            {social?.linkedin && (
              <a 
                href={`https://linkedin.com/in/${social.linkedin}`} 
                className="text-gray-400 hover:text-white"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </footer>
    </main>
  );
}
