'use client';

import React, { useState } from 'react';
import { Button, Alert, Paper, Typography, Box } from '@mui/material';

export const TestMeEndpoint: React.FC = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testMeEndpoint = async () => {
    setLoading(true);
    setResult(null);

    try {
      console.log('🧪 Testing /api/auth/me endpoint...');
      
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Success data:', data);
        setResult({ success: true, data });
      } else {
        const errorText = await response.text();
        console.log('❌ Error response:', errorText);
        setResult({ success: false, error: `${response.status}: ${errorText}` });
      }
    } catch (error) {
      console.error('🚨 Network error:', error);
      setResult({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, m: 2 }}>
      <Typography variant="h6" gutterBottom>
        🧪 Test /auth/me Endpoint
      </Typography>
      
      <Button 
        variant="contained" 
        onClick={testMeEndpoint}
        disabled={loading}
        sx={{ mb: 2 }}
      >
        {loading ? 'Testing...' : 'Test /api/auth/me'}
      </Button>

      {result && (
        <Box sx={{ mt: 2 }}>
          {result.success ? (
            <Alert severity="success">
              <Typography variant="body2">
                <strong>✅ Success!</strong>
              </Typography>
              <pre style={{ fontSize: '0.8rem', marginTop: '8px' }}>
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </Alert>
          ) : (
            <Alert severity="error">
              <Typography variant="body2">
                <strong>❌ Error:</strong> {result.error}
              </Typography>
            </Alert>
          )}
        </Box>
      )}
    </Paper>
  );
};
