import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG } from '@/config/api';

interface HttpClient {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

class AxiosHttpClient implements HttpClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        ...API_CONFIG.DEFAULT_HEADERS,
        // � REMOVIDO: Header que causaba el error CORS
      },
      withCredentials: true,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor para debugging
    this.client.interceptors.request.use(
      (config) => {
        // 🚀 FIX: Si es FormData, remover Content-Type para que el browser configure boundary automáticamente
        if (config.data instanceof FormData) {
          delete config.headers['Content-Type'];
        }
        
        console.log('🌐 HTTP Request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          baseURL: config.baseURL,
          headers: config.headers,
          withCredentials: config.withCredentials,
          isFormData: config.data instanceof FormData
        });
        return config;
      },
      (error) => {
        console.error('🚨 Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log('✅ HTTP Response:', {
          status: response.status,
          statusText: response.statusText,
          url: response.config.url,
          headers: response.headers,
        });
        return response;
      },
      async (error) => {
        console.error('🚨 HTTP Error:', {
          message: error.message,
          code: error.code,
          status: error.response?.status,
          statusText: error.response?.statusText,
          url: error.config?.url,
          method: error.config?.method,
          responseData: error.response?.data,
        });

        if (error.response?.status === 401 && typeof window !== 'undefined') {
          // Prevent infinite loops - don't retry if the failing request was already a refresh
          if (error.config?.url?.includes('/auth/refresh')) {
            console.log('🔄 Refresh token expired, redirecting to login...');
            try {
              localStorage.removeItem('tactiko_auth_store');
            } catch (e) {
              // Silent fail
            }
            window.location.href = '/login';
            return Promise.reject(error);
          }

          try {
            console.log('🔄 Token expired, attempting refresh...');
            await this.client.post('/auth/refresh');
            console.log('✅ Token refreshed successfully, retrying original request...');
            return this.client.request(error.config);
          } catch (refreshError) {
            console.log('❌ Refresh failed, redirecting to login...');
            try {
              localStorage.removeItem('tactiko_auth_store');
            } catch (e) {
              // Silent fail
            }
            window.location.href = '/login';
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    // 🔧 Configuración específica para uploads
    if (data instanceof FormData) {
      config = {
        ...config,
        timeout: 60000, // 60 segundos para uploads
        headers: {
          ...config?.headers,
          'Content-Type': 'multipart/form-data',
        },
      };
    }
    
    const response: AxiosResponse<T> = await this.client.post(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config);
    return response.data;
  }
}

export const httpClient = new AxiosHttpClient();
export type { HttpClient };