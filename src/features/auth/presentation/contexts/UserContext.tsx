'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '../../domain/entities/user';

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        setUser(null);
        return;
      }
      
      const result = await response.json();
      
      if (result && result.userId) {
        setUser(result);
      } else if (result.success && result.data) {
        setUser(result.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const refreshUser = async () => {
    await fetchUser();
  };

  const isAuthenticated = !!user;

  return (
    <UserContext.Provider value={{
      user,
      isLoading,
      isAuthenticated,
      login,
      logout,
      refreshUser,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const useUserDisplayName = () => {
  const { user } = useUser();
  if (!user) return 'Usuario';
  
  const firstName = user.firstName?.trim();
  const lastName = user.lastName?.trim();
  
  // Si tenemos firstName y/o lastName, usarlos
  if (firstName || lastName) {
    return `${firstName || ''} ${lastName || ''}`.trim();
  }
  
  // Si no tenemos nombres, usar parte del email antes del @
  if (user.email) {
    const emailParts = user.email.split('@');
    if (emailParts[0]) {
      // Capitalizar la primera letra y reemplazar números/símbolos por espacios
      const emailName = emailParts[0]
        .replace(/[0-9_.-]/g, ' ')
        .split(' ')
        .filter(part => part.length > 0)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ');
      return emailName || 'Usuario';
    }
  }
  
  return 'Usuario';
};

export const useUserInitials = () => {
  const { user } = useUser();
  if (!user) return 'U';
  
  const firstName = user.firstName?.trim();
  const lastName = user.lastName?.trim();
  
  // Si tenemos firstName y lastName
  if (firstName && lastName) {
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  }
  
  // Si solo tenemos firstName
  if (firstName) {
    return firstName.charAt(0).toUpperCase();
  }
  
  // Si solo tenemos lastName
  if (lastName) {
    return lastName.charAt(0).toUpperCase();
  }
  
  // Si no tenemos nombres, usar las primeras letras del email
  if (user.email) {
    const emailParts = user.email.split('@')[0];
    if (emailParts && emailParts.length >= 2) {
      // Tomar la primera letra y la primera letra después de un número o símbolo
      const cleanEmail = emailParts.replace(/[0-9_.-]/g, '');
      if (cleanEmail.length >= 2) {
        return (cleanEmail.charAt(0) + cleanEmail.charAt(1)).toUpperCase();
      } else if (cleanEmail.length === 1) {
        return cleanEmail.charAt(0).toUpperCase();
      }
    }
    // Fallback: primera letra del email
    return user.email.charAt(0).toUpperCase();
  }
  
  return 'U';
};
