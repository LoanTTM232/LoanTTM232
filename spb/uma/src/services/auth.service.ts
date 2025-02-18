import {
    GOOGLE_SIGNIN_CALLBACK_PATH, LOGIN_PATH, LOGOUT_PATH, REFRESH_TOKEN_PATH, REGISTER_PATH,
    VERIFY_EMAIL_PATH
} from '@/constants';
import { ResponseError } from '@/helpers/error';
import { removeData, storeData } from '@/helpers/storage';
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
    full_name: string;
  };
};

export type RegisterRequest = {
  email: string;
  password: string;
};

export type RefreshTokenResponse = {
  access_token: string;
};

export type GoogleCallbackRequest = {
  code: string;
};

export interface IAuthService {
  login(
    data: LoginRequest
  ): Promise<ApiResponse<LoginResponse> | ResponseError>;

  logout(): Promise<void>;

  register(data: RegisterRequest): Promise<ApiResponse<null> | ResponseError>;

  refreshToken(): Promise<ApiResponse<RefreshTokenResponse> | ResponseError>;

  googleCallback(
    data: GoogleCallbackRequest
  ): Promise<ApiResponse<LoginResponse> | ResponseError>;

  verifyEmail(token: number): Promise<ApiResponse<null> | ResponseError>;

  resendVerifyEmailOtp(
    email: string
  ): Promise<ApiResponse<null> | ResponseError>;
}

class AuthService {
  public async login(
    data: LoginRequest
  ): Promise<ApiResponse<LoginResponse> | ResponseError> {
    const api = apiFactory<LoginResponse>(LOGIN_PATH, false);
    const response = await api.post(data);

    if ('data' in response) {
      await storeData('accessToken', response.data.access_token);
    }
    return response;
  }

  public async logout(): Promise<void> {
    const api = apiFactory<null>(LOGOUT_PATH, false);
    await api.post();

    removeData('accessToken');
  }

  public async register(
    data: RegisterRequest
  ): Promise<ApiResponse<null> | ResponseError> {
    const api = apiFactory<null>(REGISTER_PATH, false);
    return await api.post(data);
  }

  public async refreshToken(): Promise<
    ApiResponse<RefreshTokenResponse> | ResponseError
  > {
    const api = apiFactory<RefreshTokenResponse>(REFRESH_TOKEN_PATH);
    const response = await api.post();

    if ('data' in response) {
      await storeData('accessToken', response.data.access_token);
    }
    return response;
  }

  public async googleCallback(
    data: GoogleCallbackRequest
  ): Promise<ApiResponse<LoginResponse> | ResponseError> {
    const api = apiFactory<LoginResponse>(GOOGLE_SIGNIN_CALLBACK_PATH, false);
    const response = await api.post(data);

    if ('data' in response) {
      await storeData('accessToken', response.data.access_token);
    }
    return response;
  }

  public async verifyEmail(
    token: number
  ): Promise<ApiResponse<null> | ResponseError> {
    const api = apiFactory<null>(VERIFY_EMAIL_PATH);
    return await api.post({ token });
  }

  public async resendVerifyEmailOtp(
    email: string
  ): Promise<ApiResponse<null> | ResponseError> {
    const api = apiFactory<null>(VERIFY_EMAIL_PATH);
    return await api.post({ email });
  }
}

const authService = new AuthService();
export default authService;
