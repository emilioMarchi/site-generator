# TODO - Próximos Pasos

## 1. Integración de IA y Datos del Negocio (RAG)

### Objetivo
Crear un documento de información detallado del negocio que la IA pueda consumir para:
- Generar contenido automáticamente
- Responder preguntas sobre el negocio
- Personalizar la experiencia del sitio

### Datos a incluir en el documento del negocio

```json
{
  "businessInfo": {
    // Identidad
    "name": "Nombre del negocio",
    "tagline": "Frase resumen del negocio",
    "description": "Descripción completa del negocio",
    "history": "Historia y origen del negocio",
    "mission": "Misión",
    "vision": "Visión",
    "values": ["valor1", "valor2"],
    
    // Servicios
    "services": [
      {
        "id": "service-1",
        "name": "Nombre del servicio",
        "description": "Descripción detallada",
        "process": "Cómo es el proceso/同行",
        "duration": "Duración típica",
        "price": "Precio",
        "includes": ["qué incluye"],
        "faq": [{"question": "?", "answer": "?"}]
      }
    ],
    
    // Equipo
    "team": [
      {
        "name": "Nombre",
        "role": "Rol",
        "bio": "Biografía",
        "photo": "url"
      }
    ],
    
    // Testimonios
    "testimonials": [
      {
        "client": "Nombre cliente",
        "text": "Testimonio",
        "rating": 5,
        "date": "2024-01-01"
      }
    ],
    
    // Contacto
    "contact": {
      "email": "email@email.com",
      "phone": "+54...",
      "whatsapp": "+54...",
      "address": "Dirección",
      "schedule": "Horarios",
      "responseTime": "Tiempo de respuesta típico"
    },
    
    // Comunicación con clientes
    "communication": {
      "preferredChannel": "whatsapp/email/phone",
      "responseTime": "24 horas",
      "language": "español",
      "tone": "formal/informal/amigable",
      "faq": [{"question": "?", "answer": "?"}]
    },
    
    // Redes sociales
    "social": {
      "instagram": "...",
      "facebook": "...",
      "youtube": "...",
      "linkedin": "..."
    },
    
    // Público objetivo
    "targetAudience": {
      "ageRange": "25-45",
      "interests": ["interés1", "interés2"],
      "painPoints": ["problema1", "problema2"]
    },
    
    // Diferenciación
    "differentiators": [
      "Por qué elegirnos 1",
      "Por qué elegirnos 2"
    ],
    
    // Certifications / Awards
    "certifications": ["certificación 1"],
    "awards": ["premio 1"],
    
    // Pricing
    "pricing": {
      "currency": "ARS/USD",
      "paymentMethods": ["efectivo", "transferencia", "mercadopago"],
      "plans": [...]
    }
  }
}
```

### Implementación

1. **Crear tipo `BusinessInfo`** en `types/index.ts`
2. **Agregar colección `business`** en Firestore
3. **Crear página admin** para editar business info
4. **API endpoint** para que la IA consuma estos datos
5. **Integrar con IA** para generación de contenido

---

## 2. Otras features pendientes

- [ ] Más páginas del admin (services, messages, media)
- [ ] Autenticación en el admin
- [ ] Subida de imágenes
- [ ] Múltiples templates
- [ ] Notificaciones por email para nuevos mensajes
- [ ] Deploy automático

---

## Notas

- Mantener siempre la estructura en inglés para Types/Firestore
- Usar español para contenido visible del negocio
- El documento de negocio se almacena en `sites/{slug}/business/main`
