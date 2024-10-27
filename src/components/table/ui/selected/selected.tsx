import { Flex, Text } from '@radix-ui/themes';

export default function Selected({ count }: { count: number }) {
  return (
    <Flex align="center" gap="2" className="font-bold text-teal-600">
      <Text>Selected</Text>
      <Flex
        align="center"
        justify="center"
        className="w-fit h-6 px-2 rounded-2xl border border-teal-600"
      >
        <Text className="text-sm">{count}</Text>
      </Flex>
    </Flex>
  );
}
