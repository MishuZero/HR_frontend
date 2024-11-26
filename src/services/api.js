import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://hrmanagementsystem-chi.vercel.app/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      
      // Ensure response contains token and user
      if (!response.data.token || !response.data.user) {
        throw new Error('Invalid login response');
      }

      return {
        token: response.data.token,
        user: response.data.user
      };
    } catch (error) {
      throw error.response?.data || new Error('Login failed');
    }
  },

  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Registration failed');
    }
  },

  logout() {
    // Optional: Invalidate token on backend if needed
    // api.post('/auth/logout');
    
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Optional: Token refresh method
  async refreshToken() {
    try {
      const response = await api.post('/auth/refresh-token');
      const { token } = response.data;
      
      localStorage.setItem('token', token);
      return token;
    } catch (error) {
      // Handle token refresh failure
      throw error;
    }
  }
};

export default api;