// "use client";
// import React from 'react';
// import { signOut } from 'next-auth/react';
// import { Button } from '@mui/material';
// import { Logout } from '@mui/icons-material';

// interface NextAuthLogoutProps {
//   children?: React.ReactNode;
//   className?: string;
//   variant?: 'text' | 'outlined' | 'contained';
//   size?: 'small' | 'medium' | 'large';
//   color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
// }

// const NextAuthLogout: React.FC<NextAuthLogoutProps> = ({
//   children = 'Cerrar Sesión',
//   className,
//   variant = 'contained',
//   size = 'medium',
//   color = 'error',
//   ...props
// }) => {
//   const handleLogout = async () => {
//     console.log('🚪 [NextAuth] Iniciando logout...');
    
//     await signOut({
//       callbackUrl: '/login',
//       redirect: true,
//     });
//   };

//   return (
//     <Button
//       onClick={handleLogout}
//       variant={variant}
//       size={size}
//       color={color}
//       className={className}
//       startIcon={<Logout />}
//       {...props}
//     >
//       {children}
//     </Button>
//   );
// };

// export default NextAuthLogout;