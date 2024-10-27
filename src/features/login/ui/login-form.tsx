import { CheckIcon, EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  TextField,
} from '@radix-ui/themes';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { meAtom } from 'shared/store/me';
import { isValidEmail, isValidPassword } from '../lib/utils';
import useLogin from '../queries/useLogin';

export default function LoginForm() {
  const router = useRouter();
  const { mutateAsync } = useLogin();
  const setMe = useSetAtom(meAtom);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const isFormValid = useMemo(
    () => isValidEmail(form.email) && isValidPassword(form.password),
    [form.email, form.password]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (error) setError(false);
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleResetForm = () => {
    setForm({ email: '', password: '' });
  };

  const handleLogin = () => {
    mutateAsync({
      userEmail: form.email,
    })
      .then((res) => {
        setMe(res.data);
        if (res.data.userRole === 'Viewer') {
          return router.replace('/tasks');
        }
        router.replace('/');
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <Box className="mt-8">
      <Box className="flex flex-col gap-1">
        <label htmlFor="email" className="font-semibold">
          이메일
        </label>
        <TextField.Root
          id="email"
          name="email"
          type="email"
          className="w-full h-12 px-2"
          placeholder="이메일 주소를 입력해 주세요."
          value={form.email}
          onChange={handleInputChange}
        />
        {error && (
          <Text className="text-red-500 text-sm mt-1">
            이메일 주소가 올바르지 않습니다. (README.md 참고)
          </Text>
        )}
      </Box>
      <Box className="mt-6 flex flex-col gap-1">
        <label htmlFor="password" className="font-semibold">
          비밀번호
        </label>
        <TextField.Root
          id="password"
          name="password"
          type={passwordVisible ? 'text' : 'password'}
          className="w-full h-12 px-2 flex-row-reverse"
          placeholder="비밀번호를 입력해주세요."
          value={form.password}
          onChange={handleInputChange}
        >
          <TextField.Slot>
            <IconButton onClick={togglePasswordVisibility}>
              {passwordVisible ? (
                <EyeClosedIcon height={24} width={24} />
              ) : (
                <EyeOpenIcon height={24} width={24} />
              )}
            </IconButton>
          </TextField.Slot>
        </TextField.Root>
      </Box>
      <Flex className="justify-end mt-10 gap-2">
        <Button
          className="px-4 py-2 rounded-md border-solid font-semibold border-[#888] cursor-pointer"
          onClick={handleResetForm}
        >
          Cancel
        </Button>
        <Button
          color="cyan"
          className="px-4 py-2 rounded-md cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-white"
          disabled={!isFormValid}
          onClick={handleLogin}
        >
          <CheckIcon height="18px" width="18px" className="mr-1" />
          Login-in
        </Button>
      </Flex>
    </Box>
  );
}
