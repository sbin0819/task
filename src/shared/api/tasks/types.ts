type TTaskStatus = 'Done' | 'Delayed' | 'In Progress';

export interface ITask {
  taskType: string;
  taskName: string;
  taskDescription: string;
  assignee: string;
  reporter: string;
  status: TTaskStatus;
  dueDate: string;
  createdAt: string;
  completedAt: string;
}
