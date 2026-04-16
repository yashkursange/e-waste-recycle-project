import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setError(null);
      } catch (err) {
        console.error('Failed to parse stored user:', err);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setError('Session corrupted. Please login again.');
      }
    }
    setLoading(false);
  }, []);

  /**
   * Login - stores user data and token in localStorage
   * @param {Object} userData - User object with id, email, name, etc.
   * @param {string} token - JWT token from backend
   */
  const login = (userData, token) => {
    try {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setError(null);
    } catch (err) {
      console.error('Failed to save auth data:', err);
      setError('Failed to save login data');
    }
  };

  /**
   * Logout - clears user data and token
   */
  const logout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setError(null);
    } catch (err) {
      console.error('Failed to logout:', err);
      setError('Failed to logout');
    }
  };

  /**
   * Update user data (e.g., after profile changes)
   */
  const updateUser = (userData) => {
    try {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setError(null);
    } catch (err) {
      console.error('Failed to update user:', err);
      setError('Failed to update user data');
    }
  };

  const isAuthenticated = !!user;

  const value = {
    user,
    setUser,
    loading,
    error,
    login,
    logout,
    updateUser,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
