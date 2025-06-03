const API_BASE_URL = 'http://localhost:5230';

// Función auxiliar para manejar las respuestas de la API
const handleResponse = async (response) => {
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
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Servicios de Usuarios
export const usuariosService = {
  // Obtener lista de usuarios
  obtenerUsuarios: async (nombre = '', habilitado = true) => {
    const response = await fetch(`${API_BASE_URL}/usuarios?nombre=${nombre}&habilitado=${habilitado}`, {
      headers: getAuthHeader()
    });
    return handleResponse(response);
  },

  // Obtener un usuario específico
  obtenerUsuario: async (slug) => {
    const response = await fetch(`${API_BASE_URL}/usuarios/${slug}`, {
      headers: getAuthHeader()
    });
    return handleResponse(response);
  },

  // Registrar nuevo usuario
  registrarUsuario: async (usuario) => {
    const response = await fetch(`${API_BASE_URL}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(usuario)
    });
    return handleResponse(response);
  },

  // Modificar usuario existente
  modificarUsuario: async (slug, usuario) => {
    const response = await fetch(`${API_BASE_URL}/usuarios/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(usuario)
    });
    return handleResponse(response);
  },

  // Cambiar estado de habilitado de usuario
  cambiarHabilitado: async (slug, habilitado) => {
    const response = await fetch(`${API_BASE_URL}/usuarios/${slug}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(habilitado)
    });
    return handleResponse(response);
  }
};

// Servicios de Productos
export const productosService = {
  // Obtener lista de productos
  obtenerProductos: async (nombre = '', disponible = true) => {
    const response = await fetch(`${API_BASE_URL}/productos?nombre=${nombre}&disponible=${disponible}`, {
      headers: getAuthHeader()
    });
    return handleResponse(response);
  },

  // Obtener un producto específico
  obtenerProducto: async (id) => {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
      headers: getAuthHeader()
    });
    return handleResponse(response);
  },

  // Crear nuevo producto
  crearProducto: async (producto) => {
    const response = await fetch(`${API_BASE_URL}/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(producto)
    });
    return handleResponse(response);
  },

  // Modificar producto existente
  modificarProducto: async (id, producto) => {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(producto)
    });
    return handleResponse(response);
  },

  // Eliminar producto
  eliminarProducto: async (id) => {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return handleResponse(response);
  }
};

// Servicios de Autenticación
export const authService = {
  // Iniciar sesión
  login: async (credenciales) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credenciales)
    });
    return handleResponse(response);
  },

  // Cerrar sesión
  logout: () => {
    localStorage.removeItem('token');
  }
}; 