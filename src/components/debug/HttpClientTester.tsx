// components/debug/HttpClientTester.tsx
'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  TextField, 
  Alert, 
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider,
  Paper,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useHttpClientTest } from '@/shared/infrastructure/http/test-hook';

interface HttpClientTesterProps {
  title?: string;
}

export const HttpClientTester: React.FC<HttpClientTesterProps> = ({
  title = "🧪 HTTP Client Tester"
}) => {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('test123');
  
  const {
    isRunning,
    results,
    currentStep,
    summary,
    runFullTest,
    testWithCredentials,
    quickConnectionTest,
    clearResults,
    testConfiguration,
    testBasicConnection,
    testLoginAndCookies,
    testProtectedEndpoint,
  } = useHttpClientTest();

  const getSeverityColor = (success: boolean) => 
    success ? 'success' : 'error';

  const getStepIcon = (success: boolean) => 
    success ? '✅' : '🚨';

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Herramienta para probar la integración del HTTP Client con tu backend
      </Typography>

      {/* Control Panel */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🎛️ Panel de Control
          </Typography>
          
          <Grid container spacing={2} alignItems="center">
            {/* Credenciales */}
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isRunning}
              />
            </Grid>
            
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isRunning}
              />
            </Grid>

            {/* Botones de acción */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={runFullTest}
                  disabled={isRunning}
                  startIcon={isRunning ? <CircularProgress size={16} /> : null}
                >
                  🚀 Test Completo
                </Button>
                
                <Button
                  variant="outlined"
                  onClick={() => testWithCredentials(email, password)}
                  disabled={isRunning}
                >
                  🔐 Test Login
                </Button>
                
                <Button
                  variant="outlined"
                  onClick={quickConnectionTest}
                  disabled={isRunning}
                >
                  🌐 Test Conexión
                </Button>
                
                <Button
                  variant="text"
                  onClick={clearResults}
                  disabled={isRunning}
                >
                  🧹 Limpiar
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Estado actual */}
          {isRunning && currentStep && (
            <Alert severity="info" sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={16} />
                <Typography variant="body2">{currentStep}</Typography>
              </Box>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Resumen de resultados */}
      {results.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📊 Resumen de Tests
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Chip 
                label={`Total: ${summary.total}`} 
                variant="outlined" 
              />
              <Chip 
                label={`Exitosos: ${summary.passed}`} 
                color="success" 
                variant={summary.passed > 0 ? "filled" : "outlined"}
              />
              <Chip 
                label={`Fallidos: ${summary.failed}`} 
                color="error" 
                variant={summary.failed > 0 ? "filled" : "outlined"}
              />
            </Box>

            {summary.total > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2">
                  Éxito: {Math.round((summary.passed / summary.total) * 100)}%
                </Typography>
                <Box 
                  sx={{ 
                    width: 100, 
                    height: 8, 
                    backgroundColor: 'grey.300',
                    borderRadius: 1,
                    overflow: 'hidden',
                  }}
                >
                  <Box 
                    sx={{
                      width: `${(summary.passed / summary.total) * 100}%`,
                      height: '100%',
                      backgroundColor: 'success.main',
                    }}
                  />
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {/* Tests individuales rápidos */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🔧 Tests Individuales
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              size="small"
              variant="outlined"
              onClick={testConfiguration}
              disabled={isRunning}
            >
              ⚙️ Configuración
            </Button>
            
            <Button
              size="small"
              variant="outlined"
              onClick={testBasicConnection}
              disabled={isRunning}
            >
              🌐 Conexión
            </Button>
            
            <Button
              size="small"
              variant="outlined"
              onClick={() => testLoginAndCookies(email, password)}
              disabled={isRunning}
            >
              🔐 Login
            </Button>
            
            <Button
              size="small"
              variant="outlined"
              onClick={testProtectedEndpoint}
              disabled={isRunning}
            >
              🔒 Endpoint Protegido
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Resultados detallados */}
      {results.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📋 Resultados Detallados
            </Typography>
            
            {results.map((result, index) => (
              <Accordion key={index} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                    <Typography variant="body1">
                      {getStepIcon(result.success)} {result.step}
                    </Typography>
                    
                    <Box sx={{ flexGrow: 1 }} />
                    
                    <Chip
                      label={result.success ? 'ÉXITO' : 'ERROR'}
                      color={getSeverityColor(result.success)}
                      size="small"
                    />
                  </Box>
                </AccordionSummary>
                
                <AccordionDetails>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* Timestamp */}
                    <Typography variant="caption" color="textSecondary">
                      🕐 {new Date(result.timestamp).toLocaleTimeString()}
                    </Typography>
                    
                    <Divider />
                    
                    {/* Error message */}
                    {result.error && (
                      <Alert severity="error">
                        <Typography variant="body2">
                          <strong>Error:</strong> {result.error}
                        </Typography>
                      </Alert>
                    )}
                    
                    {/* Success data */}
                    {result.data && (
                      <Paper sx={{ p: 2, backgroundColor: 'grey.50' }}>
                        <Typography variant="subtitle2" gutterBottom>
                          📄 Datos de respuesta:
                        </Typography>
                        <Box
                          component="pre"
                          sx={{
                            fontSize: '0.75rem',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            maxHeight: 200,
                            overflow: 'auto',
                          }}
                        >
                          {JSON.stringify(result.data, null, 2)}
                        </Box>
                      </Paper>
                    )}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Información de debugging */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🔍 Información de Debug
          </Typography>
          
          <Typography variant="body2" color="textSecondary" paragraph>
            <strong>Backend URL:</strong> {process.env.NEXT_PUBLIC_BACKEND_URL || 'No configurada'}
          </Typography>
          
          <Typography variant="body2" color="textSecondary" paragraph>
            <strong>Cookies automáticas:</strong> ✅ Habilitadas (withCredentials: true)
          </Typography>
          
          <Typography variant="body2" color="textSecondary" paragraph>
            <strong>Refresh automático:</strong> ✅ Habilitado para errores 401
          </Typography>
          
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              💡 <strong>Tip:</strong> Abre las DevTools del navegador (F12) para ver los logs detallados 
              de las peticiones HTTP y el manejo de cookies.
            </Typography>
          </Alert>
        </CardContent>
      </Card>
    </Box>
  );
};
