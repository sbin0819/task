import { baseApi } from 'shared/api/base';
import { IUser } from 'shared/api/users/types';
import { LoginBody } from './types';

export const login = (body: LoginBody): Promise<{ data: IUser }> =>
  baseApi.post('/api/auth/login', body);

export const signout = () => baseApi.post('/api/auth/signout');
