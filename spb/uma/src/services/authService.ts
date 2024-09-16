import { apiService } from './httpService';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(email: string, password: string): Promise<User> {
    try {
      const response = await apiService.post<AuthResponse>('/auth/login', { email, password });
      localStorage.setItem('token', response.token);
      return response.user;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }



  public isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

export const authService = AuthService.getInstance();
