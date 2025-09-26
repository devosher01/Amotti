'use client';

import React, { useState } from 'react';
import { 
  Modal, 
  Paper, 
  Typography, 
  Box, 
  Button, 
  Alert, 
  IconButton,
  Divider,
  Tabs,
  Tab
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { RefreshTokenDebugger } from './RefreshTokenDebugger';

interface TestMeModalProps {
  open: boolean;
  onClose: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`debug-tabpanel-${index}`}
      aria-labelledby={`debug-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface TestMeModalProps {
  open: boolean;
  onClose: () => void;
}

export const TestMeModal: React.FC<TestMeModalProps> = ({ open, onClose }) => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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

  const testUserContext = async () => {
    setLoading(true);
    setResult(null);

    try {
      console.log('🧪 Testing UserContext refetch...');
      
      // Simular lo que hace el UserContext
      const cookies = document.cookie;
      const hasAuthToken = cookies.includes('auth_token');
      const hasRefreshToken = cookies.includes('rt');
      
      console.log('🍪 Cookies disponibles:', { hasAuthToken, hasRefreshToken, cookies });
      
      if (!hasAuthToken && !hasRefreshToken) {
        setResult({ 
          success: false, 
          error: 'No hay cookies de autenticación disponibles'
        });
        return;
      }

      // Hacer la misma llamada que el UserContext
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ UserContext simulation success:', data);
        setResult({ 
          success: true, 
          data: {
            message: 'UserContext simulation successful',
            userData: data,
            cookieStatus: { hasAuthToken, hasRefreshToken }
          }
        });
      } else {
        const errorText = await response.text();
        console.log('❌ UserContext simulation error:', errorText);
        setResult({ 
          success: false, 
          error: `UserContext would fail: ${response.status} - ${errorText}`
        });
      }
    } catch (error) {
      console.error('🚨 UserContext simulation error:', error);
      setResult({ 
        success: false, 
        error: `UserContext would fail: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="test-me-modal-title"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper 
        elevation={24}
        sx={{ 
          p: 4, 
          m: 2,
          maxWidth: 600,
          maxHeight: '80vh',
          overflow: 'auto',
          backgroundColor: 'background.paper',
          position: 'relative'
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography id="test-me-modal-title" variant="h5" component="h2">
            🧪 Auth Endpoint Tester
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Description */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Prueba el endpoint <code>/auth/me</code> para diagnosticar problemas de autenticación.
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Test Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <Button 
            variant="contained" 
            onClick={testMeEndpoint}
            disabled={loading}
            sx={{ flex: 1, minWidth: '200px' }}
          >
            {loading ? 'Testing...' : '🎯 Test /api/auth/me'}
          </Button>
          
          <Button 
            variant="outlined" 
            onClick={testUserContext}
            disabled={loading}
            sx={{ flex: 1, minWidth: '200px' }}
          >
            {loading ? 'Testing...' : '👤 Simulate UserContext'}
          </Button>
        </Box>

        {/* Results */}
        {result && (
          <Box sx={{ mt: 2 }}>
            {result.success ? (
              <Alert severity="success" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>✅ Success!</strong>
                </Typography>
              </Alert>
            ) : (
              <Alert severity="error" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>❌ Error:</strong> {result.error}
                </Typography>
              </Alert>
            )}
            
            {/* Data Display */}
            {result.data && (
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2, 
                  backgroundColor: 'grey.50',
                  maxHeight: 300,
                  overflow: 'auto'
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  📊 Response Data:
                </Typography>
                <pre style={{ 
                  fontSize: '0.8rem', 
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </Paper>
            )}
          </Box>
        )}

        {/* Help Info */}
        <Box sx={{ mt: 3, p: 2, backgroundColor: 'info.main', color: 'info.contrastText', borderRadius: 1 }}>
          <Typography variant="body2">
            <strong>💡 Tips:</strong>
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            • Revisa la consola del navegador para logs detallados<br />
            • Si falla, verifica que las cookies estén presentes<br />
            • El UserContext usa exactamente la misma lógica
          </Typography>
        </Box>
      </Paper>
    </Modal>
  );
};
