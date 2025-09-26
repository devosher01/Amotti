"use client";
import React, { type ReactNode } from 'react';
import { UserProvider } from '../contexts/UserContext';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
};
