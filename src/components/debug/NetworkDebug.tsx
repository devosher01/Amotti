'use client';

import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Button,
  Alert,
  Chip,
  Divider,
  Paper,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

interface TestResult {
  method: string;
  url: string;
  status: 'success' | 'error' | 'pending';
  statusCode?: number;
  error?: string;
  responseTime?: number;
  headers?: Record<string, string>;
}

export const NetworkDebug: React.FC = () => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [testCredentials, setTestCredentials] = useState({
    email: 'test@example.com',
    password: 'test123'
  });

  const baseUrl = 'https://444c95105914.ngrok-free.app';

  const runTest = async (testConfig: {
    method: string;
    endpoint: string;
    withCredentials?: boolean;
    headers?: Record<string, string>;
    data?: any;
  }) => {
    const testId = `${testConfig.method}-${testConfig.endpoint}`;
    const startTime = Date.now();

    // Add pending result
    setResults(prev => [...prev.filter(r => r.method + r.url !== testId), {
      method: testConfig.method,
      url: `${baseUrl}${testConfig.endpoint}`,
      status: 'pending' as const,
    }]);

    try {
      const config = {
        method: testConfig.method,
        url: `${baseUrl}${testConfig.endpoint}`,
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          ...testConfig.headers,
        },
        withCredentials: testConfig.withCredentials || false,
        data: testConfig.data,
        timeout: 10000,
      };

      const response = await axios(config);
      const responseTime = Date.now() - startTime;

      setResults(prev => [...prev.filter(r => r.method + r.url !== testId), {
        method: testConfig.method,
        url: `${baseUrl}${testConfig.endpoint}`,
        status: 'success',
        statusCode: response.status,
        responseTime,
        headers: response.headers as Record<string, string>,
      }]);

    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      
      setResults(prev => [...prev.filter(r => r.method + r.url !== testId), {
        method: testConfig.method,
        url: `${baseUrl}${testConfig.endpoint}`,
        status: 'error',
        statusCode: error.response?.status,
        error: error.message,
        responseTime,
        headers: error.response?.headers as Record<string, string>,
      }]);
    }
  };

  const runAllTests = async () => {
    setResults([]);
    
    // Test 1: Health check (should work)
    await runTest({
      method: 'GET',
      endpoint: '/health',
    });

    // Test 2: Login without credentials
    await runTest({
      method: 'POST',
      endpoint: '/auth/login',
      data: testCredentials,
    });

    // Test 3: Login with credentials
    await runTest({
      method: 'POST',
      endpoint: '/auth/login',
      withCredentials: true,
      data: testCredentials,
    });

    // Test 4: Login with additional headers
    await runTest({
      method: 'POST',
      endpoint: '/auth/login',
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': window.location.origin,
      },
      data: testCredentials,
    });

    // Test 5: OPTIONS preflight for login
    await runTest({
      method: 'OPTIONS',
      endpoint: '/auth/login',
    });
  };

  const testDirectLogin = async () => {
    console.log('🧪 Testing direct login...');
    
    setResults(prev => [...prev, {
      method: 'DIRECT',
      url: `${baseUrl}/auth/login`,
      status: 'pending',
    }]);

    try {
      // Test directo sin httpClient
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify(testCredentials),
        credentials: 'include', // Equivalente a withCredentials
      });

      const data = await response.json();
      
      setResults(prev => [...prev.filter(r => r.method !== 'DIRECT'), {
        method: 'DIRECT',
        url: `${baseUrl}/auth/login`,
        status: response.ok ? 'success' : 'error',
        statusCode: response.status,
        error: response.ok ? undefined : data.message || 'Fetch error',
      }]);

      console.log('🧪 Direct login result:', { status: response.status, data });
      
    } catch (error: any) {
      console.error('🧪 Direct login error:', error);
      
      setResults(prev => [...prev.filter(r => r.method !== 'DIRECT'), {
        method: 'DIRECT',
        url: `${baseUrl}/auth/login`,
        status: 'error',
        error: error.message,
      }]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'success';
      case 'error': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, m: 2 }}>
      <Typography variant="h5" gutterBottom>
        🌐 Network Diagnostic Tool
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Base URL: <code>{baseUrl}</code>
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mt: 2, mb: 2 }}>
          <TextField
            label="Email"
            size="small"
            value={testCredentials.email}
            onChange={(e) => setTestCredentials(prev => ({ ...prev, email: e.target.value }))}
          />
          <TextField
            label="Password"
            type="password"
            size="small"
            value={testCredentials.password}
            onChange={(e) => setTestCredentials(prev => ({ ...prev, password: e.target.value }))}
          />
        </Box>
        
        <Button 
          variant="contained" 
          onClick={runAllTests}
          disabled={results.some(r => r.status === 'pending')}
          sx={{ mr: 2 }}
        >
          Run Network Tests
        </Button>
        
        <Button 
          variant="outlined" 
          onClick={testDirectLogin}
          disabled={results.some(r => r.status === 'pending')}
        >
          Test Direct Login (Fetch)
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      {results.map((result, index) => (
        <Accordion key={index} sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              <Chip 
                label={result.method}
                size="small"
                color="primary"
                variant="outlined"
              />
              <Chip 
                label={result.status}
                size="small"
                color={getStatusColor(result.status)}
              />
              {result.statusCode && (
                <Chip 
                  label={result.statusCode}
                  size="small"
                  variant="outlined"
                />
              )}
              <Typography variant="body2" sx={{ flex: 1 }}>
                {result.url}
              </Typography>
              {result.responseTime && (
                <Typography variant="caption" color="text.secondary">
                  {result.responseTime}ms
                </Typography>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {result.error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>Error:</strong> {result.error}
                </Typography>
              </Alert>
            )}
            
            {result.headers && (
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Response Headers:
                </Typography>
                <Box component="pre" sx={{ 
                  fontSize: '0.8rem', 
                  backgroundColor: 'grey.100', 
                  p: 1, 
                  borderRadius: 1,
                  overflow: 'auto'
                }}>
                  {JSON.stringify(result.headers, null, 2)}
                </Box>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
};
