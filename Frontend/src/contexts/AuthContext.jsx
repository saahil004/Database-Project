import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedUserStr = localStorage.getItem('authUser');
    if (savedToken && savedUserStr) {
      try {
        const savedUser = JSON.parse(savedUserStr);
        setToken(savedToken);
        setUser(savedUser);
      } catch (e) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
      }
    }
    setLoading(false);
  }, []);

  const login = (responseData) => {
    const { token, data } = responseData;
    const fullUser = { 
      ...data, 
      role: data.customer_id ? 'customer' : (data.admin_id ? 'admin' : (data.deliveryguy_id ? 'deliveryguy' : null)),
      customer_id: data.customer_id,
      admin_id: data.admin_id,
      deliveryguy_id: data.deliveryguy_id
    };
    localStorage.setItem('authToken', token);
    localStorage.setItem('authUser', JSON.stringify(fullUser));
    setToken(token);
    setUser(fullUser);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setToken(null);
    setUser(null);
  };

  const value = {
    token,
    user,
    login,
    logout,
    isAuthenticated: !!token && !!user && !!user.role,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
