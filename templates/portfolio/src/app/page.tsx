export default function Page() {
  const projects = [
    { title: 'Proyecto A', description: 'Descripción breve A' },
    { title: 'Proyecto B', description: 'Descripción breve B' },
    { title: 'Proyecto C', description: 'Descripción breve C' }
  ];
  return (
    <main style={{ padding: '1rem' }}>
      <section id="hero" style={{ padding: '1rem 0' }}>
        <h2>Portfolio</h2>
        <p>Ejemplo de portfolio con proyectos destacados.</p>
      </section>
      <section id="projects" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {projects.map((p, idx) => (
          <article key={idx} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', background: '#fff' }}>
            <h3 style={{ marginTop: 0 }}>{p.title}</h3>
            <p>{p.description}</p>
          </article>
        ))}
      </section>
      <section id="contact" style={{ marginTop: 40 }}>
        <h3>Contacto</h3>
        <p>Ingrese datos de contacto en la configuración base.</p>
      </section>
    </main>
  );
}
