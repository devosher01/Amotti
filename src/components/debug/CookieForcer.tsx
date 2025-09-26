"use client";
import React, { useState } from 'react';
import { Box, Button, Typography, Alert, Paper, TextField } from '@mui/material';

export const CookieForcer: React.FC = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [testResult, setTestResult] = useState<any>(null);

  const forceLoginWithCookieTest = async () => {
    if (!loginData.email || !loginData.password) {
      alert('⚠️ Ingresa email y password para el test');
      return;
    }

    setTestResult({ loading: true });
    console.log('🚀 Iniciando login con análisis de cookies...');

    try {
      // 1️⃣ Login a través del proxy
      console.log('📧 Haciendo login via proxy...');
      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include', // MUY IMPORTANTE
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password
        })
      });

      console.log('📡 Login response:', {
        status: loginResponse.status,
        headers: Object.fromEntries(loginResponse.headers.entries())
      });

      if (!loginResponse.ok) {
        const error = await loginResponse.text();
        setTestResult({ error: `Login failed: ${error}` });
        return;
      }

      const loginResult = await loginResponse.json();
      console.log('✅ Login exitoso:', loginResult);

      // 2️⃣ Analizar cookies INMEDIATAMENTE después del login
      const cookiesAfterLogin = document.cookie;
      console.log('🍪 Cookies después del login:', cookiesAfterLogin);

      // 3️⃣ Test inmediato del endpoint /auth/me
      console.log('👤 Testing /auth/me inmediatamente...');
      const meResponse = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('📡 /auth/me response:', {
        status: meResponse.status,
        headers: Object.fromEntries(meResponse.headers.entries())
      });

      let meResult = null;
      if (meResponse.ok) {
        meResult = await meResponse.json();
        console.log('✅ /auth/me exitoso:', meResult);
      } else {
        const meError = await meResponse.text();
        console.log('❌ /auth/me error:', meError);
        meResult = { error: meError };
      }

      // 4️⃣ Test directo al backend para comparar
      console.log('🎯 Testing directo al backend...');
      const directResponse = await fetch('https://444c95105914.ngrok-free.app/auth/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        }
      });

      let directResult = null;
      if (directResponse.ok) {
        directResult = await directResponse.json();
        console.log('✅ Direct backend exitoso:', directResult);
      } else {
        const directError = await directResponse.text();
        console.log('❌ Direct backend error:', directError);
        directResult = { error: directError };
      }

      // 5️⃣ Análisis de headers de Set-Cookie
      const setCookieHeaders = loginResponse.headers.get('set-cookie');
      console.log('🔍 Set-Cookie headers:', setCookieHeaders);

      const finalResult = {
        success: true,
        timestamp: new Date().toISOString(),
        login: {
          status: loginResponse.status,
          data: loginResult,
          setCookieHeaders
        },
        cookiesAfterLogin: {
          raw: cookiesAfterLogin,
          parsed: parseCookieString(cookiesAfterLogin),
          hasAuthToken: cookiesAfterLogin.includes('auth_token'),
          hasRefreshToken: cookiesAfterLogin.includes('rt')
        },
        meEndpoint: {
          status: meResponse.status,
          data: meResult,
          working: meResponse.ok
        },
        directBackend: {
          status: directResponse.status,
          data: directResult,
          working: directResponse.ok
        },
        analysis: {
          loginWorking: loginResponse.ok,
          cookiesVisible: cookiesAfterLogin.length > 0,
          authTokenVisible: cookiesAfterLogin.includes('auth_token'),
          refreshTokenVisible: cookiesAfterLogin.includes('rt'),
          meEndpointWorking: meResponse.ok,
          directBackendWorking: directResponse.ok,
          possibleIssue: !cookiesAfterLogin.includes('auth_token') ? 'httpOnly cookies' : 
                        !meResponse.ok ? 'API proxy issue' : 
                        'Everything seems OK'
        }
      };

      setTestResult(finalResult);
      console.log('🎯 RESULTADO FINAL DEL TEST:', finalResult);

    } catch (error) {
      console.error('💥 Error en test:', error);
      setTestResult({ error: error?.toString() });
    }
  };

  const parseCookieString = (cookieString: string): Record<string, string> => {
    const cookies: Record<string, string> = {};
    if (!cookieString) return cookies;
    
    cookieString.split(';').forEach(cookie => {
      const [name, ...valueParts] = cookie.trim().split('=');
      if (name && valueParts.length > 0) {
        cookies[name] = valueParts.join('=');
      }
    });
    
    return cookies;
  };

  const clearTestCookies = () => {
    // Limpiar todas las cookies posibles
    ['auth_token', 'rt', 'refresh_token', 'access_token'].forEach(name => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname}`;
    });
    
    localStorage.clear();
    setTestResult(null);
    console.log('🧹 Test cookies limpiadas');
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
        🧪 Cookie Login Tester
      </Typography>

      <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255,255,255,0.8)' }}>
        Este test hace login y analiza inmediatamente las cookies para detectar el problema.
      </Typography>

      <Box sx={{ mb: 2, display: 'flex', gap: 1, flexDirection: 'column' }}>
        <TextField
          size="small"
          label="Email"
          value={loginData.email}
          onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="tu-email@example.com"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255,255,255,0.1)',
              '& fieldset': {
                borderColor: 'rgba(255,255,255,0.3)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255,255,255,0.5)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#2196f3',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'rgba(255,255,255,0.7)',
            },
            '& .MuiOutlinedInput-input': {
              color: 'white',
            },
          }}
        />
        <TextField
          size="small"
          label="Password"
          type="password"
          value={loginData.password}
          onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
          placeholder="tu-password"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255,255,255,0.1)',
              '& fieldset': {
                borderColor: 'rgba(255,255,255,0.3)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255,255,255,0.5)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#2196f3',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'rgba(255,255,255,0.7)',
            },
            '& .MuiOutlinedInput-input': {
              color: 'white',
            },
          }}
        />
      </Box>

      <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Button 
          variant="contained" 
          onClick={forceLoginWithCookieTest}
          disabled={!loginData.email || !loginData.password || testResult?.loading}
          sx={{ 
            backgroundColor: '#d32f2f',
            color: 'white',
            '&:hover': {
              backgroundColor: '#b71c1c'
            },
            '&:disabled': {
              backgroundColor: 'rgba(255,255,255,0.3)',
              color: 'rgba(255,255,255,0.5)'
            }
          }}
        >
          {testResult?.loading ? '⏳ Testing...' : '🚀 Test Login + Cookies'}
        </Button>
        
        <Button 
          variant="outlined" 
          onClick={clearTestCookies}
          sx={{
            borderColor: 'rgba(255,255,255,0.5)',
            color: 'rgba(255,255,255,0.8)',
            '&:hover': {
              borderColor: 'white',
              backgroundColor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          🧹 Limpiar Test
        </Button>
      </Box>

      {testResult && !testResult.loading && (
        <Paper sx={{ 
          p: 2, 
          backgroundColor: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 1
        }}>
          {testResult.error ? (
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
                Error: {testResult.error}
              </Typography>
            </Alert>
          ) : (
            <>
              <Alert 
                severity={testResult.analysis?.authTokenVisible ? 'success' : 'warning'}
                sx={{ 
                  mb: 2,
                  backgroundColor: testResult.analysis?.authTokenVisible 
                    ? 'rgba(76, 175, 80, 0.2)' 
                    : 'rgba(255, 152, 0, 0.2)',
                  color: 'white',
                  border: testResult.analysis?.authTokenVisible 
                    ? '1px solid rgba(76, 175, 80, 0.5)' 
                    : '1px solid rgba(255, 152, 0, 0.5)',
                  '& .MuiAlert-icon': {
                    color: testResult.analysis?.authTokenVisible ? '#4caf50' : '#ff9800'
                  }
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
                  Resultado: {testResult.analysis?.possibleIssue}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  • Login: {testResult.analysis?.loginWorking ? '✅' : '❌'}
                  • Cookies visibles: {testResult.analysis?.cookiesVisible ? '✅' : '❌'}
                  • auth_token visible: {testResult.analysis?.authTokenVisible ? '✅' : '❌'}
                  • /auth/me funciona: {testResult.analysis?.meEndpointWorking ? '✅' : '❌'}
                </Typography>
              </Alert>

              <Box sx={{ 
                fontSize: '0.75rem', 
                fontFamily: 'monospace', 
                whiteSpace: 'pre-wrap', 
                maxHeight: '300px', 
                overflow: 'auto',
                backgroundColor: 'rgba(255,255,255,0.05)',
                p: 1,
                borderRadius: 1,
                color: 'rgba(255,255,255,0.9)'
              }}>
                {JSON.stringify(testResult, null, 2)}
              </Box>
            </>
          )}
        </Paper>
      )}
    </Box>
  );
};
