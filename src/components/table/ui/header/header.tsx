// Header.tsx
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Flex, IconButton, Select, TextField } from '@radix-ui/themes';
import { useState } from 'react';

interface TableHeaderProps {
  dropdownValue: string;
  options: { value: string; label: string }[];
  onDropdownChange: (value: string) => void;
  searchValue: string;
  onSearchSubmit: (value: string) => void;
}

export default function Header({
  dropdownValue,
  options,
  onDropdownChange,
  onSearchSubmit,
  searchValue,
}: TableHeaderProps) {
  const [inputValue, setInputValue] = useState<string>(searchValue);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearchSubmit(inputValue.trim());
  };

  return (
    <Flex align="center" className="h-full gap-2">
      <Select.Root
        value={dropdownValue}
        onValueChange={(value) => {
          onDropdownChange(value);
        }}
      >
        <Select.Trigger placeholder="Select..." className="h-full w-32" />
        <Select.Content position="popper">
          {options.map((option) => (
            <Select.Item key={option.value} value={option.value}>
              {option.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <form className="h-full" onSubmit={handleSubmit}>
        <TextField.Root
          name="search"
          type="text"
          className="w-96 h-full px-2 flex-row-reverse"
          placeholder="Search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        >
          <TextField.Slot>
            <IconButton variant="ghost" type="submit" aria-label="Search">
              <MagnifyingGlassIcon />
            </IconButton>
          </TextField.Slot>
        </TextField.Root>
      </form>
    </Flex>
  );
}
