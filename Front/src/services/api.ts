import axios from 'axios';
import {
  ICrearUsuario,
  IModificarUsuario,
  IBuscarUsuario,
  IHabilitadoUsuario,
  ICrearProducto,
  IModificarProducto,
  IBuscarProducto,
  ICredencialesLogin
} from '../types';

// Interfaces
export interface Usuario {
  slug: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombreUsuario: string;
  email: string;
  telefono?: string;
  direccion?: string;
  profileImage?: string;
  habilitado: boolean;
}

// Configuración base de axios
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Ajusta esto según tu backend
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para manejar tokens
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Función auxiliar para manejar las respuestas de la API
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  const token = response.headers.get('Authorization');
  if (token) {
    localStorage.setItem('token', token);
  }
  return response.json();
};

// Función para obtener el token de autenticación
const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Servicios de Usuarios
export const usuariosService = {
  // Obtener lista de usuarios
  obtenerUsuarios: async (nombre = '', habilitado = true): Promise<IBuscarUsuario[]> => {
    const response = await api.get('/usuarios', {
      params: {
        nombre,
        habilitado
      }
    });
    return response.data;
  },

  // Obtener un usuario específico
  obtenerUsuario: async (slug: string): Promise<Usuario> => {
    try {
      const response = await api.get(`/usuarios/${slug}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener usuario: ' + error.message);
    }
  },

  // Registrar nuevo usuario
  registrarUsuario: async (usuario: ICrearUsuario): Promise<string> => {
    const response = await api.post('/usuarios', usuario);
    return response.data.message;
  },

  // Modificar usuario existente
  modificarUsuario: async (slug: string, datos: Partial<Usuario>): Promise<Usuario> => {
    try {
      const response = await api.put(`/usuarios/${slug}`, datos);
      return response.data;
    } catch (error) {
      throw new Error('Error al modificar usuario: ' + error.message);
    }
  },

  // Cambiar estado de habilitado de usuario
  cambiarHabilitado: async (slug: string, habilitado: IHabilitadoUsuario): Promise<boolean> => {
    const response = await api.patch(`/usuarios/${slug}/habilitado`, habilitado);
    return response.data;
  },

  actualizarImagen: async (slug: string, imagen: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('imagen', imagen);
      
      const response = await api.post(`/usuarios/${slug}/imagen`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data.imageUrl;
    } catch (error) {
      throw new Error('Error al actualizar imagen: ' + error.message);
    }
  }
};

// Servicios de Productos
export const productosService = {
  // Obtener lista de productos
  obtenerProductos: async (nombre = '', disponible = true): Promise<IBuscarProducto[]> => {
    const response = await api.get('/productos', {
      params: {
        nombre,
        disponible
      }
    });
    return response.data;
  },

  // Obtener un producto específico
  obtenerProducto: async (id: number): Promise<IBuscarProducto> => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  },

  // Crear nuevo producto
  crearProducto: async (producto: ICrearProducto): Promise<number> => {
    const response = await api.post('/productos', producto);
    return response.data.id;
  },

  // Modificar producto existente
  modificarProducto: async (id: number, producto: IModificarProducto): Promise<IBuscarProducto> => {
    const response = await api.put(`/productos/${id}`, producto);
    return response.data;
  },

  // Eliminar producto
  eliminarProducto: async (id: number): Promise<boolean> => {
    const response = await api.delete(`/productos/${id}`);
    return response.data;
  }
};

// Servicios de Autenticación
export const authService = {
  // Iniciar sesión
  login: async (credenciales: ICredencialesLogin): Promise<void> => {
    const response = await api.post('/login', credenciales);
    return response.data;
  },

  // Cerrar sesión
  logout: () => {
    localStorage.removeItem('token');
  }
};

export default api; 