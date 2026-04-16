import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * useAuth hook
 * Provides access to authentication context
 * 
 * Usage:
 * const { user, login, logout, isAuthenticated, loading } = useAuth();
 * 
 * @throws {Error} If used outside of AuthProvider
 * @returns {Object} Auth context with user, loading, error, login, logout, updateUser, isAuthenticated
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
