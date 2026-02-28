# Site Generator - Architecture Documentation

## Overview

Multi-tenant site generator that creates Next.js websites from JSON configurations. Each site is fully independent with its own Firestore database path.

---

## Project Structure

```
site-generator/
├── src/
│   └── index.ts          # CLI entry point
├── templates/
│   └── landing/          # Landing page template (Next.js 15)
│       ├── src/
│       │   ├── app/           # Next.js App Router
│       │   │   ├── admin/    # Admin panel
│       │   │   │   ├── layout.tsx
│       │   │   │   ├── page.tsx
│       │   │   │   └── config/page.tsx
│       │   │   ├── page.tsx  # Public landing page
│       │   │   └── globals.css
│       │   ├── components/   # Reusable components
│       │   ├── lib/          # Firebase clients
│       │   │   ├── firebase.ts        # Client SDK
│       │   │   └── firebase-admin.ts  # Admin SDK
│       │   ├── services/     # API services
│       │   └── types/       # TypeScript types
│       └── package.json
├── config/
│   ├── ovnicanal.json   # Example config
│   └── test-sitio.json  # Test config
└── output/              # Generated sites
```

---

## Generated Site Structure

```
output/{slug}/
├── src/
│   ├── app/
│   │   ├── admin/      # Admin panel (/admin)
│   │   └── page.tsx    # Public page (/)
│   ├── lib/
│   │   └── firebase-admin.ts
│   └── ...
├── firebase-service-account.json  # Copied from root
├── .env.local                       # Generated config
└── site-config.json                 # Original config
```

---

## Firestore Database Structure

**Root Collection:** `sites`

**Site Document:** `sites/{slug}`

```
sites/{slug}/
├── config/              # Site configuration
│   └── main            # SiteConfig document
├── sections/           # Page sections
│   └── {docId}        # Section document
├── services/           # Services/products
│   └── {docId}        # Service document
├── messages/          # Contact form submissions
│   └── {docId}        # Message document
└── media/             # Images/videos
    └── {docId}        # Media document
```

### Collections Detail

#### 1. config/main
```typescript
{
  name: string;
  description: string;
  email: string;
  phone: string;
  whatsapp?: string;
  address?: string;
  schedule?: string;
  social?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    linkedin?: string;
  };
  theme?: {
    colors: { primary, secondary, accent, success, error };
    font: string;
    borderRadius: string;
  };
  seo?: {
    title: string;
    metaDescription: string;
    robots?: string;
    ogImage?: string;
  };
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### 2. sections
```typescript
{
  id: string;
  type: 'hero' | 'features' | 'services' | 'testimonials' | 'contact' | 'faq' | 'gallery' | 'cta' | 'location';
  title?: string;
  subtitle?: string;
  content: Record<string, any>;
  order: number;
  visible: boolean;
}
```

#### 3. services
```typescript
{
  id: string;
  name: string;
  description: string;
  price?: number;
  icon?: string;
  image?: string;
  featured: boolean;
  order: number;
  active: boolean;
}
```

#### 4. messages
```typescript
{
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  date: Date;
  read: boolean;
  replied: boolean;
}
```

#### 5. media
```typescript
{
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size?: number;
  alt?: string;
  order: number;
  uploadedAt: Date;
}
```

---

## Environment Variables

### Client-side (public)
```
NEXT_PUBLIC_SITE_SLUG={slug}
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...
```

### Server-side (admin panel)
```
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY=...
```

---

## Key Files

| File | Purpose |
|------|---------|
| `templates/landing/src/lib/firebase-admin.ts` | Firestore admin SDK (server-side) |
| `templates/landing/src/types/index.ts` | TypeScript interfaces |
| `templates/landing/src/app/admin/` | Admin panel pages |
| `src/index.ts` | CLI generator |

---

## Important Notes

1. **Always use English** for types, collections, and field names
2. **Multi-tenant:** Each site has its own path: `sites/{slug}/...`
3. **Service Account:** Must be copied to each generated site as `firebase-service-account.json`
4. **Admin SDK:** Required for writing to Firestore from the admin panel
5. **Client SDK:** Used for reading data on the public site

### Tipos de sitio soportados
- Landing (página de aterrizaje)
- Ecommerce
- Portfolio

---

## Commands

```bash
# Generate a site
npm run build && node dist/index.js generate --config config/ovnicanal.json

# Run generated site
cd output/{slug}
npm install
npm run dev
```

---

## Future Considerations

- Add more admin pages (services, messages, media)
- Add authentication to admin panel
- Add image upload functionality
- Support multiple templates
- Add email notifications for new messages
