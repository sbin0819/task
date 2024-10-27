import { ChevronDownIcon, PersonIcon } from '@radix-ui/react-icons';
import { Box, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { useAtom } from 'jotai';
import { RESET } from 'jotai/utils';
import { useRouter } from 'next/router';
import { signout } from 'shared/api/auth';
import { meAtom } from 'shared/store/me';

type Pathname = '/' | '/tasks';

const title: Record<Pathname, string> = {
  '/': 'User List',
  '/tasks': 'Task List',
};

export default function Header() {
  const router = useRouter();
  const pathname = router.pathname as Pathname;

  const [me, setMe] = useAtom(meAtom);

  const handleLogout = () => {
    signout().then(() => {
      setMe(RESET);
      router.replace('/login');
    });
  };

  return (
    <Flex className="p-4" align="center" justify="between">
      <Text className="text-2xl font-bold">{title[pathname]}</Text>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="cursor-pointer">
          <Box className="flex items-center gap-2 font-semibold">
            <Text color="indigo">{me?.userName}</Text>
            <Text color="indigo">{me?.userRole}</Text>
            <PersonIcon width={18} height={18} />
            <ChevronDownIcon width={18} height={18} />
          </Box>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="center">
          <DropdownMenu.Item
            className="p-2 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  );
}
