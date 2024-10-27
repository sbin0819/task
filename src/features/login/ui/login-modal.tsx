import * as Dialog from '@radix-ui/react-dialog';
import { EnterIcon } from '@radix-ui/react-icons';
import { Flex, Text } from '@radix-ui/themes';
import LoginForm from './login-form';

export default function LoginModal() {
  return (
    <Dialog.Root open={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-[24px]">
            <Flex align="center" className="gap-2">
              <Flex className="bg-blue-500 p-1 text-white rounded-lg">
                <EnterIcon height="22px" width="22px" />
              </Flex>
              <Text>로그인</Text>
            </Flex>
          </Dialog.Title>
          <LoginForm />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
