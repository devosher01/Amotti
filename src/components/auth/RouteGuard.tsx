'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@/features/auth/presentation/contexts/UserContext';

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');
    
    // Debug logs
    console.log('🔍 [RouteGuard] Estado:', {
      user: user,
      userType: typeof user,
      pathname,
      isAuthRoute,
    });
    
    if (user && isAuthRoute) {
      console.log('🔄 [RouteGuard] Usuario autenticado en auth route, redirigiendo a /');
      router.replace('/');
    } else if (user === null && !isAuthRoute) {
      console.log('🔄 [RouteGuard] Usuario NO autenticado fuera de auth, redirigiendo a /login');
      router.replace('/login');
    }
  }, [user, pathname, router]);

  return <>{children}</>;
}