/**
 * API Utility
 * Centralized API endpoint configuration and fetch wrapper
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getApiUrl = () => API_URL;

/**
 * Fetch wrapper with error handling
 * @param {string} endpoint - API endpoint (e.g., '/auth/login')
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise<any>} - API response
 */
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error.message);
    throw error;
  }
};

/**
 * Common API methods for convenience
 */
export const api = {
  get: (endpoint) => apiCall(endpoint, { method: 'GET' }),
  
  post: (endpoint, body) =>
    apiCall(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  
  put: (endpoint, body) =>
    apiCall(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  
  delete: (endpoint) => apiCall(endpoint, { method: 'DELETE' }),
};

export default api;
