import { createContext, useState, useContext, useEffect } from 'react'
import { authService } from '../services/api'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        // Clear invalid stored data
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials)
      
      // Store token and user data
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      
      // Update user state
      setUser(data.user)
      
      // Navigate to dashboard
      navigate('/dashboard')
      
      return data
    } catch (error) {
      // Clear any existing token/user data on login failure
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const data = await authService.register(userData)
      return data
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    // Clear local storage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    // Clear user state
    setUser(null)
    
    // Navigate to login
    navigate('/')
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}