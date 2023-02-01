import { User } from '../utils';
import httpClient from '../utils/httpClient';

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

export const AuthService = {
  emailLogin: async (loginData: LoginRequest): Promise<LoginResponse> => {
    return await httpClient.post(`/auth/email/login`, loginData).then((response) => {
      const data = response.data;
      return {
        token: data.token,
        user: data.user,
      };
    });
  },

  getMyInfo: async (): Promise<User> => {
    return await httpClient.get('/auth/me').then((response) => response.data);
  },
};

export default AuthService;
