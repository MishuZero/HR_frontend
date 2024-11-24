import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'  // Import axios for making API requests
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Alert,
} from '@mui/material'

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Send POST request to the login API endpoint
      const response = await axios.post(
        'https://hrmanagementsystem-chi.vercel.app/api/auth/login',
        {
          username: credentials.username,
          password: credentials.password
        }
      )

      // If login is successful, save the token or user info (if needed)
      // You can use the login function from your AuthContext here, if necessary
      login(response.data) // assuming 'login' stores user info or token

      // Redirect to the dashboard
      navigate('/dashboard')
    } catch (err) {
      // Handle any errors (e.g., incorrect credentials, network issues)
      setError(err.response?.data?.message || 'Failed to login')
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center">
            HR Management System
          </Typography>
          <Typography component="h2" variant="h6" align="center" sx={{ mt: 2 }}>
            Login to your account
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link
                  to="/register"
                  style={{
                    textDecoration: 'none',
                    color: '#1976d2',
                  }}
                >
                  <Typography variant="body2">
                    Don't have an account? Register here
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default Login
