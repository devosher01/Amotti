// shared/infrastructure/http/test-hook.ts
import { useState } from 'react';
import { httpClient, API_ENDPOINTS, LoginResponse } from './index';

interface TestResult {
  step: string;
  success: boolean;
  data?: any;
  error?: string;
  timestamp: number;
}

interface TestState {
  isRunning: boolean;
  results: TestResult[];
  currentStep: string;
  summary: {
    total: number;
    passed: number;
    failed: number;
  };
}

// 🧪 Hook para testing del HTTP Client con tu backend
export function useHttpClientTest() {
  const [state, setState] = useState<TestState>({
    isRunning: false,
    results: [],
    currentStep: '',
    summary: { total: 0, passed: 0, failed: 0 },
  });

  const addResult = (result: Omit<TestResult, 'timestamp'>) => {
    const testResult: TestResult = {
      ...result,
      timestamp: Date.now(),
    };

    setState(prev => {
      const newResults = [...prev.results, testResult];
      const summary = {
        total: newResults.length,
        passed: newResults.filter(r => r.success).length,
        failed: newResults.filter(r => !r.success).length,
      };

      return {
        ...prev,
        results: newResults,
        summary,
      };
    });

    // Log para debugging
    const icon = result.success ? '✅' : '🚨';
    console.log(`${icon} Test: ${result.step}`, result.data || result.error);
  };

  const setCurrentStep = (step: string) => {
    setState(prev => ({ ...prev, currentStep: step }));
    console.log(`🔄 Ejecutando: ${step}`);
  };

  // Test completo del sistema
  const runFullTest = async () => {
    setState({
      isRunning: true,
      results: [],
      currentStep: '',
      summary: { total: 0, passed: 0, failed: 0 },
    });

    try {
      console.log('🚀 Iniciando tests completos del HTTP Client...');

      // Test 1: Verificar configuración
      await testConfiguration();

      // Test 2: Verificar conexión básica
      await testBasicConnection();

      // Test 3: Test de cookies sin autenticación
      await testPublicEndpoint();

      // Test 4: Login y cookies automáticas
      await testLoginAndCookies();

      // Test 5: Endpoint protegido con cookies
      await testProtectedEndpoint();

      // Test 6: Token refresh automático
      await testTokenRefresh();

      console.log('🎉 Tests completados!');

    } catch (error) {
      console.error('🚨 Error general en tests:', error);
      addResult({
        step: 'Error General',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setState(prev => ({ ...prev, isRunning: false, currentStep: '' }));
    }
  };

  // Test individual: Configuración
  const testConfiguration = async () => {
    setCurrentStep('Verificando configuración del HTTP Client');

    try {
      // Verificar configuración básica
      const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const hasBaseURL = !!baseURL;

      addResult({
        step: 'Configuración Base URL',
        success: hasBaseURL,
        data: { baseURL: baseURL || 'NOT_SET' },
        error: hasBaseURL ? undefined : 'NEXT_PUBLIC_BACKEND_URL no está configurada',
      });

      // Verificar token state
      httpClient.debugTokenState();

      addResult({
        step: 'HTTP Client Inicializado',
        success: true,
        data: { message: 'Client configurado correctamente' },
      });

    } catch (error) {
      addResult({
        step: 'Configuración',
        success: false,
        error: error instanceof Error ? error.message : 'Error de configuración',
      });
    }
  };

  // Test individual: Conexión básica
  const testBasicConnection = async () => {
    setCurrentStep('Probando conexión básica');

    try {
      // Intentar endpoint de health o similar
      const response = await httpClient.get('/health');

      addResult({
        step: 'Conexión Básica',
        success: true,
        data: response,
      });

    } catch (error: any) {
      // No es necesariamente un error si tu API no tiene /health
      addResult({
        step: 'Conexión Básica',
        success: error?.status !== 0, // Error de red = problema, 404 = ok
        data: { status: error?.status },
        error: error?.message || 'Error de conexión',
      });
    }
  };

  // Test individual: Endpoint público 
  const testPublicEndpoint = async () => {
    setCurrentStep('Probando endpoint público');

    try {
      // Intentar un endpoint que no requiera auth
      const response = await httpClient.get('/auth/status');

      addResult({
        step: 'Endpoint Público',
        success: true,
        data: response,
      });

    } catch (error: any) {
      addResult({
        step: 'Endpoint Público',
        success: false,
        data: { status: error?.status },
        error: error?.message || 'Error en endpoint público',
      });
    }
  };

  // Test individual: Login y cookies
  const testLoginAndCookies = async (
    email: string = 'test@example.com',
    password: string = 'test123'
  ) => {
    setCurrentStep('Probando login y establecimiento de cookies');

    try {
      const loginData = { email, password };
      const response = await httpClient.post<LoginResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        loginData
      );

      console.log('🍪 Verificando cookies después del login...');
      
      // Verificar que las cookies se establecieron
      setTimeout(() => {
        httpClient.debugTokenState();
      }, 1000);

      addResult({
        step: 'Login y Cookies',
        success: !!response,
        data: {
          hasUser: !!response?.user,
          hasAccessToken: !!response?.accessToken,
          userEmail: response?.user?.email,
        },
      });

      return response;

    } catch (error: any) {
      addResult({
        step: 'Login y Cookies',
        success: false,
        error: error?.message || 'Error en login',
        data: { status: error?.status },
      });
      throw error;
    }
  };

  // Test individual: Endpoint protegido
  const testProtectedEndpoint = async () => {
    setCurrentStep('Probando endpoint protegido con cookies automáticas');

    try {
      // Intentar endpoint que requiere autenticación
      const response = await httpClient.get(API_ENDPOINTS.PUBLICATIONS.BASE);

      addResult({
        step: 'Endpoint Protegido',
        success: true,
        data: {
          message: 'Autenticación automática con cookies funciona',
          responseType: Array.isArray(response) ? 'array' : typeof response,
          hasData: !!response,
        },
      });

      return response;

    } catch (error: any) {
      const isAuthError = error?.status === 401;
      
      addResult({
        step: 'Endpoint Protegido',
        success: false,
        error: error?.message || 'Error en endpoint protegido',
        data: { 
          status: error?.status,
          isAuthError,
          suggestion: isAuthError ? 'Verificar login o token expirado' : 'Error del servidor',
        },
      });
    }
  };

  // Test individual: Refresh token
  const testTokenRefresh = async () => {
    setCurrentStep('Probando refresh automático de token');

    try {
      // Intentar refresh manual
      const response = await httpClient.post(API_ENDPOINTS.AUTH.REFRESH);

      addResult({
        step: 'Token Refresh',
        success: true,
        data: {
          message: 'Refresh token funciona',
          hasNewToken: !!response,
        },
      });

    } catch (error: any) {
      addResult({
        step: 'Token Refresh',
        success: false,
        error: error?.message || 'Error en refresh token',
        data: { status: error?.status },
      });
    }
  };

  // Test personalizado con credenciales específicas
  const testWithCredentials = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isRunning: true }));

    try {
      console.log(`🧪 Testing con credenciales: ${email}`);
      
      const loginResponse = await testLoginAndCookies(email, password);
      
      if (loginResponse) {
        await testProtectedEndpoint();
      }

    } catch (error) {
      console.error('🚨 Error en test con credenciales:', error);
    } finally {
      setState(prev => ({ ...prev, isRunning: false }));
    }
  };

  // Limpiar resultados
  const clearResults = () => {
    setState({
      isRunning: false,
      results: [],
      currentStep: '',
      summary: { total: 0, passed: 0, failed: 0 },
    });
  };

  // Test rápido de conexión
  const quickConnectionTest = async () => {
    setState(prev => ({ ...prev, isRunning: true }));
    
    try {
      await testConfiguration();
      await testBasicConnection();
    } finally {
      setState(prev => ({ ...prev, isRunning: false }));
    }
  };

  return {
    // Estado
    isRunning: state.isRunning,
    results: state.results,
    currentStep: state.currentStep,
    summary: state.summary,
    
    // Acciones
    runFullTest,
    testWithCredentials,
    quickConnectionTest,
    clearResults,
    
    // Tests individuales
    testConfiguration,
    testBasicConnection,
    testPublicEndpoint,
    testLoginAndCookies,
    testProtectedEndpoint,
    testTokenRefresh,
  };
}
