"use client";
import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Alert } from '@mui/material';
import { API_CONFIG } from '@/config/api';

export const ApiDebugInfo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    // Verificar si estamos en desarrollo
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
    }
  }, []);

  const testApiConnection = async () => {
    setApiStatus('checking');
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        setApiStatus('online');
      } else {
        setApiStatus('offline');
      }
    } catch (error) {
      setApiStatus('offline');
    }
  };

  if (!isVisible) return null;

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        p: 2,
        maxWidth: 400,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
      }}
    >
      <Typography variant="h6" sx={{ mb: 1, color: 'white' }}>
        🔧 API Debug Info
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          <strong>Base URL:</strong> {API_CONFIG.BASE_URL}
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          <strong>Timeout:</strong> {API_CONFIG.TIMEOUT}ms
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          <strong>Environment:</strong> {process.env.NODE_ENV}
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
          <strong>Status:</strong>
        </Typography>
        {apiStatus === 'checking' && (
          <Alert severity="info" sx={{ py: 0 }}>
            Verificando conexión...
          </Alert>
        )}
        {apiStatus === 'online' && (
          <Alert severity="success" sx={{ py: 0 }}>
            API Online ✅
          </Alert>
        )}
        {apiStatus === 'offline' && (
          <Alert severity="error" sx={{ py: 0 }}>
            API Offline ❌
          </Alert>
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          size="small"
          variant="outlined"
          onClick={testApiConnection}
          sx={{ 
            color: 'white', 
            borderColor: 'white',
            '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)' }
          }}
        >
          Test Connection
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={() => setIsVisible(false)}
          sx={{ 
            color: 'white', 
            borderColor: 'white',
            '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)' }
          }}
        >
          Hide
        </Button>
      </Box>
    </Paper>
  );
}; 