import axios from 'axios';

const axiosServices = axios.create();

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Interceptor para auto-refresh de tokens
axiosServices.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si es error 401 y no hemos intentado refresh todavía
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Si ya se está haciendo refresh, esperar en cola
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return axiosServices(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log('🔄 [AXIOS] Token expired, attempting refresh...');
        
        // Llamar al endpoint de refresh
        const refreshResponse = await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include', // Incluir cookies
        });

        if (refreshResponse.ok) {
          console.log('✅ [AXIOS] Token refreshed successfully');
          processQueue(null);
          
          // Reintentar el request original
          return axiosServices(originalRequest);
        } else {
          console.log('❌ [AXIOS] Refresh failed, redirecting to login');
          processQueue(new Error('Refresh failed'), null);
          
          // Redirect to login
          if (typeof window !== 'undefined') {
            window.location.href = '/login?reason=session_expired';
          }
          
          return Promise.reject(error);
        }
      } catch (refreshError) {
        console.error('💥 [AXIOS] Refresh error:', refreshError);
        processQueue(refreshError, null);
        
        if (typeof window !== 'undefined') {
          window.location.href = '/login?reason=refresh_error';
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Para otros tipos de errores
    return Promise.reject((error.response && error.response.data) || 'Wrong Services');
  }
);

export default axiosServices; 