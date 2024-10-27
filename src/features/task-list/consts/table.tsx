import { CubeIcon } from '@radix-ui/react-icons';

export const tableHeaders = [
  {
    label: (
      <>
        <CubeIcon color="teal" />
        Task Name
      </>
    ),
    value: 'taskName',
  },
  { label: 'Task Type', value: 'taskType' },
  { label: 'Created At', value: 'createdAt' },
  { label: 'Due Date', value: 'dueDate' },
  { label: 'Reporter', value: 'reporter' },
  { label: 'Description', value: 'taskDescription' },
  { label: '담당자(Assignee)', value: 'assignee' },
  { label: '상태(Status)', value: 'status' },
];
