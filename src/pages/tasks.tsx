import TaskList from 'features/task-list/ui';
import { ReactElement } from 'react';
import DashBoardLayout from 'shared/layout/dashboard';

export default function Page() {
  return <TaskList />;
}

Page.getLayout = (page: ReactElement) => (
  <DashBoardLayout>{page}</DashBoardLayout>
);
