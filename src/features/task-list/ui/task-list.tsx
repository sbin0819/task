import { Box, Flex } from '@radix-ui/themes';
import Table, {
  TableFilter,
  TableHeader,
  TableSelected,
} from 'components/table/ui';
import { tableHeaders } from 'features/task-list/consts/table';
import { dropdownOptions } from 'features/task-list/consts/tableHeaders';
import { useMemo, useState } from 'react';
import { ITask } from 'shared/api/tasks/types';
import TaskData from 'shared/data/task_list.json';
import useFilteredTableData from '../hooks/useFilteredTableData';
import TaskModal from './task-modal';

export default function TaskList() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [dropdownValue, setDropdownValue] = useState<string>(
    dropdownOptions[0].value
  );

  const tableFilterOptions = useMemo(() => {
    const taskTypes = TaskData.map((task) => task.taskType);
    const uniqueTaskTypes = ['All', ...Array.from(new Set(taskTypes))];

    const taskStatus = TaskData.map((task) => task.status);
    const uniqueTaskStatus = ['All', ...Array.from(new Set(taskStatus))];

    return [
      {
        label: 'Task Type',
        key: 'taskType',
        options: uniqueTaskTypes.map((type) => ({
          value: type,
          label: type,
        })),
      },
      {
        label: '상태',
        key: 'status',
        options: uniqueTaskStatus.map((status) => ({
          value: status,
          label: status,
        })),
      },
    ];
  }, []);

  const [filterChecked, setFilterChecked] = useState(
    tableFilterOptions.reduce(
      (acc, option) => {
        acc[option.key] = option.options.map((el) => el.value);
        return acc;
      },
      {} as Record<string, string[]>
    )
  );

  const { tableData } = useFilteredTableData({
    data: TaskData as ITask[],
    dropdownValue,
    searchValue,
    filterChecked,
  });

  const onDropdownChange = (value: string) => {
    setDropdownValue(value);
    setSearchValue('');
  };

  const onSearchSubmit = (value: string) => {
    setSearchValue(value);
  };

  const onFilterChange = (key: string, values: string[]) => {
    setFilterChecked((prev) => ({ ...prev, [key]: values }));
  };

  return (
    <Box>
      <Flex className="h-12 gap-4">
        <TableHeader
          dropdownValue={dropdownValue}
          options={dropdownOptions}
          onDropdownChange={onDropdownChange}
          onSearchSubmit={onSearchSubmit}
          searchValue={searchValue}
        />
        <TaskModal />
      </Flex>
      <Box className="mt-8 mb-16">
        <TableSelected count={tableData.length} />
        <TableFilter
          options={tableFilterOptions}
          filterChecked={filterChecked}
          onFilterChange={onFilterChange}
        />
      </Box>
      <Box className="mt-6">
        <Table headers={tableHeaders} data={tableData} />
      </Box>
    </Box>
  );
}
