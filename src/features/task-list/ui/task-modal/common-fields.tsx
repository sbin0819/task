import { Box, Select, TextField } from '@radix-ui/themes';
import { useAtomValue } from 'jotai';
import { ChangeEvent, Fragment, useMemo } from 'react';
import UserData from 'shared/data/user_list.json';
import { meAtom } from 'shared/store/me';
import { FormState, TaskType } from './task-modal';

interface CommonFieldsProps {
  form: FormState;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (field: keyof FormState) => (value: string) => void;
}

export default function CommonFields({
  form,
  handleInputChange,
  handleSelectChange,
}: CommonFieldsProps) {
  const me = useAtomValue(meAtom);

  const filteredUserData = useMemo(() => {
    if (me?.userRole === 'Admin') {
      return UserData;
    } else if (me?.userRole === 'PrimeUser') {
      return UserData.filter((user) => user.userRole !== 'Admin');
    } else {
      return UserData.filter((user) => user.userName === me?.userName);
    }
  }, [me]);

  return (
    <Fragment>
      <Box>
        <label
          htmlFor="reporter"
          className="block text-sm font-medium text-gray-700"
        >
          생성자
        </label>
        <TextField.Root
          id="reporter"
          name="reporter"
          type="text"
          className="w-full h-10 mt-2 px-2 rounded"
          value={form.reporter}
          disabled
        />
      </Box>

      <Box>
        <label
          htmlFor="taskName"
          className="block text-sm font-medium text-gray-700"
        >
          Task Name
        </label>
        <TextField.Root
          id="taskName"
          name="taskName"
          type="text"
          className="w-full h-10 mt-2 px-2 rounded"
          value={form.taskName}
          onChange={handleInputChange}
          placeholder="Task 이름을 입력하세요."
        />
      </Box>

      <Box>
        <label
          htmlFor="assignee"
          className="block text-sm font-medium text-gray-700"
        >
          담당자 지정
        </label>
        <Select.Root
          value={form.assignee}
          onValueChange={handleSelectChange('assignee')}
        >
          <Select.Trigger
            className="w-full h-10 mt-2 px-2 rounded border border-gray-300"
            placeholder="담당자를 지정하세요."
          />
          <Select.Content position="popper">
            {filteredUserData.map((user, idx) => (
              <Select.Item key={idx} value={user.userName}>
                {user.userName}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Box>

      <Box>
        <label
          htmlFor="taskType"
          className="block text-sm font-medium text-gray-700"
        >
          Task Type
        </label>
        <Select.Root
          value={form.taskType}
          onValueChange={handleSelectChange('taskType')}
        >
          <Select.Trigger
            className="w-full h-10 mt-2 px-2 rounded border border-gray-300"
            placeholder="Task Type을 지정하세요."
          />
          <Select.Content position="popper">
            <Select.Item value={TaskType.DELIVERY}>택배요청</Select.Item>
            <Select.Item value={TaskType.PURCHASE}>물품구매</Select.Item>
          </Select.Content>
        </Select.Root>
      </Box>
    </Fragment>
  );
}
