"use client";
import React from 'react';
import { Provider } from 'inversify-react';
import { authContainer } from '@/features/auth/infrastructure/container';
// Si en el futuro hay más contenedores, se pueden fusionar aquí.

interface DIProviderProps {
  children: React.ReactNode;
}

// Proveedor global de Inversify para la aplicación
export const DIProvider: React.FC<DIProviderProps> = ({ children }) => (
  <Provider container={authContainer}>{children}</Provider>
); 