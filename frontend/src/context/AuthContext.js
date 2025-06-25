import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/api'; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem('adminAuth');
    const storedSecretKey = localStorage.getItem('adminSecretKey');

    if (storedAuth && storedSecretKey) {
      const revalidateAuth = async () => {
        try {
          await api.get('/auth/validate-key');
          setUser({ isAuthenticated: true });
        } catch (error) {
          console.error('Revalidação da chave secreta falhou:', error);
          logout();
        } finally {
          setLoading(false);
        }
      };
      revalidateAuth();
    } else {
      setLoading(false); 
    }
  }, []);

  const loginWithSecretKey = async (secretKey) => { 
    try {
      localStorage.setItem('adminSecretKey', secretKey);

      const response = await api.get('/auth/validate-key');

      localStorage.setItem('adminAuth', 'true'); 
      setUser({ isAuthenticated: true });
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Login com chave secreta falhou:', error.response?.data || error);
      logout(); 
      throw new Error(error.response?.data?.message || 'Chave secreta inválida.');
    }
  };

  const logout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminSecretKey');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithSecretKey, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};