export default function Page() {
  return (
    <main style={{ padding: '1rem' }}>
      <section id="hero" style={{ padding: '2rem 0' }}>
        <h2>Landing Hero</h2>
        <p>Este es un ejemplo de landing inspirado en la base de landing existente.</p>
      </section>
      <section id="features" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', background: '#fff' }}>
          <h3>Característica 1</h3>
          <p>Descripción breve.</p>
        </div>
        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', background: '#fff' }}>
          <h3>Característica 2</h3>
          <p>Descripción breve.</p>
        </div>
        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', background: '#fff' }}>
          <h3>Característica 3</h3>
          <p>Descripción breve.</p>
        </div>
      </section>
      <section id="cta" style={{ padding: '2rem 0' }}>
        <button style={{ padding: '0.8rem 1.6rem', borderRadius: '8px', border: 'none', background: '#2563eb', color: '#fff' }}>Empieza</button>
      </section>
    </main>
  );
}
