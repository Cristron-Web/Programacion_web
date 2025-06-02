import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Limpiar cualquier otro dato de la sesión
    localStorage.removeItem('chats');
  };

  const register = (userData) => {
    // Simular guardado en una base de datos
    const newUser = {
      ...userData,
      id: Date.now()
    };
    localStorage.setItem('registeredUsers', JSON.stringify([
      ...JSON.parse(localStorage.getItem('registeredUsers') || '[]'),
      newUser
    ]));
    login(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}; 