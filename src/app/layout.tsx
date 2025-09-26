import 'reflect-metadata'; // Importar reflect-metadata primero
import React from "react";
import { Toaster } from 'react-hot-toast';
import { Providers } from "@/store/providers";
import { DIProvider } from "@/providers/DIProvider";
import { QueryProvider } from "@/lib/query/QueryProvider";
import { UserProvider } from '@/features/auth/presentation/contexts/UserContext';
import "./global.css";

export const metadata = {
  title: "Tactiko360",
  description: "Modernize Main kit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <DIProvider>
          <QueryProvider>
            <Providers>
              <UserProvider>
                {children}
                <Toaster 
                  position="top-right"
                  reverseOrder={false}
                  gutter={8}
                  containerStyle={{
                    top: 20,
                    right: 20,
                  }}
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: '500',
                      borderRadius: '8px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                      maxWidth: '400px',
                    },
                    success: {
                      duration: 4000,
                      iconTheme: {
                        primary: '#10B981',
                        secondary: '#fff',
                      },
                    },
                    error: {
                      duration: 6000,
                      iconTheme: {
                        primary: '#EF4444',
                        secondary: '#fff',
                      },
                    },
                  }}
                />
              </UserProvider>
            </Providers>
          </QueryProvider>
        </DIProvider>
      </body>
    </html>
  );
}
