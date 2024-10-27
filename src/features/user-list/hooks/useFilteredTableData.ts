import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { meAtom } from 'shared/store/me';
import { IUser } from 'shared/types/users/types';

interface FilteredDataProps {
  data: IUser[];
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
      return data.filter((user) => user.userName === me.userName);
    } else {
      return [];
    }
  }, [data, me?.userName, me?.userRole]);

  const filteredDataByChecked = useMemo(() => {
    return filterDataByUserRole.filter((data) => {
      return Object.entries(filterChecked).every(([key, values]) => {
        if (values.includes('All')) return true;
        return values.includes(data[key as keyof typeof data]);
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
      filteredData.map((user) => [
        { value: user.userName },
        { value: user.userEmail },
        { value: user.userRole },
        { value: user.userPhone },
        { value: user.createdAt },
        { value: user.lastLoggedInAt },
      ]),
    [filteredData]
  );

  return { tableData };
}
