import React from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '1rem', borderBottom: '1px solid #ddd', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontWeight: 'bold' }}>Portfolio Template</div>
          <nav>
            <a href="#projects" style={{ marginRight: 12 }}>Projects</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>
        {children}
        <footer style={{ padding: '1rem', borderTop: '1px solid #ddd', marginTop: 20, textAlign: 'center' }}>
          © {new Date().getFullYear()} Portfolio Template
        </footer>
      </body>
    </html>
  );
}
