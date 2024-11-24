// frontend/src/services/api.js
import axios from 'axios'

const API_URL = 'https://hrmanagementsystem-chi.vercel.app/api'

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

// Add request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Auth services
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response.data
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
}