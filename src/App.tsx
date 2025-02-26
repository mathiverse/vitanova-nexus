import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, GlobalStyles, useMediaQuery, Typography } from '@mui/material';
import { useState, useMemo } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import UserMonitor from './components/Monitoring/UserMonitor';
import Sidebar from './components/Common/Sidebar';
import './App.css';
import Reports from './components/Reports/Reports';
import Settings from './components/Settings/Settings';

function App() {
  // Use system preference for initial theme mode
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');

  // Toggle theme function
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'dark'));
  };

  // Create a theme with dynamic color mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'dark' ? '#60a5fa' : '#2563eb',
            light: mode === 'dark' ? '#93c5fd' : '#60a5fa',
            dark: mode === 'dark' ? '#3b82f6' : '#1e40af',
            contrastText: mode === 'dark' ? '#000000' : '#ffffff',
          },
          secondary: {
            main: mode === 'dark' ? '#f472b6' : '#ec4899',
            light: mode === 'dark' ? '#f9a8d4' : '#f9a8d4',
            dark: mode === 'dark' ? '#db2777' : '#be185d',
          },
          error: {
            main: mode === 'dark' ? '#f87171' : '#ef4444',
            light: mode === 'dark' ? '#fca5a5' : '#fca5a5',
            dark: mode === 'dark' ? '#ef4444' : '#b91c1c',
          },
          warning: {
            main: mode === 'dark' ? '#fbbf24' : '#f59e0b',
            light: mode === 'dark' ? '#fcd34d' : '#fcd34d',
            dark: mode === 'dark' ? '#f59e0b' : '#d97706',
          },
          success: {
            main: mode === 'dark' ? '#34d399' : '#10b981',
            light: mode === 'dark' ? '#6ee7b7' : '#6ee7b7',
            dark: mode === 'dark' ? '#10b981' : '#047857',
          },
          background: {
            default: mode === 'dark' ? '#0f172a' : '#f8fafc',
            paper: mode === 'dark' ? '#1e293b' : '#ffffff',
          },
          text: {
            primary: mode === 'dark' ? '#e2e8f0' : '#1e293b',
            secondary: mode === 'dark' ? '#94a3b8' : '#64748b',
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: { fontWeight: 700 },
          h2: { fontWeight: 700 },
          h3: { fontWeight: 600 },
          h4: { fontWeight: 600 },
          h5: { fontWeight: 500 },
          h6: { fontWeight: 500 },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                borderRadius: 8,
                boxShadow: 'none',
                fontWeight: 500,
              },
              contained: {
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                '&:hover': {
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 12,
              },
            },
          },
        },
      }),
    [mode]
  );

  // Animation keyframes for the floating particles
  const globalStyles = (
    <GlobalStyles
      styles={{
        '@keyframes float': {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
          '100%': { transform: 'translateY(0px) rotate(0deg)' },
        },
        '@keyframes pulse': {
          '0%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.6, transform: 'scale(1.05)' },
          '100%': { opacity: 0.4, transform: 'scale(1)' },
        },
        '@keyframes gradientBg': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        '.particle': {
          position: 'absolute',
          borderRadius: '50%',
          background: mode === 'dark' ? 'rgba(96, 165, 250, 0.1)' : 'rgba(37, 99, 235, 0.1)',
          boxShadow: mode === 'dark' ? '0 0 10px rgba(96, 165, 250, 0.2)' : '0 0 10px rgba(37, 99, 235, 0.2)',
          animation: 'float 8s infinite ease-in-out',
          opacity: 0.15,
          pointerEvents: 'none',
          zIndex: 0,
        },
        '.particle-1': {
          width: '80px',
          height: '80px',
          top: '10%',
          left: '30%',
          animationDelay: '0s',
        },
        '.particle-2': {
          width: '60px',
          height: '60px',
          top: '20%',
          right: '25%',
          animationDelay: '1s',
        },
        '.particle-3': {
          width: '40px',
          height: '40px',
          bottom: '15%',
          left: '40%',
          animationDelay: '2s',
        },
        '.particle-4': {
          width: '70px',
          height: '70px',
          bottom: '25%',
          right: '35%',
          animationDelay: '3s',
        },
        '.particle-5': {
          width: '50px',
          height: '50px',
          top: '40%',
          left: '15%',
          animationDelay: '4s',
        },
        '.particle-6': {
          width: '30px',
          height: '30px',
          top: '60%',
          right: '15%',
          animationDelay: '5s',
        },
        '.grid-bg': {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: mode === 'dark' 
            ? 'radial-gradient(rgba(96, 165, 250, 0.1) 1px, transparent 1px)' 
            : 'radial-gradient(rgba(37, 99, 235, 0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          backgroundPosition: '-19px -19px',
          opacity: 0.4,
        },
      }}
    />
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
          {/* Background elements */}
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: mode === 'dark' 
                ? 'linear-gradient(120deg, #0f172a, #1e293b, #0f172a)' 
                : 'linear-gradient(120deg, #f0f9ff, #e6f2ff, #f0f9ff)',
              backgroundSize: '400% 400%',
              animation: 'gradientBg 15s ease infinite',
              zIndex: -2,
            }}
          />
          <Box className="grid-bg" sx={{ zIndex: -1 }} />
          
          {/* Floating particles for IoT/AI theme */}
          <Box className="particle particle-1" />
          <Box className="particle particle-2" />
          <Box className="particle particle-3" />
          <Box className="particle particle-4" />
          <Box className="particle particle-5" />
          <Box className="particle particle-6" />
          
          <Sidebar toggleColorMode={toggleColorMode} mode={mode} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - 280px)` },
              ml: { sm: '280px' },
              overflow: 'auto',
              backdropFilter: 'blur(5px)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Container maxWidth="xl" sx={{ mt: 2 }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/monitor/:id" element={<UserMonitor />} />
                <Route path="/high-risk" element={<Dashboard />} />
                <Route path="/medium-risk" element={<Dashboard />} />
                <Route path="/low-risk" element={<Dashboard />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/notifications" element={<Typography variant="h4">Notifications Page</Typography>} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Container>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App; 