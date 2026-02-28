import React from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
          <h1>Landing Template</h1>
        </header>
        {children}
        <footer style={{ padding: '1rem', borderTop: '1px solid #ddd', textAlign: 'center' }}>
          © {new Date().getFullYear()} Landing Template
        </footer>
      </body>
    </html>
  );
}
