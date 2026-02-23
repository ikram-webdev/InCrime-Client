import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Create an axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://incrime-server.onrender.com',
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('incrime_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // Instance headers update karein
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchCurrentUser();
    } else {
      delete api.defaults.headers.common['Authorization'];
      setLoading(false);
    }
  }, [token]);

  const fetchCurrentUser = async () => {
    try {
      const { data } = await api.get('/api/auth/me');
      if (data.success) setUser(data.user);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    // Axios ki jagah 'api' instance use karein
    const { data } = await api.post('/api/auth/login', { username, password });
    if (data.success) {
      localStorage.setItem('incrime_token', data.token);
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  const register = async (formData) => {
    const { data } = await api.post('/api/auth/register', formData);
    if (data.success) {
      localStorage.setItem('incrime_token', data.token);
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  const logout = () => {
    localStorage.removeItem('incrime_token');
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{
      user, token, loading,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      login, register, logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);