import { Box, Button, Flex } from '@radix-ui/themes';
import Table, {
  TableFilter,
  TableHeader,
  TableSelected,
} from 'components/table/ui';
import { tableHeaders } from 'features/user-list/consts/table';
import { dropdownOptions } from 'features/user-list/consts/tableHeaders';
import useFilteredTableData from 'features/user-list/hooks/useFilteredTableData';
import { useAtomValue } from 'jotai';
import { useMemo, useState } from 'react';
import UserData from 'shared/data/user_list.json';
import { meAtom } from 'shared/store/me';
import { IUser } from 'shared/types/users/types';

export default function UserList() {
  const me = useAtomValue(meAtom);

  const [dropdownValue, setDropdownValue] = useState<string>(
    dropdownOptions[0].value
  );
  const [searchValue, setSearchValue] = useState<string>('');

  const tableFilterOptions = useMemo(() => {
    const userRoles = UserData.map((user) => user.userRole);
    const uniqueUserRoles = ['All', ...Array.from(new Set(userRoles))];

    return [
      {
        label: '사용자 권한',
        key: 'userRole',
        options: uniqueUserRoles.map((role) => ({
          value: role,
          label: role,
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
    data: UserData as IUser[],
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
        <Button
          className="h-full bg-teal-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-white"
          disabled={me?.userRole !== 'Admin'}
        >
          Invite User
        </Button>
      </Flex>
      {me?.userRole !== 'RegularUser' && (
        <Box className="mt-8 mb-16">
          <TableSelected count={tableData.length} />
          <TableFilter
            options={tableFilterOptions}
            filterChecked={filterChecked}
            onFilterChange={onFilterChange}
          />
        </Box>
      )}
      <Box className="mt-6">
        <Table headers={tableHeaders} data={tableData} />
      </Box>
    </Box>
  );
}
