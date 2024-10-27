import { Box, CheckboxGroup, Flex, Text } from '@radix-ui/themes';

interface FilterProps {
  options: {
    label: string;
    key: string;
    options: {
      value: string;
      label: string;
    }[];
  }[];
  filterChecked: Record<string, string[]>;
  onFilterChange: (key: string, values: string[]) => void;
}

export default function Filter({
  options,
  filterChecked,
  onFilterChange,
}: FilterProps) {
  return (
    <Box className="mt-4 border-t-2 border-t-black">
      {options.map((filterSection, sectionIndex) => (
        <Flex key={sectionIndex} gap="8" className={`py-4 px-2 border-b`}>
          <Text className="font-semibold min-w-28">{filterSection.label}</Text>
          <CheckboxGroup.Root
            value={filterChecked[filterSection.key]}
            color="teal"
          >
            <Flex gap="6">
              {filterSection.options.map((option) => {
                const optionsSize = filterSection.options.length;
                return (
                  <CheckboxGroup.Item
                    key={option.value}
                    value={option.value}
                    onClick={(e) => {
                      const { currentTarget } = e;
                      const { value } = currentTarget;
                      const dataState =
                        currentTarget.getAttribute('data-state');
                      if (value === 'All') {
                        if (dataState === 'checked') {
                          onFilterChange(filterSection.key, []);
                        } else {
                          onFilterChange(
                            filterSection.key,
                            filterSection.options.map((option) => option.value)
                          );
                        }
                      } else {
                        const newValues = filterChecked[
                          filterSection.key
                        ].includes(value)
                          ? filterChecked[filterSection.key].filter(
                              (item) => item !== value
                            )
                          : [...filterChecked[filterSection.key], value];

                        if (
                          optionsSize - 1 === newValues.length &&
                          newValues.includes('All')
                        ) {
                          onFilterChange(
                            filterSection.key,
                            newValues.filter((item) => item !== 'All')
                          );
                        } else if (newValues.length === optionsSize - 1) {
                          onFilterChange(filterSection.key, [
                            ...newValues,
                            'All',
                          ]);
                        } else {
                          onFilterChange(filterSection.key, newValues);
                        }
                      }
                    }}
                  >
                    {option.label}
                  </CheckboxGroup.Item>
                );
              })}
            </Flex>
          </CheckboxGroup.Root>
        </Flex>
      ))}
    </Box>
  );
}
