import { getSiteData, getBusiness, getProjects, getFeaturedProjects, getContact, getSocial, getTheme } from '@/lib/siteData';

export default function Page() {
  const data = getSiteData();
  const business = getBusiness();
  const projects = getProjects();
  const featuredProjects = getFeaturedProjects();
  const contact = getContact();
  const social = getSocial();
  const theme = getTheme();
  
  const primaryColor = theme?.colores?.primary || '#2563eb';
  const secondaryColor = theme?.colores?.secondary || '#1e40af';

  const displayProjects = featuredProjects && featuredProjects.length > 0 
    ? featuredProjects 
    : projects ? projects.slice(0, 6) : [];

  return (
    <main style={{ padding: '1rem', fontFamily: theme?.fuente || 'Inter, sans-serif' }}>
      <section id="hero" style={{ 
        padding: '4rem 0', 
        textAlign: 'center', 
        background: theme?.colores?.background || '#fff' 
      }}>
        <h1 style={{ fontSize: '2.5rem', color: primaryColor, marginBottom: '1rem' }}>
          {business?.name || data.sitio?.nombre || 'Mi Portfolio'}
        </h1>
        <p style={{ fontSize: '1.25rem', color: theme?.colores?.text || '#4b5563', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          {business?.tagline || business?.description || data.sitio?.descripcion || 'Colección de proyectos destacados'}
        </p>
      </section>

      {displayProjects && displayProjects.length > 0 && (
        <section id="projects" style={{ padding: '3rem 0' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: primaryColor }}>
            Proyectos
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {displayProjects.map((project: any, idx: number) => (
              <article key={idx} style={{ 
                border: '1px solid #e5e7eb', 
                borderRadius: theme?.borderRadius || '8px', 
                overflow: 'hidden',
                background: '#fff',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                {project.image && (
                  <div style={{ 
                    height: '200px', 
                    background: `url(${project.image}) center/cover`,
                    backgroundColor: '#e5e7eb'
                  }} />
                )}
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ marginTop: 0, color: secondaryColor }}>{project.title}</h3>
                  <p style={{ color: theme?.colores?.text || '#6b7280' }}>{project.description}</p>
                  {project.tags && project.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                      {project.tags.map((tag: string, tagIdx: number) => (
                        <span key={tagIdx} style={{ 
                          padding: '0.25rem 0.75rem', 
                          background: '#f3f4f6', 
                          borderRadius: '9999px',
                          fontSize: '0.875rem',
                          color: '#6b7280'
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {project.link && (
                    <a 
                      href={project.link} 
                      style={{ 
                        display: 'inline-block',
                        marginTop: '1rem', 
                        color: primaryColor,
                        fontWeight: '500'
                      }}
                    >
                      Ver proyecto
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section id="about" style={{ padding: '3rem 0', background: '#f9fafb' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: primaryColor }}>
          Sobre Mí
        </h2>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: theme?.colores?.text || '#4b5563' }}>
            {business?.description || 'Descripción de mi trabajo y experiencia'}
          </p>
        </div>
      </section>

      <section id="contact" style={{ padding: '3rem 0', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '2rem', color: primaryColor }}>Contacto</h2>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {contact?.email && <p>Email: {contact.email}</p>}
          {contact?.phone && <p>Tel: {contact.phone}</p>}
          {contact?.whatsapp && <p>WhatsApp: {contact.whatsapp}</p>}
          
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            {social?.instagram && (
              <a href={`https://instagram.com/${social.instagram}`} style={{ color: primaryColor }}>Instagram</a>
            )}
            {social?.facebook && (
              <a href={`https://facebook.com/${social.facebook}`} style={{ color: primaryColor }}>Facebook</a>
            )}
            {social?.linkedin && (
              <a href={`https://linkedin.com/in/${social.linkedin}`} style={{ color: primaryColor }}>LinkedIn</a>
            )}
            {social?.twitter && (
              <a href={`https://twitter.com/${social.twitter}`} style={{ color: primaryColor }}>Twitter</a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
