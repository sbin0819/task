import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { Box, Flex, Grid, Text } from '@radix-ui/themes';
import { useMemo, useState } from 'react';

interface TableProps {
  headers: { label: string | React.ReactNode; value: string }[];
  data: { value: string }[][];
}

export default function Table({ headers, data }: TableProps) {
  const [sortConfig, setSortConfig] = useState<{
    value: string | null;
    direction: 'asc' | 'desc' | null;
  }>({
    value: null,
    direction: null,
  });

  const sortedData = useMemo(() => {
    if (!sortConfig.value) return data;

    const sorted = [...data].sort((a, b) => {
      const keyIndex = headers.findIndex(
        (header) => header.value === sortConfig.value
      );
      const aValue = a[keyIndex]?.value || '';
      const bValue = b[keyIndex]?.value || '';

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [data, sortConfig, headers]);

  const handleSort = (key: string) => {
    if (sortConfig.value === key) {
      if (sortConfig.direction === 'asc') {
        setSortConfig({ value: key, direction: 'desc' });
      } else if (sortConfig.direction === 'desc') {
        setSortConfig({ value: null, direction: null });
      }
    } else {
      setSortConfig({ value: key, direction: 'asc' });
    }
  };

  return (
    <Box>
      <Grid
        className="w-full py-3 border-black border-b-2"
        columns={`${headers.length}`}
      >
        {headers.map((header) => {
          const isActive = sortConfig.value === header.value;
          return (
            <Flex
              key={header.value}
              align="center"
              justify="center"
              className="gap-2 font-semibold cursor-pointer"
              onClick={() => handleSort(header.value)}
            >
              {header.label}
              <Flex direction="column">
                <ChevronUpIcon
                  className={`transition-colors ${
                    isActive && sortConfig.direction === 'asc'
                      ? 'text-black'
                      : 'text-gray-300'
                  }`}
                />
                <ChevronDownIcon
                  className={`transition-colors ${
                    isActive && sortConfig.direction === 'desc'
                      ? 'text-black'
                      : 'text-gray-300'
                  }`}
                />
              </Flex>
            </Flex>
          );
        })}
      </Grid>
      <Box>
        {sortedData.length > 0 ? (
          sortedData.map((row, rowIndex) => (
            <Grid
              columns={`${headers.length}`}
              key={rowIndex}
              className={`py-2 border-b hover:bg-gray-50 transition-colors`}
            >
              {row.map((cell, cellIndex) => (
                <Box key={cellIndex} className="text-left p-2 truncate">
                  {cell.value}
                </Box>
              ))}
            </Grid>
          ))
        ) : (
          <Flex align="center" justify="center" className="py-10 h-32">
            <Text className="text-gray-500 text-lg">데이터가 없습니다.</Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
}
