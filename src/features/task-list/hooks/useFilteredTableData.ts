import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { meAtom } from 'shared/store/me';
import { ITask } from 'shared/types/tasks/types';

interface FilteredDataProps {
  data: ITask[];
  dropdownValue: string;
  searchValue: string;
  filterChecked: Record<string, string[]>;
}

export default function useFilteredTableData({
  data,
  dropdownValue,
  searchValue,
  filterChecked,
}: FilteredDataProps) {
  const me = useAtomValue(meAtom);

  const filterDataByUserRole = useMemo(() => {
    if (me?.userRole === 'Admin' || me?.userRole === 'PrimeUser') {
      return data;
    } else if (me?.userRole === 'RegularUser') {
      return data.filter((task) => task.reporter === me.userName);
    } else if (me?.userRole === 'Viewer') {
      return data.filter((task) => task.assignee === me.userName);
    } else {
      return [];
    }
  }, [data, me?.userName, me?.userRole]);

  const filteredDataByChecked = useMemo(() => {
    return filterDataByUserRole.filter((data) => {
      return Object.entries(filterChecked).every(([key, values]) => {
        if (values.includes('All')) return true;
        const k = data[key as keyof typeof data];
        if (!k) return false;
        return values.includes(k);
      });
    });
  }, [filterChecked, filterDataByUserRole]);

  const filteredData = useMemo(() => {
    if (!searchValue.trim()) {
      return filteredDataByChecked;
    }

    const lowerCaseSearch = searchValue.toLowerCase();

    return filteredDataByChecked.filter((data) => {
      const fieldValue = data[dropdownValue as keyof typeof data];
      if (fieldValue && typeof fieldValue === 'string') {
        return fieldValue.toLowerCase().includes(lowerCaseSearch);
      }
      return false;
    });
  }, [searchValue, filteredDataByChecked, dropdownValue]);

  const tableData = useMemo(
    () =>
      filteredData.map((task) => [
        {
          value: task.taskName,
        },
        {
          value: task.taskType,
        },
        {
          value: task.createdAt,
        },
        {
          value: task.dueDate,
        },
        {
          value: task.reporter,
        },
        {
          value: task.taskDescription,
        },
        {
          value: task.assignee,
        },
        {
          value: task.status,
        },
      ]),
    [filteredData]
  );

  return { tableData };
}
