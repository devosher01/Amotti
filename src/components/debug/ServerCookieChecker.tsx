"use client";
import React, { useState } from 'react';
import { Box, Button, Typography, Alert, Paper, Divider } from '@mui/material';

export const ServerCookieChecker: React.FC = () => {
  const [cookieData, setCookieData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkServerCookies = async () => {
    setLoading(true);
    try {
      console.log('🔍 Consultando cookies del servidor...');
      
      const response = await fetch('/api/auth/cookies', {
        method: 'GET',
        credentials: 'include', // Importante para incluir cookies
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('🍪 Respuesta del servidor:', data);
      
      setCookieData(data);
      
    } catch (error) {
      console.error('❌ Error consultando cookies del servidor:', error);
      setCookieData({
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    } finally {
      setLoading(false);
    }
  };

  const testMeEndpointWithServerCookies = async () => {
    try {
      console.log('👤 Testing /auth/me con cookies del servidor...');
      
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('📡 /auth/me status:', response.status);
      console.log('📡 /auth/me headers:', Object.fromEntries(response.headers.entries()));
      
      if (response.ok) {
        const userData = await response.json();
        console.log('✅ /auth/me exitoso - DATOS COMPLETOS:', userData);
        console.log('📊 Estructura del usuario:', {
          id: userData.id,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: userData.role,
          allKeys: Object.keys(userData),
          fullObject: userData
        });
        
        const displayName = userData.email || userData.firstName || userData.name || userData.id || 'Usuario';
        alert(`✅ /auth/me funciona! Usuario: ${displayName}\n\nDatos: ${JSON.stringify(userData, null, 2).substring(0, 200)}...`);
      } else {
        // Para errores, intentar leer como texto primero
        const contentType = response.headers.get('content-type');
        console.log('📄 Content type:', contentType);
        
        let errorContent;
        if (contentType && contentType.includes('application/json')) {
          errorContent = await response.json();
        } else {
          errorContent = await response.text();
        }
        
        console.log('❌ /auth/me error:', errorContent);
        alert(`❌ /auth/me falló (${response.status}): ${typeof errorContent === 'string' ? errorContent.substring(0, 200) : JSON.stringify(errorContent)}`);
      }
      
    } catch (error) {
      console.error('❌ Error en /auth/me test:', error);
      alert(`❌ Error: ${error}`);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
        🔍 Server Cookie Checker (httpOnly Compatible)
      </Typography>
      
      <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255,255,255,0.8)' }}>
        Esta herramienta usa un endpoint del servidor para leer cookies httpOnly que JavaScript no puede acceder directamente.
      </Typography>

      <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Button 
          variant="contained" 
          onClick={checkServerCookies}
          disabled={loading}
          sx={{ 
            backgroundColor: '#2e7d32',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1b5e20'
            },
            '&:disabled': {
              backgroundColor: 'rgba(255,255,255,0.3)',
              color: 'rgba(255,255,255,0.5)'
            }
          }}
        >
          {loading ? '⏳ Consultando...' : '🔍 Check Server Cookies'}
        </Button>
        
        <Button 
          variant="contained" 
          onClick={testMeEndpointWithServerCookies}
          sx={{ 
            backgroundColor: '#1976d2', 
            color: 'white',
            '&:hover': {
              backgroundColor: '#1565c0'
            }
          }}
        >
          👤 Test /auth/me
        </Button>
        
        <Button 
          variant="contained" 
          onClick={async () => {
            try {
              console.log('🧪 Testing backend directly...');
              const response = await fetch('/api/debug/backend-test', {
                credentials: 'include'
              });
              
              if (response.ok) {
                const data = await response.json();
                console.log('🧪 Backend test results:', data);
                alert('🧪 Backend test completed - check console for details');
              } else {
                const error = await response.text();
                console.log('❌ Backend test error:', error);
                alert(`❌ Backend test failed: ${error}`);
              }
            } catch (error) {
              console.error('❌ Backend test error:', error);
              alert(`❌ Error: ${error}`);
            }
          }}
          sx={{ 
            backgroundColor: '#ff9800', 
            color: 'white',
            '&:hover': {
              backgroundColor: '#f57c00'
            }
          }}
        >
          🧪 Test Backend Direct
        </Button>
        
        <Button 
          variant="outlined" 
          onClick={() => setCookieData(null)}
          size="small"
          sx={{ 
            borderColor: 'rgba(255,255,255,0.5)', 
            color: 'rgba(255,255,255,0.8)',
            '&:hover': {
              borderColor: 'white',
              backgroundColor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          🧹 Clear
        </Button>
      </Box>

      {cookieData && (
        <Paper sx={{ 
          p: 2, 
          backgroundColor: 'rgba(255,255,255,0.1)', 
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 1
        }}>
          {cookieData.success ? (
            <>
              <Alert 
                severity={cookieData.cookies?.authToken?.present ? 'success' : 'warning'}
                sx={{ 
                  mb: 2,
                  backgroundColor: cookieData.cookies?.authToken?.present 
                    ? 'rgba(76, 175, 80, 0.2)' 
                    : 'rgba(255, 152, 0, 0.2)',
                  color: 'white',
                  border: cookieData.cookies?.authToken?.present 
                    ? '1px solid rgba(76, 175, 80, 0.5)' 
                    : '1px solid rgba(255, 152, 0, 0.5)',
                  '& .MuiAlert-icon': {
                    color: cookieData.cookies?.authToken?.present ? '#4caf50' : '#ff9800'
                  }
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
                  Estado de las cookies del servidor:
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  • auth_token: {cookieData.cookies?.authToken?.present ? '✅ Presente' : '❌ Ausente'}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  • refresh_token (rt): {cookieData.cookies?.refreshToken?.present ? '✅ Presente' : '❌ Ausente'}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  • Total cookies: {cookieData.cookies?.totalCookies || 0}
                </Typography>
              </Alert>

              <Divider sx={{ my: 2, backgroundColor: 'rgba(255,255,255,0.3)' }} />

              <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: 'white' }}>
                📊 Detalles de cookies:
              </Typography>
              
              {cookieData.cookies?.authToken?.present && (
                <Box sx={{ 
                  mb: 2, 
                  p: 1, 
                  backgroundColor: 'rgba(76, 175, 80, 0.2)', 
                  borderRadius: 1,
                  border: '1px solid rgba(76, 175, 80, 0.5)'
                }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
                    🔑 auth_token:
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.9)' }}>
                    • Presente: ✅ Sí
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.9)' }}>
                    • Valor (primeros 20 chars): {cookieData.cookies.authToken.value?.substring(0, 20)}...
                  </Typography>
                </Box>
              )}

              {cookieData.cookies?.refreshToken?.present && (
                <Box sx={{ 
                  mb: 2, 
                  p: 1, 
                  backgroundColor: 'rgba(76, 175, 80, 0.2)', 
                  borderRadius: 1,
                  border: '1px solid rgba(76, 175, 80, 0.5)'
                }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
                    🔄 refresh_token (rt):
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.9)' }}>
                    • Presente: ✅ Sí
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.9)' }}>
                    • Valor (primeros 20 chars): {cookieData.cookies.refreshToken.value?.substring(0, 20)}...
                  </Typography>
                </Box>
              )}

              <Box sx={{ 
                mt: 2, 
                p: 1, 
                backgroundColor: 'rgba(255,255,255,0.05)', 
                borderRadius: 1, 
                fontSize: '0.75rem', 
                fontFamily: 'monospace',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: 'white' }}>
                  🍪 Todas las cookies del servidor:
                </Typography>
                {cookieData.cookies?.allCookies?.map((cookie: any, index: number) => (
                  <Typography key={index} variant="body2" sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>
                    • {cookie.name}: {cookie.hasValue ? `${cookie.valueLength} chars` : 'sin valor'}
                  </Typography>
                ))}
              </Box>
            </>
          ) : (
            <Alert 
              severity="error"
              sx={{
                backgroundColor: 'rgba(244, 67, 54, 0.2)',
                color: 'white',
                border: '1px solid rgba(244, 67, 54, 0.5)',
                '& .MuiAlert-icon': {
                  color: '#f44336'
                }
              }}
            >
              <Typography variant="body2" sx={{ color: 'white' }}>
                Error: {cookieData.error}
              </Typography>
            </Alert>
          )}
        </Paper>
      )}
    </Box>
  );
};
