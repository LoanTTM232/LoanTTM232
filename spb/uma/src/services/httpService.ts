import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

class HttpService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 seconds timeout for requests
    });

    // Request Interceptor
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Attach the JWT token to the Authorization header if it exists
        const token = localStorage.getItem('token');
        if (token && config.headers) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response Interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
          console.log('Unauthorized, logging out...');
        }
        return Promise.reject(error);
      }
    );
  }

  // GET Request
  public async get<T>(url: string, params?: any): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, { params });
    return response.data;
  }

  // POST Request
  public async post<T>(url: string, data: any): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data);
    return response.data;
  }

  // PUT Request
  public async put<T>(url: string, data: any): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data);
    return response.data;
  }

  // DELETE Request
  public async delete<T>(url: string): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url);
    return response.data;
  }

  // PATCH Request
  public async patch<T>(url: string, data: any): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data);
    return response.data;
  }
}

// Export an instance of HttpService 
export const apiService = new HttpService(process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1');
