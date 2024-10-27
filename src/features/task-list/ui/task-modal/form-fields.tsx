import { Box, Text, TextField } from '@radix-ui/themes';
import { ChangeEvent } from 'react';

interface FormField {
  value: string;
  error: boolean;
  errorMessage: string;
  placeholder: string;
  label: string;
}

interface FormFieldsProps<K extends string> {
  form: Record<K, FormField>;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function FormFields<K extends string>({
  form,
  handleInputChange,
}: FormFieldsProps<K>) {
  return (
    <Box className="mt-4">
      {(Object.entries(form) as [K, FormField][]).map(([key, value]) => (
        <Box className="mt-3" key={key}>
          <label
            htmlFor={key}
            className="block text-sm font-medium text-gray-700"
          >
            {value.label}
          </label>
          <TextField.Root
            id={key}
            name={key}
            type="text"
            className={`w-full h-10 mt-2 px-2 rounded border ${
              value.error ? 'border-red-500' : 'border-gray-300'
            }`}
            value={value.value}
            onChange={handleInputChange}
            placeholder={value.placeholder}
          />
          <Text className="mt-1 px-2 min-h-2 text-[12px] text-red-500">
            {value.error ? value.errorMessage : '\u00A0'}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
