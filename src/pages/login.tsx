import { Box } from '@radix-ui/themes';
import LoginModal from 'features/login/ui/login-modal';

export default function LoginPage() {
  return (
    <Box className="w-screen h-screen">
      <LoginModal />
    </Box>
  );
}
