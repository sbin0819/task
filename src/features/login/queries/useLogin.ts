import { useMutation } from '@tanstack/react-query';
import { login } from 'shared/api/auth';
import { LoginBody } from 'shared/api/auth/types';

const useLogin = () =>
  useMutation({
    mutationFn: (body: LoginBody) => login(body),
  });

export default useLogin;
