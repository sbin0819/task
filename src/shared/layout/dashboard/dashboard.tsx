import { Box, Flex } from '@radix-ui/themes';
import Header from './header';
import Sidebar from './sidebar';

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex className="h-screen overflow-hidden">
      <Sidebar />
      <Box className="flex-1 flex flex-col">
        <Header />
        <Box className="flex-1 overflow-auto p-4">{children}</Box>
      </Box>
    </Flex>
  );
}
