import UserList from 'features/user-list/ui';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import DashBoardLayout from 'shared/layout/dashboard';
import { meAtom } from 'shared/store/me';

export default function Page() {
  const me = useAtomValue(meAtom);
  const router = useRouter();

  useEffect(() => {
    if (me?.userRole === 'Viewer') {
      router.back();
    }
  }, [me, router]);

  return <UserList />;
}

Page.getLayout = (page: ReactElement) => (
  <DashBoardLayout>{page}</DashBoardLayout>
);
