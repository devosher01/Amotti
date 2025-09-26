"use client";

import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  Stack,
  alpha,
  Button,
  IconButton,
} from '@mui/material';
import {
  IconGift,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';
import { CompanyProfile } from '../../types/CompanyProfile';

interface ProductsSectionProps {
  profile: CompanyProfile;
  setProfile: React.Dispatch<React.SetStateAction<CompanyProfile>>;
  addArrayItem: (key: keyof CompanyProfile, value: string) => void;
  removeArrayItem: (key: keyof CompanyProfile, index: number) => void;
}

// Component - Single Responsibility: Products Form
export const ProductsSection: React.FC<ProductsSectionProps> = ({
  profile,
  setProfile,
  addArrayItem,
  removeArrayItem,
}) => {
  const [newProduct, setNewProduct] = React.useState('');

  const handleAddProduct = () => {
    if (newProduct.trim()) {
      addArrayItem('products', newProduct.trim());
      setNewProduct('');
    }
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 4, color: 'text.primary' }}>
        Productos y Servicios
      </Typography>

      <Grid container spacing={4}>
        {/* Descripción de productos/servicios */}
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconGift size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Descripción General de Productos/Servicios
              </Typography>
            </Stack>
            <TextField
              fullWidth
              value={profile.productDescription || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, productDescription: e.target.value }))}
              multiline
              rows={4}
              placeholder="Describe qué productos o servicios ofrece tu empresa, cómo funcionan y qué los hace únicos..."
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: alpha('#f8fafc', 0.8),
                  '&:hover': {
                    backgroundColor: '#f8fafc',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'white',
                    borderColor: '#5b24b7',
                  },
                },
              }}
            />
          </Stack>
        </Grid>

        {/* Lista de productos */}
        <Grid item xs={12}>
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconGift size={18} color="#5b24b7" />
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                Lista de Productos/Servicios Principales
              </Typography>
            </Stack>
            
            {/* Añadir producto */}
            <Stack direction="row" spacing={2} alignItems="flex-end">
              <TextField
                fullWidth
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
                placeholder="Ej: Software de gestión empresarial"
                variant="outlined"
                size="small"
                onKeyPress={(e) => e.key === 'Enter' && handleAddProduct()}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: alpha('#f8fafc', 0.8),
                    '&:hover': {
                      backgroundColor: '#f8fafc',
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'white',
                      borderColor: '#5b24b7',
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                startIcon={<IconPlus size={16} />}
                onClick={handleAddProduct}
                disabled={!newProduct.trim()}
                sx={{
                  backgroundColor: '#5b24b7',
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#4c1d9a',
                  },
                }}
              >
                Añadir
              </Button>
            </Stack>

            {/* Lista de productos existentes */}
            {profile.products && profile.products.length > 0 && (
              <Stack spacing={1}>
                {profile.products.map((product, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 2,
                      backgroundColor: alpha('#5b24b7', 0.05),
                      border: `1px solid ${alpha('#5b24b7', 0.1)}`,
                      borderRadius: '12px',
                    }}
                  >
                    <Typography variant="body2" color="text.primary">
                      {typeof product === 'string' ? product : product.name}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => removeArrayItem('products', index)}
                      sx={{
                        color: 'error.main',
                        '&:hover': {
                          backgroundColor: alpha('#ef4444', 0.1),
                        },
                      }}
                    >
                      <IconTrash size={16} />
                    </IconButton>
                  </Box>
                ))}
              </Stack>
            )}

            {(!profile.products || profile.products.length === 0) && (
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                No hay productos añadidos aún. Usa el campo de arriba para añadir productos o servicios.
              </Typography>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};