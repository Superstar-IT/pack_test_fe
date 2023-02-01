import { User, UserUpdateRequest } from '../utils';
import httpClient from '../utils/httpClient';

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

export const UserService = {
  updateUser: async (userId: number, updateData: UserUpdateRequest): Promise<User> => {
    return await httpClient.patch(`/users/${userId}`, updateData).then((response) => response.data);
  },
};

export default UserService;
