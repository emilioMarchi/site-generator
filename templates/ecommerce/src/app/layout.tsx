import './globals.css';
import { getSiteData } from '../lib/siteData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '{{SEO_TITULO}}',
  description: '{{SEO_DESCRIPCION}}',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const config = getSiteData();
  
  const siteName = config.sitio.nombre;
  const seoTitle = config.seo.tituloBase || `${siteName} | Tu tienda online`;
  const seoDesc = config.seo.metaDescription || config.sitio.descripcion || '';
  
  return (
    <html lang="es">
      <head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
