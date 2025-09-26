/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  
  // 🔧 ESLint configuration - más permisivo temporalmente
  eslint: {
    // Durante build en producción, ignorar warnings de ESLint
    ignoreDuringBuilds: false,
    // Directorios a ignorar
    dirs: ['pages', 'utils']
  },
  
  // 🔧 TypeScript configuration
  typescript: {
    // ⚠️ TEMPORAL: Ignora errores de TypeScript durante build para cleanup
    ignoreBuildErrors: true,
  },
  
  // 🔧 Configuración específica para uploads
  experimental: {
    serverComponentsExternalPackages: [],
  },
  
  // 🚀 Configuración de proxy mejorada
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*`,
      },
    ];
  },
  
  // 📁 Configuración para archivos grandes
  serverRuntimeConfig: {
    maxFileSize: 50 * 1024 * 1024, // 50MB
  },
  
  // Variables de entorno
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000',
  },
};

export default nextConfig;


