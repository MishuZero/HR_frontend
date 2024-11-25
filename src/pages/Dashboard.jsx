import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  People,
  Business,
  Assessment,
  Settings,
  Logout as LogoutIcon,
} from '@mui/icons-material'

// Import components
import Overview from './Overview'
import Employees from './Employees'
import Departments from './Departments'
import Reports from './Reports'
import SettingsPage from './Settings' 
import { useAuth } from '../contexts/AuthContext'

const drawerWidth = 240

function Dashboard() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [activeMenu, setActiveMenu] = useState('')

  const menuItems = [
    { text: 'Overview', icon: <DashboardIcon />, path: '' },
    { text: 'Employees', icon: <People />, path: 'employees' },
    { text: 'Departments', icon: <Business />, path: 'departments' },
    { text: 'Reports', icon: <Assessment />, path: 'reports' },
    { text: 'Settings', icon: <Settings />, path: 'settings' },
  ]

  const handleMenuClick = (path, text) => {
    setActiveMenu(text)
    navigate(path)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            HR Management System
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                selected={activeMenu === item.text}
                onClick={() => handleMenuClick(item.path, item.text)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="employees" element={<Employees />} />
          <Route path="departments" element={<Departments />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<SettingsPage />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default Dashboard