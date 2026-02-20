// Tipos de datos para la aplicación

export interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  icono?: string;
  imagen?: string;
  orden: number;
}

export interface ConfigNegocio {
  nombre: string;
  email: string;
  telefono: string;
  whatsapp?: string;
  direccion?: string;
  horarios?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
}

export interface Mensaje {
  id?: string;
  nombre: string;
  email: string;
  mensaje: string;
  fecha: Date;
  leido: boolean;
}

export interface FormData {
  nombre: string;
  email: string;
  mensaje: string;
}
