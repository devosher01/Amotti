"use client";
import { useState } from 'react';

interface RefreshTestResponse {
  success: boolean;
  status: number;
  data?: any;
  error?: string;
  cookies?: string[];
}

export function RefreshTokenDebugger() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RefreshTestResponse | null>(null);

  const testRefresh = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      console.log('🧪 Testing refresh endpoint...');
      
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include', // Include cookies
      });

      const data = await response.json();
      const cookies = response.headers.get('set-cookie');

      const result: RefreshTestResponse = {
        success: response.ok,
        status: response.status,
        data: data,
        cookies: cookies ? cookies.split(',').map(c => c.trim()) : []
      };

      console.log('🔄 Refresh test result:', result);
      setResult(result);

    } catch (error) {
      console.error('💥 Refresh test error:', error);
      setResult({
        success: false,
        status: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testAxiosRefresh = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      console.log('🧪 Testing axios with expired token simulation...');
      
      // Simular un call que devolvería 401
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'X-Test-Expired': 'true' // Header para simular token expirado
        }
      });

      const data = await response.json();

      const result: RefreshTestResponse = {
        success: response.ok,
        status: response.status,
        data: data
      };

      console.log('🔄 Axios refresh test result:', result);
      setResult(result);

    } catch (error) {
      console.error('💥 Axios refresh test error:', error);
      setResult({
        success: false,
        status: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">🔄 Refresh Token Debugger</h2>
      
      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            onClick={testRefresh}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? '🔄 Testing...' : '🧪 Test Manual Refresh'}
          </button>
          
          <button
            onClick={testAxiosRefresh}
            disabled={isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {isLoading ? '🔄 Testing...' : '🧪 Test Axios Auto-Refresh'}
          </button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-white rounded border">
            <h3 className="font-semibold mb-2">
              {result.success ? '✅' : '❌'} Result (Status: {result.status})
            </h3>
            
            {result.error && (
              <div className="text-red-600 mb-2">
                <strong>Error:</strong> {result.error}
              </div>
            )}

            {result.data && (
              <div className="mb-4">
                <strong>Response Data:</strong>
                <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </div>
            )}

            {result.cookies && result.cookies.length > 0 && (
              <div>
                <strong>Set-Cookie Headers:</strong>
                <ul className="bg-gray-100 p-2 rounded text-sm">
                  {result.cookies.map((cookie, index) => (
                    <li key={index} className="border-b border-gray-200 py-1">
                      {cookie}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="text-sm text-gray-600 mt-4">
          <p><strong>Manual Refresh:</strong> Testa directamente el endpoint /api/auth/refresh</p>
          <p><strong>Axios Auto-Refresh:</strong> Simula un 401 para activar el interceptor de axios</p>
        </div>
      </div>
    </div>
  );
}
