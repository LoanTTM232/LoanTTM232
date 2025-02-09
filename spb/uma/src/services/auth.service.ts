import {
  GOOGLE_SIGNIN_CALLBACK_PATH,
  LOGIN_PATH,
  REFRESH_TOKEN_PATH,
  REGISTER_PATH,
} from '@/constants';
import { ResponseError } from '@/helpers/error';
import { getData, removeData, storeData } from '@/helpers/storage';
import { apiFactory, ApiResponse } from '@/services/http';

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  user: {
    user_id: string;
    email: string;
  };
};

export type RegisterRequest = {
  email: string;
  password: string;
};

export type RefreshTokenResponse = {
  access_token: string;
};

class AuthService {
  public async login(
    data: LoginRequest
  ): Promise<ApiResponse<LoginResponse> | ResponseError> {
    const api = apiFactory<LoginResponse>(LOGIN_PATH, false);
    return await api.post(data);
  }

  public async logout(): Promise<void> {
    removeData('accessToken');
  }

  public async isLoggedIn(): Promise<boolean> {
    const token = await getData('accessToken');
    return token !== '';
  }

  public async register(
    data: RegisterRequest
  ): Promise<ApiResponse<null> | ResponseError> {
    const api = apiFactory<null>(REGISTER_PATH, false);
    return await api.post(data);
  }

  public async refreshToken(): Promise<void> {
    const api = apiFactory<RefreshTokenResponse>(REFRESH_TOKEN_PATH);
    const response = await api.post();

    if ('data' in response) {
      await storeData('accessToken', response.data.access_token);
    }
  }

  public async googleCallback(): Promise<void> {
    const api = apiFactory<LoginResponse>(GOOGLE_SIGNIN_CALLBACK_PATH, false);
    const response = await api.get();

    if ('data' in response) {
      await storeData('accessToken', response.data.access_token);
    }
  }
}

const authService = new AuthService();
export default authService;
