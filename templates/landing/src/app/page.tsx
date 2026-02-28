import { getSiteData, getBusiness, getServices, getFeaturedServices, getContact, getSocial, getTheme } from '@/lib/siteData';

export default function Page() {
  const data = getSiteData();
  const business = getBusiness();
  const services = getServices();
  const featuredServices = getFeaturedServices();
  const contact = getContact();
  const social = getSocial();
  const theme = getTheme();
  
  const primaryColor = theme?.colores?.primary || '#2563eb';
  const secondaryColor = theme?.colores?.secondary || '#1e40af';
  const accentColor = theme?.colores?.accent || '#f59e0b';

  return (
    <main style={{ padding: '1rem', fontFamily: theme?.fuente || 'Inter, sans-serif' }}>
      <section id="hero" style={{ padding: '4rem 0', textAlign: 'center', background: theme?.colores?.background || '#fff' }}>
        <h1 style={{ fontSize: '2.5rem', color: primaryColor, marginBottom: '1rem' }}>
          {business?.name || data.sitio?.nombre || 'Mi Negocio'}
        </h1>
        <p style={{ fontSize: '1.25rem', color: theme?.colores?.text || '#4b5563', marginBottom: '2rem' }}>
          {business?.tagline || business?.description || data.sitio?.descripcion || 'Tu mejor opción'}
        </p>
        <button style={{ 
          padding: '1rem 2rem', 
          borderRadius: theme?.borderRadius || '8px', 
          border: 'none', 
          background: primaryColor, 
          color: '#fff',
          fontSize: '1rem',
          cursor: 'pointer'
        }}>
          Contactanos
        </button>
      </section>

      {(services?.length > 0 || featuredServices?.length > 0) && (
        <section id="features" style={{ padding: '3rem 0' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: primaryColor }}>
            Nuestros Servicios
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {(featuredServices?.length > 0 ? featuredServices : services?.slice(0, 6)).map((service: any, idx: number) => (
              <article key={idx} style={{ 
                border: '1px solid #e5e7eb', 
                padding: '1.5rem', 
                borderRadius: theme?.borderRadius || '8px', 
                background: '#fff',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ marginTop: 0, color: secondaryColor }}>{service.name}</h3>
                <p style={{ color: theme?.colores?.text || '#6b7280' }}>{service.description}</p>
                {service.price && (
                  <p style={{ fontWeight: 'bold', color: accentColor }}>{service.price}</p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {business?.values && business.values.length > 0 && (
        <section id="values" style={{ padding: '3rem 0', background: '#f9fafb' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: primaryColor }}>
            Nuestros Valores
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', textAlign: 'center' }}>
            {business.values.map((value: string, idx: number) => (
              <div key={idx} style={{ padding: '1rem' }}>
                <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>{value}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section id="contact" style={{ padding: '3rem 0', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '2rem', color: primaryColor }}>Contacto</h2>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {contact?.email && <p>📧 {contact.email}</p>}
          {contact?.phone && <p>📞 {contact.phone}</p>}
          {contact?.whatsapp && <p>💬 {contact.whatsapp}</p>}
          {contact?.address && <p>📍 {contact.address}</p>}
          {contact?.schedule && <p>🕐 {contact.schedule}</p>}
          
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            {social?.instagram && (
              <a href={`https://instagram.com/${social.instagram}`} style={{ color: primaryColor }}>Instagram</a>
            )}
            {social?.facebook && (
              <a href={`https://facebook.com/${social.facebook}`} style={{ color: primaryColor }}>Facebook</a>
            )}
            {social?.youtube && (
              <a href={`https://youtube.com/${social.youtube}`} style={{ color: primaryColor }}>YouTube</a>
            )}
            {social?.linkedin && (
              <a href={`https://linkedin.com/in/${social.linkedin}`} style={{ color: primaryColor }}>LinkedIn</a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
