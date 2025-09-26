"use client";
import React, { useState } from 'react';
import { Box, Button, Typography, Paper, Alert } from '@mui/material';

export const CookieDebugger: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const diagnoseAllCookies = async () => {
    console.log('🔍 Iniciando diagnóstico completo de cookies...');
    
    // 1️⃣ Test básico de document.cookie
    const documentCookies = document.cookie;
    console.log('📋 document.cookie:', documentCookies);
    
    // 2️⃣ Test de cookies específicas usando diferentes métodos
    const tests = {
      documentCookie: {
        raw: documentCookies,
        auth_token: extractCookieValue(documentCookies, 'auth_token'),
        rt: extractCookieValue(documentCookies, 'rt'),
        allCookies: parseCookies(documentCookies)
      },
      
      // 3️⃣ Test directo a la API para verificar headers
      apiTest: null as any,
      
      // 4️⃣ Test del fetch directo al backend
      directBackendTest: null as any
    };

    // Test API through proxy
    try {
      console.log('🌐 Testing API proxy...');
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      tests.apiTest = {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        cookiesFromResponse: response.headers.get('set-cookie')
      };
      
      if (response.ok) {
        tests.apiTest.data = await response.json();
      } else {
        tests.apiTest.error = await response.text();
      }
    } catch (error) {
      tests.apiTest = { error: error?.toString() };
    }

    // Test directo al backend para comparar
    try {
      console.log('🎯 Testing direct backend...');
      const directResponse = await fetch('https://444c95105914.ngrok-free.app/auth/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      });
      
      tests.directBackendTest = {
        status: directResponse.status,
        statusText: directResponse.statusText,
        headers: Object.fromEntries(directResponse.headers.entries()),
        cookiesFromResponse: directResponse.headers.get('set-cookie')
      };
      
      if (directResponse.ok) {
        tests.directBackendTest.data = await directResponse.json();
      } else {
        tests.directBackendTest.error = await directResponse.text();
      }
    } catch (error) {
      tests.directBackendTest = { error: error?.toString() };
    }

    // 5️⃣ Test de localStorage como respaldo
    const localStorageTest = {
      totalItems: localStorage.length,
      authItems: [] as string[],
      allKeys: [] as string[]
    };
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        localStorageTest.allKeys.push(key);
        if (key.includes('auth') || key.includes('token') || key.includes('user')) {
          localStorageTest.authItems.push(`${key}: ${localStorage.getItem(key)?.substring(0, 50)}...`);
        }
      }
    }

    const finalDiagnosis = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      domain: window.location.hostname,
      protocol: window.location.protocol,
      cookieTests: tests,
      localStorage: localStorageTest,
      
      // Análisis final
      analysis: {
        hasCookiesInDocument: !!documentCookies && documentCookies.length > 0,
        hasAuthTokenInDocument: !!tests.documentCookie.auth_token,
        hasRefreshTokenInDocument: !!tests.documentCookie.rt,
        apiProxyWorking: tests.apiTest?.status === 200,
        directBackendWorking: tests.directBackendTest?.status === 200,
        possibleIssues: [] as string[]
      }
    };

    // Determinar posibles problemas
    if (!finalDiagnosis.analysis.hasCookiesInDocument) {
      finalDiagnosis.analysis.possibleIssues.push('❌ No hay cookies disponibles para JavaScript - pueden ser httpOnly');
    }
    
    if (!finalDiagnosis.analysis.hasAuthTokenInDocument) {
      finalDiagnosis.analysis.possibleIssues.push('❌ auth_token no visible para JavaScript');
    }
    
    if (!finalDiagnosis.analysis.hasRefreshTokenInDocument) {
      finalDiagnosis.analysis.possibleIssues.push('❌ refresh token no visible para JavaScript');
    }
    
    if (!finalDiagnosis.analysis.apiProxyWorking) {
      finalDiagnosis.analysis.possibleIssues.push('❌ API proxy no está funcionando correctamente');
    }
    
    if (finalDiagnosis.domain.includes('localhost') && tests.directBackendTest?.status === 200) {
      finalDiagnosis.analysis.possibleIssues.push('⚠️ Direct backend works but proxy fails - cookie domain issue');
    }

    console.log('🎯 DIAGNÓSTICO COMPLETO:', finalDiagnosis);
    setDebugInfo(finalDiagnosis);
    
    return finalDiagnosis;
  };

  // Helper functions
  const extractCookieValue = (cookieString: string, cookieName: string): string | null => {
    const cookies = cookieString.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === cookieName) {
        return value || null;
      }
    }
    return null;
  };

  const parseCookies = (cookieString: string): Record<string, string> => {
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

  const testSpecificCookie = async () => {
    console.log('🧪 Testing specific cookie access methods...');
    
    // Método 1: document.cookie
    console.log('Method 1 - document.cookie:', document.cookie);
    
    // Método 2: Intentar leer directamente
    const testCookie = 'test_cookie_' + Date.now();
    document.cookie = `${testCookie}=test_value; path=/; max-age=60`;
    
    setTimeout(() => {
      const testResult = document.cookie.includes(testCookie);
      console.log(`Test cookie ${testCookie} readable:`, testResult);
      
      // Limpiar test cookie
      document.cookie = `${testCookie}=; path=/; max-age=0`;
    }, 100);
    
    // Método 3: Test con fetch y credentials
    try {
      const response = await fetch(window.location.origin + '/api/auth/me', {
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      console.log('Fetch with credentials test:', {
        status: response.status,
        headers: Object.fromEntries(response.headers.entries())
      });
    } catch (error) {
      console.log('Fetch test error:', error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
        🍪 Cookie Debugger Avanzado
      </Typography>
      
      <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Button 
          variant="contained" 
          onClick={diagnoseAllCookies}
          sx={{ 
            backgroundColor: '#1976d2',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1565c0'
            }
          }}
        >
          🔍 Diagnóstico Completo
        </Button>
        
        <Button 
          variant="outlined" 
          onClick={testSpecificCookie}
          sx={{
            borderColor: 'rgba(255,255,255,0.5)',
            color: 'rgba(255,255,255,0.8)',
            '&:hover': {
              borderColor: 'white',
              backgroundColor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          🧪 Test Específico
        </Button>
        
        <Button 
          variant="outlined" 
          onClick={() => {
            console.log('📋 Current cookies:', document.cookie);
            console.log('🌐 Window location:', window.location);
            console.log('🏠 Domain:', window.location.hostname);
            console.log('🔒 Protocol:', window.location.protocol);
          }}
          sx={{
            borderColor: 'rgba(255,255,255,0.5)',
            color: 'rgba(255,255,255,0.8)',
            '&:hover': {
              borderColor: 'white',
              backgroundColor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          📋 Log Básico
        </Button>
      </Box>

      {debugInfo && (
        <Paper sx={{ 
          p: 2, 
          backgroundColor: 'rgba(255,255,255,0.1)', 
          maxHeight: '400px', 
          overflow: 'auto',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 1
        }}>
          <Typography variant="subtitle1" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
            📊 Resultados del Diagnóstico:
          </Typography>
          
          {debugInfo.analysis.possibleIssues.length > 0 && (
            <Alert 
              severity="warning" 
              sx={{ 
                mb: 2,
                backgroundColor: 'rgba(255, 152, 0, 0.2)',
                color: 'white',
                border: '1px solid rgba(255, 152, 0, 0.5)',
                '& .MuiAlert-icon': {
                  color: '#ff9800'
                }
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: 'white' }}>
                Problemas detectados:
              </Typography>
              {debugInfo.analysis.possibleIssues.map((issue: string, index: number) => (
                <Typography key={index} variant="body2" sx={{ mb: 0.5, color: 'rgba(255,255,255,0.9)' }}>
                  {issue}
                </Typography>
              ))}
            </Alert>
          )}

          <Box sx={{ 
            fontSize: '0.75rem', 
            fontFamily: 'monospace', 
            whiteSpace: 'pre-wrap',
            backgroundColor: 'rgba(255,255,255,0.05)',
            p: 1,
            borderRadius: 1,
            color: 'rgba(255,255,255,0.9)'
          }}>
            {JSON.stringify(debugInfo, null, 2)}
          </Box>
        </Paper>
      )}
    </Box>
  );
};
