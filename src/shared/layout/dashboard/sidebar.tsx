import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FileTextIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { Box, Button, Text } from '@radix-ui/themes';
import { useAtomValue } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { meAtom } from 'shared/store/me';

export default function Sidebar() {
  const me = useAtomValue(meAtom);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const { pathname } = router;

  const isActive = (href: string) => pathname === href;

  return (
    <Box
      className={`relative bg-teal-600 text-white transition-all duration-300 flex-shrink-0 ${
        isCollapsed ? 'w-32' : 'w-64'
      }`}
    >
      <Box className="pt-20 px-4 w-full">
        {me?.userRole !== 'Viewer' && (
          <Link
            href="/"
            className={`flex items-center gap-2 w-full p-2 text-lg font-semibold rounded hover:bg-teal-700 transition-colors ${
              isActive('/') ? 'bg-teal-800' : ''
            }`}
          >
            <PersonIcon width="18px" height="18px" />
            <Text>Users</Text>
          </Link>
        )}
        <Link
          href="/tasks"
          className={`flex items-center gap-2 w-full p-2 mt-2 text-lg font-semibold rounded hover:bg-teal-700 transition-colors ${
            isActive('/tasks') ? 'bg-teal-800' : ''
          }`}
        >
          <FileTextIcon width="18px" height="18px" />
          <Text>Tasks</Text>
        </Link>
      </Box>

      <Button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute top-16 right-4 transform translate-x-full -translate-y-1/2 bg-teal-900 p-0 w-8 h-8 text-white rounded-full flex items-center justify-center transition-transform duration-300`}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <ChevronRightIcon width={24} height={24} />
        ) : (
          <ChevronLeftIcon width={24} height={24} />
        )}
      </Button>
    </Box>
  );
}
